/**
 * Centralized error handling middleware.
 * Formats errors and suppresses stack traces in production environment.
 */
const errorHandler = (err, req, res, next) => {
  // If headers already sent, delegate to default Express handler
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : (err.statusCode || 500);

  const response = {
    success: false,
    message: err.message || 'Internal Server Error',
  };

  // Only expose stack trace if explicitly in development mode
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
