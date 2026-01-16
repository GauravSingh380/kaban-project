export const addProjectJsonConfig  = [
    // Header Section - Full width for key project info
    {
      name: 'name',
      type: 'text',
      label: 'Project Name',
      placeholder: 'Enter project name',
      required: true,
      containerClass: 'col-span-full' // This controls grid position, not internal layout
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      placeholder: 'Enter project description',
      rows: 3,
      containerClass: 'col-span-full' // Full width for better readability
    },
  
    // Status and Priority Section - Two columns
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      placeholder: 'Select status',
      required: true,
      options: [
        { value: 'active', label: 'Active' },
        { value: 'testing', label: 'Testing' },
        { value: 'planning', label: 'Planning' },
        { value: 'completed', label: 'Completed' },
        { value: 'on_hold', label: 'On Hold' }
      ],
      containerClass: 'col-span-2' // Half width on desktop
    },
    {
      name: 'priority',
      type: 'select',
      label: 'Priority',
      placeholder: 'Select priority',
      required: true,
      options: [
        { value: 'critical', label: 'Critical' },
        { value: 'high', label: 'High' },
        { value: 'medium', label: 'Medium' },
        { value: 'low', label: 'Low' }
      ],
      containerClass: 'col-span-2' // Half width on desktop
    },
  
    // Progress Section - Full width for visual impact
    {
      name: 'progress',
      type: 'range',
      label: 'Progress (%)',
      min: 0,
      max: 100,
      step: 5,
      containerClass: 'col-span-full' // Full width for better slider UX
    },
  
    // Date Section - Two columns
    {
      name: 'startDate',
      type: 'date',
      label: 'Start Date',
      required: true,
      containerClass: 'col-span-2' // Half width
    },
    {
      name: 'dueDate',
      type: 'date',
      label: 'Due Date',
      required: true,
      containerClass: 'col-span-2' // Half width
    },
  
    // Budget Section - Two columns
    {
      name: 'budget',
      type: 'number',
      label: 'Budget ($)',
      placeholder: '',
      min: 0,
      icon: 'DollarSign',
      containerClass: 'col-span-2' // Half width
    },
    {
      name: 'spent',
      type: 'number',
      label: 'Amount Spent ($)',
      placeholder: '',
      min: 0,
      icon: 'DollarSign',
      containerClass: 'col-span-2' // Half width
    },
  
    // Client Section - Full width
    {
      name: 'client',
      type: 'text',
      label: 'Client',
      placeholder: 'Enter client name',
      icon: 'Users',
      containerClass: 'col-span-2' // Full width for better UX
    },
  
    // Tags Section - Full width
    {
      name: 'tags',
      type: 'tags',
      label: 'Tags',
      placeholder: 'Add project tags',
      containerClass: 'col-span-2' // Full width for tag management
    },
  
    // Team Section - Full width
    // {
    //   name: 'team',
    //   type: 'team',
    //   label: 'Team Members',
    //   containerClass: 'col-span-full' // Full width for team member cards
    // },
  
    // Checkbox Section - Full width for better alignment
    {
      name: "team",
      type: "team-member-search",
      label: "Team Members",
      roles: [
        { value: "Project Manager", label: "Project Manager" },
        { value: "Frontend Developer", label: "Frontend Developer" },
        { value: "Backend Developer", label: "Backend Developer" },
        { value: "UI/UX Designer", label: "UI/UX Designer" },
        { value: "QA Engineer", label: "QA Engineer" },
        { value: "DevOps Engineer", label: "DevOps Engineer" },
        { value: "Business Analyst", label: "Business Analyst" },
      ],
      containerClass: 'col-span-full' // Full width for consistent alignment
    },
    {
      name: 'starred',
      type: 'checkbox',
      label: 'Mark as starred project',
      containerClass: 'col-span-full' // Full width for consistent alignment
    },
  ];

  const roles = [
    // Leadership & Management (Highest Level)
    { value: "Tech Lead", label: "Tech Lead" },
    
    // Project & Product Management
    { value: "Project Manager", label: "Project Manager" },
    { value: "Product Manager", label: "Product Manager" },
    
    // Senior Level Development
    { value: "Senior Software Developer", label: "Senior Software Developer" },
    
    // Mid Level Development
    { value: "Software Developer", label: "Software Developer" },
    { value: "Full Stack Developer", label: "Full Stack Developer" },
    { value: "Frontend Developer", label: "Frontend Developer" },
    { value: "Backend Developer", label: "Backend Developer" },
    { value: "DevOps Engineer", label: "DevOps Engineer" },
    { value: "Cloud Engineer", label: "Cloud Engineer" },
    
    // Quality Assurance
    { value: "QA Engineer", label: "QA Engineer" },
    { value: "QA Analyst", label: "QA Analyst" },
    
    // Design & Analysis
    { value: "UI/UX Designer", label: "UI/UX Designer" },
    { value: "Business Analyst", label: "Business Analyst" },
    { value: "Data Analyst", label: "Data Analyst" },
    
    // Support
    { value: "Technical Support", label: "Technical Support" },
    
    // Entry Level (Lowest Level)
    { value: "Junior Software Developer", label: "Junior Software Developer" },
    { value: "Trainee", label: "Trainee" },
    { value: "Intern", label: "Intern" },
  ];
  
  export const rolesV3 = [
    // Leadership & Management
    { value: "Engineering Manager", label: "Engineering Manager" },
    { value: "Team Lead", label: "Team Lead" },
    { value: "Tech Lead", label: "Tech Lead" },
  
    // Project & Product Management
    { value: "Project Manager", label: "Project Manager" },
    { value: "Product Manager", label: "Product Manager" },
    { value: "Scrum Master", label: "Scrum Master" },
  
    // Software Development
    { value: "Senior Software Developer", label: "Senior Software Developer" },
    { value: "Software Developer", label: "Software Developer" },
    { value: "Junior Software Developer", label: "Junior Software Developer" },
    { value: "Full Stack Developer", label: "Full Stack Developer" },
    { value: "Frontend Developer", label: "Frontend Developer" },
    { value: "Backend Developer", label: "Backend Developer" },
  
    // Mobile Development
    { value: "Mobile Developer", label: "Mobile Developer" },
    { value: "Android Developer", label: "Android Developer" },
    { value: "iOS Developer", label: "iOS Developer" },
  
    // DevOps & Infrastructure
    { value: "DevOps Engineer", label: "DevOps Engineer" },
    { value: "Cloud Engineer", label: "Cloud Engineer" },
  
    // Quality Assurance
    { value: "QA Engineer", label: "QA Engineer" },
    { value: "Test Engineer", label: "Test Engineer" },
    { value: "QA Analyst", label: "QA Analyst" },
  
    // Design
    { value: "UI/UX Designer", label: "UI/UX Designer" },
    { value: "UI Designer", label: "UI Designer" },
    { value: "UX Designer", label: "UX Designer" },
  
    // Analysis & Documentation
    { value: "Business Analyst", label: "Business Analyst" },
    { value: "Systems Analyst", label: "Systems Analyst" },
    { value: "Technical Writer", label: "Technical Writer" },
  
    // Data
    { value: "Data Analyst", label: "Data Analyst" },
  
    // Support
    { value: "Technical Support", label: "Technical Support" },
  
    // Entry Level
    { value: "Intern", label: "Intern" },
    { value: "Trainee", label: "Trainee" },
  ];

  export const rolesV2 = [
    // Management & Leadership
    { value: "CEO", label: "CEO" },
    { value: "CTO", label: "CTO" },
    { value: "Engineering Manager", label: "Engineering Manager" },
    { value: "Team Lead", label: "Team Lead" },
    { value: "Technical Lead", label: "Technical Lead" },
  
    // Project Management
    { value: "Project Manager", label: "Project Manager" },
    { value: "Product Manager", label: "Product Manager" },
    { value: "Product Owner", label: "Product Owner" },
    { value: "Scrum Master", label: "Scrum Master" },
  
    // Development
    { value: "Senior Software Engineer", label: "Senior Software Engineer" },
    { value: "Software Engineer", label: "Software Engineer" },
    { value: "Junior Software Engineer", label: "Junior Software Engineer" },
    { value: "Full Stack Developer", label: "Full Stack Developer" },
    { value: "Frontend Developer", label: "Frontend Developer" },
    { value: "Backend Developer", label: "Backend Developer" },
    { value: "Mobile Developer", label: "Mobile Developer" },
  
    // DevOps & Infrastructure
    { value: "Senior DevOps Engineer", label: "Senior DevOps Engineer" },
    { value: "DevOps Engineer", label: "DevOps Engineer" },
    { value: "Cloud Engineer", label: "Cloud Engineer" },
    { value: "Site Reliability Engineer", label: "Site Reliability Engineer" },
  
    // Quality Assurance
    { value: "Senior QA Engineer", label: "Senior QA Engineer" },
    { value: "QA Engineer", label: "QA Engineer" },
    { value: "Test Engineer", label: "Test Engineer" },
    { value: "Automation Engineer", label: "Automation Engineer" },
  
    // Design
    { value: "Senior UI/UX Designer", label: "Senior UI/UX Designer" },
    { value: "UI/UX Designer", label: "UI/UX Designer" },
    { value: "Product Designer", label: "Product Designer" },
    { value: "UX Researcher", label: "UX Researcher" },
  
    // Data & Analytics
    { value: "Data Scientist", label: "Data Scientist" },
    { value: "Data Engineer", label: "Data Engineer" },
    { value: "Data Analyst", label: "Data Analyst" },
  
    // Business & Analysis
    { value: "Business Analyst", label: "Business Analyst" },
    { value: "Systems Analyst", label: "Systems Analyst" },
    { value: "Technical Writer", label: "Technical Writer" },
  
    // Security
    { value: "Security Engineer", label: "Security Engineer" },
    { value: "Cybersecurity Analyst", label: "Cybersecurity Analyst" },
  
    // Support
    { value: "Technical Support Engineer", label: "Technical Support Engineer" },
    { value: "Customer Success Manager", label: "Customer Success Manager" },
  
    // Intern & Entry Level
    { value: "Software Engineer Intern", label: "Software Engineer Intern" },
    { value: "Graduate Developer", label: "Graduate Developer" },
  ];