const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  evaluation: {
    type: Schema.Types.ObjectId,
    ref: "Evaluation",
    required: true,
  },
  feedbackGiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
  feedbackReceiver: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  date: { type: Date, default: Date.now },
  content: { type: String, required: true },
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
