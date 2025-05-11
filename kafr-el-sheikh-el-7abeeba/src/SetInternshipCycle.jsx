import React, { useState } from 'react';
import "./index.css";

const SetInternshipCycle = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      setMessage('Please fill in both dates.');
      return;
    }
    if (new Date(startDate) >= new Date(endDate)) {
      setMessage('End date must be after start date.');
      return;
    }
    // Dummy action: normally you would call a backend API here
    setMessage(`Internship cycle set from ${startDate} to ${endDate}`);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Set Internship Cycle</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-field">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label className="form-label">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="form-input"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
        >
          Set Cycle
        </button>
        {message && (
          <p className="form-message">{message}</p>
        )}
      </form>
    </div>
  );
};

export default SetInternshipCycle;