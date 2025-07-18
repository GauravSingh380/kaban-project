import React, { useState, useEffect } from 'react';
import {
    Settings,
    User,
    Shield,
    Bell,
    Palette,
    Globe,
    Database,
    Key,
    Users,
    Mail,
    Smartphone,
    Monitor,
    Moon,
    Sun,
    Eye,
    EyeOff,
    Check,
    X,
    Save,
    RotateCcw,
    Download,
    Upload,
    Trash2,
    AlertTriangle,
    Info,
    Lock,
    Unlock,
    Calendar,
    Clock,
    Languages,
    Zap,
    HelpCircle,
    ExternalLink,
    ChevronRight,
} from 'lucide-react';

const SettingsPage1 = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [settings, setSettings] = useState({
        // General Settings
        timezone: 'UTC-5',
        language: 'en',
        dateFormat: 'MM/DD/YYYY',
        timeFormat: '12h',
        weekStart: 'monday',
        
        // Appearance
        theme: 'light',
        sidebarCollapsed: false,
        density: 'comfortable',
        accentColor: 'blue',
        
        // Notifications
        emailNotifications: true,
        pushNotifications: true,
        desktopNotifications: false,
        notificationSound: true,
        
        // Notification Types
        taskAssignments: true,
        taskDeadlines: true,
        projectUpdates: true,
        teamMentions: true,
        statusChanges: true,
        comments: true,
        
        // Privacy & Security
        profileVisibility: 'team',
        showOnlineStatus: true,
        allowDirectMessages: true,
        twoFactorAuth: false,
        sessionTimeout: 30,
        
        // Data & Storage
        autoSave: true,
        backupFrequency: 'weekly',
        dataRetention: 90,
        
        // Integrations
        slackIntegration: false,
        googleCalendar: false,
        githubIntegration: false,
        jiraIntegration: false,
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(settings);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setEditData(settings);
    }, [settings]);

    const handleSettingChange = (section, key, value) => {
        setEditData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSave = () => {
        setSettings(editData);
        setIsEditing(false);
        // Here you would typically save to your backend
        console.log('Settings saved:', editData);
    };

    const handleCancel = () => {
        setEditData(settings);
        setIsEditing(false);
    };

    const resetToDefaults = () => {
        if (window.confirm('Are you sure you want to reset all settings to default values?')) {
            // Reset to default values
            const defaultSettings = {
                timezone: 'UTC-5',
                language: 'en',
                dateFormat: 'MM/DD/YYYY',
                timeFormat: '12h',
                weekStart: 'monday',
                theme: 'light',
                sidebarCollapsed: false,
                density: 'comfortable',
                accentColor: 'blue',
                emailNotifications: true,
                pushNotifications: true,
                desktopNotifications: false,
                notificationSound: true,
                taskAssignments: true,
                taskDeadlines: true,
                projectUpdates: true,
                teamMentions: true,
                statusChanges: true,
                comments: true,
                profileVisibility: 'team',
                showOnlineStatus: true,
                allowDirectMessages: true,
                twoFactorAuth: false,
                sessionTimeout: 30,
                autoSave: true,
                backupFrequency: 'weekly',
                dataRetention: 90,
                slackIntegration: false,
                googleCalendar: false,
                githubIntegration: false,
                jiraIntegration: false,
            };
            setEditData(defaultSettings);
        }
    };

    const tabs = [
        { id: 'general', label: 'General', icon: Settings },
        { id: 'appearance', label: 'Appearance', icon: Palette },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'privacy', label: 'Privacy & Security', icon: Shield },
        { id: 'data', label: 'Data & Storage', icon: Database },
        { id: 'integrations', label: 'Integrations', icon: Zap },
        { id: 'account', label: 'Account', icon: User },
    ];

    const ToggleSwitch = ({ enabled, onChange, disabled = false }) => (
        <button
            onClick={() => !disabled && onChange(!enabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                enabled ? 'bg-blue-600' : 'bg-gray-200'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={disabled}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
        </button>
    );

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                        <div className="flex gap-2">
                            {isEditing ? (
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        <Save className="w-4 h-4" />
                                        Save Changes
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <Settings className="w-4 h-4" />
                                        Edit Settings
                                    </button>
                                    <button
                                        onClick={resetToDefaults}
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        <RotateCcw className="w-4 h-4" />
                                        Reset to Defaults
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Settings Tabs */}
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8">
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
                </div>
            </div>

            {/* Settings Content */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                    {/* General Settings */}
                    {activeTab === 'general' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">General Preferences</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Globe className="w-4 h-4 inline mr-1" />
                                            Timezone
                                        </label>
                                        <select
                                            value={editData.timezone}
                                            onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                                        >
                                            <option value="UTC-12">UTC-12:00 (Baker Island)</option>
                                            <option value="UTC-11">UTC-11:00 (American Samoa)</option>
                                            <option value="UTC-10">UTC-10:00 (Hawaii)</option>
                                            <option value="UTC-9">UTC-09:00 (Alaska)</option>
                                            <option value="UTC-8">UTC-08:00 (Pacific Time)</option>
                                            <option value="UTC-7">UTC-07:00 (Mountain Time)</option>
                                            <option value="UTC-6">UTC-06:00 (Central Time)</option>
                                            <option value="UTC-5">UTC-05:00 (Eastern Time)</option>
                                            <option value="UTC-4">UTC-04:00 (Atlantic Time)</option>
                                            <option value="UTC+0">UTC+00:00 (Greenwich Mean Time)</option>
                                            <option value="UTC+1">UTC+01:00 (Central European Time)</option>
                                            <option value="UTC+2">UTC+02:00 (Eastern European Time)</option>
                                            <option value="UTC+3">UTC+03:00 (Moscow Time)</option>
                                            <option value="UTC+5:30">UTC+05:30 (India Standard Time)</option>
                                            <option value="UTC+8">UTC+08:00 (China Standard Time)</option>
                                            <option value="UTC+9">UTC+09:00 (Japan Standard Time)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Languages className="w-4 h-4 inline mr-1" />
                                            Language
                                        </label>
                                        <select
                                            value={editData.language}
                                            onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                                        >
                                            <option value="en">English</option>
                                            <option value="es">Spanish</option>
                                            <option value="fr">French</option>
                                            <option value="de">German</option>
                                            <option value="it">Italian</option>
                                            <option value="pt">Portuguese</option>
                                            <option value="ja">Japanese</option>
                                            <option value="ko">Korean</option>
                                            <option value="zh">Chinese</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Calendar className="w-4 h-4 inline mr-1" />
                                            Date Format
                                        </label>
                                        <select
                                            value={editData.dateFormat}
                                            onChange={(e) => handleSettingChange('general', 'dateFormat', e.target.value)}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                                        >
                                            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                                            <option value="DD-MM-YYYY">DD-MM-YYYY</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Clock className="w-4 h-4 inline mr-1" />
                                            Time Format
                                        </label>
                                        <select
                                            value={editData.timeFormat}
                                            onChange={(e) => handleSettingChange('general', 'timeFormat', e.target.value)}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                                        >
                                            <option value="12h">12-hour (AM/PM)</option>
                                            <option value="24h">24-hour</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Calendar className="w-4 h-4 inline mr-1" />
                                            Week Starts On
                                        </label>
                                        <select
                                            value={editData.weekStart}
                                            onChange={(e) => handleSettingChange('general', 'weekStart', e.target.value)}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                                        >
                                            <option value="sunday">Sunday</option>
                                            <option value="monday">Monday</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Appearance Settings */}
                    {activeTab === 'appearance' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Appearance & Theme</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                                        <div className="space-y-2">
                                            {[
                                                { value: 'light', label: 'Light', icon: Sun },
                                                { value: 'dark', label: 'Dark', icon: Moon },
                                                { value: 'auto', label: 'Auto (System)', icon: Monitor }
                                            ].map((theme) => {
                                                const Icon = theme.icon;
                                                return (
                                                    <label key={theme.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="theme"
                                                            value={theme.value}
                                                            checked={editData.theme === theme.value}
                                                            onChange={(e) => handleSettingChange('appearance', 'theme', e.target.value)}
                                                            disabled={!isEditing}
                                                            className="text-blue-600 focus:ring-blue-500"
                                                        />
                                                        <Icon className="w-5 h-5 text-gray-400" />
                                                        <span className="text-sm font-medium text-gray-700">{theme.label}</span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
                                        <div className="grid grid-cols-6 gap-2">
                                            {[
                                                { value: 'blue', color: 'bg-blue-500' },
                                                { value: 'green', color: 'bg-green-500' },
                                                { value: 'purple', color: 'bg-purple-500' },
                                                { value: 'pink', color: 'bg-pink-500' },
                                                { value: 'red', color: 'bg-red-500' },
                                                { value: 'orange', color: 'bg-orange-500' }
                                            ].map((color) => (
                                                <button
                                                    key={color.value}
                                                    onClick={() => handleSettingChange('appearance', 'accentColor', color.value)}
                                                    disabled={!isEditing}
                                                    className={`w-8 h-8 rounded-full ${color.color} ${
                                                        editData.accentColor === color.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                                                    } disabled:opacity-50`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Display Density</label>
                                        <select
                                            value={editData.density}
                                            onChange={(e) => handleSettingChange('appearance', 'density', e.target.value)}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                                        >
                                            <option value="compact">Compact</option>
                                            <option value="comfortable">Comfortable</option>
                                            <option value="spacious">Spacious</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Sidebar</label>
                                        <div className="flex items-center justify-between p-3 border rounded-lg">
                                            <span className="text-sm text-gray-700">Collapsed by default</span>
                                            <ToggleSwitch
                                                enabled={editData.sidebarCollapsed}
                                                onChange={(value) => handleSettingChange('appearance', 'sidebarCollapsed', value)}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Notification Settings */}
                    {activeTab === 'notifications' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                                <div className="space-y-4">
                                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Bell className="w-5 h-5 text-blue-600" />
                                            <h4 className="font-medium text-blue-900">Delivery Methods</h4>
                                        </div>
                                        <div className="space-y-3">
                                            {[
                                                { key: 'emailNotifications', label: 'Email Notifications', icon: Mail },
                                                { key: 'pushNotifications', label: 'Push Notifications', icon: Smartphone },
                                                { key: 'desktopNotifications', label: 'Desktop Notifications', icon: Monitor },
                                                { key: 'notificationSound', label: 'Notification Sound', icon: Bell }
                                            ].map((item) => {
                                                const Icon = item.icon;
                                                return (
                                                    <div key={item.key} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                                        <div className="flex items-center gap-3">
                                                            <Icon className="w-4 h-4 text-gray-400" />
                                                            <span className="text-sm font-medium text-gray-700">{item.label}</span>
                                                        </div>
                                                        <ToggleSwitch
                                                            enabled={editData[item.key]}
                                                            onChange={(value) => handleSettingChange('notifications', item.key, value)}
                                                            disabled={!isEditing}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Info className="w-5 h-5 text-green-600" />
                                            <h4 className="font-medium text-green-900">What to Notify</h4>
                                        </div>
                                        <div className="space-y-3">
                                            {[
                                                { key: 'taskAssignments', label: 'Task Assignments' },
                                                { key: 'taskDeadlines', label: 'Task Deadlines' },
                                                { key: 'projectUpdates', label: 'Project Updates' },
                                                { key: 'teamMentions', label: 'Team Mentions' },
                                                { key: 'statusChanges', label: 'Status Changes' },
                                                { key: 'comments', label: 'Comments & Replies' }
                                            ].map((item) => (
                                                <div key={item.key} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                                                    <ToggleSwitch
                                                        enabled={editData[item.key]}
                                                        onChange={(value) => handleSettingChange('notifications', item.key, value)}
                                                        disabled={!isEditing}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Privacy & Security Settings */}
                    {activeTab === 'privacy' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy & Security</h3>
                                <div className="space-y-4">
                                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Shield className="w-5 h-5 text-yellow-600" />
                                            <h4 className="font-medium text-yellow-900">Profile Privacy</h4>
                                        </div>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
                                                <select
                                                    value={editData.profileVisibility}
                                                    onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                                                    disabled={!isEditing}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                                                >
                                                    <option value="public">Public (Everyone)</option>
                                                    <option value="team">Team Only</option>
                                                    <option value="private">Private (Only Me)</option>
                                                </select>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                                <span className="text-sm font-medium text-gray-700">Show Online Status</span>
                                                <ToggleSwitch
                                                    enabled={editData.showOnlineStatus}
                                                    onChange={(value) => handleSettingChange('privacy', 'showOnlineStatus', value)}
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                                <span className="text-sm font-medium text-gray-700">Allow Direct Messages</span>
                                                <ToggleSwitch
                                                    enabled={editData.allowDirectMessages}
                                                    onChange={(value) => handleSettingChange('privacy', 'allowDirectMessages', value)}
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Lock className="w-5 h-5 text-red-600" />
                                            <h4 className="font-medium text-red-900">Security Settings</h4>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                                <div>
                                                    <span className="text-sm font-medium text-gray-700">Two-Factor Authentication</span>
                                                    <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
                                                </div>
                                                <ToggleSwitch
                                                    enabled={editData.twoFactorAuth}
                                                    onChange={(value) => handleSettingChange('privacy', 'twoFactorAuth', value)}
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                                                <select
                                                    value={editData.sessionTimeout}
                                                    onChange={(e) => handleSettingChange('privacy', 'sessionTimeout', parseInt(e.target.value))}
                                                    disabled={!isEditing}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                                                >
                                                    <option value={15}>15 minutes</option>
                                                    <option value={30}>30 minutes</option>
                                                    <option value={60}>1 hour</option>
                                                    <option value={120}>2 hours</option>
                                                    <option value={480}>8 hours</option>
                                                    <option value={0}>Never</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Data & Storage Settings */}
                    {activeTab === 'data' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Data & Storage</h3>
                                <div className="space-y-4">
                                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Database className="w-5 h-5 text-green-600" />
                                            <h4 className="font-medium text-green-900">Data Management</h4>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                                <div>
                                                    <span className="text-sm font-medium text-gray-700">Auto-Save</span>
                                                    <p className="text-xs text-gray-500">Automatically save changes as you work</p>
                                                </div>
                                                <ToggleSwitch
                                                    enabled={editData.autoSave}
                                                    onChange={(value) => handleSettingChange('data', 'autoSave',value)}
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
                                                <select
                                                    value={editData.backupFrequency}
                                                    onChange={(e) => handleSettingChange('data', 'backupFrequency', e.target.value)}
                                                    disabled={!isEditing}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                                                >
                                                    <option value="daily">Daily</option>
                                                    <option value="weekly">Weekly</option>
                                                    <option value="monthly">Monthly</option>
                                                    <option value="never">Never</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Data Retention (days)</label>
                                                <select
                                                    value={editData.dataRetention}
                                                    onChange={(e) => handleSettingChange('data', 'dataRetention', parseInt(e.target.value))}
                                                    disabled={!isEditing}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                                                >
                                                    <option value={30}>30 days</option>
                                                    <option value={60}>60 days</option>
                                                    <option value={90}>90 days</option>
                                                    <option value={180}>180 days</option>
                                                    <option value={365}>1 year</option>
                                                    <option value={0}>Forever</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Download className="w-5 h-5 text-blue-600" />
                                            <h4 className="font-medium text-blue-900">Data Export & Import</h4>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                                <div>
                                                    <span className="text-sm font-medium text-gray-700">Export All Data</span>
                                                    <p className="text-xs text-gray-500">Download all your data in JSON format</p>
                                                </div>
                                                <button
                                                    className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                                                    onClick={() => console.log('Export data')}
                                                >
                                                    <Download className="w-4 h-4" />
                                                    Export
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                                <div>
                                                    <span className="text-sm font-medium text-gray-700">Import Data</span>
                                                    <p className="text-xs text-gray-500">Import data from a previous export</p>
                                                </div>
                                                <button
                                                    className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
                                                    onClick={() => console.log('Import data')}
                                                >
                                                    <Upload className="w-4 h-4" />
                                                    Import
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Integrations Settings */}
                    {activeTab === 'integrations' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Third-Party Integrations</h3>
                                <div className="space-y-4">
                                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Zap className="w-5 h-5 text-purple-600" />
                                            <h4 className="font-medium text-purple-900">Connected Services</h4>
                                        </div>
                                        <div className="space-y-3">
                                            {[
                                                { 
                                                    key: 'slackIntegration', 
                                                    label: 'Slack Integration', 
                                                    description: 'Get notifications and updates in Slack',
                                                    color: 'bg-purple-600'
                                                },
                                                { 
                                                    key: 'googleCalendar', 
                                                    label: 'Google Calendar', 
                                                    description: 'Sync deadlines and events with Google Calendar',
                                                    color: 'bg-blue-600'
                                                },
                                                { 
                                                    key: 'githubIntegration', 
                                                    label: 'GitHub Integration', 
                                                    description: 'Link commits and issues to tasks',
                                                    color: 'bg-gray-800'
                                                },
                                                { 
                                                    key: 'jiraIntegration', 
                                                    label: 'Jira Integration', 
                                                    description: 'Sync with Jira issues and projects',
                                                    color: 'bg-blue-700'
                                                }
                                            ].map((integration) => (
                                                <div key={integration.key} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-8 h-8 rounded-full ${integration.color} flex items-center justify-center`}>
                                                            <ExternalLink className="w-4 h-4 text-white" />
                                                        </div>
                                                        <div>
                                                            <span className="text-sm font-medium text-gray-700">{integration.label}</span>
                                                            <p className="text-xs text-gray-500">{integration.description}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <ToggleSwitch
                                                            enabled={editData[integration.key]}
                                                            onChange={(value) => handleSettingChange('integrations', integration.key, value)}
                                                            disabled={!isEditing}
                                                        />
                                                        {editData[integration.key] && (
                                                            <button className="text-gray-400 hover:text-gray-600">
                                                                <Settings className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <div className="flex items-center gap-2 mb-3">
                                            <HelpCircle className="w-5 h-5 text-gray-600" />
                                            <h4 className="font-medium text-gray-900">Integration Help</h4>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-3">
                                            Need help setting up integrations? Check our documentation or contact support.
                                        </p>
                                        <div className="flex gap-2">
                                            <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
                                                <ExternalLink className="w-4 h-4" />
                                                Documentation
                                            </button>
                                            <button className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm">
                                                <Mail className="w-4 h-4" />
                                                Contact Support
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Account Settings */}
                    {activeTab === 'account' && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Management</h3>
                                <div className="space-y-4">
                                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                        <div className="flex items-center gap-2 mb-3">
                                            <User className="w-5 h-5 text-blue-600" />
                                            <h4 className="font-medium text-blue-900">Profile Information</h4>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                                    <input
                                                        type="text"
                                                        defaultValue="John"
                                                        disabled={!isEditing}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                                    <input
                                                        type="text"
                                                        defaultValue="Doe"
                                                        disabled={!isEditing}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                                <input
                                                    type="email"
                                                    defaultValue="john.doe@example.com"
                                                    disabled={!isEditing}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                                                <input
                                                    type="text"
                                                    defaultValue="Project Manager"
                                                    disabled={!isEditing}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Key className="w-5 h-5 text-yellow-600" />
                                            <h4 className="font-medium text-yellow-900">Password & Security</h4>
                                        </div>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                                                <div className="relative">
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="Enter current password"
                                                        disabled={!isEditing}
                                                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600"
                                                    >
                                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                                <input
                                                    type="password"
                                                    placeholder="Enter new password"
                                                    disabled={!isEditing}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                                                <input
                                                    type="password"
                                                    placeholder="Confirm new password"
                                                    disabled={!isEditing}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                                        <div className="flex items-center gap-2 mb-3">
                                            <AlertTriangle className="w-5 h-5 text-red-600" />
                                            <h4 className="font-medium text-red-900">Danger Zone</h4>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                                <div>
                                                    <span className="text-sm font-medium text-gray-700">Deactivate Account</span>
                                                    <p className="text-xs text-gray-500">Temporarily disable your account</p>
                                                </div>
                                                <button className="flex items-center gap-2 px-3 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors text-sm">
                                                    <Lock className="w-4 h-4" />
                                                    Deactivate
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                                <div>
                                                    <span className="text-sm font-medium text-gray-700">Delete Account</span>
                                                    <p className="text-xs text-gray-500">Permanently delete your account and all data</p>
                                                </div>
                                                <button className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm">
                                                    <Trash2 className="w-4 h-4" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingsPage1;