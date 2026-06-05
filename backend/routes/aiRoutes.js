const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { aiAssistant } = require("../controllers/aiController");

// POST /api/ai/gemini
router.post("/gemini", protect, aiAssistant);

module.exports = router;
