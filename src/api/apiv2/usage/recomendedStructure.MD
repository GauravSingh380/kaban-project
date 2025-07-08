# Recommended Folder Structure

```
src/
├── api/
│   ├── config.js                    # Axios configuration and interceptors
│   ├── responseHandler.js           # Response handling utilities
│   ├── services/
│   │   ├── authService.js          # Authentication API calls
│   │   ├── userService.js          # User-related API calls
│   │   └── index.js                # Export all services
│   └── hooks/
│       ├── useApi.js               # Custom hooks for API calls
│       └── index.js                # Export all hooks
├── context/
│   ├── AuthContext.js              # Authentication context
│   └── index.js                    # Export all contexts
├── components/
│   ├── auth/
│   │   ├── LoginForm.js
│   │   ├── RegisterForm.js
│   │   └── ProtectedRoute.js
│   ├── user/
│   │   ├── UserProfile.js
│   │   └── UserSettings.js
│   └── common/
│       ├── LoadingSpinner.js
│       └── ErrorMessage.js
├── utils/
│   ├── constants.js                # API endpoints, error codes
│   ├── validators.js               # Form validation utilities
│   └── helpers.js                  # Helper functions
└── App.js
```

## Installation Instructions

1. **Install dependencies:**
```bash
npm install axios
```

2. **Environment variables (.env):**
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENVIRONMENT=development
```

3. **Create index.js files for easy imports:**

**api/services/index.js:**
```javascript
export { default as authService } from './authService';
// Add other services here as you create them
// export { default as userService } from './userService';
```

**api/hooks/index.js:**
```javascript
export * from './useApi';
```

**context/index.js:**
```javascript
export * from './AuthContext';
```

## Key Features

### 1. **Automatic Token Management**
- Automatically adds Authorization header to requests
- Handles token refresh on 401 errors
- Stores tokens securely
- Clears tokens on logout

### 2. **Comprehensive Error Handling**
- Consistent error response format
- Specific error messages for different HTTP status codes
- Network error handling
- Development logging

### 3. **React Hooks Integration**
- `useApi` - Generic API call hook
- `useApiEffect` - Automatic API calls on mount
- `useAuth` - Authentication-specific hook
- `useApiForm` - Form submission with API calls

### 4. **Context Management**
- Global authentication state
- User data management
- Loading states
- Error states

### 5. **Industry Standards**
- Separation of concerns
- Reusable components
- Consistent naming conventions
- Proper error boundaries
- TypeScript-ready structure

## Usage Examples

### Simple API Call:
```javascript
import { useApi } from '../api/hooks';
import { authService } from '../api/services';

const { data, loading, error, execute } = useApi(authService.getCurrentUser);

// Call the API
const handleGetUser = async () => {
  try {
    await execute();
  } catch (error) {
    console.error('Failed to get user:', error);
  }
};
```

### Form Submission:
```javascript
import { useApiForm } from '../api/hooks';
import { authService } from '../api/services';

const { loading, error, success, submit } = useApiForm(
  authService.login,
  {
    onSuccess: (response) => {
      // Handle success
      navigate('/dashboard');
    },
    onError: (error) => {
      // Handle error
      console.error('Login failed:', error);
    }
  }
);
```

### Context Usage:
```javascript
import { useAuthContext } from '../context';

const { user, login, logout, loading, error } = useAuthContext();
```

## Best Practices

1. **Error Handling**: Always handle errors gracefully in your components
2. **Loading States**: Show loading indicators during API calls
3. **Token Security**: Never log tokens in production
4. **API Versioning**: Include version in your API URLs
5. **Request Timeout**: Set appropriate timeouts for API calls
6. **Retry Logic**: Implement retry for failed requests where appropriate

## Advanced Features

### Custom Service Example:
```javascript
// api/services/userService.js
import apiClient from '../config';
import { createApiCall } from '../responseHandler';

class UserService {
  updateProfile = createApiCall(async (userData) => {
    return await apiClient.put('/user/profile', userData);
  });

  uploadAvatar = createApiCall(async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    
    return await apiClient.post('/user/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  });

  getUsers = createApiCall(async (params = {}) => {
    return await apiClient.get('/user', { params });
  });
}

export default new UserService();
```

### Custom Hook Example:
```javascript
// api/hooks/useUsers.js
import { useState, useEffect } from 'react';
import { userService } from '../services';

export const useUsers = (filters = {}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await userService.getUsers(filters);
        setUsers(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [JSON.stringify(filters)]);

  return { users, loading, error };
};
```

This structure provides a solid foundation for any React application with backend API integration. It's scalable, maintainable, and follows industry best practices.