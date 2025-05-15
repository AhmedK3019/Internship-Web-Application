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
import WorkshopRegistration from "./WorkshopRegisteration";
import RegisteredWorkshops from "./RegisteredWorkshops";

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
  const [selectedWorkshopForRegistration, setSelectedWorkshopForRegistration] =
    useState(null);

  const [registeredWorkshopIds, setRegisteredWorkshopIds] = useState(() => {
    if (!user || !user.id) return [];
    const saved = localStorage.getItem(`registered_workshops_${user.id}`);
    try {
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error(
        "Failed to parse registered workshops from localStorage",
        e
      );
      return [];
    }
  });

  const handleAttendeeChatMessage = (
    workshopName,
    attendeeName,
    messageText
  ) => {
    if (!workshopName || !attendeeName) {
      console.warn(
        "Workshop name or attendee name missing for chat notification."
      );
      return;
    }

    const newNotification = {
      id: `chat-${Date.now()}-${notifications.length}`, // Unique ID
      message: `New message in "${workshopName}" chat from ${attendeeName}: "${messageText.substring(
        0,
        30
      )}${messageText.length > 30 ? "..." : ""}"`,
      isRead: false,
      date: new Date().toISOString().split("T")[0],
    };
    setNotifications((prevNotifications) => [
      newNotification,
      ...prevNotifications,
    ]);
  };

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

  useEffect(() => {
    if (user && user.id) {
      try {
        localStorage.setItem(
          `registered_workshops_${user.id}`,
          JSON.stringify(registeredWorkshopIds)
        );
      } catch (e) {
        console.error("Failed to save registered workshops to localStorage", e);
      }
    }
  }, [registeredWorkshopIds, user]);

  useEffect(() => {
    if (selectedWorkshopForRegistration) {
      setCurrentView("join-workshop");
    }
  }, [selectedWorkshopForRegistration]);

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

  const handleRemoveNotification = (notificationId, e) => {
    e.stopPropagation();
    setNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification.id !== notificationId
      )
    );
  };

  const handleBackToDashboard = () => {
    setCurrentView("");
    setSelectedWorkshopForRegistration(null);
  };

  const handleApply = (internship) => {
    setSelectedInternship(internship);
    setCurrentView("application");
  };
  const handleBackToProfile = () => {
    setCurrentView("update");
  };

  const handleApplySuccess = (internshipId) => {
    setAppliedInternships((prev) => [...prev, internshipId]);

    const appliedInternshipDetails = internships.find(
      (i) => i.id === (selectedInternship?.id || internshipId)
    );
    const newNotification = {
      id: `app-${notifications.length + 1}`,
      message: `Your application for ${
        appliedInternshipDetails?.title || "the internship"
      } has been submitted successfully!`,
      isRead: false,
      date: new Date().toISOString().split("T")[0],
    };
    setNotifications((prev) => [newNotification, ...prev]);
    setCurrentView("listing");
    setSelectedInternship(null);
  };

  const handleWorkshopRegisterClick = (workshopToRegister) => {
    setSelectedWorkshopForRegistration(workshopToRegister);
  };

  const handleBackFromWorkshopRegistration = () => {
    setCurrentView("workshops");
    setSelectedWorkshopForRegistration(null);
  };

  const handleWorkshopRegisterSuccess = (workshopId, registrationDetails) => {
    setRegisteredWorkshopIds((prevIds) => {
      if (!prevIds.includes(workshopId)) {
        return [...prevIds, workshopId];
      }
      return prevIds;
    });

    const registeredWorkshopDetails = workshops.find(
      (w) => w.id === workshopId
    );
    const now = new Date();
    const workshopStart = new Date(registeredWorkshopDetails?.startDate);
    const hoursUntilWorkshop = (workshopStart - now) / (1000 * 60 * 60);

    const messages = [
      `Successfully registered for workshop: "${registeredWorkshopDetails?.name}"!`,
    ];

    const newNotification = {
      id: `reg-${notifications.length + 1}-${Date.now()}`,
      message: messages.join(" "),
      isRead: false,
      date: new Date().toISOString().split("T")[0],
    };

    if (hoursUntilWorkshop <= 48) {
      const reminderNotification = {
        id: `reminder-${notifications.length + 2}-${Date.now()}`,
        message: `Reminder: The workshop "${registeredWorkshopDetails?.name}" starts in less than 48 hours!`,
        isRead: false,
        date: new Date().toISOString().split("T")[0],
      };

      setNotifications((prev) => [
        reminderNotification,
        newNotification,
        ...prev,
      ]);
    } else {
      setNotifications((prev) => [newNotification, ...prev]);
    }

    setSelectedWorkshopForRegistration(null);
    setCurrentView("workshops");
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
          <button onClick={() => setCurrentView("videocall")}>
            Schedule Video Call
          </button>
          <button onClick={() => setCurrentView("assessment")}>
            View Assessments
          </button>
          <button onClick={() => setCurrentView("workshops")}>
            View Workshops
          </button>

          <button
            onClick={() => {
              setCurrentView("registered-workshops");
            }}
          >
            My Workshop Registrations
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
                    <h2 style={{ paddingRight: "30px" }}>
                      Pro Student Dashboard
                    </h2>
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
          <Profile
            user={user}
            onBackUpdate={handleBackToDashboard}
            onNavigate={(view) => {
              setCurrentView(view);
              setSelectedWorkshopForRegistration(null);
            }}
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
        {currentView === "my-internships" && (
          <MyInternships setView={setCurrentView} />
        )}
        {currentView === "videocall" && (
          <VideoCallAppointment
            addAppointment={setRequestedAppointments}
            setView={setCurrentView}
          />
        )}
        {currentView === "requestedAppointments" && (
          <PROStudentRequestedAppointments
            requestedAppointments={requestedAppointments}
            acceptAppointment={setFutureAppointments}
            rejectAppointment={setRequestedAppointments}
            setSCADNotifications={setSCADNotifications}
            setView={setCurrentView}
          />
        )}
        {currentView === "futureAppointments" && (
          <PROStudentFutureAppointments
            futureAppointments={futureAppointments}
            setFutureAppointments={setFutureAppointments}
            setSCADNotifications={setSCADNotifications}
            setView={setCurrentView}
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
          <SCADWorkshops
            workshops={workshops || []}
            isScad={false}
            isStudent={true}
            onRegister={handleWorkshopRegisterClick}
            registeredWorkshops={registeredWorkshopIds}
          />
        )}
        {currentView === "registered-workshops" && (
          <RegisteredWorkshops
            user={user}
            workshops={workshops}
            registeredWorkshops={registeredWorkshopIds}
            onAttendeeChatMessage={handleAttendeeChatMessage}
          />
        )}
        {currentView === "join-workshop" && (
          <WorkshopRegistration
            workshop={selectedWorkshopForRegistration}
            onBack={handleBackFromWorkshopRegistration}
            onRegisterSuccess={handleWorkshopRegisterSuccess}
          />
        )}
      </div>
    </div>
  );
}

export default ProStudent;
