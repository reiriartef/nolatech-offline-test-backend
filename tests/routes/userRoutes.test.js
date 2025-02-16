const request = require("supertest");
const express = require("express");
const userRoutes = require("../../routes/userRoutes");
const {
  registerUserController,
  loginUserController,
} = require("../../controllers/userController");

jest.mock("../../controllers/userController");

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);

describe("User Routes", () => {
  describe("POST /api/users/register", () => {
    it("should return 201 and success message when user is registered", async () => {
      registerUserController.mockImplementation((req, res) => {
        res.status(201).json({ message: "User registered successfully" });
      });

      const response = await request(app).post("/api/users/register").send({
        username: "testuser",
        password: "password123",
        role: "Employee",
      });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        message: "User registered successfully",
      });
    });

    it("should return 400 and error message when registration fails", async () => {
      registerUserController.mockImplementation((req, res) => {
        res.status(400).json({ message: "Username already exists" });
      });

      const response = await request(app).post("/api/users/register").send({
        username: "testuser",
        password: "password123",
        role: "Employee",
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Username already exists" });
    });
  });

  describe("POST /api/users/login", () => {
    it("should return 200 and token when login is successful", async () => {
      loginUserController.mockImplementation((req, res) => {
        res.status(200).json({ token: "token" });
      });

      const response = await request(app)
        .post("/api/users/login")
        .send({ username: "testuser", password: "password123" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ token: "token" });
    });

    it("should return 400 and error message when login fails", async () => {
      loginUserController.mockImplementation((req, res) => {
        res.status(400).json({ message: "Invalid credentials" });
      });

      const response = await request(app)
        .post("/api/users/login")
        .send({ username: "testuser", password: "password123" });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Invalid credentials" });
    });
  });
});
