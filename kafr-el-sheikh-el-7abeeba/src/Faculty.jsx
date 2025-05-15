import React, { useState } from "react";
import InternshipReports from "./InternshipReports";
import SubmittedReports from "./SubmittedReports";
import Statistics from "./Statistics";
import "./index.css";

function Faculty({ user, onLogout }) {
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
          <button onClick={() => setCurrentView("")}>
            Dashboard - Internship Reports
          </button>
          <button onClick={() => setCurrentView("submittedreports")}>
            View Submitted Reports
          </button>
          <button onClick={() => setCurrentView("statistics")}>
            Statistics
          </button>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      <div className="main-content">
        {currentView === "" && (
          <div className="dashboard">
            <div className="dashboard-header">
              <div className="welcome-text">
                <h1>Welcome {username}</h1>
                <h2>Faculty Member Dashboard</h2>
              </div>
            </div>
            <InternshipReports
              onBackInternshipreports={handleBackToDashboard}
            />
          </div>
        )}

        {currentView === "internshipreports" && (
          <InternshipReports onBackInternshipreports={handleBackToDashboard} />
        )}
        {currentView === "submittedreports" && (
          <SubmittedReports isFaculty={true} />
        )}
        {currentView === "statistics" && (
          <Statistics onBackStatistics={handleBackToDashboard} />
        )}
      </div>
    </div>
  );
}

export default Faculty;
