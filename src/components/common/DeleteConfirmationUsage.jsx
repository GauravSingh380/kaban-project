import React, { useState } from 'react';
import { Eye, Edit, Trash2, Calendar, User, Clock, AlertTriangle, X } from 'lucide-react';

// Mock helper functions - replace with your actual imports
const getPriorityColor = (priority) => {
  const colors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };
  return colors[priority?.toLowerCase()] || 'bg-gray-100 text-gray-800';
};

const getStatusColor = (status) => {
  const colors = {
    open: 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-purple-100 text-purple-800',
    fixed: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-800'
  };
  return colors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
};

// Styled Spinner Component
const StyledSpinner = ({ size = '1.5rem', borderWidth = '3px', color = 'red' }) => {
  return (
    <div
      className="inline-block animate-spin rounded-full border-solid border-current border-r-transparent"
      style={{
        width: size,
        height: size,
        borderWidth: borderWidth,
        color: color === 'red' ? '#ef4444' : color
      }}
    />
  );
};

// ============================================
// REUSABLE DELETE CONFIRMATION MODAL COMPONENT
// ============================================
/**
 * DeleteConfirmationModal - A reusable confirmation modal component
 * 
 * @param {boolean} isOpen - Controls modal visibility
 * @param {function} onClose - Callback when modal is closed
 * @param {function} onConfirm - Callback when delete is confirmed
 * @param {string} title - Main title for the modal (default: "Confirm Deletion")
 * @param {string} message - Warning message text
 * @param {string} itemName - Name of the item being deleted
 * @param {string} itemSubtext - Additional info about the item (e.g., "Bug #1234")
 * @param {boolean} isDeleting - Shows loading state when true
 * @param {string} confirmButtonText - Text for confirm button (default: "Delete")
 * @param {string} cancelButtonText - Text for cancel button (default: "Cancel")
 * @param {string} deletingText - Text shown while deleting (default: "Deleting...")
 * @param {string} variant - Color variant: 'danger' (red) or 'warning' (yellow) (default: 'danger')
 */
export const DeleteConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Deletion",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  itemName,
  itemSubtext,
  isDeleting = false,
  confirmButtonText = "Delete",
  cancelButtonText = "Cancel",
  deletingText = "Deleting...",
  variant = "danger" // 'danger' or 'warning'
}) => {
  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      gradient: 'from-red-500 to-red-600',
      hoverGradient: 'hover:from-red-600 hover:to-red-700',
      iconBg: 'bg-white bg-opacity-20',
      iconColor: 'text-white',
      boxIcon: 'text-red-500'
    },
    warning: {
      gradient: 'from-yellow-500 to-orange-500',
      hoverGradient: 'hover:from-yellow-600 hover:to-orange-600',
      iconBg: 'bg-white bg-opacity-20',
      iconColor: 'text-white',
      boxIcon: 'text-orange-500'
    }
  };

  const styles = variantStyles[variant] || variantStyles.danger;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[rgba(0,0,0,0.50)]"
        onClick={!isDeleting ? onClose : undefined}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full animate-slideUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          disabled={isDeleting}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Icon */}
        <div className={`bg-gradient-to-r ${styles.gradient} rounded-t-2xl px-6 py-5`}>
          <div className="flex items-center gap-3">
            <div className={`${styles.iconBg} p-2 rounded-full`}>
              <AlertTriangle className={`w-6 h-6 ${styles.iconColor}`} />
            </div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          <p className="text-gray-700 mb-4">
            {message}
          </p>
          
          {/* Item Info Box (only show if itemName is provided) */}
          {itemName && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-5">
              <div className="flex items-start gap-3">
                <Trash2 className={`w-5 h-5 ${styles.boxIcon} mt-0.5 flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 mb-1 truncate">
                    {itemName}
                  </p>
                  {itemSubtext && (
                    <p className="text-xs text-gray-500">{itemSubtext}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cancelButtonText}
            </button>
            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className={`flex-1 px-4 py-2.5 bg-gradient-to-r ${styles.gradient} ${styles.hoverGradient} text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
            >
              {isDeleting ? (
                <>
                  <StyledSpinner size="1.2rem" borderWidth="2px" color="white" />
                  <span>{deletingText}</span>
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  <span>{confirmButtonText}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
  /* Smooth fade */
  @keyframes fadeInSoft {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  /* Smooth slide + slight zoom */
  @keyframes slideUpSoft {
    0% {
      opacity: 0;
      transform: translateY(22px) scale(0.97);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* SUPER smooth bounce-less easing */
  .animate-fadeIn {
    animation: fadeInSoft 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .animate-slideUp {
    animation: slideUpSoft 0.80s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
`}</style>
    </div>
  );
};

// ============================================
// BUG CARD COMPONENT (Example Usage)
// ============================================
const BugCard = ({ 
  id, 
  bugId, 
  deletingBugId, 
  project, 
  slNo, 
  issueEnv, 
  title, 
  description, 
  reportedOn, 
  reportedBy, 
  assignedTo, 
  status, 
  priority, 
  comments, 
  createdAt, 
  updatedAt, 
  onView, 
  onEdit, 
  onDelete, 
  isSelected, 
  onSelect 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isDeleting = deletingBugId === bugId;

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(bugId);
  };

  const handleCloseModal = () => {
    if (!isDeleting) {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div
        className={`
          bg-white border rounded-lg p-6 hover:shadow-md transition-shadow 
          ${isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200"}
          ${isDeleting ? "pointer-events-none opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onSelect(id)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-1">{title}</h3>
              <p className="text-sm font-bold text-gray-600">Bug #{slNo}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">
              {project}
            </span>
            {(status !== "fixed" && status !== "closed") && (
              <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getPriorityColor(priority)}`}>
                {priority}
              </span>
            )}
            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(status)}`}>
              {status}
            </span>
          </div>
        </div>

        <p className="text-md text-gray-600 mb-4 line-clamp-5">{description}</p>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-400" />
            <span>Reported by: {reportedBy}</span>
          </div>
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-400" />
            <span>Assigned to: {assignedTo}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>Reported: {new Date(reportedOn).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>Updated: {new Date(updatedAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="mb-4 flex">
          <p className="text-sm font-medium text-gray-700 pt-0.5 mr-2">Environment:</p>
          <div className="flex flex-wrap gap-2">
            {issueEnv.map((env, index) => (
              <span
                key={index}
                className={`inline-flex px-2 py-1 text-xs rounded-sm
                  ${env === 'demo'
                    ? 'bg-red-100 text-red-400'
                    : 'bg-blue-100 text-blue-800'}
                `}
              >
                {env.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {comments && comments.length > 50 ? `${comments.substring(0, 400)}...` : comments}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onView(id)}
              className="text-blue-600 hover:text-blue-800 p-1 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => onEdit(id)}
              className="text-green-600 hover:text-green-800 p-1 cursor-pointer"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button 
              onClick={handleDeleteClick}
              className="text-red-600 hover:text-red-800 p-1 cursor-pointer"
              disabled={isDeleting}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Using the Reusable Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this bug? This action cannot be undone."
        itemName={title}
        itemSubtext={`Bug #${slNo}`}
        isDeleting={isDeleting}
        confirmButtonText="Delete Bug"
        cancelButtonText="Cancel"
        deletingText="Deleting..."
        variant="danger"
      />
    </>
  );
};

// ============================================
// DEMO COMPONENT (Shows Multiple Use Cases)
// ============================================
const DeleteConfirmationUsage = ()=> {
  const [deletingBugId, setDeletingBugId] = useState(null);
  const [selectedBugs, setSelectedBugs] = useState([]);
  const [showSimpleModal, setShowSimpleModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const sampleBug = {
    id: '1',
    bugId: 'BUG-001',
    project: 'Web Portal',
    slNo: '1234',
    issueEnv: ['production', 'demo'],
    title: 'Login button not responding on mobile devices',
    description: 'Users are reporting that the login button becomes unresponsive after multiple tap attempts on iOS devices.',
    reportedOn: '2024-01-15',
    reportedBy: 'John Doe',
    assignedTo: 'Jane Smith',
    status: 'open',
    priority: 'high',
    comments: 'This is a critical issue affecting user authentication flow.',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  };

  const handleDelete = (bugId) => {
    setDeletingBugId(bugId);
    setTimeout(() => {
      console.log('Bug deleted:', bugId);
      setDeletingBugId(null);
    }, 2000);
  };

  const handleSelect = (id) => {
    setSelectedBugs(prev => 
      prev.includes(id) ? prev.filter(bugId => bugId !== id) : [...prev, id]
    );
  };

  const handleSimpleDelete = () => {
    setIsProcessing(true);
    setTimeout(() => {
      console.log('Item deleted!');
      setIsProcessing(false);
      setShowSimpleModal(false);
    }, 2000);
  };

  const handleWarningAction = () => {
    setIsProcessing(true);
    setTimeout(() => {
      console.log('Action completed!');
      setIsProcessing(false);
      setShowWarningModal(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reusable Delete Confirmation Modal</h1>
          <p className="text-gray-600 mb-6">This modal can be used anywhere in your project with custom props!</p>
        </div>

        {/* Example 1: Bug Card */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Example 1: Bug Card with Modal</h2>
          <BugCard
            {...sampleBug}
            deletingBugId={deletingBugId}
            onView={(id) => console.log('View:', id)}
            onEdit={(id) => console.log('Edit:', id)}
            onDelete={handleDelete}
            isSelected={selectedBugs.includes(sampleBug.id)}
            onSelect={handleSelect}
          />
        </div>

        {/* Example 2: Simple Usage */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Example 2: Simple Modal (No Item Details)</h2>
          <button
            onClick={() => setShowSimpleModal(true)}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium"
          >
            Delete Account
          </button>
          
          <DeleteConfirmationModal
            isOpen={showSimpleModal}
            onClose={() => setShowSimpleModal(false)}
            onConfirm={handleSimpleDelete}
            title="Delete Account"
            message="Are you sure you want to permanently delete your account? All your data will be lost forever."
            isDeleting={isProcessing}
            confirmButtonText="Delete Account"
          />
        </div>

        {/* Example 3: Warning Variant */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Example 3: Warning Variant (Yellow/Orange)</h2>
          <button
            onClick={() => setShowWarningModal(true)}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium"
          >
            Archive Project
          </button>
          
          <DeleteConfirmationModal
            isOpen={showWarningModal}
            onClose={() => setShowWarningModal(false)}
            onConfirm={handleWarningAction}
            title="Archive Project"
            message="This will move the project to the archive. You can restore it later if needed."
            itemName="E-Commerce Platform Redesign"
            itemSubtext="Project ID: #5678"
            isDeleting={isProcessing}
            confirmButtonText="Archive Project"
            deletingText="Archiving..."
            variant="warning"
          />
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationUsage;