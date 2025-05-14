import React, { useState, useEffect } from "react";
import "./index.css";
import { jsPDF } from "jspdf";

function Reportsubmission({ onBackReportsubmission, setNotifications }) {
  const [reports, setReports] = useState([]);
  const [currentReport, setCurrentReport] = useState({
    id: null,
    title: "",
    introduction: "",
    body: "",
    courses: [],
    file: null,
    fileName: "",
    status: "draft",
    facultyStatus: "Pending",
    submittedDate: null,
    appealStatus: null,
    rejectionComment: null
  });

  const rejectionComments = [
    "The report lacks sufficient detail about the technical skills you developed.",
    "Your learning outcomes are not clearly articulated in the report.",
    "The connection between your coursework and internship experience needs more explanation.",
    "The internship duration does not meet the minimum requirement.",
    "The company is not on our approved list of internship providers.",
    "The internship duties described do not align with your major's learning outcomes.",
    "Missing required documentation from the company supervisor.",
    "The report contains several grammatical errors that need to be corrected.",
    "The reflection component is too superficial and needs more depth.",
    "The skills listed don't match the job description you provided earlier."
  ];

  const [isEditing, setIsEditing] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appealReportId, setAppealReportId] = useState(null);
  const [appealMessage, setAppealMessage] = useState("");
  const [appealError, setAppealError] = useState(null);

  const [availableCourses, setAvailableCourses] = useState([
    { id: 1, name: "Software Engineering", selected: false },
    { id: 2, name: "Database II", selected: false },
    { id: 3, name: "Computer Organizations", selected: false },
    { id: 4, name: "Data Structures", selected: false },
    { id: 5, name: "Operating Systems", selected: false },
  ]);

  useEffect(() => {
    const savedReports = JSON.parse(localStorage.getItem("internshipReports")) || [];
    setReports(savedReports);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentReport({ ...currentReport, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentReport({
        ...currentReport,
        file: file,
        fileName: file.name,
      });
    }
  };

  const toggleCourseSelection = (courseId) => {
    setAvailableCourses(
      availableCourses.map((course) =>
        course.id === courseId
          ? { ...course, selected: !course.selected }
          : course
      )
    );
  };

  const saveReport = () => {
    const selectedCourses = availableCourses.filter((course) => course.selected);
    const reportToSave = {
      ...currentReport,
      courses: selectedCourses.map((course) => course.name),
      id: isEditing ? currentReport.id : Date.now(),
      status: "draft"
    };

    let updatedReports;
    if (isEditing) {
      updatedReports = reports.map((report) =>
        report.id === currentReport.id ? reportToSave : report
      );
    } else {
      updatedReports = [...reports, reportToSave];
    }

    setReports(updatedReports);
    localStorage.setItem("internshipReports", JSON.stringify(updatedReports));
    resetForm();
    setSubmissionStatus("saved");
  };

  const finalizeReport = (reportId) => {
    const possibleStatuses = ["Pending", "Accepted", "Flagged", "Rejected"];
    
    const randomStatus = possibleStatuses[Math.floor(Math.random() * possibleStatuses.length)];

    let comment = null;
    if (randomStatus === "Flagged" || randomStatus === "Rejected") {
      comment = rejectionComments[Math.floor(Math.random() * rejectionComments.length)];
    }
    
    const currentReports = JSON.parse(localStorage.getItem("internshipReports")) || [...reports];
    
    const reportExists = currentReports.some(r => r.id === reportId);
    if (!reportExists) {
      console.error("Report not found for finalizing:", reportId);
      return;
    }
    
    const updatedReports = currentReports.map(report =>
      report.id === reportId
        ? {
          ...report,
          status: "submitted",
          facultyStatus: randomStatus,
          submittedDate: new Date().toLocaleDateString(),
          appealStatus: null,
          rejectionComment: comment
        }
        : report
    );

    const updatedReport = updatedReports.find(r => r.id === reportId);

    setReports(updatedReports);
    localStorage.setItem("internshipReports", JSON.stringify(updatedReports));
    setSubmissionStatus("submitted");
    
    const submittedReport = updatedReports.find(r => r.id === reportId);
    if (submittedReport && setNotifications && randomStatus !== "Pending") {
      setNotifications(prev => [
        ...prev,
        {
          id: Date.now(),
          message: `Your report "${submittedReport.title}" status has been updated. Status: ${randomStatus}`,
          isRead: false,
          date: new Date().toISOString().split("T")[0],
        }
      ]);
    }
  };

  const handleAppealClick = (reportId) => {
    setAppealReportId(reportId === appealReportId ? null : reportId);
    setAppealMessage("");
    setAppealError(null);
  };

  const handleAppealMessageChange = (e) => {
    setAppealMessage(e.target.value);
  };

  const submitAppeal = () => {
    if (!appealMessage.trim()) {
      setAppealError("error");
      return;
    }

    const updatedReports = reports.map(report => 
      report.id === appealReportId 
        ? { ...report, appealStatus: "submitted" } 
        : report
    );
    
    setReports(updatedReports);
    localStorage.setItem("internshipReports", JSON.stringify(updatedReports));



    setAppealError(null);
    setAppealReportId(null);
    setAppealMessage("");
  };

  const editReport = (report) => {
    if (report.status === "submitted") {
      alert("Submitted reports cannot be edited.");
      return;
    }
    setCurrentReport(report);
    setIsEditing(true);
    setAvailableCourses(
      availableCourses.map((course) => ({
        ...course,
        selected: report.courses.includes(course.name),
      }))
    );
  };

  const deleteReport = (id) => {
    if (window.confirm("Are you sure you want to delete this report? This action cannot be undone.")) {
      const updatedReports = reports.filter((report) => report.id !== id);
      setReports(updatedReports);
      localStorage.setItem("internshipReports", JSON.stringify(updatedReports));
    }
  };

  const resetForm = () => {
    setCurrentReport({
      id: null,
      title: "",
      introduction: "",
      body: "",
      courses: [],
      file: null,
      fileName: "",
      status: "draft",
      facultyStatus: "Pending",
      submittedDate: null,
      appealStatus: null,
      rejectionComment: null
    });
    setIsEditing(false);
    setAvailableCourses(
      availableCourses.map((course) => ({ ...course, selected: false }))
    );
  };

  const downloadReport = (report) => {
    const freshReports = JSON.parse(localStorage.getItem("internshipReports")) || [];
    const freshReport = freshReports.find(r => r.id === report.id) || report;

    const doc = new jsPDF();

    const margin = 15;
    let y = margin;

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(33, 37, 41);
    doc.text(freshReport.title, 105, y, { align: 'center' });
    y += 10;

    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, 200 - margin, y);
    y += 15;

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Introduction", margin, y);
    y += 8;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const introLines = doc.splitTextToSize(freshReport.introduction, 180);
    doc.text(introLines, margin, y);
    y += introLines.length * 7 + 15;

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Report Body", margin, y);
    y += 8;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const bodyLines = doc.splitTextToSize(freshReport.body, 180);
    doc.text(bodyLines, margin, y);
    y += bodyLines.length * 7 + 15;

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Relevant Courses", margin, y);
    y += 8;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(freshReport.courses.join(", "), margin, y);

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Internship Report - Generated by Student Portal", 105, 285, { align: 'center' });

    doc.save(`${freshReport.title.replace(/[^a-z0-9]/gi, '_')}.pdf`);
  };

  const handleSubmitNew = (e) => {
    e.preventDefault();
    
    if (!currentReport.title || !currentReport.introduction || !currentReport.body) {
      alert("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    const selectedCourses = availableCourses.filter((course) => course.selected);
    const newId = isEditing ? currentReport.id : Date.now();
    
    const reportToSave = {
      ...currentReport,
      courses: selectedCourses.map((course) => course.name),
      id: newId,
      status: "draft",
      appealStatus: null,
      rejectionComment: null
    };

    let updatedReports;
    if (isEditing) {
      updatedReports = reports.map((report) =>
        report.id === currentReport.id ? reportToSave : report
      );
    } else {
      updatedReports = [...reports, reportToSave];
    }

    setReports(updatedReports);
    localStorage.setItem("internshipReports", JSON.stringify(updatedReports));
    
    setTimeout(() => {
      finalizeReport(newId);
      setIsSubmitting(false);
      resetForm();
    }, 100);
  };

  return (
    <div className="page">
      <div className="report-submission-container">
        <h1 className="report-submission-title">
          Internship Report Submission
        </h1>

        <div className="report-submission-card">
          <form>
            <div className="form-group">
              <label>Report Title</label>
              <input
                type="text"
                name="title"
                value={currentReport.title}
                onChange={handleInputChange}
                className="input"
                required
              />
            </div>

            <div className="form-group">
              <label>Introduction</label>
              <textarea
                name="introduction"
                value={currentReport.introduction}
                onChange={handleInputChange}
                required
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>Report Body</label>
              <textarea
                name="body"
                value={currentReport.body}
                onChange={handleInputChange}
                required
                rows="8"
              />
            </div>

            <div className="form-group">
              <label>Relevant Courses</label>
              <div className="courses-checkbox-group">
                {availableCourses.map((course) => (
                  <label key={course.id} className="course-checkbox">
                    <input
                      type="checkbox"
                      checked={course.selected}
                      onChange={() => toggleCourseSelection(course.id)}
                    />
                    {course.name}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn-primary1"
                onClick={saveReport}
                disabled={isSubmitting}
              >
                {isEditing ? "Update Draft" : "Save Draft"}
              </button>
              {!isEditing && (
                <button
                  type="button"
                  className="download-button"
                  style={{marginLeft:"0px", border:"2px green solid"}}
                  onClick={handleSubmitNew}
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              )}
              {isEditing && (
                <button
                  type="button"
                  className="delete-btn"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {submissionStatus === "saved" && (
            <div className="success-message">
              {isEditing ? "✓ Draft updated successfully!" : "✓ Draft saved successfully!"}
            </div>
          )}
          {submissionStatus === "submitted" && (
            <div className="success-message">
              ✓ Report submitted successfully!
            </div>
          )}
        </div>

        <div className="reports-list">
          <h3>Your Reports</h3>
          {reports.length === 0 ? (
            <p className="no-reports">No reports saved yet</p>
          ) : (
            <ul>
              {reports.map((report) => (
                <li key={report.id} className="report-item">
                  <div className="report-item-header">
                    <h4>
                      {report.title}
                      {report.status === "submitted" && (
                        <span className="pro-badge">Submitted</span>
                      )}
                    </h4>
                    <div className="report-actions">
                      {report.status === "draft" && (
                        <button
                          onClick={() => editReport(report)}
                          className="edit-button"
                          disabled={report.status === "submitted"}
                        >
                          Edit
                        </button>
                      )}
                      {report.status === "draft" && (
                        <button
                          onClick={() => finalizeReport(report.id)}
                          className="download-button"
                          style={{ marginRight: "0px" }}
                        >
                          Submit
                        </button>
                      )}
                      <button
                        onClick={() => downloadReport(report)}
                        className="download-button"
                      >
                        Download
                      </button>
                      {report.status === "submitted" && 
                        (report.facultyStatus === "Rejected" || report.facultyStatus === "Flagged") && 
                        report.appealStatus !== "submitted" && (
                        <button
                          onClick={() => handleAppealClick(report.id)}
                          className={appealReportId === report.id ? "delete-btn" : "download-button"}
                          style={{marginLeft:"0px", border:"none" }}
                        >
                          {appealReportId === report.id ? "Close Appeal" : "Appeal"}
                        </button>
                      )}
                      {report.status === "submitted" &&
                        (report.facultyStatus === "Rejected" || report.facultyStatus === "Flagged") && 
                        report.appealStatus === "submitted" && (
                        <button
                          className="download-button"
                          style={{ marginRight: "0px", opacity: "0.5" , cursor:"not-allowed"}}
                          disabled
                        >
                          ✓ Appeal Sent
                        </button>
                      )}
                      {report.status === "draft" && (
                        <button
                          onClick={() => deleteReport(report.id)}
                          className="delete-button"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                  {report.status === "submitted" && report.submittedDate && (
                    <p className="submission-date">
                      <strong>Submitted on:</strong> {report.submittedDate}
                    </p>
                  )}
                  {report.status === "submitted" && (
                    <div className="status-section">
                      <p className="faculty-status">
                        <strong>Status:</strong> {report.facultyStatus}
                      </p>

                      {(report.facultyStatus === "Rejected" || report.facultyStatus === "Flagged") && (
                        <div className="rejection-comment">
                          <strong>Comment:</strong> {report.rejectionComment}
                        </div>
                      )}
                    </div>
                  )}
                  {appealReportId === report.id && (
                    <div className="appeal-form">
                      <textarea
                        value={appealMessage}
                        onChange={handleAppealMessageChange}
                        placeholder="Explain why you're appealing this decision..."
                        rows="6"
                        className="input"
                        style={{width: "90%", marginTop:"20px"}}
                      />
                      <div className="form-actions">
                        <button
                          onClick={submitAppeal}
                          className="btn-primary1"
                        >
                          Send Appeal
                        </button>
                      </div>
                      {appealError === "error" && (
                        <div className="error-message">
                          Please enter your appeal message
                        </div>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="submission-guidelines">
          <h3>Report Guidelines:</h3>
          <ul>
            <li>Title should clearly describe your internship</li>
            <li>Introduction should explain your role and company</li>
            <li>Body should detail your experiences and learnings</li>
            <li>Select courses that directly contributed to your internship</li>
            <li>Final PDF should be professionally formatted</li>
            <li>Drafts can be edited, submitted reports are final</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Reportsubmission;