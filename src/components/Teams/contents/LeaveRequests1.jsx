import React, { useState, useMemo } from 'react';
import {
    Plus, Search, Filter, MoreHorizontal, Calendar, Users, Mail, Phone, 
    MapPin, Star, Edit, Trash2, CheckCircle2, Clock, AlertCircle, 
    Eye, Download, Upload, Activity, Award, TrendingUp, Target, 
    MessageSquare, Video, Slack, PhoneCall, X, Check, FileText,
    CalendarDays, User, Building2, Briefcase, History, AlertTriangle,
    ChevronDown, ChevronUp, Send, MessageCircle,
    Settings
} from 'lucide-react';

const LeaveRequests1 = () => {
    // Mock data for leave requests
    const [leaveRequests] = useState([
        {
            id: 1,
            employee: {
                id: 'EMP001',
                name: 'John Smith',
                email: 'john.smith@company.com',
                phone: '+1 234 567 8900',
                department: 'Engineering',
                position: 'Senior Developer',
                avatar: null,
                manager: 'Sarah Johnson',
                projects: ['E-commerce Platform', 'Mobile App Redesign'],
                joiningDate: '2022-03-15'
            },
            requestId: 'LR-2024-001',
            leaveType: 'Annual Leave',
            startDate: '2024-12-20',
            endDate: '2024-12-27',
            duration: 8,
            status: 'pending',
            reason: 'Family vacation during Christmas holidays. Planning to visit parents and spend quality time with family.',
            appliedDate: '2024-11-15',
            urgency: 'normal',
            previousLeaves: [
                { date: '2024-08-15', duration: 3, type: 'Sick Leave', status: 'approved' },
                { date: '2024-06-10', duration: 5, type: 'Annual Leave', status: 'approved' },
                { date: '2024-03-20', duration: 2, type: 'Personal Leave', status: 'approved' }
            ],
            totalLeavesThisYear: 10,
            remainingLeaves: 15,
            workHandover: 'Tasks delegated to Mike Johnson. Code review completed.',
            emergencyContact: {
                name: 'Jane Smith',
                relationship: 'Spouse',
                phone: '+1 234 567 8901'
            }
        },
        {
            id: 2,
            employee: {
                id: 'EMP002',
                name: 'Emily Davis',
                email: 'emily.davis@company.com',
                phone: '+1 234 567 8902',
                department: 'Marketing',
                position: 'Marketing Manager',
                avatar: null,
                manager: 'Robert Wilson',
                projects: ['Q4 Campaign', 'Brand Redesign'],
                joiningDate: '2021-09-10'
            },
            requestId: 'LR-2024-002',
            leaveType: 'Maternity Leave',
            startDate: '2024-12-15',
            endDate: '2025-03-15',
            duration: 90,
            status: 'pending',
            reason: 'Maternity leave for childbirth and bonding with newborn.',
            appliedDate: '2024-11-10',
            urgency: 'high',
            previousLeaves: [
                { date: '2024-07-20', duration: 2, type: 'Medical Leave', status: 'approved' },
                { date: '2024-04-15', duration: 1, type: 'Personal Leave', status: 'approved' }
            ],
            totalLeavesThisYear: 3,
            remainingLeaves: 22,
            workHandover: 'Campaign responsibilities transferred to Alex Thompson. Client meetings rescheduled.',
            emergencyContact: {
                name: 'Michael Davis',
                relationship: 'Husband',
                phone: '+1 234 567 8903'
            }
        },
        {
            id: 3,
            employee: {
                id: 'EMP003',
                name: 'Michael Chen',
                email: 'michael.chen@company.com',
                phone: '+1 234 567 8904',
                department: 'Design',
                position: 'UI/UX Designer',
                avatar: null,
                manager: 'Lisa Park',
                projects: ['Design System', 'User Research'],
                joiningDate: '2023-01-20'
            },
            requestId: 'LR-2024-003',
            leaveType: 'Sick Leave',
            startDate: '2024-11-25',
            endDate: '2024-11-27',
            duration: 3,
            status: 'approved',
            reason: 'Recovering from flu symptoms. Doctor recommended rest.',
            appliedDate: '2024-11-24',
            urgency: 'urgent',
            previousLeaves: [
                { date: '2024-09-05', duration: 1, type: 'Sick Leave', status: 'approved' },
                { date: '2024-05-12', duration: 7, type: 'Annual Leave', status: 'approved' }
            ],
            totalLeavesThisYear: 8,
            remainingLeaves: 17,
            workHandover: 'Design reviews postponed. Prototypes shared with team.',
            emergencyContact: {
                name: 'Susan Chen',
                relationship: 'Mother',
                phone: '+1 234 567 8905'
            },
            approvedBy: 'Lisa Park',
            approvedDate: '2024-11-24',
            feedback: 'Get well soon! Take care of your health.'
        }
    ]);

    const [selectedRequests, setSelectedRequests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterDepartment, setFilterDepartment] = useState('all');
    const [filterLeaveType, setFilterLeaveType] = useState('all');
    const [expandedRequest, setExpandedRequest] = useState(null);
    const [showActionModal, setShowActionModal] = useState(false);
    const [actionType, setActionType] = useState('');
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [feedback, setFeedback] = useState('');

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-50 text-yellow-700 border-yellow-200';
            case 'approved':
                return 'bg-green-50 text-green-700 border-green-200';
            case 'rejected':
                return 'bg-red-50 text-red-700 border-red-200';
            case 'cancelled':
                return 'bg-gray-50 text-gray-700 border-gray-200';
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    const getUrgencyColor = (urgency) => {
        switch (urgency) {
            case 'urgent':
                return 'bg-red-50 text-red-700 border-red-200';
            case 'high':
                return 'bg-orange-50 text-orange-700 border-orange-200';
            case 'normal':
                return 'bg-blue-50 text-blue-700 border-blue-200';
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    const getLeaveTypeColor = (type) => {
        switch (type.toLowerCase()) {
            case 'annual leave':
                return 'bg-blue-50 text-blue-700';
            case 'sick leave':
                return 'bg-red-50 text-red-700';
            case 'maternity leave':
                return 'bg-pink-50 text-pink-700';
            case 'paternity leave':
                return 'bg-indigo-50 text-indigo-700';
            case 'personal leave':
                return 'bg-purple-50 text-purple-700';
            case 'emergency leave':
                return 'bg-orange-50 text-orange-700';
            default:
                return 'bg-gray-50 text-gray-700';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const calculateDaysBetween = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    };

    const filteredRequests = useMemo(() => {
        return leaveRequests.filter(request => {
            const matchesSearch = request.employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                request.employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                request.requestId.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
            const matchesDepartment = filterDepartment === 'all' || request.employee.department === filterDepartment;
            const matchesLeaveType = filterLeaveType === 'all' || request.leaveType === filterLeaveType;

            return matchesSearch && matchesStatus && matchesDepartment && matchesLeaveType;
        });
    }, [leaveRequests, searchTerm, filterStatus, filterDepartment, filterLeaveType]);

    const handleAction = (request, action) => {
        setSelectedRequest(request);
        setActionType(action);
        setShowActionModal(true);
        setFeedback('');
    };

    const handleSubmitAction = () => {
        // Here you would typically make an API call to update the leave request
        console.log(`${actionType} leave request ${selectedRequest.requestId}`, { feedback });
        setShowActionModal(false);
        setSelectedRequest(null);
        setFeedback('');
    };

    const toggleRequestSelection = (requestId) => {
        setSelectedRequests(prev => 
            prev.includes(requestId) 
                ? prev.filter(id => id !== requestId)
                : [...prev, requestId]
        );
    };

    const toggleExpandRequest = (requestId) => {
        setExpandedRequest(expandedRequest === requestId ? null : requestId);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Leave Requests</h1>
                        <p className="text-gray-600 mt-1">Manage and review team leave requests</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            <Download className="w-4 h-4" />
                            Export
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                            <Settings className="w-4 h-4" />
                            Settings
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-4 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Pending Requests</p>
                                <p className="text-2xl font-bold text-orange-600">
                                    {leaveRequests.filter(r => r.status === 'pending').length}
                                </p>
                            </div>
                            <Clock className="w-8 h-8 text-orange-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Approved Today</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {leaveRequests.filter(r => r.status === 'approved').length}
                                </p>
                            </div>
                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Urgent Requests</p>
                                <p className="text-2xl font-bold text-red-600">
                                    {leaveRequests.filter(r => r.urgency === 'urgent').length}
                                </p>
                            </div>
                            <AlertTriangle className="w-8 h-8 text-red-600" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Total Requests</p>
                                <p className="text-2xl font-bold text-blue-600">{leaveRequests.length}</p>
                            </div>
                            <FileText className="w-8 h-8 text-blue-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow-sm border mb-6">
                <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search by name, email, or request ID..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                            <select
                                value={filterDepartment}
                                onChange={(e) => setFilterDepartment(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">All Departments</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Design">Design</option>
                                <option value="Sales">Sales</option>
                                <option value="HR">HR</option>
                            </select>
                            <select
                                value={filterLeaveType}
                                onChange={(e) => setFilterLeaveType(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">All Leave Types</option>
                                <option value="Annual Leave">Annual Leave</option>
                                <option value="Sick Leave">Sick Leave</option>
                                <option value="Maternity Leave">Maternity Leave</option>
                                <option value="Paternity Leave">Paternity Leave</option>
                                <option value="Personal Leave">Personal Leave</option>
                                <option value="Emergency Leave">Emergency Leave</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Leave Requests List */}
            <div className="space-y-4">
                {filteredRequests.map((request) => (
                    <div key={request.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                        <div className="p-6">
                            {/* Request Header */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedRequests.includes(request.id)}
                                        onChange={() => toggleRequestSelection(request.id)}
                                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                    />
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-blue-500 text-white text-lg flex items-center justify-center font-medium">
                                            {request.employee.name.split(' ').map(word => word[0]).join('')}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 text-lg">{request.employee.name}</h3>
                                            <p className="text-sm text-gray-500">{request.employee.position} • {request.employee.department}</p>
                                            <p className="text-xs text-gray-400">ID: {request.requestId}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getUrgencyColor(request.urgency)}`}>
                                        {request.urgency.toUpperCase()}
                                    </span>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(request.status)}`}>
                                        {request.status === 'pending' && <Clock className="w-3 h-3 mr-1 inline" />}
                                        {request.status === 'approved' && <CheckCircle2 className="w-3 h-3 mr-1 inline" />}
                                        {request.status === 'rejected' && <X className="w-3 h-3 mr-1 inline" />}
                                        {request.status.toUpperCase()}
                                    </span>
                                    <button
                                        onClick={() => toggleExpandRequest(request.id)}
                                        className="p-1 hover:bg-gray-100 rounded-full"
                                    >
                                        {expandedRequest === request.id ? 
                                            <ChevronUp className="w-4 h-4" /> : 
                                            <ChevronDown className="w-4 h-4" />
                                        }
                                    </button>
                                </div>
                            </div>

                            {/* Request Summary */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLeaveTypeColor(request.leaveType)}`}>
                                        {request.leaveType}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <CalendarDays className="w-4 h-4" />
                                    <span>{formatDate(request.startDate)} - {formatDate(request.endDate)}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Clock className="w-4 h-4" />
                                    <span>{request.duration} days</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar className="w-4 h-4" />
                                    <span>Applied {formatDate(request.appliedDate)}</span>
                                </div>
                            </div>

                            <div className="mb-4">
                                <p className="text-sm text-gray-600 line-clamp-2">{request.reason}</p>
                            </div>

                            {/* Action Buttons */}
                            {request.status === 'pending' && (
                                <div className="flex items-center gap-3 mb-4">
                                    <button
                                        onClick={() => handleAction(request, 'approve')}
                                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        <Check className="w-4 h-4" />
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleAction(request, 'reject')}
                                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                        Reject
                                    </button>
                                    <button
                                        onClick={() => handleAction(request, 'feedback')}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                        Request Info
                                    </button>
                                </div>
                            )}

                            {/* Expanded Details */}
                            {expandedRequest === request.id && (
                                <div className="border-t border-gray-200 pt-4 mt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Employee Details */}
                                        <div>
                                            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                                                <User className="w-4 h-4" />
                                                Employee Details
                                            </h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Email:</span>
                                                    <span className="text-gray-900">{request.employee.email}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Phone:</span>
                                                    <span className="text-gray-900">{request.employee.phone}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Manager:</span>
                                                    <span className="text-gray-900">{request.employee.manager}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Joining Date:</span>
                                                    <span className="text-gray-900">{formatDate(request.employee.joiningDate)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Leave Balance */}
                                        <div>
                                            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                                                <Activity className="w-4 h-4" />
                                                Leave Balance
                                            </h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Used this year:</span>
                                                    <span className="text-gray-900">{request.totalLeavesThisYear} days</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Remaining:</span>
                                                    <span className="text-gray-900">{request.remainingLeaves} days</span>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-blue-600 h-2 rounded-full"
                                                            style={{ 
                                                                width: `${(request.totalLeavesThisYear / (request.totalLeavesThisYear + request.remainingLeaves)) * 100}%` 
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Current Projects */}
                                        <div>
                                            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                                                <Briefcase className="w-4 h-4" />
                                                Current Projects
                                            </h4>
                                            <div className="space-y-2">
                                                {request.employee.projects.map((project, index) => (
                                                    <span key={index} className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full mr-2 mb-1">
                                                        {project}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="mt-3">
                                                <p className="text-xs text-gray-500 mb-1">Work Handover:</p>
                                                <p className="text-sm text-gray-700">{request.workHandover}</p>
                                            </div>
                                        </div>

                                        {/* Leave History */}
                                        <div>
                                            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                                                <History className="w-4 h-4" />
                                                Recent Leave History
                                            </h4>
                                            <div className="space-y-2">
                                                {request.previousLeaves.slice(0, 3).map((leave, index) => (
                                                    <div key={index} className="flex justify-between items-center text-sm">
                                                        <div>
                                                            <span className="text-gray-900">{leave.type}</span>
                                                            <span className="text-gray-500 ml-2">({leave.duration} days)</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-gray-500">{formatDate(leave.date)}</span>
                                                            <span className={`px-1 py-0.5 text-xs rounded ${
                                                                leave.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                            }`}>
                                                                {leave.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Emergency Contact */}
                                        <div className="md:col-span-2">
                                            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                                                <Phone className="w-4 h-4" />
                                                Emergency Contact
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Name:</span>
                                                    <span className="text-gray-900">{request.emergencyContact.name}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Relationship:</span>
                                                    <span className="text-gray-900">{request.emergencyContact.relationship}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Phone:</span>
                                                    <span className="text-gray-900">{request.emergencyContact.phone}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Approval Info (if approved) */}
                                        {request.status === 'approved' && request.approvedBy && (
                                            <div className="md:col-span-2">
                                                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                    Approval Details
                                                </h4>
                                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                        <div>
                                                            <span className="text-gray-500">Approved by:</span>
                                                            <span className="text-gray-900 ml-2 font-medium">{request.approvedBy}</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-500">Approved on:</span>
                                                            <span className="text-gray-900 ml-2">{formatDate(request.approvedDate)}</span>
                                                        </div>
                                                    </div>
                                                    {request.feedback && (
                                                        <div className="mt-3">
                                                            <span className="text-gray-500 text-sm">Manager's Note:</span>
                                                            <p className="text-gray-900 mt-1">{request.feedback}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Communication Actions */}
                                    <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-200">
                                        <button className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                            <MessageSquare className="w-4 h-4" />
                                            Message
                                        </button>
                                        <button className="flex items-center gap-2 px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                            <Video className="w-4 h-4" />
                                            Video Call
                                        </button>
                                        <button className="flex items-center gap-2 px-3 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                                            <Mail className="w-4 h-4" />
                                            Email
                                        </button>
                                        <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                                            <Download className="w-4 h-4" />
                                            Export Details
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredRequests.length === 0 && (
                <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No leave requests found</h3>
                    <p className="text-gray-500">Try adjusting your filters or search terms.</p>
                </div>
            )}

            {/* Action Modal */}
            {showActionModal && selectedRequest && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {actionType === 'approve' && 'Approve Leave Request'}
                                {actionType === 'reject' && 'Reject Leave Request'}
                                {actionType === 'feedback' && 'Request Additional Information'}
                            </h3>
                            <button
                                onClick={() => setShowActionModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="mb-4">
                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center font-medium">
                                        {selectedRequest.employee.name.split(' ').map(word => word[0]).join('')}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{selectedRequest.employee.name}</p>
                                        <p className="text-sm text-gray-500">{selectedRequest.requestId}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                        <span className="text-gray-500">Leave Type:</span>
                                        <span className="text-gray-900 ml-1">{selectedRequest.leaveType}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Duration:</span>
                                        <span className="text-gray-900 ml-1">{selectedRequest.duration} days</span>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-gray-500">Period:</span>
                                        <span className="text-gray-900 ml-1">
                                            {formatDate(selectedRequest.startDate)} - {formatDate(selectedRequest.endDate)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {actionType === 'approve' && 'Approval Note (Optional)'}
                                    {actionType === 'reject' && 'Rejection Reason'}
                                    {actionType === 'feedback' && 'Information Requested'}
                                </label>
                                <textarea
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    rows={4}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder={
                                        actionType === 'approve' 
                                            ? 'Add a note for the employee...' 
                                            : actionType === 'reject'
                                            ? 'Please provide a reason for rejection...'
                                            : 'What additional information do you need?...'
                                    }
                                    required={actionType === 'reject'}
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleSubmitAction}
                                disabled={actionType === 'reject' && !feedback.trim()}
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg transition-colors ${
                                    actionType === 'approve' 
                                        ? 'bg-green-600 hover:bg-green-700' 
                                        : actionType === 'reject'
                                        ? 'bg-red-600 hover:bg-red-700'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                } disabled:bg-gray-400 disabled:cursor-not-allowed`}
                            >
                                <Send className="w-4 h-4" />
                                {actionType === 'approve' && 'Approve Request'}
                                {actionType === 'reject' && 'Reject Request'}
                                {actionType === 'feedback' && 'Send Request'}
                            </button>
                            <button
                                onClick={() => setShowActionModal(false)}
                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Bulk Actions (when requests are selected) */}
            {selectedRequests.length > 0 && (
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                            {selectedRequests.length} request{selectedRequests.length !== 1 ? 's' : ''} selected
                        </span>
                        <div className="flex gap-2">
                            <button className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                                <Check className="w-4 h-4" />
                                Bulk Approve
                            </button>
                            <button className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                                <X className="w-4 h-4" />
                                Bulk Reject
                            </button>
                            <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                                <Download className="w-4 h-4" />
                                Export Selected
                            </button>
                        </div>
                        <button
                            onClick={() => setSelectedRequests([])}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeaveRequests1;