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

// 🔓 Any authenticated user can VIEW student records; modifications remain admin-only
router.get("/", protect, getStudents);
router.get("/:id", protect, getSingleStudent);

module.exports = router;