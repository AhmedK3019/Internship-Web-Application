import React, { useState, useEffect } from "react";
import ReportsData from "./ReportsData";
import "./index.css";
import jsPDF from "jspdf";

function InternshipReports() {
  const [reports, setReports] = useState(ReportsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [majorFilter, setMajorFilter] = useState("All");

  const [selectedReport, setSelectedReport] = useState(null);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [clarifications, setClarifications] = useState({});
  const [submittedClarifications, setSubmittedClarifications] = useState({});

  useEffect(() => {
    const savedClarifications = localStorage.getItem("clarifications");
    const savedSubmissions = localStorage.getItem("submittedClarifications");

    if (savedClarifications) {
      setClarifications(JSON.parse(savedClarifications));
    }

    if (savedSubmissions) {
      setSubmittedClarifications(JSON.parse(savedSubmissions));
    }
  }, []);

  const handleClarificationSubmit = (id, text) => {
    if (!text || !text.trim()) {
      alert("Please enter a clarification message");
      return;
    }

    // Update the submitted state
    const updatedSubmissions = {
      ...submittedClarifications,
      [id]: true,
    };

    // Update the clarifications text
    const updatedClarifications = {
      ...clarifications,
      [id]: text,
    };

    // Set both state updates
    setSubmittedClarifications(updatedSubmissions);
    setClarifications(updatedClarifications);
  };

  const EvaluationModal = ({ report, onClose }) => (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Evaluation Report</h2>
          <button onClick={onClose} className="close-button">
            &times;
          </button>
        </div>

        <div className="evaluation-details">
          <h3>Company Information</h3>
          <p>
            <strong>Company:</strong> {report.companyName}
          </p>
          <p>
            <strong>Industry:</strong> {report.companyIndustry}
          </p>
          <p>
            <strong>Location:</strong> {report.companyLocation}
          </p>
          <p>
            <strong>Website:</strong> {report.companyWebsite}
          </p>
          <h3>Student Information</h3>
          <p>
            <strong>Name:</strong> {report.studentName}
          </p>
          <p>
            <strong>Email:</strong> {report.studentEmail}
          </p>
          <p>
            <strong>Major:</strong> {report.studentMajor}
          </p>
          <p>
            <strong>Department:</strong> {report.studentDepartment}
          </p>
          <p>
            <strong>GPA:</strong> {report.studentGPA}
          </p>
          <p>
            <strong>Year:</strong> {report.studentYear}
          </p>

          <h3>Supervisor Information</h3>
          <p>
            <strong>Name:</strong> {report.supervisorName}
          </p>
          <p>
            <strong>Position:</strong> {report.supervisorPosition}
          </p>
          <p>
            <strong>Email:</strong> {report.supervisorEmail}
          </p>
          <p>
            <strong>Phone:</strong> {report.supervisorPhone}
          </p>

          <h3>Internship Details</h3>
          <p>
            <strong>Title:</strong> {report.internshipTitle}
          </p>
          <p>
            <strong>Duration:</strong> {report.internshipDuration}
          </p>
          <p>
            <strong>Period:</strong> {report.internshipStartDate} to{" "}
            {report.internshipEndDate}
          </p>
          <p>
            <strong>Description:</strong> {report.internshipDescription}
          </p>

          <h3>Performance Ratings</h3>
          <p>
            <strong>Technical Skills:</strong> {report.technicalSkillsRating} /
            5
          </p>
          <p>
            <strong>Problem Solving:</strong> {report.problemSolvingRating} / 5
          </p>
          <p>
            <strong>Communication:</strong> {report.communicationRating} / 5
          </p>
          <p>
            <strong>Professionalism:</strong> {report.professionalismRating} / 5
          </p>
          <p>
            <strong>Overall Rating:</strong> {report.overallRating} / 5
          </p>

          <h3>Additional Information</h3>
          <p>
            <strong>Key Responsibilities:</strong>{" "}
            {report.keyResponsibilities.join(", ")}
          </p>
          <p>
            <strong>Skills Gained:</strong> {report.skillsGained.join(", ")}
          </p>
          <p>
            <strong>Projects Contributed:</strong>{" "}
            {report.projectsContributed.join(", ")}
          </p>
          <p>
            <strong>Supervisor Comments:</strong> {report.supervisorComments}
          </p>
          <p>
            <strong>Recommendation:</strong> {report.recommendation}
          </p>
        </div>
      </div>
    </div>
  );

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.internshipTitle
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      report.studentName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesMajor =
      majorFilter === "All" || report.studentMajor === majorFilter;

    return matchesSearch && matchesMajor;
  });

  const generatePDF = (report) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const contentWidth = pageWidth - 2 * margin;
    let yPosition = 20;
    const lineHeight = 7;

    const addSectionHeader = (text) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text(text, pageWidth / 2, yPosition, { align: "center" });
      yPosition += 5;

      doc.setDrawColor(66, 133, 244); // Blue line
      doc.setLineWidth(0.5);
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 10;
    };

    const addInlineText = (label, value) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(label, margin, yPosition);

      const labelWidth =
        (doc.getStringUnitWidth(label) * 11) / doc.internal.scaleFactor;
      const valueStartX = margin + Math.max(labelWidth + 5, 40);

      doc.setFont("helvetica", "normal");

      const textLines = doc.splitTextToSize(
        value,
        contentWidth - valueStartX + margin
      );
      doc.text(textLines, valueStartX, yPosition);

      yPosition += lineHeight * Math.max(textLines.length, 1) + 3;
    };

    const addMultilineText = (label, value) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(label, margin, yPosition);
      yPosition += lineHeight;

      doc.setFont("helvetica", "normal");

      const textLines = doc.splitTextToSize(value, contentWidth - 10);
      doc.text(textLines, margin + 10, yPosition);

      yPosition += lineHeight * textLines.length + 2;
    };

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(44, 62, 80); // Dark blue/gray color
    doc.text("INTERNSHIP EVALUATION REPORT", pageWidth / 2, yPosition, {
      align: "center",
    });
    doc.text(
      "Job Title: " + report.internshipTitle,
      pageWidth / 2,
      yPosition + 10,
      { align: "center" }
    );
    yPosition += 25;

    addSectionHeader("Student Information");
    addInlineText("Name", report.studentName);
    addInlineText("Email", report.studentEmail);
    addInlineText("Major", report.studentMajor);
    addInlineText("Department", report.studentDepartment);
    addInlineText("GPA", report.studentGPA);
    addInlineText("Year", report.studentYear);
    yPosition += 5;

    addSectionHeader("Company Information");
    addInlineText("Company", report.companyName);
    addInlineText("Industry", report.companyIndustry);
    addInlineText("Location", report.companyLocation);
    addInlineText("Website", report.companyWebsite);
    yPosition += 5;

    addSectionHeader("Supervisor Information");
    addInlineText("Name", report.supervisorName);
    addInlineText("Position", report.supervisorPosition);
    addInlineText("Email", report.supervisorEmail);
    addInlineText("Phone", report.supervisorPhone);
    yPosition += 5;

    addSectionHeader("Internship Details");
    addInlineText("Title", report.internshipTitle);
    addInlineText("Duration", report.internshipDuration);
    addInlineText(
      "Period",
      `${report.internshipStartDate} to ${report.internshipEndDate}`
    );
    addInlineText("Description", report.internshipDescription);
    yPosition += 5;

    addSectionHeader("Performance Ratings");

    const addRatingBar = (label, rating) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(`${label}: `, margin, yPosition);

      const barStartX = margin + 70;
      const barWidth = 70;
      const barHeight = 5;

      doc.setFillColor(220, 220, 220);
      doc.rect(barStartX, yPosition - 4, barWidth, barHeight, "F");

      const fillWidth = (rating / 5) * barWidth;
      doc.setFillColor(66, 133, 244);
      doc.rect(barStartX, yPosition - 4, fillWidth, barHeight, "F");

      doc.setFont("helvetica", "normal");
      doc.text(`${rating}/5`, barStartX + barWidth + 5, yPosition);

      yPosition += lineHeight;
    };

    addRatingBar("Technical Skills", report.technicalSkillsRating);
    addRatingBar("Problem Solving", report.problemSolvingRating);
    addRatingBar("Communication", report.communicationRating);
    addRatingBar("Professionalism", report.professionalismRating);
    addRatingBar("Overall Rating", report.overallRating);
    yPosition += 5;

    addSectionHeader("Additional Information");
    addMultilineText(
      "Key Responsibilities",
      report.keyResponsibilities.join(", ")
    );
    addMultilineText("Skills Gained", report.skillsGained.join(", "));
    addMultilineText(
      "Projects Contributed",
      report.projectsContributed.join(", ")
    );
    addMultilineText("Supervisor Comments", report.supervisorComments);
    addMultilineText("Recommendation", report.recommendation);

    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text(`Page ${i} of ${totalPages}`, pageWidth / 2, 285, {
        align: "center",
      });
    }

    doc.save(
      `${report.studentName.replace(/\s+/g, "_")}_Internship_Report.pdf`
    );
  };

  return (
    <div className="listings-container" style={{ paddingRight: "70px" }}>
      <h1>Internship Evaluations</h1>

      <input
        type="text"
        placeholder="Search by title or student name..."
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="filter-row">
        <select
          className="filter-select"
          value={majorFilter}
          onChange={(e) => setMajorFilter(e.target.value)}
        >
          <option value="All">All Majors</option>
          <option value="MET">MET</option>
          <option value="IET">IET</option>
          <option value="EMS">EMS</option>
        </select>
      </div>

      <div className="internship-list">
        {filteredReports.length === 0 ? (
          <div>No reports found.</div>
        ) : (
          filteredReports.map((report) => (
            <div key={report.id} className="internship-card">
              <h2>{report.internshipTitle}</h2>
              <p>
                <span className="detail-label">Company:</span>{" "}
                {report.companyName}
              </p>
              <p>
                <span className="detail-label">Student:</span>{" "}
                {report.studentName}
              </p>
              <p>
                <span className="detail-label">Major:</span>{" "}
                {report.studentMajor}
              </p>
              <p>
                <span className="detail-label">Supervisor:</span>{" "}
                {report.supervisorName}
              </p>
              <p>
                <span className="detail-label">Duration:</span>{" "}
                {report.internshipDuration}
              </p>
              <p>
                <span className="detail-label">Location:</span>{" "}
                {report.companyLocation}
              </p>
              <p>
                <span className="detail-label">Period:</span>{" "}
                {report.internshipStartDate} to {report.internshipEndDate}
              </p>
              <p>
                <span className="detail-label">Skills Gained:</span>{" "}
                {report.skillsGained.join(", ")}
              </p>
              <p>
                <span className="detail-label">Overall Rating:</span>{" "}
                {report.overallRating}/5
              </p>
              <div className="detail-actions">
                <button
                  className="green-btn"
                  onClick={() => generatePDF(report)}
                  style={{ marginTop: "10px" }}
                >
                  Download PDF
                </button>
                <button
                  className="btn-primary1"
                  onClick={() => {
                    setSelectedReport(report);
                    setShowEvaluationModal(true);
                  }}
                  style={{ marginTop: "10px" }}
                >
                  View Full Evaluation
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {showEvaluationModal && selectedReport && (
        <EvaluationModal
          report={selectedReport}
          onClose={() => setShowEvaluationModal(false)}
        />
      )}
    </div>
  );
}

export default InternshipReports;
