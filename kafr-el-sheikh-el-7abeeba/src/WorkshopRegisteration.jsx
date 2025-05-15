import React, { useState } from "react";
import "./index.css";

function WorkshopRegistration({ workshop, onBack, onRegisterSuccess }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [university, setUniversity] = useState("");
    const [major, setMajor] = useState("");
    const [yearOfStudy, setYearOfStudy] = useState("");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !university || !major) {
            setMessage("Please fill in all required fields.");
            return;
        }

        setSubmitted(true);


        setTimeout(() => {
            onRegisterSuccess(workshop.id, {
                name,
                email,
                university,
                major,
                yearOfStudy,
                workshopId: workshop.id,
                registrationDate: new Date().toISOString()
            });
        }, 1500);

    };

    return (
        <div className="page">
            <div className="content">
                {submitted ? (
                    <div className="message">
                        Registration successful! Redirecting...
                    </div>
                ) : (
                    <div>
                        <form onSubmit={handleSubmit}>
                            <h2>Register for {workshop?.name}</h2>

                            <div className="submission-guidelines" style={{ marginBottom: "2rem" }}>
                                <h3>Registration Details</h3>
                                <p>
                                    Workshop Date: {new Date(workshop.startDate).toLocaleDateString()} - {new Date(workshop.endDate).toLocaleDateString()}<br />
                                    Time: {workshop.startTime} - {workshop.endTime}
                                </p>
                            </div>

                            <input
                                type="text"
                                placeholder="Full Name"
                                className="input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="University"
                                className="input"
                                value={university}
                                onChange={(e) => setUniversity(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Major"
                                className="input"
                                value={major}
                                onChange={(e) => setMajor(e.target.value)}
                                required
                            />
                            <select
                                className="select"
                                value={yearOfStudy}
                                onChange={(e) => setYearOfStudy(e.target.value)}
                            >
                                <option value="">Year of Study</option>
                                <option value="Freshman">Freshman</option>
                                <option value="Sophomore">Sophomore</option>
                                <option value="Junior">Junior</option>
                                <option value="Senior">Senior</option>
                                <option value="Graduate">Graduate</option>
                            </select>

                            <div className="detail-actions">
                                <button
                                    type="submit"
                                    className="submit-button"
                                    disabled={!name || !email || !university || !major}
                                >
                                    Complete Registration
                                </button>
                                <button
                                    type="button"
                                    className="delete-btn"
                                    onClick={onBack}
                                >
                                    Back to Workshops
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

export default WorkshopRegistration;