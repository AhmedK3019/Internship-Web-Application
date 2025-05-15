import React, { useState } from "react";
import "./index.css";
import CompanyInternships from "./CompanyInternships";
import Listings from "./Listings";
import CompanyAllApplications from "./CompanyAllApplications";
import CompanyInterns from "./CompanyInterns";

function Company({ user, onLogout }) {
  const [view, setView] = useState("dashboard");
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New application received from John Doe", isRead: false },
    { id: 2, message: "Intern evaluation due for Jane Smith", isRead: false },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "JohnDoe@gmail.com",
      phone: "1234567890",
      internship: "Software Engineer Intern",
      status: "Pending",
      internProgress: "Not Started",
      supervisor: "",
      startDate: "",
      endDate: "",
      evaluation: "",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "JaneSmith@gmail.com",
      phone: "0987654321",
      internship: "Data Analyst Intern",
      status: "Pending",
      internProgress: "Not Started",
      supervisor: "",
      startDate: "",
      endDate: "",
      evaluation: "",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "AliceJohnson@gmail.com",
      phone: "1122334455",
      internship: "Web Developer Intern",
      status: "Pending",
      internProgress: "Not Started",
      supervisor: "",
      startDate: "",
      endDate: "",
      evaluation: "",
    },
    {
      id: 4,
      name: "Bob Brown",
      email: "BobBrown@gmail.com",
      phone: "5566778899",
      internship: "UX/UI Designer Intern",
      status: "Pending",
      internProgress: "Not Started",
      supervisor: "",
      startDate: "",
      endDate: "",
      evaluation: "",
    },
    {
      id: 5,
      name: "Charlie Davis",
      email: "CharlieDavis@gmail.com",
      phone: "9988776655",
      internship: "Software Engineer Intern",
      status: "Pending",
      internProgress: "Not Started",
      supervisor: "",
      startDate: "",
      endDate: "",
      evaluation: "",
    },
  ]);

  function handleNotificationClick(notificationId) {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  }

  const handleRemoveNotification = (notificationId, e) => {
    e.stopPropagation();
    setNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification.id !== notificationId
      )
    );
  };

  function handleSupervisorChange(appId, newSupervisor) {
    setApplications((prevApplications) =>
      prevApplications.map((app) =>
        app.id === appId ? { ...app, supervisor: newSupervisor } : app
      )
    );
  }

  function handleStartDateChange(appId, newStartDate) {
    setApplications((prevApplications) =>
      prevApplications.map((app) =>
        app.id === appId ? { ...app, startDate: newStartDate } : app
      )
    );
  }

  function handleEndDateChange(appId, newEndDate) {
    setApplications((prevApplications) =>
      prevApplications.map((app) =>
        app.id === appId ? { ...app, endDate: newEndDate } : app
      )
    );
  }

  function handleEvaluationChange(appId, newEvaluation) {
    setApplications((prevApplications) =>
      prevApplications.map((app) =>
        app.id === appId ? { ...app, evaluation: newEvaluation } : app
      )
    );
  }

  function handleStatusChange(appId, newStatus) {
    setApplications((prevApplications) =>
      prevApplications.map((app) => {
        if (app.id === appId) {
          return {
            ...app,
            status: newStatus,
            internProgress:
              newStatus !== "Accepted" ? "Not Started" : app.internProgress,
            supervisor: newStatus !== "Accepted" ? "" : app.supervisor,
            startDate: newStatus !== "Accepted" ? "" : app.startDate,
            endDate: newStatus !== "Accepted" ? "" : app.endDate,
            evaluation: newStatus !== "Accepted" ? "" : app.evaluation,
          };
        }
        return app;
      })
    );
  }

  function handleInternProgressChange(appId, newProgress) {
    setApplications(
      applications.map((app) => {
        if (app.id === appId) {
          return { ...app, internProgress: newProgress };
        }
        return app;
      })
    );
  }

  return (
    <div className="page">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="menu-wrapper">
            <span className="menu-icon">☰</span>
            <span className="menu-label">Company Menu</span>
          </div>
        </div>
        <div className="sidebar-buttons">
          <button onClick={() => setView("dashboard")}>
            Dashboard - Applications
          </button>
          <button onClick={() => setView("internships")}>
            View My Internships
          </button>
          <button onClick={() => setView("listings")}>
            View All Internships
          </button>
          <button onClick={() => setView("interns")}>View All Interns</button>
          <button onClick={onLogout} class="logout-btn">
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
                  src={user.logo}
                  alt="Company Logo"
                  className="company-dashboard-logo"
                />
                <div className="welcome-text">
                  <h1>Welcome, {user.name}</h1>
                  <h2>Company Dashboard</h2>
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
                          onClick={(e) =>
                            handleRemoveNotification(notification.id, e)
                          }
                          aria-label="Remove notification"
                          style={{ marginRight: "240px", padding: "0.1rem" }}
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
            <CompanyAllApplications
              applications={applications}
              handleStatusChange={handleStatusChange}
              handleInternProgressChange={handleInternProgressChange}
            />
          </div>
        )}
        {view === "internships" && (
          <CompanyInternships
            internships={internships}
            setInternships={setInternships}
          />
        )}
        {view === "listings" && <Listings />}
        {view === "applications" && (
          <CompanyAllApplications
            applications={applications}
            handleStatusChange={handleStatusChange}
            handleInternProgressChange={handleInternProgressChange}
          />
        )}
        {view === "interns" && (
          <CompanyInterns
            applications={applications}
            handleSupervisorChange={handleSupervisorChange}
            handelStartDateChange={handleStartDateChange}
            handleEndDateChange={handleEndDateChange}
            handleEvaluationChange={handleEvaluationChange}
          />
        )}
      </div>
    </div>
  );
}

export default Company;
