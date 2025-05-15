import React, { useState, useEffect } from "react";
import "./index.css";
import SCADCompaniesRequests from "./SCADCompaniesRequests";
import SCADVideoCallAppointment from "./SCADVideoCallAppointment";
import SCADRequestedAppointments from "./SCADRequestedAppointments";
import SCADFutureAppointments from "./SCADFutureAppointments";
import InternshipReports from "./InternshipReports";
import Listings from "./Listings";
import SCADStudentSearch from "./SCADStudentSearch";
import SetInternshipCycle from "./SetInternshipCycle";
import SCADViewRealTimeStatistics from "./SCADViewRealTimeStatistics";
import SCADWorkshops from "./SCADWorkshops";
import SubmittedReports from "./SubmittedReports";

function SCAD({
  user,
  companiesRequests,
  addUser,
  rejectCompanyRequest,
  requestedAppointments,
  futureAppointments,
  addAppointment,
  setFutureAppointments,
  notifications,
  setPRONotifications,
  setNotifications,
  setWorkshops,
  workshops,
  onLogout,
}) {
  const [view, setView] = useState("dashboard");
  const [showNotifications, setShowNotifications] = useState(false);

  function handleNotificationClick(notificationId) {
    const updatedNotifications = notifications.map((notification) => {
      if (notification.id === notificationId) {
        return { ...notification, isRead: true };
      }
      return notification;
    });
    setNotifications(updatedNotifications);
  }

  const handleRemoveNotification = (notificationId, e) => {
    e.stopPropagation(); 
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== notificationId)
    );
  };

  return (
    <div className="page">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="menu-wrapper">
            <span className="menu-icon">☰</span>
            <span className="menu-label">SCAD Menu</span>
          </div>
        </div>
        <div className="sidebar-buttons">
          <button onClick={() => setView("dashboard")}>
            Dashboard - Companies Requests
          </button>
          <button onClick={() => setView("listings")}>
            View All Internships
          </button>
          <button onClick={() => setView("callRequest")}>
            Schedule Video Call
          </button>
          <button onClick={() => setView("submittedReports")}>
            View Submitted Reports
          </button>
          <button onClick={() => setView("evaluations")}>
            View All Internship Evaluations
          </button>
          <button onClick={() => setView("cycle")}>Set Internship Cycle</button>
          <button onClick={() => setView("students")}>
            View Student Profiles
          </button>
          <button onClick={() => setView("statistics")}>
            View Real Time Statistics
          </button>
          <button onClick={() => setView("workshops")}>View Workshops</button>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
      <div className="main-content">
        {view === "dashboard" && (
          <div className="dashboard">
            <div className="dashboard-header">
              <div className="company-info">
                <img
                  src={`/SCAD.jpg`}
                  alt="SCAD Logo"
                  className="company-dashboard-logo"
                />
                <div className="welcome-text">
                  <h1>Welcome, {user.name}</h1>
                  <h2>SCAD Dashboard</h2>
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
            
            <SCADCompaniesRequests
              companiesRequests={companiesRequests}
              addUser={addUser}
              rejectCompanyRequest={rejectCompanyRequest}
            />
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
          </div>
        )}
        {view === "callRequest" && (
          <SCADVideoCallAppointment
            addAppointment={addAppointment}
            setView={setView}
          />
        )}
        {view === "appointments" && (
          <SCADRequestedAppointments
            requestedAppointments={requestedAppointments}
            acceptAppointment={setFutureAppointments}
            rejectAppointment={addAppointment}
            setPRONotifications={setPRONotifications}
            setView={setView}
          />
        )}
        {view === "futureAppointments" && (
          <SCADFutureAppointments
            futureAppointments={futureAppointments}
            setFutureAppointments={setFutureAppointments}
            setPRONotifications={setPRONotifications}
            setView={setView}
          />
        )}
        {view === "listings" && <Listings />}
        {view === "cycle" && <SetInternshipCycle />}
        {view === "evaluations" && <InternshipReports />}
        {view === "submittedReports" && <SubmittedReports />}
        {view === "students" && <SCADStudentSearch />}
        {view === "statistics" && <SCADViewRealTimeStatistics />}
        {view === "workshops" && (
          <SCADWorkshops
            workshops={workshops}
            setWorkshops={setWorkshops}
            isScad={true}
          />
        )}
      </div>
    </div>
  );
}

export default SCAD;
