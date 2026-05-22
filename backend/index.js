const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const productRoute = require("./routes/product.routes");

const app = express();

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://prescient-shopping-cart-client.vercel.app",
    ],
    credentials: true,
  }),
);

// Middleware
app.use(express.json());

// Routes
productRoute(app);

// Connect DB
// connectDB();

// Export app for Vercel
module.exports = app;
