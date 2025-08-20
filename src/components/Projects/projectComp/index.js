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
      placeholder: '0',
      min: 0,
      icon: 'DollarSign',
      containerClass: 'col-span-2' // Half width
    },
    {
      name: 'spent',
      type: 'number',
      label: 'Amount Spent ($)',
      placeholder: '0',
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
      containerClass: 'col-span-full' // Full width for better UX
    },
  
    // Tags Section - Full width
    {
      name: 'tags',
      type: 'tags',
      label: 'Tags',
      placeholder: 'Add project tags',
      containerClass: 'col-span-full' // Full width for tag management
    },
  
    // Team Section - Full width
    {
      name: 'team',
      type: 'team',
      label: 'Team Members',
      containerClass: 'col-span-full' // Full width for team member cards
    },
  
    // Checkbox Section - Full width for better alignment
    {
      name: 'starred',
      type: 'checkbox',
      label: 'Mark as starred project',
      containerClass: 'col-span-full' // Full width for consistent alignment
    }
  ];