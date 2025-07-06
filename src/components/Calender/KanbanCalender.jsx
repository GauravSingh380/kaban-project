import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { Calendar, Clock, User, Plus, X, Bell, CheckCircle, AlertCircle, Filter, Search, ChevronLeft, ChevronRight } from 'lucide-react';

// Custom Hooks
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage?.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      if (typeof window !== 'undefined') {
        window.localStorage?.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    const id = Date.now();
    const newNotification = { id, ...notification, timestamp: new Date() };
    setNotifications(prev => [newNotification, ...prev]);
    
    if (notification.autoRemove !== false) {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, notification.duration || 5000);
    }
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return { notifications, addNotification, removeNotification, clearAll };
};

const useDragAndDrop = (onDrop) => {
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = useCallback((e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback((e, targetColumn) => {
    e.preventDefault();
    if (draggedItem && onDrop) {
      onDrop(draggedItem, targetColumn);
    }
    setDraggedItem(null);
  }, [draggedItem, onDrop]);

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
  }, []);

  return {
    draggedItem,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd
  };
};

// Context for notifications
const NotificationContext = createContext();

// Notification System Component
const NotificationSystem = ({ children }) => {
  const notificationHook = useNotifications();

  return (
    <NotificationContext.Provider value={notificationHook}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        {notificationHook.notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg shadow-lg transform transition-all duration-300 border-l-4 ${
              notification.type === 'success' 
                ? 'bg-green-50 border-green-500 text-green-800'
                : notification.type === 'error'
                ? 'bg-red-50 border-red-500 text-red-800'
                : notification.type === 'warning'
                ? 'bg-yellow-50 border-yellow-500 text-yellow-800'
                : 'bg-blue-50 border-blue-500 text-blue-800'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex">
                <div className="flex-shrink-0">
                  {notification.type === 'success' && <CheckCircle className="h-5 w-5" />}
                  {notification.type === 'error' && <AlertCircle className="h-5 w-5" />}
                  {notification.type === 'warning' && <AlertCircle className="h-5 w-5" />}
                  {notification.type === 'info' && <Bell className="h-5 w-5" />}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{notification.title}</p>
                  {notification.message && (
                    <p className="text-sm mt-1 opacity-90">{notification.message}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => notificationHook.removeNotification(notification.id)}
                className="ml-4 inline-flex text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

// Hook to use notifications
const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within NotificationSystem');
  }
  return context;
};

// Kanban Board Component
const KanbanBoard = ({ 
  initialData = [], 
  onTaskUpdate, 
  onTaskCreate, 
  onTaskDelete,
  columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-100' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-100' },
    { id: 'review', title: 'Review', color: 'bg-yellow-100' },
    { id: 'done', title: 'Done', color: 'bg-green-100' }
  ]
}) => {
  const [tasks, setTasks] = useLocalStorage('kanban-tasks', initialData);
  const [newTaskColumn, setNewTaskColumn] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const { addNotification } = useNotificationContext();

  const { draggedItem, handleDragStart, handleDragOver, handleDrop, handleDragEnd } = useDragAndDrop(
    (task, targetColumn) => {
      if (task.status !== targetColumn) {
        const updatedTasks = tasks.map(t => 
          t.id === task.id ? { ...t, status: targetColumn } : t
        );
        setTasks(updatedTasks);
        onTaskUpdate?.(task.id, { status: targetColumn });
        addNotification({
          type: 'success',
          title: 'Task Updated',
          message: `"${task.title}" moved to ${columns.find(c => c.id === targetColumn)?.title}`
        });
      }
    }
  );

  const addTask = (columnId) => {
    if (newTaskTitle.trim()) {
      const newTask = {
        id: Date.now(),
        title: newTaskTitle,
        status: columnId,
        priority: 'medium',
        assignee: 'Unassigned',
        createdAt: new Date().toISOString()
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      onTaskCreate?.(newTask);
      setNewTaskTitle('');
      setNewTaskColumn(null);
      addNotification({
        type: 'success',
        title: 'Task Created',
        message: `"${newTask.title}" added to ${columns.find(c => c.id === columnId)?.title}`
      });
    }
  };

  const deleteTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    const updatedTasks = tasks.filter(t => t.id !== taskId);
    setTasks(updatedTasks);
    onTaskDelete?.(taskId);
    addNotification({
      type: 'info',
      title: 'Task Deleted',
      message: `"${task?.title}" has been removed`
    });
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500'
    };
    return colors[priority] || colors.medium;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Task Board</h2>
        <p className="text-gray-600">Drag and drop tasks between columns to update their status</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((column) => (
          <div
            key={column.id}
            className={`${column.color} rounded-lg p-4 min-h-96`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">{column.title}</h3>
              <span className="bg-white rounded-full px-2 py-1 text-xs font-medium text-gray-600">
                {tasks.filter(task => task.status === column.id).length}
              </span>
            </div>

            <div className="space-y-3">
              {tasks
                .filter(task => task.status === column.id)
                .map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    onDragEnd={handleDragEnd}
                    className={`bg-white rounded-lg p-3 shadow-sm border cursor-move hover:shadow-md transition-shadow ${
                      draggedItem?.id === task.id ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-gray-900 text-sm">{task.title}</h4>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center mt-2 space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></div>
                      <span className="text-xs text-gray-500">{task.priority}</span>
                    </div>
                    
                    <div className="flex items-center mt-2">
                      <User className="h-3 w-3 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500">{task.assignee}</span>
                    </div>
                  </div>
                ))}
            </div>

            {newTaskColumn === column.id ? (
              <div className="mt-3 bg-white rounded-lg p-3 shadow-sm border">
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Enter task title..."
                  className="w-full border-none outline-none text-sm"
                  autoFocus
                  onKeyPress={(e) => e.key === 'Enter' && addTask(column.id)}
                />
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    onClick={() => setNewTaskColumn(null)}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => addTask(column.id)}
                    className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setNewTaskColumn(column.id)}
                className="w-full mt-3 border-2 border-dashed border-gray-300 rounded-lg p-3 text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Task
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Calendar Interface Component
const CalendarInterface = ({ events = [], onEventCreate, onEventClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [eventForm, setEventForm] = useState({ title: '', time: '', type: 'meeting' });
  const [calendarEvents, setCalendarEvents] = useLocalStorage('calendar-events', events);
  const { addNotification } = useNotificationContext();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    const dateStr = date.toDateString();
    return calendarEvents.filter(event => 
      new Date(event.date).toDateString() === dateStr
    );
  };

  const createEvent = () => {
    if (eventForm.title && selectedDate) {
      const newEvent = {
        id: Date.now(),
        title: eventForm.title,
        date: selectedDate.toISOString(),
        time: eventForm.time,
        type: eventForm.type
      };
      
      const updatedEvents = [...calendarEvents, newEvent];
      setCalendarEvents(updatedEvents);
      onEventCreate?.(newEvent);
      
      setEventForm({ title: '', time: '', type: 'meeting' });
      setShowEventForm(false);
      
      addNotification({
        type: 'success',
        title: 'Event Created',
        message: `"${newEvent.title}" scheduled for ${selectedDate.toLocaleDateString()}`
      });
    }
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + direction, 1));
  };

  const getEventTypeColor = (type) => {
    const colors = {
      meeting: 'bg-blue-500',
      deadline: 'bg-red-500',
      reminder: 'bg-yellow-500',
      personal: 'bg-green-500'
    };
    return colors[type] || colors.meeting;
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="p-6 bg-white">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mr-4 mb-2">Team Calendar<span className="text-gray-600 text-sm mx-2">Schedule meetings, deadlines, and important events</span></h2>
        <></>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <h3 className="text-xl font-semibold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 border-b">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-3 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {days.map((day, index) => (
            <div
              key={index}
              className={`min-h-32 p-2 border-r border-b cursor-pointer hover:bg-gray-50 ${
                day && selectedDate?.toDateString() === day.toDateString() 
                  ? 'bg-blue-50 border-blue-200' 
                  : ''
              }`}
              onClick={() => {
                if (day) {
                  setSelectedDate(day);
                  setShowEventForm(true);
                }
              }}
            >
              {day && (
                <>
                  <div className={`text-sm font-medium mb-1 ${
                    day.toDateString() === new Date().toDateString() 
                      ? 'text-blue-600' 
                      : 'text-gray-900'
                  }`}>
                    {day.getDate()}
                  </div>
                  
                  <div className="space-y-1">
                    {getEventsForDate(day).slice(0, 2).map(event => (
                      <div
                        key={event.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventClick?.(event);
                        }}
                        className={`text-xs p-1 rounded text-white truncate ${getEventTypeColor(event.type)}`}
                      >
                        {event.time && <span className="mr-1">{event.time}</span>}
                        {event.title}
                      </div>
                    ))}
                    {getEventsForDate(day).length > 2 && (
                      <div className="text-xs text-gray-500">
                        +{getEventsForDate(day).length - 2} more
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Event Creation Form */}
      {showEventForm && selectedDate && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.50)] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Create Event</h3>
              <button
                onClick={() => setShowEventForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter event title..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  value={eventForm.time}
                  onChange={(e) => setEventForm({...eventForm, time: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Type
                </label>
                <select
                  value={eventForm.type}
                  onChange={(e) => setEventForm({...eventForm, type: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="meeting">Meeting</option>
                  <option value="deadline">Deadline</option>
                  <option value="reminder">Reminder</option>
                  <option value="personal">Personal</option>
                </select>
              </div>
              
              <div className="text-sm text-gray-600">
                Date: {selectedDate.toLocaleDateString()}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowEventForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={createEvent}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Create Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Advanced Form Builder Component
const FormBuilder = ({ onSubmit, schema }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const { addNotification } = useNotificationContext();

  const defaultSchema = [
    {
      id: 'projectName',
      type: 'text',
      label: 'Project Name',
      required: true,
      placeholder: 'Enter project name...'
    },
    {
      id: 'projectType',
      type: 'select',
      label: 'Project Type',
      required: true,
      options: [
        { value: 'web', label: 'Web Application' },
        { value: 'mobile', label: 'Mobile App' },
        { value: 'desktop', label: 'Desktop Software' },
        { value: 'other', label: 'Other' }
      ]
    },
    {
      id: 'description',
      type: 'textarea',
      label: 'Project Description',
      required: true,
      placeholder: 'Describe your project...'
    },
    {
      id: 'priority',
      type: 'radio',
      label: 'Priority Level',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ]
    },
    {
      id: 'features',
      type: 'checkbox',
      label: 'Required Features',
      options: [
        { value: 'auth', label: 'User Authentication' },
        { value: 'payment', label: 'Payment Integration' },
        { value: 'analytics', label: 'Analytics Dashboard' },
        { value: 'notifications', label: 'Push Notifications' }
      ]
    },
    {
      id: 'budget',
      type: 'number',
      label: 'Budget ($)',
      min: 0,
      conditionalOn: { field: 'projectType', value: ['web', 'mobile'] }
    },
    {
      id: 'timeline',
      type: 'date',
      label: 'Expected Completion Date',
      required: true
    },
    {
      id: 'teamSize',
      type: 'range',
      label: 'Team Size',
      min: 1,
      max: 20,
      defaultValue: 5
    }
  ];

  const formSchema = schema || defaultSchema;

  const updateFormData = (fieldId, value) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => ({ ...prev, [fieldId]: null }));
    }
  };

  const validateField = (field) => {
    const value = formData[field.id];
    
    if (field.required && (!value || (Array.isArray(value) && value.length === 0))) {
      return `${field.label} is required`;
    }
    
    if (field.type === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
      return 'Please enter a valid email address';
    }
    
    if (field.min !== undefined && value < field.min) {
      return `${field.label} must be at least ${field.min}`;
    }
    
    if (field.max !== undefined && value > field.max) {
      return `${field.label} must be no more than ${field.max}`;
    }
    
    return null;
  };

  const isFieldVisible = (field) => {
    if (!field.conditionalOn) return true;
    
    const conditionValue = formData[field.conditionalOn.field];
    const expectedValues = Array.isArray(field.conditionalOn.value) 
      ? field.conditionalOn.value 
      : [field.conditionalOn.value];
    
    return expectedValues.includes(conditionValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    const visibleFields = formSchema.filter(isFieldVisible);
    
    visibleFields.forEach(field => {
      const error = validateField(field);
      if (error) {
        newErrors[field.id] = error;
      }
    });
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit?.(formData);
      addNotification({
        type: 'success',
        title: 'Form Submitted',
        message: 'Your project details have been saved successfully'
      });
      setFormData({});
    } else {
      addNotification({
        type: 'error',
        title: 'Validation Error',
        message: 'Please fix the errors and try again'
      });
    }
  };

  const renderField = (field) => {
    const value = formData[field.id] || field.defaultValue || '';
    const error = errors[field.id];

    const baseInputClasses = `w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
      error ? 'border-red-500' : 'border-gray-300'
    }`;

    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
      case 'date':
        return (
          <input
            type={field.type}
            value={value}
            onChange={(e) => updateFormData(field.id, e.target.value)}
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
            className={baseInputClasses}
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => updateFormData(field.id, e.target.value)}
            placeholder={field.placeholder}
            rows={3}
            className={baseInputClasses}
          />
        );

      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => updateFormData(field.id, e.target.value)}
            className={baseInputClasses}
          >
            <option value="">Select an option...</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map(option => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name={field.id}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => updateFormData(field.id, e.target.value)}
                  className="mr-2 text-blue-500 focus:ring-blue-500"
                />
                {option.label}
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        const checkboxValues = Array.isArray(value) ? value : [];
        return (
          <div className="space-y-2">
            {field.options?.map(option => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  value={option.value}
                  checked={checkboxValues.includes(option.value)}
                  onChange={(e) => {
                    const newValues = e.target.checked
                      ? [...checkboxValues, option.value]
                      : checkboxValues.filter(v => v !== option.value);
                    updateFormData(field.id, newValues);
                  }}
                  className="mr-2 text-blue-500 focus:ring-blue-500"
                />
                {option.label}
              </label>
            ))}
          </div>
        );

      case 'range':
        return (
          <div>
            <input
              type="range"
              value={value}
              onChange={(e) => updateFormData(field.id, parseInt(e.target.value))}
              min={field.min}
              max={field.max}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>{field.min}</span>
              <span className="font-medium">{value}</span>
              <span>{field.max}</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-white">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Registration Form</h2>
        <p className="text-gray-600">Fill out the details for your new project</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        {formSchema.filter(isFieldVisible).map(field => (
          <div key={field.id} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            
            {renderField(field)}
            
            {errors[field.id] && (
              <p className="text-red-500 text-sm">{errors[field.id]}</p>
            )}
          </div>
        ))}

        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={() => setFormData({})}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Project
          </button>
        </div>
      </form>
    </div>
  );
};

// Main Dashboard Component
const KanbanCalender = () => {
  const [activeTab, setActiveTab] = useState('kanban');
  
  // Sample initial data
  const initialTasks = [
    {
      id: 1,
      title: 'Design new landing page',
      status: 'todo',
      priority: 'high',
      assignee: 'Sarah Chen',
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Implement user authentication',
      status: 'in-progress',
      priority: 'high',
      assignee: 'Mike Johnson',
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      title: 'Write API documentation',
      status: 'review',
      priority: 'medium',
      assignee: 'Alex Kim',
      createdAt: new Date().toISOString()
    },
    {
      id: 4,
      title: 'Deploy to production',
      status: 'done',
      priority: 'high',
      assignee: 'Sarah Chen',
      createdAt: new Date().toISOString()
    }
  ];

  const initialEvents = [
    {
      id: 1,
      title: 'Sprint Planning',
      date: new Date().toISOString(),
      time: '09:00',
      type: 'meeting'
    },
    {
      id: 2,
      title: 'Project Deadline',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      time: '17:00',
      type: 'deadline'
    }
  ];

  const handleTaskUpdate = (taskId, updates) => {
    console.log('Task updated:', taskId, updates);
  };

  const handleTaskCreate = (task) => {
    console.log('Task created:', task);
  };

  const handleTaskDelete = (taskId) => {
    console.log('Task deleted:', taskId);
  };

  const handleEventCreate = (event) => {
    console.log('Event created:', event);
  };

  const handleEventClick = (event) => {
    console.log('Event clicked:', event);
  };

  const handleFormSubmit = (formData) => {
    console.log('Form submitted:', formData);
  };

  const tabs = [
    { id: 'kanban', label: 'Kanban Board', icon: Filter },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'forms', label: 'Project Form', icon: Plus }
  ];

  return (
    <NotificationSystem>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              {/* <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-900">Project Management</h1>
              </div> */}
              
              <div className="flex items-center space-x-8">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>
          {activeTab === 'kanban' && (
            <KanbanBoard
              initialData={initialTasks}
              onTaskUpdate={handleTaskUpdate}
              onTaskCreate={handleTaskCreate}
              onTaskDelete={handleTaskDelete}
            />
          )}
          
          {activeTab === 'calendar' && (
            <CalendarInterface
              events={initialEvents}
              onEventCreate={handleEventCreate}
              onEventClick={handleEventClick}
            />
          )}
          
          {activeTab === 'forms' && (
            <FormBuilder
              onSubmit={handleFormSubmit}
            />
          )}
        </main>
      </div>
    </NotificationSystem>
  );
};

export default KanbanCalender;