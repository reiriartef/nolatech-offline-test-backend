const express = require("express");
const port = process.env.SERVER_PORT || 3000;
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const connectDb = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const validateInput = require("./middlewares/validateInput");
const authMiddleware = require("./middlewares/authMiddleware");
const userRoutes = require("./routes/userRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const evaluationRoutes = require("./routes/evaluationRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const reportRoutes = require("./routes/reportRoutes");

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

connectDb();

app.use("/api/auth", validateInput, userRoutes);
app.use("/api/employees", authMiddleware, employeeRoutes);
app.use("/api/evaluations", authMiddleware, evaluationRoutes);
app.use("/api/feedback", authMiddleware, feedbackRoutes);
app.use("/api/reports", authMiddleware, reportRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
