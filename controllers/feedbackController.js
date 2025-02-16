const { createFeedback } = require("../services/feedbackService");

async function createFeedbackController(req, res) {
  try {
    const feedback = await createFeedback(req.body);
    res.status(201).json(feedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = { createFeedbackController };
