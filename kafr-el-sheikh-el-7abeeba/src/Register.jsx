import React, { useState, useEffect, use } from "react";
import "./index.css";

function Register({ onBack, onRegister }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [size, setSize] = useState("Small");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [files, setFiles] = useState([]);
  const [logoFile, setLogoFile] = useState(null);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

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

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleFileChange(event) {
    const newFiles = Array.from(event.target.files);
    if (files.length + newFiles.length > 3) {
      setMessage("Maximum 3 files allowed");
      return;
    }
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  }

  function removeFile(index) {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !username ||
      !name ||
      !industry ||
      !size ||
      !logoFile ||
      !email ||
      !password ||
      files.length === 0
    ) {
      setMessage("Please fill in all fields.");
      return;
    }
    const companyRequest = {
      username: username,
      name: name,
      email: email,
      password: password,
      industry: industry,
      size: size,
      logo: logoFile,
      files: files,
    };
    onRegister(companyRequest);
    setMessage("");
    setSubmitted(true);
    setTimeout(() => {
      onBack();
    }, 2000);
  }

  return (
    <div className="page">
      <div className="sidebar">
        <button type="button" onClick={onBack}>
          Back to Login
        </button>
      </div>
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
              placeholder="Username"
              className="input"
              value={username}
              onChange={handleUsernameChange}
            />
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
            <input
              type="password"
              placeholder="Company Password"
              className="input"
              value={password}
              onChange={handlePasswordChange}
            />
            <label className="custom-file-label">
              Upload Logo
              <input type="file" accept="image/*" onChange={handleLogoChange} />
              {logoFile && (
                <div className="file-item">
                  <span>✅ {logoFile.name}</span>
                  <button
                    type="button"
                    onClick={() => setLogoFile(null)}
                    className="remove-file"
                  >
                    ✕
                  </button>
                </div>
              )}
            </label>
            <label className="custom-file-label">
              Upload proof documents (PDF, max 3)
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                multiple
                disabled={files.length >= 3}
              />
              <div className="files-list">
                {files.map((file, index) => (
                  <div key={index} className="file-item">
                    <span>✅ {file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="remove-file"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              {files.length > 0 && (
                <div className="file-count">
                  {files.length}/3 files uploaded
                </div>
              )}
            </label>
            <button type="submit" className="Register-btn">
              Register
            </button>
            {message && <div className="error-message">{message}</div>}
          </form>
        )}
      </div>
    </div>
  );
}

export default Register;
