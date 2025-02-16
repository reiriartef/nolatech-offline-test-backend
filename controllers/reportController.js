const { generateEmployeeReport } = require("../services/reportService");

async function generateEmployeeReportController(req, res) {
  try {
    const employeeId = req.params.id;
    const reportStream = await generateEmployeeReport(employeeId);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=employee_report_${employeeId}.pdf`
    );
    reportStream.pipe(res);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = { generateEmployeeReportController };
