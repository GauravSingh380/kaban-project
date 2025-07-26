import { useState } from 'react';
import DataDisplay from '../DataView3';

const ProjectsPage = () => {
    // Your projects data
    const sampleProjects = [
        {
            id: 1,
            name: 'E-commerce Platform Redesign',
            description: 'Complete overhaul of the online store with modern UI/UX and improved checkout flow.',
            status: 'active',
            priority: 'high',
            progress: 78,
            startDate: '2024-03-15',
            dueDate: '2024-09-30',
            budget: 50000,
            spent: 39000,
            client: 'FashionHub Inc.',
            team: [
                { name: 'Alex Johnson', role: 'Project Manager', avatar: 'AJ' },
                { name: 'Sarah Chen', role: 'Frontend Developer', avatar: 'SC' },
                { name: 'Mike Brown', role: 'Backend Developer', avatar: 'MB' }
            ],
            tags: ['ecommerce', 'react', 'nodejs', 'mongodb'],
            starred: true,
            bugs: {
                open: 12,
                critical: 2
            }
        },
        {
            id: 2,
            name: 'Mobile Banking App',
            description: 'Development of a secure mobile banking application with biometric authentication.',
            status: 'active',
            priority: 'critical',
            progress: 45,
            startDate: '2024-04-01',
            dueDate: '2024-11-15',
            budget: 75000,
            spent: 34000,
            client: 'Global Bank',
            team: [
                { name: 'David Kim', role: 'Tech Lead', avatar: 'DK' },
                { name: 'Emma Wilson', role: 'Mobile Developer', avatar: 'EW' },
                { name: 'James Lee', role: 'Security Specialist', avatar: 'JL' }
            ],
            tags: ['mobile', 'react-native', 'security', 'finance'],
            starred: false,
            bugs: {
                open: 8,
                critical: 3
            }
        },
        {
            id: 3,
            name: 'HR Management System',
            description: 'Cloud-based HR system for employee management, payroll, and performance tracking.',
            status: 'testing',
            priority: 'medium',
            progress: 92,
            startDate: '2024-01-10',
            dueDate: '2024-06-30',
            budget: 60000,
            spent: 55000,
            client: 'TechCorp Ltd.',
            team: [
                { name: 'Lisa Wong', role: 'Product Owner', avatar: 'LW' },
                { name: 'Robert Garcia', role: 'Fullstack Developer', avatar: 'RG' }
            ],
            tags: ['hr', 'cloud', 'saas', 'angular'],
            starred: true,
            bugs: {
                open: 5,
                critical: 0
            }
        },
        {
            id: 4,
            name: 'IoT Smart Home Solution',
            description: 'Integration platform for smart home devices with centralized control.',
            status: 'planning',
            priority: 'high',
            progress: 15,
            startDate: '2024-05-01',
            dueDate: '2024-12-20',
            budget: 85000,
            spent: 12000,
            client: 'SmartLiving Technologies',
            team: [
                { name: 'Nina Patel', role: 'IoT Engineer', avatar: 'NP' },
                { name: 'Tom Smith', role: 'UI/UX Designer', avatar: 'TS' }
            ],
            tags: ['iot', 'smart-home', 'python', 'embedded'],
            starred: false,
            bugs: {
                open: 0,
                critical: 0
            }
        },
        {
            id: 5,
            name: 'Analytics Dashboard',
            description: 'Real-time business analytics dashboard with customizable reports.',
            status: 'active',
            priority: 'medium',
            progress: 65,
            startDate: '2024-02-20',
            dueDate: '2024-08-15',
            budget: 45000,
            spent: 29000,
            client: 'DataInsights Inc.',
            team: [
                { name: 'Chris Taylor', role: 'Data Scientist', avatar: 'CT' },
                { name: 'Olivia Martin', role: 'Frontend Developer', avatar: 'OM' }
            ],
            tags: ['analytics', 'dashboard', 'd3js', 'data-visualization'],
            starred: true,
            bugs: {
                open: 7,
                critical: 1
            }
        },
        {
            id: 6,
            name: 'Customer Support Chatbot',
            description: 'AI-powered chatbot for handling customer inquiries and support tickets.',
            status: 'completed',
            priority: 'low',
            progress: 100,
            startDate: '2023-11-01',
            dueDate: '2024-02-28',
            budget: 30000,
            spent: 28000,
            client: 'ServicePlus LLC',
            team: [
                { name: 'Daniel Wilson', role: 'AI Specialist', avatar: 'DW' },
                { name: 'Sophia Lee', role: 'Backend Developer', avatar: 'SL' }
            ],
            tags: ['ai', 'chatbot', 'nlp', 'customer-service'],
            starred: false,
            bugs: {
                open: 2,
                critical: 0
            }
        },
        {
            id: 7,
            name: 'Inventory Management System',
            description: 'Cloud-based inventory tracking and management for retail chains.',
            status: 'on_hold',
            priority: 'medium',
            progress: 30,
            startDate: '2024-03-01',
            dueDate: '2024-10-01',
            budget: 55000,
            spent: 16500,
            client: 'Retail Solutions Co.',
            team: [
                { name: 'Mark Davis', role: 'Project Manager', avatar: 'MD' },
                { name: 'Anna Clark', role: 'Fullstack Developer', avatar: 'AC' }
            ],
            tags: ['inventory', 'retail', 'cloud', 'rest-api'],
            starred: false,
            bugs: {
                open: 4,
                critical: 1
            }
        }
    ];
    const [projects, setProjects] = useState(sampleProjects); // Your projects data
    
    // Filter options
    const statusOptions = [
        { value: 'active', label: 'Active' },
        { value: 'testing', label: 'Testing' },
        { value: 'planning', label: 'Planning' },
        { value: 'completed', label: 'Completed' },
        { value: 'on_hold', label: 'On Hold' }
    ];
    
    const priorityOptions = [
        { value: 'critical', label: 'Critical' },
        { value: 'high', label: 'High' },
        { value: 'medium', label: 'Medium' },
        { value: 'low', label: 'Low' }
    ];
    
    // Columns to search
    const columns = [
        { key: 'name', label: 'Name' },
        { key: 'description', label: 'Description' },
        { key: 'client', label: 'Client' },
        { key: 'status', label: 'Status' },
        { key: 'priority', label: 'Priority' },
        { key: 'progress', label: 'Progress' },
        { key: 'budget', label: 'Budget' },
        { key: 'dueDate', label: 'Due Date' }
    ];
    
    // Handlers
    const handleAddProject = () => {
        console.log('Add new project');
    };
    
    const handleEditProject = (project) => {
        console.log('Edit project:', project);
    };
    
    const handleDeleteProject = (project) => {
        console.log('Delete project:', project);
    };
    
    const handleViewProject = (project) => {
        console.log('View project:', project);
    };
    
    const handleStarProject = (project) => {
        console.log('Star project:', project);
        setProjects(projects.map(p => 
            p.id === project.id ? { ...p, starred: !p.starred } : p
        ));
    };
    
    const handleBulkAction = (action, selectedIds) => {
        console.log('Bulk action:', action, selectedIds);
    };

    return (
        <DataDisplay
            title="Projects"
            description="Manage and track your project portfolio"
            data={projects}
            columns={columns}
            
            // Customization
            addButtonText="New Project"
            defaultViewMode="grid"
            
            // Filter options
            filterOptions={{
                status: statusOptions,
                priority: priorityOptions
            }}
            
            // Event handlers
            onAddClick={handleAddProject}
            onEditClick={handleEditProject}
            onDeleteClick={handleDeleteProject}
            onViewClick={handleViewProject}
            onStarClick={handleStarProject}
            onBulkAction={handleBulkAction}
            
            // Features
            enableSelection={true}
            enablePagination={true}
            enableExport={true}
            enableStats={true}
            enableViewToggle={true}
        />
    );
};

export default ProjectsPage;