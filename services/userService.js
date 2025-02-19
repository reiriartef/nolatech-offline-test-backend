const User = require("../models/userModel");
const Employee = require("../models/employeeModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser({ username, password, role, employeeData }) {
  if (!username || !password || !role || !employeeData) {
    throw new Error("All fields are required");
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new Error("Username already exists");
  }

  const existingEmployee = await Employee.findOne({ dni: employeeData.dni });
  if (existingEmployee) {
    throw new Error("Employee with this dni already exists");
  }

  const newEmployee = new Employee(employeeData);
  await newEmployee.save();

  const newUser = new User({
    username,
    password,
    role,
    employee: newEmployee._id,
  });
  await newUser.save();

  return { message: "User and employee registered successfully" };
}

async function loginUser({ username, password }) {
  if (!username || !password) {
    throw new Error("All fields are required");
  }

  const user = await User.findOne({ username }).populate("employee");

  if (!user) {
    throw new Error("Invalid username");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new Error("Invalid password");
  }

  return jwt.sign(
    {
      username: user.username,
      role: user.role,
      employee: user.employee,
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
}

module.exports = { registerUser, loginUser };
