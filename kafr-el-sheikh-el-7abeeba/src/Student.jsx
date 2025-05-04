import React, { useState } from "react";
import SuggestedCompanies from "./SuggestedCompanies";
import UpdateProfile from "./UpdateProfile";
import Majors from "./Majors";
import Listings from "./Listings";
import Discover from "./Discover";
import Reportsubmission from "./Reportsubmission";
import "./index.css";

function Student({ email }) {
  const username = email.split("@")[0];
  const [currentView, setCurrentView] = useState(""); // Can be "companies" or "update"

  const handleBackToDashboard = () => {
    setCurrentView("");
  };

  // Render different views based on currentView state
  if (currentView === "companies") {
    return <SuggestedCompanies onBackSuggestedCompanies={handleBackToDashboard} />;
  }

  if (currentView === "update") {
    return <UpdateProfile onBackUpdate={handleBackToDashboard} />;
  }

  if (currentView === "majors") {
    return <Majors onBackMajors={handleBackToDashboard} />;
  }

  if (currentView === "listing") {
    return <Listings />;
  }

  if (currentView === "Reportsubmission") {
    return <Reportsubmission onBackReportsubmission={handleBackToDashboard} />;
  }

  // Default dashboard view
  return (
    <div className="page">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="menu-wrapper">
            <span className="menu-icon">☰</span>
            <span className="menu-label">Student Menu</span>
          </div>
        </div>
        <div className="sidebar-buttons">
          <button onClick={() => setCurrentView("companies")}>
            View Suggested Companies
          </button>
          <button onClick={() => setCurrentView("update")}>
            Update Profile
          </button>
          <button onClick={() => setCurrentView("majors")}>
            Majors
          </button>
          <button onClick={() => setCurrentView("listing")}>
            Internships
          </button>
          <button onClick={() => setCurrentView("Reportsubmission")}>
            Report submission
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="student-container">
          <header className="student-header">
            <h1>Welcome {username}</h1>
            <hr/>
            <Discover onBackUpdate={handleBackToDashboard} />
          </header>
        </div>
      </div>
    </div>
  );
}

export default Student;