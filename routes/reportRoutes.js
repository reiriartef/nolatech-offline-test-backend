const express = require("express");
const {
  generateEmployeeReportController,
} = require("../controllers/reportController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/employee/:id", generateEmployeeReportController);

module.exports = router;
