import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, ArrowLeft, UserCheck } from 'lucide-react';
import { useApi, useAuth } from '../api';
import { useToast } from '../components/StyledAlert/ToastContext';
import StyledSpinner from '../components/StyledSpinner/StyledSpinner';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const alert = useToast();
  // const [loading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();  
  
  const { register, isAuthenticated } = useAuth();
  const { loading, error, execute } = useApi(register);
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
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
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
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // setIsLoading(true);
    
    try {
      const apiResp = await execute(formData);
      console.log("API Response:", apiResp);
      alert.success('Registration completed successfully!');
      // Clear any previous errors on successful login
      setErrors({});
      // Navigation will happen automatically due to useEffect above
      
    } catch (error) {
      if (error.message) {
        setErrors({ submit: error.message });
        alert.error(error.message || 'An error occurred. Please try again.');
      } else {
        setErrors({ submit: 'Login failed. Please try again.' });
        alert.error("Login failed. Please try again.");
      }
      console.error('Register failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-600 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* Back to Landing */}
        <Link
          to="/"
          className="inline-flex items-center text-purple-200 hover:text-purple-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Register Form */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 border border-purple-400 border-opacity-20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-purple-700 mb-2">Create Account</h1>
            <p className="text-purple-700">Join our project management platform</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            {/* {(error || errors.submit) && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error ? error.message : errors.submit}
              </div>
            )} */}
            <div>
              <label className="block text-purple-700 text-sm font-medium mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 placeholder-purple-400 ${
                    errors.name ? 'border-red-400' : 'border-purple-400 border-opacity-30'
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name}</p>
              )}
            </div>

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
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 placeholder-purple-400 ${
                    errors.email ? 'border-red-400' : 'border-purple-400 border-opacity-30'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-purple-700 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 bg-white bg-opacity-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 placeholder-purple-400 ${
                    errors.password ? 'border-red-400' : 'border-purple-400 border-opacity-30'
                  }`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-purple-700 text-sm font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 bg-white bg-opacity-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 placeholder-purple-400 ${
                    errors.confirmPassword ? 'border-red-400' : 'border-purple-400 border-opacity-30'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Error */}
            {/* {errors.submit && (
              <p className="text-sm text-red-400 text-center">{errors.submit}</p>
            )} */}
            {/* API Error Display */}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-purple-100 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-90 disabled:cursor-not-allowed"
            >
              {/* {loading && <StyledSpinner 
              borderWidth = '3px'
               size = '1rem'/> } */}
              {/* {loading ? 'Creating Account...' : 'Create Account'} */}
              {loading ?
                <StyledSpinner
                  borderWidth='3px'
                  size='1.5rem'
                  text='Creating Account...'
                  fontSize = 'semi bold'
                />
                : 'Create Account'}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-purple-700">
              Already have an account?
              <Link
                to="/login"
                className="text-purple-500 font-semibold underline hover:text-purple-800 transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;