import React, { useState } from "react";
import ViewSuggestedCompanies from "./ViewSuggestedCompanies";
import Companies from "./Companies";
import "./index.css";

function Student({ email }) {
  const username = email.split("@")[0];
  const [showCompanies, setShowCompanies] = useState(false);
  
  const handleViewCompanies = () => {
    setShowCompanies(true);
  };
  
  const handleBack = () => {
    setShowCompanies(false);
  };

  if (showCompanies) {
    return <Companies onBack={handleBack} />;
  }

  return (
    <div className="page">
      <div className="student-container">
        <header className="student-header">
          <h1>Welcome {username}</h1>
        </header>
        
        <div>
          <ViewSuggestedCompanies onViewCompanies={handleViewCompanies} />
        </div>
      </div>
    </div>
  );
}

export default Student;