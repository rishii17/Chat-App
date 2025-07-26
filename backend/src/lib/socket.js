import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv"; // Ensure dotenv is imported and configured

dotenv.config(); // Add dotenv config here for safety, if not guaranteed by index.js loading order

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.NODE_ENV === "production"
            ? 'https://chat-app-7i55.vercel.app' // Make sure this matches EXACTLY
            : "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST"] // Methods needed for handshake
    },
});

// Map to store userId to socketId
const userSocketMap = {}; // { userId: socketId }

// Function to get the socket ID for a given user ID
export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap[userId] = socket.id; // CORRECTED: Store socket.id, NOT socket.io
        console.log(`User ${userId} mapped to socket ${socket.id}`);
    } else {
        console.warn("User connected without userId in handshake query. Socket ID:", socket.id);
    }

    // Emit online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    console.log("Current online users:", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
        // Find the user ID associated with the disconnected socket ID
        const disconnectedUserId = Object.keys(userSocketMap).find(
            (key) => userSocketMap[key] === socket.id
        );

        if (disconnectedUserId) {
            delete userSocketMap[disconnectedUserId];
            console.log(`User ${disconnectedUserId} disconnected. Removed from map.`);
        } else {
            console.log(`Socket ${socket.id} disconnected, but no user ID found in map.`);
        }

        // Emit updated online users to all clients
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
        console.log("Updated online users:", Object.keys(userSocketMap));
    });
});

export { io, app, server };
