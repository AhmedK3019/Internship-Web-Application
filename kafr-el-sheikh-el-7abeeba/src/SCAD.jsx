import React, { useState, useEffect } from "react";
import "./index.css";
import SCADCompaniesRequests from "./SCADCompaniesRequests";
import VideoCallAppointment from "./VideoCallAppointment";

function SCAD({ user, companiesRequests, onLogout }) {
  const [view, setView] = useState("dashboard");
  const [requestedAppointments, setRequestedAppointments] = useState([]);

  function addAppointment(appointment) {
    setRequestedAppointments((prevAppointments) => [
      ...prevAppointments,
      appointment,
    ]);
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
            <h1>SCAD Office</h1>
            <h2>Welcome, {user.name}</h2>
          </div>
        )}
        {view === "companiesRequests" && (
          <SCADCompaniesRequests companiesRequests={companiesRequests} />
        )}
        {view === "callRequest" && (
          <SCADVideoCallAppointment addAppointment={addAppointment} />
        )}
        {view === "appointments" && (
          <SCADRequestedAppointments
            requestedAppointments={requestedAppointments}
          />
        )}
      </div>
    </div>
  );
}

export default SCAD;
