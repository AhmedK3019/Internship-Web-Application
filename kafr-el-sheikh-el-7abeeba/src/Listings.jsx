import React, { useState } from "react";
import "./index.css";

function Listings({
  showApplyButton = false,
  onApply = () => {},
  appliedInternships = [],
  onlyShowApplied = false,
  setView,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [customIndustry, setCustomIndustry] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [customDuration, setCustomDuration] = useState("");
  const [selectedPaid, setSelectedPaid] = useState("");
  const [customPaid, setCustomPaid] = useState("");
  const [selectedInternship, setSelectedInternship] = useState(null);

  const dummyData = [
    {
      id: 1,
      company: "Tech Innovators",
      title: "Frontend Developer",
      industry: "Technology",
      duration: "3 Months",
      location: "Cairo",
      pay: "Paid",
      salary: "5000 EGP/month",
      status: "Finalized",
      description: "Work on cutting-edge React applications",
    },
    {
      id: 2,
      company: "Digital Solutions",
      title: "UX Designer",
      industry: "Design",
      duration: "6 Months",
      location: "Remote",
      pay: "Unpaid",
      salary: "Unpaid",
      skills: ["Figma", "Adobe XD"],
      status: "Pending",
      description: "Design user interfaces for enterprise applications",
    },
    {
      id: 4,
      company: "Data Analytics Co.",
      title: "Data Analyst Intern",
      industry: "Data Science",
      duration: "1 Month",
      location: "Alexandria",
      pay: "Paid",
      salary: "3000 EGP/month",
      skills: ["Python", "SQL"],
      status: "Accepted",
      description: "Analyze data and generate reports",
    },
    {
      id: 5,
      company: "Creative Minds",
      title: "Marketing Intern",
      industry: "Marketing",
      duration: "3 Months",
      location: "Cairo",
      pay: "Paid",
      salary: "2000 EGP/month",
      skills: ["Social Media", "Content Creation"],
      status: "Rejected",
      description: "Assist in marketing campaigns and social media management",
    },
  ];
  const normalizedData = dummyData.map((internship) => ({
    ...internship,
    salary:
      internship.pay.toLowerCase() === "unpaid" ? "Unpaid" : internship.salary,
  }));

  function handleIndustryChange(event) {
    setSelectedIndustry(event.target.value);
    setCustomIndustry("");
  }

  function handleDurationChange(event) {
    setSelectedDuration(event.target.value);
    setCustomDuration("");
  }

  function handlePaidChange(event) {
    setSelectedPaid(event.target.value);
    setCustomPaid("");
  }

  const filteredData = normalizedData.filter((internship) => {
    const searchLower = searchQuery.toLowerCase();
    const searchMatch =
      internship.title.toLowerCase().includes(searchLower) ||
      internship.company.toLowerCase().includes(searchLower);

    const industryFilter = selectedIndustry || customIndustry;
    const industryMatch = industryFilter
      ? internship.industry.toLowerCase().includes(industryFilter.toLowerCase())
      : true;

    const durationFilter = selectedDuration || customDuration;
    const durationMatch = durationFilter
      ? internship.duration.toLowerCase().includes(durationFilter.toLowerCase())
      : true;

    const paidFilter = selectedPaid || customPaid;
    const paidMatch = paidFilter
      ? paidFilter.toLowerCase() === "paid"
        ? internship.pay.toLowerCase() === "paid"
        : internship.pay.toLowerCase() === "unpaid"
      : true;

    return searchMatch && industryMatch && durationMatch && paidMatch;
  });

  const finalData = onlyShowApplied
    ? filteredData.filter((item) => appliedInternships.includes(item.id))
    : filteredData;

  const title = onlyShowApplied
    ? "My Applications"
    : searchQuery
    ? `Search Results for "${searchQuery}"`
    : "All Internship Opportunities";

  return (
    <div className="internship-background">
      {(localStorage.getItem("view") === "student" ||
        localStorage.getItem("view") === "proStudent") &&
        !onlyShowApplied && (
          <div className="other-options">
            <button
              className="other-btn"
              onClick={() => {
                setView("my-internships");
              }}
            >
              My Internships
            </button>
            <button
              className="other-btn"
              onClick={() => {
                setView("applied");
              }}
            >
              My Applications
            </button>
          </div>
        )}
      {(localStorage.getItem("view") === "student" ||
        localStorage.getItem("view") === "proStudent") &&
        onlyShowApplied && (
          <div
            className="other-options"
            style={{ right: "1100px" }}
          >
            <button
              className="btn-primary1"
              type="button"
              onClick={() => {
                setView("listing");
              }}
            >
              Back to All Internships
            </button>
            <button
              className="btn-primary1"
              type="button"
              onClick={() => {
                setView("my-internships");
              }}
            >
              Back to My Internships
            </button>
          </div>
        )}
      <div className="listings-container">
        <h1>{title}</h1>
        <div className="filters-container">
          <div className="search-filter-row">
            <input
              type="text"
              placeholder="Search by title or company..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {!onlyShowApplied && (
              <button
                className="btn-primary1"
                onClick={() => setShowFilters(!showFilters)}
                style={{ marginTop: "10px" }}
              >
                {showFilters ? "Hide Filter" : "Show Filter"}
              </button>
            )}
          </div>
          {showFilters && !onlyShowApplied && (
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
                    <option value="Technology">Technology</option>
                    <option value="Design">Design</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
              </div>
              <div className="filter-group">
                <label>Duration:</label>
                <div className="filter-combo">
                  <select
                    className="filter-select"
                    value={selectedDuration}
                    onChange={handleDurationChange}
                  >
                    <option value="">Select Duration</option>
                    <option value="1 Month">1 Month</option>
                    <option value="3 Months">3 Months</option>
                    <option value="6 Months">6 Months</option>
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
          {finalData.length === 0 ? (
            <div className="no-results">
              {onlyShowApplied
                ? searchQuery
                  ? `No applications found for “${searchQuery}”`
                  : `You haven't applied to any internships yet.`
                : searchQuery
                ? `No internships found for “${searchQuery}”`
                : `No internships currently available.`}
            </div>
          ) : (
            finalData.map((internship) => (
              <div
                key={internship.id}
                className={`internship-card ${
                  selectedInternship === internship.id ? "selected" : ""
                }`}
                onClick={() =>
                  setSelectedInternship(
                    selectedInternship === internship.id ? null : internship.id
                  )
                }
              >
                <div>
                  <h2>{internship.title}</h2>
                  <h3>{internship.company}</h3>
                </div>
                <div className="expand-indicator">
                  {selectedInternship === internship.id ? "▼" : "▶"}
                </div>
                {!onlyShowApplied && (
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
                      <span className="detail-label">Duration:</span>
                      <span className="detail-value">
                        {internship.duration}
                      </span>
                    </span>
                  </div>
                )}
                {onlyShowApplied && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderBottom: "1px solid rgba(126, 200, 227, 0.2)",
                      padding: "0.5rem 0",
                    }}
                  >
                    <span className="detail-label">Status:</span>
                    <span>{internship.status || "pending"}</span>
                  </div>
                )}
                {selectedInternship === internship.id && (
                  <div className="details-grid">
                    <div className="detail-item">
                      <span className="detail-label">Location:</span>
                      <span className="detail-value">
                        {internship.location}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Compensation:</span>
                      <span className="detail-value">{internship.salary}</span>
                    </div>
                    {onlyShowApplied && (
                      <div className="detail-item">
                        <span className="detail-label">Duration:</span>
                        <span className="detail-value">
                          {internship.duration}
                        </span>
                      </div>
                    )}
                    <div className="detail-item">
                      <span className="detail-label">Skills Required:</span>
                      <span className="detail-value">
                        {internship.skills?.join(", ") ||
                          "No specific skills required"}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Description:</span>
                    </div>
                    <p style={{ color: "white" }}>{internship.description}</p>

                    {showApplyButton &&
                      !onlyShowApplied &&
                      (appliedInternships.includes(internship.id) ? (
                        <button className="apply-button applied" disabled>
                          ✓ Applied
                        </button>
                      ) : (
                        <button
                          className="apply-button"
                          onClick={() => onApply(internship)}
                        >
                          Apply
                        </button>
                      ))}
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

export default Listings;
