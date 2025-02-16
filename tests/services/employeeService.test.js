const { listEmployees } = require("../../services/employeeService");
const Employee = require("../../models/employeeModel");

jest.mock("../../models/employeeModel");

describe("Employee Service", () => {
  describe("listEmployees", () => {
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
      Employee.find.mockResolvedValue(employees);
      const result = await listEmployees();
      expect(result).toEqual(employees);
    });
  });
});
