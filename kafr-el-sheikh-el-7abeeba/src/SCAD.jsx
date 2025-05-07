import React, { useState, useEffect } from "react";
import "./index.css";

function SCAD({ user, companiesRequests, onLogout }) {
  function handleAccept(request) {
    // TODO: Implement accept logic
    console.log("Accepted request:", request);
  }

  function handleReject(request) {
    // TODO: Implement reject logic
    console.log("Rejected request:", request);
  }

  return (
    <div className="page">
      <div className="listings-container">
        <h1>SCAD Office</h1>
        <h2>Welcome, {user.name}</h2>
        <div className="internship-list">
          <h2>Companies Requests</h2>
          {companiesRequests.length === 0 ? (
            <div className="no-results">No pending company requests</div>
          ) : (
            companiesRequests.map((request, index) => (
              <div key={index} className="internship-card">
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Company Name:</span>
                    <span className="detail-value">{request.name}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Industry:</span>
                    <span className="detail-value">{request.industry}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Size:</span>
                    <span className="detail-value">{request.size}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{request.email}</span>
                  </div>
                  {request.logo && (
                    <div className="detail-item">
                      <span className="detail-label">Logo:</span>
                      <img
                        src={request.logo}
                        alt="Company Logo"
                        className="company-logo"
                        style={{ width: "100px", height: "auto" }}
                      />
                    </div>
                  )}
                  <div className="detail-item">
                    <span className="detail-label">Documents:</span>
                    <div className="files-list">
                      {request.files.map((file, fileIndex) => (
                        <div key={fileIndex} className="file-item">
                          <span>📄 {file.name}</span>
                          <a
                            href={file.dataURL}
                            download={file.name}
                            className="download-link"
                          >
                            Download
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="detail-actions">
                    <button
                      className="delete-btn"
                      onClick={() => handleAccept(request)}
                    >
                      Accept
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleReject(request)}
                    >
                      Reject
                    </button>
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

export default SCAD;
