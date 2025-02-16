const request = require("supertest");
const express = require("express");
const evaluationRoutes = require("../../routes/evaluationRoutes");
const {
  createEvaluationController,
  getEvaluationByIdController,
  updateEvaluationController,
  getEvaluationsByEmployeeIdController,
} = require("../../controllers/evaluationController");
const authMiddleware = require("../../middlewares/authMiddleware");

jest.mock("../../controllers/evaluationController");
jest.mock("../../middlewares/authMiddleware");

const app = express();
app.use(express.json());
app.use("/api/evaluations", evaluationRoutes);

describe("Evaluation Routes", () => {
  beforeEach(() => {
    authMiddleware.mockImplementation((req, res, next) => next());
  });

  describe("POST /api/evaluations", () => {
    it("should create a new evaluation", async () => {
      const evaluation = {
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

      createEvaluationController.mockImplementation((req, res) => {
        res.status(201).json(evaluation);
      });

      const response = await request(app)
        .post("/api/evaluations")
        .send(evaluation);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(evaluation);
    });

    it("should return an error if something goes wrong", async () => {
      const errorMessage = "Something went wrong";

      createEvaluationController.mockImplementation((req, res) => {
        res.status(400).json({ message: errorMessage });
      });

      const response = await request(app).post("/api/evaluations").send({});

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: errorMessage });
    });
  });

  describe("GET /api/evaluations/:id", () => {
    it("should return an evaluation by id", async () => {
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

      getEvaluationByIdController.mockImplementation((req, res) => {
        res.status(200).json(evaluation);
      });

      const response = await request(app).get("/api/evaluations/evaluationId");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(evaluation);
    });

    it("should return an error if evaluation is not found", async () => {
      const errorMessage = "Evaluation not found";

      getEvaluationByIdController.mockImplementation((req, res) => {
        res.status(404).json({ message: errorMessage });
      });

      const response = await request(app).get("/api/evaluations/evaluationId");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: errorMessage });
    });
  });

  describe("PUT /api/evaluations/:id", () => {
    it("should update an evaluation by id", async () => {
      const updatedEvaluation = {
        _id: "evaluationId",
        evaluator: "userId",
        employee: "employeeId",
        score: {
          communication: 4,
          teamwork: 5,
          problemSolving: 4,
          leadership: 5,
        },
        comments: "Improved performance",
      };

      updateEvaluationController.mockImplementation((req, res) => {
        res.status(200).json(updatedEvaluation);
      });

      const response = await request(app)
        .put("/api/evaluations/evaluationId")
        .send(updatedEvaluation);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedEvaluation);
    });

    it("should return an error if evaluation is not found", async () => {
      const errorMessage = "Evaluation not found";

      updateEvaluationController.mockImplementation((req, res) => {
        res.status(404).json({ message: errorMessage });
      });

      const response = await request(app)
        .put("/api/evaluations/evaluationId")
        .send({});

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: errorMessage });
    });
  });

  describe("GET /api/evaluations/employee/:id", () => {
    it("should return evaluations by employee id", async () => {
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

      getEvaluationsByEmployeeIdController.mockImplementation((req, res) => {
        res.status(200).json(evaluations);
      });

      const response = await request(app).get(
        "/api/evaluations/employee/employeeId"
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual(evaluations);
    });

    it("should return an error if something goes wrong", async () => {
      const errorMessage = "Something went wrong";

      getEvaluationsByEmployeeIdController.mockImplementation((req, res) => {
        res.status(404).json({ message: errorMessage });
      });

      const response = await request(app).get(
        "/api/evaluations/employee/employeeId"
      );

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: errorMessage });
    });
  });
});
