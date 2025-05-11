import React, { useState } from "react";
import jsPDF from "jspdf";
import "./index.css";

const SCADViewRealTimeStatistics = () => {
  const [selectedCycle, setSelectedCycle] = useState("All");
  const statistics = {
    cycles: ["2023-Q1", "2023-Q2", "2023-Q3", "2023-Q4"],
    accepted: 120,
    rejected: 30,
    flagged: 15,
    averageReviewTime: 5,
    mostUsedCourses: ["Computer Science", "Graphic Design", "Marketing"],
    topRatedCompanies: ["Google", "Microsoft", "Amazon"],
    topCompaniesByCount: ["Google", "Facebook", "Apple"],
  };

  const handleGenerateReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Real-Time Statistics Report", 14, 22);

    doc.setFontSize(12);
    doc.text(`Cycle: ${selectedCycle}`, 14, 40);

    doc.text("Statistics:", 14, 50);
    doc.text(`Accepted Reports: ${statistics.accepted}`, 14, 60);
    doc.text(`Rejected Reports: ${statistics.rejected}`, 14, 70);
    doc.text(`Flagged Reports: ${statistics.flagged}`, 14, 80);
    doc.text(
      `Average Review Time: ${statistics.averageReviewTime} days`,
      14,
      90
    );
    doc.text(
      `Most Used Courses: ${statistics.mostUsedCourses.join(", ")}`,
      14,
      100
    );
    doc.text(
      `Top Rated Companies: ${statistics.topRatedCompanies.join(", ")}`,
      14,
      110
    );
    doc.text(
      `Top Companies by Internship Count: ${statistics.topCompaniesByCount.join(
        ", "
      )}`,
      14,
      120
    );

    doc.save("RealTimeStatisticsReport.pdf");
  };

  return (
    <div className="realtime-statuses-container">
      <h1>Real-Time Statistics</h1>
      <div className="filter-row">
        <label htmlFor="cycle-select" className="form-label">
          Select Cycle:
        </label>
        <select
          id="cycle-select"
          className="filter-select"
          value={selectedCycle}
          onChange={(e) => setSelectedCycle(e.target.value)}
        >
          <option value="All">All Cycles</option>
          {statistics.cycles.map((cycle) => (
            <option key={cycle} value={cycle}>
              {cycle}
            </option>
          ))}
        </select>
      </div>
      <div className="statistics-grid">
        <div className="statistics-card">
          <h3>Accepted Reports</h3>
          <p>{statistics.accepted}</p>
        </div>
        <div className="statistics-card">
          <h3>Rejected Reports</h3>
          <p>{statistics.rejected}</p>
        </div>
        <div className="statistics-card">
          <h3>Flagged Reports</h3>
          <p>{statistics.flagged}</p>
        </div>
        <div className="statistics-card">
          <h3>Average Review Time</h3>
          <p>{statistics.averageReviewTime} days</p>
        </div>
        <div className="statistics-card">
          <h3>Most Used Courses</h3>
          <p>{statistics.mostUsedCourses.join(", ")}</p>
        </div>
        <div className="statistics-card">
          <h3>Top Rated Companies</h3>
          <p>{statistics.topRatedCompanies.join(", ")}</p>
        </div>
        <div className="statistics-card">
          <h3>Top Companies by Internship Count</h3>
          <p>{statistics.topCompaniesByCount.join(", ")}</p>
        </div>
      </div>
      <button className="btn btn-primary" onClick={handleGenerateReport}>
        Generate Report
      </button>
    </div>
  );
};

export default SCADViewRealTimeStatistics;
