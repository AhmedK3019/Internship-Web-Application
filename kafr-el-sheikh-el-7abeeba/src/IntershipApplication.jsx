import React, { useState } from "react";
import "./index.css";

function InternshipApplication({ internship, onBack, onApplySuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [university, setUniversity] = useState("");
  const [major, setMajor] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [resume, setResume] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [coverLetter, setCoverLetter] = useState(null);
  const [resumePreview, setResumePreview] = useState(null);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  function handlePhoneChange(event) {
    setPhone(event.target.value);
  }
  function handleUniversityChange(event) {
    setUniversity(event.target.value);
  }
  function handleMajorChange(event) {
    setMajor(event.target.value);
  }
  function handleYearOfStudyChange(event) {
    setYearOfStudy(event.target.value);
  }

  function handleResumeChange(event) {
    const file = event.target.files[0];
    if (file) {
      setResume(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setResumePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleCertificatesChange(event) {
    const files = Array.from(event.target.files);
    setCertificates(files);
  }

  function handleCoverLetterChange(event) {
    const file = event.target.files[0];
    if (file) {
      setCoverLetter(file);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !university || !major || !resume) {
      setMessage("Please fill in all required fields.");
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      onApplySuccess();
    }, 2000);
  }

  return (
    <div className="page">
      <div className="content">
        {submitted ? (
          <div className="message">
            Application submitted successfully! Redirecting...
          </div>
        ) : (
          <div>
            <form onSubmit={handleSubmit}>
              <h2>Apply for {internship?.title || "Internship"}</h2>

              <div className="submission-guidelines" style={{ marginBottom: "2rem" }}>
                <h3>Application Requirements</h3>
                <ul>
                  <li>Complete your personal information</li>
                  <li>Upload your CV (required)</li>
                  <li>Cover letter (recommended)</li>
                  <li>Any relevant certificates</li>
                </ul>
              </div>

              {/* Personal Information */}
              <input
                type="text"
                placeholder="Full Name"
                className="input"
                value={name}
                onChange={handleNameChange}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="input"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="input"
                value={phone}
                onChange={handlePhoneChange}
              />

              {/* Education Information */}
              <input
                type="text"
                placeholder="University"
                className="input"
                value={university}
                onChange={handleUniversityChange}
                required
              />
              <input
                type="text"
                placeholder="Major"
                className="input"
                value={major}
                onChange={handleMajorChange}
                required
              />
              <select
                className="select"
                value={yearOfStudy}
                onChange={handleYearOfStudyChange}
              >
                <option value="">Year of Study</option>
                <option value="Freshman">Freshman</option>
                <option value="Sophomore">Sophomore</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
                <option value="Graduate">Graduate</option>
              </select>

              {/* Documents */}
              <label className="custom-file-label">
                Upload Resume (Required)
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleResumeChange}
                  required
                />
              </label>
              {resume && (
                <div className="upload-indicator">
                  ✅ {resume.name}
                </div>
              )}

              <label className="custom-file-label">
                Upload Cover Letter (Optional)
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleCoverLetterChange}
                />
              </label>
              {coverLetter && (
                <div className="upload-indicator">
                  ✅ {coverLetter.name}
                </div>
              )}

              <label className="custom-file-label">
                Upload Certificates (Optional)
                <input
                  type="file"
                  accept="application/pdf,image/*"
                  multiple
                  onChange={handleCertificatesChange}
                />
              </label>
              {certificates.length > 0 && (
                <div className="upload-indicator">
                  ✅ {certificates.length} file(s) selected
                </div>
              )}

              <div className="detail-actions">
                <button
                  type="submit"
                  className="submit-button"
                  disabled={!name || !email || !university || !major || !resume}
                >
                  Submit Application
                </button>
              </div>

              {message && <div className="message">{message}</div>}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default InternshipApplication;