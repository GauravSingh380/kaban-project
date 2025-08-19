// GlobalModel.js - Reusable Modal Component
import React from 'react';
import { X } from 'lucide-react';

const GlobalModelP = ({ 
  isOpen, 
  onClose, 
  header, 
  children, 
  onSubmit, 
  submitText = "Submit", 
  cancelText = "Cancel",
  size = "medium",
  submitDisabled = false 
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    small: "max-w-md",
    medium: "max-w-2xl",
    large: "max-w-4xl",
    full: "max-w-6xl"
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* <div className="fixed inset-0 transition-opacity bg-[rgba(0,0,0,0.25)] bg-opacity-75" onClick={onClose}></div> */}
        
        <div className={`inline-block w-full ${sizeClasses[size]} my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg`}>
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">{header}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="px-6 py-4 max-h-96 overflow-y-auto">
            {children}
          </div>
          
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={onSubmit}
              disabled={submitDisabled}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {submitText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalModelP;