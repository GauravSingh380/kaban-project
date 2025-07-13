import React, { useState, useEffect } from 'react';
import { 
    User, 
    Mail, 
    Phone, 
    MapPin, 
    Calendar, 
    Briefcase, 
    Users, 
    Star,
    Edit3,
    Save,
    X,
    Plus,
    Trash2,
    Camera,
    CheckCircle2,
    AlertCircle,
    Clock,
    Building,
    Award,
    Target,
    BookOpen,
    Code,
    TrendingUp,
    Zap
} from 'lucide-react';

const UserProfileV2 = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [profileData, setProfileData] = useState({
        id: 1,
        name: 'John Doe',
        email: 'john.doe@company.com',
        phone: '+1 (555) 123-4567',
        location: 'New York, NY',
        department: 'Engineering',
        role: 'Senior Developer',
        avatar: 'JD',
        isOnline: true,
        status: 'active',
        workload: 85,
        performance: 92,
        completedTasks: 28,
        totalTasks: 35,
        joinDate: '2023-01-15',
        experience: 5,
        starred: false,
        projects: ['E-commerce Platform', 'Mobile App', 'Analytics Dashboard'],
        skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'GraphQL'],
        bio: 'Passionate full-stack developer with 5+ years of experience in building scalable web applications. Love working with modern technologies and solving complex problems.',
        recentAchievements: ['Completed React Certification', 'Led team of 5 developers', 'Delivered project 2 weeks early']
    });

    const [editData, setEditData] = useState(profileData);
    const [newSkill, setNewSkill] = useState('');
    const [newProject, setNewProject] = useState('');
    const [newAchievement, setNewAchievement] = useState('');

    const departmentOptions = [
        { value: 'engineering', label: 'Engineering' },
        { value: 'design', label: 'Design' },
        { value: 'product', label: 'Product' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'sales', label: 'Sales' },
        { value: 'hr', label: 'Human Resources' },
        { value: 'finance', label: 'Finance' }
    ];

    const roleOptions = [
        { value: 'manager', label: 'Manager' },
        { value: 'qa_manager', label: 'QA Manager' },
        { value: 'lead', label: 'Team Lead' },
        { value: 'senior', label: 'Senior Developer' },
        { value: 'junior', label: 'Junior Developer' },
        { value: 'devops', label: 'DevOps Engineer' },
        { value: 'designer', label: 'UI/UX Designer' },
        { value: 'analyst', label: 'Analyst' }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-700 border-green-200';
            case 'inactive': return 'bg-gray-100 text-gray-700 border-gray-200';
            case 'on_leave': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getWorkloadColor = (workload) => {
        if (workload >= 90) return 'bg-red-100 text-red-700';
        if (workload >= 70) return 'bg-yellow-100 text-yellow-700';
        return 'bg-green-100 text-green-700';
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleEdit = () => {
        setEditData(profileData);
        setIsEditing(true);
    };

    const handleSave = () => {
        setProfileData(editData);
        setIsEditing(false);
        // Here you would typically send the updated data to your API
        alert('Profile updated successfully!');
    };

    const handleCancel = () => {
        setEditData(profileData);
        setIsEditing(false);
    };

    const handleInputChange = (field, value) => {
        setEditData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const addSkill = () => {
        if (newSkill.trim() && !editData.skills.includes(newSkill.trim())) {
            setEditData(prev => ({
                ...prev,
                skills: [...prev.skills, newSkill.trim()]
            }));
            setNewSkill('');
        }
    };

    const removeSkill = (skillToRemove) => {
        setEditData(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill !== skillToRemove)
        }));
    };

    const addProject = () => {
        if (newProject.trim() && !editData.projects.includes(newProject.trim())) {
            setEditData(prev => ({
                ...prev,
                projects: [...prev.projects, newProject.trim()]
            }));
            setNewProject('');
        }
    };

    const removeProject = (projectToRemove) => {
        setEditData(prev => ({
            ...prev,
            projects: prev.projects.filter(project => project !== projectToRemove)
        }));
    };

    const addAchievement = () => {
        if (newAchievement.trim() && !editData.recentAchievements.includes(newAchievement.trim())) {
            setEditData(prev => ({
                ...prev,
                recentAchievements: [...prev.recentAchievements, newAchievement.trim()]
            }));
            setNewAchievement('');
        }
    };

    const removeAchievement = (achievementToRemove) => {
        setEditData(prev => ({
            ...prev,
            recentAchievements: prev.recentAchievements.filter(achievement => achievement !== achievementToRemove)
        }));
    };

    const tabs = [
        { id: 'overview', label: 'Overview', icon: User },
        { id: 'details', label: 'Details', icon: Briefcase },
        { id: 'projects', label: 'Projects', icon: Target },
        { id: 'achievements', label: 'Achievements', icon: Award }
    ];

    return (
        <div className="">
            <div className="max-w-8xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                            <div className="flex gap-2">
                                {!isEditing ? (
                                    <button
                                        onClick={handleEdit}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <Edit3 className="w-4 h-4" />
                                        Edit Profile
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleSave}
                                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                            <Save className="w-4 h-4" />
                                            Save
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Profile Header */}
                        <div className="flex items-start gap-6">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl flex items-center justify-center font-medium shadow-lg">
                                    {profileData.avatar}
                                </div>
                                {profileData.isOnline && (
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
                                )}
                                {isEditing && (
                                    <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors shadow-lg">
                                        <Camera className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="text-xl font-semibold text-gray-900">{profileData.name}</h2>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(profileData.status)}`}>
                                        {profileData.status === 'active' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                                        {profileData.status === 'inactive' && <AlertCircle className="w-3 h-3 mr-1" />}
                                        {profileData.status === 'on_leave' && <Clock className="w-3 h-3 mr-1" />}
                                        {profileData.status.charAt(0).toUpperCase() + profileData.status.slice(1).replace('_', ' ')}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-2">{profileData.role} • {profileData.department}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        {profileData.location}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        Joined {formatDate(profileData.joinDate)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                                            activeTab === tab.id
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="p-6">
                        {activeTab === 'overview' && (
                            <div className="space-y-8">
                                {/* Quick Stats */}
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-blue-600 font-medium">Experience</p>
                                                <p className="text-2xl font-bold text-blue-700">{profileData.experience}</p>
                                                <p className="text-xs text-blue-500">Years</p>
                                            </div>
                                            <Building className="w-8 h-8 text-blue-500" />
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-green-600 font-medium">Projects</p>
                                                <p className="text-2xl font-bold text-green-700">{profileData.projects.length}</p>
                                                <p className="text-xs text-green-500">Active</p>
                                            </div>
                                            <Target className="w-8 h-8 text-green-500" />
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-purple-600 font-medium">Skills</p>
                                                <p className="text-2xl font-bold text-purple-700">{profileData.skills.length}</p>
                                                <p className="text-xs text-purple-500">Technologies</p>
                                            </div>
                                            <Code className="w-8 h-8 text-purple-500" />
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-yellow-600 font-medium">Achievements</p>
                                                <p className="text-2xl font-bold text-yellow-700">{profileData.recentAchievements.length}</p>
                                                <p className="text-xs text-yellow-500">Recent</p>
                                            </div>
                                            <Award className="w-8 h-8 text-yellow-500" />
                                        </div>
                                    </div>
                                </div>

                                {/* Main Content Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Left Column - Contact & Work Info */}
                                    <div className="space-y-6">
                                        {/* Contact Information */}
                                        <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                <Mail className="w-5 h-5 text-blue-500" />
                                                Contact Information
                                            </h3>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <Mail className="w-4 h-4 text-gray-400" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">Email</p>
                                                        <p className="text-sm font-medium text-gray-900">{profileData.email}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Phone className="w-4 h-4 text-gray-400" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">Phone</p>
                                                        <p className="text-sm font-medium text-gray-900">{profileData.phone || 'Not provided'}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <MapPin className="w-4 h-4 text-gray-400" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">Location</p>
                                                        <p className="text-sm font-medium text-gray-900">{profileData.location}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Work Information */}
                                        <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                <Briefcase className="w-5 h-5 text-green-500" />
                                                Work Information
                                            </h3>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <Building className="w-4 h-4 text-gray-400" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">Department</p>
                                                        <p className="text-sm font-medium text-gray-900">{profileData.department}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <User className="w-4 h-4 text-gray-400" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">Role</p>
                                                        <p className="text-sm font-medium text-gray-900">{profileData.role}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Calendar className="w-4 h-4 text-gray-400" />
                                                    <div>
                                                        <p className="text-xs text-gray-500">Join Date</p>
                                                        <p className="text-sm font-medium text-gray-900">{formatDate(profileData.joinDate)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Middle Column - Bio & Skills */}
                                    <div className="space-y-6">
                                        {/* Bio */}
                                        <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                <BookOpen className="w-5 h-5 text-blue-500" />
                                                About Me
                                            </h3>
                                            <p className="text-gray-700 leading-relaxed text-sm">
                                                {profileData.bio || 'No bio provided yet.'}
                                            </p>
                                        </div>

                                        {/* Skills */}
                                        <div className="bg-purple-50 rounded-lg p-5 border border-purple-200">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                <Code className="w-5 h-5 text-purple-500" />
                                                Technical Skills
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {profileData.skills.map((skill, index) => (
                                                    <span key={index} className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full border border-purple-200">
                                                        <Zap className="w-3 h-3 mr-1" />
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column - Projects & Achievements */}
                                    <div className="space-y-6">
                                        {/* Current Projects */}
                                        <div className="bg-green-50 rounded-lg p-5 border border-green-200">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                <Target className="w-5 h-5 text-green-500" />
                                                Current Projects
                                            </h3>
                                            <div className="space-y-2">
                                                {profileData.projects.map((project, index) => (
                                                    <div key={index} className="flex items-center gap-3 p-2 bg-white rounded-md border border-green-200">
                                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                        <span className="text-sm font-medium text-gray-900">{project}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Recent Achievements */}
                                        <div className="bg-yellow-50 rounded-lg p-5 border border-yellow-200">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                <Award className="w-5 h-5 text-yellow-500" />
                                                Recent Achievements
                                            </h3>
                                            <div className="space-y-3">
                                                {profileData.recentAchievements.map((achievement, index) => (
                                                    <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-md border border-yellow-200">
                                                        <Award className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                                                        <span className="text-sm text-gray-900">{achievement}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'details' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        ) : (
                                            <p className="py-2 text-gray-900">{profileData.name}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <p className="py-2 text-gray-900">{profileData.email}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                value={editData.phone || ''}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        ) : (
                                            <p className="py-2 text-gray-900">{profileData.phone || 'Not provided'}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editData.location || ''}
                                                onChange={(e) => handleInputChange('location', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        ) : (
                                            <p className="py-2 text-gray-900">{profileData.location || 'Not provided'}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                                        {isEditing ? (
                                            <select
                                                value={editData.department || ''}
                                                onChange={(e) => handleInputChange('department', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">Select Department</option>
                                                {departmentOptions.map(option => (
                                                    <option key={option.value} value={option.label}>{option.label}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <p className="py-2 text-gray-900">{profileData.department || 'Not provided'}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                                        {isEditing ? (
                                            <select
                                                value={editData.role || ''}
                                                onChange={(e) => handleInputChange('role', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">Select Role</option>
                                                {roleOptions.map(option => (
                                                    <option key={option.value} value={option.label}>{option.label}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <p className="py-2 text-gray-900">{profileData.role || 'Not provided'}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Experience (Years)</label>
                                        {isEditing ? (
                                            <input
                                                type="number"
                                                min="0"
                                                max="50"
                                                value={editData.experience || ''}
                                                onChange={(e) => handleInputChange('experience', parseInt(e.target.value))}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        ) : (
                                            <p className="py-2 text-gray-900">{profileData.experience || 0} years</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
                                        <p className="py-2 text-gray-900">{formatDate(profileData.joinDate)}</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                                    {isEditing ? (
                                        <textarea
                                            value={editData.bio || ''}
                                            onChange={(e) => handleInputChange('bio', e.target.value)}
                                            rows={4}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Tell us about yourself..."
                                        />
                                    ) : (
                                        <p className="py-2 text-gray-900">{profileData.bio || 'No bio provided yet.'}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                                    <div className="space-y-2">
                                        <div className="flex flex-wrap gap-2">
                                            {(isEditing ? editData.skills : profileData.skills).map((skill, index) => (
                                                <span key={index} className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                                                    {skill}
                                                    {isEditing && (
                                                        <button
                                                            onClick={() => removeSkill(skill)}
                                                            className="ml-2 text-blue-500 hover:text-blue-700"
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    )}
                                                </span>
                                            ))}
                                        </div>
                                        {isEditing && (
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={newSkill}
                                                    onChange={(e) => setNewSkill(e.target.value)}
                                                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                                                    placeholder="Add a new skill"
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                <button
                                                    onClick={addSkill}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'projects' && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Projects</h3>
                                <div className="space-y-2">
                                    <div className="flex flex-wrap gap-2">
                                        {(isEditing ? editData.projects : profileData.projects).map((project, index) => (
                                            <span key={index} className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                                                {project}
                                                {isEditing && (
                                                    <button
                                                        onClick={() => removeProject(project)}
                                                        className="ml-2 text-green-500 hover:text-green-700"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                )}
                                            </span>
                                        ))}
                                    </div>
                                    {isEditing && (
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={newProject}
                                                onChange={(e) => setNewProject(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && addProject()}
                                                placeholder="Add a new project"
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            <button
                                                onClick={addProject}
                                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'achievements' && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
                                <div className="space-y-3">
                                    {(isEditing ? editData.recentAchievements : profileData.recentAchievements).map((achievement, index) => (
                                        <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                                            <Award className="w-5 h-5 text-yellow-600 mt-0.5" />
                                            <span className="flex-1 text-gray-900">{achievement}</span>
                                            {isEditing && (
                                                <button
                                                    onClick={() => removeAchievement(achievement)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    {isEditing && (
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={newAchievement}
                                                onChange={(e) => setNewAchievement(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && addAchievement()}
                                                placeholder="Add a new achievement"
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            <button
                                                onClick={addAchievement}
                                                className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfileV2;