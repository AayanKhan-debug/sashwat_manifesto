const mongoose = require('mongoose');

/**
 * Connect to MongoDB instance using Mongoose.
 * Reuses active connection in serverless (Vercel) environments to prevent connection leakage.
 */
const connectDB = async () => {
  // If connection is already open (readyState 1), reuse it
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // If connection is in the process of connecting (readyState 2), wait for it
  if (mongoose.connection.readyState === 2) {
    return new Promise((resolve, reject) => {
      mongoose.connection.once('connected', () => resolve(mongoose.connection));
      mongoose.connection.once('error', reject);
    });
  }

  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    const errorMsg = 'FATAL: MONGO_URI environment variable is not defined.';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  try {
    const conn = await mongoose.connect(mongoURI, {
      autoIndex: process.env.NODE_ENV !== 'production', // Disable runtime autoIndex in high-scale prod
      serverSelectionTimeoutMS: 8000,
    });

    const isProd = process.env.NODE_ENV === 'production';
    if (!isProd) {
      console.log(`[MongoDB] Connected successfully to database: ${conn.connection.name}`);
    } else {
      console.log(`[MongoDB] Database connection established.`);
    }

    return conn.connection;
  } catch (error) {
    console.error(`[MongoDB] Connection Failed: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;
