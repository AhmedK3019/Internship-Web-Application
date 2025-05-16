import React from "react";
import reportsData from "./ReportsData";
import jsPDF from "jspdf";
import "./index.css";

function Statistics() {
  const cycles = [...new Set(reportsData.map((r) => r.cycle))];
  const statsPerCycle = cycles.map((cycle) => {
    const cycleReports = reportsData.filter((r) => r.cycle === cycle);
    return {
      cycle,
      Accepted: cycleReports.filter((r) => r.studentStatus === "Accepted")
        .length,
      Rejected: cycleReports.filter((r) => r.studentStatus === "Rejected")
        .length,
      Flagged: cycleReports.filter((r) => r.studentStatus === "Flagged").length,
    };
  });

  const averageReviewTime = () => {
    const durations = reportsData
      .filter((r) => r.reviewDate && r.submissionDate)
      .map((r) => {
        const start = new Date(r.submissionDate);
        const end = new Date(r.reviewDate);
        return (end - start) / (1000 * 60 * 60 * 24);
      });
    if (durations.length === 0) return "N/A";
    return (durations.reduce((a, b) => a + b, 0) / durations.length).toFixed(2);
  };

  const courseCounts = {};
  reportsData.forEach((r) => {
    r.courses?.forEach((course) => {
      courseCounts[course] = (courseCounts[course] || 0) + 1;
    });
  });
  const topCourses = Object.entries(courseCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const companyRatings = {};
  reportsData.forEach((r) => {
    if (r.companyName && r.overallRating) {
      if (!companyRatings[r.companyName]) {
        companyRatings[r.companyName] = { total: 0, count: 0 };
      }
      companyRatings[r.companyName].total += r.overallRating;
      companyRatings[r.companyName].count++;
    }
  });
  const topRatedCompanies = Object.entries(companyRatings)
    .map(([company, data]) => ({
      company,
      avg: (data.total / data.count).toFixed(2),
    }))
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 5);

  const companyCounts = {};
  reportsData.forEach((r) => {
    companyCounts[r.companyName] = (companyCounts[r.companyName] || 0) + 1;
  });
  const topCompanies = Object.entries(companyCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const generatePDF = () => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(16);
    doc.text("Internship Statistics Report", 14, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(`Average Review Time: ${averageReviewTime()} days`, 14, y);
    y += 10;

    doc.text("Reports per Cycle:", 14, y);
    y += 8;
    statsPerCycle.forEach((stat) => {
      doc.text(
        `Cycle ${stat.cycle}: Accepted: ${stat.Accepted}, Rejected: ${stat.Rejected}, Flagged: ${stat.Flagged}`,
        14,
        y
      );
      y += 8;
    });

    y += 6;
    doc.text("Most Frequently Used Courses:", 14, y);
    y += 8;
    topCourses.forEach(([course, count]) => {
      doc.text(`${course} - ${count} uses`, 14, y);
      y += 6;
    });

    y += 6;
    doc.text("Top Rated Companies (Avg. Overall Rating):", 14, y);
    y += 8;
    topRatedCompanies.forEach(({ company, avg }) => {
      doc.text(`${company} - ${avg} stars`, 14, y);
      y += 6;
    });

    y += 6;
    doc.text("Top Companies by Internship Count:", 14, y);
    y += 8;
    topCompanies.forEach(([company, count]) => {
      doc.text(`${company} - ${count} interns`, 14, y);
      y += 6;
    });

    doc.save("Internship_Statistics_Report.pdf");
  };

  return (
    <div className="reports-background">
      <div className="reports-container">
        <h1>Internship Statistics</h1>

        <div className="stats-block">
          <h2>Reports per Cycle</h2>
          {statsPerCycle.map((stat) => (
            <div key={stat.cycle}>
              <strong>{stat.cycle}</strong>: Accepted: {stat.Accepted},
              Rejected: {stat.Rejected}, Flagged: {stat.Flagged}
            </div>
          ))}
        </div>

        <div className="stats-block">
          <h2>Average Review Time</h2>
          <p>{averageReviewTime()} days</p>
        </div>

        <div className="stats-block">
          <h2>Most Frequently Used Courses</h2>
          <ul>
            {topCourses.map(([course, count]) => (
              <li key={course}>
                {course} - {count} times
              </li>
            ))}
          </ul>
        </div>

        <div className="stats-block">
          <h2>Top Rated Companies</h2>
          <ul>
            {topRatedCompanies.map((c) => (
              <li key={c.company}>
                {c.company} - {c.avg} stars
              </li>
            ))}
          </ul>
        </div>

        <div className="stats-block">
          <h2>Top Companies by Internship Count</h2>
          <ul>
            {topCompanies.map(([company, count]) => (
              <li key={company}>
                {company} - {count} interns
              </li>
            ))}
          </ul>
        </div>

        <button className="download-button" onClick={generatePDF}>
          Generate Statistics Report PDF
        </button>
      </div>
    </div>
  );
}

export default Statistics;
