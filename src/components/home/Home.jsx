import React from 'react'

const Home = ({ user }) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {user?.role}
                </div>
            </div>
            {/* Role-specific welcome message */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Dashboard Access</h3>
                <div className="space-y-2">
                    {user?.role === 'Super Admin' && (
                        <p className="text-gray-600">You have full access to all features and can manage all users and settings.</p>
                    )}
                    {user?.role === 'Admin' && (
                        <p className="text-gray-600">You can access most features including form builder and dashboard management.</p>
                    )}
                    {user?.role === 'QA' && (
                        <p className="text-gray-600">You have access to data grid and task management for quality assurance.</p>
                    )}
                    {user?.role === 'User' && (
                        <p className="text-gray-600">You can view the dashboard and manage your tasks.</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Users</h3>
                    <p className="text-3xl font-bold text-blue-600">1,234</p>
                    <p className="text-sm text-gray-500 mt-1">+12% from last month</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Revenue</h3>
                    <p className="text-3xl font-bold text-green-600">$45,678</p>
                    <p className="text-sm text-gray-500 mt-1">+8% from last month</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Active Sessions</h3>
                    <p className="text-3xl font-bold text-purple-600">892</p>
                    <p className="text-sm text-gray-500 mt-1">Currently online</p>
                </div>
            </div>
        </div>
    )
}

export default Home