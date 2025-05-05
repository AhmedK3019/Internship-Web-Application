import React, { useState } from "react";
import "./index.css";

function InternshipApplication({ internship, onBack }) {
  const [files, setFiles] = useState({
    cv: null,
    coverLetter: null,
    certificates: null,
    otherDocuments: []
  });
  
  const [applicantInfo, setApplicantInfo] = useState({
    name: '',
    email: '',
    phone: '',
    university: '',
    major: '',
    yearOfStudy: ''
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleFileChange = (field) => (e) => {
    if (field === 'otherDocuments') {
      setFiles(prev => ({
        ...prev,
        otherDocuments: [...e.target.files]
      }));
    } else {
      setFiles(prev => ({
        ...prev,
        [field]: e.target.files[0]
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicantInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!files.cv || !applicantInfo.name || !applicantInfo.email) {
      return;
    }
    
    // Prepare application data
    const applicationData = {
      internship,
      applicantInfo,
      files
    };
    
    console.log("Submitting application:", applicationData);
    
    // Simulate API call
    setTimeout(() => {
      setSubmissionStatus("success");
    }, 1500);
  };

  return (
    <div className="internship-background">
      <div className="listings-container">
        <h1>Apply for {internship?.title || "Internship"}</h1>
        
        <div className="report-submission-card">
          <h2 className="discover-title">
            {internship?.company} - {internship?.title}
          </h2>
          
          <div className="submission-guidelines">
            <h3>Application Requirements</h3>
            <ul>
              <li>Complete your personal information</li>
              <li>Upload your CV (required)</li>
              <li>Cover letter (recommended)</li>
              <li>Any relevant certificates</li>
            </ul>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* Personal Information Section */}
            
              <div className="content">
              <h3>Personal Information</h3>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="input"
                    value={applicantInfo.name}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="input"
                    value={applicantInfo.email}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    className="input"
                    placeholder="Phone Number"
                    value={applicantInfo.phone}
                    onChange={handleInputChange}
                  />
            </div>
            <div className="form-section">
              <h3 className="section-title">Education Information</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="University"
                    className="input"
                    value={applicantInfo.university}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <select
                    name="yearOfStudy"
                    value={applicantInfo.yearOfStudy}
                    onChange={handleInputChange}
                    className="select"
                  >
                    <option value="">Year of Study</option>
                    <option value="Freshman">Freshman</option>
                    <option value="Sophomore">Sophomore</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                    <option value="Graduate">Graduate</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <input
                  type="text"
                  name="major"
                  placeholder="Major"
                  value={applicantInfo.major}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>
            
            <div className="form-section">
              <h3 className="section-title">Documents</h3>
              
        
              <div className="form-group">
                <label className="file-upload-label">
                  {files.cv ? files.cv.name : "Upload CV (Required)"}
                  <input 
                    type="file" 
                    className="file-input" 
                    onChange={handleFileChange('cv')}
                    required
                  />
                </label>
              </div>
              
              
              <div className="form-group">
                <label className="file-upload-label">
                  {files.coverLetter ? files.coverLetter.name : "Upload Cover Letter (Optional)"}
                  <input 
                    type="file" 
                    className="file-input" 
                    onChange={handleFileChange('coverLetter')}
                  />
                </label>
              </div>
              
            
              <div className="form-group">
                <label className="file-upload-label">
                  {files.certificates ? files.certificates.name : "Upload Certificates (Optional)"}
                  <input 
                    type="file" 
                    className="file-input" 
                    onChange={handleFileChange('certificates')}
                  />
                </label>
              </div>
              
             
              <div className="form-group">
                <label className="file-upload-label">
                  {files.otherDocuments.length > 0 
                    ? `${files.otherDocuments.length} additional files selected` 
                    : "Upload Other Documents (Optional)"}
                  <input 
                    type="file" 
                    className="file-input" 
                    onChange={handleFileChange('otherDocuments')}
                    multiple
                  />
                </label>
              </div>
            </div>
            
            <div className="form-actions">
              <button 
                type="submit" 
                className="submit-button"
                disabled={!files.cv || !applicantInfo.name || !applicantInfo.email}
              >
                Submit Application
              </button>
            </div>
            
            {submissionStatus === "success" && (
              <div className="success-message">
                <p>Your application has been submitted successfully!</p>
                <button 
                  onClick={onBack}
                  className="submit-button"
                  style={{ marginTop: '1rem' }}
                >
                  Back to Internships
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default InternshipApplication;