import React, { useState } from "react";
import "./index.css";

function MyInternships() {
  const internships = [
    {
      id: 1,
      company: "Tech Innovators",
      title: "Frontend Developer",
      industry: "Technology",
      duration: "3 Months",
      location: "Cairo",
      status: "Completed",
      startDate: "2023-05-15",
      endDate: "2023-08-15",
      description: "Developed React components",
      skills: ["React", "JavaScript"]
    },
    {
      id: 2,
      company: "Data Solutions",
      title: "Data Analyst",
      industry: "Data Science",
      duration: "6 Months",
      location: "Remote",
      status: "Current",
      startDate: "2024-01-10",
      endDate: "",
      description: "Built data pipelines",
      skills: ["Python", "SQL"]
    }
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [dateError, setDateError] = useState("");
  const [selectedInternship, setSelectedInternship] = useState(null);

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

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = searchQuery 
      ? internship.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        internship.company.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    const matchesStatus = statusFilter === "All" 
      ? true 
      : internship.status === statusFilter;
    
    if (dateError) return false;
    
    let matchesDate = true;
    if (dateRange.start) {
      matchesDate = internship.startDate >= dateRange.start;
    }
    if (matchesDate && dateRange.end) {
      matchesDate = internship.status === "Completed" 
        ? (internship.endDate <= dateRange.end)
        : (internship.startDate <= dateRange.end);
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="internship-background">
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
                    className="filter-input"
                    value={dateRange.start}
                    onChange={(e) => handleDateChange("start", e.target.value)}
                    max={dateRange.end || undefined}
                  />
                  <span className="filter-or">to</span>
                  <input
                    type="date"
                    className="filter-input"
                    value={dateRange.end}
                    onChange={(e) => handleDateChange("end", e.target.value)}
                    min={dateRange.start || undefined}
                  />
                </div>
                {dateError && (
                  <div className="error-message">
                    {dateError}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="internship-list">
          {filteredInternships.length === 0 ? (
            <div className="no-results">
              {searchQuery || statusFilter !== "All" || dateRange.start || dateRange.end
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
                    <span className={`detail-value ${internship.status.toLowerCase()}`}>
                      {internship.status}
                    </span>
                  </span>
                </div>
                {selectedInternship === internship.id && (
                  <div className="details-grid">
                    <div className="detail-item">
                      <span className="detail-label">Location:</span>
                      <span className="detail-value">{internship.location}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Period:</span>
                      <span className="detail-value">
                        {internship.startDate} - {internship.endDate || "Present"}
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
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MyInternships;