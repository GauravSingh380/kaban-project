import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import {
  Plus, Trash2, Download, Edit, Save, X, AlertCircle, CheckCircle2,
  Calendar, User, Users, Flag, FileText, MessageSquare, Settings
} from 'lucide-react';

const DynamicBugCreator = () => {
  const initialBugForm = {
    title: '',
    description: '',
    priority: 'P1',
    status: 'open',
    reportedBy: '',
    assignedTo: '',
    issueEnv: 'Development',
    comments: '',
    reportedOn: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0]
  };

  const [bugs, setBugs] = useState([]);
  const [currentBug, setCurrentBug] = useState(initialBugForm);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const priorityOptions = ['P1', 'P2', 'P3', 'P4'];
  const statusOptions = ['open', 'in-progress', 'fixed', 'closed', 'on-hold'];
  const envOptions = ['prod', 'stg', 'dev', 'demo'];

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'P1': return 'bg-red-100 text-red-700 border-red-200';
      case 'P2': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'P3': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'P4': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'in-progress': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'fixed': return 'bg-green-100 text-green-700 border-green-200';
      case 'closed': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'on-hold': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBug(prev => ({ ...prev, [name]: value }));
  };

  const handleAddBug = () => {
    if (!currentBug.title || !currentBug.description) {
      alert('Please fill in at least the title and description');
      return;
    }

    const bugToAdd = {
      ...currentBug,
      updatedAt: new Date().toISOString().split('T')[0]
    };

    if (editingIndex !== null) {
      const updatedBugs = [...bugs];
      updatedBugs[editingIndex] = bugToAdd;
      setBugs(updatedBugs);
      setEditingIndex(null);
    } else {
      setBugs([...bugs, bugToAdd]);
    }

    setCurrentBug(initialBugForm);
    setShowForm(false);
  };

  const handleEditBug = (index) => {
    setCurrentBug(bugs[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDeleteBug = (index) => {
    if (window.confirm('Are you sure you want to delete this bug?')) {
      setBugs(bugs.filter((_, i) => i !== index));
    }
  };

  const handleCancelEdit = () => {
    setCurrentBug(initialBugForm);
    setEditingIndex(null);
    setShowForm(false);
  };

  const downloadExcel = () => {
    if (bugs.length === 0) {
      alert('Please add at least one bug before downloading');
      return;
    }

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(bugs);

    const colWidths = [
      { wch: 35 }, { wch: 80 }, { wch: 10 }, { wch: 12 },
      { wch: 15 }, { wch: 15 }, { wch: 12 }, { wch: 40 },
      { wch: 12 }, { wch: 12 }, { wch: 12 }
    ];
    ws['!cols'] = colWidths;

    XLSX.utils.book_append_sheet(wb, ws, 'Bugs');
    XLSX.writeFile(wb, `bugs_export_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Bug Entry System</h1>
              <p className="text-gray-600">Create and manage bugs, then export to Excel</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right mr-4">
                <p className="text-sm text-gray-500">Total Bugs</p>
                <p className="text-2xl font-bold text-blue-600">{bugs.length}</p>
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add New Bug
              </button>
              <button
                onClick={downloadExcel}
                disabled={bugs.length === 0}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Download className="w-5 h-5" />
                Download Excel
              </button>
            </div>
          </div>
        </div>

        {/* Bug Entry Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingIndex !== null ? 'Edit Bug' : 'Add New Bug'}
              </h2>
              <button
                onClick={handleCancelEdit}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="w-4 h-4 inline mr-1" />
                  Bug Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={currentBug.title}
                  onChange={handleInputChange}
                  placeholder="Enter bug title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-1" />
                  Description *
                </label>
                <textarea
                  name="description"
                  value={currentBug.description}
                  onChange={handleInputChange}
                  placeholder="Describe the bug in detail"
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Flag className="w-4 h-4 inline mr-1" />
                  Priority
                </label>
                <select
                  name="priority"
                  value={currentBug.priority}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {priorityOptions.map(option => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <CheckCircle2 className="w-4 h-4 inline mr-1" />
                  Status
                </label>
                <select
                  name="status"
                  value={currentBug.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {statusOptions.map(option => (
                    <option key={option} value={option}>
                      {option.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reported By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Reported By
                </label>
                <input
                  type="text"
                  name="reportedBy"
                  value={currentBug.reportedBy}
                  onChange={handleInputChange}
                  placeholder="Reporter name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Assigned To */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-1" />
                  Assigned To
                </label>
                <input
                  type="text"
                  name="assignedTo"
                  value={currentBug.assignedTo}
                  onChange={handleInputChange}
                  placeholder="Assignee name or 'Unassigned'"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Environment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Settings className="w-4 h-4 inline mr-1" />
                  Environment
                </label>
                <select
                  name="issueEnv"
                  value={currentBug.issueEnv}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {envOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Reported On */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Reported On
                </label>
                <input
                  type="date"
                  name="reportedOn"
                  value={currentBug.reportedOn}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Comments */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-1" />
                  Additional Comments
                </label>
                <textarea
                  name="comments"
                  value={currentBug.comments}
                  onChange={handleInputChange}
                  placeholder="Any additional notes or comments"
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleCancelEdit}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddBug}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {editingIndex !== null ? 'Update Bug' : 'Add Bug'}
              </button>
            </div>
          </div>
        )}

        {/* Bug Cards Grid */}
        {bugs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bugs.map((bug, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg mb-2">{bug.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{bug.description}</p>
                    </div>
                    <div className="flex gap-1 ml-2">
                      <button
                        onClick={() => handleEditBug(index)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-full"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBug(index)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-full"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getPriorityColor(bug.priority)}`}>
                      <Flag className="w-3 h-3 inline mr-1" />
                      {bug.priority.toUpperCase()}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(bug.status)}`}>
                      {bug.status === 'open' && <AlertCircle className="w-3 h-3 inline mr-1" />}
                      {bug.status === 'resolved' && <CheckCircle2 className="w-3 h-3 inline mr-1" />}
                      {bug.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="text-xs">Reported: {bug.reportedBy || 'Unknown'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span className="text-xs">Assigned: {bug.assignedTo || 'Unassigned'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      <span className="text-xs">{bug.issueEnv}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs">{new Date(bug.reportedOn).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {bug.comments && (
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">Comments:</p>
                      <p className="text-xs text-gray-600 line-clamp-2">{bug.comments}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bugs Added Yet</h3>
            <p className="text-gray-600 mb-6">Click "Add New Bug" to create your first bug entry</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Your First Bug
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicBugCreator;