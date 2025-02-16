const request = require("supertest");
const express = require("express");
const employeeRoutes = require("../../routes/employeeRoutes");
const {
  listEmployeesController,
} = require("../../controllers/employeeController");
const authMiddleware = require("../../middlewares/authMiddleware");

jest.mock("../../controllers/employeeController");
jest.mock("../../middlewares/authMiddleware");

const app = express();
app.use(express.json());
app.use("/api/employees", employeeRoutes);

describe("Employee Routes", () => {
  beforeEach(() => {
    authMiddleware.mockImplementation((req, res, next) => next());
  });

  describe("GET /api/employees/list", () => {
    it("should return a list of employees", async () => {
      const employees = [
        {
          dni: 12345678,
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          position: "Developer",
          department: "Engineering",
        },
        {
          dni: 87654321,
          firstName: "Jane",
          lastName: "Smith",
          email: "jane.smith@example.com",
          position: "Manager",
          department: "HR",
        },
      ];

      listEmployeesController.mockImplementation((req, res) => {
        res.status(200).json(employees);
      });

      const response = await request(app).get("/api/employees/");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(employees);
    });

    it("should return an error if something goes wrong", async () => {
      const errorMessage = "Something went wrong";

      listEmployeesController.mockImplementation((req, res) => {
        res.status(500).json({ message: errorMessage });
      });

      const response = await request(app).get("/api/employees/");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: errorMessage });
    });
  });
});
