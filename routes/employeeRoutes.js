const express = require("express");
const {
  registerEmployeeController,
  listEmployeesController,
} = require("../controllers/employeeController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerEmployeeController);
router.get("/", listEmployeesController);

module.exports = router;
