Recommended Development Sequence:
Phase 1: Foundation (Core Data Management)

Projects - Start here! This is your parent entity that everything else references
Team - Team members are needed before you can assign issues
Profile/Settings - User management foundation

Phase 2: Core Functionality

Issues (Bug Management) - Your main feature, builds on Projects + Team
Sprints - Helps organize issues into time-boxed iterations
Calendar - Can integrate with Sprints and Issues

Phase 3: Analytics & Overview

Reports - Aggregates data from Issues/Projects
Dashboard - The final overview, pulls from everything



src/
├── api/
│   ├── config/
│   │   └── axiosConfig.js
│   ├── services/
│   │   └── authService.js
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useApi.js
│   ├── utils/
│   │   └── apiHandler.js
│   └── index.js
├── components/
│   ├── LoadingSpinner.js
│   └── Navbar.js (optional)
├── pages/
│   ├── LandingPage.js
│   ├── Login.js
│   ├── Register.js
│   ├── Dashboard.js
│   └── ProtectedRoute.js
└── App.js


// Project Plan.


1. when a team member join the company he sign-up as a user  fils his all information like name email contact , tech stacks he worked on and have knowledge tech stack

2.  later  PM  assign him a project with his Team Leader
PM will be able to see the developer or qa test performance like how may bugs he got how may api's he made , what is his average bug resolution time i days or hour, how may task he have been assigned ad eery possible sanario.

3.  PM will have capabiility to assign a new TL to a project track specific project and like when project was started how many team mmmeber i front end backend or qa teams or project lead member is working on that.  and other possible scanarion

4. TL should have capability to add new memebr like developer (UI) or qa  and other possible scanrio

5. PM  should be able to add new project then assig this project to a team lead and also add developer by TL or project manager the members are going to be work o  that project. and other possible scanario

6. PM manager shold be able to  see the multiple Project report statics like how many mmebr are owkirng on that specifc project  from whe project was started , how manny sprints are completed ad how many bugs repoorted from the starts of the project.  how may runnning issue is there how many resolved. with all other possible cases.

7. i maia dahs board pase he should be able to see the all of the over view or pproject managment app like summary of the app.  which one is going well which one have issue and other possbile use case.






## current development

1. dashboard tab => will keep it like present and will add as per need.
2. project tab => should be able perform  crud opes with filters and search with pagination with grid and list view
3. issue tab  => should be as it is but able to see bug and all operation according to selected project

4. reports tab => will be same as it is now with best components and Ui choose also should be able to show according to the selected project

5. team tab => use 1st and for 5 tabs 
=> 
1. overview 
2. teams 
3. members 
4. permitions 
5. analytics  
6. Leave tabs => in which a PM can see which user is applied for leave (with all information)
 like first his TL has to approve or them PM will approve like that 
and use combination of two teams code

 ## Note 1
 in order to get team members data let the team member sign-up as a user with all required items so i can get easly later team member data,  so that suppose a team lead want to contact his mobile number or any information like in how may projects he have worked before what tech  stack he know's and all, so he ca easly contact him directly

 ## Note 2 
 decide what kind of information team member should add.
 ex- type => Security Expert , UI/UX Designe, Lead Developer, DevOps Engineer etc take help of members tab in comp2 =>  also make user status => active in active and on-leave
 a. later you can also let the supper admin allow user to view protected tabs based on allowed permission

 ## Note 3

super-admin, ad admin can see the how may running projects are there in company and who is working on which projects like who is project lead or who is project TL, how may developer's
are there in that project from backend and front end , with duration of project start ?
 A. from how may days project is runninng in month's with day's (4 month, 25 day (optional project progress bar)), ad which developer is working from(from start to end date with day' like Gaurav Singh, 4 Month 12 days (backend));

 Optional = > developer project performance , like Number of bugs assined to developer (Average time of buf resolution)


6. calender => keep same as it is for now
7. sprints  =>
8. setting  => user profile menus items add more later.  all kind of user or team member related information so that he can change later. so it will going to reflect on  team member card when super admin role user see's the team member card.


## New Feature's

1. implement chat functionality in app like any one can talk to each other
   with notification (use canba project notification ui).
2. any one can see the user real time online offline away status with last seen. and hiding
   read reciept feature.
3. make chat functionality like premium subscription wise.
