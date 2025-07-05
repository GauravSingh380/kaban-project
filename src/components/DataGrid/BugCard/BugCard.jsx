import { getPriorityColor, getStatusColor } from "../../../helper";
import { Eye, Edit, Trash2, Calendar, User, Clock } from 'lucide-react';

const BugCard = ({ id, slNo, issueEnv, title, description, reportedOn, reportedBy, assignedTo, status, priority, comments, createdAt, updatedAt, onView, onEdit, onDelete, isSelected, onSelect }) => {
  return (
    <div className={`bg-white border rounded-lg p-6 hover:shadow-md transition-shadow ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
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
          {(status !== "fixed" && status !== "closed") && <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getPriorityColor(priority)}`}>
            {priority}
          </span>}
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
            onClick={() => onDelete(id)}
            className="text-red-600 hover:text-red-800 p-1 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};


export default BugCard;



// import React from 'react';
// import { CalendarDays, ClipboardList, User, Tag, AlertCircle, MessageCircle, Edit, Trash2, Eye } from 'lucide-react';

// const BugCard = ({
//   id,
//   slNo,
//   issueEnv = [],
//   title,
//   description,
//   reportedOn,
//   reportedBy,
//   assignedTo,
//   status,
//   priority,
//   comments,
//   createdAt,
//   updatedAt,
//   onView,
//   onEdit,
//   onDelete,
// }) => {
//   return (
//     <div className="bg-white mb-4 border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow space-y-4">
//       {/* Header */}
//       <div className="flex items-start justify-between">
//         <div>
//           <h2 className="text-lg font-semibold text-gray-800">#{slNo} — {title}</h2>
//           <p className="text-sm text-gray-500 mt-1">{description}</p>
//         </div>
//         <div className="flex space-x-2 cursor-pointer">
//           <button onClick={() => onView?.(id)} className="text-blue-600 hover:text-blue-800">
//             <Eye className="w-5 h-5 cursor-pointer" />
//           </button>
//           <button onClick={() => onEdit?.(id)} className="text-green-600 hover:text-green-800">
//             <Edit className="w-5 h-5 cursor-pointer" />
//           </button>
//           <button onClick={() => onDelete?.(id)} className="text-red-600 hover:text-red-800">
//             <Trash2 className="w-5 h-5 cursor-pointer" />
//           </button>
//         </div>
//       </div>

//       {/* Badges */}
//       <div className="flex flex-wrap gap-2">
//         {issueEnv.map((env) => (
//           <span key={env} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{env}</span>
//         ))}
//         <span className={`text-xs px-2 py-1 rounded-full ${status === 'open'
//           ? 'bg-yellow-100 text-yellow-800'
//           : status === 'fixed'
//             ? 'bg-green-100 text-green-800'
//             : status === 'blocked'
//               ? 'bg-red-100 text-red-800'
//               : 'bg-gray-100 text-gray-800'
//           }`}>
//           {status}
//         </span>
//         <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">{priority}</span>
//       </div>

//       {/* Reporter Info */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
//         <div className="flex items-center space-x-2">
//           <User className="w-4 h-4 text-gray-400" />
//           <span><strong>Reported By:</strong> {reportedBy}</span>
//         </div>
//         <div className="flex items-center space-x-2">
//           <User className="w-4 h-4 text-gray-400" />
//           <span><strong>Assigned To:</strong> {assignedTo}</span>
//         </div>
//         <div className="flex items-center space-x-2">
//           <CalendarDays className="w-4 h-4 text-gray-400" />
//           <span><strong>Reported On:</strong> {reportedOn}</span>
//         </div>
//         <div className="flex items-center space-x-2">
//           <ClipboardList className="w-4 h-4 text-gray-400" />
//           <span><strong>Created At:</strong> {createdAt}</span>
//         </div>
//         <div className="flex items-center space-x-2">
//           <ClipboardList className="w-4 h-4 text-gray-400" />
//           <span><strong>Updated At:</strong> {updatedAt}</span>
//         </div>
//       </div>

//       {/* Comments */}
//       {comments && (
//         <div className="mt-2 text-sm text-gray-700 flex items-start space-x-2">
//           <MessageCircle className="w-4 h-4 mt-0.5 text-gray-400" />
//           <p><strong>Comments:</strong> {comments}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BugCard;
