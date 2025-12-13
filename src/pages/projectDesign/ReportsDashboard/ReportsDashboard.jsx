import React, { useState } from 'react';
import { 
  Plus, Edit, Trash2, Eye, Filter, Search, Calendar as CalendarIcon,
  Bug, AlertCircle, CheckCircle, Clock, User, XCircle, Play, Pause,
  BarChart3, TrendingUp, Target, Zap, ChevronLeft, ChevronRight,
  Download, FileText, PieChart, Activity, Users, Folder, ArrowUp, ArrowDown,
  Award, GitBranch, Sparkles
} from 'lucide-react';

// ============================================
// REPORTS PAGE
// ============================================

const ReportsPage = () => {
  const [selectedReport, setSelectedReport] = useState('bug-summary');
  const [dateRange, setDateRange] = useState('last-30-days');
  const [selectedProject, setSelectedProject] = useState('all');

  // Sample analytics data - API: GET /api/reports/analytics
  const bugAnalytics = {
    totalBugs: 127,
    openBugs: 23,
    inProgressBugs: 15,
    fixedBugs: 78,
    closedBugs: 11,
    criticalBugs: 5,
    avgResolutionTime: 4.2, // days
    bugsByPriority: {
      critical: 5,
      high: 28,
      medium: 54,
      low: 40
    },
    bugsByStatus: {
      open: 23,
      'in-progress': 15,
      'in-review': 12,
      fixed: 78,
      closed: 11
    },
    bugsByProject: [
      { name: 'TWR', count: 67, open: 12 },
      { name: 'ECP', count: 38, open: 8 },
      { name: 'MHA', count: 22, open: 3 }
    ],
    bugsOverTime: [
      { week: 'Week 1', opened: 8, closed: 5 },
      { week: 'Week 2', opened: 12, closed: 7 },
      { week: 'Week 3', opened: 6, closed: 10 },
      { week: 'Week 4', opened: 9, closed: 8 }
    ],
    topReporters: [
      { name: 'Ashok Reddy', count: 34 },
      { name: 'Gaurav Singh', count: 28 },
      { name: 'Priya Kumar', count: 21 }
    ],
    topAssignees: [
      { name: 'Gaurav Singh', assigned: 42, completed: 38 },
      { name: 'Ashok Reddy', assigned: 35, completed: 30 },
      { name: 'Rahul Sharma', assigned: 28, completed: 24 }
    ]
  };

  const sprintAnalytics = {
    totalSprints: 12,
    activeSprints: 1,
    completedSprints: 10,
    avgSprintVelocity: 24.5, // tasks per sprint
    avgSprintCompletion: 92, // percentage
    sprintPerformance: [
      { sprint: 'Sprint 8', planned: 20, completed: 18 },
      { sprint: 'Sprint 9', planned: 22, completed: 20 },
      { sprint: 'Sprint 10', planned: 25, completed: 24 },
      { sprint: 'Sprint 11', planned: 28, completed: 28 },
      { sprint: 'Sprint 12', planned: 26, completed: 15 } // ongoing
    ]
  };

  const teamAnalytics = {
    totalMembers: 18,
    activeMembers: 16,
    avgTasksPerMember: 7.2,
    topPerformers: [
      { name: 'Gaurav Singh', tasksCompleted: 145, efficiency: 95 },
      { name: 'Ashok Reddy', tasksCompleted: 132, efficiency: 92 },
      { name: 'Priya Kumar', tasksCompleted: 118, efficiency: 89 }
    ],
    teamWorkload: [
      { name: 'Gaurav Singh', active: 8, capacity: 10 },
      { name: 'Ashok Reddy', active: 9, capacity: 10 },
      { name: 'Rahul Sharma', active: 6, capacity: 8 }
    ]
  };

  const exportReport = () => {
    console.log('Exporting report:', selectedReport);
    // API: GET /api/reports/export?type=selectedReport&format=pdf
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-1">Comprehensive insights and data analysis</p>
          </div>
          <button
            onClick={exportReport}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <Download className="w-5 h-5" />
            <span>Export Report</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border p-4 mb-6">
          <div className="flex items-center space-x-4">
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="bug-summary">Bug Summary Report</option>
              <option value="sprint-analytics">Sprint Analytics</option>
              <option value="team-performance">Team Performance</option>
              <option value="project-overview">Project Overview</option>
            </select>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="last-7-days">Last 7 Days</option>
              <option value="last-30-days">Last 30 Days</option>
              <option value="last-90-days">Last 90 Days</option>
              <option value="this-year">This Year</option>
            </select>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Projects</option>
              <option value="TWR">TWR</option>
              <option value="ECP">ECP</option>
              <option value="MHA">MHA</option>
            </select>
          </div>
        </div>

        {/* Bug Summary Report */}
        {selectedReport === 'bug-summary' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-5 gap-4">
              <div className="bg-white p-6 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <Bug className="w-8 h-8 text-gray-600" />
                  <span className="text-xs text-green-600 flex items-center">
                    <ArrowUp className="w-3 h-3" /> 12%
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900">{bugAnalytics.totalBugs}</div>
                <div className="text-sm text-gray-600">Total Bugs</div>
              </div>
              <div className="bg-white p-6 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <XCircle className="w-8 h-8 text-red-600" />
                  <span className="text-xs text-red-600 flex items-center">
                    <ArrowUp className="w-3 h-3" /> 5%
                  </span>
                </div>
                <div className="text-3xl font-bold text-red-600">{bugAnalytics.openBugs}</div>
                <div className="text-sm text-gray-600">Open Bugs</div>
              </div>
              <div className="bg-white p-6 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="w-8 h-8 text-blue-600" />
                  <span className="text-xs text-blue-600 flex items-center">
                    <ArrowUp className="w-3 h-3" /> 8%
                  </span>
                </div>
                <div className="text-3xl font-bold text-blue-600">{bugAnalytics.inProgressBugs}</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <div className="bg-white p-6 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <span className="text-xs text-green-600 flex items-center">
                    <ArrowUp className="w-3 h-3" /> 15%
                  </span>
                </div>
                <div className="text-3xl font-bold text-green-600">{bugAnalytics.fixedBugs}</div>
                <div className="text-sm text-gray-600">Fixed</div>
              </div>
              <div className="bg-white p-6 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <AlertCircle className="w-8 h-8 text-orange-600" />
                  <span className="text-xs text-red-600 flex items-center">
                    <ArrowDown className="w-3 h-3" /> 3%
                  </span>
                </div>
                <div className="text-3xl font-bold text-orange-600">{bugAnalytics.criticalBugs}</div>
                <div className="text-sm text-gray-600">Critical</div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-2 gap-6">
              {/* Bugs by Priority */}
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Bugs by Priority</h3>
                <div className="space-y-3">
                  {Object.entries(bugAnalytics.bugsByPriority).map(([priority, count]) => {
                    const total = Object.values(bugAnalytics.bugsByPriority).reduce((a, b) => a + b, 0);
                    const percentage = Math.round((count / total) * 100);
                    const colors = {
                      critical: 'bg-red-500',
                      high: 'bg-orange-500',
                      medium: 'bg-yellow-500',
                      low: 'bg-green-500'
                    };
                    return (
                      <div key={priority}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700 capitalize">{priority}</span>
                          <span className="text-sm font-bold text-gray-900">{count} ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className={`${colors[priority]} h-2 rounded-full`} style={{width: `${percentage}%`}}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bugs by Project */}
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Bugs by Project</h3>
                <div className="space-y-4">
                  {bugAnalytics.bugsByProject.map((project) => (
                    <div key={project.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded bg-purple-100 flex items-center justify-center">
                          <Folder className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{project.name}</div>
                          <div className="text-sm text-gray-600">{project.open} open bugs</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{project.count}</div>
                        <div className="text-xs text-gray-600">total</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bugs Over Time */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Bugs Trend (Last 4 Weeks)</h3>
              <div className="h-64 flex items-end justify-between space-x-2">
                {bugAnalytics.bugsOverTime.map((week, idx) => {
                  const maxValue = Math.max(...bugAnalytics.bugsOverTime.map(w => Math.max(w.opened, w.closed)));
                  const openedHeight = (week.opened / maxValue) * 100;
                  const closedHeight = (week.closed / maxValue) * 100;
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center">
                      <div className="w-full flex justify-center space-x-2 mb-2 h-48">
                        <div className="relative w-12 bg-gray-100 rounded-t">
                          <div 
                            className="absolute bottom-0 w-full bg-red-500 rounded-t"
                            style={{height: `${openedHeight}%`}}
                            title={`Opened: ${week.opened}`}
                          ></div>
                        </div>
                        <div className="relative w-12 bg-gray-100 rounded-t">
                          <div 
                            className="absolute bottom-0 w-full bg-green-500 rounded-t"
                            style={{height: `${closedHeight}%`}}
                            title={`Closed: ${week.closed}`}
                          ></div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs font-medium text-gray-700">{week.week}</div>
                        <div className="text-xs text-gray-500">
                          <span className="text-red-600">{week.opened}</span> / 
                          <span className="text-green-600">{week.closed}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-center space-x-6 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-sm text-gray-700">Opened</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm text-gray-700">Closed</span>
                </div>
              </div>
            </div>

            {/* Top Contributors */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Top Bug Reporters</h3>
                <div className="space-y-3">
                  {bugAnalytics.topReporters.map((reporter, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                          {idx + 1}
                        </div>
                        <span className="font-medium text-gray-900">{reporter.name}</span>
                      </div>
                      <span className="text-lg font-bold text-purple-600">{reporter.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Top Bug Fixers</h3>
                <div className="space-y-3">
                  {bugAnalytics.topAssignees.map((assignee, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                            {idx + 1}
                          </div>
                          <span className="font-medium text-gray-900">{assignee.name}</span>
                        </div>
                        <span className="text-sm text-gray-600">{assignee.completed}/{assignee.assigned}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{width: `${(assignee.completed / assignee.assigned) * 100}%`}}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sprint Analytics Report */}
        {selectedReport === 'sprint-analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg border text-center">
                <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-900">{sprintAnalytics.totalSprints}</div>
                <div className="text-sm text-gray-600">Total Sprints</div>
              </div>
              <div className="bg-white p-6 rounded-lg border text-center">
                <Play className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-blue-600">{sprintAnalytics.activeSprints}</div>
                <div className="text-sm text-gray-600">Active</div>
              </div>
              <div className="bg-white p-6 rounded-lg border text-center">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-green-600">{sprintAnalytics.avgSprintVelocity}</div>
                <div className="text-sm text-gray-600">Avg Velocity</div>
              </div>
              <div className="bg-white p-6 rounded-lg border text-center">
                <Award className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-orange-600">{sprintAnalytics.avgSprintCompletion}%</div>
                <div className="text-sm text-gray-600">Avg Completion</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Sprint Performance</h3>
              <div className="space-y-4">
                {sprintAnalytics.sprintPerformance.map((sprint, idx) => {
                  const completion = Math.round((sprint.completed / sprint.planned) * 100);
                  return (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{sprint.sprint}</span>
                        <span className="text-sm text-gray-600">
                          {sprint.completed}/{sprint.planned} tasks ({completion}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${completion >= 90 ? 'bg-green-500' : completion >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{width: `${completion}%`}}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Team Performance Report */}
        {selectedReport === 'team-performance' && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-lg border text-center">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-900">{teamAnalytics.totalMembers}</div>
                <div className="text-sm text-gray-600">Team Members</div>
              </div>
              <div className="bg-white p-6 rounded-lg border text-center">
                <Activity className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-green-600">{teamAnalytics.activeMembers}</div>
                <div className="text-sm text-gray-600">Active Members</div>
              </div>
              <div className="bg-white p-6 rounded-lg border text-center">
                <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-purple-600">{teamAnalytics.avgTasksPerMember}</div>
                <div className="text-sm text-gray-600">Avg Tasks/Member</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Top Performers</h3>
              <div className="space-y-4">
                {teamAnalytics.topPerformers.map((performer, idx) => (
                  <div key={idx} className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                          <Award className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{performer.name}</div>
                          <div className="text-sm text-gray-600">{performer.tasksCompleted} tasks completed</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-600">{performer.efficiency}%</div>
                        <div className="text-xs text-gray-600">Efficiency</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Team Workload</h3>
              <div className="space-y-4">
                {teamAnalytics.teamWorkload.map((member, idx) => {
                  const utilizationPercentage = Math.round((member.active / member.capacity) * 100);
                  return (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{member.name}</span>
                        <span className="text-sm text-gray-600">
                          {member.active}/{member.capacity} tasks ({utilizationPercentage}% capacity)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${utilizationPercentage > 90 ? 'bg-red-500' : utilizationPercentage > 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                          style={{width: `${utilizationPercentage}%`}}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const DashboardPage = () => {
  // Aggregate data from all sources - API: GET /api/dashboard/summary
  const dashboardData = {
    projects: {
      total: 4,
      active: 2,
      completed: 1,
      onHold: 1,
      recentProjects: [
        { id: 1, name: 'TWR', status: 'active', progress: 75, bugs: 4 },
        { id: 2, name: 'ECP', status: 'active', progress: 45, bugs: 8 },
        { id: 3, name: 'MHA', status: 'onhold', progress: 60, bugs: 3 }
      ]
    },
    bugs: {
      total: 127,
      open: 23,
      inProgress: 15,
      fixed: 78,
      critical: 5,
      myAssigned: 8,
      recentBugs: [
        { id: 1, title: 'Training Progress not displaying', priority: 'high', status: 'fixed', project: 'TWR' },
        { id: 2, title: 'Login timeout on mobile', priority: 'critical', status: 'in-progress', project: 'TWR' },
        { id: 3, title: 'CSV export failure', priority: 'medium', status: 'open', project: 'ECP' }
      ]
    },
    team: {
      total: 18,
      active: 16,
      topPerformers: [
        { name: 'Gaurav Singh', tasks: 145, avatar: 'GS' },
        { name: 'Ashok Reddy', tasks: 132, avatar: 'AR' },
        { name: 'Priya Kumar', tasks: 118, avatar: 'PK' }
      ]
    },
    sprints: {
      active: 1,
      activeSprint: {
        name: 'Sprint 12',
        progress: 65,
        daysLeft: 2,
        totalTasks: 15,
        completed: 8
      },
      upcoming: { name: 'Sprint 13', startDate: '2025-12-15' }
    },
    calendar: {
      todayEvents: 2,
      upcomingEvents: [
        { title: 'Sprint 12 Review', date: '2025-12-14', type: 'sprint' },
        { title: 'Sprint 13 Planning', date: '2025-12-15', type: 'sprint' },
        { title: 'Bug #15 Deadline', date: '2025-12-15', type: 'deadline' }
      ]
    },
    activity: [
      { user: 'Gaurav Singh', action: 'Fixed bug #23', time: '2 hours ago', type: 'bug' },
      { user: 'Ashok Reddy', action: 'Created Sprint 13', time: '4 hours ago', type: 'sprint' },
      { user: 'Priya Kumar', action: 'Reported bug #24', time: '5 hours ago', type: 'bug' },
      { user: 'Rahul Sharma', action: 'Completed task in TWR', time: '6 hours ago', type: 'task' }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, Gaurav! Here's your project overview</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <CalendarIcon className="w-5 h-5" />
              <span>Last 30 Days</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <Folder className="w-10 h-10 opacity-80" />
              <span className="text-sm bg-white bg-opacity-20 px-2 py-1 rounded">+2 this month</span>
            </div>
            <div className="text-4xl font-bold mb-1">{dashboardData.projects.total}</div>
            <div className="text-purple-100">Total Projects</div>
            <div className="mt-3 text-sm">{dashboardData.projects.active} active projects</div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <Bug className="w-10 h-10 opacity-80" />
              <span className="text-sm bg-white bg-opacity-20 px-2 py-1 rounded">{dashboardData.bugs.critical} critical</span>
            </div>
            <div className="text-4xl font-bold mb-1">{dashboardData.bugs.total}</div>
            <div className="text-red-100">Total Bugs</div>
            <div className="mt-3 text-sm">{dashboardData.bugs.open} open bugs</div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <Users className="w-10 h-10 opacity-80" />
              <span className="text-sm bg-white bg-opacity-20 px-2 py-1 rounded">{dashboardData.team.active} active</span>
            </div>
            <div className="text-4xl font-bold mb-1">{dashboardData.team.total}</div>
            <div className="text-blue-100">Team Members</div>
            <div className="mt-3 text-sm">Across all projects</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <Target className="w-10 h-10 opacity-80" />
              <span className="text-sm bg-white bg-opacity-20 px-2 py-1 rounded">{dashboardData.sprints.activeSprint.daysLeft} days left</span>
            </div>
            <div className="text-4xl font-bold mb-1">{dashboardData.sprints.activeSprint.progress}%</div>
            <div className="text-green-100">Sprint Progress</div>
            <div className="mt-3 text-sm">{dashboardData.sprints.activeSprint.name}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Active Sprint Card */}
          <div className="bg-white rounded-lg border p-6 col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Active Sprint</h3>
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div className="mb-4">
              <div className="text-2xl font-bold text-gray-900 mb-1">{dashboardData.sprints.activeSprint.name}</div>
              <div className="text-sm text-gray-600">{dashboardData.sprints.activeSprint.daysLeft} days remaining</div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-semibold">{dashboardData.sprints.activeSprint.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{width: `${dashboardData.sprints.activeSprint.progress}%`}}></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-3">
                <div className="bg-blue-50 p-3 rounded text-center">
                  <div className="text-2xl font-bold text-blue-600">{dashboardData.sprints.activeSprint.totalTasks}</div>
                  <div className="text-xs text-gray-600">Total Tasks</div>
                </div>
                <div className="bg-green-50 p-3 rounded text-center">
                  <div className="text-2xl font-bold text-green-600">{dashboardData.sprints.activeSprint.completed}</div>
                  <div className="text-xs text-gray-600">Completed</div>
                </div>
              </div>
            </div>
          </div>

          {/* My Tasks */}
          <div className="bg-white rounded-lg border p-6 col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">My Tasks</h3>
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                <div>
                  <div className="text-sm text-gray-600">Assigned to me</div>
                  <div className="text-3xl font-bold text-red-600">{dashboardData.bugs.myAssigned}</div>
                </div>
                <Bug className="w-8 h-8 text-red-600" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-yellow-50 p-3 rounded text-center border border-yellow-200">
                  <div className="text-2xl font-bold text-yellow-600">{dashboardData.bugs.critical}</div>
                  <div className="text-xs text-gray-600">Critical</div>
                </div>
                <div className="bg-blue-50 p-3 rounded text-center border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">{dashboardData.bugs.inProgress}</div>
                  <div className="text-xs text-gray-600">In Progress</div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-lg border p-6 col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Upcoming</h3>
              <CalendarIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="space-y-3">
              {dashboardData.calendar.upcomingEvents.map((event, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-full rounded ${
                    event.type === 'sprint' ? 'bg-purple-500' : 
                    event.type === 'deadline' ? 'bg-red-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{event.title}</div>
                    <div className="text-xs text-gray-600">{new Date(event.date).toLocaleDateString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Recent Projects */}
          <div className="bg-white rounded-lg border p-6 col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Active Projects</h3>
              <Folder className="w-6 h-6 text-purple-600" />
            </div>
            <div className="space-y-3">
              {dashboardData.projects.recentProjects.map((project) => (
                <div key={project.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-gray-900">{project.name}</div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      project.status === 'active' ? 'bg-green-100 text-green-800' :
                      project.status === 'onhold' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold text-gray-900">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-purple-600 h-1.5 rounded-full" style={{width: `${project.progress}%`}}></div>
                  </div>
                  <div className="mt-2 text-xs text-gray-600">{project.bugs} open bugs</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Bugs */}
          <div className="bg-white rounded-lg border p-6 col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Recent Bugs</h3>
              <Bug className="w-6 h-6 text-red-600" />
            </div>
            <div className="space-y-3">
              {dashboardData.bugs.recentBugs.map((bug) => (
                <div key={bug.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition">
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-sm font-medium text-gray-900 line-clamp-1">{bug.title}</div>
                    <span className={`text-xs px-2 py-1 rounded whitespace-nowrap ml-2 ${
                      bug.priority === 'critical' ? 'bg-red-100 text-red-800' :
                      bug.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {bug.priority}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-purple-600">{bug.project}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      bug.status === 'fixed' ? 'bg-green-100 text-green-800' :
                      bug.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {bug.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performers */}
          <div className="bg-white rounded-lg border p-6 col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Top Performers</h3>
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="space-y-3">
              {dashboardData.team.topPerformers.map((performer, idx) => (
                <div key={idx} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold">
                    {performer.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{performer.name}</div>
                    <div className="text-sm text-gray-600">{performer.tasks} tasks completed</div>
                  </div>
                  <div className="text-2xl">
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
            <Activity className="w-6 h-6 text-blue-600" />
          </div>
          <div className="space-y-3">
            {dashboardData.activity.map((activity, idx) => (
              <div key={idx} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'bug' ? 'bg-red-100' :
                  activity.type === 'sprint' ? 'bg-purple-100' :
                  'bg-blue-100'
                }`}>
                  {activity.type === 'bug' ? <Bug className="w-5 h-5 text-red-600" /> :
                   activity.type === 'sprint' ? <Target className="w-5 h-5 text-purple-600" /> :
                   <CheckCircle className="w-5 h-5 text-blue-600" />}
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </div>
                  <div className="text-xs text-gray-500">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


const ReportsDashboard = () => {
    const [currentPage, setCurrentPage] = useState('dashboard');
  
    return (
      <div>
        {/* Navigation */}
        <div className="bg-purple-700 text-white p-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Project Management System</h1>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage('dashboard')}
                className={`px-4 py-2 rounded ${currentPage === 'dashboard' ? 'bg-white text-purple-700' : 'bg-purple-600 hover:bg-purple-500'}`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentPage('reports')}
                className={`px-4 py-2 rounded ${currentPage === 'reports' ? 'bg-white text-purple-700' : 'bg-purple-600 hover:bg-purple-500'}`}
              >
                Reports
              </button>
            </div>
          </div>
        </div>
  
        {/* Page Content */}
        {currentPage === 'dashboard' && <DashboardPage />}
        {currentPage === 'reports' && <ReportsPage />}
      </div>
    );
  };

  export default ReportsDashboard;