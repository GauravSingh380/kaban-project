import React from 'react';
import { X, Edit, Trash2, User, Mail, Phone, MapPin, DollarSign, Calendar, Briefcase } from 'lucide-react';

const ViewEmployeeModal = ({ employee, onClose, onEdit, onDelete }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">Employee Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column - Profile */}
            <div className="flex flex-col items-center">
              <img 
                src={employee.avatar} 
                alt={employee.name}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h2 className="text-xl font-bold">{employee.name}</h2>
              <span className={`inline-flex px-3 py-1 mt-2 text-xs font-semibold rounded-full ${
                employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {employee.status}
              </span>
            </div>
            
            {/* Right Column - Details */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{employee.email}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{employee.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Briefcase className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-medium">{employee.role}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Briefcase className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="font-medium">{employee.department}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{employee.location}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <DollarSign className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Salary</p>
                  <p className="font-medium">${employee.salary.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Join Date</p>
                  <p className="font-medium">
                    {new Date(employee.joinDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Briefcase className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Projects</p>
                  <p className="font-medium">{employee.projects}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end p-4 border-t space-x-3">
          <button
            onClick={() => onDelete(employee.id)}
            className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-md"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
          <button
            onClick={onEdit}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployeeModal;