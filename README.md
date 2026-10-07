# Sashwat Kumar — Vice President Campaign Microsite

Official campaign website and production-ready MERN platform for **Sashwat Kumar**, candidate for **Vice President – SANGYARTHAM, ISE Forum** at Nitte Meenakshi Institute of Technology (NMIT).

---

## Project Overview

- **Frontend**: React 19, Vite, TypeScript, Tailwind CSS, Framer Motion, Lucide React, Axios.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), Helmet, CORS, Express Rate Limit.
- **Visual Identity**: High-contrast editorial political poster aesthetics inspired by the official campaign poster (near-black, deep red, warm off-white, film grain, and halftone photography).
- **Core Manifesto**:
  1. Industrial Trips
  2. Student's Voice
- **Campaign Line**: *"Your voice. Your choice. Your Vice President."*

---

## Repository Structure

```text
.
├── backend/                  # Production-ready Express & MongoDB backend
│   ├── src/
│   │   ├── config/           # Database connection logic
│   │   ├── controllers/      # Support counter & idempotent submission controllers
│   │   ├── middleware/       # Centralized error handler & rate limiter
│   │   ├── models/           # Mongoose Support model with unique visitorId index
│   │   ├── routes/           # Express API route declarations
│   │   ├── app.js            # Express app configuration & middleware
│   │   └── server.js         # Backend server entry point
│   ├── tests/                # Jest API integration tests
│   ├── .env.example          # Backend environment variable template
│   ├── package.json
│   └── README.md             # Detailed backend guide & MongoDB Atlas setup
├── public/
│   └── candidate-poster.png  # High-resolution campaign poster asset
├── src/
│   ├── assets/               # Visual and audio assets (including campaign MP3)
│   ├── components/           # React UI components (Hero, Manifesto, Audio, etc.)
│   ├── services/             # Axios API client for backend support service
│   ├── utils/                # Web Audio synthesized sound utilities
│   ├── App.tsx               # Main application orchestration
│   ├── index.css             # Tailwind base & custom halftone/grain styles
│   └── main.tsx              # React DOM entry point
├── .env.example              # Frontend environment variable template
├── .gitignore                # Root Git ignore rules (node_modules, .env, dist, etc.)
├── package.json              # Frontend package configuration
└── vite.config.ts            # Vite build and development proxy configuration
```

---

## Getting Started

### 1. Clone & Setup Frontend

```bash
# Install frontend dependencies
npm install

# Start frontend development server
npm run dev
```

The frontend will run at `http://localhost:5173`.

### 2. Setup & Start Backend

```bash
cd backend

# Install backend dependencies
npm install

# Copy environment template
cp .env.example .env

# Start backend server
npm run dev
```

The backend server will run at `http://localhost:5000`.

---

## Environment Configuration

### Frontend (`.env` in root)
```bash
VITE_API_URL=http://localhost:5000
```

### Backend (`backend/.env`)
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

---

## Available Scripts

### Frontend (Root)
- `npm run dev`: Starts Vite dev server with proxy to backend `/api`
- `npm run build`: Type-checks and creates production build in `dist/`
- `npm run preview`: Previews the production build locally

### Backend (`backend/`)
- `npm run dev`: Runs server with nodemon auto-reload
- `npm start`: Runs server in production mode
- `npm test`: Runs Jest test suite with MongoDB integration tests

---

## Security & Privacy Notice

- Anonymous browser IDs (`crypto.randomUUID()`) are used exclusively to prevent duplicate support submissions.
- Zero personally identifiable information (PII) is stored.
- Raw IP addresses are not stored.
- All secrets and `.env` files are excluded from version control via `.gitignore`.
