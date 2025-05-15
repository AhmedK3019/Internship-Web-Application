import React, { useState } from "react";
import "./index.css";

function CompanyAllApplications({
  applications,
  handleStatusChange,
  handleInternProgressChange,
}) {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPost, setSelectedPost] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);

  function handlePostChange(event) {
    setSelectedPost(event.target.value);
  }

  const filteredData = applications.filter((app) => {
    const postFilter = selectedPost;
    const postMatch = postFilter
      ? app.internship.toLowerCase().includes(postFilter.toLowerCase())
      : true;

    return postMatch;
  });

  return (
    <div className="listings-container">
      <h1>All Applications</h1>
      <div className="filters-container">
        <div className="search-filter-row">
          <button
            style={{ marginTop: "10px" }}
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Hide Filter" : "Show Filter"}
          </button>
        </div>

        {showFilters && (
          <div className="filter-row">
            <div className="filter-group">
              <label>Post:</label>
              <div className="filter-combo">
                <select
                  className="filter-select"
                  value={selectedPost}
                  onChange={handlePostChange}
                >
                  <option value="">Select Post</option>
                  {[...new Set(applications.map((app) => app.internship))].map(
                    (title) => (
                      <option key={title} value={title}>
                        {title}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="internship-list">
        {filteredData.length === 0 ? (
          <div className="no-results">No applications currently available</div>
        ) : (
          filteredData.map((app) => (
            <div
              key={app.id}
              className={`internship-card ${
                selectedApplication === app.id ? "selected" : ""
              }`}
              onClick={() => {
                if (selectedApplication === app.id) {
                  setSelectedApplication(null); // Collapse if clicked again
                } else {
                  setSelectedApplication(app.id); // Expand if clicked
                }
              }}
            >
              <div>
                <h2>{app.name}</h2>
              </div>
              <div className="expand-indicator">
                {selectedApplication === app.id ? "▼" : "▶"}
              </div>
              {selectedApplication === app.id && (
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{app.email}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{app.phone}</span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Internship post:</span>
                    <span className="detail-value">{app.internship}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    <span className="detail-value">{app.status}</span>
                  </div>
                  <div className="detail-actions">
                    <div className="select-container">
                      <label className="select-label">Status:</label>
                      <select
                        value={app.status}
                        className="custom-select"
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleStatusChange(app.id, e.target.value);
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Finalized">Finalized</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>

                    {app.status === "Accepted" && (
                      <div className="select-container">
                        <label className="select-label">Intern Progress:</label>
                        <select
                          value={app.internProgress}
                          className="custom-select"
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleInternProgressChange(app.id, e.target.value);
                          }}
                        >
                          <option value="Not Started">Did not start</option>
                          <option value="Current Intern">Current Intern</option>
                          <option value="Internship Completed">
                            Internship Completed
                          </option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CompanyAllApplications;
