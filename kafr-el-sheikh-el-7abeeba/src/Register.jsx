import React, { useState } from "react";
import "./index.css";

function Register({ onBack }) {
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [size, setSize] = useState("Small (50 employees or less)");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleIndustryChange(event) {
    setIndustry(event.target.value);
  }

  function handleSizeChange(event) {
    setSize(event.target.value);
  }

  function handleLogoChange(event) {
    const file = event.target.files[0];
    if (file) {
      setLogoFile(file);
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !industry || !size || !logoFile || !email) {
      setMessage("Please fill in all fields.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      onBack();
    }, 2000);
  }

  return (
    <div className="page">
      <title>Register</title>
      <div className="content">
        {submitted ? (
          <div className="success-message">
            Registration submitted successfully! Redirecting...
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2>Company Registration</h2>
            <input
              type="text"
              placeholder="Company Name"
              className="input"
              value={name}
              onChange={handleNameChange}
            />
            <input
              type="text"
              placeholder="Industry"
              className="input"
              value={industry}
              onChange={handleIndustryChange}
            />
            <select className="select" value={size} onChange={handleSizeChange}>
              <option value="Small">Small (50 employees or less)</option>
              <option value="Medium">Medium (50 - 100)</option>
              <option value="Large">Large (100 - 500)</option>
              <option value="Corporate">Corporate (500+)</option>
            </select>
            <input
              type="email"
              placeholder="Company Email"
              className="input"
              value={email}
              onChange={handleEmailChange}
            />
            <label className="custom-file-label">
              Upload Logo
              <input type="file" accept="image/*" onChange={handleLogoChange} />
              {logoFile && (
                <div className="upload-indicator">
                  ✅ logo uploaded: {logoFile.name}
                </div>
              )}
            </label>
            <label className="custom-file-label">
              Upload proof document (PDF)
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
              />
              {file && (
                <div className="upload-indicator">
                  ✅ PDF uploaded: {file.name}
                </div>
              )}
            </label>
            <button type="submit">Register</button>
            <button type="button" onClick={onBack}>
              Back to Login
            </button>
            {message && <div className="message">{message}</div>}
          </form>
        )}
      </div>
    </div>
  );
}

export default Register;
