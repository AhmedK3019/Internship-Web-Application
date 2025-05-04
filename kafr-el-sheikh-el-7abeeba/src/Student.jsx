import React, { useState } from "react";
import ViewSuggestedCompanies from "./ViewSuggestedCompanies";
import "./index.css";

function Student({ email }) {
  const username = email.split("@")[0];
  const [showSuggested, setSuggested] = useState(false);

  return (
    <div className="page">
      <div className="student-container">
        <header className="student-header">
          <h1>Welcome {username}</h1>
        </header>

        <div className="companies-wrapper">
          <button
            className="suggestion-button"
            onClick={() => setSuggested(!showSuggested)}
          >
            View Suggested Companies
          </button>
          {showSuggested && <ViewSuggestedCompanies />}
        </div>
      </div>
    </div>
  );
}

export default Student;
