// components/LoginForm.js
import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useApiForm } from '../api/hooks/useApi';

const LoginForm = () => {
  const { login } = useAuthContext();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const {
    loading,
    error,
    success,
    submit,
    reset
  } = useApiForm(login, {
    onSuccess: (response) => {
      console.log('Login successful:', response);
      // Redirect or show success message
    },
    onError: (error) => {
      console.error('Login failed:', error);
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submit(formData);
    } catch (error) {
      // Error is handled by useApiForm
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      
      {error && (
        <div className="error">
          {error.message}
          {error.details && (
            <ul>
              {error.details.map((detail, index) => (
                <li key={index}>{detail.msg}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      
      {success && (
        <div className="success">
          Login successful!
        </div>
      )}
      
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      
      <button type="button" onClick={reset}>
        Reset
      </button>
    </form>
  );
};

export default LoginForm;

// components/RegisterForm.js
import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useApiForm } from '../api/hooks/useApi';

const RegisterForm = () => {
  const { register } = useAuthContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const {
    loading,
    error,
    success,
    submit
  } = useApiForm(register, {
    onSuccess: (response) => {
      console.log('Registration successful:', response);
      // Redirect or show success message
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submit(formData);
    } catch (error) {
      // Error is handled by useApiForm
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>
      
      {error && (
        <div className="error">
          {error.message}
        </div>
      )}
      
      {success && (
        <div className="success">
          Registration successful!
        </div>
      )}
      
      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};

export default RegisterForm;

// components/UserProfile.js
import React from 'react';
import { useAuthContext } from '../context/AuthContext';

const UserProfile = () => {
  const { user, loading, logout, logoutAll } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleLogoutAll = async () => {
    try {
      await logoutAll();
    } catch (error) {
      console.error('Logout all error:', error);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>User ID:</strong> {user.userGuid}</p>
      </div>
      
      <div>
        <button onClick={handleLogout}>
          Logout
        </button>
        <button onClick={handleLogoutAll}>
          Logout All Devices
        </button>
      </div>
    </div>
  );
};

export default UserProfile;

// components/ProtectedRoute.js
import React from 'react';
import { useAuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in to access this page.</div>;
  }

  return children;
};

export default ProtectedRoute;

// // App.js - Main app setup
// import React from 'react';
// import { AuthProvider } from './context/AuthContext';
// import LoginForm from './components/LoginForm';
// import RegisterForm from './components/RegisterForm';
// import UserProfile from './components/UserProfile';
// import ProtectedRoute from './components/ProtectedRoute';

// function App() {
//   return (
//     <AuthProvider>
//       <div className="App">
//         <h1>My App</h1>
        
//         {/* Public routes */}
//         <LoginForm />
//         <RegisterForm />
        
//         {/* Protected routes */}
//         <ProtectedRoute>
//           <UserProfile />
//         </ProtectedRoute>
//       </div>
//     </AuthProvider>
//   );
// }

// export default App;