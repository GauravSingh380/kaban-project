import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Users, BarChart3, Settings } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: 'Secure Authentication',
      description: 'Role-based access control with secure token management'
    },
    {
      icon: Users,
      title: 'Team Management',
      description: 'Manage your team members and their permissions'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Track your project progress with detailed analytics'
    },
    {
      icon: Settings,
      title: 'Customizable',
      description: 'Tailor the platform to fit your workflow needs'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-600">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Project Management
              <span className="block text-purple-200">Made Simple</span>
            </h1>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Streamline your workflow, collaborate with your team, and achieve your goals 
              with our powerful project management platform.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('/login')}
                className="bg-white text-purple-800 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center group"
              >
                Login
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors border border-purple-600"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Everything you need to manage projects
          </h2>
          <p className="text-purple-200 max-w-2xl mx-auto">
            Our platform provides all the tools you need to keep your projects on track 
            and your team aligned.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-purple-400 border-opacity-20 hover:bg-opacity-20 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-purple-700">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-purple-700 bg-purple-900 bg-opacity-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-purple-200">
            <p>&copy; 2025 Project Management App. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;