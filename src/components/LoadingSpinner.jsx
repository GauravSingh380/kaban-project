import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-purple-600">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-200 mx-auto mb-4"></div>
        <p className="text-gray-100">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner