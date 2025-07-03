import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const EditEmployeeModal = ({ employee, onClose, onSave, filterOptions }) => {
  const [editedEmployee, setEditedEmployee] = useState(employee);

  useEffect(() => {
    setEditedEmployee(employee);
  }, [employee]);

  const handleSubmit = () => {
    // Basic validation
    if (!editedEmployee.name || !editedEmployee.email || 
        !editedEmployee.role || !editedEmployee.department) {
      alert('Please fill in all required fields');
      return;
    }
    onSave(editedEmployee);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">Edit Employee</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {/* Form fields same as AddEmployeeModal */}
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={editedEmployee.name}
                onChange={(e) => setEditedEmployee({...editedEmployee, name: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={editedEmployee.email}
                onChange={(e) => setEditedEmployee({...editedEmployee, email: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            
            {/* Phone and Salary */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={editedEmployee.phone}
                  onChange={(e) => setEditedEmployee({...editedEmployee, phone: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                <input
                  type="number"
                  value={editedEmployee.salary}
                  onChange={(e) => setEditedEmployee({...editedEmployee, salary: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>
            
            {/* Role and Department */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={editedEmployee.role}
                  onChange={(e) => setEditedEmployee({...editedEmployee, role: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="">Select Role</option>
                  {filterOptions.roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  value={editedEmployee.department}
                  onChange={(e) => setEditedEmployee({...editedEmployee, department: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="">Select Department</option>
                  {filterOptions.departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Location and Status */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <select
                  value={editedEmployee.location}
                  onChange={(e) => setEditedEmployee({...editedEmployee, location: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="">Select Location</option>
                  {filterOptions.locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editedEmployee.status}
                  onChange={(e) => setEditedEmployee({...editedEmployee, status: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            
            {/* Join Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
              <input
                type="date"
                value={editedEmployee.joinDate}
                onChange={(e) => setEditedEmployee({...editedEmployee, joinDate: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end p-4 border-t space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeModal;