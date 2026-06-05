const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
    createStudent,
    bulkCreateStudents,
    getStudents,
    getSingleStudent,
    updateStudent,
    deleteStudent
} = require("../controllers/studentController");

// 🔥 ONLY ADMIN CAN MODIFY DATA
router.post("/", protect, adminOnly, createStudent);
router.post("/bulk", protect, adminOnly, bulkCreateStudents);
router.put("/:id", protect, adminOnly, updateStudent);
router.delete("/:id", protect, adminOnly, deleteStudent);

// 🔓 ADMIN ONLY CAN VIEW STUDENT RECORDS
router.get("/", protect, adminOnly, getStudents);
router.get("/:id", protect, adminOnly, getSingleStudent);

module.exports = router;