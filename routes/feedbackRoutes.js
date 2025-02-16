const express = require("express");
const {
  createFeedbackController,
} = require("../controllers/feedbackController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", createFeedbackController);

module.exports = router;
