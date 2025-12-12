import React, { useState } from 'react';
import { getPriorityColor, getStatusColor } from "../../../helper";
import { Eye, Edit, Trash2, Calendar, User, Clock } from 'lucide-react';
import StyledSpinner from "../../StyledSpinner/StyledSpinner";
import ConfirmationModal from "../../common/ConfirmationModal";

const BugCard = ({ 
  id, 
  bugId, 
  deletingBugId, 
  loadingDeleteBug, 
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

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsModalOpen(false);
    // Call the parent's delete function
    onDelete(bugId);
  };

  const handleCloseModal = () => {
    // Only allow closing if not currently deleting
    if (deletingBugId !== bugId) {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div
        className={`
          bg-white border rounded-lg p-6 hover:shadow-md transition-shadow 
          ${isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200"}
          ${deletingBugId == bugId ? "pointer-events-none opacity-50 cursor-not-allowed" : ""}
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
              title="View details"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => onEdit(id)}
              className="text-green-600 hover:text-green-800 p-1 cursor-pointer"
              title="Edit bug"
            >
              <Edit className="w-4 h-4" />
            </button>
            {deletingBugId == bugId ? (
              <StyledSpinner 
                borderWidth='3px' 
                size='1.5rem' 
                text='' 
                fontSize='semi bold' 
                color='red' 
              />
            ) : (
              <button
                onClick={handleDeleteClick}
                className="text-red-600 hover:text-red-800 p-1 cursor-pointer"
                title="Delete bug"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Delete Bug"
        message={
          <>
            Are you sure you want to delete <strong>{title || "NA"}</strong>? This action cannot be undone.
          </>
        }
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deletingBugId === bugId}
      />
    </>
  );
};

export default BugCard;