const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const productRoute = require("./routes/product.routes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://prescient-assignment.vercel.app",
    ],
  }),
);

app.use(express.json());

// 🔥 IMPORTANT: ensure DB is ready before any route
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

productRoute(app);

module.exports = app;
