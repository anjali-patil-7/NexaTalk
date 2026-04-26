import express from "express"; 
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./Routes/authRoutes.js";
import messageRoutes from "./Routes/messageRoute.js";
import userRoutes from "./Routes/userRoutes.js";

import connectToMongoDB from "./db/connectToMongodb.js";
import { app, server } from "./socket/socket.js";
import resolveCorsOrigins from "./utils/resolveCorsOrigins.js";

// ── Setup __dirname (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// ── Config
const PORT = process.env.PORT || 5000;
const corsOrigins = resolveCorsOrigins();

// ── Middlewares
app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ── API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// ── Root route (health check)
app.get("/", (req, res) => {
  res.send("NexaTalk API is running 🚀");
});

// ── 404 handler (for unknown API routes)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ── Handle port conflict
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} already in use`);
    process.exit(1);
  }
});

// ── Start server
server.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await connectToMongoDB();
});