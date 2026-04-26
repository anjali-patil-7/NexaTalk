import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./Routes/authRoutes.js";
import messageRoutes from "./Routes/messageRoute.js";
import userRoutes from "./Routes/userRoutes.js";

import connectToMongoDB from "./db/connectToMongodb.js";
import { app, server } from "./socket/socket.js";
import resolveCorsOrigins from "./utils/resolveCorsOrigins.js";

// ── Load .env from project root (works whether you run from root or /backend)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const PORT = process.env.PORT || 5000;
const corsOrigins = resolveCorsOrigins();

// ── Middlewares
app.use(cors({ origin: corsOrigins, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// ── API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// ── Serve built frontend in production
const rootDir = path.resolve(__dirname, "..");
app.use(express.static(path.join(rootDir, "frontend", "dist")));

app.get("/*path", (req, res) => {
  res.sendFile(path.join(rootDir, "frontend", "dist", "index.html"));
});

// ── 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.get("/", (req, res) => {
  res.send("NexaTalk API is running 🚀");
});


// ── Handle port conflict
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} already in use. Try a different PORT in .env`);
    process.exit(1);
  }
});

// ── Start
server.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  await connectToMongoDB();
});