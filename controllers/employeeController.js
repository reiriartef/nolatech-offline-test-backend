const {
  registerEmployee,
  listEmployees,
} = require("../services/employeeService");

async function registerEmployeeController(req, res) {
  try {
    const result = await registerEmployee(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function listEmployeesController(req, res) {
  try {
    const employees = await listEmployees();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { registerEmployeeController, listEmployeesController };
