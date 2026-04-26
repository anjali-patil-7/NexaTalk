import { Server } from "socket.io";
import http from "http";
import express from "express";
import resolveCorsOrigins from "../utils/resolveCorsOrigins.js";

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