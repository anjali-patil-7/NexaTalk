import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import http from "http";
import express from "express";
import resolveCorsOrigins from "../utils/resolveCorsOrigins.js";

// Load env vars BEFORE calling resolveCorsOrigins().
// In ESM, this module's top-level code runs before server.js's dotenv.config(),
// so we must load it here too. On Render, OS-level vars make this a safe no-op.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const app = express();
const server = http.createServer(app);

// Store online users
const userSocketMap = {}; // { userId: socketId }

const socketCorsOrigins = resolveCorsOrigins();

const io = new Server(server, {
  cors: {
    origin: socketCorsOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Get receiver socket id (used in message sending)
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  const userId = socket.handshake.query.userId;

  //  Add user safely
  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }

  //  Send online users to all clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    if (userId && userSocketMap[userId]) {
      delete userSocketMap[userId];
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };