import React, { useState, useEffect } from "react";
import "./index.css";

function SCADCompaniesRequests({ companiesRequests }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState("");

  function handleIndustryChange(event) {
    setSelectedIndustry(event.target.value);
  }

  function handleAccept(request) {
    // TODO: Implement accept logic
    console.log("Accepted request:", request);
  }

  function handleReject(request) {
    // TODO: Implement reject logic
    console.log("Rejected request:", request);
  }

  const filteredData = companiesRequests.filter((req) => {
    const searchLower = searchQuery.toLowerCase();

    const searchMatch = req.name.toLowerCase().includes(searchLower);

    const industryFilter = selectedIndustry;
    const industryMatch = industryFilter
      ? req.industry.toLowerCase().includes(industryFilter.toLowerCase())
      : true;

    return searchMatch && industryMatch;
  });

  return (
    <div className="listings-container">
      <h1>
        {searchQuery
          ? `Search Results for "${searchQuery}"`
          : "Companies Requests"}
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
              <label>Industry:</label>
              <div className="filter-combo">
                <select
                  className="filter-select"
                  value={selectedIndustry}
                  onChange={handleIndustryChange}
                >
                  <option value="">Select Industry</option>
                  {[
                    ...new Set(companiesRequests.map((req) => req.industry)),
                  ].map((title) => (
                    <option key={title} value={title}>
                      {title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="internship-list">
        {filteredData.length === 0 ? (
          <div className="no-results">No pending company requests</div>
        ) : (
          filteredData.map((request, index) => (
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
                    className="accept-btn"
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
  );
}

export default SCADCompaniesRequests;
