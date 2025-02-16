function errorHandler(err, req, res, next) {
  if (!err) {
    return next();
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message, errors: err.errors });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "Invalid token" });
  }

  if (err.name === "MongoError") {
    return res
      .status(500)
      .json({ message: "Database error", error: err.message });
  }

  if (err.status === 404) {
    return res.status(404).json({ message: "Not Found" });
  }

  res.status(500).json({
    message: "Internal Server Error",
    error: err.message || "Unknown error",
  });
}

module.exports = errorHandler;
