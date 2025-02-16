const {
  createEvaluation,
  getEvaluationById,
  updateEvaluation,
  getEvaluationsByEmployeeId,
} = require("../services/evaluationService");

async function createEvaluationController(req, res) {
  try {
    const evaluation = await createEvaluation(req.body);
    res.status(201).json(evaluation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function getEvaluationByIdController(req, res) {
  try {
    const evaluation = await getEvaluationById(req.params.id);
    res.status(200).json(evaluation);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

async function updateEvaluationController(req, res) {
  try {
    const evaluation = await updateEvaluation(req.params.id, req.body);
    res.status(200).json(evaluation);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

async function getEvaluationsByEmployeeIdController(req, res) {
  try {
    const evaluations = await getEvaluationsByEmployeeId(req.params.id);
    res.status(200).json(evaluations);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

module.exports = {
  createEvaluationController,
  getEvaluationByIdController,
  updateEvaluationController,
  getEvaluationsByEmployeeIdController,
};
