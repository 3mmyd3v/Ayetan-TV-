import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "../backend/config/db.js";
import { errorHandler } from "../backend/middleware/errorHandler.js";
import authRoutes from "../backend/routes/authRoutes.js";
import movieRoutes from "../backend/routes/movieRoutes.js";
import seriesRoutes from "../backend/routes/seriesRoutes.js";
import watchlistRoutes from "../backend/routes/watchlistRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  }),
);
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/series", seriesRoutes);
app.use("/api/watchlist", watchlistRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ message: "Server is running" });
});

// Error handling middleware
app.use(errorHandler);

export default app;
