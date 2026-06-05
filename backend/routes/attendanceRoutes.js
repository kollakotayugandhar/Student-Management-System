const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
    markAttendance,
    getAttendance,
    getAttendanceStats
} = require("../controllers/attendanceController");

// mark attendance (any authenticated user can mark — controller trusts request)
router.post("/", protect, markAttendance);

// get attendance (authenticated users)
router.get("/", protect, getAttendance);

// stats route (admin only)
router.get("/stats", protect, adminOnly, getAttendanceStats);

module.exports = router;