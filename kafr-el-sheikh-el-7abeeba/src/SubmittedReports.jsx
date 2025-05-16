import React, { useState, useEffect } from "react";
import "./index.css";
import { jsPDF } from "jspdf";

function SubmittedReports({ isFaculty = false }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [clarifications, setClarifications] = useState({});
  const [submittedClarifications, setSubmittedClarifications] = useState({});

  const [reports, setReports] = useState(() => {
    const savedReports = localStorage.getItem("internshipReports");
    if (savedReports) {
      return JSON.parse(savedReports);
    } else {
      return [
        {
          id: 1,
          title: "Software Development Internship at Tech Solutions",
          introduction:
            "During my 3-month internship at Tech Solutions, I worked as a junior software developer on their customer management system.",
          body: "I implemented new features, fixed bugs, and participated in code reviews. Learned Agile development with React and Node.js.",
          courses: ["Software Engineering", "Database II", "Web Development"],
          status: "submitted",
          submittedDate: "05/14/2024",
          studentName: "John Doe",
          studentEmail: "JohnDoe@gmail.com",
          studentMajor: "MET",
          facultyStatus: "Pending",
        },
        {
          id: 2,
          title: "Data Analysis Internship at Analytics Pro",
          introduction:
            "Processed and analyzed large datasets for marketing clients at Analytics Pro.",
          body: "Cleaned data, created visualizations, and built predictive models using Python and SQL.",
          courses: ["Data Structures", "Database II", "Machine Learning"],
          status: "submitted",
          submittedDate: "05/10/2024",
          studentName: "Jane Smith",
          studentEmail: "JaneSmith@gmail.com",
          studentMajor: "IET",
          facultyStatus: "Accepted",
        },
        {
          id: 3,
          title: "Cloud Engineering Internship at CloudTech",
          introduction:
            "Worked with AWS services to migrate legacy applications to the cloud.",
          body: "Set up infrastructure as code using Terraform and configured CI/CD pipelines.",
          courses: [
            "Computer Organizations",
            "Operating Systems",
            "Software Engineering",
          ],
          status: "submitted",
          submittedDate: "05/08/2024",
          studentName: "Alice Johnson",
          studentEmail: "AliceJohnson@gmail.com",
          studentMajor: "AA",
          facultyStatus: "Flagged",
        },
        {
          id: 4,
          title: "Web Development Internship at Digital Agency",
          introduction:
            "Built and maintained client websites and web applications.",
          body: "Front-end development with HTML/CSS/JS and back-end work with PHP/MySQL.",
          courses: ["Web Development", "Database II", "User Interface Design"],
          status: "submitted",
          submittedDate: "05/12/2024",
          studentName: "Bob Brown",
          studentEmail: "BobBrown@gmail.com",
          studentMajor: "BI",
          facultyStatus: "Rejected",
        },
        {
          id: 5,
          title: "Cybersecurity Internship at SecureTech",
          introduction:
            "Identified and addressed security vulnerabilities in client applications.",
          body: "Conducted security audits, penetration testing, and implemented security best practices.",
          courses: [
            "Network Security",
            "Operating Systems",
            "Computer Networks",
          ],
          status: "submitted",
          submittedDate: "05/15/2024",
          studentName: "Charlie Davis",
          studentEmail: "CharlieDavis@gmail.com",
          studentMajor: "EMS",
          facultyStatus: "Pending",
        },
      ];
    }
  });

  // Save reports to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("internshipReports", JSON.stringify(reports));
  }, [reports]);

  // Available majors and status options
  const availableMajors = ["MET", "IET", "AA", "BI", "EMS"];
  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "Pending", label: "Pending" },
    { value: "Flagged", label: "Flagged" },
    { value: "Rejected", label: "Rejected" },
    { value: "Accepted", label: "Accepted" },
  ];

  // Filter reports based on search and filters
  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.studentEmail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesMajor = selectedMajor
      ? report.studentMajor === selectedMajor
      : true;

    const matchesStatus = selectedStatus
      ? report.facultyStatus === selectedStatus
      : true;

    return matchesSearch && matchesMajor && matchesStatus;
  });

  // Handler for status changes
  const handleStatusChange = (reportId, newStatus) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === reportId
          ? { ...report, facultyStatus: newStatus }
          : report
      )
    );
  };

  // Modal handlers
  const openReportModal = (report) => setSelectedReport(report);
  const closeReportModal = () => setSelectedReport(null);

  // PDF generation
  const downloadReport = (report) => {
    const doc = new jsPDF();
    const margin = 15;
    let y = margin;

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(report.title, 105, y, { align: "center" });
    y += 10;

    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, 200 - margin, y);
    y += 15;

    // Add report sections
    const addSection = (title, content) => {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(title, margin, y);
      y += 8;

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(content, 180);
      doc.text(lines, margin, y);
      y += lines.length * 7 + 15;
    };

    addSection("Introduction", report.introduction);
    addSection("Report Body", report.body);
    addSection("Relevant Courses", report.courses.join(", "));

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Internship Report - Generated by Student Portal", 105, 285, {
      align: "center",
    });

    doc.save(`${report.title.replace(/[^a-z0-9]/gi, "_")}.pdf`);
  };

  // Clarification submission
  const handleClarificationSubmit = (reportId, message) => {
    if (!message?.trim()) {
      alert("Please enter a clarification message");
      return;
    }

    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === reportId
          ? {
              ...report,

              rejectionComment: report.rejectionComment
                ? `${
                    report.rejectionComment
                  }\n\nFaculty Clarification (${new Date().toLocaleDateString()}): ${message}`
                : `${message}`,
            }
          : report
      )
    );

    setSubmittedClarifications((prev) => ({ ...prev, [reportId]: true }));
    setClarifications((prev) => ({ ...prev, [reportId]: "" }));
  };

  return (
    <div className="internship-background">
      <div className="listings-container">
        <h1>Submitted Internship Reports</h1>

        <div className="filters-container">
          <div className="search-filter-row">
            <input
              type="text"
              placeholder="Search reports by title, student, or email..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-row">
            <div className="filter-group">
              <label>Filter by Major:</label>
              <select
                className="filter-select"
                value={selectedMajor}
                onChange={(e) => setSelectedMajor(e.target.value)}
              >
                <option value="">All Majors</option>
                {availableMajors.map((major) => (
                  <option key={major} value={major}>
                    {major}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Filter by Status:</label>
              <select
                className="filter-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Reports List */}
        <div className="internship-list">
          {filteredReports.length === 0 ? (
            <div className="no-results">
              {searchQuery || selectedMajor || selectedStatus
                ? "No reports match your filters"
                : "No submitted reports yet"}
            </div>
          ) : (
            filteredReports.map((report) => (
              <div key={report.id} className="internship-card">
                <div>
                  <h2>{report.title}</h2>
                  <h3>
                    Submitted by: {report.studentName} ({report.studentEmail})
                  </h3>
                  <h4>Major: {report.studentMajor}</h4>
                  <h4>Submitted on: {report.submittedDate}</h4>
                  <h4
                    className={`status-${report.facultyStatus.toLowerCase()}`}
                  >
                    Current Status: {report.facultyStatus}
                  </h4>
                </div>

                <div className="details-grid">
                  <div className="detail-actions">
                    {isFaculty && (
                      <select
                        className="custom-select"
                        value={report.facultyStatus}
                        onChange={(e) =>
                          handleStatusChange(report.id, e.target.value)
                        }
                      >
                        {statusOptions
                          .filter((opt) => opt.value)
                          .map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                      </select>
                    )}

                    <button
                      className="btn-primary1"
                      onClick={() => openReportModal(report)}
                    >
                      View Report
                    </button>
                    <button
                      className="download-button"
                      onClick={() => downloadReport(report)}
                    >
                      Download PDF
                    </button>
                  </div>
                </div>

                {["Rejected", "Flagged"].includes(report.facultyStatus) && (
                  <div className="clarification-section">
                    {submittedClarifications[report.id] ? (
                      <div className="clarification-success">
                        <div className="success-message">
                          ✓ Submitted Successfully
                        </div>
                        <button className="green-btn" disabled>
                          Submitted
                        </button>
                      </div>
                    ) : (
                      <>
                        <textarea
                          rows="3"
                          placeholder="Submit a clarification..."
                          className="search-input"
                          value={clarifications[report.id] || ""}
                          onChange={(e) =>
                            setClarifications((prev) => ({
                              ...prev,
                              [report.id]: e.target.value,
                            }))
                          }
                        />
                        <button
                          className="green-btn"
                          onClick={() =>
                            handleClarificationSubmit(
                              report.id,
                              clarifications[report.id]
                            )
                          }
                        >
                          Submit Clarification
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Report Modal */}
      {selectedReport && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{selectedReport.title}</h2>
              <button className="close-button" onClick={closeReportModal}>
                ×
              </button>
            </div>
            <div className="evaluation-details">
              <div className="modal-body">
                <div className="detail-item">
                  <span className="detail-label">Student:</span>
                  <span>{selectedReport.studentName}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Email:</span>
                  <span>{selectedReport.studentEmail}</span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Relevant Courses:</span>
                  <span>{selectedReport.courses.join(", ")}</span>
                </div>

                <div className="form-group">
                  <label>Introduction</label>
                  <textarea
                    className="input"
                    value={selectedReport.introduction}
                    readOnly
                    rows="6"
                  />
                </div>

                <div className="form-group">
                  <label>Report Body</label>
                  <textarea
                    className="input"
                    value={selectedReport.body}
                    readOnly
                    rows="6"
                  />
                </div>

                <div className="form-actions">
                  <button
                    className="download-button"
                    onClick={() => downloadReport(selectedReport)}
                  >
                    Download PDF
                  </button>
                  <button className="delete-btn" onClick={closeReportModal}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubmittedReports;
