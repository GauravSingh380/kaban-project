import React, { useState } from 'react'
import TabNavigation from '../common/TabNavigation';
import DataGrid from '../DataGrid/DataGrid';
import DynamicBugCreator from './DynamicBugCreator';
import { FilePlus, Bug } from 'lucide-react';

const IssueManagement = () => {
  const [activeTab, setActiveTab] = useState('members');

  // Define tabs configuration
  const tabs = [
    { id: 'bugs', label: 'Bugs', icon: Bug, count: 48 },
    { id: 'create_bug', label: 'Create Multiple bug', icon: FilePlus, count: 8 },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'bugs':
        return <DataGrid />;
      case 'create_bug':
        return <DynamicBugCreator />;
      default:
        return <DataGrid />;
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-8xl px-6 mx-auto sm:px-6 lg:px-8 py-4">
        {/* Header */}
        <div className="mb-2">
          <TabNavigation
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
        {/* Tab Content */}
        <div className="transition-all duration-200">
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}

export default IssueManagement