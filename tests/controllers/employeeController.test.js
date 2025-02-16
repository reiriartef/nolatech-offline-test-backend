const {
  listEmployeesController,
} = require("../../controllers/employeeController");
const { listEmployees } = require("../../services/employeeService");

jest.mock("../../services/employeeService");

describe("Employee Controller", () => {
  describe("listEmployeesController", () => {
    it("should return a list of employees", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

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

      listEmployees.mockResolvedValue(employees);

      await listEmployeesController(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(employees);
    });

    it("should return an error if something goes wrong", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const errorMessage = "Something went wrong";
      listEmployees.mockRejectedValue(new Error(errorMessage));

      await listEmployeesController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });
});
