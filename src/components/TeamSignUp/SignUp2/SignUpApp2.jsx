import React, { useState } from 'react';
import { 
  User, Mail, Lock, Eye, EyeOff, Phone, MapPin, Calendar, 
  ArrowLeft, Briefcase, Code, Users, Star, Plus, X, Building
} from 'lucide-react';

// Reusable Input Component
const FormInput = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder, 
  icon: Icon, 
  error, 
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword,
  required = false
}) => (
  <div>
    <label className="block text-purple-700 text-sm font-medium mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />}
      <input
        type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full ${Icon ? 'pl-10' : 'pl-4'} ${showPasswordToggle ? 'pr-12' : 'pr-4'} py-3 bg-white bg-opacity-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 placeholder-purple-400 ${
          error ? 'border-red-400' : 'border-purple-400 border-opacity-30'
        }`}
        placeholder={placeholder}
      />
      {showPasswordToggle && (
        <button
          type="button"
          onClick={onTogglePassword}
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
const FormSelect = ({ label, name, value, onChange, options, error, required = false }) => (
  <div>
    <label className="block text-purple-700 text-sm font-medium mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 bg-white bg-opacity-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 ${
        error ? 'border-red-400' : 'border-purple-400 border-opacity-30'
      }`}
    >
      <option value="">Select {label}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && (
      <p className="mt-1 text-sm text-red-400">{error}</p>
    )}
  </div>
);

// Reusable Textarea Component
const FormTextarea = ({ label, name, value, onChange, placeholder, error, rows = 3, required = false }) => (
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
    />
    {error && (
      <p className="mt-1 text-sm text-red-400">{error}</p>
    )}
  </div>
);

// Reusable Tags Input Component
const TagsInput = ({ label, tags, onAddTag, onRemoveTag, placeholder, error, required = false }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      onAddTag(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div>
      <label className="block text-purple-700 text-sm font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className={`flex-1 px-4 py-3 bg-white bg-opacity-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 placeholder-purple-400 ${
              error ? 'border-red-400' : 'border-purple-400 border-opacity-30'
            }`}
            placeholder={placeholder}
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => onRemoveTag(index)}
                  className="ml-2 text-purple-500 hover:text-purple-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};

// Loading Spinner Component
const StyledSpinner = ({ borderWidth = '3px', size = '1.5rem', text = '', fontSize = 'font-semibold' }) => (
  <div className="flex items-center justify-center gap-2">
    <div 
      className="animate-spin rounded-full border-purple-200"
      style={{ 
        width: size, 
        height: size, 
        borderWidth: borderWidth,
        borderTopColor: 'white'
      }}
    />
    {text && <span className={fontSize}>{text}</span>}
  </div>
);

// Main Team Member Signup Form
const SignUpApp2 = () => {
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    department: '',
    role: '',
    
    // Professional Information
    experience: '',
    education: '',
    bio: '',
    joinDate: '',
    workType: '',
    availability: '',
    
    // Skills and Projects
    skills: [],
    currentProjects: [],
    previousProjects: [],
    
    // Additional Information
    linkedin: '',
    github: '',
    portfolio: '',
    emergencyContact: '',
    emergencyPhone: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.role) newErrors.role = 'Role is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    // Skills validation
    if (formData.skills.length === 0) {
      newErrors.skills = 'Please add at least one skill';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleAddSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, skill]
    }));
  };

  const handleRemoveSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleAddCurrentProject = (project) => {
    setFormData(prev => ({
      ...prev,
      currentProjects: [...prev.currentProjects, project]
    }));
  };

  const handleRemoveCurrentProject = (index) => {
    setFormData(prev => ({
      ...prev,
      currentProjects: prev.currentProjects.filter((_, i) => i !== index)
    }));
  };

  const handleAddPreviousProject = (project) => {
    setFormData(prev => ({
      ...prev,
      previousProjects: [...prev.previousProjects, project]
    }));
  };

  const handleRemovePreviousProject = (index) => {
    setFormData(prev => ({
      ...prev,
      previousProjects: prev.previousProjects.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your backend
      console.log('Team member data:', formData);
      
      // Reset form or redirect
      alert('Team member registration successful!');
      
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Options for select fields
  const departmentOptions = [
    { value: 'engineering', label: 'Engineering' },
    { value: 'design', label: 'Design' },
    { value: 'product', label: 'Product' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'operations', label: 'Operations' }
  ];

  const roleOptions = [
    { value: 'developer', label: 'Developer' },
    { value: 'designer', label: 'Designer' },
    { value: 'manager', label: 'Manager' },
    { value: 'analyst', label: 'Analyst' },
    { value: 'intern', label: 'Intern' },
    { value: 'consultant', label: 'Consultant' }
  ];

  const workTypeOptions = [
    { value: 'full-time', label: 'Full Time' },
    { value: 'part-time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'freelance', label: 'Freelance' }
  ];

  const availabilityOptions = [
    { value: 'immediate', label: 'Immediate' },
    { value: '1-week', label: '1 Week' },
    { value: '2-weeks', label: '2 Weeks' },
    { value: '1-month', label: '1 Month' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-600 flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full">
        {/* Back Button */}
        <button className="inline-flex items-center text-purple-200 hover:text-purple-400 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Teams
        </button>

        {/* Registration Form */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 border border-purple-400 border-opacity-20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-purple-100 mb-2">Join Our Team</h1>
            <p className="text-purple-200">Create your team member profile</p>
          </div>

          <div className="space-y-8">
            {/* Basic Information Section */}
            <div className="bg-white bg-opacity-5 rounded-lg p-6 border border-purple-400 border-opacity-10">
              <h2 className="text-xl font-semibold text-purple-100 mb-6 flex items-center gap-2">
                <User className="w-5 h-5" />
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  icon={User}
                  error={errors.name}
                  required
                />
                
                <FormInput
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  icon={Mail}
                  error={errors.email}
                  required
                />
                
                <FormInput
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a password"
                  icon={Lock}
                  error={errors.password}
                  showPasswordToggle
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                  required
                />
                
                <FormInput
                  label="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  icon={Lock}
                  error={errors.confirmPassword}
                  showPasswordToggle
                  showPassword={showConfirmPassword}
                  onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                  required
                />
                
                <FormInput
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  icon={Phone}
                  error={errors.phone}
                  required
                />
                
                <FormInput
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, State, Country"
                  icon={MapPin}
                  error={errors.location}
                  required
                />
              </div>
            </div>

            {/* Professional Information Section */}
            <div className="bg-white bg-opacity-5 rounded-lg p-6 border border-purple-400 border-opacity-10">
              <h2 className="text-xl font-semibold text-purple-100 mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Professional Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormSelect
                  label="Department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  options={departmentOptions}
                  error={errors.department}
                  required
                />
                
                <FormSelect
                  label="Role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  options={roleOptions}
                  error={errors.role}
                  required
                />
                
                <FormInput
                  label="Years of Experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="e.g., 3 years"
                  icon={Calendar}
                  error={errors.experience}
                />
                
                <FormInput
                  label="Education"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  placeholder="e.g., Bachelor's in Computer Science"
                  error={errors.education}
                />
                
                <FormInput
                  label="Join Date"
                  type="date"
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={handleInputChange}
                  error={errors.joinDate}
                />
                
                <FormSelect
                  label="Work Type"
                  name="workType"
                  value={formData.workType}
                  onChange={handleInputChange}
                  options={workTypeOptions}
                  error={errors.workType}
                />
                
                <div className="md:col-span-2">
                  <FormSelect
                    label="Availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    options={availabilityOptions}
                    error={errors.availability}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <FormTextarea
                    label="Bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself, your experience, and what you bring to the team..."
                    error={errors.bio}
                    rows={4}
                  />
                </div>
              </div>
            </div>

            {/* Skills and Projects Section */}
            <div className="bg-white bg-opacity-5 rounded-lg p-6 border border-purple-400 border-opacity-10">
              <h2 className="text-xl font-semibold text-purple-100 mb-6 flex items-center gap-2">
                <Code className="w-5 h-5" />
                Skills & Projects
              </h2>
              
              <div className="space-y-6">
                <TagsInput
                  label="Skills"
                  tags={formData.skills}
                  onAddTag={handleAddSkill}
                  onRemoveTag={handleRemoveSkill}
                  placeholder="e.g., React, Node.js, Python..."
                  error={errors.skills}
                  required
                />
                
                <TagsInput
                  label="Current Projects"
                  tags={formData.currentProjects}
                  onAddTag={handleAddCurrentProject}
                  onRemoveTag={handleRemoveCurrentProject}
                  placeholder="e.g., E-commerce Platform, Mobile App..."
                  error={errors.currentProjects}
                />
                
                <TagsInput
                  label="Previous Projects"
                  tags={formData.previousProjects}
                  onAddTag={handleAddPreviousProject}
                  onRemoveTag={handleRemovePreviousProject}
                  placeholder="e.g., CRM System, Analytics Dashboard..."
                  error={errors.previousProjects}
                />
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="bg-white bg-opacity-5 rounded-lg p-6 border border-purple-400 border-opacity-10">
              <h2 className="text-xl font-semibold text-purple-100 mb-6 flex items-center gap-2">
                <Building className="w-5 h-5" />
                Additional Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="LinkedIn Profile"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/in/yourprofile"
                  error={errors.linkedin}
                />
                
                <FormInput
                  label="GitHub Profile"
                  name="github"
                  value={formData.github}
                  onChange={handleInputChange}
                  placeholder="https://github.com/yourusername"
                  error={errors.github}
                />
                
                <FormInput
                  label="Portfolio Website"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleInputChange}
                  placeholder="https://yourportfolio.com"
                  error={errors.portfolio}
                />
                
                <FormInput
                  label="Emergency Contact Name"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  placeholder="Emergency contact person"
                  error={errors.emergencyContact}
                />
                
                <FormInput
                  label="Emergency Contact Phone"
                  type="tel"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleInputChange}
                  placeholder="Emergency contact phone"
                  icon={Phone}
                  error={errors.emergencyPhone}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full max-w-md bg-purple-600 text-purple-100 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <StyledSpinner
                    borderWidth="3px"
                    size="1.5rem"
                    text="Creating Profile..."
                    fontSize="font-semibold"
                  />
                ) : (
                  'Create Team Member Profile'
                )}
              </button>
            </div>

            {/* Error Message */}
            {errors.submit && (
              <p className="text-sm text-red-400 text-center">{errors.submit}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpApp2;