import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors"
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"
import { app,server,io } from "./lib/socket.js";


dotenv.config()
app

const PORT=process.env.PORT

app.use(express.json({limit: '50mb'}));

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes)

server.listen(PORT,()=>{
    console.log("server is running on port:"+PORT);
    connectDB()
})

