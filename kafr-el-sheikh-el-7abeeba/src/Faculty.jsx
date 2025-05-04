import React, { useState } from 'react';
import ViewInternshipReports from "./ViewInternshipReports";
import InternshipReports from "./InternshipReports";
import ViewEvaluationReports from "./ViewEvaluationReports";
import EvaluationReports from "./EvaluationReports";
import './index.css';

function Faculty({email}){
    const username = email.split("@")[0];
    const [showInternshipReports, setShowInternshipReports] = useState(false);
    const [showEvaluationReports, setShowEvaluationReports] = useState(false);


  const handleViewInternshipReports = () => {
    setShowInternshipReports(true);
  };
  
  const handleBack1 = () => {
    setShowInternshipReports(false);
  };
  
  if (showInternshipReports) {
    return <InternshipReports onBack={handleBack1} />;
  }



  const handleViewEvaluationReports = () => {
    setShowEvaluationReports(true);
  };
  
  const handleBack2 = () => {
    setShowEvaluationReports(false);
  };

  if (showEvaluationReports) {
    return <EvaluationReports onBack={handleBack2} />;
  }

  
    return (
        <div className="page">
          <div className="faculty-container">
            <header className="faculty-header">
              <h1>Welcome {username}</h1>
            </header>
            
            <div>
            <ViewInternshipReports onViewInternshipReports={handleViewInternshipReports} />
            <ViewEvaluationReports onViewEvaluationReports={handleViewEvaluationReports} />
            </div>
          </div>
        </div>
      );
    
}

export default Faculty;