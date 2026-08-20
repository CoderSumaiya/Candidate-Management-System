# Candidate Management System

A full-stack web application built to manage candidate profiles and skills efficiently. The system provides a React-based user interface with an ASP.NET Core Web API backend for managing candidate data through RESTful APIs.

## Project Overview

Candidate Management System is designed to simplify candidate information management by providing features to create, view, update, and delete candidate records along with their skills.

The application follows a client-server architecture where the frontend communicates with the backend API to perform data operations.

## Technology Stack

### Frontend

* React.js
* TypeScript
* Vite
* Axios
* Bootstrap 5
* Bootstrap Icons
* React Router

### Backend

* ASP.NET Core Web API (.NET 8)
* C#
* Entity Framework Core
* SQL Server
* Swagger API Documentation

## Features

### Candidate Management

* Add new candidates
* View candidate list
* Update candidate information
* Delete candidate records
* Manage candidate details through REST API

### Skill Management

* Create and manage skills
* Assign skills to candidates
* Retrieve skill information through API endpoints

### Image Management

* Upload and store candidate images
* Manage uploaded files using backend storage

### API Features

* RESTful API architecture
* Controller-based API endpoints
* Entity Framework Core database operations
* Database migration support
* Swagger API testing support

## Project Architecture

```
Candidate-Management-System

│
├── candidate-client
│   └── React + TypeScript Frontend
│
└── MasterDetailsApi
    └── ASP.NET Core Web API Backend
```

## Backend Structure

```
MasterDetailsApi

├── Controllers
│   ├── CandidatesController
│   └── SkillsController
│
├── Models
│   └── Candidate Model
│
├── DTOs
│   └── Candidate Data Transfer Objects
│
├── Data
│   └── Entity Framework DbContext
│
└── Migrations
    └── Database Migration Files
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

### Backend Setup

Navigate to backend folder:

```bash
cd MasterDetailsApi
```

Restore required packages:

```bash
dotnet restore
```

Run the backend API:

```bash
dotnet run
```

The API will start with Swagger documentation available for API testing.

---

### Frontend Setup

Navigate to frontend folder:

```bash
cd candidate-client
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

The React application will start using Vite development server.

## API Endpoints

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

* Building modern React applications
* Creating RESTful APIs using ASP.NET Core
* Database integration using Entity Framework Core
* Managing client-server communication
* Developing CRUD-based business applications

## Author

**Sumaiya Akter**

Full Stack Developer
