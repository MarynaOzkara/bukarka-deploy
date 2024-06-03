const express = require("express");
const { feedback } = require("../../controllers/feedback/feedback");
const router = express.Router();

router.post("/", feedback);

module.exports = router;
