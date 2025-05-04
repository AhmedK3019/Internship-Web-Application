import React from 'react';
import ViewSuggestedCompanies from './ViewSuggestedCompanies';
import './index.css';

function Student({ email, onViewCompanies }) {
  const username = email.split('@')[0];

  return (
    <div className="page">
      <div className="student-container">
        <header className="student-header">
          <h1>Welcome {username}</h1>
        </header>

        <div className="companies-wrapper">
          <ViewSuggestedCompanies onViewCompanies={onViewCompanies} />
        </div>
      </div>
    </div>
  );
}

export default Student; 