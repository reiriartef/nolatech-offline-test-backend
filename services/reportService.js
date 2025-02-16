const Evaluation = require("../models/evaluationModel");
const Employee = require("../models/employeeModel");
const { jsPDF } = require("jspdf");
const { ChartJSNodeCanvas } = require("chartjs-node-canvas");
const path = require("path");
const fs = require("fs");
const { Readable } = require("stream");

async function generateEmployeeReport(employeeId) {
  const employee = await Employee.findById(employeeId).select(
    "firstName lastName email position department"
  );
  const evaluations = await Evaluation.find({ employee: employeeId }).populate({
    path: "evaluator",
    select: "username",
    populate: {
      path: "employee",
      select: "firstName lastName email position department",
    },
  });

  if (!employee) {
    throw new Error("Employee not found");
  }

  const doc = new jsPDF({ format: "letter", unit: "pt", margin: 50 });

  const margin = 50;
  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;

  // Header
  const logoPath = path.join(__dirname, "../utils/images/logo.jpeg");
  const logoData = fs.readFileSync(logoPath).toString("base64");
  doc.addImage(logoData, "JPEG", margin, margin, 50, 25);
  doc.setFontSize(20);
  doc.text("Reporte de Evaluación", margin + 60, margin + 15);
  doc.setFontSize(10);
  doc.text("Nolatech FullStack Test", pageWidth - margin - 100, margin);
  doc.text("123 Main Street", pageWidth - margin - 100, margin + 15);
  doc.text("Maracaibo, Zulia, 4002", pageWidth - margin - 100, margin + 30);
  doc.setLineWidth(0.5);
  doc.line(margin, margin + 40, pageWidth - margin, margin + 40);

  // Employee Info
  doc.setFontSize(14);
  doc.text(
    `Reporte de Evaluación para ${employee.firstName} ${employee.lastName}`,
    margin,
    margin + 60
  );
  doc.setFontSize(12);
  doc.text(`Email: ${employee.email}`, margin, margin + 80);
  doc.text(`Posición: ${employee.position}`, margin, margin + 95);
  doc.text(`Departamento: ${employee.department}`, margin, margin + 110);
  doc.setLineWidth(0.5);
  doc.line(margin, margin + 120, pageWidth - margin, margin + 120);

  // Evaluations
  let totalScores = {
    communication: 0,
    teamwork: 0,
    problemSolving: 0,
    leadership: 0,
  };

  let yPosition = margin + 140;
  evaluations.forEach((evaluation, index) => {
    totalScores.communication += evaluation.score.communication;
    totalScores.teamwork += evaluation.score.teamwork;
    totalScores.problemSolving += evaluation.score.problemSolving;
    totalScores.leadership += evaluation.score.leadership;

    const evaluationAverage = (
      (evaluation.score.communication +
        evaluation.score.teamwork +
        evaluation.score.problemSolving +
        evaluation.score.leadership) /
      4
    ).toFixed(2);

    // Check if the evaluation fits on the current page, otherwise add a new page
    if (yPosition + 150 > pageHeight - margin - 50) {
      doc.addPage();
      yPosition = margin;
    }

    doc.setFontSize(14);
    doc.text(`Evaluación ${index + 1}`, margin, yPosition);
    doc.setFontSize(12);
    doc.text(
      `Evaluador: ${evaluation.evaluator.username}`,
      margin,
      yPosition + 15
    );
    doc.text(`Comentarios: ${evaluation.comments}`, margin, yPosition + 30);
    doc.text("Puntuaciones:", margin, yPosition + 45);
    doc.text(
      `  Comunicación: ${evaluation.score.communication}`,
      margin,
      yPosition + 60
    );
    doc.text(
      `  Trabajo en equipo: ${evaluation.score.teamwork}`,
      margin,
      yPosition + 75
    );
    doc.text(
      `  Resolución de problemas: ${evaluation.score.problemSolving}`,
      margin,
      yPosition + 90
    );
    doc.text(
      `  Liderazgo: ${evaluation.score.leadership}`,
      margin,
      yPosition + 105
    );
    doc.text(
      `Resultado de la Evaluación: ${evaluationAverage}`,
      margin,
      yPosition + 120
    );
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition + 130, pageWidth - margin, yPosition + 130);
    yPosition += 150;
  });

  // Average Scores
  const numEvaluations = evaluations.length;
  const averageScores = {
    communication: (totalScores.communication / numEvaluations).toFixed(2),
    teamwork: (totalScores.teamwork / numEvaluations).toFixed(2),
    problemSolving: (totalScores.problemSolving / numEvaluations).toFixed(2),
    leadership: (totalScores.leadership / numEvaluations).toFixed(2),
  };

  if (yPosition + 100 > pageHeight - margin - 50) {
    doc.addPage();
    yPosition = margin;
  }

  doc.setFontSize(14);
  doc.text("Promedio de Puntuaciones", margin, yPosition);
  doc.setFontSize(12);
  doc.text(
    `  Comunicación: ${averageScores.communication}`,
    margin,
    yPosition + 15
  );
  doc.text(
    `  Trabajo en equipo: ${averageScores.teamwork}`,
    margin,
    yPosition + 30
  );
  doc.text(
    `  Resolución de problemas: ${averageScores.problemSolving}`,
    margin,
    yPosition + 45
  );
  doc.text(`  Liderazgo: ${averageScores.leadership}`, margin, yPosition + 60);

  // Generate Chart
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width: 400, height: 400 });
  const chartData = {
    labels: [
      "Comunicación",
      "Trabajo en equipo",
      "Resolución de problemas",
      "Liderazgo",
    ],
    datasets: [
      {
        label: "Promedio de Puntuaciones",
        data: [
          averageScores.communication,
          averageScores.teamwork,
          averageScores.problemSolving,
          averageScores.leadership,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };
  const chartConfig = {
    type: "bar",
    data: chartData,
  };
  const chartBuffer = await chartJSNodeCanvas.renderToBuffer(chartConfig);
  const chartImage = chartBuffer.toString("base64");

  if (yPosition + 350 > pageHeight - margin - 50) {
    doc.addPage();
    yPosition = margin;
  }

  // Add Chart to PDF
  yPosition += 80; // Add some space before the chart
  doc.addImage(
    chartImage,
    "PNG",
    margin,
    yPosition,
    pageWidth - 2 * margin,
    300
  );

  // Footer
  const footerYPosition = pageHeight - margin;
  doc.setFontSize(10);
  doc.text(
    "Generated by Nolatech FullStack Test",
    pageWidth / 2,
    footerYPosition,
    {
      align: "center",
    }
  );

  const pdfBuffer = doc.output("arraybuffer");
  const pdfStream = new Readable();
  pdfStream.push(Buffer.from(pdfBuffer));
  pdfStream.push(null);

  return pdfStream;
}

module.exports = { generateEmployeeReport };
