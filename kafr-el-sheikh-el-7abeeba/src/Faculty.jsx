import React, { useState } from "react";
import InternshipReports from "./InternshipReports";
import EvaluationReports from "./EvaluationReports";
import Statistics from "./Statistics";
import "./index.css";

function Faculty({ user }) {
  const username = user.name;
  const [currentView, setCurrentView] = useState("");

  const handleBackToDashboard = () => {
    setCurrentView("");
  };

  return (
    <div className="page">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="menu-wrapper">
            <span className="menu-icon">☰</span>
            <span className="menu-label">Faculty Member</span>
          </div>
        </div>
        <div className="sidebar-buttons">
          <button onClick={() => setCurrentView("")}>Dashboard</button>
          <button onClick={() => setCurrentView("internshipreports")}>
            View Internship Reports
          </button>
          <button onClick={() => setCurrentView("evaluationreports")}>
            View Evaluation reports
          </button>
          <button onClick={() => setCurrentView("statistics")}>
            Statistics
          </button>
        </div>
      </div>

      <div className="main-content">
        {currentView === "" && (
          <div className="faculty-container">
            <header className="faculty-header">
              <h1>Welcome {username}</h1>
              <hr />
            </header>
          </div>
        )}

        {currentView === "internshipreports" && (
          <InternshipReports onBackInternshipreports={handleBackToDashboard} />
        )}
        {currentView === "evaluationreports" && (
          <EvaluationReports onBackEvaluationreports={handleBackToDashboard} />
        )}
        {currentView === "statistics" && (
          <Statistics onBackStatistics={handleBackToDashboard} />
        )}
      </div>
    </div>
  );
}

export default Faculty;
