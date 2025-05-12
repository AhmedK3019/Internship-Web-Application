import React, { useState, useEffect } from "react";
import "./index.css";

function Reportsubmission({ onBackReportsubmission }) {
  const [reports, setReports] = useState([]);
  const [currentReport, setCurrentReport] = useState({
    id: null,
    title: "",
    introduction: "",
    body: "",
    courses: [],
    file: null,
    fileName: "",
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
    const savedReports =
      JSON.parse(localStorage.getItem("internshipReports")) || [];
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
    const selectedCourses = availableCourses.filter(
      (course) => course.selected
    );
    const reportToSave = {
      ...currentReport,
      courses: selectedCourses.map((course) => course.name),
      id: isEditing ? currentReport.id : Date.now(),
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

  const editReport = (report) => {
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
    const updatedReports = reports.filter((report) => report.id !== id);
    setReports(updatedReports);
    localStorage.setItem("internshipReports", JSON.stringify(updatedReports));
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
    });
    setIsEditing(false);
    setAvailableCourses(
      availableCourses.map((course) => ({ ...course, selected: false }))
    );
  };

  const downloadReport = (report) => {
    alert(`Downloading report: ${report.title}`);
  };

  return (
    <div className="page">
      <div className="report-submission-container">
        <h1 className="report-submission-title">
          Internship Report Submission
        </h1>

        <div className="report-submission-card">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveReport();
            }}
          >
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
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isEditing ? "Update Report" : "Save Report"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  className="cancel-button"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {submissionStatus === "saved" && (
            <div className="success-message">
              {isEditing ? null : "✓ Report saved successfully!"}
            </div>
          )}
        </div>

        <div className="reports-list">
          <h3>Your Saved Reports</h3>
          {reports.length === 0 ? (
            <p className="no-reports">No reports saved yet</p>
          ) : (
            <ul>
              {reports.map((report) => (
                <li key={report.id} className="report-item">
                  <div className="report-item-header">
                    <h4>{report.title}</h4>
                    <div className="report-actions">
                      <button
                        onClick={() => editReport(report)}
                        className="edit-button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => downloadReport(report)}
                        className="download-button"
                      >
                        Download
                      </button>
                      <button
                        onClick={() => deleteReport(report.id)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="report-courses">
                    <strong>Relevant Courses:</strong>{" "}
                    {report.courses.join(", ")}
                  </p>
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
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Reportsubmission;
