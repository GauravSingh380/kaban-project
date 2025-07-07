// api/utils/apiHandler.js
export class ApiError extends Error {
    constructor(message, status, code) {
      super(message);
      this.name = 'ApiError';
      this.status = status;
      this.code = code;
    }
  }
  
  export const handleApiError = (error) => {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      return new ApiError(
        data?.message || 'An error occurred',
        status,
        data?.code || status
      );
    } else if (error.request) {
      // Network error
      return new ApiError('Network error. Please check your connection.', 0, 'NETWORK_ERROR');
    } else {
      // Other error
      return new ApiError(error.message || 'An unexpected error occurred', 0, 'UNKNOWN_ERROR');
    }
  };
  
  export const createApiMethod = (method, url, options = {}) => {
    return async (data = null, config = {}) => {
      try {
        const response = await apiClient({
          method,
          url,
          data,
          ...config,
          ...options,
        });
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    };
  };