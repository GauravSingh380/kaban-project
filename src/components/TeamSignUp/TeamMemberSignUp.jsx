import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User, ArrowLeft, UserCheck, Phone, MapPin, Calendar, Building, Code, Award, Plus, X } from 'lucide-react';

// Reusable Input Component
const FormInput = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  error, 
  placeholder, 
  icon: Icon, 
  showPassword, 
  togglePassword,
  required = false 
}) => (
  <div>
    <label className="block text-purple-700 text-sm font-medium mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
      )}
      <input
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full ${Icon ? 'pl-10' : 'pl-4'} ${type === 'password' ? 'pr-12' : 'pr-4'} py-3 bg-white bg-opacity-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 placeholder-purple-400 ${
          error ? 'border-red-400' : 'border-purple-400 border-opacity-30'
        }`}
        placeholder={placeholder}
        required={required}
      />
      {type === 'password' && togglePassword && (
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300 transition-colors"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
    {error && (
      <p className="mt-1 text-sm text-red-400">{error}</p>
    )}
  </div>
);

// Reusable Select Component
const FormSelect = ({ label, name, value, onChange, options, error, icon: Icon, required = false }) => (
  <div>
    <label className="block text-purple-700 text-sm font-medium mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-white bg-opacity-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 ${
          error ? 'border-red-400' : 'border-purple-400 border-opacity-30'
        }`}
        required={required}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
    {error && (
      <p className="mt-1 text-sm text-red-400">{error}</p>
    )}
  </div>
);

// Reusable Textarea Component
const FormTextarea = ({ label, name, value, onChange, error, placeholder, rows = 4, required = false }) => (
  <div>
    <label className="block text-purple-700 text-sm font-medium mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      className={`w-full px-4 py-3 bg-white bg-opacity-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 placeholder-purple-400 resize-none ${
        error ? 'border-red-400' : 'border-purple-400 border-opacity-30'
      }`}
      placeholder={placeholder}
      required={required}
    />
    {error && (
      <p className="mt-1 text-sm text-red-400">{error}</p>
    )}
  </div>
);

// Reusable Tags Input Component
const TagsInput = ({ label, tags, onChange, error, placeholder, required = false }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        onChange([...tags, inputValue.trim()]);
      }
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div>
      <label className="block text-purple-700 text-sm font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className={`min-h-[48px] px-4 py-2 bg-white bg-opacity-10 border rounded-lg focus-within:ring-2 focus-within:ring-purple-500 ${
        error ? 'border-red-400' : 'border-purple-400 border-opacity-30'
      }`}>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 bg-purple-500 text-white text-xs rounded-full"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1 text-purple-200 hover:text-white"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleInputKeyDown}
          className="w-full bg-transparent outline-none text-gray-700 placeholder-purple-400"
          placeholder={placeholder}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
      <p className="mt-1 text-xs text-purple-600">Press Enter to add tags</p>
    </div>
  );
};

// Main Team Member Signup Component
const TeamMemberSignup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    
    // Professional Information
    role: '',
    department: '',
    experienceYears: '',
    currentCompany: '',
    joinDate: '',
    
    // Technical Information
    skills: [],
    techStack: [],
    programmingLanguages: [],
    
    // Additional Information
    bio: '',
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
    
    // Project Experience
    previousProjects: '',
    certifications: [],
    
    // Preferences
    workload: '',
    availability: '',
    preferredWorkType: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Options for select fields
  const roleOptions = [
    { value: 'Frontend Developer', label: 'Frontend Developer' },
    { value: 'Backend Developer', label: 'Backend Developer' },
    { value: 'Full Stack Developer', label: 'Full Stack Developer' },
    { value: 'UI/UX Designer', label: 'UI/UX Designer' },
    { value: 'DevOps Engineer', label: 'DevOps Engineer' },
    { value: 'Project Manager', label: 'Project Manager' },
    { value: 'QA Engineer', label: 'QA Engineer' },
    { value: 'Data Analyst', label: 'Data Analyst' },
    { value: 'Mobile Developer', label: 'Mobile Developer' },
    { value: 'Team Lead', label: 'Team Lead' }
  ];

  const departmentOptions = [
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Design', label: 'Design' },
    { value: 'Product', label: 'Product' },
    { value: 'QA', label: 'QA' },
    { value: 'DevOps', label: 'DevOps' },
    { value: 'Data Science', label: 'Data Science' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Sales', label: 'Sales' }
  ];

  const experienceOptions = [
    { value: '0-1', label: '0-1 years' },
    { value: '1-3', label: '1-3 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '5-7', label: '5-7 years' },
    { value: '7-10', label: '7-10 years' },
    { value: '10+', label: '10+ years' }
  ];

  const workloadOptions = [
    { value: '25', label: '25% - Part time' },
    { value: '50', label: '50% - Half time' },
    { value: '75', label: '75% - Most time' },
    { value: '100', label: '100% - Full time' }
  ];

  const availabilityOptions = [
    { value: 'immediate', label: 'Immediate' },
    { value: 'within_week', label: 'Within a week' },
    { value: 'within_month', label: 'Within a month' },
    { value: 'flexible', label: 'Flexible' }
  ];

  const workTypeOptions = [
    { value: 'remote', label: 'Remote' },
    { value: 'onsite', label: 'On-site' },
    { value: 'hybrid', label: 'Hybrid' }
  ];

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

  const handleTagsChange = (name, newTags) => {
    setFormData(prev => ({
      ...prev,
      [name]: newTags
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      // Basic Information Validation
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
      
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
      
      if (!formData.location.trim()) {
        newErrors.location = 'Location is required';
      }
    }
    
    if (step === 2) {
      // Professional Information Validation
      if (!formData.role) {
        newErrors.role = 'Role is required';
      }
      
      if (!formData.department) {
        newErrors.department = 'Department is required';
      }
      
      if (!formData.experienceYears) {
        newErrors.experienceYears = 'Experience is required';
      }
      
      if (!formData.joinDate) {
        newErrors.joinDate = 'Join date is required';
      }
    }
    
    if (step === 3) {
      // Technical Information Validation
      if (formData.skills.length === 0) {
        newErrors.skills = 'At least one skill is required';
      }
      
      if (formData.techStack.length === 0) {
        newErrors.techStack = 'At least one technology is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', formData);
      alert('Registration completed successfully!');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        location: '',
        role: '',
        department: '',
        experienceYears: '',
        currentCompany: '',
        joinDate: '',
        skills: [],
        techStack: [],
        programmingLanguages: [],
        bio: '',
        linkedinUrl: '',
        githubUrl: '',
        portfolioUrl: '',
        previousProjects: '',
        certifications: [],
        workload: '',
        availability: '',
        preferredWorkType: ''
      });
      setCurrentStep(1);
      
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-purple-700 mb-4">Basic Information</h2>
            
            <FormInput
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              error={errors.name}
              placeholder="Enter your full name"
              icon={User}
              required
            />
            
            <FormInput
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              placeholder="Enter your email address"
              icon={Mail}
              required
            />
            
            <FormInput
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              placeholder="Create a strong password"
              icon={Lock}
              showPassword={showPassword}
              togglePassword={() => setShowPassword(!showPassword)}
              required
            />
            
            <FormInput
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={errors.confirmPassword}
              placeholder="Confirm your password"
              icon={Lock}
              showPassword={showConfirmPassword}
              togglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
              required
            />
            
            <FormInput
              label="Phone Number"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              error={errors.phone}
              placeholder="Enter your phone number"
              icon={Phone}
              required
            />
            
            <FormInput
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              error={errors.location}
              placeholder="Enter your city, country"
              icon={MapPin}
              required
            />
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-purple-700 mb-4">Professional Information</h2>
            
            <FormSelect
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              options={roleOptions}
              error={errors.role}
              icon={UserCheck}
              required
            />
            
            <FormSelect
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              options={departmentOptions}
              error={errors.department}
              icon={Building}
              required
            />
            
            <FormSelect
              label="Experience Level"
              name="experienceYears"
              value={formData.experienceYears}
              onChange={handleInputChange}
              options={experienceOptions}
              error={errors.experienceYears}
              icon={Award}
              required
            />
            
            <FormInput
              label="Current Company"
              name="currentCompany"
              value={formData.currentCompany}
              onChange={handleInputChange}
              error={errors.currentCompany}
              placeholder="Enter your current company"
              icon={Building}
            />
            
            <FormInput
              label="Available Join Date"
              type="date"
              name="joinDate"
              value={formData.joinDate}
              onChange={handleInputChange}
              error={errors.joinDate}
              icon={Calendar}
              required
            />
            
            <FormTextarea
              label="Bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              error={errors.bio}
              placeholder="Tell us about yourself, your experience, and what you're passionate about..."
              rows={4}
            />
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-purple-700 mb-4">Technical Information</h2>
            
            <TagsInput
              label="Skills"
              tags={formData.skills}
              onChange={(tags) => handleTagsChange('skills', tags)}
              error={errors.skills}
              placeholder="Add your skills (e.g., React, Node.js, Python...)"
              required
            />
            
            <TagsInput
              label="Tech Stack"
              tags={formData.techStack}
              onChange={(tags) => handleTagsChange('techStack', tags)}
              error={errors.techStack}
              placeholder="Add technologies you work with (e.g., MongoDB, AWS, Docker...)"
              required
            />
            
            <TagsInput
              label="Programming Languages"
              tags={formData.programmingLanguages}
              onChange={(tags) => handleTagsChange('programmingLanguages', tags)}
              error={errors.programmingLanguages}
              placeholder="Add programming languages (e.g., JavaScript, Python, Java...)"
            />
            
            <TagsInput
              label="Certifications"
              tags={formData.certifications}
              onChange={(tags) => handleTagsChange('certifications', tags)}
              error={errors.certifications}
              placeholder="Add your certifications (e.g., AWS Certified, Google Cloud...)"
            />
            
            <FormTextarea
              label="Previous Projects"
              name="previousProjects"
              value={formData.previousProjects}
              onChange={handleInputChange}
              error={errors.previousProjects}
              placeholder="Describe your previous projects and achievements..."
              rows={4}
            />
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-purple-700 mb-4">Additional Information & Preferences</h2>
            
            <FormInput
              label="LinkedIn URL"
              name="linkedinUrl"
              value={formData.linkedinUrl}
              onChange={handleInputChange}
              error={errors.linkedinUrl}
              placeholder="https://linkedin.com/in/yourprofile"
            />
            
            <FormInput
              label="GitHub URL"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleInputChange}
              error={errors.githubUrl}
              placeholder="https://github.com/yourusername"
            />
            
            <FormInput
              label="Portfolio URL"
              name="portfolioUrl"
              value={formData.portfolioUrl}
              onChange={handleInputChange}
              error={errors.portfolioUrl}
              placeholder="https://yourportfolio.com"
            />
            
            <FormSelect
              label="Preferred Workload"
              name="workload"
              value={formData.workload}
              onChange={handleInputChange}
              options={workloadOptions}
              error={errors.workload}
            />
            
            <FormSelect
              label="Availability"
              name="availability"
              value={formData.availability}
              onChange={handleInputChange}
              options={availabilityOptions}
              error={errors.availability}
            />
            
            <FormSelect
              label="Preferred Work Type"
              name="preferredWorkType"
              value={formData.preferredWorkType}
              onChange={handleInputChange}
              options={workTypeOptions}
              error={errors.preferredWorkType}
            />
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-600 flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-purple-200 text-sm">Step {currentStep} of 4</span>
            <span className="text-purple-200 text-sm">{Math.round((currentStep / 4) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-purple-800 rounded-full h-2">
            <div 
              className="bg-purple-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 border border-purple-400 border-opacity-20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-purple-700 mb-2">Join Our Team</h1>
            <p className="text-purple-700">Create your professional profile</p>
          </div>

          <div>
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className="px-6 py-3 bg-purple-700 text-purple-200 rounded-lg font-semibold hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-purple-600 text-purple-100 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-6 py-3 bg-purple-600 text-purple-100 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating Profile...' : 'Complete Registration'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberSignup;