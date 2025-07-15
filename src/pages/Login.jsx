import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from 'lucide-react';
import { useToast } from '../components/StyledAlert/ToastContext';
import StyledSpinner from '../components/StyledSpinner/StyledSpinner';
import { useApi, useAuth } from '../api';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: 'gaurav@gmail.com',
    password: 'Welcome@123'
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const alert = useToast();

  const { login, isAuthenticated } = useAuth();
  const { loading, error, execute } = useApi(login);

  // Get the page user was trying to access before login
  const from = location.state?.from?.pathname || '/dashboard';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const apiResp = await execute(formData);
      if (apiResp) {
        alert.success("Login successful!")
      }
      // Clear any previous errors on successful login
      setErrors({});

      // Navigation will happen automatically due to useEffect above
    } catch (error) {
      // Handle different types of errors
      if (error.message) {
        // setErrors({ submit: error.message });
        alert.error(error.message || 'An error occurred. Please try again.');
      } else {
        // setErrors({ submit: 'Login failed. Please try again.' });
        alert.error("Login failed. Please try again.");
      }
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-600 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Back to Landing */}
        <Link
          to="/"
          className="inline-flex items-center text-purple-200 hover:text-purple-500 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Login Form */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 border border-purple-400 border-opacity-20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-purple-700 mb-2">Welcome Back</h1>
            <p className="text-purple-700">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-purple-700 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email || "gaurav@gmail.com"}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 text-gray-700 bg-white bg-opacity-20 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-500 ${errors.email ? 'border-red-400' : 'border-purple-400 border-opacity-30'
                    }`}
                  placeholder="Enter your email"
                  disabled={loading}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-purple-700 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password || "Welcome@123"}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 bg-white bg-opacity-20 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 placeholder-purple-500 ${errors.password ? 'border-red-400' : 'border-purple-400 border-opacity-30'
                    }`}
                  placeholder="Enter your password"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300 transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* API Error Display */}
            {(error || errors.submit) && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error ? error.message : errors.submit}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 cursor-pointer text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ?
                <StyledSpinner
                  borderWidth='3px'
                  size='1.5rem'
                  text='Signing In...'
                  fontSize='semi bold'
                /> :
                'Sign In'
              }
            </button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-purple-700">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-purple-700 underline font-semibold hover:text-purple-700 transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;