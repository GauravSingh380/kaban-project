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
          <h1>tab 1</h1>
        </div>
      ),
      calendar: (
        <div className="space-y-6">
         <KanbanCalender />
        </div>
      ),
    };

    return contentMap[activeTab] || contentMap.home;
  };

  export default RenderContent