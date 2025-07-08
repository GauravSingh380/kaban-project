import { useState } from "react";
import { ChevronLeft, ChevronRight, X, Menu, LogOut } from "lucide-react";
import { useAuth } from "../../api";
import StyledSpinner from "../StyledSpinner/StyledSpinner";

const SidebarTabs = ({
  user,
  menuItems,
  renderContent,
  orientation = "vertical",
  defaultTab,
  onLogout,
  activeTab,
  setActiveTab
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // const { loading, error, execute } = useApi(login);
  const {loading } = useAuth();
//   const [activeTab, setActiveTab] = useState(defaultTab || menuItems[0]?.id);
  const isMobile = window.innerWidth < 768;
  const isVertical = orientation === "vertical";

  return (
    <div className={`flex ${isVertical ? "h-screen" : "flex-col"} bg-gray-100`}>
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen
            ? isVertical
              ? "w-64"
              : "h-20 w-full"
            : isVertical
            ? "w-16"
            : "h-16 w-full"
        } bg-purple-800 text-white transition-all duration-300 ease-in-out flex ${
          isVertical ? "flex-col" : "flex-row items-center"
        } relative ${isMobile && sidebarOpen ? "fixed inset-0 z-50" : ""}
        ${isMobile && !sidebarOpen ? "hidden" : ""}`}
      >
        {/* Header */}
        <div
          className={`p-4 border-b border-purple-700 flex items-center justify-between ${
            isVertical ? "" : "w-full"
          }`}
        >
          {sidebarOpen && <h2 className="text-xl font-bold">Dashboard</h2>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-md hover:bg-purple-700"
          >
            {sidebarOpen ? (
              isMobile ? <X size={20} /> : <ChevronLeft size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </button>
        </div>

        {/* User Info */}
        {sidebarOpen && isVertical && (
          <div className="p-4 border-b border-purple-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {user?.name?.split(' ').map(word => word[0].toUpperCase()).join('')}
              </div>
              <div>
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs font-bold text-purple-300">{user?.role || ""}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className={`flex-1 ${isVertical ? "p-4" : "flex"} overflow-x-auto`}>
          <ul className={isVertical ? "space-y-2" : "flex space-x-4 px-4"}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      if (isMobile) setSidebarOpen(false);
                    }}
                    className={`flex items-center ${
                      isVertical ? "w-full p-3" : "py-2 px-3"
                    } rounded-lg transition-colors ${
                      activeTab === item.id
                        ? "bg-purple-700 text-white"
                        : "text-purple-200 hover:bg-purple-700"
                    }`}
                  >
                    <Icon size={20} />
                    {sidebarOpen && (
                      <span className={`${isVertical ? "ml-3" : "ml-2"} font-medium`}>
                        {item.label}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        {sidebarOpen && isVertical && (
          <div className="p-4 border-t border-purple-700">
            <button
              onClick={onLogout}
              className="w-full flex items-center p-3 rounded-lg text-purple-200 hover:bg-purple-700"
            >
              <LogOut size={20} />
              <span className="ml-3 font-medium">
              {loading ?
                <StyledSpinner
                  borderWidth='3px'
                  size='1.5rem'
                  text='Logging out...'
                  fontSize='semi bold'
                /> :
                'Logout'
              }
                </span>
            </button>
          </div>
        )}
      </div>

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Area */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm border-b border-gray-200 p-4 flex justify-between items-center">
          {(isMobile || !sidebarOpen) && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <Menu size={20} />
            </button>
          )}
          <h1 className="text-xl font-semibold text-gray-800 capitalize">
            {activeTab.replace("_", " ")}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="text-sm font-bold text-purple-500">{user?.role || ""}</div>
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
             {user?.name?.split(' ').map(word => word[0].toUpperCase()).join('')}
            </div>
          </div>
        </header>

        <main className="p-6">{renderContent(activeTab)}</main>
      </div>
    </div>
  );
};

export default SidebarTabs;
