const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const supportRoutes = require('./routes/supportRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Security HTTP headers
app.use(helmet());

// CORS Configuration
const allowedClients = [
  process.env.CLIENT_URL || 'http://localhost:5173',
  'http://127.0.0.1:5173',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman) in non-production
      if (!origin) return callback(null, true);

      if (process.env.NODE_ENV === 'production') {
        const configuredClient = process.env.CLIENT_URL;
        if (configuredClient && origin === configuredClient) {
          return callback(null, true);
        }
        return callback(new Error(`Origin ${origin} not allowed by CORS configuration.`));
      }

      // Development / test: allow configured clients
      if (allowedClients.includes(origin) || allowedClients.some((allowed) => origin.startsWith(allowed))) {
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
