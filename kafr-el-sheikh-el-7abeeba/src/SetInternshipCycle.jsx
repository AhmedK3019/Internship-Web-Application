import React, { useState } from "react";
import "./index.css";

const SetInternshipCycle = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      setMessage("Please fill in both dates.");
      return;
    }
    if (new Date(startDate) >= new Date(endDate)) {
      setMessage("End date must be after start date.");
      return;
    }
    setMessage(`Internship cycle set from ${startDate} to ${endDate}`);
  };

  return (
    <div className="internship-background">
      <div className="listings-container">
        <h1>Set Internship Cycle</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-field">
            <label>Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="filter-select"
            />
          </div>
          <div className="form-field">
            <label>End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="filter-select"
            />
          </div>
          <button type="submit">Set Cycle</button>
        </form>
        {message && (
          <p
            className={
              message === "Please fill in both dates." ||
              message === "End date must be after start date."
                ? "error-message"
                : "success-message"
            }
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default SetInternshipCycle;
