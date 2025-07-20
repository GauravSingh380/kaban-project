import React from 'react'
import {
    Search, Filter, MoreHorizontal, Calendar, Users,Activity, TrendingUp, MessageSquare
} from 'lucide-react';

const LeaveRequests = ({teamMembers}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Leave requests of team members</h3>
                    <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">92%</div>
                <p className="text-sm text-gray-600">Average performance across all members</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Active Members</h3>
                    <Users className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                    {teamMembers.filter(m => m.status === 'active').length}
                </div>
                <p className="text-sm text-gray-600">Out of {teamMembers.length} total members</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Workload</h3>
                    <Activity className="w-5 h-5 text-orange-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                    {Math.round(teamMembers.reduce((sum, m) => sum + m.workload, 0) / teamMembers.length)}%
                </div>
                <p className="text-sm text-gray-600">Average team workload</p>
            </div>

        </div>
    )
}

export default LeaveRequests