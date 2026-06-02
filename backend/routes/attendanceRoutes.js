const express = require("express");
const router = express.Router();

const {
    markAttendance,
    getAttendance,
    getAttendanceStats
} = require("../controllers/attendanceController");

// mark attendance
router.post("/", markAttendance);

// get all attendance
router.get("/", getAttendance);

// stats route
router.get("/stats", getAttendanceStats);

module.exports = router;