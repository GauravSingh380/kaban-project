import React from 'react'
import { Bug, TrendingUp, FolderOpen, Target } from 'lucide-react';


const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

const StatisticsCard = ({ projects }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Total Projects</p>
                        <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                        <FolderOpen className="w-6 h-6 text-blue-600" />
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    {projects.filter(p => p.status === 'active').length} active
                </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Total Budget</p>
                        <p className="text-2xl font-bold text-gray-900">
                            {formatCurrency(projects.reduce((sum, p) => sum + p.budget, 0))}
                        </p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    {formatCurrency(projects.reduce((sum, p) => sum + p.spent, 0))} spent
                </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Open Issues</p>
                        <p className="text-2xl font-bold text-gray-900">
                            {projects.reduce((sum, p) => sum + p?.bugs?.open, 0) || "NA"}
                        </p>
                    </div>
                    <div className="p-3 bg-orange-100 rounded-full">
                        <Bug className="w-6 h-6 text-orange-600" />
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    {projects.reduce((sum, p) => sum + p?.bugs?.critical, 0) || "NA"} critical
                     critical
                </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-600">Avg Progress</p>
                        <p className="text-2xl font-bold text-gray-900">
                            {Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)}%
                        </p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full">
                        <Target className="w-6 h-6 text-purple-600" />
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    {projects.filter(p => p.progress >= 80).length} near completion
                </p>
            </div>
        </div>
    )
}

export default StatisticsCard