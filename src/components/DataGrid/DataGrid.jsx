import React, { useState, useEffect, useMemo } from 'react';
import {
    ChevronUp, ChevronDown, Search, Filter, Download, Eye, Edit, Trash2, Plus, ChevronLeft,
    ChevronRight,
    MoreHorizontal,
    X,
    Calendar,
    User,
    Mail,
    Phone,
    MapPin,
    DollarSign
} from 'lucide-react';
import AddEmployeeModal from './addEmployee/addEmployee';
import EditEmployeeModal from './addEmployee/EditEmployeeModal';
import ViewEmployeeModal from './addEmployee/ViewEmployeeModal';
import Model from '../common/Model'

const AdvancedDataTable = () => {
    // Sample data - in real app, this would come from API
    const [originalData, setOriginalData] = useState([
        {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+1 (555) 123-4567",
            role: "Admin",
            department: "IT",
            salary: 75000,
            location: "New York",
            joinDate: "2023-01-15",
            status: "Active",
            lastLogin: "2024-07-01T10:30:00Z",
            projects: 12,
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane.smith@example.com",
            phone: "+1 (555) 234-5678",
            role: "Manager",
            department: "Marketing",
            salary: 85000,
            location: "Los Angeles",
            joinDate: "2022-08-20",
            status: "Active",
            lastLogin: "2024-06-30T15:45:00Z",
            projects: 8,
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b2e13c5c?w=32&h=32&fit=crop&crop=face"
        },
        {
            id: 3,
            name: "Mike Johnson",
            email: "mike.johnson@example.com",
            phone: "+1 (555) 345-6789",
            role: "Developer",
            department: "IT",
            salary: 70000,
            location: "Chicago",
            joinDate: "2023-03-10",
            status: "Inactive",
            lastLogin: "2024-06-25T09:15:00Z",
            projects: 15,
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
        },
        {
            id: 4,
            name: "Sarah Wilson",
            email: "sarah.wilson@example.com",
            phone: "+1 (555) 456-7890",
            role: "Designer",
            department: "Design",
            salary: 65000,
            location: "San Francisco",
            joinDate: "2023-05-22",
            status: "Active",
            lastLogin: "2024-07-01T14:20:00Z",
            projects: 6,
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
        },
        {
            id: 5,
            name: "David Brown",
            email: "david.brown@example.com",
            phone: "+1 (555) 567-8901",
            role: "Analyst",
            department: "Finance",
            salary: 60000,
            location: "Boston",
            joinDate: "2022-11-08",
            status: "Active",
            lastLogin: "2024-06-29T11:00:00Z",
            projects: 4,
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face"
        },
        {
            id: 6,
            name: "Lisa Garcia",
            email: "lisa.garcia@example.com",
            phone: "+1 (555) 678-9012",
            role: "Manager",
            department: "HR",
            salary: 78000,
            location: "Miami",
            joinDate: "2021-12-03",
            status: "Active",
            lastLogin: "2024-06-30T16:30:00Z",
            projects: 9,
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face"
        },
        {
            id: 7,
            name: "Robert Taylor",
            email: "robert.taylor@example.com",
            phone: "+1 (555) 789-0123",
            role: "Developer",
            department: "IT",
            salary: 72000,
            location: "Seattle",
            joinDate: "2023-02-14",
            status: "Active",
            lastLogin: "2024-07-01T08:45:00Z",
            projects: 11,
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face"
        },
        {
            id: 8,
            name: "Emily Davis",
            email: "emily.davis@example.com",
            phone: "+1 (555) 890-1234",
            role: "Coordinator",
            department: "Operations",
            salary: 55000,
            location: "Denver",
            joinDate: "2023-07-01",
            status: "Inactive",
            lastLogin: "2024-06-20T13:10:00Z",
            projects: 3,
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face"
        }
    ]);

    // State management
    const [data, setData] = useState(originalData);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [isIndeterminate, setIsIndeterminate] = useState(false);
    const [filters, setFilters] = useState({
        department: '',
        role: '',
        status: '',
        location: '',
        salaryRange: { min: '', max: '' }
    });
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        email: '',
        phone: '',
        role: '',
        department: '',
        salary: '',
        location: '',
        joinDate: '',
        status: 'Active',
        projects: 0,
        avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=32&h=32&fit=crop&crop=face'
    });
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState('table'); // table or cards

    // Table columns configuration
    const columns = [
        {
            key: 'name',
            label: 'Employee',
            sortable: true,
            width: 'w-64',
            render: (item) => (
                <div className="flex items-center space-x-3">
                    <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.email}</div>
                    </div>
                </div>
            )
        },
        {
            key: 'role',
            label: 'Role',
            sortable: true,
            width: 'w-32',
            render: (item) => (
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${item.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
                    item.role === 'Manager' ? 'bg-blue-100 text-blue-800' :
                        item.role === 'Developer' ? 'bg-green-100 text-green-800' :
                            item.role === 'Designer' ? 'bg-pink-100 text-pink-800' :
                                'bg-gray-100 text-gray-800'
                    }`}>
                    {item.role}
                </span>
            )
        },
        {
            key: 'department',
            label: 'Department',
            sortable: true,
            width: 'w-28',
            render: (item) => item.department
        },
        {
            key: 'location',
            label: 'Location',
            sortable: true,
            width: 'w-32',
            render: (item) => (
                <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span className="text-sm">{item.location}</span>
                </div>
            )
        },
        {
            key: 'salary',
            label: 'Salary',
            sortable: true,
            width: 'w-24',
            render: (item) => (
                <div className="flex items-center space-x-1">
                    <DollarSign className="w-3 h-3 text-gray-400" />
                    <span className="text-sm font-medium">{item.salary.toLocaleString()}</span>
                </div>
            )
        },
        {
            key: 'joinDate',
            label: 'Join Date',
            sortable: true,
            width: 'w-28',
            render: (item) => (
                <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span className="text-sm">{new Date(item.joinDate).toLocaleDateString()}</span>
                </div>
            )
        },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            width: 'w-24',
            render: (item) => (
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                    {item.status}
                </span>
            )
        },
        {
            key: 'projects',
            label: 'Projects',
            sortable: true,
            width: 'w-20',
            render: (item) => (
                <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {item.projects}
                </span>
            )
        },
        {
            key: 'actions',
            label: 'Actions',
            sortable: false,
            width: 'w-24',
            render: (item) => (
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => handleViewEmployee(item)}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleEditEmployee(item)}
                        className="text-green-600 hover:text-green-800"
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleDeleteEmployee(item.id)}
                        className="text-red-600 hover:text-red-800"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            )
        }
    ];

    // Get unique values for filter dropdowns
    const filterOptions = useMemo(() => ({
        departments: [...new Set(originalData.map(item => item.department))],
        roles: [...new Set(originalData.map(item => item.role))],
        statuses: [...new Set(originalData.map(item => item.status))],
        locations: [...new Set(originalData.map(item => item.location))]
    }), [originalData]);

    // Filtering logic
    const filteredData = useMemo(() => {
        let filtered = originalData;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(item =>
                Object.values(item).some(value =>
                    value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        // Advanced filters
        if (filters.department) {
            filtered = filtered.filter(item => item.department === filters.department);
        }
        if (filters.role) {
            filtered = filtered.filter(item => item.role === filters.role);
        }
        if (filters.status) {
            filtered = filtered.filter(item => item.status === filters.status);
        }
        if (filters.location) {
            filtered = filtered.filter(item => item.location === filters.location);
        }
        if (filters.salaryRange.min) {
            filtered = filtered.filter(item => item.salary >= parseInt(filters.salaryRange.min));
        }
        if (filters.salaryRange.max) {
            filtered = filtered.filter(item => item.salary <= parseInt(filters.salaryRange.max));
        }

        return filtered;
    }, [originalData, searchTerm, filters]);

    // Sorting logic
    const sortedData = useMemo(() => {
        if (!sortConfig.key) return filteredData;

        return [...filteredData].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }, [filteredData, sortConfig]);

    // Pagination logic
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedData.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedData, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    // Handlers
    const handleSort = (key) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handleRowSelect = (id) => {
        let newSelectedRows;
        if (selectedRows.includes(id)) {
            newSelectedRows = selectedRows.filter(rowId => rowId !== id);
        } else {
            newSelectedRows = [...selectedRows, id];
        }

        setSelectedRows(newSelectedRows);

        // Update header checkbox states
        if (newSelectedRows.length === 0) {
            setIsAllSelected(false);
            setIsIndeterminate(false);
        } else if (newSelectedRows.length === paginatedData.length) {
            setIsAllSelected(true);
            setIsIndeterminate(false);
        } else {
            setIsAllSelected(false);
            setIsIndeterminate(true);
        }
    };
    const handleSelectAll = () => {
        if (isAllSelected || isIndeterminate) {
            setSelectedRows([]);
            setIsAllSelected(false);
            setIsIndeterminate(false);
        } else {
            const allIds = paginatedData.map(item => item.id);
            setSelectedRows(allIds);
            setIsAllSelected(true);
            setIsIndeterminate(false);
        }
    };

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setFilters({
            department: '',
            role: '',
            status: '',
            location: '',
            salaryRange: { min: '', max: '' }
        });
        setSearchTerm('');
        setCurrentPage(1);
    };
    const handleAddEmployee = () => {
        // Basic validation
        if (!newEmployee.name || !newEmployee.email || !newEmployee.role || !newEmployee.department) {
            alert('Please fill in all required fields');
            return;
        }

        // Create new employee object
        const employee = {
            id: Math.max(...originalData.map(e => e.id)) + 1, // Generate new ID
            ...newEmployee,
            salary: parseInt(newEmployee.salary),
            projects: parseInt(newEmployee.projects),
            lastLogin: new Date().toISOString()
        };

        // Add to data
        setData([...originalData, employee]);
        setOriginalData([...originalData, employee]);

        // Reset form and close modal
        setNewEmployee({
            name: '',
            email: '',
            phone: '',
            role: '',
            department: '',
            salary: '',
            location: '',
            joinDate: '',
            status: 'Active',
            projects: 0,
            avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=32&h=32&fit=crop&crop=face'
        });

        setIsAddModalOpen(false);
    };

    const exportData = () => {
        const csvContent = [
            columns.filter(col => col.key !== 'actions').map(col => col.label).join(','),
            ...sortedData.map(item =>
                columns
                    .filter(col => col.key !== 'actions')
                    .map(col => item[col.key])
                    .join(',')
            )
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'employees.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };
    // Add these handler functions
    const handleViewEmployee = (employee) => {
        setSelectedEmployee(employee);
        setViewModalOpen(true);
    };

    const handleEditEmployee = (employee) => {
        setSelectedEmployee(employee);
        setEditModalOpen(true);
    };

    const handleUpdateEmployee = (updatedEmployee) => {
        setData(data.map(emp =>
            emp.id === updatedEmployee.id ? updatedEmployee : emp
        ));
        setOriginalData(originalData.map(emp =>
            emp.id === updatedEmployee.id ? updatedEmployee : emp
        ));
        setEditModalOpen(false);
    };

    const handleDeleteEmployee = (id) => {
        setData(data.filter(emp => emp.id !== id));
        setOriginalData(originalData.filter(emp => emp.id !== id));
        setViewModalOpen(false);
    };

    return (
        <div className="max-w-full mx-auto bg-gray-50 min-h-screen">
            <div className="bg-white rounded-lg shadow-lg">
                {/* Header */}
                <div className="border-b border-gray-200 p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Employee Management</h1>
                            <p className="text-gray-600 mt-1">Manage your team members and their information</p>
                        </div>
                        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                            <button
                                onClick={() => setViewMode(viewMode === 'table' ? 'cards' : 'table')}
                                className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                {viewMode === 'table' ? 'Card View' : 'Table View'}
                            </button>
                            <button
                                onClick={exportData}
                                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
                                <Download className="w-4 h-4" />
                                <span>Export</span>
                            </button>
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Add Employee</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search employees..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                                />
                            </div>

                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center space-x-2 px-4 py-2 border rounded-md ${showFilters ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-300 text-gray-700'
                                    }`}
                            >
                                <Filter className="w-4 h-4" />
                                <span>Filters</span>
                            </button>

                            {(Object.values(filters).some(v => v && v !== '') || searchTerm) && (
                                <button
                                    onClick={clearFilters}
                                    className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:text-red-800"
                                >
                                    <X className="w-4 h-4" />
                                    <span>Clear All</span>
                                </button>
                            )}
                        </div>

                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500">
                                Showing {paginatedData.length} of {sortedData.length} results
                            </span>
                            <select
                                value={itemsPerPage}
                                onChange={(e) => {
                                    setItemsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                            >
                                <option value={5}>5 per page</option>
                                <option value={10}>10 per page</option>
                                <option value={25}>25 per page</option>
                                <option value={50}>50 per page</option>
                            </select>
                        </div>
                    </div>

                    {/* Advanced Filters */}
                    {showFilters && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                    <select
                                        value={filters.department}
                                        onChange={(e) => handleFilterChange('department', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                    >
                                        <option value="">All Departments</option>
                                        {filterOptions.departments.map(dept => (
                                            <option key={dept} value={dept}>{dept}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                    <select
                                        value={filters.role}
                                        onChange={(e) => handleFilterChange('role', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                    >
                                        <option value="">All Roles</option>
                                        {filterOptions.roles.map(role => (
                                            <option key={role} value={role}>{role}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        value={filters.status}
                                        onChange={(e) => handleFilterChange('status', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                    >
                                        <option value="">All Statuses</option>
                                        {filterOptions.statuses.map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                    <select
                                        value={filters.location}
                                        onChange={(e) => handleFilterChange('location', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                    >
                                        <option value="">All Locations</option>
                                        {filterOptions.locations.map(location => (
                                            <option key={location} value={location}>{location}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            value={filters.salaryRange.min}
                                            onChange={(e) => handleFilterChange('salaryRange', { ...filters.salaryRange, min: e.target.value })}
                                            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
                                        />
                                        <span className="text-gray-500">to</span>
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            value={filters.salaryRange.max}
                                            onChange={(e) => handleFilterChange('salaryRange', { ...filters.salaryRange, max: e.target.value })}
                                            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Data Display */}
                <div className="p-6">
                    {/* Bulk Actions Toolbar */}
                    <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-1 gap-6">
                        {paginatedData.map((item) => (
                            <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                <div className="flex items-center space-x-4 mb-4">
                                    <img
                                        src={item.avatar}
                                        alt={item.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                                        <p className="text-sm text-gray-500">{item.role}</p>
                                    </div>
                                    <div className="ml-auto">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center space-x-2">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        <span>{item.email}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        <span>{item.phone}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        <span>{item.location}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <DollarSign className="w-4 h-4 text-gray-400" />
                                        <span>${item.salary.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                                    <div className="text-sm text-gray-500">
                                        {item.projects} projects
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button className="text-blue-600 hover:text-blue-800">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button className="text-green-600 hover:text-green-800">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button className="text-red-600 hover:text-red-800" >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Pagination */}
                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                        <div className="text-sm text-gray-500">
                            Showing {paginatedData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
                            {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} entries
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 border rounded-md ${currentPage === 1 ? 'cursor-not-allowed bg-gray-100' : 'hover:bg-gray-50'}`}
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-1 border rounded-md ${currentPage === page ? 'bg-blue-50 border-blue-300 text-blue-600' : 'hover:bg-gray-50'}`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className={`px-3 py-1 border rounded-md ${currentPage === totalPages ? 'cursor-not-allowed bg-gray-100' : 'hover:bg-gray-50'}`}
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isAddModalOpen && <AddEmployeeModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                newEmployee={newEmployee}
                setNewEmployee={setNewEmployee}
                filterOptions={filterOptions}
                onSubmit={handleAddEmployee}
            />}
            {/* {isAddModalOpen &&
                <Model
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    title="Add New Employee"
                    onSubmit={handleAddEmployee}
                    submitText="Add"
                    cancelText="Close"
                >
                    <h3>Model Content</h3>
                </Model>
            } */}
            {viewModalOpen && selectedEmployee && (
                <ViewEmployeeModal
                    employee={selectedEmployee}
                    onClose={() => setViewModalOpen(false)}
                    onEdit={() => {
                        setViewModalOpen(false);
                        setEditModalOpen(true);
                    }}
                    onDelete={handleDeleteEmployee}
                />
            )}

            {editModalOpen && selectedEmployee && (
                <EditEmployeeModal
                    employee={selectedEmployee}
                    onClose={() => setEditModalOpen(false)}
                    onSave={handleUpdateEmployee}
                    filterOptions={filterOptions}
                />
            )}
        </div>
    );
};

export default AdvancedDataTable;