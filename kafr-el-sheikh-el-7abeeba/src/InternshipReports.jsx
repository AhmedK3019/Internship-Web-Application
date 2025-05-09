import React, { useState } from "react";
import reportsData from "./ReportsData"; // You must create this file with sample report entries
import "./index.css";

function InternshipReports() {
  const [reports, setReports] = useState(reportsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [majorFilter, setMajorFilter] = useState("All");
 
  
  const handleStatusChange = (id, newStatus) => {
    setReports(prevReports =>
      prevReports.map(report =>
        report.id === id ? { ...report, status: newStatus } : report
      )
    );
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          report.studentName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "All" || report.status === statusFilter;
    const matchesMajor = majorFilter === "All" || report.major === majorFilter;

    return matchesSearch && matchesStatus && matchesMajor;
  });

  return (
    <div className="reports-background">
      <div className="reports-container">
        <h1>Internship Reports</h1>

        <input
          type="text"
          placeholder="Search by title or student name..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="filter-row">
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Flagged">Flagged</option>
            <option value="Rejected">Rejected</option>
            <option value="Accepted">Accepted</option>
          </select>

          <select
            className="filter-select"
            value={majorFilter}
            onChange={(e) => setMajorFilter(e.target.value)}
          >
            <option value="All">All Majors</option>
            <option value="MET">MET</option>
            <option value="IET">IET</option>
            <option value="EMS">EMS</option>
            
          </select>
        </div>

        {filteredReports.length === 0 ? (
          <div>No reports found.</div>
        ) : (
          filteredReports.map((report) => (
            <div key={report.id} className="report-card">
              <h2>{report.title}</h2>
              <p><span className="detail-label">Student:</span> {report.studentName}</p>
              <p><span className="detail-label">Major:</span> {report.major}</p>
              <p>
                <span className="detail-label">Status:</span>
                <select
                  className="filter-select"
                  value={report.status}
                  onChange={(e) => handleStatusChange(report.id, e.target.value)}
                  style={{ marginLeft: "10px", width: "auto", display: "inline-block" }}
                >
                  <option value="Pending">Pending</option>
                  <option value="Flagged">Flagged</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Accepted">Accepted</option>
                </select>
              </p>
              <p><span className="detail-label">Industry:</span> {report.industry}</p>
              <p><span className="detail-label">Duration:</span> {report.duration}</p>
              <p><span className="detail-label">Location:</span> {report.location}</p>
              <p><span className="detail-label">Start Date:</span> {report.startDate}</p>
              <p><span className="detail-label">End Date:</span> {report.endDate}</p>
              <p><span className="detail-label">Description:</span> {report.description}</p>
              <p><span className="detail-label">Skills:</span> {report.skills}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default InternshipReports;
