const express = require("express");
const router = express.Router();

const { loginUser, registerUser, promoteUser } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/promote", protect, adminOnly, promoteUser);

module.exports = router;