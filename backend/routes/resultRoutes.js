const express = require("express");

const router = express.Router();

const {
    createResult,
    getResults
} = require("../controllers/resultController");

router.post("/", createResult);

router.get("/", getResults);

module.exports = router;