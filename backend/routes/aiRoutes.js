const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { fakeGemini } = require("../controllers/aiController");

// POST /api/ai/gemini
router.post("/gemini", protect, fakeGemini);

module.exports = router;
