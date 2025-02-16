const { registerUser, loginUser } = require("../../services/userService");
const User = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

jest.mock("../../models/userModel");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("User Service", () => {
  describe("registerUser", () => {
    it("should throw an error if any field is missing", async () => {
      await expect(registerUser({ username: "testuser" })).rejects.toThrow(
        "All fields are required"
      );
    });

    it("should throw an error if username already exists", async () => {
      User.findOne.mockResolvedValue({ username: "testuser" });
      await expect(
        registerUser({
          username: "testuser",
          password: "password123",
          role: "Employee",
        })
      ).rejects.toThrow("Username already exists");
    });

    it("should register a new user successfully", async () => {
      User.findOne.mockResolvedValue(null);
      User.prototype.save = jest.fn().mockResolvedValue({});
      const result = await registerUser({
        username: "testuser",
        password: "password123",
        role: "Employee",
      });
      expect(result).toEqual({ message: "User registered successfully" });
    });
  });

  describe("loginUser", () => {
    it("should throw an error if any field is missing", async () => {
      await expect(loginUser({ username: "testuser" })).rejects.toThrow(
        "All fields are required"
      );
    });

    it("should throw an error if credentials are invalid", async () => {
      User.findOne.mockResolvedValue(null);
      await expect(
        loginUser({ username: "testuser", password: "password123" })
      ).rejects.toThrow("Invalid credentials");
    });

    it("should return a token if credentials are valid", async () => {
      const user = {
        username: "testuser",
        password: "hashedpassword",
        role: "Employee",
      };
      User.findOne.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("token");
      const token = await loginUser({
        username: "testuser",
        password: "password123",
      });
      expect(token).toBe("token");
    });
  });
});
