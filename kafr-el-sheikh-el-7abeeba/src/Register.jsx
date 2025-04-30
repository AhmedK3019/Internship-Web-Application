import React, { useState } from 'react';
import './index.css';

function Register({ onBack }){
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [size, setSize] = useState('Small (50 employees or less)');
  const [logo, setLogo] = useState(null);
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [message, setMessage] = useState('');
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
      setLogo(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
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

  function handleSubmit(e){
    e.preventDefault();
    if (!name || !industry || !size || !logo || !email) {
      setMessage('Please fill in all fields.');
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      onBack();
    }, 2000);
  }

  return(
    <div className='page'>
      <title>Register</title>
      <div className='content'>
        {submitted ? (
          <div className="message">Registration submitted successfully! Redirecting...</div>
        ) : (
        <form onSubmit={handleSubmit}>
          <h2>Company Registration</h2>
            <input
              type='text'
              placeholder='Company Name'
              className='input'
              value={name}
              onChange={handleNameChange}
            />
            <input
              type='text'
              placeholder='Industry'
              className='input'
              value={industry}
              onChange={handleIndustryChange}
            />
            <select
              className="select"
              value={size}
              onChange={handleSizeChange}
            >
              <option value="Small">Small (50 employees or less)</option>
              <option value="Medium">Medium (50 - 100)</option>
              <option value="Large">Large (100 - 500)</option>
              <option value="Corporate">Corporate (500+)</option>
            </select>
            <label className="custom-file-label">
              Upload Logo
              <input type="file" accept="image/*" onChange={handleLogoChange}/>
            </label>
            {previewUrl && <img src={previewUrl} alt="Logo Preview" style={{ width: '100px' }} />}
            <br />
            <input
              type="email"
              placeholder="Company Email"
              className="input"
              value={email}
              onChange={handleEmailChange}
            />
            <label className="custom-file-label">
              Upload proof document (PDF)
              <input type="file" accept="application/pdf" onChange={handleFileChange} />
              {file && (
              <div className="upload-indicator">
                ✅ PDF uploaded: {file.name}
              </div>
              )}
            </label>
            <br />
            <button type="submit">
              Register
            </button>
            <button type="button" onClick={onBack}>Back to Login</button>
            {message && <div className="message">{message}</div>}
        </form>
        )}
      </div>
    </div>
  );
}

export default Register;