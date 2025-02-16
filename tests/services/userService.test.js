const { registerUser, loginUser } = require("../../services/userService");
const User = require("../../models/userModel");
const Employee = require("../../models/employeeModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

jest.mock("../../models/userModel");
jest.mock("../../models/employeeModel");
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
          employeeData: { dni: 12345678 },
        })
      ).rejects.toThrow("Username already exists");
    });

    it("should throw an error if employee with this dni already exists", async () => {
      User.findOne.mockResolvedValue(null);
      Employee.findOne.mockResolvedValue({ dni: 12345678 });
      await expect(
        registerUser({
          username: "testuser",
          password: "password123",
          role: "Employee",
          employeeData: { dni: 12345678 },
        })
      ).rejects.toThrow("Employee with this dni already exists");
    });

    it("should register a new user and employee successfully", async () => {
      User.findOne.mockResolvedValue(null);
      Employee.findOne.mockResolvedValue(null);
      Employee.prototype.save = jest.fn().mockResolvedValue({});
      User.prototype.save = jest.fn().mockResolvedValue({});
      const result = await registerUser({
        username: "testuser",
        password: "password123",
        role: "Employee",
        employeeData: {
          dni: 12345678,
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          position: "Developer",
          department: "Engineering",
        },
      });
      expect(result).toEqual({
        message: "User and employee registered successfully",
      });
    });
  });

  describe("loginUser", () => {
    it("should throw an error if any field is missing", async () => {
      await expect(loginUser({ username: "testuser" })).rejects.toThrow(
        "All fields are required"
      );
    });

    it("should throw an error if username is invalid", async () => {
      User.findOne.mockImplementation(() => ({
        populate: jest.fn().mockResolvedValue(null),
      }));
      await expect(
        loginUser({ username: "testuser", password: "password123" })
      ).rejects.toThrow("Invalid username");
    });

    it("should throw an error if password is invalid", async () => {
      const user = {
        username: "testuser",
        password: "hashedpassword",
        role: "Employee",
        employee: {},
      };
      User.findOne.mockImplementation(() => ({
        populate: jest.fn().mockResolvedValue(user),
      }));
      bcrypt.compare.mockResolvedValue(false);
      await expect(
        loginUser({ username: "testuser", password: "password123" })
      ).rejects.toThrow("Invalid password");
    });

    it("should return a token if credentials are valid", async () => {
      const user = {
        username: "testuser",
        password: "hashedpassword",
        role: "Employee",
        employee: {},
      };
      User.findOne.mockImplementation(() => ({
        populate: jest.fn().mockResolvedValue(user),
      }));
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
