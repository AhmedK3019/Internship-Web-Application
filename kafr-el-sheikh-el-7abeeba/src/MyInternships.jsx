import React, { useState } from "react";
import MyinternshipsData from "./InternshipsData";
import "./index.css";

function MyInternships({ setView }) {
  const [internships] = useState(MyinternshipsData);

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [dateError, setDateError] = useState("");
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [showEvaluationViewModal, setShowEvaluationViewModal] = useState(false);
  const [currentEvaluation, setCurrentEvaluation] = useState(null);
  const [evaluations, setEvaluations] = useState([]);

  const handleDateChange = (type, value) => {
    const newDates = { ...dateRange, [type]: value };
    setDateRange(newDates);

    if (newDates.start && newDates.end && newDates.start > newDates.end) {
      setDateError("End date must be after start date");
    } else {
      setDateError("");
    }
  };

  const handleInternshipClick = (id) => {
    setSelectedInternship(selectedInternship === id ? null : id);
  };

  const handleEvaluateClick = (internship, e) => {
    e.stopPropagation();
    setCurrentEvaluation(internship);
    setShowEvaluationModal(true);
  };

  const handleSubmitEvaluation = (evaluationData) => {
    setEvaluations([...evaluations, evaluationData]);
    setShowEvaluationModal(false);
  };

  const handleDeleteEvaluation = (internshipId, e) => {
    e.stopPropagation();
    setEvaluations(evaluations.filter((e) => e.internshipId !== internshipId));
  };

  const filteredInternships = internships.filter((internship) => {
    const matchesSearch = searchQuery
      ? internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.company.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesStatus =
      statusFilter === "All" ? true : internship.status === statusFilter;

    if (dateError) return false;

    let matchesDate = true;
    if (dateRange.start) {
      matchesDate = internship.startDate >= dateRange.start;
    }
    if (matchesDate && dateRange.end) {
      matchesDate =
        internship.status === "Completed"
          ? internship.endDate <= dateRange.end
          : internship.startDate <= dateRange.end;
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  const EvaluationModal = ({ internship, onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [recommends, setRecommends] = useState(null);
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();

      if (rating === 0 || recommends === null) {
        setError("Please provide both a rating and recommendation");
        return;
      }

      onSubmit({
        internshipId: internship.id,
        company: internship.company,
        rating,
        feedback,
        recommends,
        date: new Date().toISOString(),
      });
    };

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Evaluate {internship.company}</h2>
            <button onClick={onClose} className="close-button">
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="detail-item">
              <span className="detail-label">Rating:</span>
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${star <= rating ? "filled" : ""}`}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-label">Recommend to others?</span>
              <div className="recommend-buttons">
                <button
                  type="button"
                  className={`recommend-btn ${
                    recommends === true ? "active-yes" : ""
                  }`}
                  onClick={() => setRecommends(true)}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`recommend-btn ${
                    recommends === false ? "active-no" : ""
                  }`}
                  onClick={() => setRecommends(false)}
                >
                  No
                </button>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-label">Feedback (optional):</span>
              <textarea
                className="feedback-input"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your experience..."
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="form-actions">
              <button type="submit" className="btn-primary1">
                Submit Evaluation
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const EvaluationViewModal = ({ evaluation, onClose }) => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Your Evaluation</h2>
            <button onClick={onClose} className="close-button">
              &times;
            </button>
          </div>

          <div className="evaluation-details">
            <div className="detail-item">
              <span className="detail-label">Rating:</span>
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${
                      star <= evaluation.rating ? "filled" : ""
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-label">Recommend to others?</span>
              <span className="detail-value">
                {evaluation.recommends ? "Yes" : "No"}
              </span>
            </div>

            {evaluation.feedback && (
              <div className="detail-item">
                <span className="detail-label">Feedback:</span>
                <textarea
                  className="feedback-input"
                  value={evaluation.feedback}
                  readOnly
                  style={{
                    background: "rgba(5, 10, 48, 0.7)",
                    color: "#7EC8E3",
                  }}
                />
              </div>
            )}

            <div className="form-actions">
              <button onClick={onClose} className="btn-primary1">
                Close
              </button>
              <button
                className="delete-btn"
                onClick={(e) => {
                  handleDeleteEvaluation(evaluation.internshipId, e);
                  onClose();
                }}
                style={{ marginLeft: "10px" }}
              >
                Delete Evaluation
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="internship-background">
      <div
        className="other-options"
        style={{ right: "1100px" }}
      >
        <button
          type="button"
          className="btn-primary1"
          onClick={() => {
            setView("listing");
          }}
        >
          Back to All Internships
        </button>
      </div>
      <div className="other-options">
        <button
          className="other-btn"
          onClick={() => {
            setView("applied");
          }}
        >
          My Applications
        </button>
      </div>
      <div className="listings-container">
        <h1>My Internship Experience</h1>

        <div className="filters-container">
          <div className="search-filter-row">
            <input
              type="text"
              placeholder="Search by title or company..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="btn-primary1"
              style={{ marginTop: "10px" }}
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {showFilters && (
            <div className="filter-row">
              <div className="filter-group">
                <label>Status:</label>
                <select
                  className="filter-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="Current">Current</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Date Range:</label>
                <div className="filter-combo">
                  <input
                    type="date"
                    className="filter-select"
                    value={dateRange.start}
                    onChange={(e) => handleDateChange("start", e.target.value)}
                    max={dateRange.end || undefined}
                  />
                  <div className="filter-combo">
                    <input
                      type="date"
                      className="filter-select"
                      value={dateRange.end}
                      onChange={(e) => handleDateChange("end", e.target.value)}
                      max={dateRange.end || undefined}
                    />
                  </div>
                </div>

                {dateError && <div className="error-message">{dateError}</div>}
              </div>
            </div>
          )}
        </div>

        <div className="internship-list">
          {filteredInternships.length === 0 ? (
            <div className="no-results">
              {searchQuery ||
              statusFilter !== "All" ||
              dateRange.start ||
              dateRange.end
                ? "No internships match your filters"
                : "No internship records found"}
            </div>
          ) : (
            filteredInternships.map((internship) => (
              <div
                key={internship.id}
                className={`internship-card ${
                  selectedInternship === internship.id ? "selected" : ""
                }`}
                onClick={() => handleInternshipClick(internship.id)}
              >
                <div>
                  <h2>{internship.title}</h2>
                  <h3>{internship.company}</h3>
                </div>
                <div className="expand-indicator">
                  {selectedInternship === internship.id ? "▼" : "▶"}
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
                    <span className="detail-label">Status:</span>
                    <span
                      className={`detail-value ${internship.status.toLowerCase()}`}
                    >
                      {internship.status}
                    </span>
                  </span>
                </div>
                {selectedInternship === internship.id && (
                  <div className="details-container">
                    <div className="details-grid">
                      <div className="detail-item">
                        <span className="detail-label">Location:</span>
                        <span className="detail-value">
                          {internship.location}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Period:</span>
                        <span className="detail-value">
                          {internship.startDate} -{" "}
                          {internship.endDate || "Present"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Skills:</span>
                        <span className="detail-value">
                          {internship.skills?.join(", ") || "Not specified"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Description:</span>
                      </div>
                      <p style={{ color: "white" }}>{internship.description}</p>
                    </div>

                    {internship.status === "Completed" && (
                      <>
                        {evaluations.some(
                          (e) => e.internshipId === internship.id
                        ) ? (
                          <button
                            className="btn-primary1"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentEvaluation(
                                evaluations.find(
                                  (e) => e.internshipId === internship.id
                                )
                              );
                              setShowEvaluationViewModal(true);
                            }}
                          >
                            View Your Evaluation
                          </button>
                        ) : (
                          <button
                            className="btn-primary1"
                            onClick={(e) => handleEvaluateClick(internship, e)}
                          >
                            Share Your Experience
                          </button>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {showEvaluationModal && (
        <EvaluationModal
          internship={currentEvaluation}
          onClose={() => setShowEvaluationModal(false)}
          onSubmit={handleSubmitEvaluation}
        />
      )}

      {showEvaluationViewModal && (
        <EvaluationViewModal
          evaluation={currentEvaluation}
          onClose={() => setShowEvaluationViewModal(false)}
        />
      )}
    </div>
  );
}

export default MyInternships;
