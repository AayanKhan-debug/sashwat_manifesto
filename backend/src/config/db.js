const mongoose = require('mongoose');

/**
 * Connect to MongoDB instance using Mongoose.
 * Exits process with failure code if connection cannot be established.
 */
const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.error('FATAL: MONGO_URI environment variable is not defined.');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoURI, {
      autoIndex: true, // Build unique indexes automatically
    });

    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}, database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB] Connection Failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
