const {
  registerUserController,
  loginUserController,
} = require("../../controllers/userController");
const { registerUser, loginUser } = require("../../services/userService");

jest.mock("../../services/userService");

describe("User Controller", () => {
  describe("registerUserController", () => {
    it("should return 201 and success message when user is registered", async () => {
      const req = {
        body: {
          username: "testuser",
          password: "password123",
          role: "Employee",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      registerUser.mockResolvedValue({
        message: "User registered successfully",
      });

      await registerUserController(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "User registered successfully",
      });
    });

    it("should return 400 and error message when registration fails", async () => {
      const req = {
        body: {
          username: "testuser",
          password: "password123",
          role: "Employee",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      registerUser.mockRejectedValue(new Error("Username already exists"));

      await registerUserController(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Username already exists",
      });
    });
  });

  describe("loginUserController", () => {
    it("should return 200 and token when login is successful", async () => {
      const req = { body: { username: "testuser", password: "password123" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      loginUser.mockResolvedValue("token");

      await loginUserController(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ token: "token" });
    });

    it("should return 400 and error message when login fails", async () => {
      const req = { body: { username: "testuser", password: "password123" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      loginUser.mockRejectedValue(new Error("Invalid credentials"));

      await loginUserController(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
    });
  });
});
