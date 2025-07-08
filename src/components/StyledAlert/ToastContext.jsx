import React, { createContext, useState, useContext } from 'react';
import { ToastContainer } from './StyledComponents';
import ToastItem from './ToastItem';
import { TOAST_TYPES, TOAST_POSITIONS, DEFAULT_TOAST_SETTINGS } from './constants';

// Create context
export const ToastContext = createContext({});

// Toast provider component
export const ToastProvider = ({ children, settings = {} }) => {
  const [toasts, setToasts] = useState([]);
  const mergedSettings = { ...DEFAULT_TOAST_SETTINGS, ...settings };

  const addToast = (message, type, options = {}) => {
    // Assign custom position based on type if not specified in options
    let position = options.position || mergedSettings.position;
    
    // Default behavior: success and info at top right, error and warning at bottom center
    if (!options.position) {
      if (type === TOAST_TYPES.ERROR || type === TOAST_TYPES.WARNING || type === TOAST_TYPES.SUCCESS) {
        position = TOAST_POSITIONS.TOP_RIGHT;
      } else {
        position = TOAST_POSITIONS.BOTTOM_CENTER;
      }
    }

    const id = Date.now();
    const toast = {
      id,
      message,
      type,
      ...mergedSettings,
      ...options,
      position,
    };
    setToasts((prev) => [...prev, toast]);
    return id;
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const removeAllToasts = () => {
    setToasts([]);
  };

  // Group toasts by position
  const toastsByPosition = toasts.reduce((acc, toast) => {
    const { position } = toast;
    if (!acc[position]) {
      acc[position] = [];
    }
    acc[position].push(toast);
    return acc;
  }, {});

  // Create success, error, warning, and info toast shortcuts
  const success = (message, options = {}) => addToast(message, TOAST_TYPES.SUCCESS, options);
  const error = (message, options = {}) => addToast(message, TOAST_TYPES.ERROR, options);
  const warning = (message, options = {}) => addToast(message, TOAST_TYPES.WARNING, options);
  const info = (message, options = {}) => addToast(message, TOAST_TYPES.INFO, options);

  // Toast context value
  const contextValue = {
    addToast,
    removeToast,
    removeAllToasts,
    success,
    error,
    warning,
    info,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {Object.keys(toastsByPosition).map((position) => (
        <ToastContainer key={position} position={position}>
          {toastsByPosition[position].map((toast) => (
            <ToastItem
              key={toast.id}
              id={toast.id}
              type={toast.type}
              message={toast.message}
              autoClose={toast.autoClose}
              theme={toast.theme}
              onClose={removeToast}
              animationDuration={toast.animationDuration}
              pauseOnHover={toast.pauseOnHover}
            />
          ))}
        </ToastContainer>
      ))}
    </ToastContext.Provider>
  );
};

// Custom hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};