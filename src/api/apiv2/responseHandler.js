// api/responseHandler.js

/**
 * Standard API response handler
 * Handles success and error responses consistently
 */
export const handleApiResponse = (response) => {
    const { data } = response;
    
    if (data.success) {
      return {
        success: true,
        data: data.data,
        message: data.message,
        code: data.code || response.status
      };
    }
    
    throw new Error(data.message || 'Something went wrong');
  };
  
  /**
   * Handle API errors consistently
   */
  export const handleApiError = (error) => {
    const errorResponse = {
      success: false,
      message: 'An unexpected error occurred',
      code: 500,
      details: null
    };
  
    if (error.response) {
      // Server responded with error status
      const { data, status } = error.response;
      errorResponse.code = status;
      errorResponse.message = data.message || `Server error: ${status}`;
      errorResponse.details = data.errors || data.details || null;
      
      // Handle specific error codes
      switch (status) {
        case 400:
          errorResponse.message = data.message || 'Invalid request data';
          break;
        case 401:
          errorResponse.message = 'Authentication required';
          break;
        case 403:
          errorResponse.message = 'Access forbidden';
          break;
        case 404:
          errorResponse.message = 'Resource not found';
          break;
        case 409:
          errorResponse.message = data.message || 'Conflict - Resource already exists';
          break;
        case 423:
          errorResponse.message = data.message || 'Account locked';
          break;
        case 429:
          errorResponse.message = data.message || 'Too many requests';
          break;
        case 500:
          errorResponse.message = 'Server error - Please try again later';
          break;
        default:
          errorResponse.message = data.message || `Error: ${status}`;
      }
    } else if (error.request) {
      // Request made but no response received
      errorResponse.message = 'No response from server. Please check your connection.';
      errorResponse.code = 0;
    } else {
      // Something else happened
      errorResponse.message = error.message || 'An unexpected error occurred';
    }
  
    return errorResponse;
  };
  
  /**
   * Create a wrapper for API calls with consistent error handling
   */
  export const createApiCall = (apiFunction) => {
    return async (...args) => {
      try {
        const response = await apiFunction(...args);
        return handleApiResponse(response);
      } catch (error) {
        const errorResponse = handleApiError(error);
        throw errorResponse;
      }
    };
  };