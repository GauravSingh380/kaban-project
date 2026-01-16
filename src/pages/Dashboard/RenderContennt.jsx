import HomePageUser from "../../components/home/Home"
import DataGrid from "../../components/DataGrid/DataGrid"
import FormBuilder from "../../components/FormBuilder/FormBuilder"
import KanbanCalender from "../../components/Calender/KanbanCalender";
import DashboardContent1 from "../../components/MainDashboard/DashboardContent1";
import DashboardContent2 from "../../components/MainDashboard/DashboardContent2";
import ProjectsContent1 from "../../components/Projects/ProjectContent1";
import ProjectsContent2 from "../../components/Projects/ProjectContent2";
import BugReportsDashboard1 from "../../components/BugReport/BugReportsDashboard1";
import BugReportsDashboard2 from "../../components/BugReport/BugReportsDashboard2";
import TeamsContent1 from "../../components/Teams/TeamsContent1";
import TeamsContent2 from "../../components/Teams/TeamsContent2";
import TeamMemberSignupExample from "../../components/TeamSignUp/TeamMemberSignupExample";
import TeamMemberSignupDeepSeek from "../../components/TeamSignUp/SignupForm/TeamMemberSignupDeepSeek";
import EditProfileDeepSeek from "../../components/TeamSignUp/SignupForm/EditProfileDeepSeek";
import SignUpApp1 from "../../components/TeamSignUp/SignUp2/SignUpApp1";
import SignUpApp2 from "../../components/TeamSignUp/SignUp2/SignUpApp2";
import UserProfile from "../../components/UserProfile/UserProfile";
import UserProfileV2 from "../../components/UserProfile/UserProfileV2";
import SettingsPage1 from "../../components/Settings/SettingsPage1";
import SettingsTab from "../../components/Settings/SettingsTab";
import SettingsPage2 from "../../components/Settings/SettingsPage2";
import SpinnerDemo from "../../components/common/SpinnerDemo";
import SprintManagement1 from "../../components/Sprints/SprintManagement1";
import SprintManagement2 from "../../components/Sprints/Sprints2";
import SprintManagement4 from "../../components/Sprints/SprintManagement4";
import SprintManagement3 from "../../components/Sprints/SprintManagement3";
import ProjectsPage from "../../components/DataView/usage/DataUsage3";
import DataView2 from "../../components/DataView/DataView2";
import DataUsage1 from "../../components/DataView/usage/DataUsage1";
import { Activity, AlertCircle, Archive, CheckCircle2, Clock, Download, FolderOpen } from "lucide-react";
import ProjectsComponent from "../../components/Projects/ProjectsComponent";
import BugsV1 from "../../components/Bugs/BugsV1";
import BugImportSampleGenerator from "../../components/DataGrid/BugImportSampleGenerator";
import DynamicBugCreator from "../../components/DataGrid/DynamicBugCreator";
import DeleteConfirmationUsage from "../../components/common/deleteConfirmationUsage";
import ProjectSample1 from "../projectDesign/ProjectSample1";
import ProjectSample2 from "../projectDesign/ProjectSample2";
import TeamSample1 from "../projectDesign/TeamSample1";
import ProfileSample1 from "../projectDesign/profileSample1";
import IssuesManagement from "../projectDesign/coreFuntionality/IssuesManagement";
import SprintsManagement from "../projectDesign/coreFuntionality/SprintsManagement";
import CalendarManagement from "../projectDesign/coreFuntionality/CalendarManagement";
import ReportsDashboard from "../projectDesign/ReportsDashboard/ReportsDashboard";
import ProjectContent1v1 from "../../components/Projects/ProjectContent1v1";
import TeamManagement from "../../components/Teams/TeamManagement";

const RenderContent = ({ menuItems, activeTab, user }) => {
  // Check if user has access to current tab
  const hasAccess = menuItems.some(item => item.id === activeTab);

  const dummyData = {
    "title": "Project Dashboard",
    "subtitle": "Manage your projects and tasks",
    "data": [
      {
        "id": 1,
        "name": "Website Redesign",
        "description": "Complete redesign of company website with new branding",
        "status": "in-progress",
        "priority": "high",
        "dueDate": "2023-12-15",
        "assignedTo": ["john@example.com", "sarah@example.com"],
        "progress": 65,
        "starred": true,
        "tags": ["design", "frontend"],
        "createdAt": "2023-10-01T09:30:00Z",
        "budget": 12500,
        "tasksCompleted": 13,
        "totalTasks": 20
      },
      {
        "id": 2,
        "name": "Mobile App Development",
        "description": "Build cross-platform mobile application for iOS and Android",
        "status": "in-progress",
        "priority": "medium",
        "dueDate": "2024-02-28",
        "assignedTo": ["mike@example.com", "lisa@example.com"],
        "progress": 30,
        "starred": false,
        "tags": ["mobile", "react-native"],
        "createdAt": "2023-09-15T14:20:00Z",
        "budget": 25000,
        "tasksCompleted": 6,
        "totalTasks": 20
      },
      {
        "id": 3,
        "name": "API Migration",
        "description": "Migrate legacy APIs to new microservices architecture",
        "status": "completed",
        "priority": "high",
        "dueDate": "2023-11-10",
        "assignedTo": ["alex@example.com", "david@example.com"],
        "progress": 100,
        "starred": true,
        "tags": ["backend", "devops"],
        "createdAt": "2023-08-20T11:15:00Z",
        "budget": 18000,
        "tasksCompleted": 25,
        "totalTasks": 25
      },
      {
        "id": 4,
        "name": "Marketing Campaign",
        "description": "Q4 holiday marketing campaign preparation",
        "status": "planned",
        "priority": "medium",
        "dueDate": "2023-12-01",
        "assignedTo": ["emma@example.com"],
        "progress": 5,
        "starred": false,
        "tags": ["marketing", "content"],
        "createdAt": "2023-10-10T16:45:00Z",
        "budget": 15000,
        "tasksCompleted": 1,
        "totalTasks": 15
      },
      {
        "id": 5,
        "name": "Database Optimization",
        "description": "Optimize database queries and add indexing",
        "status": "in-progress",
        "priority": "low",
        "dueDate": "2023-11-30",
        "assignedTo": ["david@example.com"],
        "progress": 45,
        "starred": false,
        "tags": ["database", "backend"],
        "createdAt": "2023-09-05T10:00:00Z",
        "budget": 8000,
        "tasksCompleted": 9,
        "totalTasks": 20
      },
      {
        "id": 6,
        "name": "User Testing",
        "description": "Conduct user testing sessions for new features",
        "status": "planned",
        "priority": "medium",
        "dueDate": "2024-01-15",
        "assignedTo": ["sarah@example.com", "lisa@example.com"],
        "progress": 0,
        "starred": true,
        "tags": ["ux", "research"],
        "createdAt": "2023-10-15T13:30:00Z",
        "budget": 7500,
        "tasksCompleted": 0,
        "totalTasks": 10
      },
      {
        "id": 7,
        "name": "Security Audit",
        "description": "Perform comprehensive security audit of all systems",
        "status": "in-progress",
        "priority": "high",
        "dueDate": "2023-11-20",
        "assignedTo": ["alex@example.com", "mike@example.com"],
        "progress": 25,
        "starred": false,
        "tags": ["security", "devops"],
        "createdAt": "2023-09-28T15:10:00Z",
        "budget": 12000,
        "tasksCompleted": 5,
        "totalTasks": 20
      },
      {
        "id": 8,
        "name": "Employee Training",
        "description": "New framework training for development team",
        "status": "completed",
        "priority": "low",
        "dueDate": "2023-10-30",
        "assignedTo": ["john@example.com", "david@example.com", "lisa@example.com"],
        "progress": 100,
        "starred": false,
        "tags": ["training", "hr"],
        "createdAt": "2023-09-10T09:00:00Z",
        "budget": 5000,
        "tasksCompleted": 8,
        "totalTasks": 8
      }
    ],
    "columns": [
      {
        "key": "name",
        "header": "Project Name",
        "className": "flex-1 min-w-[200px]"
      },
      {
        "key": "status",
        "header": "Status",
        "className": "w-32",
        "render": (item) => {
          const statusMap = {
            "planned": { color: "bg-gray-100 text-gray-800", icon: Clock },
            "in-progress": { color: "bg-blue-100 text-blue-800", icon: Activity },
            "completed": { color: "bg-green-100 text-green-800", icon: CheckCircle2 }
          };
          const status = statusMap[item.status] || statusMap.planned;
          return (
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
              <status.icon className="w-3 h-3 mr-1" />
              {item.status.replace("-", " ")}
            </div>
          );
        }
      },
      {
        "key": "priority",
        "header": "Priority",
        "className": "w-24",
        "render": (item) => {
          const priorityMap = {
            "high": "text-red-600",
            "medium": "text-yellow-600",
            "low": "text-green-600"
          };
          return (
            <span className={`capitalize ${priorityMap[item.priority]}`}>
              {item.priority}
            </span>
          );
        }
      },
      {
        "key": "dueDate",
        "header": "Due Date",
        "className": "w-32",
        "render": (item) => new Date(item.dueDate).toLocaleDateString()
      },
      {
        "key": "progress",
        "header": "Progress",
        "className": "w-48",
        "render": (item) => (
          <div className="flex items-center gap-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-600">{item.progress}%</span>
          </div>
        )
      }
    ],
    "filters": [
      {
        "key": "status",
        "label": "Filter by Status",
        "defaultValue": "all",
        "options": [
          { "value": "all", "label": "All Statuses" },
          { "value": "planned", "label": "Planned" },
          { "value": "in-progress", "label": "In Progress" },
          { "value": "completed", "label": "Completed" }
        ]
      },
      {
        "key": "priority",
        "label": "Filter by Priority",
        "defaultValue": "all",
        "options": [
          { "value": "all", "label": "All Priorities" },
          { "value": "high", "label": "High" },
          { "value": "medium", "label": "Medium" },
          { "value": "low", "label": "Low" }
        ]
      }
    ],
    "sortOptions": [
      { "value": "name", "label": "Sort by Name" },
      { "value": "dueDate", "label": "Sort by Due Date" },
      { "value": "priority", "label": "Sort by Priority" },
      { "value": "progress", "label": "Sort by Progress" }
    ],
    "statsCards": [
      {
        "title": "Total Projects",
        "value": 8,
        "icon": FolderOpen,
        "iconBg": "bg-blue-100",
        "iconColor": "text-blue-600"
      },
      {
        "title": "In Progress",
        "value": 4,
        "icon": Activity,
        "iconBg": "bg-yellow-100",
        "iconColor": "text-yellow-600"
      },
      {
        "title": "Completed",
        "value": 2,
        "icon": CheckCircle2,
        "iconBg": "bg-green-100",
        "iconColor": "text-green-600"
      },
      {
        "title": "Overdue",
        "value": 1,
        "icon": AlertCircle,
        "iconBg": "bg-red-100",
        "iconColor": "text-red-600"
      }
    ],
    "bulkActions": [
      {
        "label": "Archive",
        "icon": Archive,
        "onClick": (selectedIds) => console.log("Archive", selectedIds)
      },
      {
        "label": "Export",
        "icon": Download,
        "onClick": (selectedIds) => console.log("Export", selectedIds)
      }
    ],
    "searchFields": ["name", "description", "tags"],
    "searchPlaceholder": "Search projects...",
    "selectable": true,
    "defaultViewMode": "grid",
    "pageSize": 6,
    "showExportOptions": true
  }

  if (!hasAccess) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to view this content.</p>
        </div>
      </div>
    );
  }
  const userdata = {
    "id": "user_123",
    "name": "Alex Johnson",
    "email": "alex.johnson@example.com",
    "avatar": "AJ",
    "isOnline": true,
    "role": "Frontend Developer",
    "department": "Engineering",
    "status": "active",
    "workload": 75,
    "phone": "+1 (555) 123-4567",
    "location": "San Francisco, CA",
    "joinDate": "2023-05-15",
    "starred": false,
    "performance": 92,
    "completedTasks": 24,
    "totalTasks": 26,
    "projects": [
      "Dashboard Redesign",
      "Mobile App V2",
      "API Integration"
    ],
    "skills": [
      "React",
      "TypeScript",
      "CSS",
      "GraphQL",
      "Jest"
    ],
    "bio": "Frontend specialist with 5 years of experience building responsive web applications. Passionate about UI/UX and performance optimization.",
    "socialLinks": {
      "github": "https://github.com/alexjohnson",
      "linkedin": "https://linkedin.com/in/alexjohnson",
      "portfolio": "https://alexjohnson.dev"
    },
    "previousProjects": [
      "E-commerce Platform",
      "Admin Portal",
      "Customer Dashboard"
    ]
  }

  const contentMap = {
    dashboard: (
      <div className="space-y-6">
        {/* <HomePageUser  user={user}/> */}
        {/* <DashboardContent1 /> */}
        {/* <ProjectsPage /> */}
        <ProjectSample1 />
        <br />
        <br />
        <br />
        <br />
        {/* <ProjectSample2 /> */}
        {/* <DataView2
          data={dummyData.data}
          columns={dummyData.columns}
          filters={dummyData.filters}
          sortOptions={dummyData.sortOptions}
          statsCards={dummyData.statsCards}
          bulkActions={dummyData.bulkActions}
          searchFields={dummyData.searchFields}
          searchPlaceholder={dummyData.searchPlaceholder}
          title={dummyData.title}
          subtitle={dummyData.subtitle}
          selectable={dummyData.selectable}
          defaultViewMode={dummyData.defaultViewMode}
          pageSize={dummyData.pageSize}
          showExportOptions={dummyData.showExportOptions}
          onAdd={() => console.log("Add new project")}
          onView={(item) => console.log("View", item)}
          onEdit={(item) => console.log("Edit", item)}
          onDelete={(item) => console.log("Delete", item)}
          onArchive={(item) => console.log("Archive", item)}
          onStar={(id, starred) => console.log("Star", id, starred)}
          onExport={(type) => console.log("Export", type)}
        /> */}
        <h1>TEST</h1>
        <h1>TEST</h1>
        <h1>TEST</h1>
        <h1>Team</h1>
        <TeamSample1 />
        <h1>TEST</h1>
        <h1>TEST</h1>
        <h1>PROFILE</h1>
        <ProfileSample1 />
        <h1>TEST</h1>
        <h1>TEST</h1>
        <h1>IssuesManagement</h1>
        <IssuesManagement />
        <h1>TEST</h1>
        <h1>TEST</h1>
        <h1>SprintsManagement</h1>
        <SprintsManagement />
        <h1>TEST</h1>
        <h1>TEST</h1>
        <h1>CalendarManagement</h1>
        <CalendarManagement />
        <h1>TEST</h1>
        <h1>TEST</h1>
        <h1>TEST</h1>
        <h1>ReportsDashboard</h1>
        <ReportsDashboard />
        {/* <DataUsage3 /> */}
        {/* <DashboardContent2 /> */}
      </div>
    ),
    projects: (
      <div className="space-y-2">
        {/* <ProjectsContent1 /> */}
        <ProjectContent1v1 />
        {/* <ProjectsContent2 /> */}
        {/* <ProjectsComponent /> */}
      </div>
    ),
    issues: (
      <div className="space-y-6">
        <DataGrid />
        <br />
        <br />
        {/* <DeleteConfirmationUsage /> */}
        <br />
        <br />
        <DynamicBugCreator />
        <br />
        <br />
        {/* <BugImportSampleGenerator /> */}
        <br />
        <br />
        {/* <BugsV1 /> */}
      </div>
    ),
    reports: (
      <div className="space-y-6">
        {/* <BugReportsDashboard1 /> */}
        {/* <br />
        <br />
        <br />
        <br /> */}
        <BugReportsDashboard2 />
      </div>
    ),
    team: (
      <div className="space-y-6">
        <TeamManagement />
        <br />
        <br />
        <br />
        <br />
        <br />
        <TeamsContent1 />
        <br />
        <br />
        <br />
        <TeamsContent2 />
      </div>
    ),
    sprints: (
      <div className="space-y-6">
        {/* <TeamMemberSignupExample /> */}
        <SprintManagement1 />
        <h3>TEST</h3>
        <h3>TEST</h3>
        <h3>TEST</h3>
        <h3>TEST</h3>
        <h3>TEST</h3>
        <SprintManagement2 />
        <h4>3</h4>
        <h4>3</h4>
        <h4>3</h4>
        <h4>3</h4>
        <h4>3</h4>
        <h4>3</h4>
        <SprintManagement3 />
        <h4>4</h4>
        <h4>4</h4>
        <h4>4</h4>
        <h4>4</h4>
        <h4>4</h4>
        <h4>4</h4>
        <h4>4</h4>
        <h4>4</h4>
        <SprintManagement4 />
      </div>
    ),
    calendar: (
      <div className="space-y-6">
        <KanbanCalender />
      </div>
    ),
    profile: (
      <div className="space-y-6">
        {/* <UserProfile />
         <br />
         <br /> */}
        <UserProfileV2 />
      </div>
    ),
    settings: (
      <div className="space-y-6">
        {/* <SettingsPage1 />
         <h1>Settings content</h1>
         <h1>Settings content</h1>
         <h1>Settings content</h1>
         <h1>Settings content</h1>
         <h1>Settings content</h1>
         <h1>Settings content</h1> */}
        <SpinnerDemo />
        <br />
        <br />
        <br />
        <SettingsPage2 />
        {/* 
         <h1>Settings content</h1>
         <h1>DeepSeek</h1>
         <SettingsTab /> */}
      </div>
    ),
  };

  return contentMap[activeTab] || contentMap.home;
};

export default RenderContent