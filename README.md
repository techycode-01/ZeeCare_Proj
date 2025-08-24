# ZeeCare Project

A comprehensive MERN stack application for a healthcare service, providing a patient-facing website and a separate dashboard for administrators and doctors.

## Description

ZeeCare is a full-stack web application designed to streamline the process of managing appointments and patient information for a hospital or clinic. It consists of three main parts:

*   **Frontend:** A client-facing website where patients can learn about the services, see available doctors, and book appointments.
*   **Backend:** A robust Node.js and Express.js server that handles all the business logic, API requests, and database interactions.
*   **Dashboard:** A separate administrative interface for doctors and staff to manage appointments, view patient messages, and add new staff members.

## Tech Stack

### Backend
*   **Framework:** Express.js
*   **Database:** MongoDB
*   **ODM:** Mongoose
*   **Authentication:** JSON Web Tokens (JWT)
*   **File Uploads:** Cloudinary
*   **Other:** bcrypt, cookie-parser, cors, dotenv

### Frontend & Dashboard
*   **Library:** React.js
*   **Bundler:** Vite
*   **Routing:** React Router
*   **HTTP Client:** Axios
*   **UI/Styling:** React Toastify, React Icons

## Features

### Patient Frontend
*   User registration and login.
*   View hospital departments and services.
*   Browse a list of doctors.
*   Book appointments with specific doctors.
*   Send messages or inquiries via a contact form.

### Admin Dashboard
*   Secure login for administrators and doctors.
*   View and manage all patient appointments.
*   Read and reply to patient messages.
*   Add new doctors to the system.
*   Add new admin users.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js and npm (or yarn)
*   MongoDB instance (local or cloud-based)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd ZeeCare_Proj
    ```

2.  **Setup Backend:**
    *   Navigate to the backend directory: `cd backend`
    *   Install dependencies: `npm install`
    *   Create a `.env` file in the `backend` root and add the necessary environment variables.
    *   Start the server: `npm run dev`

3.  **Setup Frontend:**
    *   Navigate to the frontend directory: `cd ../frontend`
    *   Install dependencies: `npm install`
    *   Start the development server: `npm run dev`

4.  **Setup Dashboard:**
    *   Navigate to the dashboard directory: `cd ../dashboard`
    *   Install dependencies: `npm install`
    *   Start the development server: `npm run dev`

## Environment Variables

Create a `.env` file in the `backend` directory and add the following variables:

```
# Frontend URLs
FRONTEND_URL_ONE=http://localhost:5173
FRONTEND_URL_TWO=http://localhost:5174

# MongoDB
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

# Cloudinary
CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET

# JWT
JWT_SECRET_KEY=YOUR_JWT_SECRET_KEY
JWT_EXPIRES=10d
COOKIE_EXPIRE=10

# Server
PORT=5000

# Razorpay
RAZORPAY_KEY_ID=YOUR_RAZORPAY_KEY_ID
RAZORPAY_SECRET=YOUR_RAZORPAY_SECRET
```

## Available Scripts

### Backend (`/backend`)
*   `npm run start`: Starts the server in production mode.
*   `npm run dev`: Starts the server in development mode with `nodemon`.

### Frontend (`/frontend`) & Dashboard (`/dashboard`)
*   `npm run dev`: Runs the app in development mode with Vite.
*   `npm run build`: Builds the app for production.
*   `npm run preview`: Serves the production build locally.
*   `npm run lint`: Lints the source code.

## Folder Structure

```
e:/Projects/ZeeCare_Proj/
├── backend/
│   ├── app.js
│   ├── package.json
│   ├── server.js
│   ├── controller/
│   │   ├── appointmentController.js
│   │   ├── messageController.js
│   │   └── userController.js
│   ├── database/
│   │   └── dbConnection.js
│   ├── middlewares/
│   │   ├── auth.js
│   │   ├── catchAsyncErrors.js
│   │   └── error.js
│   ├── models/
│   │   ├── appointmentSchema.js
│   │   ├── messageSchema.js
│   │   └── userSchema.js
│   ├── router/
│   │   ├── appointmentRouter.js
│   │   ├── messageRouter.js
│   │   └── userRouter.js
│   └── utils/
│       └── jwtToken.js
├── dashboard/
│   ├── index.html
│   ├── package.json
│   └── src/
│       ├── App.css
│       ├── App.jsx
│       ├── main.jsx
│       └── components/
│           ├── AddNewAdmin.jsx
│           ├── AddNewDoctor.jsx
│           ├── Dashboard.jsx
│           ├── Doctors.jsx
│           ├── Login.jsx
│           ├── Messages.jsx
│           └── Sidebar.jsx
└── frontend/
    ├── index.html
    ├── package.json
    └── src/
        ├── App.css
        ├── App.jsx
        ├── main.jsx
        ├── components/
        │   ├── AppointmentForm.jsx
        │   ├── Biography.jsx
        │   ├── Departments.jsx
        │   ├── Footer.jsx
        │   ├── Hero.jsx
        │   ├── MessageForm.jsx
        │   └── Navbar.jsx
        └── Pages/
            ├── AboutUs.jsx
            ├── Appointment.jsx
            ├── Home.jsx
            ├── Login.jsx
            └── Register.jsx
```
