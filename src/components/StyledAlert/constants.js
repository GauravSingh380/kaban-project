// Toast types
export const TOAST_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
  };
  
  // Toast positions
  export const TOAST_POSITIONS = {
    TOP_RIGHT: 'top-right',
    TOP_LEFT: 'top-left',
    BOTTOM_RIGHT: 'bottom-right',
    BOTTOM_LEFT: 'bottom-left',
    BOTTOM_CENTER: 'bottom-center',
    TOP_CENTER: 'top-center',
  };
  
  // Default toast settings
  export const DEFAULT_TOAST_SETTINGS = {
    autoClose: 3000,
    position: TOAST_POSITIONS.TOP_RIGHT,
    animationDuration: 400,
    pauseOnHover: true,
  };