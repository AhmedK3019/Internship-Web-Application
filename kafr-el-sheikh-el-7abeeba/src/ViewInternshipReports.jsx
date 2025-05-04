import React from 'react';
import './index.css';
function ViewInternshipReports({ onViewInternshipReports }) {


  return (
    <div className="companies-section">
      <h2 className="section-subtitle">Internship Reports</h2>
      <p className="section-description">
      </p>
      <button className="internshipreports-button" onClick={onViewInternshipReports}>
        View Internship Reports
      </button>
    </div>
  );
}

export default ViewInternshipReports;