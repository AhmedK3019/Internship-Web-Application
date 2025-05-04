import React from 'react';
import './index.css';

function ViewSuggestedCompanies({ onViewCompanies }) {
  return (
    <div className="companies-section">
  
      <h2 className="section-subtitle">Featured Opportunities</h2>
      <p className="section-description">
        Discover companies that perfectly match your skills and interests. 
        Our curated selection is based on your profile and career goals.
      </p>
      <button className="suggestion-button" onClick={onViewCompanies}>
        View Suggested Companies
      </button>
    </div>
  );
}

export default ViewSuggestedCompanies;