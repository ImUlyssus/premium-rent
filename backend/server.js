require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./db/models'); // Sequelize models are often in db/models after init

const PORT = process.env.PORT || 3001; // Use the PORT from .env

// ... rest of your server.js code
