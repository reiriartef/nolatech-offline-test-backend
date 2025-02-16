const Feedback = require("../models/feedbackModel");

async function createFeedback(feedbackData) {
  const newFeedback = new Feedback(feedbackData);
  await newFeedback.save();
  return newFeedback;
}

module.exports = { createFeedback };
