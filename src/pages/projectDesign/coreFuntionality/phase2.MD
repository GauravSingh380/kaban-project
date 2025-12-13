# 🚀 Phase 2: Core Functionality - Integration Guide

## ✅ Components Completed

### 1. **Issues/Bug Management** 
- Full CRUD operations for bugs
- Sprint assignment
- Project and team member linking
- Priority and status management
- Environment tracking (demo/prod/staging)
- Bulk operations (delete multiple)
- Advanced filtering (project, status, priority, sprint)
- Export functionality
- Statistics dashboard

### 2. **Sprints Management**
- Sprint planning and tracking
- Status management (planned → active → completed)
- Story points tracking
- Bug resolution metrics
- Progress bars for completion
- Backlog management
- Sprint goals and timelines
- Project-based filtering

### 3. **Calendar Module**
- Monthly calendar view
- Event creation and management
- Multiple event types (meeting, sprint, demo, deadline, review)
- Integration with sprints and deadlines
- Upcoming events sidebar
- Time and location tracking
- Project-based events

---

## 🔗 Integration Points

### **Issues ↔ Sprints**

```javascript
// In Issues Module
// When creating/editing a bug, assign it to a sprint
const bug = {
  ...bugData,
  sprint: 'Sprint 5', // Sprint name
  sprintId: 'sprint-5' // Sprint ID for better lookup
};

// In Sprints Module
// Get all bugs for a sprint
const getSprintBugs = (sprintId) => {
  return bugs.filter(b => b.sprintId === sprintId);
};

// Update sprint metrics when bugs change status
const updateSprintMetrics = (sprintId) => {
  const sprintBugs = getSprintBugs(sprintId);
  return {
    totalBugs: sprintBugs.length,
    openBugs: sprintBugs.filter(b => b.status === 'open').length,
    inProgressBugs: sprintBugs.filter(b => b.status === 'in-progress').length,
    completedBugs: sprintBugs.filter(b => b.status === 'fixed' || b.status === 'closed').length
  };
};
```

### **Sprints ↔ Calendar**

```javascript
// In Calendar Module
// Auto-create events when sprints are created/updated
const createSprintEvents = (sprint) => {
  const events = [];
  
  // Sprint start event
  events.push({
    id: `event-sprint-start-${sprint.id}`,
    title: `${sprint.name} - Start`,
    type: 'sprint',
    date: sprint.startDate,
    time: '9:00 AM',
    project: sprint.project,
    description: sprint.goal
  });
  
  // Sprint end deadline
  events.push({
    id: `event-sprint-end-${sprint.id}`,
    title: `${sprint.name} - Deadline`,
    type: 'deadline',
    date: sprint.endDate,
    time: '11:59 PM',
    project: sprint.project,
    description: `${sprint.name} completion deadline`
  });
  
  return events;
};

// When sprint status changes, update calendar events
const updateSprintEvents = (sprint) => {
  if (sprint.status === 'completed') {
    // Add a demo/review event
    return {
      id: `event-sprint-demo-${sprint.id}`,
      title: `${sprint.name} - Demo`,
      type: 'demo',
      date: sprint.endDate,
      time: '3:00 PM',
      project: sprint.project,
      description: `Showcase ${sprint.name} achievements`
    };
  }
};
```

### **Issues ↔ Calendar**

```javascript
// In Calendar Module
// Show bug deadline events
const createBugDeadlineEvent = (bug) => {
  if (bug.priority === 'critical') {
    return {
      id: `event-bug-${bug.id}`,
      title: `Bug Fix: ${bug.title}`,
      type: 'deadline',
      date: bug.dueDate, // Add dueDate field to bugs
      project: bug.project,
      description: `Critical bug must be fixed: ${bug.title}`
    };
  }
};
```

---

## 📊 Enhanced Data Structures

### **Updated Bug Structure**
```javascript
{
  id: 'bug-1',
  bugId: 'bug-1',
  slNo: 1,
  title: 'Bug title',
  description: 'Bug description',
  project: 'TWR',
  projectId: 'proj-1',
  priority: 'high',
  status: 'open',
  reportedBy: 'Ashok reddy',
  reportedById: 'user-3',
  assignedTo: 'Gaurav Singh',
  assignedToId: 'user-1',
  reportedOn: '2025-12-13',
  updatedAt: '2025-12-13',
  issueEnv: ['demo', 'prod'],
  comments: 'Additional notes',
  sprint: 'Sprint 5', // NEW: Sprint assignment
  sprintId: 'sprint-5', // NEW: Sprint ID
  dueDate: '2025-12-20' // NEW: For calendar integration
}
```

### **Sprint Structure**
```javascript
{
  id: 'sprint-5',
  name: 'Sprint 5',
  goal: 'Complete user authentication features',
  startDate: '2025-12-09',
  endDate: '2025-12-22',
  status: 'active', // planned | active | completed | cancelled
  project: 'TWR',
  projectId: 'proj-1',
  totalStoryPoints: 34,
  completedStoryPoints: 18,
  totalBugs: 8, // Auto-calculated from bugs
  completedBugs: 3,
  inProgressBugs: 3,
  openBugs: 2,
  teamMembers: ['user-1', 'user-2', 'user-4']
}
```

### **Calendar Event Structure**
```javascript
{
  id: 'event-1',
  title: 'Sprint 5 Planning',
  type: 'sprint', // meeting | sprint | demo | deadline | review | other
  date: '2025-12-09',
  time: '10:00 AM',
  duration: '2 hours',
  location: 'Conference Room A',
  attendees: ['Gaurav Singh', 'Priya Sharma'],
  project: 'TWR',
  projectId: 'proj-1',
  description: 'Plan tasks for Sprint 5',
  relatedTo: 'sprint-5', // Links to sprint/bug
  relatedType: 'sprint' // sprint | bug | project
}
```

---

## 🔄 Real-time Updates Flow

### **Scenario 1: Creating a Sprint**
```javascript
// 1. User creates a sprint in Sprints module
const newSprint = createSprint({
  name: 'Sprint 6',
  startDate: '2025-12-23',
  endDate: '2026-01-05',
  project: 'TWR'
});

// 2. Auto-create calendar events
const calendarEvents = createSprintEvents(newSprint);
calendarEvents.forEach(event => addEvent(event));

// 3. Update project's active sprints count
updateProject(newSprint.projectId, {
  activeSprints: project.activeSprints + 1
});
```

### **Scenario 2: Assigning Bug to Sprint**
```javascript
// 1. User assigns bug to sprint in Issues module
updateBug(bugId, { 
  sprint: 'Sprint 5', 
  sprintId: 'sprint-5' 
});

// 2. Update sprint metrics
const sprintMetrics = updateSprintMetrics('sprint-5');
updateSprint('sprint-5', sprintMetrics);

// 3. Update team member's bug count
const assignee = teamMembers.find(m => m.id === bug.assignedToId);
updateTeamMember(bug.assignedToId, {
  assignedBugs: assignee.assignedBugs + 1
});
```

### **Scenario 3: Completing a Bug**
```javascript
// 1. User marks bug as fixed
updateBug(bugId, { status: 'fixed' });

// 2. Update sprint progress
const sprint = sprints.find(s => s.id === bug.sprintId);
updateSprint(bug.sprintId, {
  completedBugs: sprint.completedBugs + 1,
  inProgressBugs: sprint.inProgressBugs - 1
});

// 3. Update team member stats
updateTeamMember(bug.assignedToId, {
  assignedBugs: member.assignedBugs - 1,
  resolvedBugs: member.resolvedBugs + 1
});

// 4. Update project bug count
updateProject(bug.projectId, {
  openBugs: project.openBugs - 1
});
```

---

## 🛠️ Context Implementation

### **Enhanced AppContext**
```javascript
import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [bugs, setBugs] = useState([]);
  const [sprints, setSprints] = useState([]);
  const [events, setEvents] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Bugs CRUD with auto-updates
  const addBug = (bugData) => {
    const newBug = { ...bugData, id: `bug-${Date.now()}` };
    setBugs([...bugs, newBug]);
    
    // Update sprint metrics
    if (bugData.sprintId) {
      const sprint = sprints.find(s => s.id === bugData.sprintId);
      updateSprint(bugData.sprintId, {
        totalBugs: sprint.totalBugs + 1,
        openBugs: bugData.status === 'open' ? sprint.openBugs + 1 : sprint.openBugs
      });
    }
    
    // Update team member
    if (bugData.assignedToId) {
      const member = teamMembers.find(m => m.id === bugData.assignedToId);
      updateTeamMember(bugData.assignedToId, {
        assignedBugs: member.assignedBugs + 1
      });
    }
    
    // Update project
    const project = projects.find(p => p.id === bugData.projectId);
    updateProject(bugData.projectId, {
      totalBugs: project.totalBugs + 1,
      openBugs: bugData.status === 'open' ? project.openBugs + 1 : project.openBugs
    });
    
    return newBug;
  };

  const updateBug = (id, updates) => {
    const oldBug = bugs.find(b => b.id === id);
    setBugs(bugs.map(b => b.id === id ? { ...b, ...updates } : b));
    
    // If status changed, update metrics
    if (updates.status && oldBug.status !== updates.status) {
      handleBugStatusChange(oldBug, updates.status);
    }
  };

  const handleBugStatusChange = (bug, newStatus) => {
    // Update sprint
    if (bug.sprintId) {
      const sprint = sprints.find(s => s.id === bug.sprintId);
      const metrics = calculateSprintMetrics(bug.sprintId, bug.id, newStatus);
      updateSprint(bug.sprintId, metrics);
    }
    
    // Update team member
    if (newStatus === 'fixed' || newStatus === 'closed') {
      const member = teamMembers.find(m => m.id === bug.assignedToId);
      updateTeamMember(bug.assignedToId, {
        assignedBugs: member.assignedBugs - 1,
        resolvedBugs: member.resolvedBugs + 1
      });
    }
  };

  // Sprints CRUD with auto-calendar events
  const addSprint = (sprintData) => {
    const newSprint = { ...sprintData, id: `sprint-${Date.now()}` };
    setSprints([...sprints, newSprint]);
    
    // Create calendar events
    const calendarEvents = [
      {
        id: `event-sprint-start-${newSprint.id}`,
        title: `${newSprint.name} - Start`,
        type: 'sprint',
        date: newSprint.startDate,
        time: '9:00 AM',
        project: newSprint.project,
        relatedTo: newSprint.id,
        relatedType: 'sprint'
      },
      {
        id: `event-sprint-end-${newSprint.id}`,
        title: `${newSprint.name} - Deadline`,
        type: 'deadline',
        date: newSprint.endDate,
        time: '11:59 PM',
        project: newSprint.project,
        relatedTo: newSprint.id,
        relatedType: 'sprint'
      }
    ];
    
    setEvents([...events, ...calendarEvents]);
    return newSprint;
  };

  // Helper functions
  const getSprintBugs = (sprintId) => {
    return bugs.filter(b => b.sprintId === sprintId);
  };

  const getProjectSprints = (projectId) => {
    return sprints.filter(s => s.projectId === projectId);
  };

  const calculateSprintMetrics = (sprintId) => {
    const sprintBugs = getSprintBugs(sprintId);
    return {
      totalBugs: sprintBugs.length,
      openBugs: sprintBugs.filter(b => b.status === 'open').length,
      inProgressBugs: sprintBugs.filter(b => b.status === 'in-progress').length,
      completedBugs: sprintBugs.filter(b => ['fixed', 'closed'].includes(b.status)).length
    };
  };

  const value = {
    // State
    projects, teamMembers, bugs, sprints, events, currentUser,
    
    // Setters
    setProjects, setTeamMembers, setBugs, setSprints, setEvents,
    
    // CRUD operations
    addBug, updateBug, deleteBug,
    addSprint, updateSprint, deleteSprint,
    addEvent, updateEvent, deleteEvent,
    
    // Helper functions
    getSprintBugs,
    getProjectSprints,
    calculateSprintMetrics
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
```

---

## 📋 Integration Checklist

- [ ] **Issues Module**
  - [ ] Link bugs to projects (dropdown)
  - [ ] Link bugs to team members (assignee dropdown)
  - [ ] Link bugs to sprints (sprint dropdown)
  - [ ] Update sprint metrics when bug status changes
  - [ ] Update team member stats when bugs assigned/resolved
  - [ ] Update project bug counts

- [ ] **Sprints Module**
  - [ ] Link sprints to projects
  - [ ] Auto-calculate bug metrics from Issues
  - [ ] Show bugs assigned to sprint
  - [ ] Update progress bars based on bug status
  - [ ] Create calendar events when sprint created/updated

- [ ] **Calendar Module**
  - [ ] Auto-create events for sprint starts/ends
  - [ ] Auto-create events for critical bug deadlines
  - [ ] Link events to projects
  - [ ] Show events in upcoming sidebar
  - [ ] Allow manual event creation for meetings/demos

- [ ] **Cross-Module Updates**
  - [ ] When bug status changes → update sprint + team + project
  - [ ] When sprint created → create calendar events
  - [ ] When sprint completed → create demo event
  - [ ] When critical bug created → create deadline event

---

## 🎯 Next Steps

1. **Implement Context API** - Centralize state management
2. **Connect Components** - Use context hooks in all modules
3. **Add Real-time Updates** - Ensure all metrics update automatically
4. **Test Integration** - Create a bug, assign to sprint, mark as fixed - verify all updates
5. **Add Notifications** - Toast messages when actions complete
6. **Build Dashboard** - Aggregate all this data into overview

Your Phase 2 is complete! All components are ready for integration. 🎉