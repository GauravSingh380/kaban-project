import React from 'react'

const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                            ? 'border-[#8b41c1] text-[#8b41c1]'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        <tab.icon className="w-4 h-4 inline mr-2" />
                        {tab.label}
                        {tab.count !== undefined && (
                            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                                {tab.count}
                            </span>
                        )}
                    </button>
                ))}
            </nav>
        </div>
  )
}

export default TabNavigation