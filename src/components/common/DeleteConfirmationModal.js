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
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
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
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};
