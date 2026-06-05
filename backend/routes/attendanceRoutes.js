const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
    markAttendance,
    getAttendance,
    getAttendanceStats
} = require("../controllers/attendanceController");

// mark attendance
router.post("/", protect, adminOnly, markAttendance);

// get all attendance
router.get("/", protect, adminOnly, getAttendance);

// stats route
router.get("/stats", protect, adminOnly, getAttendanceStats);

module.exports = router;