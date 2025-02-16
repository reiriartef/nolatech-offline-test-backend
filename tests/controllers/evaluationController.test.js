const {
  createEvaluationController,
  getEvaluationByIdController,
  updateEvaluationController,
  getEvaluationsByEmployeeIdController,
} = require("../../controllers/evaluationController");
const {
  createEvaluation,
  getEvaluationById,
  updateEvaluation,
  getEvaluationsByEmployeeId,
} = require("../../services/evaluationService");

jest.mock("../../services/evaluationService");

describe("Evaluation Controller", () => {
  describe("createEvaluationController", () => {
    it("should create a new evaluation", async () => {
      const req = {
        body: {
          evaluator: "userId",
          employee: "employeeId",
          score: {
            communication: 5,
            teamwork: 4,
            problemSolving: 5,
            leadership: 4,
          },
          comments: "Great job!",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const evaluation = { ...req.body, _id: "evaluationId" };
      createEvaluation.mockResolvedValue(evaluation);

      await createEvaluationController(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(evaluation);
    });

    it("should return an error if something goes wrong", async () => {
      const req = {
        body: {
          evaluator: "userId",
          employee: "employeeId",
          score: {
            communication: 5,
            teamwork: 4,
            problemSolving: 5,
            leadership: 4,
          },
          comments: "Great job!",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const errorMessage = "Something went wrong";
      createEvaluation.mockRejectedValue(new Error(errorMessage));

      await createEvaluationController(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe("getEvaluationByIdController", () => {
    it("should return an evaluation by id", async () => {
      const req = { params: { id: "evaluationId" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const evaluation = {
        _id: "evaluationId",
        evaluator: "userId",
        employee: "employeeId",
        score: {
          communication: 5,
          teamwork: 4,
          problemSolving: 5,
          leadership: 4,
        },
        comments: "Great job!",
      };
      getEvaluationById.mockResolvedValue(evaluation);

      await getEvaluationByIdController(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(evaluation);
    });

    it("should return an error if evaluation is not found", async () => {
      const req = { params: { id: "evaluationId" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const errorMessage = "Evaluation not found";
      getEvaluationById.mockRejectedValue(new Error(errorMessage));

      await getEvaluationByIdController(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe("updateEvaluationController", () => {
    it("should update an evaluation by id", async () => {
      const req = {
        params: { id: "evaluationId" },
        body: {
          score: {
            communication: 4,
            teamwork: 5,
            problemSolving: 4,
            leadership: 5,
          },
          comments: "Improved performance",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const updatedEvaluation = {
        _id: "evaluationId",
        evaluator: "userId",
        employee: "employeeId",
        ...req.body,
      };
      updateEvaluation.mockResolvedValue(updatedEvaluation);

      await updateEvaluationController(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedEvaluation);
    });

    it("should return an error if evaluation is not found", async () => {
      const req = {
        params: { id: "evaluationId" },
        body: {
          score: {
            communication: 4,
            teamwork: 5,
            problemSolving: 4,
            leadership: 5,
          },
          comments: "Improved performance",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const errorMessage = "Evaluation not found";
      updateEvaluation.mockRejectedValue(new Error(errorMessage));

      await updateEvaluationController(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe("getEvaluationsByEmployeeIdController", () => {
    it("should return evaluations by employee id", async () => {
      const req = { params: { id: "employeeId" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const evaluations = [
        {
          _id: "evaluationId1",
          evaluator: "userId",
          employee: "employeeId",
          score: {
            communication: 5,
            teamwork: 4,
            problemSolving: 5,
            leadership: 4,
          },
          comments: "Great job!",
        },
        {
          _id: "evaluationId2",
          evaluator: "userId",
          employee: "employeeId",
          score: {
            communication: 4,
            teamwork: 5,
            problemSolving: 4,
            leadership: 5,
          },
          comments: "Improved performance",
        },
      ];
      getEvaluationsByEmployeeId.mockResolvedValue(evaluations);

      await getEvaluationsByEmployeeIdController(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(evaluations);
    });

    it("should return an error if something goes wrong", async () => {
      const req = { params: { id: "employeeId" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const errorMessage = "Something went wrong";
      getEvaluationsByEmployeeId.mockRejectedValue(new Error(errorMessage));

      await getEvaluationsByEmployeeIdController(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });
});
