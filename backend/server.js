const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mock database: Fleet data
const fleetData = [
  { id: 1, title: "Benz GLC", price: "340", img: "/images/GLC Benz.avif", year: 2024 },
  { id: 2, title: "Dodge Hellcat", price: "840", img: "/images/Hellcat.jpg", year: 2024 },
  { id: 3, title: "Bentley Spider", price: "4580", img: "/images/bentley.jpeg", year: 2024 },
  { id: 4, title: "Bugatti Chiron", price: "8340", img: "/images/bougatti.jpeg", year: 2024 },
  { id: 5, title: "BMW M4 Coupe", price: "4166", img: "/images/BMW4.jpeg", year: 2023 }
];

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'success', message: 'Lux Rentals API is running!' });
});

app.get('/api/fleet', (req, res) => {
  res.json({ status: 'success', data: fleetData });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Lux Rentals Backend API is running on port ${PORT}`);
});
