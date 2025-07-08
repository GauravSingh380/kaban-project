// MongoDB Schema Design
// Collection: users
const userSchema = {
    _id: ObjectId,
    name: String,
    email: String,
    role: String, // 'developer', 'manager', 'tester', etc.
    department: String,
    status: String, // 'active', 'inactive'
    createdAt: Date,
    updatedAt: Date
  };
  
  // Collection: projects
  const projectSchema = {
    _id: ObjectId,
    name: String,
    description: String,
    status: String, // 'active', 'completed', 'on-hold', 'cancelled'
    priority: String, // 'low', 'medium', 'high', 'critical'
    startDate: Date,
    endDate: Date,
    teamMembers: [ObjectId], // Array of user IDs
    createdAt: Date,
    updatedAt: Date
  };
  
  // Collection: tasks
  const taskSchema = {
    _id: ObjectId,
    title: String,
    description: String,
    projectId: ObjectId,
    assignedTo: ObjectId, // User ID
    assignedBy: ObjectId, // User ID
    status: String, // 'todo', 'in-progress', 'in-review', 'completed', 'blocked'
    priority: String, // 'low', 'medium', 'high', 'critical'
    estimatedHours: Number,
    actualHours: Number,
    dueDate: Date,
    completedDate: Date,
    createdAt: Date,
    updatedAt: Date
  };
  
  // Collection: bugs
  const bugSchema = {
    _id: ObjectId,
    title: String,
    description: String,
    projectId: ObjectId,
    reportedBy: ObjectId, // User ID
    assignedTo: ObjectId, // User ID
    status: String, // 'open', 'in-progress', 'fixed', 'closed', 'rejected'
    severity: String, // 'low', 'medium', 'high', 'critical'
    priority: String, // 'low', 'medium', 'high', 'critical'
    environment: String, // 'development', 'staging', 'production'
    reproductionSteps: String,
    expectedResult: String,
    actualResult: String,
    fixedDate: Date,
    createdAt: Date,
    updatedAt: Date
  };
  
  // Express.js API Implementation
  const express = require('express');
  const { MongoClient, ObjectId } = require('mongodb');
  const app = express();
  
  // MongoDB connection
  let db;
  MongoClient.connect('mongodb://localhost:27017/workload_management')
    .then(client => {
      db = client.db();
      console.log('Connected to MongoDB');
    })
    .catch(error => console.error('MongoDB connection error:', error));
  
  app.use(express.json());
  
  // API Endpoints
  
  // 1. Get comprehensive workload data for a specific user
  app.get('/api/users/:userId/workload', async (req, res) => {
    try {
      const userId = new ObjectId(req.params.userId);
      
      // Get user details
      const user = await db.collection('users').findOne({ _id: userId });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Aggregate workload data
      const workloadData = await Promise.all([
        // Get tasks assigned to user
        db.collection('tasks').aggregate([
          { $match: { assignedTo: userId } },
          {
            $group: {
              _id: '$status',
              count: { $sum: 1 },
              totalEstimatedHours: { $sum: '$estimatedHours' },
              totalActualHours: { $sum: '$actualHours' }
            }
          }
        ]).toArray(),
  
        // Get bugs assigned to user
        db.collection('bugs').aggregate([
          { $match: { assignedTo: userId } },
          {
            $group: {
              _id: '$status',
              count: { $sum: 1 }
            }
          }
        ]).toArray(),
  
        // Get projects where user is a team member
        db.collection('projects').find({ teamMembers: userId }).toArray(),
  
        // Get detailed task list
        db.collection('tasks').find({ assignedTo: userId })
          .sort({ createdAt: -1 })
          .toArray(),
  
        // Get detailed bug list
        db.collection('bugs').find({ assignedTo: userId })
          .sort({ createdAt: -1 })
          .toArray()
      ]);
  
      const [taskStats, bugStats, projects, tasks, bugs] = workloadData;
  
      // Process task statistics
      const taskSummary = {
        total: 0,
        todo: 0,
        inProgress: 0,
        inReview: 0,
        completed: 0,
        blocked: 0,
        totalEstimatedHours: 0,
        totalActualHours: 0
      };
  
      taskStats.forEach(stat => {
        taskSummary.total += stat.count;
        taskSummary[stat._id.replace('-', '')] = stat.count;
        taskSummary.totalEstimatedHours += stat.totalEstimatedHours || 0;
        taskSummary.totalActualHours += stat.totalActualHours || 0;
      });
  
      // Process bug statistics
      const bugSummary = {
        total: 0,
        open: 0,
        inProgress: 0,
        fixed: 0,
        closed: 0,
        rejected: 0
      };
  
      bugStats.forEach(stat => {
        bugSummary.total += stat.count;
        bugSummary[stat._id.replace('-', '')] = stat.count;
      });
  
      // Calculate remaining work
      const remainingTasks = taskSummary.todo + taskSummary.inProgress + taskSummary.inReview + taskSummary.blocked;
      const remainingBugs = bugSummary.open + bugSummary.inProgress;
  
      const response = {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department
        },
        workload: {
          tasks: taskSummary,
          bugs: bugSummary,
          projects: {
            total: projects.length,
            active: projects.filter(p => p.status === 'active').length,
            completed: projects.filter(p => p.status === 'completed').length
          },
          remaining: {
            tasks: remainingTasks,
            bugs: remainingBugs,
            total: remainingTasks + remainingBugs
          }
        },
        details: {
          tasks: tasks.map(task => ({
            id: task._id,
            title: task.title,
            status: task.status,
            priority: task.priority,
            estimatedHours: task.estimatedHours,
            actualHours: task.actualHours,
            dueDate: task.dueDate,
            projectId: task.projectId
          })),
          bugs: bugs.map(bug => ({
            id: bug._id,
            title: bug.title,
            status: bug.status,
            severity: bug.severity,
            priority: bug.priority,
            projectId: bug.projectId
          })),
          projects: projects.map(project => ({
            id: project._id,
            name: project.name,
            status: project.status,
            priority: project.priority
          }))
        }
      };
  
      res.json(response);
    } catch (error) {
      console.error('Error fetching workload:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // 2. Get workload summary for all users
  app.get('/api/workload/summary', async (req, res) => {
    try {
      const users = await db.collection('users').find({ status: 'active' }).toArray();
      
      const workloadSummary = await Promise.all(
        users.map(async (user) => {
          const [taskCount, bugCount, projectCount] = await Promise.all([
            db.collection('tasks').countDocuments({ 
              assignedTo: user._id, 
              status: { $in: ['todo', 'in-progress', 'in-review', 'blocked'] } 
            }),
            db.collection('bugs').countDocuments({ 
              assignedTo: user._id, 
              status: { $in: ['open', 'in-progress'] } 
            }),
            db.collection('projects').countDocuments({ 
              teamMembers: user._id, 
              status: 'active' 
            })
          ]);
  
          return {
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              department: user.department
            },
            workload: {
              activeTasks: taskCount,
              activeBugs: bugCount,
              activeProjects: projectCount,
              totalWorkload: taskCount + bugCount
            }
          };
        })
      );
  
      res.json(workloadSummary);
    } catch (error) {
      console.error('Error fetching workload summary:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // 3. Get workload by department
  app.get('/api/workload/department/:department', async (req, res) => {
    try {
      const department = req.params.department;
      
      const departmentWorkload = await db.collection('users').aggregate([
        { $match: { department, status: 'active' } },
        {
          $lookup: {
            from: 'tasks',
            localField: '_id',
            foreignField: 'assignedTo',
            as: 'tasks'
          }
        },
        {
          $lookup: {
            from: 'bugs',
            localField: '_id',
            foreignField: 'assignedTo',
            as: 'bugs'
          }
        },
        {
          $project: {
            name: 1,
            email: 1,
            role: 1,
            activeTasks: {
              $size: {
                $filter: {
                  input: '$tasks',
                  cond: { $in: ['$$this.status', ['todo', 'in-progress', 'in-review', 'blocked']] }
                }
              }
            },
            activeBugs: {
              $size: {
                $filter: {
                  input: '$bugs',
                  cond: { $in: ['$$this.status', ['open', 'in-progress']] }
                }
              }
            },
            totalTasks: { $size: '$tasks' },
            totalBugs: { $size: '$bugs' }
          }
        }
      ]).toArray();
  
      res.json({
        department,
        users: departmentWorkload,
        summary: {
          totalUsers: departmentWorkload.length,
          totalActiveTasks: departmentWorkload.reduce((sum, user) => sum + user.activeTasks, 0),
          totalActiveBugs: departmentWorkload.reduce((sum, user) => sum + user.activeBugs, 0)
        }
      });
    } catch (error) {
      console.error('Error fetching department workload:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // 4. Get overloaded users (users with high workload)
  app.get('/api/workload/overloaded', async (req, res) => {
    try {
      const threshold = parseInt(req.query.threshold) || 10; // Default threshold
      
      const overloadedUsers = await db.collection('users').aggregate([
        { $match: { status: 'active' } },
        {
          $lookup: {
            from: 'tasks',
            let: { userId: '$_id' },
            pipeline: [
              { $match: { 
                $expr: { $eq: ['$assignedTo', '$$userId'] },
                status: { $in: ['todo', 'in-progress', 'in-review', 'blocked'] }
              }}
            ],
            as: 'activeTasks'
          }
        },
        {
          $lookup: {
            from: 'bugs',
            let: { userId: '$_id' },
            pipeline: [
              { $match: { 
                $expr: { $eq: ['$assignedTo', '$$userId'] },
                status: { $in: ['open', 'in-progress'] }
              }}
            ],
            as: 'activeBugs'
          }
        },
        {
          $addFields: {
            totalWorkload: { $add: [{ $size: '$activeTasks' }, { $size: '$activeBugs' }] }
          }
        },
        { $match: { totalWorkload: { $gte: threshold } } },
        { $sort: { totalWorkload: -1 } },
        {
          $project: {
            name: 1,
            email: 1,
            role: 1,
            department: 1,
            activeTasks: { $size: '$activeTasks' },
            activeBugs: { $size: '$activeBugs' },
            totalWorkload: 1
          }
        }
      ]).toArray();
  
      res.json({
        threshold,
        overloadedUsers,
        count: overloadedUsers.length
      });
    } catch (error) {
      console.error('Error fetching overloaded users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // 5. Get workload trends (last 30 days)
  app.get('/api/workload/trends/:userId', async (req, res) => {
    try {
      const userId = new ObjectId(req.params.userId);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
      const trends = await Promise.all([
        // Tasks completed in last 30 days
        db.collection('tasks').aggregate([
          {
            $match: {
              assignedTo: userId,
              status: 'completed',
              completedDate: { $gte: thirtyDaysAgo }
            }
          },
          {
            $group: {
              _id: {
                year: { $year: '$completedDate' },
                month: { $month: '$completedDate' },
                day: { $dayOfMonth: '$completedDate' }
              },
              count: { $sum: 1 }
            }
          },
          { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
        ]).toArray(),
  
        // Bugs fixed in last 30 days
        db.collection('bugs').aggregate([
          {
            $match: {
              assignedTo: userId,
              status: 'fixed',
              fixedDate: { $gte: thirtyDaysAgo }
            }
          },
          {
            $group: {
              _id: {
                year: { $year: '$fixedDate' },
                month: { $month: '$fixedDate' },
                day: { $dayOfMonth: '$fixedDate' }
              },
              count: { $sum: 1 }
            }
          },
          { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
        ]).toArray()
      ]);
  
      res.json({
        userId,
        period: '30 days',
        trends: {
          tasksCompleted: trends[0],
          bugsFixed: trends[1]
        }
      });
    } catch (error) {
      console.error('Error fetching workload trends:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Start server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Workload Management API running on port ${PORT}`);
  });
  
  // Example usage and testing
  /*
  // Test the API endpoints:
  
  // 1. Get specific user workload
  GET /api/users/60d5ecb54d23c44b8c8d3f1a/workload
  
  // 2. Get all users workload summary
  GET /api/workload/summary
  
  // 3. Get department workload
  GET /api/workload/department/Engineering
  
  // 4. Get overloaded users
  GET /api/workload/overloaded?threshold=15
  
  // 5. Get workload trends
  GET /api/workload/trends/60d5ecb54d23c44b8c8d3f1a
  */



//   I'll help you design a comprehensive API for workload management with MongoDB. Let me create a complete solution that covers the database schema, API endpoints, and implementation details.I've created a comprehensive workload management API with MongoDB that addresses all your requirements. Here's what the solution includes:

//   ## Key Features:
  
//   1. **Complete Database Schema** - Collections for users, projects, tasks, and bugs with proper relationships
//   2. **Individual User Workload** - Get complete workload data for any user including tasks, bugs, projects, and remaining work
//   3. **Team Analytics** - Department-wise workload distribution and overloaded user detection
//   4. **Trend Analysis** - Track productivity trends over time
  
//   ## Main API Endpoints:
  
//   - **`GET /api/users/:userId/workload`** - Comprehensive workload data for a specific user
//   - **`GET /api/workload/summary`** - Overview of all users' workload
//   - **`GET /api/workload/department/:department`** - Department-wise workload analysis
//   - **`GET /api/workload/overloaded`** - Identify users with high workload
//   - **`GET /api/workload/trends/:userId`** - Track user productivity trends
  
//   ## The API provides:
  
//   ✅ **Task Management**: Total tasks, status breakdown, estimated vs actual hours
//   ✅ **Bug Tracking**: Bug counts by status and severity
//   ✅ **Project Involvement**: Active projects for each user
//   ✅ **Remaining Work**: Clear view of pending tasks and bugs
//   ✅ **Performance Metrics**: Completion rates and productivity trends
//   ✅ **Team Analytics**: Department-wise workload distribution
  
//   ## MongoDB Collections Structure:
  
//   - **Users**: Personal info, roles, departments
//   - **Projects**: Project details with team members
//   - **Tasks**: Individual tasks with assignments and status
//   - **Bugs**: Bug reports with severity and assignments
  
//   The API uses MongoDB aggregation pipelines for efficient data processing and provides detailed workload insights that can help with resource planning and workload balancing across your team.
  
//   Would you like me to add any specific features or modify the API structure for your particular use case?