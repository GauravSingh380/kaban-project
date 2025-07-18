import React, { useState, useEffect } from 'react';
import {
    Settings,
    User,
    Bell,
    Shield,
    Palette,
    Globe,
    Mail,
    Lock,
    Eye,
    EyeOff,
    Save,
    AlertCircle,
    CheckCircle2,
    Moon,
    Sun,
    Monitor,
    Smartphone,
    Calendar,
    Clock,
    Download,
    Upload,
    Trash2,
    Key,
    Users,
    Building,
    CreditCard,
    Zap,
    Database,
    FileText,
    BarChart3,
    GitBranch,
    Code,
    Webhook,
    ExternalLink,
    Plus,
    X,
    Edit3
} from 'lucide-react';

const SettingsPage2 = () => {
    const [activeSection, setActiveSection] = useState('account');
    const [showPassword, setShowPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState({
        // Account Settings
        account: {
            name: 'John Doe',
            email: 'john.doe@company.com',
            phone: '+1 (555) 123-4567',
            timezone: 'America/New_York',
            language: 'English',
            dateFormat: 'MM/DD/YYYY',
            timeFormat: '12h'
        },
        // Notification Settings
        notifications: {
            email: {
                projectUpdates: true,
                taskAssignments: true,
                deadlineReminders: true,
                teamMentions: true,
                weeklyDigest: true,
                systemAlerts: true
            },
            push: {
                projectUpdates: true,
                taskAssignments: true,
                deadlineReminders: true,
                teamMentions: false,
                systemAlerts: true
            },
            inApp: {
                projectUpdates: true,
                taskAssignments: true,
                deadlineReminders: true,
                teamMentions: true,
                comments: true,
                systemAlerts: true
            }
        },
        // Security Settings
        security: {
            twoFactorEnabled: false,
            sessionTimeout: 30,
            loginNotifications: true,
            passwordLastChanged: '2024-01-15',
            activeSessions: 3
        },
        // Appearance Settings
        appearance: {
            theme: 'light',
            sidebarCollapsed: false,
            compactView: false,
            showAvatars: true,
            fontSize: 'medium',
            accentColor: 'blue'
        },
        // Privacy Settings
        privacy: {
            profileVisibility: 'team',
            showOnlineStatus: true,
            allowDirectMessages: true,
            showEmail: false,
            showPhone: false,
            activityTracking: true
        },
        // Integration Settings
        integrations: {
            slack: { connected: true, workspace: 'Company Workspace' },
            github: { connected: false, username: '' },
            jira: { connected: true, instance: 'company.atlassian.net' },
            googleCalendar: { connected: true, email: 'john.doe@company.com' }
        },
        // Team Settings (if user is admin/manager)
        team: {
            defaultRole: 'member',
            approvalRequired: true,
            inviteExpiration: 7,
            maxMembers: 50,
            allowGuestAccess: false
        }
    });

    const sections = [
        { id: 'account', label: 'Account', icon: User },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'appearance', label: 'Appearance', icon: Palette },
        { id: 'privacy', label: 'Privacy', icon: Eye },
        { id: 'integrations', label: 'Integrations', icon: Zap },
        { id: 'team', label: 'Team', icon: Users },
        { id: 'billing', label: 'Billing', icon: CreditCard },
        { id: 'export', label: 'Data Export', icon: Download }
    ];

    const handleSettingChange = (section, key, value) => {
        setSettings(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value
            }
        }));
    };

    const handleNestedSettingChange = (section, category, key, value) => {
        setSettings(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [category]: {
                    ...prev[section][category],
                    [key]: value
                }
            }
        }));
    };

    const handleSave = async () => {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        // Show success message
    };

    const timezones = [
        'America/New_York', 'America/Los_Angeles', 'America/Chicago',
        'Europe/London', 'Europe/Paris', 'Europe/Berlin',
        'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Kolkata',
        'Australia/Sydney', 'Pacific/Auckland'
    ];

    const languages = [
        'English', 'Spanish', 'French', 'German', 'Italian',
        'Portuguese', 'Chinese', 'Japanese', 'Korean'
    ];

    const accentColors = [
        { name: 'Blue', value: 'blue', class: 'bg-blue-500' },
        { name: 'Green', value: 'green', class: 'bg-green-500' },
        { name: 'Purple', value: 'purple', class: 'bg-purple-500' },
        { name: 'Pink', value: 'pink', class: 'bg-pink-500' },
        { name: 'Orange', value: 'orange', class: 'bg-orange-500' },
        { name: 'Red', value: 'red', class: 'bg-red-500' }
    ];

    return (
        <div className="max-w-8xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Settings className="w-6 h-6 text-gray-600" />
                            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <nav className="space-y-1">
                            {sections.map((section) => {
                                const Icon = section.icon;
                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${activeSection === section.id
                                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {section.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="p-6">
                            {/* Account Settings */}
                            {activeSection === 'account' && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                                <input
                                                    type="text"
                                                    value={settings.account.name}
                                                    onChange={(e) => handleSettingChange('account', 'name', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                                <input
                                                    type="email"
                                                    value={settings.account.email}
                                                    onChange={(e) => handleSettingChange('account', 'email', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                                <input
                                                    type="tel"
                                                    value={settings.account.phone}
                                                    onChange={(e) => handleSettingChange('account', 'phone', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                                                <select
                                                    value={settings.account.timezone}
                                                    onChange={(e) => handleSettingChange('account', 'timezone', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                >
                                                    {timezones.map(tz => (
                                                        <option key={tz} value={tz}>{tz}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-md font-medium text-gray-900 mb-4">Preferences</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                                                <select
                                                    value={settings.account.language}
                                                    onChange={(e) => handleSettingChange('account', 'language', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                >
                                                    {languages.map(lang => (
                                                        <option key={lang} value={lang}>{lang}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                                                <select
                                                    value={settings.account.dateFormat}
                                                    onChange={(e) => handleSettingChange('account', 'dateFormat', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                >
                                                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Time Format</label>
                                                <select
                                                    value={settings.account.timeFormat}
                                                    onChange={(e) => handleSettingChange('account', 'timeFormat', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                >
                                                    <option value="12h">12 Hour</option>
                                                    <option value="24h">24 Hour</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-md font-medium text-gray-900 mb-4">Change Password</h3>
                                        <div className="space-y-4 max-w-md">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                                                <div className="relative">
                                                    <input
                                                        type={showCurrentPassword ? 'text' : 'password'}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                        placeholder="Enter current password"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                                                    >
                                                        {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                                <div className="relative">
                                                    <input
                                                        type={showNewPassword ? 'text' : 'password'}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                        placeholder="Enter new password"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                                                    >
                                                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </div>
                                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                                Update Password
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Notification Settings */}
                            {activeSection === 'notifications' && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h2>

                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="text-md font-medium text-gray-900 mb-4 flex items-center gap-2">
                                                    <Mail className="w-4 h-4" />
                                                    Email Notifications
                                                </h3>
                                                <div className="space-y-3">
                                                    {Object.entries(settings.notifications.email).map(([key, value]) => (
                                                        <div key={key} className="flex items-center justify-between">
                                                            <span className="text-sm text-gray-700 capitalize">
                                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                                            </span>
                                                            <label className="relative inline-flex items-center cursor-pointer">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={value}
                                                                    onChange={(e) => handleNestedSettingChange('notifications', 'email', key, e.target.checked)}
                                                                    className="sr-only peer"
                                                                />
                                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-md font-medium text-gray-900 mb-4 flex items-center gap-2">
                                                    <Smartphone className="w-4 h-4" />
                                                    Push Notifications
                                                </h3>
                                                <div className="space-y-3">
                                                    {Object.entries(settings.notifications.push).map(([key, value]) => (
                                                        <div key={key} className="flex items-center justify-between">
                                                            <span className="text-sm text-gray-700 capitalize">
                                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                                            </span>
                                                            <label className="relative inline-flex items-center cursor-pointer">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={value}
                                                                    onChange={(e) => handleNestedSettingChange('notifications', 'push', key, e.target.checked)}
                                                                    className="sr-only peer"
                                                                />
                                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Security Settings */}
                            {activeSection === 'security' && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h2>

                                        <div className="space-y-6">
                                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                                <div className="flex items-center gap-3">
                                                    <Key className="w-5 h-5 text-yellow-600" />
                                                    <div>
                                                        <h3 className="font-medium text-yellow-800">Two-Factor Authentication</h3>
                                                        <p className="text-sm text-yellow-700">Add an extra layer of security to your account</p>
                                                    </div>
                                                    <button className="ml-auto px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                                                        {settings.security.twoFactorEnabled ? 'Disable' : 'Enable'}
                                                    </button>
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-md font-medium text-gray-900 mb-4">Session Management</h3>
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                                                        <select
                                                            value={settings.security.sessionTimeout}
                                                            onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                                                            className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                        >
                                                            <option value={15}>15 minutes</option>
                                                            <option value={30}>30 minutes</option>
                                                            <option value={60}>1 hour</option>
                                                            <option value={120}>2 hours</option>
                                                            <option value={480}>8 hours</option>
                                                        </select>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-700">Login Notifications</span>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                checked={settings.security.loginNotifications}
                                                                onChange={(e) => handleSettingChange('security', 'loginNotifications', e.target.checked)}
                                                                className="sr-only peer"
                                                            />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-md font-medium text-gray-900 mb-4">Active Sessions</h3>
                                                <div className="bg-gray-50 rounded-lg p-4">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-700">
                                                            You have {settings.security.activeSessions} active sessions
                                                        </span>
                                                        <button className="text-sm text-red-600 hover:text-red-700">
                                                            End All Sessions
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Appearance Settings */}
                            {activeSection === 'appearance' && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Appearance Settings</h2>

                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="text-md font-medium text-gray-900 mb-4">Theme</h3>
                                                <div className="flex gap-4">
                                                    {[
                                                        { value: 'light', label: 'Light', icon: Sun },
                                                        { value: 'dark', label: 'Dark', icon: Moon },
                                                        { value: 'system', label: 'System', icon: Monitor }
                                                    ].map(({ value, label, icon: Icon }) => (
                                                        <button
                                                            key={value}
                                                            onClick={() => handleSettingChange('appearance', 'theme', value)}
                                                            className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors ${settings.appearance.theme === value
                                                                ? 'border-blue-500 bg-blue-50'
                                                                : 'border-gray-200 hover:border-gray-300'
                                                                }`}
                                                        >
                                                            <Icon className="w-6 h-6" />
                                                            <span className="text-sm font-medium">{label}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-md font-medium text-gray-900 mb-4">Accent Color</h3>
                                                <div className="flex gap-3">
                                                    {accentColors.map(({ name, value, class: colorClass }) => (
                                                        <button
                                                            key={value}
                                                            onClick={() => handleSettingChange('appearance', 'accentColor', value)}
                                                            className={`w-8 h-8 rounded-full ${colorClass} ${settings.appearance.accentColor === value
                                                                ? 'ring-2 ring-offset-2 ring-gray-400'
                                                                : ''
                                                                }`}
                                                            title={name}
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-md font-medium text-gray-900 mb-4">Display Options</h3>
                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-700">Compact View</span>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                checked={settings.appearance.compactView}
                                                                onChange={(e) => handleSettingChange('appearance', 'compactView', e.target.checked)}
                                                                className="sr-only peer"
                                                            />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-700">Show Avatars</span>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                checked={settings.appearance.showAvatars}
                                                                onChange={(e) => handleSettingChange('appearance', 'showAvatars', e.target.checked)}
                                                                className="sr-only peer"
                                                            />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                        </label>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
                                                        <select
                                                            value={settings.appearance.fontSize}
                                                            onChange={(e) => handleSettingChange('appearance', 'fontSize', e.target.value)}
                                                            className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                        >
                                                            <option value="small">Small</option>
                                                            <option value="medium">Medium</option>
                                                            <option value="large">Large</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Privacy Settings */}
                            {activeSection === 'privacy' && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h2>

                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="text-md font-medium text-gray-900 mb-4">Profile Visibility</h3>
                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Who can see your profile</label>
                                                        <select
                                                            value={settings.privacy.profileVisibility}
                                                            onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                                                            className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                        >
                                                            <option value="public">Public</option>
                                                            <option value="team">Team Only</option>
                                                            <option value="private">Private</option>
                                                        </select>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-700">Show Online Status</span>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                checked={settings.privacy.showOnlineStatus}
                                                                onChange={(e) => handleSettingChange('privacy', 'showOnlineStatus', e.target.checked)}
                                                                className="sr-only peer"
                                                            />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-700">Allow Direct Messages</span>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                checked={settings.privacy.allowDirectMessages}
                                                                onChange={(e) => handleSettingChange('privacy', 'allowDirectMessages', e.target.checked)}
                                                                className="sr-only peer"
                                                            />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-md font-medium text-gray-900 mb-4">Contact Information</h3>
                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-700">Show Email Address</span>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                checked={settings.privacy.showEmail}
                                                                onChange={(e) => handleSettingChange('privacy', 'showEmail', e.target.checked)}
                                                                className="sr-only peer"
                                                            />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-700">Show Phone Number</span>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                checked={settings.privacy.showPhone}
                                                                onChange={(e) => handleSettingChange('privacy', 'showPhone', e.target.checked)}
                                                                className="sr-only peer"
                                                            />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-700">Activity Tracking</span>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                checked={settings.privacy.activityTracking}
                                                                onChange={(e) => handleSettingChange('privacy', 'activityTracking', e.target.checked)}
                                                                className="sr-only peer"
                                                            />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Integration Settings */}
                            {activeSection === 'integrations' && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Integrations</h2>

                                        <div className="space-y-4">
                                            <div className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                                            <Code className="w-5 h-5 text-purple-600" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-medium text-gray-900">Slack</h3>
                                                            <p className="text-sm text-gray-500">
                                                                {settings.integrations.slack.connected
                                                                    ? `Connected to ${settings.integrations.slack.workspace}`
                                                                    : 'Not connected'
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button className={`px-4 py-2 rounded-lg font-medium ${settings.integrations.slack.connected
                                                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                                        }`}>
                                                        {settings.integrations.slack.connected ? 'Disconnect' : 'Connect'}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                                            <GitBranch className="w-5 h-5 text-gray-600" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-medium text-gray-900">GitHub</h3>
                                                            <p className="text-sm text-gray-500">
                                                                {settings.integrations.github.connected
                                                                    ? `Connected as ${settings.integrations.github.username}`
                                                                    : 'Not connected'
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button className={`px-4 py-2 rounded-lg font-medium ${settings.integrations.github.connected
                                                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                                        }`}>
                                                        {settings.integrations.github.connected ? 'Disconnect' : 'Connect'}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                            <ExternalLink className="w-5 h-5 text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-medium text-gray-900">Jira</h3>
                                                            <p className="text-sm text-gray-500">
                                                                {settings.integrations.jira.connected
                                                                    ? `Connected to ${settings.integrations.jira.instance}`
                                                                    : 'Not connected'
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button className={`px-4 py-2 rounded-lg font-medium ${settings.integrations.jira.connected
                                                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                                        }`}>
                                                        {settings.integrations.jira.connected ? 'Disconnect' : 'Connect'}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                                            <Calendar className="w-5 h-5 text-green-600" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-medium text-gray-900">Google Calendar</h3>
                                                            <p className="text-sm text-gray-500">
                                                                {settings.integrations.googleCalendar.connected
                                                                    ? `Connected to ${settings.integrations.googleCalendar.email}`
                                                                    : 'Not connected'
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button className={`px-4 py-2 rounded-lg font-medium ${settings.integrations.googleCalendar.connected
                                                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                                        }`}>
                                                        {settings.integrations.googleCalendar.connected ? 'Disconnect' : 'Connect'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Team Settings */}
                            {activeSection === 'team' && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Settings</h2>

                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="text-md font-medium text-gray-900 mb-4">Team Configuration</h3>
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Default Role for New Members</label>
                                                        <select
                                                            value={settings.team.defaultRole}
                                                            onChange={(e) => handleSettingChange('team', 'defaultRole', e.target.value)}
                                                            className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                        >
                                                            <option value="viewer">Viewer</option>
                                                            <option value="member">Member</option>
                                                            <option value="admin">Admin</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Team Members</label>
                                                        <input
                                                            type="number"
                                                            value={settings.team.maxMembers}
                                                            onChange={(e) => handleSettingChange('team', 'maxMembers', parseInt(e.target.value))}
                                                            className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                            min="1"
                                                            max="1000"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Invite Expiration (days)</label>
                                                        <select
                                                            value={settings.team.inviteExpiration}
                                                            onChange={(e) => handleSettingChange('team', 'inviteExpiration', parseInt(e.target.value))}
                                                            className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                        >
                                                            <option value={1}>1 day</option>
                                                            <option value={3}>3 days</option>
                                                            <option value={7}>7 days</option>
                                                            <option value={14}>14 days</option>
                                                            <option value={30}>30 days</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-md font-medium text-gray-900 mb-4">Access Controls</h3>
                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-700">Require approval for new members</span>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                checked={settings.team.approvalRequired}
                                                                onChange={(e) => handleSettingChange('team', 'approvalRequired', e.target.checked)}
                                                                className="sr-only peer"
                                                            />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-700">Allow guest access</span>
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                checked={settings.team.allowGuestAccess}
                                                                onChange={(e) => handleSettingChange('team', 'allowGuestAccess', e.target.checked)}
                                                                className="sr-only peer"
                                                            />
                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Billing Settings */}
                            {activeSection === 'billing' && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Billing & Subscription</h2>

                                        <div className="space-y-6">
                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div>
                                                        <h3 className="font-semibold text-blue-900">Pro Plan</h3>
                                                        <p className="text-sm text-blue-700">Your current subscription</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-2xl font-bold text-blue-900">$29</div>
                                                        <div className="text-sm text-blue-700">per month</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                                        Manage Subscription
                                                    </button>
                                                    <button className="px-4 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                                                        View Invoices
                                                    </button>
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-md font-medium text-gray-900 mb-4">Payment Method</h3>
                                                <div className="border border-gray-200 rounded-lg p-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                                                <CreditCard className="w-5 h-5 text-gray-600" />
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-gray-900">•••• •••• •••• 4242</div>
                                                                <div className="text-sm text-gray-500">Expires 12/25</div>
                                                            </div>
                                                        </div>
                                                        <button className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium">
                                                            Update
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-md font-medium text-gray-900 mb-4">Usage This Month</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div className="bg-gray-50 rounded-lg p-4">
                                                        <div className="text-2xl font-bold text-gray-900">2.3GB</div>
                                                        <div className="text-sm text-gray-500">Storage Used</div>
                                                        <div className="text-xs text-gray-400">of 10GB limit</div>
                                                    </div>
                                                    <div className="bg-gray-50 rounded-lg p-4">
                                                        <div className="text-2xl font-bold text-gray-900">147</div>
                                                        <div className="text-sm text-gray-500">API Calls</div>
                                                        <div className="text-xs text-gray-400">of 10,000 limit</div>
                                                    </div>
                                                    <div className="bg-gray-50 rounded-lg p-4">
                                                        <div className="text-2xl font-bold text-gray-900">23</div>
                                                        <div className="text-sm text-gray-500">Team Members</div>
                                                        <div className="text-xs text-gray-400">of 50 limit</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Data Export Settings */}
                            {activeSection === 'export' && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Export</h2>

                                        <div className="space-y-6">
                                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                                <div className="flex items-center gap-3">
                                                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                                                    <div>
                                                        <h3 className="font-medium text-yellow-800">Data Export Information</h3>
                                                        <p className="text-sm text-yellow-700">
                                                            Export your data in various formats. Large exports may take several minutes to complete.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-md font-medium text-gray-900 mb-4">Export Options</h3>
                                                <div className="space-y-4">
                                                    <div className="border border-gray-200 rounded-lg p-4">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-3">
                                                                <FileText className="w-5 h-5 text-gray-600" />
                                                                <div>
                                                                    <h4 className="font-medium text-gray-900">Project Data</h4>
                                                                    <p className="text-sm text-gray-500">Export all project information, tasks, and comments</p>
                                                                </div>
                                                            </div>
                                                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                                                Export
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="border border-gray-200 rounded-lg p-4">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-3">
                                                                <User className="w-5 h-5 text-gray-600" />
                                                                <div>
                                                                    <h4 className="font-medium text-gray-900">Profile Data</h4>
                                                                    <p className="text-sm text-gray-500">Export your profile information and settings</p>
                                                                </div>
                                                            </div>
                                                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                                                Export
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="border border-gray-200 rounded-lg p-4">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-3">
                                                                <BarChart3 className="w-5 h-5 text-gray-600" />
                                                                <div>
                                                                    <h4 className="font-medium text-gray-900">Analytics Data</h4>
                                                                    <p className="text-sm text-gray-500">Export usage statistics and analytics</p>
                                                                </div>
                                                            </div>
                                                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                                                Export
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-md font-medium text-gray-900 mb-4">Recent Exports</h3>
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                                                        <div className="flex items-center gap-3">
                                                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                                                            <div>
                                                                <span className="text-sm font-medium">Project Data Export</span>
                                                                <div className="text-xs text-gray-500">July 15, 2024</div>
                                                            </div>
                                                        </div>
                                                        <button className="text-blue-600 hover:text-blue-700 text-sm">
                                                            Download
                                                        </button>
                                                    </div>
                                                    <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                                                        <div className="flex items-center gap-3">
                                                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                                                            <div>
                                                                <span className="text-sm font-medium">Profile Data Export</span>
                                                                <div className="text-xs text-gray-500">July 10, 2024</div>
                                                            </div>
                                                        </div>
                                                        <button className="text-blue-600 hover:text-blue-700 text-sm">
                                                            Download
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border-t border-gray-200 pt-6">
                                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                                    <div className="flex items-center gap-3">
                                                        <Trash2 className="w-5 h-5 text-red-600" />
                                                        <div>
                                                            <h3 className="font-medium text-red-800">Delete Account</h3>
                                                            <p className="text-sm text-red-700">
                                                                Permanently delete your account and all associated data. This action cannot be undone.
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4">
                                                        <button
                                                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                                            onClick={() => {
                                                                // Add your delete account logic here
                                                                if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
                                                                    // Handle account deletion
                                                                }
                                                            }}
                                                        >
                                                            Delete Account
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
            </div>
        </div>
    )
}

export default SettingsPage2;