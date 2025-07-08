// utils/constants.js
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    LOGOUT_ALL: '/auth/logout-all',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    VERIFY_TOKEN: '/auth/verify-token'
  },
  USER: {
    PROFILE: '/user/profile',
    AVATAR: '/user/avatar',
    SETTINGS: '/user/settings'
  }
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  LOCKED: 423,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Please log in to continue.',
  FORBIDDEN: 'You don\'t have permission to access this resource.',
  NOT_FOUND: 'The requested resource was not found.',
  CONFLICT: 'The resource already exists.',
  LOCKED: 'Account is temporarily locked.',
  TOO_MANY_REQUESTS: 'Too many requests. Please try again later.',
  INTERNAL_SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.'
};

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_DATA: 'userData'
};

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/'
};

// utils/validators.js
export const validators = {
  email: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  password: (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  },

  name: (name) => {
    return name && name.trim().length >= 2;
  },

  required: (value) => {
    return value !== null && value !== undefined && value.toString().trim() !== '';
  }
};

export const validateForm = (formData, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const value = formData[field];
    const fieldRules = rules[field];
    
    fieldRules.forEach(rule => {
      if (typeof rule === 'function') {
        const result = rule(value);
        if (result !== true) {
          errors[field] = result;
        }
      } else if (typeof rule === 'string') {
        if (!validators[rule] || !validators[rule](value)) {
          errors[field] = `Invalid ${field}`;
        }
      }
    });
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// utils/helpers.js
export const formatError = (error) => {
  if (typeof error === 'string') {
    return error;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  return new Date(date).toLocaleDateString('en-US', {
    ...defaultOptions,
    ...options
  });
};

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// utils/storage.js
class StorageService {
  constructor() {
    this.storage = typeof window !== 'undefined' ? localStorage : null;
  }

  set(key, value) {
    if (!this.storage) return;
    
    try {
      const serializedValue = JSON.stringify(value);
      this.storage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  get(key) {
    if (!this.storage) return null;
    
    try {
      const item = this.storage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }

  remove(key) {
    if (!this.storage) return;
    
    try {
      this.storage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }

  clear() {
    if (!this.storage) return;
    
    try {
      this.storage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  has(key) {
    if (!this.storage) return false;
    return this.storage.getItem(key) !== null;
  }
}

export const storage = new StorageService();

// components/common/LoadingSpinner.js
import React from 'react';

const LoadingSpinner = ({ size = 'medium', message = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]}`}></div>
      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;

// components/common/ErrorMessage.js
import React from 'react';

const ErrorMessage = ({ error, onRetry, onDismiss }) => {
  if (!error) return null;

  const errorMessage = typeof error === 'string' ? error : error.message || 'An error occurred';

  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
      <div className="flex items-start">
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <p className="mt-1 text-sm text-red-700">{errorMessage}</p>
          
          {error.details && (
            <div className="mt-2">
              <ul className="text-sm text-red-600 list-disc list-inside">
                {error.details.map((detail, index) => (
                  <li key={index}>{detail.msg || detail}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="flex space-x-2">
          {onRetry && (
            <button
              onClick={onRetry}
              className="text-sm text-red-600 hover:text-red-800 underline"
            >
              Retry
            </button>
          )}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-sm text-red-600 hover:text-red-800"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;