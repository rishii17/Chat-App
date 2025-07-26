import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors"
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"
import { app,server,io } from "./lib/socket.js";

dotenv.config()



const PORT=process.env.PORT






app.use(cors({
    origin: process.env.NODE_ENV === "production"
        ? 'https://chat-app-7i55.vercel.app' // Make sure this matches EXACTLY
        : 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include OPTIONS for preflight
    allowedHeaders: ['Content-Type', 'Authorization'], // Any custom headers you send
}));


app.use(express.json());

app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);


server.listen(PORT,()=>{
    console.log("server is running on port:"+PORT);
    connectDB()
})

