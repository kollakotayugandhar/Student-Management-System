require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const attendanceRoutes =require("./routes/attendanceRoutes");
const resultRoutes =require("./routes/resultRoutes");
const userRoutes = require("./routes/userRoutes");




const app = express();

// Configure CORS for production
app.use(cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));
app.use("/api/results", require("./routes/resultRoutes"));
app.use("/api/attendance",attendanceRoutes);
app.use("/api/results",resultRoutes);
app.use("/api/users", userRoutes);
// AI routes (fake Gemini)
app.use("/api/ai", require("./routes/aiRoutes"));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.get("/", (req,res)=>{
    res.send("API Running");
});

app.listen(5000, ()=>{
    console.log("Server Running on Port 5000");
});