const { registerUser, loginUser } = require("../services/userService");

async function registerUserController(req, res) {
  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function loginUserController(req, res) {
  try {
    const result = await loginUser(req.body);
    res.status(200).json({ token: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = { registerUserController, loginUserController };
