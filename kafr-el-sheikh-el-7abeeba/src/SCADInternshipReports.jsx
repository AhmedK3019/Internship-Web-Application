import React, { useState } from "react";
import reportsData from "./ReportsData";
import "./index.css";
import jsPDF from "jspdf";

function SCADInternshipReports() {
  const [reports, setReports] = useState(reportsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [majorFilter, setMajorFilter] = useState("All");

  const [selectedReport, setSelectedReport] = useState(null);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [clarifications, setClarifications] = useState({});

  const handleClarificationSubmit = (id, text) => {
    setClarifications((prev) => ({ ...prev, [id]: text }));
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
            <strong>Status:</strong> {report.status}
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

  const handleStatusChange = (id, newStatus) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === id ? { ...report, status: newStatus } : report
      )
    );
  };

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.studentName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || report.status === statusFilter;
    const matchesMajor = majorFilter === "All" || report.major === majorFilter;

    return matchesSearch && matchesStatus && matchesMajor;
  });

  const generatePDF = (report) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Internship Report", 14, 22);

    doc.setFontSize(12);
    doc.text(`Title: ${report.title}`, 14, 40);
    doc.text(`Student: ${report.studentName}`, 14, 50);
    doc.text(`Major: ${report.major}`, 14, 60);
    doc.text(`Status: ${report.status}`, 14, 70);
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
    <div className="internship-background">
      <div className="listings-container">
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
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Flagged">Flagged</option>
            <option value="Rejected">Rejected</option>
            <option value="Accepted">Accepted</option>
          </select>

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
                  <span className="detail-label">Status:</span> {report.status}
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
                  <span className="detail-label">End Date:</span>{" "}
                  {report.endDate}
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
                    onClick={() => generatePDF(report)}
                    style={{ marginTop: "10px" }}
                  >
                    Download PDF
                  </button>
                  <button
                    onClick={() => {
                      setSelectedReport(report);
                      setShowEvaluationModal(true);
                    }}
                    style={{ marginTop: "10px" }}
                  >
                    View Evaluation
                  </button>
                </div>
                {["Rejected", "Flagged"].includes(report.status) && (
                  <div style={{ marginTop: "10px" }}>
                    <textarea
                      rows="3"
                      placeholder="Submit a clarification..."
                      className="search-input"
                      style={{ width: "100%", marginBottom: "5px" }}
                      value={clarifications[report.id] || ""}
                      onChange={(e) =>
                        setClarifications((prev) => ({
                          ...prev,
                          [report.id]: e.target.value,
                        }))
                      }
                    />
                    <button
                      onClick={() =>
                        handleClarificationSubmit(
                          report.id,
                          clarifications[report.id]
                        )
                      }
                    >
                      Submit Clarification
                    </button>
                  </div>
                )}
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
    </div>
  );
}

export default SCADInternshipReports;
