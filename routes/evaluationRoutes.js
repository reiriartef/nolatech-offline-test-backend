const express = require("express");
const {
  createEvaluationController,
  getEvaluationByIdController,
  updateEvaluationController,
  getEvaluationsByEmployeeIdController,
} = require("../controllers/evaluationController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", createEvaluationController);
router.get("/:id", getEvaluationByIdController);
router.put("/:id", updateEvaluationController);
router.get("/employee/:id", getEvaluationsByEmployeeIdController);

module.exports = router;
