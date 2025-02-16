const Evaluation = require("../models/evaluationModel");

async function createEvaluation(evaluationData) {
  const newEvaluation = new Evaluation(evaluationData);
  await newEvaluation.save();
  return newEvaluation;
}

async function getEvaluationById(id) {
  const evaluation = await Evaluation.findById(id)
    .populate({
      path: "evaluator",
      select: "username",
      populate: {
        path: "employee",
        select: "firstName lastName email position department",
      },
    })
    .populate("employee", "firstName lastName email position department");
  if (!evaluation) {
    throw new Error("Evaluation not found");
  }
  return evaluation;
}

async function updateEvaluation(id, evaluationData) {
  const updatedEvaluation = await Evaluation.findByIdAndUpdate(
    id,
    evaluationData,
    { new: true }
  )
    .populate({
      path: "evaluator",
      select: "username",
      populate: {
        path: "employee",
        select: "firstName lastName email position department",
      },
    })
    .populate("employee", "firstName lastName email position department");
  if (!updatedEvaluation) {
    throw new Error("Evaluation not found");
  }
  return updatedEvaluation;
}

async function getEvaluationsByEmployeeId(employeeId) {
  const evaluations = await Evaluation.find({ employee: employeeId })
    .populate({
      path: "evaluator",
      select: "username",
      populate: {
        path: "employee",
        select: "firstName lastName email position department",
      },
    })
    .populate("employee", "firstName lastName email position department");
  return evaluations;
}

module.exports = {
  createEvaluation,
  getEvaluationById,
  updateEvaluation,
  getEvaluationsByEmployeeId,
};
