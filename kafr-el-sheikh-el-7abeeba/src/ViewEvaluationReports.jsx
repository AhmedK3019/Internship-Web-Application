import React from 'react';
import './index.css';
function ViewEvaluationReports({ onViewEvaluationReports }) {


  return (
    <div className="companies-section">
      <h2 className="section-subtitle">Evaluation Reports</h2>
      <p className="section-description">
      </p>
      <button className="evaluations-button" onClick={onViewEvaluationReports}>
        View Evaluation Reports
      </button>
    </div>
  );
}

export default ViewEvaluationReports;