import React, { useState } from "react";

function SCADVideoCallAppointment({ addAppointment, setView }) {
  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    purpose: "",
    date: "",
    time: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.studentName === "" ||
      formData.studentEmail === "" ||
      formData.purpose === "" ||
      formData.date === "" ||
      formData.time === ""
    ) {
      setMessage("Please fill in all fields.");
      return;
    }

    setIsSubmitted(true);

    const requestedAppointment = {
      id: Date.now(),
      requestedBy: "SCAD",
      studentName: formData.studentName,
      studentEmail: formData.studentEmail,
      purpose: formData.purpose,
      date: formData.date,
      time: formData.time,
      message: formData.message,
      status: "pending",
    };
    addAppointment((prevApp) => [...prevApp, requestedAppointment]);
    setMessage("");

    setFormData({
      studentName: "",
      studentEmail: "",
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
            setView("appointments");
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
          <label>Student Name:</label>
          <input
            name="studentName"
            placeholder="Student Name"
            className="input"
            value={formData.studentName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Student Email:</label>
          <input
            type="email"
            name="studentEmail"
            placeholder="Student Email"
            value={formData.studentEmail}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

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
        {message && <div className="error-message">{message}</div>}
      </form>
    </div>
  );
}

export default SCADVideoCallAppointment;
