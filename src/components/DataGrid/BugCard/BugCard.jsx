import React from 'react';
import { CalendarDays, ClipboardList, User, Tag, AlertCircle, MessageCircle, Edit, Trash2, Eye } from 'lucide-react';

const BugCard = ({
  id,
  slNo,
  issueEnv = [],
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
}) => {
  return (
    <div className="bg-white mb-4 border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">#{slNo} — {title}</h2>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
        <div className="flex space-x-2 cursor-pointer">
          <button onClick={() => onView?.(id)} className="text-blue-600 hover:text-blue-800">
            <Eye className="w-5 h-5 cursor-pointer" />
          </button>
          <button onClick={() => onEdit?.(id)} className="text-green-600 hover:text-green-800">
            <Edit className="w-5 h-5 cursor-pointer" />
          </button>
          <button onClick={() => onDelete?.(id)} className="text-red-600 hover:text-red-800">
            <Trash2 className="w-5 h-5 cursor-pointer" />
          </button>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {issueEnv.map((env) => (
          <span key={env} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{env}</span>
        ))}
        <span className={`text-xs px-2 py-1 rounded-full ${status === 'open'
          ? 'bg-yellow-100 text-yellow-800'
          : status === 'fixed'
            ? 'bg-green-100 text-green-800'
            : status === 'blocked'
              ? 'bg-red-100 text-red-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
          {status}
        </span>
        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">{priority}</span>
      </div>

      {/* Reporter Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-gray-400" />
          <span><strong>Reported By:</strong> {reportedBy}</span>
        </div>
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-gray-400" />
          <span><strong>Assigned To:</strong> {assignedTo}</span>
        </div>
        <div className="flex items-center space-x-2">
          <CalendarDays className="w-4 h-4 text-gray-400" />
          <span><strong>Reported On:</strong> {reportedOn}</span>
        </div>
        <div className="flex items-center space-x-2">
          <ClipboardList className="w-4 h-4 text-gray-400" />
          <span><strong>Created At:</strong> {createdAt}</span>
        </div>
        <div className="flex items-center space-x-2">
          <ClipboardList className="w-4 h-4 text-gray-400" />
          <span><strong>Updated At:</strong> {updatedAt}</span>
        </div>
      </div>

      {/* Comments */}
      {comments && (
        <div className="mt-2 text-sm text-gray-700 flex items-start space-x-2">
          <MessageCircle className="w-4 h-4 mt-0.5 text-gray-400" />
          <p><strong>Comments:</strong> {comments}</p>
        </div>
      )}
    </div>
  );
};

export default BugCard;
