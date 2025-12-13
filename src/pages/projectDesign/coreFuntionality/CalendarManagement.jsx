import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar, Clock, MapPin, Users, Bug, Target, X } from 'lucide-react';

// Sample events data
const initialEvents = [
  {
    id: 'event-1',
    title: 'Sprint 5 Planning',
    type: 'sprint',
    date: '2025-12-09',
    time: '10:00 AM',
    duration: '2 hours',
    location: 'Conference Room A',
    attendees: ['Gaurav Singh', 'Priya Sharma', 'Rahul Verma'],
    project: 'TWR',
    description: 'Plan tasks and assign story points for Sprint 5'
  },
  {
    id: 'event-2',
    title: 'Bug Triage Meeting',
    type: 'meeting',
    date: '2025-12-13',
    time: '2:00 PM',
    duration: '1 hour',
    location: 'Virtual - Zoom',
    attendees: ['Gaurav Singh', 'Anjali Patel'],
    project: 'ECP',
    description: 'Review and prioritize reported bugs'
  },
  {
    id: 'event-3',
    title: 'Sprint 5 Demo',
    type: 'demo',
    date: '2025-12-20',
    time: '3:00 PM',
    duration: '1 hour',
    location: 'Virtual - Teams',
    attendees: ['All Team'],
    project: 'TWR',
    description: 'Showcase completed features from Sprint 5'
  },
  {
    id: 'event-4',
    title: 'Sprint 5 Ends',
    type: 'deadline',
    date: '2025-12-22',
    time: '11:59 PM',
    duration: '0',
    project: 'TWR',
    description: 'Sprint 5 completion deadline'
  },
  {
    id: 'event-5',
    title: 'Code Review Session',
    type: 'meeting',
    date: '2025-12-16',
    time: '11:00 AM',
    duration: '1.5 hours',
    location: 'Conference Room B',
    attendees: ['Gaurav Singh', 'Rahul Verma', 'Anjali Patel'],
    project: 'TWR',
    description: 'Review pull requests and code quality'
  },
  {
    id: 'event-6',
    title: 'Bug Fix Deadline - Critical Issues',
    type: 'deadline',
    date: '2025-12-15',
    time: '5:00 PM',
    duration: '0',
    project: 'ECP',
    description: 'All critical bugs must be fixed by this date'
  }
];

const EventModal = ({ isOpen, onClose, onSave, event = null, selectedDate = null }) => {
  const [formData, setFormData] = useState(event || {
    title: '',
    type: 'meeting',
    date: selectedDate || new Date().toISOString().split('T')[0],
    time: '10:00 AM',
    duration: '1 hour',
    location: '',
    attendees: [],
    project: 'TWR',
    description: ''
  });

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!formData.title || !formData.date) {
      alert('Please fill in all required fields');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {event ? 'Edit Event' : 'Create New Event'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter event title"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="meeting">Meeting</option>
                <option value="sprint">Sprint</option>
                <option value="demo">Demo</option>
                <option value="deadline">Deadline</option>
                <option value="review">Review</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project
              </label>
              <select
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="TWR">TWR</option>
                <option value="ECP">ECP</option>
                <option value="MBA">MBA</option>
                <option value="HCP">HCP</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="text"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="10:00 AM"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="1 hour"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Conference Room or Virtual link"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Event description..."
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              {event ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EventCard = ({ event, onClick, onDelete }) => {
  const getTypeColor = (type) => {
    const colors = {
      meeting: 'bg-blue-100 text-blue-800 border-blue-300',
      sprint: 'bg-purple-100 text-purple-800 border-purple-300',
      demo: 'bg-green-100 text-green-800 border-green-300',
      deadline: 'bg-red-100 text-red-800 border-red-300',
      review: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      other: 'bg-gray-100 text-gray-800 border-gray-300'
    };
    return colors[type] || colors.other;
  };

  const getTypeIcon = (type) => {
    if (type === 'sprint') return <Target className="w-3 h-3" />;
    if (type === 'deadline') return <Clock className="w-3 h-3" />;
    if (type === 'demo') return <Users className="w-3 h-3" />;
    return <Calendar className="w-3 h-3" />;
  };

  return (
    <div
      onClick={onClick}
      className={`p-2 mb-1 rounded border-l-4 cursor-pointer hover:shadow-sm transition-all ${getTypeColor(event.type)}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-1 mb-1">
            {getTypeIcon(event.type)}
            <p className="text-xs font-semibold truncate">{event.title}</p>
          </div>
          {event.time && event.duration !== '0' && (
            <p className="text-xs opacity-75">{event.time}</p>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(event.id);
          }}
          className="opacity-0 group-hover:opacity-100 hover:text-red-600 transition-opacity"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

const CalendarManagement = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [view, setView] = useState('month'); // month, week, day

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(e => e.date === dateStr);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleDateClick = (date) => {
    if (!date) return;
    setSelectedDate(date.toISOString().split('T')[0]);
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleSaveEvent = (eventData) => {
    if (selectedEvent) {
      setEvents(events.map(e => 
        e.id === selectedEvent.id ? { ...eventData, id: e.id } : e
      ));
    } else {
      const newEvent = {
        ...eventData,
        id: `event-${Date.now()}`
      };
      setEvents([...events, newEvent]);
    }
    setIsModalOpen(false);
    setSelectedEvent(null);
    setSelectedDate(null);
  };

  const handleDeleteEvent = (id) => {
    if (confirm('Delete this event?')) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  const days = getDaysInMonth(currentDate);
  const today = new Date().toDateString();

  const upcomingEvents = events
    .filter(e => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
              <p className="text-gray-600 mt-1">Manage your events and deadlines</p>
            </div>
            <button
              onClick={() => {
                setSelectedEvent(null);
                setSelectedDate(new Date().toISOString().split('T')[0]);
                setIsModalOpen(true);
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Event</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                  <button
                    onClick={handleToday}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Today
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrevMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Days of Week */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {daysOfWeek.map(day => (
                  <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {days.map((date, index) => {
                  const isToday = date && date.toDateString() === today;
                  const dayEvents = getEventsForDate(date);
                  
                  return (
                    <div
                      key={index}
                      onClick={() => handleDateClick(date)}
                      className={`min-h-[120px] p-2 border rounded-lg transition-all cursor-pointer group ${
                        !date
                          ? 'bg-gray-50 border-gray-100'
                          : isToday
                          ? 'bg-purple-50 border-purple-300 border-2'
                          : 'bg-white border-gray-200 hover:border-purple-300 hover:shadow-sm'
                      }`}
                    >
                      {date && (
                        <>
                          <div className={`text-sm font-semibold mb-1 ${
                            isToday ? 'text-purple-600' : 'text-gray-700'
                          }`}>
                            {date.getDate()}
                          </div>
                          <div className="space-y-1 max-h-[80px] overflow-y-auto">
                            {dayEvents.map(event => (
                              <EventCard
                                key={event.id}
                                event={event}
                                onClick={() => handleEventClick(event)}
                                onDelete={handleDeleteEvent}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Upcoming Events Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Events</h3>
              <div className="space-y-4">
                {upcomingEvents.map(event => {
                  const getTypeColor = (type) => {
                    const colors = {
                      meeting: 'bg-blue-100 text-blue-800',
                      sprint: 'bg-purple-100 text-purple-800',
                      demo: 'bg-green-100 text-green-800',
                      deadline: 'bg-red-100 text-red-800',
                      review: 'bg-yellow-100 text-yellow-800',
                      other: 'bg-gray-100 text-gray-800'
                    };
                    return colors[type] || colors.other;
                  };

                  return (
                    <div
                      key={event.id}
                      onClick={() => handleEventClick(event)}
                      className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-sm text-gray-900">{event.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(event.type)}`}>
                          {event.type}
                        </span>
                      </div>
                      <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        {event.time && event.duration !== '0' && (
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{event.time} ({event.duration})</span>
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{event.location}</span>
                          </div>
                        )}
                      </div>
                      <div className="mt-2 text-xs text-purple-600">
                        {event.project}
                      </div>
                    </div>
                  );
                })}
                {upcomingEvents.length === 0 && (
                  <p className="text-center text-gray-500 py-8 text-sm">No upcoming events</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(null);
          setSelectedDate(null);
        }}
        onSave={handleSaveEvent}
        event={selectedEvent}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default CalendarManagement;