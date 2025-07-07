Awesome! Here’s your **starter template** for an industry-standard **React API layer** with **Axios**, **token auth**, and **reusable hooks** — all ready to drop into your project.
Below is the full structure + full code for each file.
You can copy-paste this, or I can zip it for you if needed.

---

## ✅ **1️⃣ Folder Structure**

```
/src
 ├── /api
 │    ├── axiosInstance.js
 │    ├── authApi.js
 ├── /hooks
 │    ├── useAuth.js
 ├── /pages
 │    ├── LoginPage.jsx
 ├── /components
 │    ├── ProtectedRoute.jsx
```

---

## ✅ **2️⃣ `axiosInstance.js`**

```javascript
// src/api/axiosInstance.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // needed for cookies
});

// Add access token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Example: handle 401 errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('accessToken');
      // Optionally redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
```

---

## ✅ **3️⃣ `authApi.js`**

```javascript
// src/api/authApi.js
import axiosInstance from './axiosInstance';

const authApi = {
  register: (data) => axiosInstance.post('/auth/register', data),

  login: (data) => axiosInstance.post('/auth/login', data),

  refreshToken: () => axiosInstance.post('/auth/refresh'),

  logout: () => axiosInstance.post('/auth/logout'),

  logoutAll: () => axiosInstance.post('/auth/logout-all'),

  getProfile: () => axiosInstance.get('/auth/me'),

  verifyToken: () => axiosInstance.post('/auth/verify-token'),
};

export default authApi;
```

---

## ✅ **4️⃣ `useAuth.js`**

```javascript
// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import authApi from '../api/authApi';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await authApi.login(credentials);
      const { token, user } = response.data.data;
      localStorage.setItem('accessToken', token);
      setUser(user);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await authApi.logout();
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  const getProfile = async () => {
    setLoading(true);
    try {
      const response = await authApi.getProfile();
      setUser(response.data.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not get profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Auto-fetch profile if token exists
    if (localStorage.getItem('accessToken')) {
      getProfile();
    }
  }, []);

  return {
    user,
    loading,
    error,
    login,
    logout,
    getProfile,
  };
};
```

---

## ✅ **5️⃣ `LoginPage.jsx`**

```jsx
// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const { login, loading, error } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form);
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          style={{ display: 'block', margin: '10px 0', width: '100%' }}
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          style={{ display: 'block', margin: '10px 0', width: '100%' }}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
```

---

## ✅ **6️⃣ `ProtectedRoute.jsx` (Optional)**

Protect private routes with a simple HOC.

```jsx
// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
```

---

## ✅ **7️⃣ `.env` example**

```
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## ✅ **How to use it**

1. ✅ Call `useAuth()` in any component.
2. ✅ Call `login(credentials)` to log in and auto-store your token.
3. ✅ Use `ProtectedRoute` to secure pages.
4. ✅ Axios automatically sends your token.

---

If you want, I can **package this as a zip** — or generate a **GitHub repo starter template**.
Want me to do that? Just say **“Yes, zip it!”** 🚀
