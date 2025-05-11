import React, { useState, useEffect } from "react";
import "./index.css";
import SCADCompaniesRequests from "./SCADCompaniesRequests";
import SCADVideoCallAppointment from "./SCADVideoCallAppointment";
import SCADRequestedAppointments from "./SCADRequestedAppointments";
import SCADFutureAppointments from "./SCADFutureAppointments";
import Listings from "./Listings";
import SCADStudentSearch from "./SCADStudentSearch";
import SetInternshipCycle from "./SetInternshipCycle";

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
          <button onClick={() => setView("dashboard")}>Dashboard</button>
          <button onClick={() => setView("companiesRequests")}>
            View Companies Requests
          </button>
          <button onClick={() => setView("listings")}>
            View all internships
          </button>
          <button onClick={() => setView("callRequest")}>
            Schedule Video Call
          </button>
          <button onClick={() => setView("appointments")}>
            View Appointments
          </button>
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
            {showNotifications && (
              <div
                className={`notifications-panel ${
                  showNotifications ? "visible" : ""
                }`}
              >
                <h3>Notifications</h3>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`notification-item ${
                      notification.isRead ? "read" : "unread"
                    }`}
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    {notification.message}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {view === "companiesRequests" && (
          <SCADCompaniesRequests
            companiesRequests={companiesRequests}
            addUser={addUser}
            rejectCompanyRequest={rejectCompanyRequest}
          />
        )}
        {view === "callRequest" && (
          <SCADVideoCallAppointment addAppointment={addAppointment} />
        )}
        {view === "appointments" && (
          <SCADRequestedAppointments
            requestedAppointments={requestedAppointments}
            acceptAppointment={setFutureAppointments}
            rejectAppointment={addAppointment}
            setPRONotifications={setPRONotifications}
          />
        )}
        {view === "futureAppointments" && (
          <SCADFutureAppointments
            futureAppointments={futureAppointments}
            setFutureAppointments={setFutureAppointments}
          />
        )}
        {view === "listings" && <Listings />}
        {view === "cycle" && < />}
        {view === "listings" && <Listings />}
      </div>
    </div>
  );
}

export default SCAD;
