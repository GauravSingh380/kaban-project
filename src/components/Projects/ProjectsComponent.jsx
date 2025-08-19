import React, { useState, useEffect } from 'react';
import {
    Plus, Search, MoreHorizontal, Calendar, Bug, AlertCircle, CheckCircle2, Clock,
    TrendingUp, TrendingDown, FolderOpen, Eye, Edit, Trash2, Archive, Star,
    Activity, Target, X, LayoutGrid, List, User, DollarSign, Tag, Users, Milestone
} from 'lucide-react';

// Reusable Input Components
const FormInput = ({ 
    label, 
    type = "text", 
    name, 
    value, 
    onChange, 
    placeholder, 
    required = false, 
    error = "", 
    disabled = false,
    className = "",
    icon: Icon = null,
    ...props 
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                )}
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={(e) => onChange(name, e.target.value)}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`w-full ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                    {...props}
                />
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

const FormTextarea = ({ 
    label, 
    name, 
    value, 
    onChange, 
    placeholder, 
    required = false, 
    error = "", 
    disabled = false,
    rows = 3,
    className = "",
    ...props 
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <textarea
                name={name}
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                rows={rows}
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed resize-vertical ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

const FormSelect = ({ 
    label, 
    name, 
    value, 
    onChange, 
    options, 
    required = false, 
    error = "", 
    disabled = false,
    placeholder = "Select an option",
    className = "",
    icon: Icon = null,
    ...props 
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                )}
                <select
                    name={name}
                    value={value}
                    onChange={(e) => onChange(name, e.target.value)}
                    disabled={disabled}
                    className={`w-full ${Icon ? 'pl-10' : 'pl-3'} pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                    {...props}
                >
                    <option value="">{placeholder}</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

const FormRange = ({ 
    label, 
    name, 
    value, 
    onChange, 
    min = 0, 
    max = 100, 
    step = 1, 
    required = false, 
    error = "", 
    disabled = false,
    className = "",
    showValue = true,
    ...props 
}) => {
    return (
        <div className={`mb-4 ${className}`}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
                {showValue && <span className="ml-2 text-sm text-gray-500">({value}%)</span>}
            </label>
            <input
                type="range"
                name={name}
                value={value}
                onChange={(e) => onChange(name, parseInt(e.target.value))}
                min={min}
                max={max}
                step={step}
                disabled={disabled}
                className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
                {...props}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{min}%</span>
                <span>{max}%</span>
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

const FormTagInput = ({ 
    label, 
    name, 
    value = [], 
    onChange, 
    placeholder = "Type and press Enter to add tags", 
    required = false, 
    error = "", 
    disabled = false,
    className = "",
    maxTags = 10,
    ...props 
}) => {
    const [inputValue, setInputValue] = useState("");

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            e.preventDefault();
            if (value.length < maxTags && !value.includes(inputValue.trim())) {
                onChange(name, [...value, inputValue.trim()]);
                setInputValue("");
            }
        }
    };

    const removeTag = (tagToRemove) => {
        onChange(name, value.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className={`mb-4 ${className}`}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                <div className="flex flex-wrap gap-1 mb-2">
                    {value.map((tag, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                            <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="ml-1 text-blue-600 hover:text-blue-800"
                                disabled={disabled}
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    ))}
                </div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={placeholder}
                    disabled={disabled || value.length >= maxTags}
                    className="w-full border-none outline-none disabled:cursor-not-allowed"
                    {...props}
                />
            </div>
            <p className="text-xs text-gray-500 mt-1">{value.length}/{maxTags} tags</p>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

const FormTeamInput = ({ 
    label, 
    name, 
    value = [], 
    onChange, 
    required = false, 
    error = "", 
    disabled = false,
    className = "",
    ...props 
}) => {
    const [memberName, setMemberName] = useState("");
    const [memberRole, setMemberRole] = useState("");

    const roles = [
        { value: "Project Manager", label: "Project Manager" },
        { value: "Frontend Developer", label: "Frontend Developer" },
        { value: "Backend Developer", label: "Backend Developer" },
        { value: "UI/UX Designer", label: "UI/UX Designer" },
        { value: "QA Engineer", label: "QA Engineer" },
        { value: "DevOps Engineer", label: "DevOps Engineer" },
        { value: "Business Analyst", label: "Business Analyst" },
    ];

    const addMember = () => {
        if (memberName.trim() && memberRole) {
            const avatar = memberName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
            onChange(name, [...value, { 
                name: memberName.trim(), 
                role: memberRole, 
                avatar 
            }]);
            setMemberName("");
            setMemberRole("");
        }
    };

    const removeMember = (indexToRemove) => {
        onChange(name, value.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className={`mb-4 ${className}`}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            
            {/* Add Member Form */}
            <div className="border border-gray-300 rounded-lg p-3 mb-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <input
                        type="text"
                        value={memberName}
                        onChange={(e) => setMemberName(e.target.value)}
                        placeholder="Member name"
                        disabled={disabled}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <select
                        value={memberRole}
                        onChange={(e) => setMemberRole(e.target.value)}
                        disabled={disabled}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Select role</option>
                        {roles.map(role => (
                            <option key={role.value} value={role.value}>
                                {role.label}
                            </option>
                        ))}
                    </select>
                    <button
                        type="button"
                        onClick={addMember}
                        disabled={!memberName.trim() || !memberRole || disabled}
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Plus className="w-4 h-4 inline mr-1" />
                        Add
                    </button>
                </div>
            </div>

            {/* Team Members List */}
            <div className="space-y-2">
                {value.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-medium">
                                {member.avatar}
                            </div>
                            <div>
                                <p className="font-medium text-sm">{member.name}</p>
                                <p className="text-xs text-gray-500">{member.role}</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => removeMember(index)}
                            disabled={disabled}
                            className="text-red-500 hover:text-red-700 disabled:cursor-not-allowed"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
            
            {value.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No team members added yet</p>
            )}
            
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

// Reusable Modal Component
const Modal = ({ 
    isOpen, 
    onClose, 
    title, 
    children, 
    size = "md", 
    showCloseButton = true,
    closeOnBackdrop = true 
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-2xl',
        lg: 'max-w-4xl',
        xl: 'max-w-6xl'
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div 
                className="fixed inset-0 bg-[rgba(0,0,0,0.35)] bg-opacity-50 transition-opacity"
                onClick={closeOnBackdrop ? onClose : undefined}
            />
            <div className={`relative bg-white rounded-lg shadow-xl w-full mx-4 ${sizeClasses[size]} max-h-[90vh] overflow-hidden`}>
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                    {showCloseButton && (
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    )}
                </div>
                
                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                    {children}
                </div>
            </div>
        </div>
    );
};

// Project Form Component
const ProjectForm = ({ onSubmit, onCancel, initialData = {} }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: '',
        priority: '',
        progress: 0,
        startDate: '',
        dueDate: '',
        budget: 0,
        spent: 0,
        client: '',
        tags: [],
        team: [],
        starred: false,
        ...initialData
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Project name is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.status) newErrors.status = 'Status is required';
        if (!formData.priority) newErrors.priority = 'Priority is required';
        if (!formData.startDate) newErrors.startDate = 'Start date is required';
        if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
        if (formData.budget <= 0) newErrors.budget = 'Budget must be greater than 0';
        if (!formData.client.trim()) newErrors.client = 'Client is required';
        
        if (formData.startDate && formData.dueDate && new Date(formData.startDate) >= new Date(formData.dueDate)) {
            newErrors.dueDate = 'Due date must be after start date';
        }

        if (formData.spent > formData.budget) {
            newErrors.spent = 'Amount spent cannot exceed budget';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit({
                ...formData,
                id: Date.now(), // Generate simple ID
                bugs: { total: 0, open: 0, critical: 0, resolved: 0 },
                milestones: { total: 0, completed: 0, upcoming: 0 }
            });
        }
    };

    const statusOptions = [
        { value: 'active', label: 'Active' },
        { value: 'testing', label: 'Testing' },
        { value: 'planning', label: 'Planning' },
        { value: 'completed', label: 'Completed' },
        { value: 'on_hold', label: 'On Hold' }
    ];

    const priorityOptions = [
        { value: 'critical', label: 'Critical' },
        { value: 'high', label: 'High' },
        { value: 'medium', label: 'Medium' },
        { value: 'low', label: 'Low' }
    ];

    return (
        <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                    label="Project Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter project name"
                    required
                    error={errors.name}
                    icon={FolderOpen}
                />

                <FormInput
                    label="Client"
                    name="client"
                    value={formData.client}
                    onChange={handleInputChange}
                    placeholder="Enter client name"
                    required
                    error={errors.client}
                    icon={User}
                />
            </div>

            <FormTextarea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter project description"
                required
                error={errors.description}
                rows={3}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormSelect
                    label="Status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    options={statusOptions}
                    required
                    error={errors.status}
                    placeholder="Select project status"
                    icon={Activity}
                />

                <FormSelect
                    label="Priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    options={priorityOptions}
                    required
                    error={errors.priority}
                    placeholder="Select project priority"
                    icon={AlertCircle}
                />
            </div>

            <FormRange
                label="Progress"
                name="progress"
                value={formData.progress}
                onChange={handleInputChange}
                min={0}
                max={100}
                step={5}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                    label="Start Date"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                    error={errors.startDate}
                    icon={Calendar}
                />

                <FormInput
                    label="Due Date"
                    name="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    required
                    error={errors.dueDate}
                    icon={Calendar}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                    label="Budget"
                    name="budget"
                    type="number"
                    value={formData.budget}
                    onChange={handleInputChange}
                    placeholder="Enter budget amount"
                    required
                    error={errors.budget}
                    min="0"
                    step="100"
                    icon={DollarSign}
                />

                <FormInput
                    label="Amount Spent"
                    name="spent"
                    type="number"
                    value={formData.spent}
                    onChange={handleInputChange}
                    placeholder="Enter amount spent"
                    error={errors.spent}
                    min="0"
                    step="100"
                    icon={DollarSign}
                />
            </div>

            <FormTagInput
                label="Tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="Type and press Enter to add tags"
                maxTags={8}
            />

            <FormTeamInput
                label="Team Members"
                name="team"
                value={formData.team}
                onChange={handleInputChange}
            />

            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Add Project
                </button>
            </div>
        </form>
    );
};

// Main Projects Component
const ProjectsComponent = () => {
    const [projects, setProjects] = useState([
        {
            id: 1,
            name: 'E-commerce Platform',
            description: 'Complete redesign of the e-commerce platform with modern UI/UX.',
            status: 'active',
            priority: 'high',
            progress: 78,
            startDate: '2024-01-15',
            dueDate: '2024-08-15',
            budget: 45000,
            spent: 35000,
            team: [
                { name: 'John Doe', role: 'Project Manager', avatar: 'JD' },
                { name: 'Sarah Wilson', role: 'Frontend Developer', avatar: 'SW' },
            ],
            bugs: { total: 15, open: 12, critical: 3, resolved: 3 },
            milestones: { total: 8, completed: 6, upcoming: 2 },
            client: 'TechCorp Inc.',
            tags: ['E-commerce', 'React', 'Node.js', 'MongoDB'],
            starred: true
        }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid');

    const handleAddProject = (newProject) => {
        setProjects(prev => [...prev, newProject]);
        setIsModalOpen(false);
    };

    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const ProjectCard = ({ project }) => (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">{project.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                    <p className="text-sm text-gray-500">Client: {project.client}</p>
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Star className="w-4 h-4" fill={project.starred ? 'currentColor' : 'none'} />
                </button>
            </div>

            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <p className="text-xs text-gray-500 mb-1">Budget</p>
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(project.budget)}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 mb-1">Spent</p>
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(project.spent)}</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-1">
                {project.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );

    return (
        <div className="max-w-full mx-auto bg-gray-50 min-h-screen p-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
                        <p className="text-gray-600 mt-1">Manage and track your project portfolio</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        New Project
                    </button>
                </div>

                {/* Search and View Toggle */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
                
                {filteredProjects.length === 0 && (
                    <div className="col-span-full text-center py-12">
                        <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                        <p className="text-gray-600 mb-4">
                            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating your first project.'}
                        </p>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="w-4 h-4 inline mr-2" />
                            New Project
                        </button>
                    </div>
                )}
            </div>

            {/* Add Project Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add New Project"
                size="lg"
            >
                <ProjectForm
                    onSubmit={handleAddProject}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
};

export default ProjectsComponent;