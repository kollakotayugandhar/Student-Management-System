const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
    createResult,
    getResults
} = require("../controllers/resultController");

router.post("/", protect, adminOnly, createResult);
// allow authenticated users to view results
router.get("/", protect, getResults);

module.exports = router;