import React, { useState, useEffect } from 'react';
import { Users, Download, Archive, Trash2, Star, Mail, Phone, MapPin } from 'lucide-react';
import DataDisplay from './DataDisplay';

// ============================================
// EXAMPLE 1: CLIENT-SIDE DATA PROCESSING
// ============================================
const ClientSideExample = () => {
  const [members] = useState([
    {
      id: 1,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      role: 'Project Manager',
      department: 'Engineering',
      status: 'active',
      avatar: 'SW',
      phone: '+1 (555) 123-4567'
    },
    {
      id: 2,
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      role: 'Senior Developer',
      department: 'Engineering',
      status: 'active',
      avatar: 'MJ',
      phone: '+1 (555) 234-5678'
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily.davis@company.com',
      role: 'UI/UX Designer',
      department: 'Design',
      status: 'on_leave',
      avatar: 'ED',
      phone: '+1 (555) 345-6789'
    }
  ]);

  const columns = [
    {
      label: 'Member',
      key: 'name',
      render: (item) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {item.avatar}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{item.name}</div>
            <div className="text-sm text-gray-500">{item.email}</div>
          </div>
        </div>
      )
    },
    {
      label: 'Role',
      key: 'role'
    },
    {
      label: 'Department',
      key: 'department'
    },
    {
      label: 'Status',
      key: 'status',
      render: (item) => {
        const statusColors = {
          active: 'bg-green-100 text-green-700 border-green-200',
          inactive: 'bg-red-100 text-red-700 border-red-200',
          on_leave: 'bg-yellow-100 text-yellow-700 border-yellow-200'
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[item.status]}`}>
            {item.status.replace('_', ' ')}
          </span>
        );
      }
    }
  ];

  const renderGridCard = (item, selectedItems, toggleItemSelection, getRowId) => (
    <div
      key={item.id}
      className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-lg transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={selectedItems.includes(getRowId(item))}
            onChange={(e) => {
              e.stopPropagation();
              toggleItemSelection(getRowId(item));
            }}
            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          />
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {item.avatar}
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
          item.status === 'active' ? 'bg-green-100 text-green-700 border-green-200' :
          item.status === 'inactive' ? 'bg-red-100 text-red-700 border-red-200' :
          'bg-yellow-100 text-yellow-700 border-yellow-200'
        }`}>
          {item.status.replace('_', ' ')}
        </span>
      </div>
      
      <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{item.role}</p>
      
      <div className="space-y-2 mt-4">
        <div className="flex items-center text-xs text-gray-500">
          <Mail className="w-3 h-3 mr-2" />
          {item.email}
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <Phone className="w-3 h-3 mr-2" />
          {item.phone}
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <span className="text-xs text-gray-500">{item.department}</span>
      </div>
    </div>
  );

  const filterConfig = [
    {
      key: 'role',
      label: 'Role',
      defaultValue: 'all',
      options: [
        { value: 'all', label: 'All Roles' },
        { value: 'Project Manager', label: 'Project Manager' },
        { value: 'Senior Developer', label: 'Senior Developer' },
        { value: 'UI/UX Designer', label: 'UI/UX Designer' }
      ]
    },
    {
      key: 'status',
      label: 'Status',
      defaultValue: 'all',
      options: [
        { value: 'all', label: 'All Status' },
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'on_leave', label: 'On Leave' }
      ]
    },
    {
      key: 'department',
      label: 'Department',
      defaultValue: 'all',
      options: [
        { value: 'all', label: 'All Departments' },
        { value: 'Engineering', label: 'Engineering' },
        { value: 'Design', label: 'Design' }
      ]
    }
  ];

  const sortOptions = [
    { value: 'name', label: 'Sort by Name' },
    { value: 'role', label: 'Sort by Role' },
    { value: 'department', label: 'Sort by Department' }
  ];

  const bulkActions = [
    {
      label: 'Export',
      icon: Download,
      className: 'bg-blue-600 text-white hover:bg-blue-700',
      onClick: (selectedIds) => {
        console.log('Export items:', selectedIds);
        alert(`Exporting ${selectedIds.length} items`);
      }
    },
    {
      label: 'Archive',
      icon: Archive,
      className: 'bg-yellow-600 text-white hover:bg-yellow-700',
      onClick: (selectedIds) => {
        console.log('Archive items:', selectedIds);
      }
    },
    {
      label: 'Delete',
      icon: Trash2,
      className: 'bg-red-600 text-white hover:bg-red-700',
      onClick: (selectedIds) => {
        console.log('Delete items:', selectedIds);
      }
    }
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Client-Side Example</h2>
        <p className="text-gray-600">All filtering, sorting, and pagination handled on the client</p>
      </div>
      
      <DataDisplay
        data={members}
        columns={columns}
        renderGridCard={renderGridCard}
        filterConfig={filterConfig}
        sortOptions={sortOptions}
        bulkActions={bulkActions}
        searchPlaceholder="Search members by name, email, or role..."
        searchKeys={['name', 'email', 'role']}
        emptyStateTitle="No members found"
        emptyStateDescription="Try adjusting your search or filters"
        emptyStateIcon={Users}
        onRowClick={(item) => console.log('Clicked:', item)}
        defaultItemsPerPage={6}
        itemsPerPageOptions={[6, 9, 12, 18]}
      />
    </div>
  );
};

// ============================================
// EXAMPLE 2: SERVER-SIDE DATA PROCESSING
// ============================================
const ServerSideExample = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [currentFilters, setCurrentFilters] = useState({});
  const [currentSearch, setCurrentSearch] = useState('');
  const [currentSort, setCurrentSort] = useState('name');

  // Simulate API call
  const fetchData = async (search = '', filters = {}, sort = 'name', page = 1, limit = 6) => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate server response
    const mockApiResponse = {
      data: [
        {
          id: 1,
          name: 'Alice Johnson',
          email: 'alice@example.com',
          role: 'Developer',
          department: 'Engineering',
          status: 'active',
          avatar: 'AJ'
        },
        {
          id: 2,
          name: 'Bob Smith',
          email: 'bob@example.com',
          role: 'Designer',
          department: 'Design',
          status: 'active',
          avatar: 'BS'
        }
      ],
      total: 25,
      page: page,
      limit: limit
    };
    
    setData(mockApiResponse.data);
    setTotalItems(mockApiResponse.total);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (searchTerm) => {
    setCurrentSearch(searchTerm);
    fetchData(searchTerm, currentFilters, currentSort, 1, 6);
  };

  const handleFilter = (filters) => {
    setCurrentFilters(filters);
    fetchData(currentSearch, filters, currentSort, 1, 6);
  };

  const handleSort = (sortBy) => {
    setCurrentSort(sortBy);
    fetchData(currentSearch, currentFilters, sortBy, 1, 6);
  };

  const handlePageChange = (page, limit) => {
    fetchData(currentSearch, currentFilters, currentSort, page, limit);
  };

  const columns = [
    {
      label: 'Member',
      key: 'name',
      render: (item) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            {item.avatar}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{item.name}</div>
            <div className="text-sm text-gray-500">{item.email}</div>
          </div>
        </div>
      )
    },
    {
      label: 'Role',
      key: 'role'
    },
    {
      label: 'Department',
      key: 'department'
    },
    {
      label: 'Status',
      key: 'status',
      render: (item) => (
        <span className="px-2 py-1 rounded-full text-xs font-medium border bg-green-100 text-green-700 border-green-200">
          {item.status}
        </span>
      )
    }
  ];

  const renderGridCard = (item, selectedItems, toggleItemSelection, getRowId) => (
    <div
      key={item.id}
      className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-lg transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={selectedItems.includes(getRowId(item))}
            onChange={(e) => {
              e.stopPropagation();
              toggleItemSelection(getRowId(item));
            }}
            className="w-4 h-4 text-blue-600 rounded"
          />
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {item.avatar}
          </div>
        </div>
        <span className="px-2 py-1 rounded-full text-xs font-medium border bg-green-100 text-green-700 border-green-200">
          {item.status}
        </span>
      </div>
      
      <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{item.role}</p>
      <p className="text-xs text-gray-500">{item.email}</p>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <span className="text-xs text-gray-500">{item.department}</span>
      </div>
    </div>
  );

  const filterConfig = [
    {
      key: 'role',
      label: 'Role',
      options: [
        { value: 'all', label: 'All Roles' },
        { value: 'Developer', label: 'Developer' },
        { value: 'Designer', label: 'Designer' }
      ]
    },
    {
      key: 'department',
      label: 'Department',
      options: [
        { value: 'all', label: 'All Departments' },
        { value: 'Engineering', label: 'Engineering' },
        { value: 'Design', label: 'Design' }
      ]
    }
  ];

  const sortOptions = [
    { value: 'name', label: 'Sort by Name' },
    { value: 'role', label: 'Sort by Role' }
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Server-Side Example</h2>
        <p className="text-gray-600">All filtering, sorting, and pagination handled by the backend API</p>
      </div>
      
      <DataDisplay
        data={data}
        columns={columns}
        renderGridCard={renderGridCard}
        filterConfig={filterConfig}
        sortOptions={sortOptions}
        searchPlaceholder="Search on server..."
        serverSide={true}
        totalItems={totalItems}
        loading={loading}
        onSearch={handleSearch}
        onFilter={handleFilter}
        onSort={handleSort}
        onPageChange={handlePageChange}
        emptyStateTitle="No data from server"
        emptyStateDescription="The server returned no results"
        emptyStateIcon={Users}
      />
    </div>
  );
};

// ============================================
// MAIN DEMO COMPONENT
// ============================================
const DataDisplayDemo = () => {
  const [activeExample, setActiveExample] = useState('client');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">DataDisplay Component Examples</h1>
          <p className="text-gray-600 mb-6">
            A highly reusable component for displaying data with search, filters, sorting, pagination, and bulk actions
          </p>
          
          <div className="flex gap-4">
            <button
              onClick={() => setActiveExample('client')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeExample === 'client'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Client-Side Processing
            </button>
            <button
              onClick={() => setActiveExample('server')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeExample === 'server'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Server-Side Processing
            </button>
          </div>
        </div>

        {activeExample === 'client' ? <ClientSideExample /> : <ServerSideExample />}
      </div>
    </div>
  );
};

export default DataDisplayDemo;