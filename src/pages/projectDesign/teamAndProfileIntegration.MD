# 🔗 Integration Guide for Project Management System

## 📊 Data Structure Overview

### 1. **Projects Data Structure**
```javascript
{
  id: 'proj-1',
  name: 'TWR',
  code: 'TWR',
  description: 'Training and Workshop Registration system',
  status: 'active', // planning | active | onhold | completed | archived
  startDate: '2024-01-15',
  endDate: '2025-06-30',
  manager: 'Gaurav Singh',
  managerId: 'user-1', // ← Link to Team Member
  teamSize: 8,
  teamMembers: ['user-1', 'user-2', 'user-4'], // ← Array of team member IDs
  totalBugs: 4,
  openBugs: 3,
  completionPercentage: 65,
  color: 'purple'
}
```

### 2. **Team Members Data Structure**
```javascript
{
  id: 'user-1',
  name: 'Gaurav Singh',
  email: 'gaurav.singh@company.com',
  phone: '+91 98765 43210',
  role: 'super-admin', // super-admin | admin | developer | tester | viewer
  designation: 'Senior Full Stack Developer',
  department: 'Engineering',
  projects: ['TWR', 'ECP'], // ← Array of project codes they're working on
  assignedBugs: 5, // ← Count of bugs assigned to this user
  resolvedBugs: 23,
  joinDate: '2023-01-15',
  status: 'active', // active | inactive
  skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
  avatar: 'url',
  location: 'Delhi, India'
}
```

### 3. **Issues/Bugs Data Structure** (Your existing structure)
```javascript
{
  id: 'bug-1',
  bugId: 'bug-1',
  slNo: 1,
  title: 'Bug title',
  description: 'Bug description',
  project: 'TWR', // ← Link to Projects (by code)
  projectId: 'proj-1', // ← Link to Projects (by ID)
  priority: 'high', // low | medium | high | critical
  status: 'open', // open | in-progress | fixed | closed
  reportedBy: 'Ashok reddy',
  reportedById: 'user-3', // ← Link to Team Member
  assignedTo: 'Gaurav Singh',
  assignedToId: 'user-1', // ← Link to Team Member
  reportedOn: '2025-12-13',
  updatedAt: '2025-12-13',
  issueEnv: ['demo', 'prod'],
  comments: 'Additional notes'
}
```

---

## 🔄 Integration Points

### **1. Projects ↔ Team Members**

#### When creating/editing a project:
```javascript
// In ProjectModal - when saving
const handleSave = (projectData) => {
  const project = {
    ...projectData,
    teamMembers: selectedTeamMemberIds, // Array of user IDs
    managerId: selectedManagerId
  };
  
  // Also update team members to include this project
  updateTeamMembersProjects(selectedTeamMemberIds, project.code);
};

// Helper function
const updateTeamMembersProjects = (memberIds, projectCode) => {
  memberIds.forEach(memberId => {
    const member = teamMembers.find(m => m.id === memberId);
    if (!member.projects.includes(projectCode)) {
      member.projects.push(projectCode);
    }
  });
};
```

#### In Projects page - Show team members:
```javascript
// Add to ProjectCard component
const getTeamMembers = (project) => {
  return teamMembers.filter(m => project.teamMembers?.includes(m.id));
};

// Display in card
<div className="flex -space-x-2">
  {getTeamMembers(project).slice(0, 3).map(member => (
    <img 
      key={member.id}
      src={member.avatar} 
      className="w-8 h-8 rounded-full border-2 border-white"
      title={member.name}
    />
  ))}
  {getTeamMembers(project).length > 3 && (
    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs">
      +{getTeamMembers(project).length - 3}
    </div>
  )}
</div>
```

---

### **2. Team Members ↔ Issues**

#### When creating/editing a bug:
```javascript
// In BugModal
const handleAssign = (bugData) => {
  const bug = {
    ...bugData,
    assignedToId: selectedUserId, // Store user ID
    assignedTo: users.find(u => u.id === selectedUserId)?.name
  };
  
  // Update team member's assignedBugs count
  updateTeamMemberBugCount(selectedUserId, 'assign');
};

const updateTeamMemberBugCount = (userId, action) => {
  const member = teamMembers.find(m => m.id === userId);
  if (action === 'assign') {
    member.assignedBugs++;
  } else if (action === 'resolve') {
    member.assignedBugs--;
    member.resolvedBugs++;
  }
};
```

#### Show bugs assigned to user in Team page:
```javascript
// In TeamMemberCard
const getUserBugs = (userId) => {
  return bugs.filter(b => b.assignedToId === userId);
};

<div className="text-sm">
  <p>Assigned Bugs: {getUserBugs(member.id).filter(b => b.status !== 'fixed').length}</p>
  <p>Resolved: {getUserBugs(member.id).filter(b => b.status === 'fixed').length}</p>
</div>
```

---

### **3. Projects ↔ Issues**

#### Filter bugs by project:
```javascript
// In Issues page
const [selectedProject, setSelectedProject] = useState('all');

const filteredBugs = bugs.filter(bug => {
  if (selectedProject === 'all') return true;
  return bug.projectId === selectedProject;
});

// In Projects page - show bug count per project
const getProjectBugs = (projectId) => {
  return bugs.filter(b => b.projectId === projectId);
};

const project = {
  ...projectData,
  totalBugs: getProjectBugs(projectId).length,
  openBugs: getProjectBugs(projectId).filter(b => b.status === 'open').length
};
```

---

## 🏗️ Recommended File Structure

```
src/
├── components/
│   ├── Projects/
│   │   ├── ProjectCard.jsx
│   │   ├── ProjectModal.jsx
│   │   └── ProjectsManagement.jsx
│   ├── Team/
│   │   ├── TeamMemberCard.jsx
│   │   ├── TeamMemberModal.jsx
│   │   └── TeamManagement.jsx
│   ├── Issues/
│   │   ├── BugCard.jsx
│   │   ├── BugModal.jsx
│   │   └── IssuesManagement.jsx
│   ├── Profile/
│   │   └── ProfileSettings.jsx
│   └── shared/
│       ├── ConfirmationModal.jsx
│       └── StyledSpinner.jsx
├── context/
│   ├── ProjectContext.jsx
│   ├── TeamContext.jsx
│   ├── BugContext.jsx
│   └── AuthContext.jsx
├── utils/
│   ├── helpers.js
│   └── constants.js
└── App.jsx
```

---

## 📦 Context Setup (Recommended)

### Create a Global Context for Data Management:

```javascript
// context/AppContext.jsx
import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [bugs, setBugs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Projects CRUD
  const addProject = (project) => {
    const newProject = { ...project, id: `proj-${Date.now()}` };
    setProjects([...projects, newProject]);
    return newProject;
  };

  const updateProject = (id, updates) => {
    setProjects(projects.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  // Team CRUD
  const addTeamMember = (member) => {
    const newMember = { ...member, id: `user-${Date.now()}` };
    setTeamMembers([...teamMembers, newMember]);
    return newMember;
  };

  const updateTeamMember = (id, updates) => {
    setTeamMembers(teamMembers.map(m => m.id === id ? { ...m, ...updates } : m));
  };

  // Bugs CRUD
  const addBug = (bug) => {
    const newBug = { ...bug, id: `bug-${Date.now()}` };
    setBugs([...bugs, newBug]);
    
    // Update assigned team member's bug count
    if (bug.assignedToId) {
      updateTeamMember(bug.assignedToId, {
        assignedBugs: teamMembers.find(m => m.id === bug.assignedToId).assignedBugs + 1
      });
    }
    
    // Update project's bug count
    if (bug.projectId) {
      const project = projects.find(p => p.id === bug.projectId);
      updateProject(bug.projectId, {
        totalBugs: project.totalBugs + 1,
        openBugs: bug.status === 'open' ? project.openBugs + 1 : project.openBugs
      });
    }
    
    return newBug;
  };

  // Helper functions
  const getProjectTeamMembers = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return teamMembers.filter(m => project?.teamMembers?.includes(m.id));
  };

  const getUserBugs = (userId) => {
    return bugs.filter(b => b.assignedToId === userId);
  };

  const getProjectBugs = (projectId) => {
    return bugs.filter(b => b.projectId === projectId);
  };

  const value = {
    projects,
    teamMembers,
    bugs,
    currentUser,
    addProject,
    updateProject,
    deleteProject,
    addTeamMember,
    updateTeamMember,
    addBug,
    getProjectTeamMembers,
    getUserBugs,
    getProjectBugs
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
```

### Use in Components:
```javascript
import { useApp } from '../context/AppContext';

function ProjectsManagement() {
  const { projects, teamMembers, addProject, getProjectBugs } = useApp();
  
  // Now you have access to all data and functions!
}
```

---

## 🎯 Integration Checklist

- [ ] **Phase 1: Setup Context**
  - [ ] Create AppContext with all data states
  - [ ] Implement CRUD operations
  - [ ] Add helper functions for relationships

- [ ] **Phase 2: Projects**
  - [ ] Integrate team member selection
  - [ ] Show team avatars in project cards
  - [ ] Update project stats when bugs change

- [ ] **Phase 3: Team**
  - [ ] Show projects each member works on
  - [ ] Display bug counts (assigned/resolved)
  - [ ] Link to project details

- [ ] **Phase 4: Issues**
  - [ ] Dropdown to select project
  - [ ] Dropdown to assign team member
  - [ ] Auto-update team member & project stats

- [ ] **Phase 5: Dashboard**
  - [ ] Aggregate data from all modules
  - [ ] Show charts and stats
  - [ ] Recent activities feed

- [ ] **Phase 6: Reports**
  - [ ] Filter by project/team/date
  - [ ] Export functionality
  - [ ] Visual analytics

---

## 🚀 Next Steps

1. **Start with Projects** - Get the base entity working
2. **Add Team Members** - Build the user management
3. **Connect Issues** - Link bugs to projects and team
4. **Build Dashboard** - Create overview using all data
5. **Add Reports** - Analytics and insights

Your data relationships will naturally flow:
**Projects** → **Team Members** → **Issues** → **Reports** → **Dashboard**

Good luck with your integration! 🎉