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

const RenderContent = ({menuItems, activeTab, user}) => {
    // Check if user has access to current tab
    const hasAccess = menuItems.some(item => item.id === activeTab);
    
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
          <HomePageUser  user={user}/>
          <DashboardContent1 />
          {/* <DashboardContent2 /> */}
        </div>
      ),
      projects: (
        <div className="space-y-2">
          <ProjectsContent1 />
          {/* <ProjectsContent2 /> */}
        </div>
      ),
      issues: (
        <div className="space-y-6">
          <DataGrid />
        </div>
      ),
      reports: (
        <div className="space-y-6">
          <BugReportsDashboard1 />
          <br />
          <br />
          <br />
          <br />
          <BugReportsDashboard2 />
        </div>
      ),
      team: (
        <div className="space-y-6">
          <TeamsContent1 />
          <br />
          <br />
          <br />
          <br />
          <TeamsContent2 />
        </div>
      ),
      sprints: (
        <div className="space-y-6">
          {/* <TeamMemberSignupExample /> */}
          <SignUpApp1 />
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