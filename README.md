# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



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


1. when a team member join the company he sign-up as a user  fils his all information like name email contact , tech stacks he worked on and have kknowledge

2.  later  PM  assign him a project with his Team Leader
PM will be able to see the developer or qa test performance like how may bugs he got how may api's he made , what is his average bug resolution time i days or hour, how may task he have been assigned ad eery possible scanario.

3.  PM will have capabiility to assign a new TL to a project track specific project and like when project was started how many team mmmeber i front end backend or qa teams or project lead member is working on that.  and other possible scanarion

4. TL should have capability to add new memebr like developer (UI) or qa  and other possible scanrio

5. PM  should be able to add new project then assig this project to a team lead and also add developer by TL or project manager the members are going to be work o  that project. and other possible scanario

6. PM manager shold be able to  see the multiple Project report statics like how many mmebr are owkirng on that specifc project  from whe project was started , how manny sprints are completed ad how many bugs repoorted from the starts of the project.  how may runnning issue is there how many resolved. with all other possible cases.

7. i maia dahs board pase he should be able to see the all of the over view or pproject managment app like summary of the app.  which one is going well which one have issue and other possbile use case.