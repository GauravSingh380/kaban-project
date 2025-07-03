import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Eye, Edit, Trash2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import BugCard from './BugCard/BugCard'; // ✅ Use your BugCard component

const bugs = [
  {
    id: 1,
    slNo: 101,
    issueEnv: ['dev', 'stg'],
    title: 'Login page crashes on invalid email',
    description: 'When entering an invalid email format...',
    reportedOn: '2025-07-01',
    reportedBy: 'Gaurav Singh',
    assignedTo: 'Ajeet Gupta',
    status: 'open',
    priority: 'P1',
    comments: 'Needs immediate attention.',
    createdAt: '2025-07-01',
    updatedAt: '2025-07-03',
  },
  {
    id: 2,
    slNo: 102,
    issueEnv: ['demo'],
    title: 'Dashboard chart not loading',
    description: 'Chart fails to load when no active users.',
    reportedOn: '2025-06-28',
    reportedBy: 'Priya Sharma',
    assignedTo: 'Rohit Mehta',
    status: 'fixed',
    priority: 'P2',
    comments: 'Handled edge case.',
    createdAt: '2025-06-28',
    updatedAt: '2025-07-02',
  },
];

export default function BugManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ status: '', priority: '', assignedTo: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [selectedRows, setSelectedRows] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  // Unique filter options
  const filterOptions = {
    status: [...new Set(bugs.map(b => b.status))],
    priority: [...new Set(bugs.map(b => b.priority))],
    assignedTo: [...new Set(bugs.map(b => b.assignedTo))]
  };

  // Filtered bugs
  const filteredBugs = useMemo(() => {
    let result = bugs;

    if (searchTerm) {
      result = result.filter(bug =>
        bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bug.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.status) {
      result = result.filter(bug => bug.status === filters.status);
    }

    if (filters.priority) {
      result = result.filter(bug => bug.priority === filters.priority);
    }

    if (filters.assignedTo) {
      result = result.filter(bug => bug.assignedTo === filters.assignedTo);
    }

    return result;
  }, [searchTerm, filters]);

  // Pagination
  const paginatedBugs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredBugs.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredBugs, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredBugs.length / itemsPerPage);

  // Multi-select handlers
  const handleRowSelect = (id) => {
    let updated = selectedRows.includes(id)
      ? selectedRows.filter(i => i !== id)
      : [...selectedRows, id];

    setSelectedRows(updated);
    setIsAllSelected(updated.length === paginatedBugs.length);
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedRows([]);
      setIsAllSelected(false);
    } else {
      const allIds = paginatedBugs.map(b => b.id);
      setSelectedRows(allIds);
      setIsAllSelected(true);
    }
  };

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({ status: '', priority: '', assignedTo: '' });
    setSearchTerm('');
  };

  const exportData = () => {
    const bugsToExport = selectedRows.length > 0
      ? filteredBugs.filter(bug => selectedRows.includes(bug.id))
      : filteredBugs;

    const csvContent = [
      ['ID', 'Title', 'Status', 'Priority', 'Assigned To'].join(','),
      ...bugsToExport.map(bug =>
        [bug.slNo, `"${bug.title}"`, bug.status, bug.priority, bug.assignedTo].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'bugs.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
        <h2 className="text-2xl font-bold">Bug Management</h2>
        <button
          onClick={exportData}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search bugs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {['status', 'priority', 'assignedTo'].map(type => (
          <select
            key={type}
            value={filters[type]}
            onChange={(e) => handleFilterChange(type, e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">All {type.charAt(0).toUpperCase() + type.slice(1)}</option>
            {filterOptions[type].map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ))}

        {(searchTerm || Object.values(filters).some(f => f)) && (
          <button onClick={clearFilters} className="flex items-center text-red-600">
            <X className="w-4 h-4 mr-1" />
            Clear
          </button>
        )}
      </div>

      {/* Bulk Select */}
      <div className="mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          checked={isAllSelected}
          onChange={handleSelectAll}
          className="w-4 h-4"
        />
        <span>Select All on Page</span>
      </div>

      {/* Bug Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedBugs.map(bug => (
          <div key={bug.id} className="relative">
            <input
              type="checkbox"
              checked={selectedRows.includes(bug.id)}
              onChange={() => handleRowSelect(bug.id)}
              className="absolute top-3 left-3 w-4 h-4"
            />
            <BugCard
              {...bug}
              onView={() => console.log('View', bug.id)}
              onEdit={() => console.log('Edit', bug.id)}
              onDelete={() => console.log('Delete', bug.id)}
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm">
          Showing {paginatedBugs.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredBugs.length)} of {filteredBugs.length} bugs
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-md"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border rounded-md ${currentPage === page ? 'bg-blue-100' : ''}`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-md"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
