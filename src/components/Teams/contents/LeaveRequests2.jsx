import React, { useState } from 'react';
import {
    Calendar, User, Clock, MapPin, Briefcase, MessageSquare, Check, X,
    Search, Filter, ChevronDown, AlertCircle, CheckCircle2, XCircle,
    FileText, Plus, Download, Upload, Eye, MoreHorizontal, Users,
    TrendingUp, Activity, Award, Bell, Edit, Trash2, RefreshCw,
    CalendarDays, Timer, Building2, FolderOpen, History, Star
} from 'lucide-react';

// Sample data - in real app, this would come from API
const leaveRequestsData = [
    {
        id: 1,
        employee: {
            name: "Sarah Johnson",
            email: "sarah.johnson@company.com",
            avatar: "SJ",
            department: "Engineering",
            role: "Senior Developer",
            currentProjects: ["Dashboard Redesign", "API Migration"],
            employeeId: "EMP001"
        },
        leaveType: "Annual Leave",
        startDate: "2025-09-20",
        endDate: "2025-09-25",
        totalDays: 4, // excluding weekends
        reason: "Family vacation to Europe. Will be available for emergency calls if needed.",
        status: "pending",
        appliedOn: "2025-09-10",
        previousLeaves: 12,
        remainingLeaves: 18,
        coveringPerson: "Mike Chen",
        priority: "low",
        documents: ["flight-tickets.pdf"],
        managerNotes: ""
    },
    {
        id: 2,
        employee: {
            name: "David Rodriguez",
            email: "david.rodriguez@company.com",
            avatar: "DR",
            department: "Marketing",
            role: "Marketing Manager",
            currentProjects: ["Q4 Campaign", "Brand Strategy"],
            employeeId: "EMP002"
        },
        leaveType: "Sick Leave",
        startDate: "2025-09-15",
        endDate: "2025-09-17",
        totalDays: 3,
        reason: "Medical treatment for chronic condition. Doctor's certificate attached.",
        status: "approved",
        appliedOn: "2025-09-12",
        previousLeaves: 8,
        remainingLeaves: 22,
        coveringPerson: "Lisa Wang",
        priority: "medium",
        documents: ["medical-certificate.pdf"],
        managerNotes: "Approved. Take care of your health. Lisa will handle urgent matters."
    },
    {
        id: 3,
        employee: {
            name: "Emma Thompson",
            email: "emma.thompson@company.com",
            avatar: "ET",
            department: "Engineering",
            role: "Team Lead",
            currentProjects: ["Mobile App", "Security Audit"],
            employeeId: "EMP003"
        },
        leaveType: "Maternity Leave",
        startDate: "2025-10-01",
        endDate: "2025-12-31",
        totalDays: 64,
        reason: "Maternity leave for newborn care. Will coordinate handover with team before departure.",
        status: "pending",
        appliedOn: "2025-09-05",
        previousLeaves: 15,
        remainingLeaves: 45,
        coveringPerson: "John Smith",
        priority: "high",
        documents: ["maternity-certificate.pdf", "handover-plan.pdf"],
        managerNotes: ""
    },
    {
        id: 4,
        employee: {
            name: "Alex Kumar",
            email: "alex.kumar@company.com",
            avatar: "AK",
            department: "Sales",
            role: "Sales Executive",
            currentProjects: ["Q4 Pipeline", "Client Onboarding"],
            employeeId: "EMP004"
        },
        leaveType: "Personal Leave",
        startDate: "2025-09-18",
        endDate: "2025-09-19",
        totalDays: 2,
        reason: "Wedding anniversary celebration",
        status: "rejected",
        appliedOn: "2025-09-16",
        previousLeaves: 20,
        remainingLeaves: 10,
        coveringPerson: "Rachel Green",
        priority: "low",
        documents: [],
        managerNotes: "Request denied due to critical client presentation on Sep 19. Please reschedule."
    }
];

const LeaveRequests2 = () => {
    const [leaveRequests, setLeaveRequests] = useState(leaveRequestsData);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [departmentFilter, setDepartmentFilter] = useState('all');
    const [leaveTypeFilter, setLeaveTypeFilter] = useState('all');
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    // Filter and search functionality
    const filteredRequests = leaveRequests.filter(request => {
        const matchesSearch = request.employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            request.employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            request.employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
        const matchesDepartment = departmentFilter === 'all' || request.employee.department === departmentFilter;
        const matchesLeaveType = leaveTypeFilter === 'all' || request.leaveType === leaveTypeFilter;

        return matchesSearch && matchesStatus && matchesDepartment && matchesLeaveType;
    });

    // Helper functions
    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'text-green-700 bg-green-100 border-green-200';
            case 'pending': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
            case 'rejected': return 'text-red-700 bg-red-100 border-red-200';
            default: return 'text-gray-700 bg-gray-100 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'approved': return <CheckCircle2 className="w-3 h-3" />;
            case 'pending': return <Clock className="w-3 h-3" />;
            case 'rejected': return <XCircle className="w-3 h-3" />;
            default: return <AlertCircle className="w-3 h-3" />;
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'text-red-600 bg-red-50 border-red-200';
            case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
            case 'low': return 'text-green-600 bg-green-50 border-green-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getDaysFromNow = (dateString) => {
        const today = new Date();
        const targetDate = new Date(dateString);
        const diffTime = targetDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const handleApprove = (requestId) => {
        setLeaveRequests(prev => prev.map(req => 
            req.id === requestId 
                ? { ...req, status: 'approved', managerNotes: 'Approved by manager' }
                : req
        ));
    };

    const handleReject = (requestId, reason) => {
        setLeaveRequests(prev => prev.map(req => 
            req.id === requestId 
                ? { ...req, status: 'rejected', managerNotes: reason || 'Rejected by manager' }
                : req
        ));
    };

    const getLeaveTypeColor = (leaveType) => {
        switch (leaveType.toLowerCase()) {
            case 'annual leave': return 'text-blue-700 bg-blue-100 border-blue-200';
            case 'sick leave': return 'text-red-700 bg-red-100 border-red-200';
            case 'maternity leave': return 'text-purple-700 bg-purple-100 border-purple-200';
            case 'personal leave': return 'text-indigo-700 bg-indigo-100 border-indigo-200';
            default: return 'text-gray-700 bg-gray-100 border-gray-200';
        }
    };

    // Stats calculations
    const stats = {
        total: leaveRequests.length,
        pending: leaveRequests.filter(req => req.status === 'pending').length,
        approved: leaveRequests.filter(req => req.status === 'approved').length,
        rejected: leaveRequests.filter(req => req.status === 'rejected').length
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Leave Requests</h1>
                        <p className="text-gray-600">Manage and review employee leave requests</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Export
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            New Request
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                        <div className="flex items-center mt-4 text-sm">
                            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                            <span className="text-green-600">+12% from last month</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Pending</p>
                                <p className="text-3xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <Clock className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                        <div className="flex items-center mt-4 text-sm text-gray-600">
                            <span>Requires action</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Approved</p>
                                <p className="text-3xl font-bold text-green-600 mt-1">{stats.approved}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <CheckCircle2 className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                        <div className="flex items-center mt-4 text-sm text-gray-600">
                            <span>This month</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Rejected</p>
                                <p className="text-3xl font-bold text-red-600 mt-1">{stats.rejected}</p>
                            </div>
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                <XCircle className="w-6 h-6 text-red-600" />
                            </div>
                        </div>
                        <div className="flex items-center mt-4 text-sm text-gray-600">
                            <span>This month</span>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="md:col-span-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search by name, email, or ID..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>

                        <div>
                            <select
                                value={departmentFilter}
                                onChange={(e) => setDepartmentFilter(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Departments</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Sales">Sales</option>
                                <option value="HR">HR</option>
                                <option value="Finance">Finance</option>
                            </select>
                        </div>

                        <div>
                            <select
                                value={leaveTypeFilter}
                                onChange={(e) => setLeaveTypeFilter(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Leave Types</option>
                                <option value="Annual Leave">Annual Leave</option>
                                <option value="Sick Leave">Sick Leave</option>
                                <option value="Maternity Leave">Maternity Leave</option>
                                <option value="Personal Leave">Personal Leave</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Leave Requests List */}
            <div className="space-y-4">
                {filteredRequests.map((request) => (
                    <div key={request.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-full bg-blue-500 text-white text-lg flex items-center justify-center font-medium">
                                            {request.employee.avatar}
                                        </div>
                                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                                            request.status === 'approved' ? 'bg-green-500' : 
                                            request.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                                        }`}></div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 text-lg">{request.employee.name}</h3>
                                        <p className="text-sm text-gray-600">{request.employee.email}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-gray-500">ID: {request.employee.employeeId}</span>
                                            <span className="text-xs text-gray-300">•</span>
                                            <span className="text-xs text-gray-500">{request.employee.department}</span>
                                            <span className="text-xs text-gray-300">•</span>
                                            <span className="text-xs text-gray-500">{request.employee.role}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(request.priority)}`}>
                                        {request.priority.toUpperCase()}
                                    </span>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                                        {getStatusIcon(request.status)}
                                        <span className="ml-1">{request.status.toUpperCase()}</span>
                                    </span>
                                    <button 
                                        onClick={() => {
                                            setSelectedRequest(request);
                                            setShowDetails(true);
                                        }}
                                        className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
                                    >
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                                {/* Leave Details */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getLeaveTypeColor(request.leaveType)}`}>
                                            {request.leaveType}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <CalendarDays className="w-4 h-4" />
                                        <span>{formatDate(request.startDate)} - {formatDate(request.endDate)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Timer className="w-4 h-4" />
                                        <span>{request.totalDays} days</span>
                                        <span className="text-xs text-gray-400">
                                            (Starting {getDaysFromNow(request.startDate) > 0 ? `in ${getDaysFromNow(request.startDate)} days` : 'today'})
                                        </span>
                                    </div>
                                </div>

                                {/* Project & Coverage Info */}
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Current Projects</p>
                                        <div className="flex flex-wrap gap-1">
                                            {request.employee.currentProjects.slice(0, 2).map((project, index) => (
                                                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                                    {project}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <User className="w-4 h-4" />
                                        <span>Coverage: {request.coveringPerson}</span>
                                    </div>
                                </div>

                                {/* Leave Balance & History */}
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Leave Balance</p>
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm font-medium text-green-600">{request.remainingLeaves} remaining</span>
                                            <span className="text-sm text-gray-500">{request.previousLeaves} used</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <History className="w-4 h-4" />
                                        <span>Applied on {formatDate(request.appliedOn)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Reason */}
                            <div className="mb-4">
                                <p className="text-xs text-gray-500 mb-1">Reason</p>
                                <p className="text-sm text-gray-700">{request.reason}</p>
                            </div>

                            {/* Documents */}
                            {request.documents.length > 0 && (
                                <div className="mb-4">
                                    <p className="text-xs text-gray-500 mb-2">Documents</p>
                                    <div className="flex flex-wrap gap-2">
                                        {request.documents.map((doc, index) => (
                                            <button key={index} className="flex items-center gap-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-lg transition-colors">
                                                <FileText className="w-3 h-3" />
                                                {doc}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Manager Notes */}
                            {request.managerNotes && (
                                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                    <p className="text-xs text-blue-600 font-medium mb-1">Manager Notes</p>
                                    <p className="text-sm text-blue-800">{request.managerNotes}</p>
                                </div>
                            )}

                            {/* Action Buttons */}
                            {request.status === 'pending' && (
                                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => handleApprove(request.id)}
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm"
                                        >
                                            <Check className="w-4 h-4" />
                                            Approve
                                        </button>
                                        <button 
                                            onClick={() => handleReject(request.id, 'Rejected by manager')}
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2 text-sm"
                                        >
                                            <X className="w-4 h-4" />
                                            Reject
                                        </button>
                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm">
                                            <MessageSquare className="w-4 h-4" />
                                            Request Info
                                        </button>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {request.status !== 'pending' && (
                                <div className="flex justify-end items-center pt-4 border-t border-gray-100">
                                    <div className="flex gap-2">
                                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
                                            <MessageSquare className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {filteredRequests.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No leave requests found</h3>
                        <p className="text-gray-500">Try adjusting your search criteria or filters</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeaveRequests2;