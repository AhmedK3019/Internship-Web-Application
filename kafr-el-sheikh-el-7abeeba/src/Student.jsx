import React, { useState } from "react";
import SuggestedCompanies from "./SuggestedCompanies";
import Profile from "./Profile";
import Majors from "./Majors";
import Listings from "./Listings";
import Discover from "./Discover";
import Reportsubmission from "./Reportsubmission";
import InternshipApplication from "./IntershipApplication";
import MyInternships from "./MyInternships";
import AppliedInternships from "./AppliedInternships";
import "./index.css";

function Student({ user, onLogout }) {
  const username = user.name;
  const [currentView, setCurrentView] = useState("");
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [appliedInternships, setAppliedInternships] = useState([]);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message:
        "New internship cycle begins next week! Start preparing your resume.",
      isRead: false,
      date: "2025-05-01",
    },
    {
      id: 2,
      message: "Reminder: Early application deadline is approaching in 3 days.",
      isRead: false,
      date: "2025-05-05",
    },
    {
      id: 3,
      message:
        "Summer 2025 internship cycle has officially begun! Applications are now open.",
      isRead: false,
      date: "2025-05-08",
    },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleNotificationClick = (notificationId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleRemoveNotification = (notificationId, e) => {
    e.stopPropagation(); 
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== notificationId)
    );
  };

  const handleBackToDashboard = () => {
    setCurrentView("");
  };

  const handleApply = (internship) => {
    setSelectedInternship(internship);
    setCurrentView("application");
  };

  const handleApplySuccess = (internshipId) => {
    setAppliedInternships((prev) => [...prev, internshipId]);

    setNotifications((prev) => [
      ...prev,
      {
        id: Date.now(),
        message: `Your application for ${selectedInternship.title} has been submitted successfully!`,
        isRead: false,
        date: new Date().toISOString().split("T")[0],
      },
    ]);
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
          <button onClick={() => setCurrentView("update")}>Profile</button>
          <button onClick={() => setCurrentView("majors")}>Majors</button>
          <button onClick={() => setCurrentView("listing")}>Internships</button>
          <button onClick={() => setCurrentView("Reportsubmission")}>
            Report submission
          </button>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
      <div className="main-content">
        {currentView === "" && (
          <div className="student-container">
            <header className="student-header">
              <div className="dashboard-header">
                <div className="company-info">
                  <div className="welcome-text">
                    <h1>Welcome {username}</h1>
                    <h2>Student Dashboard</h2>
                  </div>
                </div>
                <div
                  className={`notifications-area ${
                    showNotifications ? "shifted" : ""
                  }`}
                >
                  <div
                    className="notification-ring"
                    onClick={() => setShowNotifications(!showNotifications)}
                  >
                    <span className="notification-count">
                      {notifications.filter((n) => !n.isRead).length}
                    </span>
                    🔔
                  </div>
                </div>
              </div>

              {showNotifications && (
                <div
                  className={`notifications-panel ${
                    showNotifications ? "visible" : ""
                  }`}
                >
                  <h3>Notifications</h3>
                  {notifications.length === 0 ? (
                    <div className="notification-item">
                      No notifications at this time.
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`notification-item ${
                          notification.isRead ? "read" : "unread"
                        }`}
                        onClick={() => handleNotificationClick(notification.id)}
                      >
                          {notification.isRead && (
                            <button 
                              className="close-button"
                              onClick={(e) => handleRemoveNotification(notification.id, e)}
                              aria-label="Remove notification"
                              style={{ marginRight: "240px",padding:"0.1rem" }}
                            >
                              &times;
                            </button>
                          )}
                        <div className="notification-message">
                          {notification.message}
                        </div>
                        <div className="notification-date">
                          {notification.date}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
              <Discover onBackUpdate={handleBackToDashboard} />
            </header>
          </div>
        )}
        {currentView === "listing" && (
          <Listings
            showApplyButton={true}
            onApply={handleApply}
            appliedInternships={appliedInternships}
            setView={setCurrentView}
          />
        )}
        {currentView === "applied" && (
          <AppliedInternships
            appliedInternships={appliedInternships}
            setView={setCurrentView}
          />
        )}
        {currentView === "majors" && (
          <Majors onBackMajors={handleBackToDashboard} />
        )}
        {currentView === "Reportsubmission" && (
          <Reportsubmission
          user={user}
            onBackReportsubmission={handleBackToDashboard}
            setNotifications={setNotifications}
          />
        )}
        {currentView === "companies" && (
          <SuggestedCompanies
            onBackSuggestedCompanies={handleBackToDashboard}
          />
        )}
        {currentView === "update" && (
          <Profile user={user} onBackUpdate={handleBackToDashboard} />
        )}
        {currentView === "application" && (
          <InternshipApplication
            internship={selectedInternship}
            onBack={handleBackToDashboard}
            onApplySuccess={() => handleApplySuccess(selectedInternship.id)}
          />
        )}
        {currentView === "my-internships" && (
          <MyInternships setView={setCurrentView} />
        )}
      </div>
    </div>
  );
}

export default Student;