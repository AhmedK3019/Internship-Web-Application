import React, { useState } from "react";

function VideoCallAppointment({ addAppointment, setView }) {
  const [formData, setFormData] = useState({
    purpose: "",
    date: "",
    time: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitted(true);
    const user = localStorage.getItem("user");
    const name = JSON.parse(user).name;
    const email = JSON.parse(user).email;
    const requestedAppointment = {
      id: Date.now(),
      requestedBy: "PRO Student",
      studentName: name,
      studentEmail: email,
      purpose: formData.purpose,
      date: formData.date,
      time: formData.time,
      message: formData.message,
      status: "pending",
    };
    addAppointment((prevApp) => [...prevApp, requestedAppointment]);

    setFormData({
      purpose: "",
      date: "",
      time: "",
      message: "",
    });

    setTimeout(() => setIsSubmitted(false), 10000);
  };

  return (
    <div className="appointment-form">
      <div className="other-options">
        <button
          className="other-btn"
          onClick={() => {
            setView("requestedAppointments");
          }}
        >
          Requested Appointments
        </button>
        <button
          className="other-btn"
          onClick={() => {
            setView("futureAppointments");
          }}
        >
          Future Appointments
        </button>
      </div>
      <h1>Schedule Video Call</h1>
      {isSubmitted && (
        <div className="success-message">
          Appointment requested successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Purpose of Call:</label>
          <select
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            className="custom-select"
            required
          >
            <option value="">Select Purpose</option>
            <option value="career-guidance">Career Guidance</option>
            <option value="progress-report">Report Clarification</option>
          </select>
        </div>

        <div className="form-group">
          <label>Appointment Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toLocaleDateString("en-CA")}
            className="input"
            required
          />
          <small style={{ color: "#7EC8E3" }}>
            Available from today onward
          </small>
        </div>

        <div className="form-group">
          <label>Appointment Time:</label>
          <select
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="custom-select"
            required
          >
            <option value="">Select Time</option>
            <option value="9:00 AM">9:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="12:00 PM">12:00 PM</option>
            <option value="1:00 PM">1:00 PM</option>
            <option value="2:00 PM">2:00 PM</option>
            <option value="3:00 PM">3:00 PM</option>
            <option value="4:00 PM">4:00 PM</option>
            <option value="5:00 PM">5:00 PM</option>
          </select>
        </div>

        <div className="form-group">
          <label>Additional Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="input"
            placeholder="Any additional details you'd like to share..."
            rows="4"
          />
        </div>

        <button type="submit" className="form-button">
          Request Appointment
        </button>
      </form>
    </div>
  );
}

export default VideoCallAppointment;
