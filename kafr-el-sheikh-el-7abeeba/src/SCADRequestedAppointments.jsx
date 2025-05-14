import React, { useState, useEffect } from "react";
import "./index.css";

function SCADReqeustedAppointments({
  requestedAppointments,
  acceptAppointment,
  rejectAppointment,
  setPRONotifications,
  setView,
}) {
  function handleAccept(appointment) {
    const updatedAppointment = {
      ...appointment,
      status: "accepted",
    };
    acceptAppointment((prevApp) => [...prevApp, updatedAppointment]);
    rejectAppointment((prevApp) =>
      prevApp.filter((app) => app.id !== appointment.id)
    );
    setPRONotifications((prev) => [
      ...prev,
      {
        id: Date.now(),
        message: `Your appointment with SCAD Officer has been accepted.`,
        isRead: false,
      },
    ]);
  }

  function handleReject(appointment) {
    const updatedAppointment = {
      ...appointment,
      status: "rejected",
    };
    rejectAppointment((prevApp) =>
      prevApp.filter((app) => app.id !== appointment.id)
    );
    setProStudentNotifications((prev) => [
      ...prev,
      {
        id: Date.now(),
        message: `Your appointment with SCAD Officer has been rejected.`,
        isRead: false,
      },
    ]);
  }

  return (
    <div className="listings-container">
      <div className="other-options">
        <button
          className="other-btn"
          onClick={() => {
            setView("futureAppointments");
          }}
        >
          Future Appointments
        </button>
      </div>
      <div
        className="sidebar"
        style={{ marginLeft: "220px", top: "10px", gap: "20px" }}
      >
        <button
          type="button"
          onClick={() => {
            setView("callRequest");
          }}
        >
          Back to Scheduling
        </button>
      </div>
      <div className="internship-list">
        <h1>Requested Appointments</h1>
        {requestedAppointments.length === 0 ? (
          <div className="no-results">No pending appointments</div>
        ) : (
          requestedAppointments.map((appointment, index) => (
            <div key={index} className="internship-card">
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Student Name:</span>
                  <span className="detail-value">
                    {appointment.studentName}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Stundent Email:</span>
                  <span className="detail-value">
                    {appointment.studentEmail}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Purpose:</span>
                  <span className="detail-value">{appointment.purpose}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">{appointment.date}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Time:</span>
                  <span className="detail-value">{appointment.time}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Message:</span>
                  <span className="detail-value">{appointment.message}</span>
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Status:</span>
                <span className="detail-value">{appointment.status}</span>
              </div>
              {appointment.requestedBy === "PRO Student" && (
                <div className="detail-actions">
                  <button
                    onClick={() => handleAccept(appointment)}
                    className="accept-btn"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(appointment)}
                    className="delete-btn"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default SCADReqeustedAppointments;
