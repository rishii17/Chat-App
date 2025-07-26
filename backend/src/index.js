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






const corsOptions = {
  origin: 'https://chat-app-7i55.vercel.app', // Allow only your frontend origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // If you're sending cookies/tokens
  optionsSuccessStatus: 204 // For preflight requests
};

app.use(cors(corsOptions));

app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);


server.listen(PORT,()=>{
    console.log("server is running on port:"+PORT);
    connectDB()
})

