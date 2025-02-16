function validateInput(req, res, next) {
  const { body } = req;
  if (!body || Object.keys(body).length === 0) {
    return res.status(400).json({ message: "Invalid input data" });
  }
  next();
}

module.exports = validateInput;
