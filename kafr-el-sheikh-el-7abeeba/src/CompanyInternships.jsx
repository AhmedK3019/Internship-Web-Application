import React, { useState } from "react";
import "./index.css";
import CompanyAddInternship from "./CompanyAddInternship";

function CompanyInternships({ internships, setInternships }) {
  const [showAdd, setShowAdd] = useState(false);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedPaid, setSelectedPaid] = useState("");
  const [selectedInternship, setSelectedInternship] = useState(null);

  function handleDurationChange(event) {
    setSelectedDuration(event.target.value);
  }

  function handlePaidChange(event) {
    setSelectedPaid(event.target.value);
  }

  function unShowAdd() {
    setSelectedInternship(null);
    setShowAdd(false);
  }

  function addInternship() {
    setShowAdd(true);
  }

  function deleteInternship(id) {
    setInternships(internships.filter((intern) => intern.id !== id));
  }

  const filteredData = internships.filter((internship) => {
    const searchLower = searchQuery.toLowerCase();

    const searchMatch = internship.title.toLowerCase().includes(searchLower);

    const durationFilter = selectedDuration;
    const durationMatch = durationFilter
      ? internship.duration.toLowerCase().includes(durationFilter.toLowerCase())
      : true;

    const paidFilter = selectedPaid;
    const paidMatch = paidFilter
      ? internship.salary.toLowerCase().includes(paidFilter.toLowerCase()) ||
        (paidFilter.toLowerCase() === "paid" && internship.pay === "Paid") ||
        (paidFilter.toLowerCase() === "unpaid" && internship.pay === "Unpaid")
      : true;

    return searchMatch && durationMatch && paidMatch;
  });

  return (
    <div className="internship-background">
      {showAdd ? (
        <CompanyAddInternship
          internships={internships}
          unShowAdd={unShowAdd}
          setInternships={setInternships}
          internshipId={selectedInternship}
        />
      ) : (
        <div className="listings-container">
          <h1>
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : "Company Internship Opportunities"}
          </h1>
          <div className="filters-container">
            <div className="search-filter-row">
              <input
                type="text"
                placeholder="Search by title..."
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
              <button
                style={{ marginTop: "10px", marginLeft: "10px" }}
                onClick={addInternship}
              >
                Add Internship
              </button>
            </div>

            {showFilters && (
              <div className="filter-row">
                <div className="filter-group">
                  <label>Duration:</label>
                  <div className="filter-combo">
                    <select
                      className="filter-select"
                      value={selectedDuration}
                      onChange={handleDurationChange}
                    >
                      <option value="">Select Duration</option>
                      <option value="1">1 Month</option>
                      <option value="3">3 Months</option>
                      <option value="6">6 Months</option>
                    </select>
                  </div>
                </div>

                <div className="filter-group">
                  <label>Compensation:</label>
                  <div className="filter-combo">
                    <select
                      className="filter-select"
                      value={selectedPaid}
                      onChange={handlePaidChange}
                    >
                      <option value="">All Types</option>
                      <option value="paid">Paid</option>
                      <option value="unpaid">Unpaid</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="internship-list">
            {filteredData.length === 0 ? (
              <div className="no-results">
                {searchQuery
                  ? `No internships found for "${searchQuery}"`
                  : "No internships currently available"}
              </div>
            ) : (
              filteredData.map((internship) => (
                <div
                  key={internship.id}
                  className={`internship-card ${
                    selectedInternship === internship.id ? "selected" : ""
                  }`}
                  onClick={() => {
                    if (selectedInternship === internship.id) {
                      setSelectedInternship(null); // Collapse if clicked again
                    } else {
                      setSelectedInternship(internship.id); // Expand if clicked
                    }
                  }}
                >
                  <div>
                    <h2>{internship.title}</h2>
                  </div>
                  <div className="expand-indicator">
                    {selectedInternship === internship.id ? "▼" : "▶"}
                  </div>
                  {selectedInternship === internship.id && (
                    <div className="details-grid">
                      <div className="detail-item">
                        <span className="detail-label">Duration:</span>
                        <span className="detail-value">
                          {internship.duration}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Compensation:</span>
                        <span className="detail-value">
                          {internship.salary
                            ? internship.salary + " EGP/month"
                            : internship.pay}
                        </span>
                      </div>

                      <div className="detail-item">
                        <span className="detail-label">Skills Required:</span>
                        <span className="detail-value">
                          {internship.skills || "No specific skills required"}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">
                          Number of applicants:
                        </span>
                        <span className="detail-value">{internship.apps}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Description:</span>
                      </div>
                      <p style={{ color: "white" }}> {internship.desc}</p>
                      <div className="detail-actions">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteInternship(internship.id);
                          }}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedInternship(internship.id);
                            setShowAdd(true);
                          }}
                          className="view-btn"
                        >
                          Update
                        </button>
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

export default CompanyInternships;
