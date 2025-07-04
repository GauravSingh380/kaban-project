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
export const allMenuItems = [
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

export const initialBugs = [
  {
    id: 1,
    slNo: 101,
    issueEnv: ['dev', 'prod'],
    title: 'Login page crashes on invalid email',
    description: "As a school admin, Purchased The Hochman Method: 3–12 (Live Virtual) membership with 5 educators , but on admin dahboard same membership displaying twice",
    reportedOn: '2025-07-01',
    reportedBy: 'Gaurav Singh',
    assignedTo: 'Ajeet Gupta',
    status: 'open',
    priority: 'P1',
    comments: 'Needs immediate attention, reported by QA during regression testing.',
    createdAt: '2025-07-01',
    updatedAt: '2025-07-03',
  },
  {
    id: 2,
    slNo: 102,
    issueEnv: ['demo'],
    title: 'Dashboard chart not loading',
    description: 'TWR Admin -- Dashboard login -- District listing page -- in District filter -- one District coming multiple time ( its coming e.g. 6 distict admin accounts created with 1 district then in filter its coming 6 times , it should come only 1 time) and with ',
    reportedOn: '2025-06-28',
    reportedBy: 'Priya Sharma',
    assignedTo: 'Rohit Mehta',
    status: 'fixed',
    priority: 'P2',
    comments: 'Handled edge case for empty dataset.',
    createdAt: '2025-06-28',
    updatedAt: '2025-07-02',
  },
  {
    id: 3,
    slNo: 103,
    issueEnv: ['prod'],
    title: 'TWR Admin',
    description: 'TWR Admin -- Dashboard login -- District/School listing page -- in Status filter -- there is 2 words using 1 is Deactivate in status column 2. is Inactive in status filter it should be consitance ( with inactive filter deactivate data coming)',
    reportedOn: '2025-06-25',
    reportedBy: 'Amit Kumar',
    assignedTo: 'Neha Patel',
    status: 'in-progress',
    priority: 'P1',
    comments: 'Critical issue affecting revenue. Working on increasing timeout limit.',
    createdAt: '2025-06-25',
    updatedAt: '2025-07-01',
  },
  {
    id: 4,
    slNo: 104,
    issueEnv: ['dev', 'stg'],
    title: 'Email notifications not sent',
    description: 'Users are not receiving email notifications for password reset requests.',
    reportedOn: '2025-06-20',
    reportedBy: 'Ravi Gupta',
    assignedTo: 'Sunita Sharma',
    status: 'closed',
    priority: 'P3',
    comments: 'SMTP configuration issue resolved.',
    createdAt: '2025-06-20',
    updatedAt: '2025-06-22',
  },
  {
    id: 5,
    slNo: 105,
    issueEnv: ['demo', 'stg'],
    title: 'UI elements overlapping on mobile',
    description: 'TWR Admin -- Dashboard login -- School listing page -- only 2 option in status filter ( Active and Inactive , But on status column there is 3 status ( Active, Deactivate, Pending) status should be consitance (Inactive & deactivated) pending option should also in status filter',
    reportedOn: '2025-06-15',
    reportedBy: 'Kavita Singh',
    assignedTo: 'Rajesh Kumar',
    status: 'open',
    priority: 'P4',
    comments: 'CSS responsive design needs adjustment.',
    createdAt: '2025-06-15',
    updatedAt: '2025-06-18',
  },
  {
    id: 6,
    slNo: 105,
    issueEnv: ['demo', 'stg'],
    title: 'UI elements overlapping on mobile',
    description: 'On mobile devices, navigation menu overlaps with main content area.',
    reportedOn: '2025-06-15',
    reportedBy: 'Kavita Singh',
    assignedTo: 'Rajesh Kumar',
    status: 'open',
    priority: 'P4',
    comments: 'CSS responsive design needs adjustment.',
    createdAt: '2025-06-15',
    updatedAt: '2025-06-18',
  },
  {
    id: 7,
    slNo: 105,
    issueEnv: ['demo', 'stg'],
    title: 'UI elements overlapping on mobile',
    description: 'On mobile devices, navigation menu overlaps with main content area.',
    reportedOn: '2025-06-15',
    reportedBy: 'Kavita Singh',
    assignedTo: 'Rajesh Kumar',
    status: 'open',
    priority: 'P4',
    comments: 'CSS responsive design needs adjustment.',
    createdAt: '2025-06-15',
    updatedAt: '2025-06-18',
  }
];

export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'P1': return 'bg-red-100 text-red-800';
    case 'P2': return 'bg-orange-100 text-orange-800';
    case 'P3': return 'bg-yellow-100 text-yellow-800';
    case 'P4': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'open': return 'bg-red-100 text-red-800';
    case 'in-progress': return 'bg-yellow-100 text-yellow-800';
    case 'fixed': return 'bg-green-100 text-green-800';
    case 'closed': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};