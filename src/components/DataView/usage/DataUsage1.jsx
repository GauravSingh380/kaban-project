import React, { useState } from 'react';
import { 
  Users, DollarSign, TrendingUp, AlertCircle, CheckCircle2, 
  Clock, Bug, Target, Activity, Calendar, Settings, Archive,
  Star, GitBranch, Download, Upload, Edit, Trash2, Eye
} from 'lucide-react';
import DataView1 from '../DataView1'; // Adjust import path as needed

const DataUsage1 = () => {
  const [activeTab, setActiveTab] = useState('projects');

  // Sample Projects Data
  const projectsData = [
    {
      id: 1,
      name: "E-commerce Platform",
      description: "Modern e-commerce solution with React and Node.js",
      status: "active",
      priority: "high",
      progress: 85,
      budget: 150000,
      spent: 127500,
      startDate: "2024-01-15",
      endDate: "2024-06-30",
      team: [
        { name: "John Doe", avatar: "JD" },
        { name: "Jane Smith", avatar: "JS" },
        { name: "Mike Johnson", avatar: "MJ" },
        { name: "Sarah Wilson", avatar: "SW" },
        { name: "Tom Brown", avatar: "TB" }
      ],
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      manager: "John Doe",
      department: "Engineering"
    },
    {
      id: 2,
      name: "Mobile Banking App",
      description: "Secure mobile banking application for iOS and Android",
      status: "planning",
      priority: "medium",
      progress: 25,
      budget: 200000,
      spent: 45000,
      startDate: "2024-03-01",
      endDate: "2024-10-15",
      team: [
        { name: "Alice Cooper", avatar: "AC" },
        { name: "Bob Wilson", avatar: "BW" },
        { name: "Carol Davis", avatar: "CD" }
      ],
      tags: ["React Native", "Banking", "Security", "iOS", "Android"],
      manager: "Alice Cooper",
      department: "Mobile"
    },
    {
      id: 3,
      name: "Data Analytics Dashboard",
      description: "Real-time analytics dashboard for business intelligence",
      status: "completed",
      priority: "low",
      progress: 100,
      budget: 75000,
      spent: 72000,
      startDate: "2023-11-01",
      endDate: "2024-02-28",
      team: [
        { name: "David Lee", avatar: "DL" },
        { name: "Emma Stone", avatar: "ES" }
      ],
      tags: ["D3.js", "Python", "PostgreSQL", "Analytics"],
      manager: "David Lee",
      department: "Data"
    },
    {
      id: 4,
      name: "Customer Support Portal",
      description: "Self-service customer support and ticketing system",
      status: "on-hold",
      priority: "medium",
      progress: 60,
      budget: 100000,
      spent: 58000,
      startDate: "2024-02-01",
      endDate: "2024-07-31",
      team: [
        { name: "Frank Miller", avatar: "FM" },
        { name: "Grace Kelly", avatar: "GK" },
        { name: "Henry Ford", avatar: "HF" }
      ],
      tags: ["Support", "Ticketing", "React", "Express"],
      manager: "Frank Miller",
      department: "Support"
    }
  ];

  // Sample Tasks Data
  const tasksData = [
    {
      id: 1,
      title: "Implement user authentication",
      description: "Add OAuth and JWT authentication system",
      status: "in-progress",
      priority: "high",
      assignee: "John Doe",
      reporter: "Jane Smith",
      project: "E-commerce Platform",
      dueDate: "2024-08-15",
      estimatedHours: 16,
      loggedHours: 12,
      labels: ["Backend", "Security", "Auth"]
    },
    {
      id: 2,
      title: "Design product catalog UI",
      description: "Create responsive product listing and detail pages",
      status: "todo",
      priority: "medium",
      assignee: "Sarah Wilson",
      reporter: "Mike Johnson",
      project: "E-commerce Platform",
      dueDate: "2024-08-20",
      estimatedHours: 24,
      loggedHours: 0,
      labels: ["Frontend", "UI/UX", "React"]
    },
    {
      id: 3,
      title: "Setup payment integration",
      description: "Integrate Stripe payment processing",
      status: "completed",
      priority: "high",
      assignee: "Tom Brown",
      reporter: "John Doe",
      project: "E-commerce Platform",
      dueDate: "2024-07-30",
      estimatedHours: 20,
      loggedHours: 18,
      labels: ["Payment", "Integration", "Stripe"]
    },
    {
      id: 4,
      title: "Write API documentation",
      description: "Document all REST API endpoints",
      status: "review",
      priority: "low",
      assignee: "Mike Johnson",
      reporter: "John Doe",
      project: "Mobile Banking App",
      dueDate: "2024-08-25",
      estimatedHours: 8,
      loggedHours: 6,
      labels: ["Documentation", "API"]
    }
  ];

  // Sample Customers Data
  const customersData = [
    {
      id: 1,
      name: "Acme Corporation",
      email: "contact@acme.com",
      phone: "+1-555-0123",
      status: "active",
      type: "enterprise",
      revenue: 125000,
      joinDate: "2023-01-15",
      lastActivity: "2024-07-20",
      location: "New York, NY",
      industry: "Technology",
      employees: 500,
      contactPerson: "John Smith"
    },
    {
      id: 2,
      name: "Beta Solutions",
      email: "hello@betasolutions.com",
      phone: "+1-555-0456",
      status: "trial",
      type: "startup",
      revenue: 12500,
      joinDate: "2024-06-01",
      lastActivity: "2024-07-22",
      location: "San Francisco, CA",
      industry: "Fintech",
      employees: 25,
      contactPerson: "Sarah Johnson"
    },
    {
      id: 3,
      name: "Gamma Industries",
      email: "info@gamma.com",
      phone: "+1-555-0789",
      status: "inactive",
      type: "medium",
      revenue: 45000,
      joinDate: "2022-08-10",
      lastActivity: "2024-05-15",
      location: "Chicago, IL",
      industry: "Manufacturing",
      employees: 150,
      contactPerson: "Mike Wilson"
    }
  ];

  // Projects Configuration
  const projectsConfig = {
    title: "Projects",
    subtitle: "Manage your development projects and track progress",
    data: projectsData,
    searchFields: ["name", "description", "manager", "tags"],
    
    // Statistics Configuration
    statsConfig: [
      {
        label: "Total Projects",
        icon: Target,
        calculate: (data) => data.length,
        bgColor: "bg-blue-100",
        iconColor: "text-blue-600"
      },
      {
        label: "Active Projects",
        icon: Activity,
        calculate: (data) => data.filter(p => p.status === 'active').length,
        bgColor: "bg-green-100",
        iconColor: "text-green-600"
      },
      {
        label: "Total Budget",
        icon: DollarSign,
        calculate: (data) => data.reduce((sum, p) => sum + p.budget, 0),
        type: "currency",
        bgColor: "bg-yellow-100",
        iconColor: "text-yellow-600"
      },
      {
        label: "Avg Progress",
        icon: TrendingUp,
        calculate: (data) => Math.round(data.reduce((sum, p) => sum + p.progress, 0) / data.length),
        type: "percentage",
        bgColor: "bg-purple-100",
        iconColor: "text-purple-600"
      }
    ],

    // Card Configuration
    cardConfig: {
      title: "name",
      subtitle: "description",
      fields: [
        {
          type: "badges",
          items: [
            {
              field: "status",
              type: "text",
              config: {
                "active": "text-green-700 bg-green-50 border-green-200",
                "planning": "text-blue-700 bg-blue-50 border-blue-200",
                "completed": "text-gray-700 bg-gray-50 border-gray-200",
                "on-hold": "text-yellow-700 bg-yellow-50 border-yellow-200"
              }
            },
            {
              field: "priority",
              type: "text",
              config: {
                "high": "text-red-700 bg-red-50 border-red-200",
                "medium": "text-yellow-700 bg-yellow-50 border-yellow-200",
                "low": "text-green-700 bg-green-50 border-green-200"
              }
            }
          ]
        },
        {
          type: "progress",
          label: "Progress",
          field: "progress",
          valueType: "percentage",
          getColor: (value) => {
            if (value >= 80) return "bg-green-500";
            if (value >= 60) return "bg-yellow-500";
            if (value >= 40) return "bg-orange-500";
            return "bg-red-500";
          }
        },
        {
          type: "grid",
          columns: 3,
          items: [
            { label: "Budget", field: "budget", type: "currency" },
            { label: "Spent", field: "spent", type: "currency" },
            { label: "Manager", field: "manager", type: "text" }
          ]
        },
        {
          type: "tags",
          field: "tags"
        },
        {
          type: "avatars",
          field: "team",
          label: "Team Members",
          suffix: "members",
          maxShow: 4
        }
      ]
    },

    // Filter Options
    filterOptions: [
      {
        key: "status",
        options: [
          { value: "all", label: "All Status" },
          { value: "active", label: "Active" },
          { value: "planning", label: "Planning" },
          { value: "completed", label: "Completed" },
          { value: "on-hold", label: "On Hold" }
        ]
      },
      {
        key: "priority",
        options: [
          { value: "all", label: "All Priority" },
          { value: "high", label: "High" },
          { value: "medium", label: "Medium" },
          { value: "low", label: "Low" }
        ]
      },
      {
        key: "department",
        options: [
          { value: "all", label: "All Departments" },
          { value: "Engineering", label: "Engineering" },
          { value: "Mobile", label: "Mobile" },
          { value: "Data", label: "Data" },
          { value: "Support", label: "Support" }
        ]
      }
    ],

    // Sort Options
    sortOptions: [
      { value: "name", label: "Name A-Z", field: "name", type: "string" },
      { value: "name_desc", label: "Name Z-A", field: "name", type: "string", reverse: true },
      { value: "progress", label: "Progress ↑", field: "progress", type: "number" },
      { value: "progress_desc", label: "Progress ↓", field: "progress", type: "number", reverse: true },
      { value: "budget", label: "Budget ↑", field: "budget", type: "number" },
      { value: "budget_desc", label: "Budget ↓", field: "budget", type: "number", reverse: true },
      { value: "startDate", label: "Start Date ↑", field: "startDate", type: "date" },
      { value: "startDate_desc", label: "Start Date ↓", field: "startDate", type: "date", reverse: true }
    ],

    // Table Columns (for table view)
    columns: [
      { 
        label: "Project", 
        field: "name", 
        type: "text",
        subtitle: "description"
      },
      { 
        label: "Progress", 
        field: "progress", 
        type: "progress",
        getColor: (value) => {
          if (value >= 80) return "bg-green-500";
          if (value >= 60) return "bg-yellow-500";
          if (value >= 40) return "bg-orange-500";
          return "bg-red-500";
        }
      },
      { 
        label: "Status", 
        field: "status", 
        type: "badge",
        config: {
          "active": "text-green-700 bg-green-50 border-green-200",
          "planning": "text-blue-700 bg-blue-50 border-blue-200",
          "completed": "text-gray-700 bg-gray-50 border-gray-200",
          "on-hold": "text-yellow-700 bg-yellow-50 border-yellow-200"
        }
      },
      { 
        label: "Budget", 
        field: "budget", 
        type: "currency",
        subtitle: "spent",
        subtitleType: "currency"
      }
    ],

    // Custom Actions
    customActions: [
      {
        icon: GitBranch,
        title: "View Repository",
        handler: (item) => alert(`Opening repository for ${item.name}`),
        className: "text-gray-400 hover:text-blue-600 hover:bg-blue-50"
      },
      {
        icon: Activity,
        title: "View Analytics",
        handler: (item) => alert(`Opening analytics for ${item.name}`),
        className: "text-gray-400 hover:text-green-600 hover:bg-green-50"
      }
    ]
  };

  // Tasks Configuration
  const tasksConfig = {
    title: "Tasks",
    subtitle: "Track and manage development tasks",
    data: tasksData,
    searchFields: ["title", "description", "assignee", "project"],
    
    statsConfig: [
      {
        label: "Total Tasks",
        icon: Target,
        calculate: (data) => data.length,
        bgColor: "bg-blue-100",
        iconColor: "text-blue-600"
      },
      {
        label: "In Progress",
        icon: Clock,
        calculate: (data) => data.filter(t => t.status === 'in-progress').length,
        bgColor: "bg-orange-100",
        iconColor: "text-orange-600"
      },
      {
        label: "Completed",
        icon: CheckCircle2,
        calculate: (data) => data.filter(t => t.status === 'completed').length,
        bgColor: "bg-green-100",
        iconColor: "text-green-600"
      },
      {
        label: "Overdue",
        icon: AlertCircle,
        calculate: (data) => data.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed').length,
        bgColor: "bg-red-100",
        iconColor: "text-red-600"
      }
    ],

    cardConfig: {
      title: "title",
      subtitle: "project",
      description: "description",
      fields: [
        {
          type: "badges",
          items: [
            {
              field: "status",
              type: "text",
              config: {
                "todo": "text-gray-700 bg-gray-50 border-gray-200",
                "in-progress": "text-blue-700 bg-blue-50 border-blue-200",
                "review": "text-yellow-700 bg-yellow-50 border-yellow-200",
                "completed": "text-green-700 bg-green-50 border-green-200"
              }
            },
            {
              field: "priority",
              type: "text",
              config: {
                "high": "text-red-700 bg-red-50 border-red-200",
                "medium": "text-yellow-700 bg-yellow-50 border-yellow-200",
                "low": "text-green-700 bg-green-50 border-green-200"
              }
            }
          ]
        },
        {
          type: "grid",
          columns: 2,
          items: [
            { label: "Assignee", field: "assignee", type: "text" },
            { label: "Due Date", field: "dueDate", type: "date" },
            { label: "Estimated", field: "estimatedHours", type: "text" },
            { label: "Logged", field: "loggedHours", type: "text" }
          ]
        },
        {
          type: "tags",
          field: "labels"
        }
      ]
    },

    filterOptions: [
      {
        key: "status",
        options: [
          { value: "all", label: "All Status" },
          { value: "todo", label: "To Do" },
          { value: "in-progress", label: "In Progress" },
          { value: "review", label: "In Review" },
          { value: "completed", label: "Completed" }
        ]
      },
      {
        key: "priority",
        options: [
          { value: "all", label: "All Priority" },
          { value: "high", label: "High" },
          { value: "medium", label: "Medium" },
          { value: "low", label: "Low" }
        ]
      }
    ],

    sortOptions: [
      { value: "title", label: "Title A-Z", field: "title", type: "string" },
      { value: "dueDate", label: "Due Date ↑", field: "dueDate", type: "date" },
      { value: "priority_desc", label: "Priority ↓", field: "priority", type: "string", reverse: true }
    ],

    columns: [
      { label: "Task", field: "title", type: "text", subtitle: "project" },
      { 
        label: "Status", 
        field: "status", 
        type: "badge",
        config: {
          "todo": "text-gray-700 bg-gray-50 border-gray-200",
          "in-progress": "text-blue-700 bg-blue-50 border-blue-200",
          "review": "text-yellow-700 bg-yellow-50 border-yellow-200",
          "completed": "text-green-700 bg-green-50 border-green-200"
        }
      },
      { label: "Assignee", field: "assignee", type: "text" },
      { label: "Due Date", field: "dueDate", type: "date" }
    ]
  };

  // Customers Configuration
  const customersConfig = {
    title: "Customers",
    subtitle: "Manage your customer relationships and accounts",
    data: customersData,
    searchFields: ["name", "email", "contactPerson", "industry"],
    
    statsConfig: [
      {
        label: "Total Customers",
        icon: Users,
        calculate: (data) => data.length,
        bgColor: "bg-blue-100",
        iconColor: "text-blue-600"
      },
      {
        label: "Active",
        icon: CheckCircle2,
        calculate: (data) => data.filter(c => c.status === 'active').length,
        bgColor: "bg-green-100",
        iconColor: "text-green-600"
      },
      {
        label: "Total Revenue",
        icon: DollarSign,
        calculate: (data) => data.reduce((sum, c) => sum + c.revenue, 0),
        type: "currency",
        bgColor: "bg-green-100",
        iconColor: "text-green-600"
      },
      {
        label: "Avg Revenue",
        icon: TrendingUp,
        calculate: (data) => Math.round(data.reduce((sum, c) => sum + c.revenue, 0) / data.length),
        type: "currency",
        bgColor: "bg-purple-100",
        iconColor: "text-purple-600"
      }
    ],

    cardConfig: {
      title: "name",
      subtitle: "contactPerson",
      description: "email",
      fields: [
        {
          type: "badges",
          items: [
            {
              field: "status",
              type: "text",
              config: {
                "active": "text-green-700 bg-green-50 border-green-200",
                "trial": "text-blue-700 bg-blue-50 border-blue-200",
                "inactive": "text-gray-700 bg-gray-50 border-gray-200"
              }
            },
            {
              field: "type",
              type: "text",
              config: {
                "enterprise": "text-purple-700 bg-purple-50 border-purple-200",
                "medium": "text-blue-700 bg-blue-50 border-blue-200",
                "startup": "text-orange-700 bg-orange-50 border-orange-200"
              }
            }
          ]
        },
        {
          type: "grid",
          columns: 2,
          items: [
            { label: "Revenue", field: "revenue", type: "currency" },
            { label: "Industry", field: "industry", type: "text" },
            { label: "Employees", field: "employees", type: "number" },
            { label: "Location", field: "location", type: "text" }
          ]
        }
      ]
    },

    filterOptions: [
      {
        key: "status",
        options: [
          { value: "all", label: "All Status" },
          { value: "active", label: "Active" },
          { value: "trial", label: "Trial" },
          { value: "inactive", label: "Inactive" }
        ]
      },
      {
        key: "type",
        options: [
          { value: "all", label: "All Types" },
          { value: "enterprise", label: "Enterprise" },
          { value: "medium", label: "Medium" },
          { value: "startup", label: "Startup" }
        ]
      }
    ],

    sortOptions: [
      { value: "name", label: "Name A-Z", field: "name", type: "string" },
      { value: "revenue_desc", label: "Revenue ↓", field: "revenue", type: "number", reverse: true },
      { value: "joinDate", label: "Join Date ↑", field: "joinDate", type: "date" }
    ],

    columns: [
      { label: "Customer", field: "name", type: "text", subtitle: "email" },
      { 
        label: "Status", 
        field: "status", 
        type: "badge",
        config: {
          "active": "text-green-700 bg-green-50 border-green-200",
          "trial": "text-blue-700 bg-blue-50 border-blue-200",
          "inactive": "text-gray-700 bg-gray-50 border-gray-200"
        }
      },
      { label: "Revenue", field: "revenue", type: "currency" },
      { label: "Join Date", field: "joinDate", type: "date" }
    ]
  };

  // Event Handlers
  const handleAdd = (type) => {
    alert(`Adding new ${type}`);
  };

  const handleEdit = (item) => {
    alert(`Editing: ${item.name || item.title}`);
  };

  const handleDelete = (item) => {
    if (confirm(`Are you sure you want to delete "${item.name || item.title}"?`)) {
      alert(`Deleted: ${item.name || item.title}`);
    }
  };

  const handleView = (item) => {
    alert(`Viewing details for: ${item.name || item.title}`);
  };

  const handleBulkAction = (action, selectedItems) => {
    alert(`${action} action on ${selectedItems.length} items`);
  };

  const getCurrentConfig = () => {
    switch (activeTab) {
      case 'projects':
        return projectsConfig;
      case 'tasks':
        return tasksConfig;
      case 'customers':
        return customersConfig;
      default:
        return projectsConfig;
    }
  };

  const config = getCurrentConfig();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {[
              { id: 'projects', label: 'Projects', icon: Target },
              { id: 'tasks', label: 'Tasks', icon: CheckCircle2 },
              { id: 'customers', label: 'Customers', icon: Users }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* DataView Component */}
      <DataView1
        title={config.title}
        subtitle={config.subtitle}
        data={config.data}
        columns={config.columns}
        cardConfig={config.cardConfig}
        statsConfig={config.statsConfig}
        searchFields={config.searchFields}
        filterOptions={config.filterOptions}
        sortOptions={config.sortOptions}
        onAdd={() => handleAdd(activeTab)}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onBulkAction={handleBulkAction}
        customActions={config.customActions}
        enableExport={true}
        enableSelection={true}
        enableStarring={activeTab === 'projects'}
        itemsPerPage={6}
      />
    </div>
  );
};

export default DataUsage1;