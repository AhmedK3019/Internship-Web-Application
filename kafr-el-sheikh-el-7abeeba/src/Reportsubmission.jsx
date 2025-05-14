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
    submittedDate: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      status: "draft" // Ensure new reports are saved as drafts
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
          submittedDate: new Date().toLocaleDateString()
        }
        : report
    );

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
      submittedDate: null
    });
    setIsEditing(false);
    setAvailableCourses(
      availableCourses.map((course) => ({ ...course, selected: false }))
    );
  };

  const downloadReport = (report) => {
    // Get fresh reports data directly from localStorage
    const freshReports = JSON.parse(localStorage.getItem("internshipReports")) || [];
    const freshReport = freshReports.find(r => r.id === report.id) || report;

    const doc = new jsPDF();

    // Set margins
    const margin = 15;
    let y = margin;

    // Add title with styling
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(33, 37, 41);
    doc.text(freshReport.title, 105, y, { align: 'center' });
    y += 10;

    // Add divider line
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, 200 - margin, y);
    y += 15;

    // Add section heading for Introduction
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Introduction", margin, y);
    y += 8;

    // Add introduction text
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const introLines = doc.splitTextToSize(freshReport.introduction, 180);
    doc.text(introLines, margin, y);
    y += introLines.length * 7 + 15;

    // Add section heading for Introduction
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Report Body", margin, y);
    y += 8;

    // Add body text
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const bodyLines = doc.splitTextToSize(freshReport.body, 180);
    doc.text(bodyLines, margin, y);
    y += bodyLines.length * 7 + 15;

    // Add section heading for Relevant Courses
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Relevant Courses", margin, y);
    y += 8;

    // Add courses list
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(freshReport.courses.join(", "), margin, y);

    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Internship Report - Generated by Student Portal", 105, 285, { align: 'center' });

    // Save the PDF
    doc.save(`${freshReport.title.replace(/[^a-z0-9]/gi, '_')}.pdf`);
  };


  const handleSubmitNew = (e) => {
    e.preventDefault();
    

    if (!currentReport.title || !currentReport.introduction || !currentReport.body) {
      alert("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // First save the current report to get an ID
    const selectedCourses = availableCourses.filter((course) => course.selected);
    const newId = isEditing ? currentReport.id : Date.now();
    
    const reportToSave = {
      ...currentReport,
      courses: selectedCourses.map((course) => course.name),
      id: newId,
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
                      {report.status === "draft" && (<button
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
                      {report.status === "draft" && (<button
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
                    <p className="faculty-status">
                      <strong>Status:</strong> {report.facultyStatus}
                    </p>
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