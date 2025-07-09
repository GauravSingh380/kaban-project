import React, { useState } from 'react';
import { 
  User, Mail, Lock, Phone, MapPin, Calendar, Briefcase, 
  Code, Users, Target, Clock, Building, Eye, EyeOff, 
  ArrowLeft, UserCheck, Plus, X, Star, ChevronDown 
} from 'lucide-react';

// Reusable Input Component
const FormInput = ({ 
  field, 
  value, 
  onChange, 
  error, 
  showPassword, 
  togglePasswordVisibility 
}) => {
  const getIcon = (type) => {
    const icons = {
      text: User,
      email: Mail,
      password: Lock,
      phone: Phone,
      tel: Phone,
      location: MapPin,
      date: Calendar,
      number: Target,
      select: ChevronDown,
      textarea: Code
    };
    return icons[type] || User;
  };

  const IconComponent = getIcon(field.type);
  
  const baseInputClasses = `w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 placeholder-purple-400 transition-colors ${
    error ? 'border-red-400' : 'border-purple-400 border-opacity-30'
  }`;

  const renderInput = () => {
    switch (field.type) {
      case 'select':
        return (
          <div className="relative">
            <IconComponent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
            <select
              name={field.name}
              value={value}
              onChange={onChange}
              className={baseInputClasses}
              required={field.required}
            >
              <option value="">{field.placeholder}</option>
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5 pointer-events-none" />
          </div>
        );
      
      case 'textarea':
        return (
          <div className="relative">
            <IconComponent className="absolute left-3 top-4 text-purple-400 w-5 h-5" />
            <textarea
              name={field.name}
              value={value}
              onChange={onChange}
              rows={field.rows || 3}
              className={`${baseInputClasses} pt-4 resize-none`}
              placeholder={field.placeholder}
              required={field.required}
            />
          </div>
        );
      
      case 'password':
        return (
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              name={field.name}
              value={value}
              onChange={onChange}
              className={`${baseInputClasses} pr-12`}
              placeholder={field.placeholder}
              required={field.required}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        );
      
      default:
        return (
          <div className="relative">
            <IconComponent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
            <input
              type={field.type}
              name={field.name}
              value={value}
              onChange={onChange}
              className={baseInputClasses}
              placeholder={field.placeholder}
              required={field.required}
              min={field.min}
              max={field.max}
            />
          </div>
        );
    }
  };

  return (
    <div>
      <label className="block text-purple-700 text-sm font-medium mb-2">
        {field.label}
        {field.required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {renderInput()}
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};

// Multi-select component for skills and projects
const MultiSelectInput = ({ field, value, onChange, error }) => {
  const [inputValue, setInputValue] = useState('');
  
  const addItem = () => {
    if (inputValue.trim() && !value.includes(inputValue.trim())) {
      onChange({
        target: {
          name: field.name,
          value: [...value, inputValue.trim()]
        }
      });
      setInputValue('');
    }
  };

  const removeItem = (itemToRemove) => {
    onChange({
      target: {
        name: field.name,
        value: value.filter(item => item !== itemToRemove)
      }
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addItem();
    }
  };

  return (
    <div>
      <label className="block text-purple-700 text-sm font-medium mb-2">
        {field.label}
        {field.required && <span className="text-red-400 ml-1">*</span>}
      </label>
      
      <div className="relative mb-2">
        <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className={`w-full pl-10 pr-12 py-3 bg-white bg-opacity-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 placeholder-purple-400 ${
            error ? 'border-red-400' : 'border-purple-400 border-opacity-30'
          }`}
          placeholder={field.placeholder}
        />
        <button
          type="button"
          onClick={addItem}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300 transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>
      
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {value.map((item, index) => (
            <span key={index} className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
              {item}
              <button
                type="button"
                onClick={() => removeItem(item)}
                className="ml-2 text-purple-500 hover:text-purple-700"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};

// Main Form Component
const ReusableSignupForm = ({ 
  formConfig, 
  onSubmit, 
  loading = false, 
  title = "Create Account",
  subtitle = "Join our platform",
  submitButtonText = "Create Account",
  showBackButton = true,
  backButtonText = "Back to Home",
  backButtonLink = "/",
  loginLink = "/login"
}) => {
  const [formData, setFormData] = useState(() => {
    const initial = {};
    formConfig.forEach(field => {
      initial[field.name] = field.type === 'multiselect' ? [] : '';
    });
    return initial;
  });

  const [errors, setErrors] = useState({});
  const [passwordVisibility, setPasswordVisibility] = useState({});

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

  const togglePasswordVisibility = (fieldName) => {
    setPasswordVisibility(prev => ({
      ...prev,
      [fieldName]: !prev[fieldName]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    formConfig.forEach(field => {
      const value = formData[field.name];
      
      if (field.required && (!value || (Array.isArray(value) && value.length === 0))) {
        newErrors[field.name] = `${field.label} is required`;
      }
      
      if (field.validation) {
        const validationResult = field.validation(value, formData);
        if (validationResult !== true) {
          newErrors[field.name] = validationResult;
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    
    if (!validateForm()) return;
    
    try {
      await onSubmit(formData);
      // Reset form on success
      const resetData = {};
      formConfig.forEach(field => {
        resetData[field.name] = field.type === 'multiselect' ? [] : '';
      });
      setFormData(resetData);
      setErrors({});
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-600 flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full">
        {showBackButton && (
          <a
            href={backButtonLink}
            className="inline-flex items-center text-purple-200 hover:text-purple-400 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {backButtonText}
          </a>
        )}

        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 border border-purple-400 border-opacity-20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-purple-700 mb-2">{title}</h1>
            <p className="text-purple-700">{subtitle}</p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formConfig.map((field) => (
                <div key={field.name} className={field.fullWidth ? 'md:col-span-2' : ''}>
                  {field.type === 'multiselect' ? (
                    <MultiSelectInput
                      field={field}
                      value={formData[field.name] || []}
                      onChange={handleInputChange}
                      error={errors[field.name]}
                    />
                  ) : (
                    <FormInput
                      field={field}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                      error={errors[field.name]}
                      showPassword={passwordVisibility[field.name] || false}
                      togglePasswordVisibility={() => togglePasswordVisibility(field.name)}
                    />
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-purple-600 text-purple-100 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-100 mr-2"></div>
                  Loading...
                </>
              ) : (
                submitButtonText
              )}
            </button>
          </div>

          {loginLink && (
            <div className="mt-8 text-center">
              <p className="text-purple-700">
                Already have an account?{' '}
                <a
                  href={loginLink}
                  className="text-purple-500 font-semibold underline hover:text-purple-800 transition-colors"
                >
                  Sign In
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Example usage with team member signup configuration
const TeamMemberSignupExample = () => {
  // Team member form configuration
  const teamMemberFormConfig = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter your full name',
      required: true,
      validation: (value) => {
        if (value.length < 2) return 'Name must be at least 2 characters';
        return true;
      }
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'Enter your email',
      required: true,
      validation: (value) => {
        if (!/\S+@\S+\.\S+/.test(value)) return 'Please enter a valid email';
        return true;
      }
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      placeholder: 'Enter your phone number',
      required: true,
      validation: (value) => {
        if (!/^\+?[\d\s\-\(\)]+$/.test(value)) return 'Please enter a valid phone number';
        return true;
      }
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
      placeholder: 'Enter your location',
      required: true
    },
    {
      name: 'department',
      label: 'Department',
      type: 'select',
      placeholder: 'Select your department',
      required: true,
      options: [
        { value: 'engineering', label: 'Engineering' },
        { value: 'design', label: 'Design' },
        { value: 'product', label: 'Product' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'sales', label: 'Sales' },
        { value: 'hr', label: 'Human Resources' },
        { value: 'finance', label: 'Finance' }
      ]
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      placeholder: 'Select your role',
      required: true,
      options: [
        { value: 'junior', label: 'Junior Developer' },
        { value: 'senior', label: 'Senior Developer' },
        { value: 'lead', label: 'Team Lead' },
        { value: 'manager', label: 'Manager' },
        { value: 'designer', label: 'Designer' },
        { value: 'analyst', label: 'Analyst' }
      ]
    },
    {
      name: 'experience',
      label: 'Years of Experience',
      type: 'number',
      placeholder: 'Enter years of experience',
      required: true,
      min: 0,
      max: 50
    },
    {
      name: 'joinDate',
      label: 'Join Date',
      type: 'date',
      required: true
    },
    {
      name: 'skills',
      label: 'Skills',
      type: 'multiselect',
      placeholder: 'Add a skill and press Enter',
      required: true,
      fullWidth: true
    },
    {
      name: 'projects',
      label: 'Previous Projects',
      type: 'multiselect',
      placeholder: 'Add a project and press Enter',
      required: false,
      fullWidth: true
    },
    {
      name: 'bio',
      label: 'Bio',
      type: 'textarea',
      placeholder: 'Tell us about yourself...',
      required: false,
      fullWidth: true,
      rows: 3
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Create a password',
      required: true,
      validation: (value) => {
        if (value.length < 6) return 'Password must be at least 6 characters';
        return true;
      }
    },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Confirm your password',
      required: true,
      validation: (value, formData) => {
        if (value !== formData.password) return 'Passwords do not match';
        return true;
      }
    }
  ];

  const handleSubmit = async (formData) => {
    console.log('Team member data:', formData);
    // Here you would typically send the data to your API
    alert('Team member registered successfully!');
  };

  return (
    <ReusableSignupForm
      formConfig={teamMemberFormConfig}
      onSubmit={handleSubmit}
      title="Join Our Team"
      subtitle="Complete your team member profile"
      submitButtonText="Join Team"
      backButtonText="Back to Dashboard"
      backButtonLink="/dashboard"
      loginLink="/login"
    />
  );
};

export default TeamMemberSignupExample;