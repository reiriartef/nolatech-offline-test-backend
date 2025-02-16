const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  dni: { type: Number, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  manager: { type: Schema.Types.ObjectId, ref: "Employee" },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
