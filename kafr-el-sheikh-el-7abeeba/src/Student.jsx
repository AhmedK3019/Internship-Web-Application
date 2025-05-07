import React, { useState } from "react";
import SuggestedCompanies from "./SuggestedCompanies";
import UpdateProfile from "./UpdateProfile";
import Majors from "./Majors";
import Listings from "./Listings";
import Discover from "./Discover";
import Reportsubmission from "./Reportsubmission";
import InternshipApplication from "./IntershipApplication";
import MyInternships from "./MyInternships";
import "./index.css";

function Student({ user, onLogout }) {
  const username = user.name;
  const [currentView, setCurrentView] = useState("");
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [appliedInternships, setAppliedInternships] = useState([]);

  const handleBackToDashboard = () => {
    setCurrentView("");
  };

  const handleApply = (internship) => {
    setSelectedInternship(internship);
    setCurrentView("application");
  };
  const handleApplySuccess = (internshipId) => {
    setAppliedInternships([...appliedInternships, internshipId]);
    setCurrentView("listing");
  };

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
          <button onClick={() => setCurrentView("")}>Dashboard</button>
          <button onClick={() => setCurrentView("companies")}>
            View Suggested Companies
          </button>
          <button onClick={() => setCurrentView("update")}>
            Update Profile
          </button>
          <button onClick={() => setCurrentView("majors")}>Majors</button>
          <button onClick={() => setCurrentView("listing")}>Internships</button>
          <button onClick={() => setCurrentView("Reportsubmission")}>
            Report submission
          </button>
          <button onClick={() => setCurrentView("my-internships")}>
            My Internships
          </button>
        </div>
      </div>

      <div className="main-content">
        {currentView === "" && (
          <div className="student-container">
            <header className="student-header">
              <h1>Welcome {username}</h1>
              <hr />
              <Discover onBackUpdate={handleBackToDashboard} />
            </header>
          </div>
        )}
        {currentView === "listing" && (
          <Listings
            showApplyButton={true}
            onApply={handleApply}
            appliedInternships={appliedInternships}
          />
        )}
        {currentView === "majors" && (
          <Majors onBackMajors={handleBackToDashboard} />
        )}
        {currentView === "Reportsubmission" && (
          <Reportsubmission onBackReportsubmission={handleBackToDashboard} />
        )}
        {currentView === "companies" && (
          <SuggestedCompanies
            onBackSuggestedCompanies={handleBackToDashboard}
          />
        )}
        {currentView === "update" && (
          <UpdateProfile onBackUpdate={handleBackToDashboard} />
        )}
        {currentView === "application" && (
          <InternshipApplication
            internship={selectedInternship}
            onBack={handleBackToDashboard}
            onApplySuccess={() => handleApplySuccess(selectedInternship.id)}
          />
        )}

        {currentView === "my-internships" && <MyInternships />}
      </div>
    </div>
  );
}

export default Student;
