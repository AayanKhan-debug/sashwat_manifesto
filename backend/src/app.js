const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const supportRoutes = require('./routes/supportRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Trust proxy for proper IP resolution on Vercel / reverse proxies
app.set('trust proxy', 1);

// Security HTTP headers
app.use(helmet());

// CORS Configuration
const allowedClientsDev = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);

      if (process.env.NODE_ENV === 'production') {
        const configured = process.env.CLIENT_URL;
        if (configured) {
          const allowedList = configured.split(',').map((u) => u.trim().replace(/\/+$/, ''));
          const cleanOrigin = origin.replace(/\/+$/, '');
          if (allowedList.includes(cleanOrigin)) {
            return callback(null, true);
          }
        }
        return callback(new Error(`Origin ${origin} not allowed by CORS configuration.`));
      }

      // Development mode
      if (allowedClientsDev.includes(origin) || (process.env.CLIENT_URL && origin === process.env.CLIENT_URL)) {
        return callback(null, true);
      }

      return callback(null, true);
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Body parsing
app.use(express.json({ limit: '16kb' }));

// Ensure database connection is active (cached in serverless, immediate in standalone)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'sashwat-campaign-api',
  });
});

// Support API Routes
app.use('/api/support', supportRoutes);

// Catch-all 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Resource not found: ${req.method} ${req.originalUrl}`,
  });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

module.exports = app;
