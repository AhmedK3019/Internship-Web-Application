import React, { useState, useEffect } from "react";
import "./index.css";

function SCADReqeustedAppointments() {
  function handleAccept(appointment) {}
  function handleReject(appointment) {}

  return (
    <div className="listings-container">
      <div className="internship-list">
        <h1>Requested Appointments</h1>
        {requestedAppointments.length === 0 ? (
          <div className="no-results">No pending appointments</div>
        ) : (
          requestedAppointments.map((appointment, index) => (
            <div key={index} className="internship-card">
              <div className="details-grid">
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
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default SCADReqeustedAppointments;
