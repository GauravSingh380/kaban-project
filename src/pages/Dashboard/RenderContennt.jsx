import HomePageUser from "../../components/home/Home"
import DataGrid from "../../components/DataGrid/DataGrid"
import FormBuilder from "../../components/FormBuilder/FormBuilder"

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
        </div>
      ),
      projects: (
        <div className="space-y-2">
          <FormBuilder />
        </div>
      ),
      issues: (
        <div className="space-y-6">
          <DataGrid />
        </div>
      ),
      backlog: (
        <div className="space-y-6">
          <h1>tab 1</h1>
        </div>
      ),
      sprints: (
        <div className="space-y-6">
          <h1>tab 1</h1>
        </div>
      ),
      calendar: (
        <div className="space-y-6">
         <h1>tab 1</h1>
        </div>
      ),
    };

    return contentMap[activeTab] || contentMap.home;
  };

  export default RenderContent