require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Import defined routes
const propertyRoutes = require('./routes/properties');
const taskRoutes = require('./routes/tasks');

// Use the PORT from .env file, or default to 3001
const PORT = process.env.PORT || 3001;

// Create the Express app
const app = express();
const allowedOrigins = [
  'http://localhost:5173',               // frontend (local dev)
  'https://premiumrent.com',             // deployed frontend
  'https://www.notion.so',               // Notion API or integration
  'https://api.hostaway.com',            // Hostaway
  'https://api.operto.com',              // Operto
];
// --- Middleware ---
// Enable Cross-Origin Resource Sharing (CORS) so your frontend can talk to your backend
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: false, // for cookies or auth headers. False for now.
  })
);
// Enable the Express app to parse JSON formatted request bodies
app.use(express.json());

// --- Routes ---
app.use('/api/properties', propertyRoutes);
app.use('/api/tasks', taskRoutes);

// --- Start the Server ---
// This will start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
