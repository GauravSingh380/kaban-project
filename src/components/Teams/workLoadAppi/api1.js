// ================================
// 1. DATABASE SCHEMA DESIGN
// ================================

// Users Table
const users = {
    id: 'UUID',
    name: 'string',
    email: 'string',
    role: 'string',
    department: 'string',
    capacity_hours_per_week: 'number', // e.g., 40 hours
    skill_level: 'number', // 1-10 scale
    created_at: 'timestamp',
    updated_at: 'timestamp'
  };
  
  // Projects Table
  const projects = {
    id: 'UUID',
    name: 'string',
    description: 'text',
    priority: 'enum[low, medium, high, critical]',
    status: 'enum[planning, active, on_hold, completed, cancelled]',
    start_date: 'date',
    end_date: 'date',
    created_at: 'timestamp'
  };
  
  // Tasks Table
  const tasks = {
    id: 'UUID',
    project_id: 'UUID',
    assigned_to: 'UUID',
    title: 'string',
    description: 'text',
    status: 'enum[todo, in_progress, in_review, completed, cancelled]',
    priority: 'enum[low, medium, high, critical]',
    estimated_hours: 'number',
    actual_hours: 'number',
    story_points: 'number', // For agile teams
    due_date: 'date',
    created_at: 'timestamp',
    completed_at: 'timestamp'
  };
  
  // Bugs Table
  const bugs = {
    id: 'UUID',
    project_id: 'UUID',
    assigned_to: 'UUID',
    reported_by: 'UUID',
    title: 'string',
    description: 'text',
    severity: 'enum[low, medium, high, critical]',
    status: 'enum[open, in_progress, resolved, closed, rejected]',
    priority: 'enum[low, medium, high, critical]',
    estimated_fix_hours: 'number',
    actual_fix_hours: 'number',
    due_date: 'date',
    created_at: 'timestamp',
    resolved_at: 'timestamp'
  };
  
  // Time Logs Table (for tracking actual work)
  const time_logs = {
    id: 'UUID',
    user_id: 'UUID',
    task_id: 'UUID',
    bug_id: 'UUID',
    hours_logged: 'number',
    description: 'text',
    date: 'date',
    created_at: 'timestamp'
  };
  
  // ================================
  // 2. API ENDPOINTS
  // ================================
  
  // Express.js API Implementation
  const express = require('express');
  const { Pool } = require('pg');
  const app = express();
  
  // Database connection
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });
  
  // ================================
  // 3. WORKLOAD CALCULATION FUNCTIONS
  // ================================
  
  class WorkloadCalculator {
    
    // Calculate workload percentage based on capacity
    static calculateWorkloadPercentage(totalHours, capacityHours) {
      return Math.min(Math.round((totalHours / capacityHours) * 100), 100);
    }
  
    // Get workload color based on percentage
    static getWorkloadColor(percentage) {
      if (percentage >= 90) return { color: '#DC2626', bg: '#FEF2F2' }; // Red
      if (percentage >= 80) return { color: '#EA580C', bg: '#FFF7ED' }; // Orange
      if (percentage >= 70) return { color: '#D97706', bg: '#FFFBEB' }; // Amber
      if (percentage >= 50) return { color: '#16A34A', bg: '#F0FDF4' }; // Green
      return { color: '#059669', bg: '#ECFDF5' }; // Emerald
    }
  
    // Calculate story points velocity
    static calculateVelocity(completedStoryPoints, weeks) {
      return weeks > 0 ? Math.round(completedStoryPoints / weeks) : 0;
    }
  }
  
  // ================================
  // 4. MAIN WORKLOAD API ENDPOINT
  // ================================
  
  app.get('/api/users/:userId/workload', async (req, res) => {
    try {
      const { userId } = req.params;
      const { 
        timeframe = '30', // days
        include_completed = 'false',
        priority_filter = 'all'
      } = req.query;
  
      // Get user info
      const userQuery = `
        SELECT id, name, email, role, department, capacity_hours_per_week, skill_level
        FROM users 
        WHERE id = $1
      `;
      const userResult = await pool.query(userQuery, [userId]);
      
      if (userResult.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const user = userResult.rows[0];
      const capacityHours = user.capacity_hours_per_week;
  
      // Calculate date range
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - parseInt(timeframe));
  
      // Build priority filter
      let priorityCondition = '';
      if (priority_filter !== 'all') {
        priorityCondition = `AND priority = '${priority_filter}'`;
      }
  
      // Build status filter
      const statusCondition = include_completed === 'true' 
        ? '' 
        : `AND status NOT IN ('completed', 'resolved', 'closed', 'cancelled')`;
  
      // Get tasks data
      const tasksQuery = `
        SELECT 
          COUNT(*) as total_tasks,
          COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_tasks,
          COUNT(CASE WHEN status = 'in_progress' THEN 1 END) as in_progress_tasks,
          COUNT(CASE WHEN status = 'todo' THEN 1 END) as pending_tasks,
          COUNT(CASE WHEN due_date < NOW() AND status NOT IN ('completed', 'cancelled') THEN 1 END) as overdue_tasks,
          SUM(estimated_hours) as total_estimated_hours,
          SUM(actual_hours) as total_actual_hours,
          SUM(story_points) as total_story_points,
          SUM(CASE WHEN status = 'completed' THEN story_points ELSE 0 END) as completed_story_points,
          AVG(CASE WHEN status = 'completed' THEN actual_hours ELSE NULL END) as avg_completion_time
        FROM tasks 
        WHERE assigned_to = $1 
        AND created_at >= $2 
        AND created_at <= $3
        ${priorityCondition}
        ${statusCondition}
      `;
  
      const tasksResult = await pool.query(tasksQuery, [userId, startDate, endDate]);
      const tasksData = tasksResult.rows[0];
  
      // Get bugs data
      const bugsQuery = `
        SELECT 
          COUNT(*) as total_bugs,
          COUNT(CASE WHEN status = 'resolved' THEN 1 END) as resolved_bugs,
          COUNT(CASE WHEN status = 'in_progress' THEN 1 END) as in_progress_bugs,
          COUNT(CASE WHEN status = 'open' THEN 1 END) as open_bugs,
          COUNT(CASE WHEN due_date < NOW() AND status NOT IN ('resolved', 'closed', 'rejected') THEN 1 END) as overdue_bugs,
          SUM(estimated_fix_hours) as total_estimated_fix_hours,
          SUM(actual_fix_hours) as total_actual_fix_hours,
          COUNT(CASE WHEN severity = 'critical' THEN 1 END) as critical_bugs,
          COUNT(CASE WHEN severity = 'high' THEN 1 END) as high_priority_bugs
        FROM bugs 
        WHERE assigned_to = $1 
        AND created_at >= $2 
        AND created_at <= $3
        ${priorityCondition}
        ${statusCondition}
      `;
  
      const bugsResult = await pool.query(bugsQuery, [userId, startDate, endDate]);
      const bugsData = bugsResult.rows[0];
  
      // Get projects data
      const projectsQuery = `
        SELECT 
          COUNT(DISTINCT p.id) as total_projects,
          COUNT(DISTINCT CASE WHEN p.status = 'active' THEN p.id END) as active_projects,
          COUNT(DISTINCT CASE WHEN p.status = 'completed' THEN p.id END) as completed_projects,
          STRING_AGG(DISTINCT p.name, ', ') as project_names
        FROM projects p
        JOIN tasks t ON p.id = t.project_id
        WHERE t.assigned_to = $1
        AND t.created_at >= $2 
        AND t.created_at <= $3
      `;
  
      const projectsResult = await pool.query(projectsQuery, [userId, startDate, endDate]);
      const projectsData = projectsResult.rows[0];
  
      // Get time logs for actual hours worked
      const timeLogsQuery = `
        SELECT 
          SUM(hours_logged) as total_hours_logged,
          COUNT(*) as total_log_entries,
          AVG(hours_logged) as avg_hours_per_day
        FROM time_logs 
        WHERE user_id = $1 
        AND date >= $2 
        AND date <= $3
      `;
  
      const timeLogsResult = await pool.query(timeLogsQuery, [userId, startDate, endDate]);
      const timeLogsData = timeLogsResult.rows[0];
  
      // Calculate workload metrics
      const totalEstimatedHours = (parseFloat(tasksData.total_estimated_hours) || 0) + 
                                 (parseFloat(bugsData.total_estimated_fix_hours) || 0);
      
      const totalActualHours = (parseFloat(tasksData.total_actual_hours) || 0) + 
                              (parseFloat(bugsData.total_actual_fix_hours) || 0);
  
      const weeksInTimeframe = parseInt(timeframe) / 7;
      const totalCapacityHours = capacityHours * weeksInTimeframe;
  
      const workloadPercentage = WorkloadCalculator.calculateWorkloadPercentage(
        totalEstimatedHours, 
        totalCapacityHours
      );
  
      const workloadColors = WorkloadCalculator.getWorkloadColor(workloadPercentage);
  
      // Calculate velocity
      const velocity = WorkloadCalculator.calculateVelocity(
        parseInt(tasksData.completed_story_points) || 0,
        weeksInTimeframe
      );
  
      // Calculate efficiency
      const efficiency = totalActualHours > 0 
        ? Math.round((totalEstimatedHours / totalActualHours) * 100)
        : 0;
  
      // Build response
      const workloadData = {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department,
          capacity_hours_per_week: user.capacity_hours_per_week,
          skill_level: user.skill_level
        },
        timeframe: {
          days: parseInt(timeframe),
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString()
        },
        workload: {
          percentage: workloadPercentage,
          color: workloadColors.color,
          background_color: workloadColors.bg,
          status: workloadPercentage >= 90 ? 'overloaded' : 
                  workloadPercentage >= 80 ? 'high' :
                  workloadPercentage >= 50 ? 'normal' : 'light',
          total_estimated_hours: totalEstimatedHours,
          total_actual_hours: totalActualHours,
          total_capacity_hours: totalCapacityHours,
          efficiency_percentage: efficiency
        },
        tasks: {
          total: parseInt(tasksData.total_tasks) || 0,
          completed: parseInt(tasksData.completed_tasks) || 0,
          in_progress: parseInt(tasksData.in_progress_tasks) || 0,
          pending: parseInt(tasksData.pending_tasks) || 0,
          overdue: parseInt(tasksData.overdue_tasks) || 0,
          completion_rate: tasksData.total_tasks > 0 
            ? Math.round((tasksData.completed_tasks / tasksData.total_tasks) * 100)
            : 0,
          estimated_hours: parseFloat(tasksData.total_estimated_hours) || 0,
          actual_hours: parseFloat(tasksData.total_actual_hours) || 0,
          story_points: {
            total: parseInt(tasksData.total_story_points) || 0,
            completed: parseInt(tasksData.completed_story_points) || 0,
            velocity: velocity
          },
          avg_completion_time: parseFloat(tasksData.avg_completion_time) || 0
        },
        bugs: {
          total: parseInt(bugsData.total_bugs) || 0,
          resolved: parseInt(bugsData.resolved_bugs) || 0,
          in_progress: parseInt(bugsData.in_progress_bugs) || 0,
          open: parseInt(bugsData.open_bugs) || 0,
          overdue: parseInt(bugsData.overdue_bugs) || 0,
          resolution_rate: bugsData.total_bugs > 0 
            ? Math.round((bugsData.resolved_bugs / bugsData.total_bugs) * 100)
            : 0,
          estimated_fix_hours: parseFloat(bugsData.total_estimated_fix_hours) || 0,
          actual_fix_hours: parseFloat(bugsData.total_actual_fix_hours) || 0,
          severity_breakdown: {
            critical: parseInt(bugsData.critical_bugs) || 0,
            high: parseInt(bugsData.high_priority_bugs) || 0
          }
        },
        projects: {
          total: parseInt(projectsData.total_projects) || 0,
          active: parseInt(projectsData.active_projects) || 0,
          completed: parseInt(projectsData.completed_projects) || 0,
          names: projectsData.project_names ? projectsData.project_names.split(', ') : []
        },
        time_tracking: {
          total_hours_logged: parseFloat(timeLogsData.total_hours_logged) || 0,
          total_log_entries: parseInt(timeLogsData.total_log_entries) || 0,
          avg_hours_per_day: parseFloat(timeLogsData.avg_hours_per_day) || 0
        },
        performance_metrics: {
          productivity_score: Math.round((
            (workloadPercentage * 0.3) + 
            (efficiency * 0.3) + 
            (tasksData.completion_rate * 0.4)
          )),
          burnout_risk: workloadPercentage >= 95 ? 'high' : 
                       workloadPercentage >= 85 ? 'medium' : 'low',
          recommended_action: workloadPercentage >= 95 ? 'reduce_workload' :
                             workloadPercentage >= 85 ? 'monitor_closely' :
                             workloadPercentage < 50 ? 'can_take_more' : 'maintain'
        }
      };
  
      res.json(workloadData);
  
    } catch (error) {
      console.error('Error calculating workload:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // ================================
  // 5. ADDITIONAL HELPER ENDPOINTS
  // ================================
  
  // Get team workload summary
  app.get('/api/teams/:teamId/workload', async (req, res) => {
    try {
      const { teamId } = req.params;
      
      // Get all team members
      const membersQuery = `
        SELECT u.id, u.name, u.capacity_hours_per_week
        FROM users u
        JOIN team_members tm ON u.id = tm.user_id
        WHERE tm.team_id = $1
      `;
      
      const membersResult = await pool.query(membersQuery, [teamId]);
      const members = membersResult.rows;
      
      // Calculate workload for each member
      const memberWorkloads = await Promise.all(
        members.map(async (member) => {
          // Similar calculation as above, but simplified
          const workloadQuery = `
            SELECT 
              SUM(t.estimated_hours) + COALESCE(SUM(b.estimated_fix_hours), 0) as total_hours
            FROM tasks t
            LEFT JOIN bugs b ON b.assigned_to = t.assigned_to
            WHERE t.assigned_to = $1
            AND t.status NOT IN ('completed', 'cancelled')
          `;
          
          const result = await pool.query(workloadQuery, [member.id]);
          const totalHours = parseFloat(result.rows[0].total_hours) || 0;
          const percentage = WorkloadCalculator.calculateWorkloadPercentage(
            totalHours, 
            member.capacity_hours_per_week
          );
          
          return {
            user_id: member.id,
            name: member.name,
            workload_percentage: percentage,
            total_hours: totalHours,
            capacity_hours: member.capacity_hours_per_week,
            status: percentage >= 90 ? 'overloaded' : 
                   percentage >= 80 ? 'high' :
                   percentage >= 50 ? 'normal' : 'light'
          };
        })
      );
      
      // Calculate team averages
      const avgWorkload = memberWorkloads.reduce((sum, m) => sum + m.workload_percentage, 0) / memberWorkloads.length;
      const overloadedCount = memberWorkloads.filter(m => m.workload_percentage >= 90).length;
      
      res.json({
        team_id: teamId,
        total_members: members.length,
        average_workload: Math.round(avgWorkload),
        overloaded_members: overloadedCount,
        underutilized_members: memberWorkloads.filter(m => m.workload_percentage < 50).length,
        member_workloads: memberWorkloads
      });
      
    } catch (error) {
      console.error('Error calculating team workload:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Get workload trends
  app.get('/api/users/:userId/workload/trends', async (req, res) => {
    try {
      const { userId } = req.params;
      const { weeks = '12' } = req.query;
      
      const trends = [];
      
      for (let i = parseInt(weeks) - 1; i >= 0; i--) {
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - (i * 7));
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        
        const weeklyQuery = `
          SELECT 
            COUNT(CASE WHEN type = 'task' THEN 1 END) as tasks_completed,
            COUNT(CASE WHEN type = 'bug' THEN 1 END) as bugs_resolved,
            SUM(hours_logged) as hours_worked
          FROM (
            SELECT 'task' as type, completed_at as date, actual_hours as hours_logged
            FROM tasks 
            WHERE assigned_to = $1 AND completed_at BETWEEN $2 AND $3
            UNION ALL
            SELECT 'bug' as type, resolved_at as date, actual_fix_hours as hours_logged
            FROM bugs 
            WHERE assigned_to = $1 AND resolved_at BETWEEN $2 AND $3
          ) combined
        `;
        
        const result = await pool.query(weeklyQuery, [userId, weekStart, weekEnd]);
        const weekData = result.rows[0];
        
        trends.push({
          week_start: weekStart.toISOString().split('T')[0],
          week_end: weekEnd.toISOString().split('T')[0],
          tasks_completed: parseInt(weekData.tasks_completed) || 0,
          bugs_resolved: parseInt(weekData.bugs_resolved) || 0,
          hours_worked: parseFloat(weekData.hours_worked) || 0
        });
      }
      
      res.json({ trends });
      
    } catch (error) {
      console.error('Error getting workload trends:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Export the app
  module.exports = app;
  
  // ================================
  // 6. USAGE EXAMPLES
  // ================================
  
  /*
  API Usage Examples:
  
  1. Get individual workload:
  GET /api/users/123/workload?timeframe=30&include_completed=false&priority_filter=high
  
  2. Get team workload:
  GET /api/teams/456/workload
  
  3. Get workload trends:
  GET /api/users/123/workload/trends?weeks=8
  
  4. Response example:
  {
    "user": {
      "id": "123",
      "name": "John Doe",
      "email": "john@company.com",
      "role": "Senior Developer",
      "department": "Engineering",
      "capacity_hours_per_week": 40,
      "skill_level": 8
    },
    "workload": {
      "percentage": 85,
      "color": "#EA580C",
      "background_color": "#FFF7ED",
      "status": "high",
      "total_estimated_hours": 68,
      "total_actual_hours": 72,
      "total_capacity_hours": 80,
      "efficiency_percentage": 94
    },
    "tasks": {
      "total": 12,
      "completed": 8,
      "in_progress": 3,
      "pending": 1,
      "overdue": 2,
      "completion_rate": 67
    },
    "bugs": {
      "total": 5,
      "resolved": 3,
      "in_progress": 1,
      "open": 1,
      "overdue": 1,
      "resolution_rate": 60
    },
    "projects": {
      "total": 3,
      "active": 2,
      "completed": 1,
      "names": ["E-commerce Platform", "API Integration", "Security Audit"]
    },
    "performance_metrics": {
      "productivity_score": 78,
      "burnout_risk": "medium",
      "recommended_action": "monitor_closely"
    }
  }
  */