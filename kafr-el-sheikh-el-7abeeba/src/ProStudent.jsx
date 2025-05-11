import React, { useState, useEffect } from "react";
import SuggestedCompanies from "./SuggestedCompanies";
import Profile from "./Profile";
import Majors from "./Majors";
import Listings from "./Listings";
import Discover from "./Discover";
import Reportsubmission from "./Reportsubmission";
import InternshipApplication from "./IntershipApplication";
import MyInternships from "./MyInternships";
import AppliedInternships from "./AppliedInternships";
import MyinternshipsData from "./InternshipsData";
import VideoCallAppointment from "./VideoCallAppointment";
import ProfileViews from "./ProfileViews";
import "./index.css";
import ViewAssessments from "./ViewAssessments";
import SCADWorkshops from "./SCADWorkshops";
import PROStudentRequestedAppointments from "./PROStudentRequestedAppointments";
import PROStudentFutureAppointments from "./PROStudentFutureAppointments";

function ProStudent({
  user,
  onLogout,
  requestedAppointments,
  setRequestedAppointments,
  futureAppointments,
  setFutureAppointments,
  notifications,
  setSCADNotifications,
  setNotifications,
  workshops,
}) {
  const username = user.name;
  const [currentView, setCurrentView] = useState("");
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [appliedInternships, setAppliedInternships] = useState([]);
  const [hasProBadge, setHasProBadge] = useState(false);
  const [internships] = useState(MyinternshipsData);
  const [sharedAssessments, setSharedAssessments] = useState([]);

  const checkProBadgeEligibility = () => {
    const completedInternships = internships.filter(
      (i) => i.status === "Completed"
    );
    const totalMonths = completedInternships.reduce((total, internship) => {
      const months = parseInt(internship.duration) || 0;
      return total + months;
    }, 0);

    setHasProBadge(totalMonths >= 3);
  };

  useEffect(() => {
    checkProBadgeEligibility();
  }, [internships]);

  const [showNotifications, setShowNotifications] = useState(false);

  function handleNotificationClick(notificationId) {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  }

  const handleBackToDashboard = () => {
    setCurrentView("");
  };

  const handleApply = (internship) => {
    setSelectedInternship(internship);
    setCurrentView("application");
  };
  const handleBackToProfile = () => {
    setCurrentView("update");
  };

  const handleApplySuccess = (internshipId) => {
    setAppliedInternships([...appliedInternships, internshipId]);

    const newNotification = {
      id: notifications.length + 1,
      message: `Your application for ${selectedInternship.title} has been submitted successfully!`,
      isRead: false,
      date: new Date().toISOString().split("T")[0],
    };
    setNotifications([...notifications, newNotification]);
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
          <button onClick={() => setCurrentView("update")}>View Profile</button>
          <button onClick={() => setCurrentView("majors")}>Majors</button>
          <button onClick={() => setCurrentView("listing")}>Internships</button>
          <button onClick={() => setCurrentView("Reportsubmission")}>
            Report submission
          </button>
          <button onClick={() => setCurrentView("my-internships")}>
            My Internships
          </button>
          <button onClick={() => setCurrentView("applied")}>
            Applications
          </button>
          <button onClick={() => setCurrentView("videocall")}>
            Schedule Video Call
          </button>
          <button onClick={() => setCurrentView("requestedAppointments")}>
            Requested Appointments
          </button>
          <button onClick={() => setCurrentView("futureAppointments")}>
            Future Appointments
          </button>
          <button onClick={() => setCurrentView("assessment")}>
            View Assessments
          </button>
          <button onClick={() => setCurrentView("workshops")}>
            View Workshops
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
                    <h1>
                      Welcome {username}{" "}
                      {hasProBadge && <span className="pro-badge">PRO</span>}
                    </h1>
                    <h2>Pro Student Dashboard</h2>
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
        {currentView === "applied" && (
          <AppliedInternships appliedInternships={appliedInternships} />
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
          <Profile
            user={user}
            onBackUpdate={handleBackToDashboard}
            onNavigate={setCurrentView}
            isPro={true}
            sharedAssessments={sharedAssessments}
            setSharedAssessments={setSharedAssessments}
          />
        )}
        {currentView === "application" && (
          <InternshipApplication
            internship={selectedInternship}
            onBack={handleBackToDashboard}
            onApplySuccess={() => handleApplySuccess(selectedInternship.id)}
          />
        )}
        {currentView === "my-internships" && <MyInternships />}
        {currentView === "videocall" && <VideoCallAppointment />}
        {currentView === "requestedAppointments" && (
          <PROStudentRequestedAppointments
            requestedAppointments={requestedAppointments}
            acceptAppointment={setFutureAppointments}
            rejectAppointment={setRequestedAppointments}
            setSCADNotifications={setSCADNotifications}
          />
        )}
        {currentView === "futureAppointments" && (
          <PROStudentFutureAppointments
            futureAppointments={futureAppointments}
            setFutureAppointments={setFutureAppointments}
            setSCADNotifications={setSCADNotifications}
          />
        )}
        {currentView === "profile-views" && (
          <ProfileViews onBack={handleBackToProfile} />
        )}
        {currentView === "assessment" && (
          <ViewAssessments
            sharedAssessments={sharedAssessments}
            setSharedAssessments={setSharedAssessments}
          />
        )}
        {currentView === "workshops" && (
          <SCADWorkshops workshops={workshops || []} />
        )}
      </div>
    </div>
  );
}

export default ProStudent;
