import React, { useState } from 'react';
import {
    Settings,
    Lock,
    Bell,
    Palette,
    Globe,
    Database,
    Users as TeamIcon,
    Key,
    Mail,
    Zap,
    Clock,
    Calendar as CalendarIcon,
    FileText,
    Download,
    Upload,
    Trash2,
    LogOut,
    Shield,
    CreditCard,
    HardDrive,
    CheckCircle2,
    X
} from 'lucide-react';

const SettingsTab = () => {
    const [activeSection, setActiveSection] = useState('general');
    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        mentions: true,
        dailyDigest: false
    });
    const [theme, setTheme] = useState('light');
    const [language, setLanguage] = useState('en');
    const [timezone, setTimezone] = useState('UTC');
    const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
    const [exportFormat, setExportFormat] = useState('csv');
    const [billingPlan, setBillingPlan] = useState('pro');

    const handleNotificationChange = (type) => {
        setNotifications(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
    };

    const sidebarItems = [
        { id: 'general', label: 'General', icon: Settings },
        { id: 'security', label: 'Security', icon: Lock },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'appearance', label: 'Appearance', icon: Palette },
        { id: 'language', label: 'Language & Region', icon: Globe },
        { id: 'data', label: 'Data Management', icon: Database },
        { id: 'team', label: 'Team Settings', icon: TeamIcon },
        { id: 'integrations', label: 'Integrations', icon: Zap },
        { id: 'billing', label: 'Billing', icon: CreditCard },
        { id: 'advanced', label: 'Advanced', icon: Shield }
    ];

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex">
                {/* Sidebar Navigation */}
                <div className="w-64 border-r border-gray-200 p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Settings</h3>
                    <nav className="space-y-1">
                        {sidebarItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium ${activeSection === item.id
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {item.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6">
                    {activeSection === 'general' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Settings className="w-5 h-5" />
                                General Settings
                            </h2>
                            
                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                            <input
                                                type="text"
                                                defaultValue="John Doe"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                            <input
                                                type="email"
                                                defaultValue="john.doe@example.com"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                                            <input
                                                type="text"
                                                defaultValue="Project Manager"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                                                <option>Engineering</option>
                                                <option>Design</option>
                                                <option>Product</option>
                                                <option>Marketing</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                            Save Changes
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Work Preferences</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Default View</label>
                                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                                                <option>Dashboard</option>
                                                <option>Projects</option>
                                                <option>Calendar</option>
                                                <option>List</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Default Project</label>
                                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                                                <option>All Projects</option>
                                                <option>Website Redesign</option>
                                                <option>Mobile App</option>
                                                <option>Marketing Campaign</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Week Start Day</label>
                                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                                                <option>Monday</option>
                                                <option>Sunday</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Daily Working Hours</label>
                                            <input
                                                type="number"
                                                min="1"
                                                max="24"
                                                defaultValue="8"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'security' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Lock className="w-5 h-5" />
                                Security Settings
                            </h2>
                            
                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Password</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                            <input
                                                type="password"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                            <input
                                                type="password"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                            <input
                                                type="password"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                                Change Password
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium text-gray-900">Status: <span className="text-yellow-600">Disabled</span></h4>
                                            <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your account</p>
                                        </div>
                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                            Enable 2FA
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Sessions</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200">
                                            <div>
                                                <h4 className="font-medium text-gray-900">Chrome on Windows</h4>
                                                <p className="text-sm text-gray-500">New York, USA • Last active: 2 hours ago</p>
                                            </div>
                                            <button className="text-red-500 hover:text-red-700">
                                                <LogOut className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200">
                                            <div>
                                                <h4 className="font-medium text-gray-900">Safari on Mac</h4>
                                                <p className="text-sm text-gray-500">San Francisco, USA • Last active: 1 week ago</p>
                                            </div>
                                            <button className="text-red-500 hover:text-red-700">
                                                <LogOut className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'notifications' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Bell className="w-5 h-5" />
                                Notification Settings
                            </h2>
                            
                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-medium text-gray-900">Task Assignments</h4>
                                                <p className="text-sm text-gray-500">Get notified when you're assigned to a task</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={notifications.email}
                                                    onChange={() => handleNotificationChange('email')}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-medium text-gray-900">Mentions</h4>
                                                <p className="text-sm text-gray-500">Get notified when someone mentions you</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={notifications.mentions}
                                                    onChange={() => handleNotificationChange('mentions')}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-medium text-gray-900">Daily Digest</h4>
                                                <p className="text-sm text-gray-500">Receive a summary of your daily activities</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={notifications.dailyDigest}
                                                    onChange={() => handleNotificationChange('dailyDigest')}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Push Notifications</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-medium text-gray-900">Task Updates</h4>
                                                <p className="text-sm text-gray-500">Get notified when tasks are updated</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={notifications.push}
                                                    onChange={() => handleNotificationChange('push')}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-medium text-gray-900">Deadline Reminders</h4>
                                                <p className="text-sm text-gray-500">Get reminders for upcoming deadlines</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={notifications.push}
                                                    onChange={() => handleNotificationChange('push')}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Schedule</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                                                <option>8:00 AM</option>
                                                <option>9:00 AM</option>
                                                <option>10:00 AM</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                                            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                                                <option>6:00 PM</option>
                                                <option>7:00 PM</option>
                                                <option>8:00 PM</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'appearance' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Palette className="w-5 h-5" />
                                Appearance Settings
                            </h2>
                            
                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Theme</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <button
                                            onClick={() => setTheme('light')}
                                            className={`p-4 rounded-lg border ${theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-6 h-6 rounded-full bg-gray-200 border border-gray-300"></div>
                                                <span>Light</span>
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => setTheme('dark')}
                                            className={`p-4 rounded-lg border ${theme === 'dark' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-gray-800 text-white'}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-6 h-6 rounded-full bg-gray-600 border border-gray-500"></div>
                                                <span>Dark</span>
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => setTheme('system')}
                                            className={`p-4 rounded-lg border ${theme === 'system' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-gray-200 to-gray-800 border border-gray-300"></div>
                                                <span>System</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Accent Color</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                        {['blue', 'green', 'purple', 'red', 'orange'].map((color) => (
                                            <button
                                                key={color}
                                                className={`w-full h-12 rounded-lg bg-${color}-500`}
                                                onClick={() => console.log(color)}
                                            ></button>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Density</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <button className="p-4 rounded-lg border border-gray-200">
                                            <div className="space-y-2">
                                                <div className="h-2 bg-gray-200 rounded"></div>
                                                <div className="h-2 bg-gray-200 rounded"></div>
                                                <div className="h-2 bg-gray-200 rounded"></div>
                                            </div>
                                            <p className="mt-2 text-sm">Compact</p>
                                        </button>
                                        <button className="p-4 rounded-lg border border-blue-500 bg-blue-50">
                                            <div className="space-y-3">
                                                <div className="h-2 bg-gray-200 rounded"></div>
                                                <div className="h-2 bg-gray-200 rounded"></div>
                                                <div className="h-2 bg-gray-200 rounded"></div>
                                            </div>
                                            <p className="mt-2 text-sm">Normal</p>
                                        </button>
                                        <button className="p-4 rounded-lg border border-gray-200">
                                            <div className="space-y-4">
                                                <div className="h-2 bg-gray-200 rounded"></div>
                                                <div className="h-2 bg-gray-200 rounded"></div>
                                                <div className="h-2 bg-gray-200 rounded"></div>
                                            </div>
                                            <p className="mt-2 text-sm">Spacious</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'language' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Globe className="w-5 h-5" />
                                Language & Region
                            </h2>
                            
                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Language</h3>
                                    <select
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="en">English</option>
                                        <option value="es">Spanish</option>
                                        <option value="fr">French</option>
                                        <option value="de">German</option>
                                        <option value="ja">Japanese</option>
                                    </select>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Timezone</h3>
                                    <select
                                        value={timezone}
                                        onChange={(e) => setTimezone(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="UTC">UTC</option>
                                        <option value="EST">Eastern Time (EST)</option>
                                        <option value="PST">Pacific Time (PST)</option>
                                        <option value="GMT">London (GMT)</option>
                                        <option value="CET">Central Europe (CET)</option>
                                    </select>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Date & Time Format</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <button
                                            onClick={() => setDateFormat('MM/DD/YYYY')}
                                            className={`p-3 rounded-lg border ${dateFormat === 'MM/DD/YYYY' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                                        >
                                            <div className="text-center">
                                                <p className="text-lg">12/31/2023</p>
                                                <p className="text-sm text-gray-500">MM/DD/YYYY</p>
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => setDateFormat('DD/MM/YYYY')}
                                            className={`p-3 rounded-lg border ${dateFormat === 'DD/MM/YYYY' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                                        >
                                            <div className="text-center">
                                                <p className="text-lg">31/12/2023</p>
                                                <p className="text-sm text-gray-500">DD/MM/YYYY</p>
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => setDateFormat('YYYY-MM-DD')}
                                            className={`p-3 rounded-lg border ${dateFormat === 'YYYY-MM-DD' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                                        >
                                            <div className="text-center">
                                                <p className="text-lg">2023-12-31</p>
                                                <p className="text-sm text-gray-500">YYYY-MM-DD</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'data' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Database className="w-5 h-5" />
                                Data Management
                            </h2>
                            
                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Data</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Export Format</label>
                                            <select
                                                value={exportFormat}
                                                onChange={(e) => setExportFormat(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="csv">CSV</option>
                                                <option value="json">JSON</option>
                                                <option value="pdf">PDF</option>
                                                <option value="excel">Excel</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                        <CalendarIcon className="w-5 h-5 text-gray-400" />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                                                        placeholder="Start date"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                        <CalendarIcon className="w-5 h-5 text-gray-400" />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                                                        placeholder="End date"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                                <Download className="w-4 h-4" />
                                                Export Data
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Import Data</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-center w-full">
                                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <Upload className="w-8 h-8 mb-3 text-gray-400" />
                                                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                    <p className="text-xs text-gray-500">CSV, JSON, or Excel files</p>
                                                </div>
                                                <input type="file" className="hidden" />
                                            </label>
                                        </div>
                                        <div className="mt-4">
                                            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                                                <Upload className="w-4 h-4" />
                                                Import Data
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Account</h3>
                                    <div className="space-y-3">
                                        <p className="text-gray-700">This will permanently delete your account and all associated data. This action cannot be undone.</p>
                                        <div className="mt-4">
                                            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                                Delete Account
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'team' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <TeamIcon className="w-5 h-5" />
                                Team Settings
                            </h2>
                            
                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h3>
                                    <div className="space-y-3">
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-100">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
                                                                    JD
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900">John Doe</div>
                                                                    <div className="text-sm text-gray-500">john.doe@example.com</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">Project Manager</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                Active
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                                                            <button className="text-red-600 hover:text-red-900">Remove</button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-500 text-white flex items-center justify-center">
                                                                    AS
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900">Alice Smith</div>
                                                                    <div className="text-sm text-gray-500">alice.smith@example.com</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">Developer</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                Active
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                                                            <button className="text-red-600 hover:text-red-900">Remove</button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="mt-4">
                                            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                                <Plus className="w-4 h-4" />
                                                Add Team Member
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Roles & Permissions</h3>
                                    <div className="space-y-4">
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-100">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tasks</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Settings</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Admin</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Full access</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Full access</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Full access</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Full access</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Manager</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Create, edit</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Create, edit</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">View only</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Limited</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Member</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">View only</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Assigned only</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">View only</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">None</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="mt-4">
                                            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                                <Edit3 className="w-4 h-4" />
                                                Edit Permissions
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'integrations' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Zap className="w-5 h-5" />
                                Integrations
                            </h2>
                            
                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Connected Apps</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center">
                                                    <FileText className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-900">Google Drive</h4>
                                                    <p className="text-sm text-gray-500">Connected for file attachments</p>
                                                </div>
                                            </div>
                                            <button className="text-red-500 hover:text-red-700">
                                                <LogOut className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-md bg-green-100 flex items-center justify-center">
                                                    <Key className="w-5 h-5 text-green-600" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-900">GitHub</h4>
                                                    <p className="text-sm text-gray-500">Connected for code commits</p>
                                                </div>
                                            </div>
                                            <button className="text-red-500 hover:text-red-700">
                                                <LogOut className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Integrations</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center">
                                                    <Mail className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <h4 className="font-medium text-gray-900">Slack</h4>
                                            </div>
                                            <p className="text-sm text-gray-500 mb-3">Get notifications in your Slack channels</p>
                                            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                                Connect
                                            </button>
                                        </div>
                                        <div className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-md bg-red-100 flex items-center justify-center">
                                                    <HardDrive className="w-5 h-5 text-red-600" />
                                                </div>
                                                <h4 className="font-medium text-gray-900">Dropbox</h4>
                                            </div>
                                            <p className="text-sm text-gray-500 mb-3">Attach files directly from Dropbox</p>
                                            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                                Connect
                                            </button>
                                        </div>
                                        <div className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-md bg-yellow-100 flex items-center justify-center">
                                                    <Clock className="w-5 h-5 text-yellow-600" />
                                                </div>
                                                <h4 className="font-medium text-gray-900">Time Tracking</h4>
                                            </div>
                                            <p className="text-sm text-gray-500 mb-3">Track time spent on tasks</p>
                                            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                                Connect
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'billing' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <CreditCard className="w-5 h-5" />
                                Billing & Plans
                            </h2>
                            
                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Plan</h3>
                                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                                        <div>
                                            <h4 className="font-medium text-gray-900">Pro Plan</h4>
                                            <p className="text-sm text-gray-500">$15/user/month • Billed monthly</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium text-gray-900">Next billing: Jan 15, 2024</p>
                                            <p className="text-sm text-gray-500">5 users • $75 total</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-6 bg-blue-100 rounded flex items-center justify-center">
                                                <CreditCard className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900">Visa ending in 4242</h4>
                                                <p className="text-sm text-gray-500">Expires 12/25</p>
                                            </div>
                                        </div>
                                        <button className="text-blue-600 hover:text-blue-800">Update</button>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Upgrade Plan</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className={`p-5 rounded-lg border ${billingPlan === 'basic' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                                            <h4 className="font-bold text-gray-900 mb-2">Basic</h4>
                                            <p className="text-2xl font-bold text-gray-900 mb-3">$0<span className="text-sm font-normal text-gray-500">/user/month</span></p>
                                            <ul className="space-y-2 text-sm text-gray-600 mb-4">
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                    <span>5 projects</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                    <span>Basic reporting</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <X className="w-4 h-4 text-gray-400" />
                                                    <span>No integrations</span>
                                                </li>
                                            </ul>
                                            <button
                                                onClick={() => setBillingPlan('basic')}
                                                className={`w-full py-2 rounded-md ${billingPlan === 'basic' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                                            >
                                                {billingPlan === 'basic' ? 'Current Plan' : 'Select Plan'}
                                            </button>
                                        </div>
                                        <div className={`p-5 rounded-lg border ${billingPlan === 'pro' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-bold text-gray-900 mb-2">Pro</h4>
                                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Popular</span>
                                            </div>
                                            <p className="text-2xl font-bold text-gray-900 mb-3">$15<span className="text-sm font-normal text-gray-500">/user/month</span></p>
                                            <ul className="space-y-2 text-sm text-gray-600 mb-4">
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                    <span>Unlimited projects</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                    <span>Advanced reporting</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                    <span>10 integrations</span>
                                                </li>
                                            </ul>
                                            <button
                                                onClick={() => setBillingPlan('pro')}
                                                className={`w-full py-2 rounded-md ${billingPlan === 'pro' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                                            >
                                                {billingPlan === 'pro' ? 'Current Plan' : 'Select Plan'}
                                            </button>
                                        </div>
                                        <div className={`p-5 rounded-lg border ${billingPlan === 'enterprise' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                                            <h4 className="font-bold text-gray-900 mb-2">Enterprise</h4>
                                            <p className="text-2xl font-bold text-gray-900 mb-3">$29<span className="text-sm font-normal text-gray-500">/user/month</span></p>
                                            <ul className="space-y-2 text-sm text-gray-600 mb-4">
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                    <span>Unlimited projects</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                    <span>Advanced reporting</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                    <span>Unlimited integrations</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                    <span>Priority support</span>
                                                </li>
                                            </ul>
                                            <button
                                                onClick={() => setBillingPlan('enterprise')}
                                                className={`w-full py-2 rounded-md ${billingPlan === 'enterprise' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                                            >
                                                {billingPlan === 'enterprise' ? 'Current Plan' : 'Select Plan'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'advanced' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Shield className="w-5 h-5" />
                                Advanced Settings
                            </h2>
                            
                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">API Access</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200">
                                            <div>
                                                <h4 className="font-medium text-gray-900">API Key</h4>
                                                <p className="text-sm text-gray-500">Use this key to authenticate API requests</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">sk_live_...8y4Q</code>
                                                <button className="text-blue-600 hover:text-blue-800">Regenerate</button>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                                View API Documentation
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Audit Logs</h3>
                                    <div className="space-y-3">
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-100">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dec 15, 2023 10:30 AM</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">User login</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">john.doe@example.com</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">192.168.1.1</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dec 14, 2023 2:15 PM</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Project created</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">john.doe@example.com</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">192.168.1.1</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="mt-4">
                                            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                                Export Logs
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Developer Options</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-medium text-gray-900">Debug Mode</h4>
                                                <p className="text-sm text-gray-500">Enable detailed error logging</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-medium text-gray-900">Performance Metrics</h4>
                                                <p className="text-sm text-gray-500">Track application performance</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" checked />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
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

export default SettingsTab;