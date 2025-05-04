import React, { useState } from 'react';
import './index.css';

function UpdateProfile({ onBackUpdate }) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    jobInterests: '',
    internships: '',
    collegeActivities: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send data to backend
    console.log('Form submitted:', formData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000); // Hide after 3 seconds
  };

  return (
    <div className="page">
      <div className="update-container">
        <h1>Update Your Profile</h1>
        
        
        
        <form className="update-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Job Interests:</label>
            <input 
              type="text" 
              name="jobInterests"
              placeholder="E.g., Software Engineering" 
              value={formData.jobInterests}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>Internships:</label>
            <textarea 
              name="internships"
              placeholder="Company, Role, Duration"
              value={formData.internships}
              onChange={handleChange}
            ></textarea>
          </div>
          
          <div className="form-group">
            <label>College Activities:</label>
            <textarea 
              name="collegeActivities"
              placeholder="Clubs, Events, Projects"
              value={formData.collegeActivities}
              onChange={handleChange}
            ></textarea>
          </div>
          
          <div className="button-group">
            <button type="submit" className="save-button">Save Changes</button>
            <button type="button" onClick={onBackUpdate} className="back-button">
              Back to Dashboard
            </button>
          </div>
        </form>

        {showSuccess && (
          <div className="success-message">
            Profile updated successfully!
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdateProfile;