import React, { useState } from "react";
import "./index.css";
import CompanyInternEvaluationView from "./CompanyInternEvaluationView";

function CompanyInterns({
  applications,
  handleSupervisorChange,
  handelStartDateChange,
  handleEndDateChange,
  handleEvaluationChange,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProgress, setSelectedProgress] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showEvaluation, setShowEvaluation] = useState(false);

  function handleEvaluationClick(appId) {
    setSelectedApplication(appId);
    setShowEvaluation(true);
  }

  function deleteEvaluation(appId) {
    handleSupervisorChange(appId, "");
    handelStartDateChange(appId, "");
    handleEndDateChange(appId, "");
    handleEvaluationChange(appId, "");
  }

  function unshowEvaluation() {
    setShowEvaluation(false);
  }

  function handleProgressChange(event) {
    setSelectedProgress(event.target.value);
  }

  const filteredData = applications.filter((app) => {
    const searchLower = searchQuery.toLowerCase();

    const searchMatch =
      app.name.toLowerCase().includes(searchLower) ||
      app.internship.toLowerCase().includes(searchLower);

    const internStatusMatch =
      app.internProgress === "Current Intern" ||
      app.internProgress === "Internship Completed";

    const progressFilter = selectedProgress;
    const progressMatch = progressFilter
      ? app.internProgress.toLowerCase().includes(progressFilter.toLowerCase())
      : true;

    return searchMatch && progressMatch && internStatusMatch;
  });

  return (
    <div className="internship-background">
      {showEvaluation ? (
        <CompanyInternEvaluationView
          applications={applications}
          selectedEvaluation={selectedApplication}
          handleSupervisorChange={handleSupervisorChange}
          handelStartDateChange={handelStartDateChange}
          handleEndDateChange={handleEndDateChange}
          handleEvaluationChange={handleEvaluationChange}
          unshowEvaluation={unshowEvaluation}
        />
      ) : (
        <div className="listings-container">
          <h1>
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : "All Interns"}
          </h1>
          <div className="filters-container">
            <div className="search-filter-row">
              <input
                type="text"
                placeholder="Search by intern name or job title..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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
                  <label>Progress:</label>
                  <div className="filter-combo">
                    <select
                      className="filter-select"
                      value={selectedProgress}
                      onChange={handleProgressChange}
                    >
                      <option value="">Select Progress</option>
                      <option value="Current Intern">Current Intern</option>
                      <option value="Internship Completed">
                        Internship Completed
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="internship-list">
            {filteredData.length === 0 ? (
              <div className="no-results">No interns currently available</div>
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
                        <span className="detail-label">Progress:</span>
                        <span className="detail-value">
                          {app.internProgress}
                        </span>
                      </div>
                      <div className="detail-actions">
                        {app.internProgress === "Internship Completed" && (
                          <div className="select-container">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEvaluationClick(app.id);
                              }}
                              className="view-btn"
                            >
                              {app.evaluation
                                ? "View Evaluation"
                                : "Add Evaluation"}
                            </button>
                          </div>
                        )}
                        {app.internProgress === "Internship Completed" &&
                          app.evaluation && (
                            <div className="select-container">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteEvaluation(app.id);
                                }}
                                className="delete-btn"
                              >
                                Delete Evaluation
                              </button>
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
      )}
    </div>
  );
}

export default CompanyInterns;
