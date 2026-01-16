// components/Users.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, Filter, Download, UserPlus, Mail, Phone, 
  MapPin, Calendar, Eye, Edit, Trash2, CheckCircle, 
  XCircle, Mail as MailIcon, MapPin as MapPinIcon 
} from 'lucide-react';
import axios from 'axios';
import DataDisplay from '../common/DataDisplay/DataDisplay';
import { useApi, useAuth } from '../../api';
// import UsersCard from './UsersCard';

const TeamUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [serverParams, setServerParams] = useState({
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    role: 'all',
    status: 'all',
    page: 1,
    limit: 6
  });
  const { getAllUserDetails } = useAuth();
  const {
    loading: loadingGetAllUsers,
    error: errorGetAllBugs,
    execute: executeGetAllUsers
  } = useApi(getAllUserDetails);
  // const { getAllUserDetails } = useAuth();
  //   const { loading, error, execute } = useApi(getAllUserDetails);

  // Fetch users function
  const fetchUsers = useCallback(async (params = serverParams) => {
    setLoading(true);
    try {
      const response = await executeGetAllUsers({
        params: {
          ...params,
          page: params.page || 1
        }
      })
       console.log("response----", response.data);
      if (response.success) {
        setUsers(response.data.users);
        setTotalUsers(response.data.pagination.totalUsers);
      }
      console.log("fetched users----", response.data.users);
      console.log("sucsses----", response.data.success);

    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, []);
  // console.log("response.data.pagination.totalUsers", response.data.pagination.totalUsers);
  // Initial fetch
  useEffect(() => {
    fetchUsers();
  }, []);
  
  console.log("users----------------", users);
  // Handle server-side operations
  const handleServerSearch = (searchTerm) => {
    const newParams = { ...serverParams, search: searchTerm, page: 1 };
    setServerParams(newParams);
    fetchUsers(newParams);
  };

  const handleServerFilter = (filters) => {
    const newParams = { 
      ...serverParams, 
      ...filters,
      page: 1 
    };
    setServerParams(newParams);
    fetchUsers(newParams);
  };

  const handleServerSort = (sortBy) => {
    const sortOrder = sortBy === 'name' ? 'asc' : 'desc';
    const newParams = { ...serverParams, sortBy, sortOrder, page: 1 };
    setServerParams(newParams);
    fetchUsers(newParams);
  };

  const handleServerPageChange = (page, limit) => {
    const newParams = { ...serverParams, page, limit };
    setServerParams(newParams);
    fetchUsers(newParams);
  };

  // Action handlers
  const handleViewUser = (userId) => {
    console.log('View user:', userId);
    // Navigate to user detail page or show modal
  };

  const handleEditUser = (userId) => {
    console.log('Edit user:', userId);
    // Open edit modal or navigate
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      console.log('Delete user:', userId);
      // Call delete API
    }
  };

  const handleBulkDelete = async (userIds) => {
    if (window.confirm(`Are you sure you want to delete ${userIds.length} users?`)) {
      try {
        await axios.delete('/api/users/bulk', { data: { userIds } });
        fetchUsers();
      } catch (error) {
        console.error('Error deleting users:', error);
      }
    }
  };

  const handleBulkExport = (userIds) => {
    console.log('Export users:', userIds);
    // Implement export functionality
  };

  const handleBulkEmail = (userIds) => {
    console.log('Send email to users:', userIds);
    // Open email composer
  };

  // Bulk actions configuration
  const bulkActions = [
    {
      label: 'Export',
      icon: Download,
      onClick: handleBulkExport,
      className: 'bg-gray-600 text-white hover:bg-gray-700'
    },
    {
      label: 'Send Email',
      icon: Mail,
      onClick: handleBulkEmail,
      className: 'bg-blue-600 text-white hover:bg-blue-700'
    },
    {
      label: 'Delete',
      icon: Trash2,
      onClick: handleBulkDelete,
      className: 'bg-red-600 text-white hover:bg-red-700'
    }
  ];

  // Filter configuration
  const filterConfig = [
    {
      key: 'role',
      label: 'Role',
      defaultValue: 'all',
      options: [
        { value: 'all', label: 'All Roles' },
        { value: 'admin', label: 'Admin' },
        { value: 'developer', label: 'Developer' },
        { value: 'tester', label: 'Tester' },
        { value: 'viewer', label: 'Viewer' }
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
        { value: 'suspended', label: 'Suspended' }
      ]
    }
  ];

  // Sort options
  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'createdAt', label: 'Newest First' },
    { value: 'role', label: 'Role' },
    { value: 'status', label: 'Status' }
  ];

  // Table columns configuration
  const columns = [
    {
      label: 'User',
      key: 'name',
      render: (item) => (
        <div className="flex items-center">
          <img 
            src={item.avatar} 
            alt={item.name}
            className="w-8 h-8 rounded-full mr-3"
          />
          <div>
            <div className="font-medium text-gray-900">{item.name}</div>
            <div className="text-sm text-gray-500">{item.email}</div>
          </div>
        </div>
      )
    },
    {
      label: 'Role',
      key: 'role',
      render: (item) => {
        const roleColors = {
          'admin': 'bg-blue-100 text-blue-800',
          'developer': 'bg-green-100 text-green-800',
          'tester': 'bg-yellow-100 text-yellow-800',
          'viewer': 'bg-gray-100 text-gray-800'
        };
        return (
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${roleColors[item.role] || 'bg-gray-100 text-gray-800'}`}>
            {item.role}
          </span>
        );
      }
    },
    {
      label: 'Status',
      key: 'status',
      render: (item) => (
        <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${item.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {item.status === 'active' ? (
            <CheckCircle className="w-3 h-3 mr-1" />
          ) : (
            <XCircle className="w-3 h-3 mr-1" />
          )}
          {item.status}
        </span>
      )
    },
    {
      label: 'Department',
      key: 'department',
      render: (item) => <span className="text-gray-700">{item.department}</span>
    },
    {
      label: 'Join Date',
      key: 'joinDate',
      render: (item) => (
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          {new Date(item.joinDate).toLocaleDateString()}
        </div>
      )
    },
    {
      label: 'Actions',
      key: 'actions',
      render: (item) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewUser(item.id);
            }}
            className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-colors"
            title="View"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEditUser(item.id);
            }}
            className="text-green-600 hover:text-green-800 p-1 hover:bg-green-50 rounded transition-colors"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteUser(item.id);
            }}
            className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  // Custom grid card renderer using UsersCard
  const renderGridCard = (item, selectedItems, toggleItemSelection, getRowId) => (
    <div className="relative">
      <input
        type="checkbox"
        checked={selectedItems.includes(getRowId(item))}
        onChange={(e) => {
          e.stopPropagation();
          toggleItemSelection(getRowId(item));
        }}
        className="absolute top-4 left-4 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 z-10"
      />
      <UsersCard
        member={item}
        onView={handleViewUser}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />
    </div>
  );


  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600">Manage all users in your organization</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <UserPlus className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Developers</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.role === 'developer').length}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <UserPlus className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Admins</p>
              <p className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.role === 'admin').length}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <UserPlus className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Data Display Component */}
      <DataDisplay
        data={users}
        columns={columns}
        renderGridCard={renderGridCard}
        filterConfig={filterConfig}
        sortOptions={sortOptions}
        bulkActions={bulkActions}
        
        // Server-side props
        serverSide={true}
        onSearch={handleServerSearch}
        onFilter={handleServerFilter}
        onSort={handleServerSort}
        onPageChange={handleServerPageChange}
        totalItems={totalUsers}
        loading={loading}
        
        // Customization
        searchPlaceholder="Search users by name, email, or department..."
        searchKeys={['name', 'email', 'designation', 'department']}
        emptyStateTitle="No users found"
        emptyStateDescription="Try adjusting your search or filters"
        enableGridView={true}
        enableTableView={true}
        defaultView="grid"
        defaultItemsPerPage={6}
        itemsPerPageOptions={[6, 12, 24, 48]}
        
        // Row configuration
        getRowId={(item) => item.id}
        onRowClick={handleViewUser}
        
        // Styling
        containerClassName=""
        cardClassName=""
      />
    </div>
  );
};
const UsersCard = ({ member, onView, onEdit, onDelete }) => {
    const getRoleColor = (role) => {
      const colors = {
        'super-admin': 'bg-purple-100 text-purple-800',
        'admin': 'bg-blue-100 text-blue-800',
        'developer': 'bg-green-100 text-green-800',
        'tester': 'bg-yellow-100 text-yellow-800',
        'viewer': 'bg-gray-100 text-gray-800'
      };
      return colors[role] || 'bg-gray-100 text-gray-800';
    };
  
    const getStatusColor = (status) => {
      return status === 'active' 
        ? 'bg-green-100 text-green-800' 
        : 'bg-red-100 text-red-800';
    };
  
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all">
        {/* Header with Avatar and Status */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <p className="
                w-16 h-16 
                rounded-full 
                flex items-center justify-center 
                border-2 border-purple-300 
                bg-purple-100 
                text-purple-700 
                font-semibold text-xl 
                shadow-sm
              ">
              {member.avatar || ""}
            </p>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.designation}</p>
              <p className="text-xs text-gray-500 mt-1">{member.department}</p>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getRoleColor(member.role)}`}>
              {member?.role?.toUpperCase()}
            </span>
            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(member.status)}`}>
              {member.status === 'active' ? <CheckCircle className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
              {member.status.toUpperCase()}
            </span>
          </div>
        </div>
  
        {/* Contact Info */}
        <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="truncate">{member.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Phone className="w-4 h-4 text-gray-400" />
            <span>{member.phone}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span>{member.location}</span>
          </div>
        </div>
  
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-600 mb-1">Projects</p>
            <p className="text-lg font-bold text-blue-600">{member.projects.length}</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-600 mb-1">Assigned</p>
            <p className="text-lg font-bold text-orange-600">{member.assignedBugs}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-600 mb-1">Resolved</p>
            <p className="text-lg font-bold text-green-600">{member.resolvedBugs}</p>
          </div>
        </div>
  
        {/* Projects */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Projects:</p>
          <div className="flex flex-wrap gap-2">
            {member.projects.map((project, index) => (
              <span
                key={index}
                className="inline-flex px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded"
              >
                {project}
              </span>
            ))}
          </div>
        </div>
  
        {/* Skills */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Skills:</p>
          <div className="flex flex-wrap gap-2">
            {member.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
              >
                {skill}
              </span>
            ))}
            {member.skills.length > 3 && (
              <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                +{member.skills.length - 3} more
              </span>
            )}
          </div>
        </div>
  
        {/* Join Date */}
        <div className="mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>Joined: {new Date(member.joinDate).toLocaleDateString()}</span>
          </div>
        </div>
  
        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={() => onView(member.id)}
            className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition-colors"
            title="View details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit(member.id)}
            className="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded transition-colors"
            title="Edit member"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(member.id)}
            className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded transition-colors"
            title="Delete member"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

export default TeamUsers;