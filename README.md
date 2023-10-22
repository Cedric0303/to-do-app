# lendela-assessment
Technical assessment for Lendela, involving creating a to-do list web application

## User Guide
### Start backend API server
```
cd backend && npm run start
```
### Start frontend web app
```
cd frontend && npm run dev
```

### Test backend API server
- **Note**: Backend API server do **NOT** need to be started to run the test
```
cd backend && npm run test
```
### Test frontend web app
- **Important**: Both backend API server and frontend web app **NEED** to be started to run the test
```
cd frontend && npm run test
```


## Assumptions
- Not using branches
  - Since no merging of work from other people, only working alone on this assessment
- Only using comments if needed to explain something
  - Some code are just boilerplate code or self-explanatory (through function/variable names)
- Using this assessment to learn about VueJS framework
  - Hopefully its not too jank

## Rough Log
This serves as a rough log of when and what I'm thinking/working on for this assessment.
### Day 1 (20/10/2023)
- Setup npm packages
- Implement backend API server
- Implement MongoDB database
  - Create database schema
- Idea: *use VueJS for frontend*

### Day 2 (21/10/2023)
- Implement basic backend integration testing
- Start implementation of frontend web app
- Found simplecss to bootstrap styling
- Revert from using typescript to javascript
- Restructure backend config files

### Day 3 (22/10/2023)
- Seperate various buttons from components 
  - Conform with Single Responsibility Principle
- Add empty activity input error showing
- Implement basic Cypress E2E testing