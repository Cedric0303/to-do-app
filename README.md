# Lendela assessment
Technical assessment for Lendela, involving creating a to-do list web application

- [Lendela assessment](#lendela-assessment)
- [User Guide](#user-guide)
  - [Install dependencies](#install-dependencies)
  - [Start backend API server](#start-backend-api-server)
  - [Start frontend web app](#start-frontend-web-app)
  - [Test backend API server](#test-backend-api-server)
  - [Test frontend web app](#test-frontend-web-app)
- [Assumptions](#assumptions)
- [Rough Log](#rough-log)
  - [Day 1 (20/10/2023)](#day-1-20102023)
  - [Day 2 (21/10/2023)](#day-2-21102023)
  - [Day 3 (22/10/2023)](#day-3-22102023)

# User Guide

## Install dependencies
```
cd backend
npm install
cd ..
cd frontend
npm install
```

## Start backend API server
```
cd backend
npm run start
```
- URL: [http://localhost:3001/]()

## Test backend API server
- **Note**: Backend API server do **NOT** need to be started to run the test
```
cd backend
npm run test
```

## Start frontend web app
```
cd frontend
npm run dev
```
- URL: [http://localhost:5173/]()

## Test frontend web app
- **Important**: Both backend API server and frontend web app **NEED** to be started to run the test
```
cd frontend
npm run test (OR) npx cypress open
```


# Assumptions
- Not using branches
  - Since no merging of work from other people, only working alone on this assessment
- Only using comments if needed to explain something
  - Some code are just boilerplate code or self-explanatory (through function/variable names)
- Using this assessment to learn about VueJS framework
  - Hopefully its not too jank

# Database schema
- Each to-do activity is stored in the database using the following schema
```
activity: {
  _id: ObjectId,
  timeCreated: Date,
  content: String,
  done: Boolean,
}
```

# Backend API routes
```
GET  /api/activities/             :  read all activities
GET  /api/activities/:id          :  read an activity (DISABLED - unused)
POST /api/activities/create       :  create new activity
POST /api/activities/:id/update   :  update existing activity
GET  /api/activities/:id/delete   :  delete existing activity
GET  /api/activities/deletaAll    :  delete all activities

```

# Rough Log
This serves as a rough log of when and what I'm thinking/working on for this assessment.

## Day 1 (20/10/2023)
- Setup npm packages
- Implement backend API server
- Implement MongoDB database
  - Create database schema
- Idea: *use VueJS for frontend*

## Day 2 (21/10/2023)
- Implement basic backend integration testing
- Start implementation of frontend web app
- Found simplecss to bootstrap styling
- Revert from using typescript to javascript
- Restructure backend config files

## Day 3 (22/10/2023)
- Seperate various buttons from components 
  - Conform with Single Responsibility Principle
- Add empty activity input error showing
- Implement basic Cypress E2E testing

## Day 4 (23/10/2023)
- Polish readme documentation