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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Set Internship Cycle</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Set Cycle
        </button>
        {message && (
          <p className="text-center mt-4 text-sm text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
};

export default SetInternshipCycle;