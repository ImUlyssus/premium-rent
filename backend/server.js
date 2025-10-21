// This line MUST be at the very top to load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Import your defined routes
const propertyRoutes = require('./routes/properties');

// Use the PORT from your .env file, or default to 3001
const PORT = process.env.PORT || 3001;

// Create the Express app
const app = express();

// --- Middleware ---
// Enable Cross-Origin Resource Sharing (CORS) so your frontend can talk to your backend
app.use(cors());
// Enable the Express app to parse JSON formatted request bodies
app.use(express.json());

// --- Routes ---
// Tell the app to use your property routes for any request that starts with "/api/properties"
// app.use('/api/properties', propertyRoutes);

// A simple root route to check if the server is running
// app.get('/', (req, res) => {
//   res.send('Hello from the NOSBAAN Backend!');
// });

// --- Start the Server ---
// This will start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
