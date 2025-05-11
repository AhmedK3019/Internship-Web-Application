import React from "react";
import reportsData from "./ReportsData";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./index.css";

function Statistics() {
  
  const cycles = [...new Set(reportsData.map(r => r.cycle))];
  const statsPerCycle = cycles.map(cycle => {
    const cycleReports = reportsData.filter(r => r.cycle === cycle);
    const statusCounts = {
      Accepted: cycleReports.filter(r => r.status === "Accepted").length,
      Rejected: cycleReports.filter(r => r.status === "Rejected").length,
      Flagged: cycleReports.filter(r => r.status === "Flagged").length
    };
    return { cycle, ...statusCounts };
  });

  
  const averageReviewTime = () => {
    const durations = reportsData
      .filter(r => r.reviewDate && r.submissionDate)
      .map(r => {
        const start = new Date(r.submissionDate);
        const end = new Date(r.reviewDate);
        return (end - start) / (1000 * 60 * 60 * 24);
      });
    if (durations.length === 0) return 0;
    return (durations.reduce((a, b) => a + b, 0) / durations.length).toFixed(2);
  };

  
  const courseFrequency = {};
  reportsData.forEach(r => {
    r.courses?.forEach(course => {
      courseFrequency[course] = (courseFrequency[course] || 0) + 1;
    });
  });
  const mostUsedCourses = Object.entries(courseFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  
  const companyRatings = {};
  reportsData.forEach(r => {
    if (r.company && r.evaluation?.rating) {
      if (!companyRatings[r.company]) {
        companyRatings[r.company] = { total: 0, count: 0 };
      }
      companyRatings[r.company].total += r.evaluation.rating;
      companyRatings[r.company].count++;
    }
  });
  const topRatedCompanies = Object.entries(companyRatings)
    .map(([company, { total, count }]) => ({
      company,
      avgRating: (total / count).toFixed(2)
    }))
    .sort((a, b) => b.avgRating - a.avgRating)
    .slice(0, 5);

  
  const companyCounts = {};
  reportsData.forEach(r => {
    companyCounts[r.company] = (companyCounts[r.company] || 0) + 1;
  });
  const topCompaniesByCount = Object.entries(companyCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Internship Statistics Report", 14, 20);

    doc.setFontSize(12);
    doc.text(`Average Review Time: ${averageReviewTime()} days`, 14, 30);

    statsPerCycle.forEach((s, i) => {
      doc.text(
        `Cycle ${s.cycle}: Accepted: ${s.Accepted}, Rejected: ${s.Rejected}, Flagged: ${s.Flagged}`,
        14,
        40 + i * 10
      );
    });

    doc.autoTable({
      startY: 70,
      head: [["Top Courses", "Count"]],
      body: mostUsedCourses.map(([course, count]) => [course, count])
    });

    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Top Rated Companies", "Avg. Rating"]],
      body: topRatedCompanies.map(c => [c.company, c.avgRating])
    });

    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Top Companies by Count", "Count"]],
      body: topCompaniesByCount
    });

    doc.save("Internship_Statistics.pdf");
  };

  return (
    <div className="reports-background">
      <div className="reports-container">
        <h1>Real-Time Internship Statistics</h1>

        <div className="stats-block">
          <h2>Per Cycle Report Summary</h2>
          {statsPerCycle.map(s => (
            <div key={s.cycle}>
              <strong>Cycle {s.cycle}</strong>: Accepted: {s.Accepted}, Rejected: {s.Rejected}, Flagged: {s.Flagged}
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
            {mostUsedCourses.map(([course, count]) => (
              <li key={course}>{course} - {count} uses</li>
            ))}
          </ul>
        </div>

        <div className="stats-block">
          <h2>Top Rated Companies</h2>
          <ul>
            {topRatedCompanies.map(c => (
              <li key={c.company}>{c.company} - {c.avgRating} stars</li>
            ))}
          </ul>
        </div>

        <div className="stats-block">
          <h2>Top Companies by Internship Count</h2>
          <ul>
            {topCompaniesByCount.map(([company, count]) => (
              <li key={company}>{company} - {count} internships</li>
            ))}
          </ul>
        </div>

        <button className="action-button" onClick={generatePDF}>
          Generate Statistics Report PDF
        </button>
      </div>
    </div>
  );
}

export default Statistics;