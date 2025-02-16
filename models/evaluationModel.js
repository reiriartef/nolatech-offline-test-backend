const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EvaluationSchema = new Schema({
  evaluator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  employee: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
  date: { type: Date, default: Date.now },
  score: {
    communication: { type: Number, required: true },
    teamwork: { type: Number, required: true },
    problemSolving: { type: Number, required: true },
    leadership: { type: Number, required: true },
  },
  comments: { type: String },
});

module.exports = mongoose.model("Evaluation", EvaluationSchema);
