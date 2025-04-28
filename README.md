# Hospital Bed Management System

A real-time hospital bed management system that tracks bed occupancy, predicts discharges, and optimizes bed assignments.

## Features

- Real-time bed occupancy dashboard
- Automated bed assignment suggestions
- Patient admission and discharge tracking
- Audit logging
- Simple and intuitive user interface

## Tech Stack

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Additional Libraries: 
  - React Router for navigation
  - Axios for API calls
  - Material-UI for UI components
  - Socket.io for real-time updates

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up MongoDB:
   - Install MongoDB locally or use MongoDB Atlas
   - Create a .env file in the backend directory with your MongoDB connection string

4. Start the application:
   ```bash
   # Start backend server
   cd backend
   npm start

   # Start frontend development server
   cd ../frontend
   npm start
   ```

## Project Structure

```
hospital-bed-management/
├── backend/              # Backend server
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── controllers/     # Route controllers
│   └── server.js        # Main server file
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/      # Page components
│   │   └── App.js      # Main App component
│   └── package.json
└── README.md
```

## API Endpoints

- GET /api/beds - Get all beds
- POST /api/beds - Create new bed
- PUT /api/beds/:id - Update bed status
- GET /api/patients - Get all patients
- POST /api/patients - Admit new patient
- PUT /api/patients/:id - Update patient status
- DELETE /api/patients/:id - Discharge patient 