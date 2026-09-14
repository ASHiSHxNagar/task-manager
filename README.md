# 📋 Task Manager — MERN Stack Application

A full-stack, responsive Task Management web application built with the **MERN** stack (**MongoDB, Express.js, React 19, Node.js**), **Vite**, and **Tailwind CSS**. Features secure JWT authentication, real-time task statistics, instant task editing, filtering, searching, and quick status workflows.

---

## 🌐 Live Deployment Links

- 🚀 **Frontend (Vercel)**: [https://task-manager-three-lime-34.vercel.app/](https://task-manager-three-lime-34.vercel.app/)
- ⚙️ **Backend API (Render)**: [https://task-manager-backend-bi9y.onrender.com](https://task-manager-backend-bi9y.onrender.com)

> [!IMPORTANT]
> **⚠️ Render Free Tier Cold-Start Note:**
> The backend server is hosted on Render's free tier, which automatically spins down into sleep mode after periods of inactivity.
> **Please open/hit the [Backend URL](https://task-manager-backend-bi9y.onrender.com) 4–5 times (or refresh it and wait ~30–50 seconds) to wake up the server before using the frontend.** Once the backend responds with `{"message": "Task Manager API is running"}`, you can smoothly register, log in, and manage tasks on the frontend without delays.

---

## ✨ Features

- 🔐 **Authentication & Security**
  - User Registration & Login with encrypted passwords (`bcryptjs`).
  - Stateless authentication via JSON Web Tokens (**JWT**).
  - Protected frontend routes and authorized API endpoints.

- 📝 **Task Management (CRUD)**
  - **Create Tasks**: Title, description, priority (`low`, `medium`, `high`), and due date.
  - **Direct Edit Mode**: Seamless task editing page (`/tasks/:id`) with pre-filled details.
  - **Quick Status Updates**: Change task status directly from the card (`Pending`, `In Progress`, `Completed`).
  - **Delete Tasks**: Confirmation-guarded task deletion.

- 🔍 **Search & Multi-Filter System**
  - Live task search by title keywords.
  - Filter simultaneously by **Status** and **Priority**.
  - **Dynamic Reset Filters** button when any filter or search query is active.

- 📊 **Dashboard & Metrics**
  - Real-time statistics counters for Total Tasks, Pending, In Progress, and Completed tasks.

- 🎨 **Modern UI / UX**
  - Built with **Tailwind CSS** with custom SVG chevron dropdowns and styled controls.
  - Fully responsive design optimized for mobile, tablet, and desktop screens.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite 8
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v4
- **HTTP Client**: Axios (with authorization request interceptors)
- **Deployment**: Vercel

### Backend
- **Runtime**: Node.js
- **Server Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (`jsonwebtoken`) & `bcryptjs`
- **Environment Management**: `dotenv`
- **CORS**: Cross-Origin Resource Sharing enabled
- **Deployment**: Render

---

## 📁 Project Structure

```text
task-manager/
├── backend/
│   ├── middleware/
│   │   └── auth.js             # JWT verification middleware
│   ├── models/
│   │   ├── Task.js             # Mongoose Task schema
│   │   └── User.js             # Mongoose User schema
│   ├── routes/
│   │   ├── auth.js             # Register, Login, Me routes
│   │   └── tasks.js            # Task CRUD, status patch, and stats routes
│   ├── .env                    # Environment configuration
│   ├── package.json
│   └── server.js               # Express app and MongoDB connection
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FilterBar.jsx   # Search & filter dropdowns with reset action
│   │   │   ├── Navbar.jsx      # Navigation header with user logout
│   │   │   ├── ProtectedRoute.jsx # Route protection wrapper
│   │   │   ├── StatsCard.jsx   # Dashboard metric cards
│   │   │   ├── TaskCard.jsx    # Individual task card with direct edit & quick status
│   │   │   └── TaskForm.jsx    # Reusable create & edit task form
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Global user auth state provider
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx  # Main task overview & stats
│   │   │   ├── LoginPage.jsx      # User sign-in
│   │   │   ├── RegisterPage.jsx   # User sign-up
│   │   │   └── TaskDetailPage.jsx # Direct task edit page
│   │   ├── services/
│   │   │   └── api.js          # Axios client with bearer token interceptor
│   │   ├── App.jsx             # React router configuration
│   │   ├── index.css           # Tailwind CSS directives & color tokens
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── vercel.json                 # Vercel SPA routing rewrite rules
└── README.md
```

---

## ⚙️ Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (version `18.x` or higher)
- [npm](https://www.npmjs.com/) (version `9.x` or higher)
- [MongoDB](https://www.mongodb.com/) (Local MongoDB Community Server or MongoDB Atlas connection URI)

---

## 🚀 Getting Started & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/ASHiSHxNagar/task-manager.git
cd task-manager
```

---

### 2. Backend Setup

1. **Navigate to the backend folder**:
   ```bash
   cd backend
   ```

2. **Install backend dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the `backend/` directory (or update the existing one):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d
   ```
   > 💡 *Note: If using MongoDB Atlas, replace `MONGODB_URI` with your connection string (e.g., `mongodb+srv://<user>:<password>@cluster.mongodb.net/taskmanager`).*

4. **Start the backend server**:
   - **Development mode (with nodemon)**:
     ```bash
     npm run dev
     ```
   - **Production mode**:
     ```bash
     npm start
     ```
   The backend will start on `http://localhost:5000`.

---

### 3. Frontend Setup

1. **Open a new terminal and navigate to the frontend folder**:
   ```bash
   cd frontend
   ```

2. **Install frontend dependencies**:
   ```bash
   npm install
   ```

3. **Start the Vite development server**:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173` (or the URL printed in the terminal).

4. **Build for production** (optional):
   ```bash
   npm run build
   ```

---

## 🔌 API Endpoints Reference

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | ❌ No |
| `POST` | `/api/auth/login` | Login user & receive JWT token | ❌ No |
| `GET` | `/api/auth/me` | Fetch current logged-in user profile | ✅ Yes (Bearer Token) |

### Task Routes (`/api/tasks`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/tasks` | Get all tasks (supports `?search=`, `?status=`, `?priority=`) | ✅ Yes |
| `GET` | `/api/tasks/stats` | Get count of total, pending, in-progress, completed | ✅ Yes |
| `GET` | `/api/tasks/:id` | Get details of a specific task | ✅ Yes |
| `POST` | `/api/tasks` | Create a new task (`title`, `description`, `priority`, `dueDate`) | ✅ Yes |
| `PUT` | `/api/tasks/:id` | Update an existing task | ✅ Yes |
| `PATCH` | `/api/tasks/:id/status`| Update only task status (`status`) | ✅ Yes |
| `DELETE` | `/api/tasks/:id` | Delete a task | ✅ Yes |

---

## 🔒 Environment Variables Reference

| Variable | Description | Example Value |
|---|---|---|
| `PORT` | Port number for the Express server | `5000` |
| `MONGODB_URI` | MongoDB database connection URI | `mongodb://localhost:27017/taskmanager` |
| `JWT_SECRET` | Secret key used for signing JWT tokens | `your_secret_key` |
| `JWT_EXPIRE` | Token expiry duration | `7d` |

---

## 📜 Available Scripts

### In `/backend`:
- `npm run dev`: Starts the backend server with auto-reloading using `nodemon`.
- `npm start`: Runs the backend server with standard `node`.

### In `/frontend`:
- `npm run dev`: Starts the Vite development server.
- `npm run build`: Bundles and builds the React app for production into `dist/`.
- `npm run preview`: Locally preview the production build.

---

## 👨‍💻 Author

Developed for the practical technical task.
