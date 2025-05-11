import React from "react";
import "./index.css";

function RegisteredWorkshops({ workshops = [], registeredWorkshops = [] }) {
  const registeredWorkshopsData = workshops.filter((workshop) =>
    registeredWorkshops.includes(workshop.id)
  );

  return (
    <div className="internship-background">
      <div className="listings-container">
        <h1>My Registered Workshops</h1>

        <div className="internship-list">
          {registeredWorkshopsData.length === 0 ? (
            <div className="no-results">
              You haven't registered for any workshops yet.
            </div>
          ) : (
            registeredWorkshopsData.map((workshop) => (
              <div key={workshop.id} className="internship-card">
                <div>
                  <h2>{workshop.name}</h2>
                  <h3>
                    {new Date(workshop.startDate).toLocaleDateString()} -{" "}
                    {new Date(workshop.endDate).toLocaleDateString()}
                  </h3>
                </div>
                <div
                  style={{
                    borderBottom: "1px solid rgba(126, 200, 227, 0.2)",
                    padding: "0.5rem 0",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontWeight: "normal",
                    }}
                  >
                    <span className="detail-label">Time:</span>
                    <span className="detail-value">
                      {workshop.startTime} - {workshop.endTime}
                    </span>
                  </span>
                </div>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Description:</span>
                    <span className="detail-value">{workshop.description}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Speaker Bios:</span>
                    <span className="detail-value">{workshop.speakerBio}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default RegisteredWorkshops;
