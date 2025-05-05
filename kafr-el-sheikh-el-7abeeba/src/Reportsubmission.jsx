import React, { useState } from 'react';
import './index.css';

function Reportsubmission({onBackReportsubmission}) {
    const [reportFile, setReportFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setReportFile(file);
            setFileName(file.name);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!reportFile) {
            alert('Please select a file first!');
            return;
        }

        setIsSubmitting(true);
        
        // Simulate API submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmissionStatus('success');
            setFileName('');
            setReportFile(null);
            // In a real app, you would handle the actual file upload here
        }, 2000);
    };

    return (
        <div className="page">
            <div>
                <button onClick={onBackReportsubmission} className="back-button">
                        Back to Dashboard
                </button>
            </div>
            <div className="report-submission-container">
                
                
                <h1 className="report-submission-title">Internship Report Submission</h1>
                
                <div className="report-submission-card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="file-upload-label">
                                Choose Report File (PDF only)
                                <input 
                                    type="file" 
                                    accept=".pdf" 
                                    onChange={handleFileChange}
                                    className="file-input"
                                    required
                                />
                            </label>
                            {fileName && (
                                <p className="file-selected">Selected: {fileName}</p>
                            )}
                        </div>
                        
                        <div className="form-group">
                            <button 
                                type="submit" 
                                className="submit-button"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Report'}
                            </button>
                        </div>
                    </form>
                    
                    {submissionStatus === 'success' && (
                        <div className="success-message">
                            ✓ Report submitted successfully! Your submission is under review.
                        </div>
                    )}
                </div>
                
                <div className="submission-guidelines">
                    <h3>Submission Guidelines:</h3>
                    <ul>
                        <li>File must be in PDF format</li>
                        <li>Maximum file size: 10MB</li>
                        <li>Include your name and student ID in the document</li>
                        <li>Ensure all required sections are completed</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Reportsubmission;