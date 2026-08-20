# Candidate Management System

A full-stack web application built to manage candidate profiles and skills efficiently. The system provides a React-based frontend with an ASP.NET Core Web API backend for managing candidate information through RESTful APIs.

## Project Overview

Candidate Management System is designed to simplify candidate information management by providing features to create, view, update, and delete candidate records along with their associated skills.

The application follows a client-server architecture where the React frontend communicates with the ASP.NET Core Web API backend for data processing and management.

## Technology Stack

### Frontend

- React.js
- TypeScript
- Vite
- Axios
- Bootstrap
- CSS

### Backend

- ASP.NET Core Web API (.NET 8)
- C#
- Entity Framework Core
- SQL Server
- Swagger API Documentation

## Features

### Candidate Management

- Create new candidate records
- View candidate information
- Update candidate details
- Delete candidate records
- Manage candidate data through RESTful APIs

### Skill Management

- Create and manage skills
- Associate skills with candidates
- Retrieve skill information through API endpoints

### Image Handling

- Candidate image storage support
- Static file handling using backend wwwroot folder

### API Features

- RESTful API architecture
- Controller-based API development
- Entity Framework Core database operations
- Database migration support
- Swagger API testing support
- CORS configuration for frontend-backend communication

## Project Architecture

```
Candidate-Management-System

│
├── candidate-client
│   └── React + TypeScript Frontend Application
│
└── MasterDetailsApi
    └── ASP.NET Core Web API Backend Application
```

## Backend Structure

```
MasterDetailsApi

├── Controllers
│   ├── CandidatesController
│   └── SkillsController
│
├── Models
│   └── Entity Models
│
├── DTOs
│   └── Data Transfer Objects
│
├── Data
│   └── AppDbContext
│
├── Migrations
│   └── Entity Framework Core Migration Files
│
└── wwwroot
    └── Images Storage
```

## Frontend Structure

```
candidate-client

├── src
│
├── components
│   ├── CandidateForm
│   ├── CandidateList
│   └── NavbarLayout
│
├── services
│   └── API Service Integration
│
└── types
    └── TypeScript Interfaces
```

## Installation & Setup

## Backend Setup

Navigate to backend folder:

```
cd MasterDetailsApi
```

Restore required packages:

```
dotnet restore
```

Run the API:

```
dotnet run
```

Swagger documentation will be available for API testing.

---

## Frontend Setup

Navigate to frontend folder:

```
cd candidate-client
```

Install dependencies:

```
npm install
```

Run development server:

```
npm run dev
```

The React application will start using Vite development server.

## API Controllers

### Candidate API

```
GET    /api/candidates
POST   /api/candidates
PUT    /api/candidates/{id}
DELETE /api/candidates/{id}
```

### Skill API

```
GET    /api/skills
POST   /api/skills
PUT    /api/skills/{id}
DELETE /api/skills/{id}
```

## Purpose

This project demonstrates full-stack development skills including:

- Building modern React applications
- Developing RESTful APIs using ASP.NET Core Web API
- Database operations using Entity Framework Core
- SQL Server integration
- Managing frontend-backend communication
- Developing CRUD-based business applications

## Author

**Sumaiya Akter**

Full Stack .NET Developer
