import React, { useState } from 'react';
import './index.css';

function Student({ email }) {
  const username = email.split('@')[0];
  const [showDropdown, setShowDropdown] = useState(false);

  const suggestions = [
    { name: "Valeo", industry: "Automotive", note: "Recommended by 5 interns" },
    { name: "Microsoft", industry: "Tech", note: "Great for software development" },
    { name: "Orange", industry: "Telecom", note: "Popular among students" },
    { name: "IBM", industry: "IT Consulting", note: "Known for training programs" }
  ];

  function toggleDropdown() {
    setShowDropdown(!showDropdown);
  }

  return (
    <div className="page">
      <header>
        <h1>Welcome {username}</h1>
      </header>

      <div className="content">
        <button className="suggestion-button" onClick={toggleDropdown}>
          {showDropdown ? 'Hide Suggested Companies' : 'View Suggested Companies'}
        </button>

        {showDropdown && (
          <ul className="dropdown">
            {suggestions.map((company, index) => (
              <li key={index} className="dropdown-item">
                <strong>{company.name}</strong> - {company.industry}
                <br />
                <small>{company.note}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Student;
