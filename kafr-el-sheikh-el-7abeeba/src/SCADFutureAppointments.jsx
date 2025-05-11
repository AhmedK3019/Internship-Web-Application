import React, { useState, useEffect } from "react";
import "./index.css";

function SCADFutureAppointments({ futureAppointments, setFutureAppointments }) {
  const [message, setMessage] = useState("");

  function handleCancel(appointment) {
    const updatedAppointment = {
      ...appointment,
      status: "cancelled",
    };
    setFutureAppointments((prevApp) =>
      prevApp.filter((app) => app.id !== appointment.id)
    );
    setMessage("Appointment cancelled successfully.");
  }

  function handleJoin(appointment) {
    const updatedAppointment = {
      ...appointment,
      status: "joined",
    };
    setFutureAppointments((prevApp) =>
      prevApp.filter((app) => app.id !== appointment.id)
    );
    setMessage("You have joined the call.");
  }

  return (
    <div className="listings-container">
      <div className="internship-list">
        <h1>Future Appointments</h1>
        {futureAppointments.length === 0 ? (
          <div className="no-results">No future appointments</div>
        ) : (
          futureAppointments.map((appointment, index) => (
            <div key={index} className="internship-card">
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Student Name:</span>
                  <span className="detail-value">
                    {appointment.studentName}
                  </span>
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
                  <span className="detail-label">Status:</span>
                  <span className="detail-value">{appointment.status}</span>
                </div>
              </div>
              <div className="detail-actions">
                <button
                  onClick={() => handleCancel(appointment)}
                  className="delete-btn"
                >
                  Cancel Appointment
                </button>
                <button
                  onClick={() => handleJoin(appointment)}
                  className="accept-btn"
                >
                  Join call
                </button>
              </div>
            </div>
          ))
        )}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default SCADFutureAppointments;
