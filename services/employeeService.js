const Employee = require("../models/employeeModel");

async function registerEmployee({
  dni,
  firstName,
  lastName,
  email,
  position,
  department,
  manager,
}) {
  if (!firstName || !lastName || !email || !position || !department) {
    throw new Error("All fields are required");
  }

  const existingEmployee = await Employee.findOne({ dni });
  if (existingEmployee) {
    throw new Error("Employee with this dni already exists");
  }

  const newEmployee = new Employee({
    dni,
    firstName,
    lastName,
    email,
    position,
    department,
    manager,
  });
  await newEmployee.save();

  return { message: "Employee registered successfully" };
}

async function listEmployees() {
  const employees = await Employee.find();
  return employees;
}

module.exports = { registerEmployee, listEmployees };
