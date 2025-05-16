import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "./index.css";

const SCADViewRealTimeStatistics = () => {
  const [selectedCycle, setSelectedCycle] = useState("All");
  const [statistics, setStatistics] = useState({
    accepted: 0,
    rejected: 0,
    flagged: 0,
    averageReviewTime: 0,
    mostUsedCourses: [],
    topRatedCompanies: [],
    topCompaniesByCount: [],
    topCount: [],
  });

  const allStatistics = {
    "2024-Q1": {
      accepted: 100,
      rejected: 20,
      flagged: 10,
      averageReviewTime: 4,
      mostUsedCourses: ["Computer Science", "Marketing"],
      topRatedCompanies: ["Google", "Amazon"],
      topCompaniesByCount: ["Google", "Facebook"],
      topCount: [14, 12],
    },
    "2024-Q2": {
      accepted: 120,
      rejected: 30,
      flagged: 15,
      averageReviewTime: 5,
      mostUsedCourses: ["Graphic Design", "Finance"],
      topRatedCompanies: ["Microsoft", "Apple"],
      topCompaniesByCount: ["Microsoft", "Apple"],
      topCount: [10, 7],
    },
    "2024-Q3": {
      accepted: 90,
      rejected: 25,
      flagged: 5,
      averageReviewTime: 3,
      mostUsedCourses: ["Engineering", "Data Science"],
      topRatedCompanies: ["Tesla", "IBM"],
      topCompaniesByCount: ["Tesla", "IBM"],
      topCount: [20, 12],
    },
    "2025-Q1 (current)": {
      accepted: 110,
      rejected: 40,
      flagged: 20,
      averageReviewTime: 6,
      mostUsedCourses: ["Business", "Economics"],
      topRatedCompanies: ["Meta", "Netflix"],
      topCompaniesByCount: ["Meta", "Netflix"],
      topCount: [17, 15],
    },
    All: {
      accepted: 420,
      rejected: 115,
      flagged: 50,
      averageReviewTime: 4.5,
      mostUsedCourses: [
        "Computer Science",
        "Marketing",
        "Graphic Design",
        "Finance",
        "Engineering",
        "Data Science",
        "Business",
        "Economics",
      ],
      topRatedCompanies: ["Google", "Amazon", "Microsoft", "Apple", "Tesla"],
      topCompaniesByCount: [
        "Google",
        "Facebook",
        "Microsoft",
        "Apple",
        "Tesla",
      ],
      topCount: [40, 36, 25, 20, 10],
    },
  };

  useEffect(() => {
    // Update statistics based on the selected cycle
    setStatistics(allStatistics[selectedCycle]);
  }, [selectedCycle]);

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
    const mostUsedCoursesText = `Most Used Courses: ${statistics.mostUsedCourses.join(
      ", "
    )}`;
    const wrappedCourses = doc.splitTextToSize(mostUsedCoursesText, 180); // 180 is the width in mm
    doc.text(wrappedCourses, 14, 100);

    // Wrap "Top Rated Companies" text
    const topRatedCompaniesText = `Top Rated Companies: ${statistics.topRatedCompanies.join(
      ", "
    )}`;
    const wrappedCompanies = doc.splitTextToSize(topRatedCompaniesText, 180);
    doc.text(wrappedCompanies, 14, 110 + wrappedCourses.length * 2); // Adjust Y position based on previous text

    // Wrap "Top Companies by Internship Count" text
    const topCompaniesText = `Top Companies by Internship Count: ${statistics.topCompaniesByCount
      .map((company, index) => `${company} (${statistics.topCount[index]})`)
      .join(", ")}`;
    const wrappedTopCompanies = doc.splitTextToSize(topCompaniesText, 180);
    doc.text(
      wrappedTopCompanies,
      14,
      120 + wrappedCourses.length * 2 + wrappedCompanies.length * 2
    );

    doc.save("RealTimeStatisticsReport.pdf");
  };

  return (
    <div className="internship-background">
      <div className="listings-container">
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
            {Object.keys(allStatistics)
              .filter((cycle) => cycle !== "All")
              .map((cycle) => (
                <option key={cycle} value={cycle}>
                  {cycle}
                </option>
              ))}
          </select>
        </div>
        <div className="stats-block">
          <h2>Accepted Reports</h2>
          <p>{statistics.accepted}</p>
        </div>
        <div className="stats-block">
          <h2>Rejected Reports</h2>
          <p>{statistics.rejected}</p>
        </div>
        <div className="stats-block">
          <h2>Flagged Reports</h2>
          <p>{statistics.flagged}</p>
        </div>
        <div className="stats-block">
          <h2>Average Review Time</h2>
          <p>{statistics.averageReviewTime} days</p>
        </div>
        <div className="stats-block">
          <h2>Most Used Courses</h2>
          <p>{statistics.mostUsedCourses.join(", ")}</p>
        </div>
        <div className="stats-block">
          <h2>Top Rated Companies</h2>
          <p>{statistics.topRatedCompanies.join(", ")}</p>
        </div>
        <div className="stats-block">
          <h2>Top Companies by Internship Count</h2>
          <p>
            {statistics.topCompaniesByCount.map((company, index) => (
              <span key={index}>
                {company} ({statistics.topCount[index]})
                {index < statistics.topCompaniesByCount.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        </div>
        <button onClick={handleGenerateReport}>Generate Report</button>
      </div>
    </div>
  );
};

export default SCADViewRealTimeStatistics;
