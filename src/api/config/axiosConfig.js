// api/config/axiosConfig.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';
// const API_BASE_URL = 'http://192.168.0.119:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // ✅ Required to send cookies
});

// ✅ Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('➡️ API Request:', {
        method: config.method,
        url: config.url,
        data: config.data,
      });
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ API Response:', {
        status: response.status,
        data: response.data,
      });
    }
    return response;
  },
  async (error) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ API Error:', {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        url: error.config?.url,
      });
    }

    // ❌ Don't try to refresh token automatically here
    // Let your `useAuth` hook handle it via interval

    return Promise.reject(error);
  }
);

export default apiClient;


// // api/config/axiosConfig.js
// import axios from 'axios';

// // const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
// const API_BASE_URL = 'http://localhost:3000/api';

// // Create axios instance
// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true, // Important for cookies
// });

// // Request interceptor
// apiClient.interceptors.request.use(
//   (config) => {
//     // Add auth token to headers if available
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
    
//     // Log request in development
//     if (process.env.NODE_ENV === 'development') {
//       console.log('API Request:', {
//         method: config.method,
//         url: config.url,
//         data: config.data,
//       });
//     }
    
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// apiClient.interceptors.response.use(
//   (response) => {
//     // Log response in development
//     if (process.env.NODE_ENV === 'development') {
//       console.log('API Response:', {
//         status: response.status,
//         data: response.data,
//       });
//     }
    
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
    
//     // Handle 401 errors (token expired)
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
      
//       try {
//         // Try to refresh token
//         const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {}, {
//           withCredentials: true
//         });
        
//         if (response.data.success) {
//           const newToken = response.data.data.accessToken;
//           localStorage.setItem('accessToken', newToken);
          
//           // Retry original request with new token
//           originalRequest.headers.Authorization = `Bearer ${newToken}`;
//           return apiClient(originalRequest);
//         }
//       } catch (refreshError) {
//         // Refresh failed, redirect to login
//         localStorage.removeItem('accessToken');
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       }
//     }
    
//     // Handle other errors
//     if (process.env.NODE_ENV === 'development') {
//       console.error('API Error:', {
//         status: error.response?.status,
//         message: error.response?.data?.message || error.message,
//         url: error.config?.url,
//       });
//     }
    
//     return Promise.reject(error);
//   }
// );

// export default apiClient;