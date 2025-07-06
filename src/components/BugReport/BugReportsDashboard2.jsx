import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Area, AreaChart
} from 'recharts';
import { 
  Bug, AlertTriangle, CheckCircle, Clock, Users, Calendar,
  TrendingUp, TrendingDown, Filter, Download, RefreshCw
} from 'lucide-react';

// Sample data - in real app, this would come from your bug management system
const sampleBugs = [
  { id: 1, priority: 'P1', status: 'open', assignedTo: 'John Doe', reportedBy: 'Alice Smith', environment: 'Production', reportedOn: '2024-01-15', createdAt: '2024-01-15' },
  { id: 2, priority: 'P2', status: 'in-progress', assignedTo: 'Jane Smith', reportedBy: 'Bob Johnson', environment: 'Staging', reportedOn: '2024-01-14', createdAt: '2024-01-14' },
  { id: 3, priority: 'P3', status: 'resolved', assignedTo: 'Mike Wilson', reportedBy: 'Carol Davis', environment: 'Development', reportedOn: '2024-01-13', createdAt: '2024-01-13' },
  { id: 4, priority: 'P1', status: 'closed', assignedTo: 'Sarah Connor', reportedBy: 'David Lee', environment: 'Production', reportedOn: '2024-01-12', createdAt: '2024-01-12' },
  { id: 5, priority: 'P2', status: 'open', assignedTo: 'Tom Hardy', reportedBy: 'Emma Watson', environment: 'Staging', reportedOn: '2024-01-11', createdAt: '2024-01-11' },
  { id: 6, priority: 'P3', status: 'in-progress', assignedTo: 'John Doe', reportedBy: 'Frank Miller', environment: 'Development', reportedOn: '2024-01-10', createdAt: '2024-01-10' },
  { id: 7, priority: 'P1', status: 'resolved', assignedTo: 'Jane Smith', reportedBy: 'Grace Kelly', environment: 'Production', reportedOn: '2024-01-09', createdAt: '2024-01-09' },
  { id: 8, priority: 'P2', status: 'closed', assignedTo: 'Mike Wilson', reportedBy: 'Henry Ford', environment: 'Staging', reportedOn: '2024-01-08', createdAt: '2024-01-08' },
];

const BugReportsDashboard2 = () => {
  const [dateRange, setDateRange] = useState('7');
  const [selectedEnvironment, setSelectedEnvironment] = useState('all');

  // Calculate metrics
  const metrics = useMemo(() => {
    const total = sampleBugs.length;
    const open = sampleBugs.filter(bug => bug.status === 'open').length;
    const inProgress = sampleBugs.filter(bug => bug.status === 'in-progress').length;
    const resolved = sampleBugs.filter(bug => bug.status === 'resolved').length;
    const closed = sampleBugs.filter(bug => bug.status === 'closed').length;
    const critical = sampleBugs.filter(bug => bug.priority === 'P1').length;
    
    return {
      total,
      open,
      inProgress,
      resolved,
      closed,
      critical,
      resolutionRate: total > 0 ? ((resolved + closed) / total * 100).toFixed(1) : 0
    };
  }, []);

  // Status distribution for pie chart
  const statusData = [
    { name: 'Open', value: metrics.open, color: '#ef4444' },
    { name: 'In Progress', value: metrics.inProgress, color: '#f59e0b' },
    { name: 'Resolved', value: metrics.resolved, color: '#10b981' },
    { name: 'Closed', value: metrics.closed, color: '#6b7280' }
  ];

  // Priority distribution
  const priorityData = [
    { name: 'P1 (Critical)', value: sampleBugs.filter(b => b.priority === 'P1').length, color: '#dc2626' },
    { name: 'P2 (High)', value: sampleBugs.filter(b => b.priority === 'P2').length, color: '#f59e0b' },
    { name: 'P3 (Medium)', value: sampleBugs.filter(b => b.priority === 'P3').length, color: '#10b981' }
  ];

  // Environment breakdown
  const environmentData = [
    { name: 'Production', bugs: sampleBugs.filter(b => b.environment === 'Production').length },
    { name: 'Staging', bugs: sampleBugs.filter(b => b.environment === 'Staging').length },
    { name: 'Development', bugs: sampleBugs.filter(b => b.environment === 'Development').length }
  ];

  // Team performance
  const teamData = useMemo(() => {
    const assigneeStats = {};
    sampleBugs.forEach(bug => {
      if (!assigneeStats[bug.assignedTo]) {
        assigneeStats[bug.assignedTo] = { assigned: 0, resolved: 0, closed: 0 };
      }
      assigneeStats[bug.assignedTo].assigned++;
      if (bug.status === 'resolved') assigneeStats[bug.assignedTo].resolved++;
      if (bug.status === 'closed') assigneeStats[bug.assignedTo].closed++;
    });

    return Object.entries(assigneeStats).map(([name, stats]) => ({
      name,
      assigned: stats.assigned,
      resolved: stats.resolved,
      closed: stats.closed,
      completionRate: ((stats.resolved + stats.closed) / stats.assigned * 100).toFixed(1)
    }));
  }, []);

  // Trend data (mock - in real app, this would be historical data)
  const trendData = [
    { date: '2024-01-08', opened: 2, resolved: 1, closed: 1 },
    { date: '2024-01-09', opened: 1, resolved: 2, closed: 0 },
    { date: '2024-01-10', opened: 1, resolved: 1, closed: 1 },
    { date: '2024-01-11', opened: 1, resolved: 0, closed: 2 },
    { date: '2024-01-12', opened: 1, resolved: 1, closed: 1 },
    { date: '2024-01-13', opened: 1, resolved: 1, closed: 0 },
    { date: '2024-01-14', opened: 1, resolved: 0, closed: 1 }
  ];

  const exportReport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      metrics,
      statusDistribution: statusData,
      priorityDistribution: priorityData,
      environmentBreakdown: environmentData,
      teamPerformance: teamData
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bug-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Bug Reports Dashboard</h1>
              <p className="text-gray-600">Comprehensive analytics and insights for bug management</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
              <button
                onClick={exportReport}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bugs</p>
                <p className="text-3xl font-bold text-gray-900">{metrics.total}</p>
              </div>
              <Bug className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-sm text-gray-500 mt-2">All reported bugs</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical Issues</p>
                <p className="text-3xl font-bold text-red-600">{metrics.critical}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-sm text-gray-500 mt-2">P1 priority bugs</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolution Rate</p>
                <p className="text-3xl font-bold text-green-600">{metrics.resolutionRate}%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-sm text-gray-500 mt-2">Resolved + Closed</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Issues</p>
                <p className="text-3xl font-bold text-orange-600">{metrics.open + metrics.inProgress}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
            <p className="text-sm text-gray-500 mt-2">Open + In Progress</p>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Status Distribution */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Priority Distribution */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Breakdown</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={priorityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Environment Breakdown */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Environment Breakdown</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={environmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bugs" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bug Trends */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bug Trends (7 Days)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="opened" stroke="#ef4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="closed" stroke="#6b7280" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Team Performance Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Team Performance</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Team Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resolved
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Closed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completion Rate
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {teamData.map((member, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {member.assigned}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      {member.resolved}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {member.closed}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm text-gray-900 mr-2">{member.completionRate}%</div>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${member.completionRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Reporters */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Bug Reporters</h3>
            <div className="space-y-3">
              {Object.entries(
                sampleBugs.reduce((acc, bug) => {
                  acc[bug.reportedBy] = (acc[bug.reportedBy] || 0) + 1;
                  return acc;
                }, {})
              ).slice(0, 5).map(([reporter, count]) => (
                <div key={reporter} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{reporter}</span>
                  <span className="text-sm text-gray-500">{count} bugs</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-600">Bug #7 resolved by Jane Smith</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-gray-600">Bug #6 assigned to John Doe</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                <span className="text-gray-600">P1 Bug #5 reported by Emma Watson</span>
              </div>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Production Stability</span>
                  <span className="text-green-600">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Critical Issues</span>
                  <span className="text-red-600">3 Active</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BugReportsDashboard2;