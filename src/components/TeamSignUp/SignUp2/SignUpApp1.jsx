import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar, 
  Code, 
  Building, 
  ArrowLeft,
  UserPlus,
  Star,
  Upload
} from 'lucide-react';

// Reusable Spinner Component
const StyledSpinner = ({ borderWidth = '3px', size = '1.5rem', text = '', fontSize = 'font-semibold' }) => (
  <div className="flex items-center justify-center gap-2">
    <div 
      className="animate-spin rounded-full border-t-transparent border-white"
      style={{ 
        width: size, 
        height: size, 
        borderWidth: borderWidth 
      }}
    />
    {text && <span className={fontSize}>{text}</span>}
  </div>
);

// Reusable Input Field Component
const InputField = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  icon: Icon, 
  error, 
  required = false,
  showPassword,
  togglePassword,
  isTextarea = false,
  rows = 3,
  options = [],
  isSelect = false,
  multiple = false
}) => (
  <div>
    <label className="block text-purple-700 text-sm font-medium mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-3 text-purple-400 w-5 h-5" />
      )}
      
      {isSelect ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          multiple={multiple}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-white bg-opacity-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 ${
            error ? 'border-red-400' : 'border-purple-400 border-opacity-30'
          }`}
        >
          {!multiple && <option value="">Select {label}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : isTextarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-white bg-opacity-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 placeholder-purple-400 resize-none ${
            error ? 'border-red-400' : 'border-purple-400 border-opacity-30'
          }`}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} ${togglePassword ? 'pr-12' : 'pr-4'} py-3 bg-white bg-opacity-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 placeholder-purple-400 ${
            error ? 'border-red-400' : 'border-purple-400 border-opacity-30'
          }`}
          placeholder={placeholder}
        />
      )}
      
      {togglePassword && (
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

// Reusable Multi-Select Component for Skills
const MultiSelectField = ({ label, name, value, onChange, options, error, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option) => {
    const currentValues = value || [];
    if (currentValues.includes(option)) {
      onChange({
        target: {
          name,
          value: currentValues.filter(item => item !== option)
        }
      });
    } else {
      onChange({
        target: {
          name,
          value: [...currentValues, option]
        }
      });
    }
  };

  return (
    <div>
      <label className="block text-purple-700 text-sm font-medium mb-2">
        {label}
      </label>
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 cursor-pointer ${
            error ? 'border-red-400' : 'border-purple-400 border-opacity-30'
          }`}
        >
          <Code className="absolute left-3 top-3 text-purple-400 w-5 h-5" />
          {value && value.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {value.slice(0, 3).map((skill, index) => (
                <span key={index} className="px-2 py-1 bg-purple-200 text-purple-800 text-xs rounded-full">
                  {skill}
                </span>
              ))}
              {value.length > 3 && (
                <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                  +{value.length - 3} more
                </span>
              )}
            </div>
          ) : (
            <span className="text-purple-400">{placeholder}</span>
          )}
        </div>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-purple-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            <div className="p-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search skills..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="max-h-40 overflow-y-auto">
              {filteredOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`px-4 py-2 cursor-pointer hover:bg-purple-50 ${
                    value && value.includes(option) ? 'bg-purple-100 text-purple-800' : 'text-gray-700'
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};

// Main Reusable Signup Form Component
const ReusableSignupForm = ({
  formTitle = "Create Team Member Account",
  formSubtitle = "Join our project management platform",
  onSubmit,
  loading = false,
  backLink = "/",
  loginLink = "/login",
  isTeamMemberSignup = true,
  customFields = []
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    department: '',
    role: '',
    experience: '',
    skills: [],
    bio: '',
    linkedin: '',
    github: '',
    portfolio: '',
    previousProjects: '',
    expectedSalary: '',
    availability: '',
    emergencyContact: '',
    emergencyPhone: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Sample data for dropdowns
  const departments = [
    { value: 'engineering', label: 'Engineering' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'operations', label: 'Operations' }
  ];

  const roles = [
    { value: 'frontend_developer', label: 'Frontend Developer' },
    { value: 'backend_developer', label: 'Backend Developer' },
    { value: 'fullstack_developer', label: 'Fullstack Developer' },
    { value: 'ui_designer', label: 'UI Designer' },
    { value: 'ux_designer', label: 'UX Designer' },
    { value: 'product_manager', label: 'Product Manager' },
    { value: 'project_manager', label: 'Project Manager' },
    { value: 'team_lead', label: 'Team Lead' },
    { value: 'senior_developer', label: 'Senior Developer' },
    { value: 'junior_developer', label: 'Junior Developer' }
  ];

  const experienceLevels = [
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (2-5 years)' },
    { value: 'senior', label: 'Senior Level (5-8 years)' },
    { value: 'lead', label: 'Lead Level (8+ years)' }
  ];

  const availabilityOptions = [
    { value: 'full_time', label: 'Full Time' },
    { value: 'part_time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'freelance', label: 'Freelance' }
  ];

  const skillsOptions = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'TypeScript', 'HTML/CSS',
    'Vue.js', 'Angular', 'PHP', 'C#', 'Ruby', 'Go', 'Swift', 'Kotlin',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'AWS', 'Azure', 'Docker',
    'Kubernetes', 'Git', 'Figma', 'Sketch', 'Adobe XD', 'Photoshop',
    'Illustrator', 'Project Management', 'Agile', 'Scrum', 'JIRA'
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (isTeamMemberSignup) {
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.location.trim()) newErrors.location = 'Location is required';
      if (!formData.department) newErrors.department = 'Department is required';
      if (!formData.role) newErrors.role = 'Role is required';
      if (!formData.experience) newErrors.experience = 'Experience level is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const basicFields = [
    {
      label: 'Full Name',
      name: 'name',
      type: 'text',
      placeholder: 'Enter your full name',
      icon: User,
      required: true
    },
    {
      label: 'Email Address',
      name: 'email',
      type: 'email',
      placeholder: 'Enter your email',
      icon: Mail,
      required: true
    },
    {
      label: 'Password',
      name: 'password',
      type: showPassword ? 'text' : 'password',
      placeholder: 'Create a password',
      icon: Lock,
      required: true,
      showPassword,
      togglePassword: () => setShowPassword(!showPassword)
    },
    {
      label: 'Confirm Password',
      name: 'confirmPassword',
      type: showConfirmPassword ? 'text' : 'password',
      placeholder: 'Confirm your password',
      icon: Lock,
      required: true,
      showPassword: showConfirmPassword,
      togglePassword: () => setShowConfirmPassword(!showConfirmPassword)
    }
  ];

  const teamMemberFields = [
    {
      label: 'Phone Number',
      name: 'phone',
      type: 'tel',
      placeholder: 'Enter your phone number',
      icon: Phone,
      required: true
    },
    {
      label: 'Location',
      name: 'location',
      type: 'text',
      placeholder: 'Enter your location',
      icon: MapPin,
      required: true
    },
    {
      label: 'Department',
      name: 'department',
      isSelect: true,
      options: departments,
      icon: Building,
      required: true
    },
    {
      label: 'Role',
      name: 'role',
      isSelect: true,
      options: roles,
      icon: Briefcase,
      required: true
    },
    {
      label: 'Experience Level',
      name: 'experience',
      isSelect: true,
      options: experienceLevels,
      icon: Star,
      required: true
    },
    {
      label: 'Availability',
      name: 'availability',
      isSelect: true,
      options: availabilityOptions,
      icon: Calendar
    },
    {
      label: 'Bio',
      name: 'bio',
      isTextarea: true,
      placeholder: 'Tell us about yourself...',
      icon: User,
      rows: 3
    },
    {
      label: 'LinkedIn Profile',
      name: 'linkedin',
      type: 'url',
      placeholder: 'https://linkedin.com/in/yourprofile',
      icon: User
    },
    {
      label: 'GitHub Profile',
      name: 'github',
      type: 'url',
      placeholder: 'https://github.com/yourusername',
      icon: Code
    },
    {
      label: 'Portfolio URL',
      name: 'portfolio',
      type: 'url',
      placeholder: 'https://yourportfolio.com',
      icon: User
    },
    {
      label: 'Previous Projects',
      name: 'previousProjects',
      isTextarea: true,
      placeholder: 'Describe your previous projects...',
      icon: Briefcase,
      rows: 3
    },
    {
      label: 'Expected Salary Range',
      name: 'expectedSalary',
      type: 'text',
      placeholder: 'e.g., $50,000 - $70,000',
      icon: Building
    },
    {
      label: 'Emergency Contact Name',
      name: 'emergencyContact',
      type: 'text',
      placeholder: 'Emergency contact name',
      icon: User
    },
    {
      label: 'Emergency Contact Phone',
      name: 'emergencyPhone',
      type: 'tel',
      placeholder: 'Emergency contact phone',
      icon: Phone
    }
  ];

  const allFields = [...basicFields, ...(isTeamMemberSignup ? teamMemberFields : []), ...customFields];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-600 flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full">
        {/* Back Link */}
        <a
          href={backLink}
          className="inline-flex items-center text-purple-200 hover:text-purple-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </a>

        {/* Form Container */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 border border-purple-400 border-opacity-20">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-purple-700 mb-2">{formTitle}</h1>
            <p className="text-purple-700">{formSubtitle}</p>
          </div>

          <div className="space-y-6">
            {/* Dynamic Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allFields.map((field) => (
                <div key={field.name} className={field.isTextarea ? 'md:col-span-2' : ''}>
                  <InputField
                    {...field}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    error={errors[field.name]}
                  />
                </div>
              ))}
            </div>

            {/* Skills Multi-Select (Team Member Only) */}
            {isTeamMemberSignup && (
              <div className="md:col-span-2">
                <MultiSelectField
                  label="Skills & Technologies"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  options={skillsOptions}
                  error={errors.skills}
                  placeholder="Select your skills..."
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-purple-100 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-90 disabled:cursor-not-allowed"
            >
              {loading ? (
                <StyledSpinner
                  borderWidth='3px'
                  size='1.5rem'
                  text='Creating Account...'
                  fontSize='font-semibold'
                />
              ) : (
                'Create Account'
              )}
            </button>
          </div>

          {/* Login Link */}
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
        </div>
      </div>
    </div>
  );
};

// Example usage of the reusable component
const SignUpApp1 = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setLoading(false);
      alert('Account created successfully!');
    }, 2000);
  };

  return (
    <ReusableSignupForm
      formTitle="Join Our Team"
      formSubtitle="Create your team member profile"
      onSubmit={handleSubmit}
      loading={loading}
      backLink="/"
      loginLink="/login"
      isTeamMemberSignup={true}
    />
  );
};

export default SignUpApp1;