const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser({ username, password, role }) {
  if (!username || !password || !role) {
    throw new Error("All fields are required");
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new Error("Username already exists");
  }

  const newUser = new User({ username, password, role });
  await newUser.save();

  return { message: "User registered successfully" };
}

async function loginUser({ username, password }) {
  if (!username || !password) {
    throw new Error("All fields are required");
  }

  const user = await User.findOne({ username });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new Error("Invalid credentials");
  }

  return jwt.sign(
    { username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
}

module.exports = { registerUser, loginUser };
