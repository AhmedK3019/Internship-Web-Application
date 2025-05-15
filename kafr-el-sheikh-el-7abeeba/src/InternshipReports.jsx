import React, { useState, useEffect } from "react";
import reportsData from "./ReportsData";
import "./index.css";
import jsPDF from "jspdf";

function InternshipReports() {
  const [reports, setReports] = useState(reportsData);
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
          <p>
            <strong>Student Name:</strong> {report.studentName}
          </p>
          <p>
            <strong>Major:</strong> {report.major}
          </p>
          <p>
            <strong>Company:</strong> {report.company}
          </p>
          <p>
            <strong>Supervisor:</strong> {report.supervisor}
          </p>
          <p>
            <strong>Internship Period:</strong> {report.startDate} to{" "}
            {report.endDate}
          </p>
          <p>
            <strong>Description:</strong> {report.description}
          </p>

          {report.evaluation && (
            <>
              <p>
                <strong>Rating:</strong> {report.evaluation.rating} / 5
              </p>
              <p>
                <strong>Recommends:</strong>{" "}
                {report.evaluation.recommends ? "Yes" : "No"}
              </p>
              <p>
                <strong>Feedback:</strong> {report.evaluation.feedback}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.studentName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesMajor = majorFilter === "All" || report.major === majorFilter;

    return matchesSearch && matchesMajor;
  });

  const generatePDF = (report) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Internship Report", 14, 22);

    doc.setFontSize(12);
    doc.text(`Title: ${report.title}`, 14, 40);
    doc.text(`Student: ${report.studentName}`, 14, 50);
    doc.text(`Major: ${report.major}`, 14, 60);
    doc.text(`Industry: ${report.industry}`, 14, 80);
    doc.text(`Duration: ${report.duration}`, 14, 90);
    doc.text(`Location: ${report.location}`, 14, 100);
    doc.text(`Start Date: ${report.startDate}`, 14, 110);
    doc.text(`End Date: ${report.endDate}`, 14, 120);
    doc.text(`Description: ${report.description}`, 14, 130);
    doc.text(`Skills: ${report.skills}`, 14, 140);

    doc.setFont("times", "normal");
    doc.setFontSize(11);

    const splitSummary = doc.splitTextToSize(report.summary, 180);

    doc.save(`${report.studentName.replace(" ", "_")}_Report.pdf`);
  };

  return (
    <div className="listings-container" style={{ paddingRight: "70px" }}>
      <h1>Internship Reports</h1>

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
              <h2>{report.title}</h2>
              <p>
                <span className="detail-label">Student:</span>{" "}
                {report.studentName}
              </p>
              <p>
                <span className="detail-label">Major:</span> {report.major}
              </p>
              <p>
                <span className="detail-label">Industry:</span>{" "}
                {report.industry}
              </p>
              <p>
                <span className="detail-label">Duration:</span>{" "}
                {report.duration}
              </p>
              <p>
                <span className="detail-label">Location:</span>{" "}
                {report.location}
              </p>
              <p>
                <span className="detail-label">Start Date:</span>{" "}
                {report.startDate}
              </p>
              <p>
                <span className="detail-label">End Date:</span> {report.endDate}
              </p>
              <p>
                <span className="detail-label">Description:</span>{" "}
                {report.description}
              </p>
              <p>
                <span className="detail-label">Skills:</span>{" "}
                {report.skills.join(", ")}
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
                  View Evaluation
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
