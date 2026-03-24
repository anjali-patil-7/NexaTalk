import path from "path";
import express from "express"; 
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./Routes/authRoutes.js";
import messageRoutes from "./Routes/messageRoute.js";
import userRoutes from "./Routes/userRoutes.js";

import connectToMongoDB from "./db/connectToMongodb.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

//  Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

//  Static frontend
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Handle port issue
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.log(" Port already in use, trying another port...");
    server.listen(PORT + 1);
  }
});

//  Start server
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(` Server running on port ${PORT}`);
});