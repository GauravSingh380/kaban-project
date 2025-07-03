import { 
    Users, 
    BarChart3, 
    Settings, 
    FolderIcon,
    BugIcon,
    ListIcon,
    KanbanIcon,
    CalendarIcon,
    BarChartIcon,
    HistoryIcon,
    PlugIcon
  } from 'lucide-react';
const allMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, roles: ['Super Admin', 'Admin', 'QA', 'User'] },
    { id: 'projects', label: 'Projects', icon: FolderIcon, roles: ['Super Admin', 'Admin', 'QA', 'User'] },
    { id: 'issues', label: 'Issues', icon: BugIcon, roles: ['Super Admin', 'Admin', 'QA', 'User'] },
    { id: 'backlog', label: 'Backlog', icon: ListIcon, roles: ['Super Admin', 'Admin', 'QA'] },
    { id: 'sprints', label: 'Sprints', icon: KanbanIcon, roles: ['Super Admin', 'Admin', 'QA'] },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon, roles: ['Super Admin', 'Admin', 'QA', 'User'] },
    { id: 'reports', label: 'Reports', icon: BarChartIcon, roles: ['Super Admin', 'Admin', 'QA'] },
    { id: 'team', label: 'Team', icon: Users, roles: ['Super Admin', 'Admin'] },
    // { id: 'activity_log', label: 'Activity Log', icon: HistoryIcon, roles: ['Super Admin', 'Admin'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['Super Admin'] },
    // { id: 'integrations', label: 'Integrations', icon: PlugIcon, roles: ['Super Admin', 'Admin'] },
  ];

export default allMenuItems;