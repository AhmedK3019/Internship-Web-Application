import React, { useState, useEffect } from "react";
import "./index.css";

function CompanyInternEvaluationView({
  applications,
  selectedEvaluation,
  handleSupervisorChange,
  handelStartDateChange,
  handleEndDateChange,
  handleEvaluationChange,
  unshowEvaluation,
}) {
  const selectedApp = applications.find((app) => app.id === selectedEvaluation);

  // State for form fields
  const [supervisor, setSupervisor] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [evaluation, setEvaluation] = useState("");
  const [message, setMessage] = useState("");

  // Update state when selectedApp changes
  useEffect(() => {
    if (selectedApp) {
      setSupervisor(selectedApp.supervisor || "");
      setStartDate(selectedApp.startDate || "");
      setEndDate(selectedApp.endDate || "");
      setEvaluation(selectedApp.evaluation || "");
    }
  }, [selectedApp]);

  function handleSave() {
    if (!supervisor || !startDate || !endDate || !evaluation) {
      setMessage("Please fill in all fields.");
      return;
    }
    if (endDate < startDate) {
      setMessage("End date cannot be before start date.");
      return;
    }
    if (new Date(startDate) > new Date() || new Date(endDate) > new Date()) {
      setMessage("Start and end dates cannot be in the future.");
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      setMessage("Start date cannot be after end date.");
      return;
    }
    if (endDate - startDate > 30 * 6 * 24 * 60 * 60 * 1000) {
      setMessage("Internship duration cannot exceed 6 months.");
      return;
    }
    if (endDate - startDate < 30 * 24 * 60 * 60 * 1000) {
      setMessage("Internship duration cannot be less than 1 months.");
      return;
    }

    handleSupervisorChange(selectedEvaluation, supervisor);
    handelStartDateChange(selectedEvaluation, startDate);
    handleEndDateChange(selectedEvaluation, endDate);
    handleEvaluationChange(selectedEvaluation, evaluation);
    unshowEvaluation();
  }

  return (
    <div className="side-panel">
      <h2>Intern Evaluation</h2>
      <label>Supervisor:</label>
      <input
        type="text"
        value={supervisor}
        className="input"
        onChange={(e) => setSupervisor(e.target.value)}
      />
      <label>Start Date:</label>
      <input
        type="date"
        value={startDate}
        className="input"
        onChange={(e) => setStartDate(e.target.value)}
      />
      <label>End Date:</label>
      <input
        type="date"
        value={endDate}
        className="input"
        onChange={(e) => setEndDate(e.target.value)}
      />
      <label>Evaluation:</label>
      <textarea
        value={evaluation}
        onChange={(e) => setEvaluation(e.target.value)}
      ></textarea>
      <button onClick={handleSave}>Save</button>
      <button onClick={unshowEvaluation}>Cancel</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default CompanyInternEvaluationView;
