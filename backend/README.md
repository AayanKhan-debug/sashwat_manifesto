# Sashwat Kumar Campaign — Backend API

Production-ready MERN backend service for **Sashwat Kumar's Vice President Campaign** (SANGYARTHAM — ISE Forum, Nitte Meenakshi Institute of Technology).

---

## Architecture & Features

- **Runtime**: Node.js & Express.js
- **Database**: MongoDB via Mongoose ODM
- **Real Persistent Support Counter**: Safe concurrent atomic writes and duplicate visitor prevention backed by a database unique index.
- **Security**:
  - `helmet()` for HTTP header protection
  - Strict CORS whitelist configuration via `CLIENT_URL`
  - `express-rate-limit` on the support submission endpoint (10 requests/min per IP)
  - Anonymous visitor identification with zero PII (Personally Identifiable Information) collection
- **Centralized Error Handling**: Safe responses without stack trace leakage in production
- **Tested**: Comprehensive test suite covering health, count retrieval, atomic creation, duplicate prevention, rate limiting, and input validation.

---

## Directory Structure

```text
backend/
├── src/
│   ├── config/
│   │   └── db.js                 # Database connection logic with fail-fast validation
│   ├── controllers/
│   │   └── supportController.js   # Support counter and idempotent submission logic
│   ├── middleware/
│   │   ├── errorHandler.js       # Centralized error handler
│   │   └── rateLimiter.js        # Express rate limiting
│   ├── models/
│   │   └── Support.js            # Mongoose schema with unique visitorId index
│   ├── routes/
│   │   └── supportRoutes.js      # Thin Express route definitions
│   ├── app.js                    # Express app configuration & middleware
│   └── server.js                 # Server entry point and graceful shutdown
├── tests/
│   └── support.test.js           # Automated Jest test suite
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## Prerequisites

- **Node.js**: v18.0.0 or higher
- **MongoDB**: v6.0+ (Local Community Edition or MongoDB Atlas cluster)

---

## Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable | Description | Default |
|---|---|---|
| `PORT` | Port the Express server listens on | `5000` |
| `MONGO_URI` | MongoDB connection URI | `your_mongodb_connection_string` |
| `CLIENT_URL` | Frontend origin allowed by CORS | `http://localhost:5173` |
| `NODE_ENV` | Application environment (`development` / `production`) | `development` |

---

## Installation & Running

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Run in Development Mode
```bash
npm run dev
```

### 3. Run in Production Mode
```bash
npm start
```

### 4. Run Test Suite
```bash
npm test
```

---

## API Endpoints

### 1. Health Check
```http
GET /api/health
```
**Response (200 OK):**
```json
{
  "status": "ok",
  "service": "sashwat-campaign-api"
}
```

### 2. Retrieve Support Count
```http
GET /api/support
```
**Response (200 OK):**
```json
{
  "count": 0
}
```
*Note: The count is dynamically derived from MongoDB documents. If zero records exist, it returns `0`.*

### 3. Record Anonymous Support
```http
POST /api/support
Content-Type: application/json

{
  "visitorId": "3f886f34-c71b-4395-9252-87063d915908"
}
```
**Success Response (201 Created):**
```json
{
  "success": true,
  "supported": true,
  "count": 1
}
```
**Already Supported Response (200 OK):**
```json
{
  "success": true,
  "supported": false,
  "alreadySupported": true,
  "count": 1
}
```
**Invalid or Missing visitorId (400 Bad Request):**
```json
{
  "success": false,
  "message": "A valid visitorId is required to record support."
}
```

---

## Frontend Integration

The React + Vite frontend connects via `src/services/supportApi.ts` (using Axios):
- On page load, it requests `GET /api/support` to obtain the live count.
- When the user clicks the **SUPPORT** action, it generates or retrieves an anonymous visitor ID from `localStorage` (`crypto.randomUUID()`) and sends a `POST /api/support` request.
- The UI reflects verified server state (`SUPPORTED +COUNT`).

---

## MongoDB Atlas Setup for Production

1. Navigate to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free or dedicated cluster.
2. Under **Database Access**, create a database user (e.g., `sashwat_admin`) and generate a secure password.
3. Under **Network Access**, add the IP address of your production hosting server (or `0.0.0.0/0` with restricted credentials).
4. Under **Clusters**, click **Connect** -> **Drivers** -> **Node.js**.
5. Copy the connection string format:
   ```text
   <your_mongodb_atlas_connection_uri>
   ```
6. Set this value as `MONGO_URI` in your production environment settings (e.g., Render, Railway, AWS, Heroku).
