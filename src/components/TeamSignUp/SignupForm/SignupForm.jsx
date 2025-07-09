import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowLeft,
    Phone,
    Briefcase,
    Code,
    Calendar,
    MapPin,
    GitBranch,
    Award,
    Linkedin,
    Github,
    Globe
  } from 'lucide-react';
import StyledSpinner from '../../StyledSpinner/StyledSpinner';

const SignupForm = ({
  onSubmit,
  loading = false,
  error = null,
  loginLink = "/login",
  backLink = "/",
  formTitle = "Create Team Member Account",
  formSubtitle = "Join our project management platform",
  submitButtonText = "Create Account",
  showLoginLink = true,
  initialFormData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: '',
    department: '',
    skills: [],
    currentProjects: [],
    previousProjects: [],
    joinDate: '',
    location: '',
    github: '',
    linkedin: '',
    portfolio: '',
    bio: ''
  }
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [tempSkill, setTempSkill] = useState('');
  const [tempProject, setTempProject] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const addSkill = () => {
    if (tempSkill.trim() && !formData.skills.includes(tempSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, tempSkill.trim()]
      }));
      setTempSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addProject = () => {
    if (tempProject.trim() && !formData.currentProjects.includes(tempProject.trim())) {
      setFormData(prev => ({
        ...prev,
        currentProjects: [...prev.currentProjects, tempProject.trim()]
      }));
      setTempProject('');
    }
  };

  const removeProject = (projectToRemove) => {
    setFormData(prev => ({
      ...prev,
      currentProjects: prev.currentProjects.filter(project => project !== projectToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.department) newErrors.department = 'Department is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-600 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* Back Link */}
        <Link
          to={backLink}
          className="inline-flex items-center text-purple-200 hover:text-purple-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>

        {/* Form Container */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 border border-purple-400 border-opacity-20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-purple-700 mb-2">{formTitle}</h1>
            <p className="text-purple-700">{formSubtitle}</p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error.message || error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Basic Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-700 border-b border-purple-200 pb-2">
                Basic Information
              </h3>
              
              {/* Name Field */}
              <div>
                <label className="block text-purple-700 text-sm font-medium mb-1">
                  Full Name*
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-2 bg-white bg-opacity-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 placeholder-purple-400 ${
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
                <label className="block text-purple-700 text-sm font-medium mb-1">
                  Email Address*
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-2 bg-white bg-opacity-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 placeholder-purple-400 ${
                      errors.email ? 'border-red-400' : 'border-purple-400 border-opacity-30'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-purple-700 text-sm font-medium mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-10 border border-purple-400 border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 placeholder-purple-400"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-purple-700 text-sm font-medium mb-1">
                    Password*
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-10 py-2 bg-white bg-opacity-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 placeholder-purple-400 ${
                        errors.password ? 'border-red-400' : 'border-purple-400 border-opacity-30'
                      }`}
                      placeholder="Create password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-purple-700 text-sm font-medium mb-1">
                    Confirm Password*
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-10 py-2 bg-white bg-opacity-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 placeholder-purple-400 ${
                        errors.confirmPassword ? 'border-red-400' : 'border-purple-400 border-opacity-30'
                      }`}
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Professional Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-700 border-b border-purple-200 pb-2">
                Professional Information
              </h3>

              {/* Role Field */}
              <div>
                <label className="block text-purple-700 text-sm font-medium mb-1">
                  Role*
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-2 bg-white bg-opacity-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 placeholder-purple-400 ${
                      errors.role ? 'border-red-400' : 'border-purple-400 border-opacity-30'
                    }`}
                  >
                    <option value="">Select your role</option>
                    <option value="Frontend Developer">Frontend Developer</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                    <option value="Product Manager">Product Manager</option>
                    <option value="QA Engineer">QA Engineer</option>
                    <option value="DevOps Engineer">DevOps Engineer</option>
                    <option value="Team Lead">Team Lead</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {errors.role && (
                  <p className="mt-1 text-sm text-red-400">{errors.role}</p>
                )}
              </div>

              {/* Department Field */}
              <div>
                <label className="block text-purple-700 text-sm font-medium mb-1">
                  Department*
                </label>
                <div className="relative">
                  <GitBranch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-2 bg-white bg-opacity-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 placeholder-purple-400 ${
                      errors.department ? 'border-red-400' : 'border-purple-400 border-opacity-30'
                    }`}
                  >
                    <option value="">Select department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Product">Product</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="Operations">Operations</option>
                    <option value="Human Resources">Human Resources</option>
                  </select>
                </div>
                {errors.department && (
                  <p className="mt-1 text-sm text-red-400">{errors.department}</p>
                )}
              </div>

              {/* Skills Field */}
              <div>
                <label className="block text-purple-700 text-sm font-medium mb-1">
                  Skills
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                    <input
                      type="text"
                      value={tempSkill}
                      onChange={(e) => setTempSkill(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-10 border border-purple-400 border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 placeholder-purple-400"
                      placeholder="Add skills (e.g., React, Node.js)"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addSkill}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-2 text-purple-500 hover:text-purple-700"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Current Projects */}
              <div>
                <label className="block text-purple-700 text-sm font-medium mb-1">
                  Current Projects
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tempProject}
                    onChange={(e) => setTempProject(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addProject())}
                    className="flex-1 pl-4 pr-4 py-2 bg-white bg-opacity-10 border border-purple-400 border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 placeholder-purple-400"
                    placeholder="Add current projects"
                  />
                  <button
                    type="button"
                    onClick={addProject}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                {formData.currentProjects.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.currentProjects.map((project, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full"
                      >
                        {project}
                        <button
                          type="button"
                          onClick={() => removeProject(project)}
                          className="ml-2 text-purple-500 hover:text-purple-700"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Join Date */}
              <div>
                <label className="block text-purple-700 text-sm font-medium mb-1">
                  Join Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                  <input
                    type="date"
                    name="joinDate"
                    value={formData.joinDate}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-10 border border-purple-400 border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-purple-700 text-sm font-medium mb-1">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-10 border border-purple-400 border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 placeholder-purple-400"
                    placeholder="Enter your location"
                  />
                </div>
              </div>
            </div>

            {/* Social & Links Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-700 border-b border-purple-200 pb-2">
                Social & Links
              </h3>

              {/* LinkedIn */}
              <div>
                <label className="block text-purple-700 text-sm font-medium mb-1">
                  LinkedIn Profile
                </label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-10 border border-purple-400 border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 placeholder-purple-400"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>

              {/* GitHub */}
              <div>
                <label className="block text-purple-700 text-sm font-medium mb-1">
                  GitHub Profile
                </label>
                <div className="relative">
                  <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-10 border border-purple-400 border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 placeholder-purple-400"
                    placeholder="https://github.com/username"
                  />
                </div>
              </div>

              {/* Portfolio */}
              <div>
                <label className="block text-purple-700 text-sm font-medium mb-1">
                  Portfolio Website
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-10 border border-purple-400 border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 placeholder-purple-400"
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-purple-700 text-sm font-medium mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2 bg-white bg-opacity-10 border border-purple-400 border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 placeholder-purple-400"
                  placeholder="Tell us about yourself..."
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-purple-100 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-90 disabled:cursor-not-allowed mt-6"
            >
              {loading ? (
                <StyledSpinner
                  borderWidth='3px'
                  size='1.5rem'
                  text='Creating Account...'
                  fontSize='semi bold'
                />
              ) : (
                submitButtonText
              )}
            </button>
          </form>

          {/* Login Link */}
          {showLoginLink && (
            <div className="mt-8 text-center">
              <p className="text-purple-700">
                Already have an account?{' '}
                <Link
                  to={loginLink}
                  className="text-purple-500 font-semibold underline hover:text-purple-800 transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupForm;