import React, { useState } from "react";
import "./index.css";

function CompanyAddInternship({
  internships,
  unShowAdd,
  setInternships,
  internshipId,
}) {
  const internship =
    internships.find((intern) => intern.id === internshipId) || null;
  const [newTitle, setNewTitle] = useState(internship ? internship.title : "");
  const [newDuration, setNewDuration] = useState(
    internship ? internship.duration : "Not Specified"
  );
  const [newPay, setNewPay] = useState(internship ? internship.pay : "Unpaid");
  const [newSalary, setNewSalary] = useState(
    internship ? internship.salary : ""
  );
  const [skills, setSkills] = useState(internship ? internship.skills : "");
  const [newDesc, setNewDesc] = useState(internship ? internship.desc : "");
  const [message, setMessage] = useState("");
  const buttonLabel = internship ? "Update Internship" : "Add Internship";

  function addInternship() {
    if (
      !newTitle ||
      !newDesc ||
      !newDuration ||
      !newPay ||
      !skills ||
      (newPay === "Paid" && !newSalary)
    ) {
      setMessage("Please fill in all fields.");
      return;
    }

    const newInternshipData = {
      id: internship ? internship.id : Date.now(),
      title: newTitle,
      duration: newDuration,
      pay: newPay,
      salary: newSalary,
      skills: skills,
      apps: 0,
      desc: newDesc,
    };

    if (internship) {
      setInternships(
        internships.map((intern) =>
          intern.id === internship.id ? newInternshipData : intern
        )
      );
    } else {
      setInternships([...internships, newInternshipData]);
    }

    setNewTitle("");
    setNewDuration("Not Specified");
    setNewPay("Unpaid");
    setNewSalary("");
    setSkills("");
    setNewDesc("");

    if (internship) {
      unShowAdd();
    }
    setMessage(
      internship
        ? "Internship updated successfully."
        : "Internship post added successfully."
    );
  }

  function handleTitleChange(event) {
    setNewTitle(event.target.value);
  }

  function handleDurationChange(event) {
    setNewDuration(event.target.value);
  }

  function handlePayChange(event) {
    setNewPay(event.target.value);
  }

  function handleSalaryChange(event) {
    setNewSalary(event.target.value);
  }

  function handleSkillsChange(event) {
    setSkills(event.target.value);
  }

  function handleDescChange(event) {
    setNewDesc(event.target.value);
  }

  return (
    <div className="side-panel">
      <h2>Internship details</h2>
      <input
        type="text"
        placeholder="Internship Title"
        className="input"
        value={newTitle}
        onChange={handleTitleChange}
      />
      <p>Duration</p>
      <select
        className="select"
        value={newDuration}
        onChange={handleDurationChange}
      >
        <option value="Not Specified">Not Specified</option>
        <option value="1 Month">1 Month</option>
        <option value="3 Months">3 Months</option>
        <option value="6 Months">6 Months</option>
      </select>
      <p>Payment</p>
      <select className="select" value={newPay} onChange={handlePayChange}>
        <option value="Unpaid">Unpaid</option>
        <option value="Paid">Paid</option>
      </select>
      {newPay === "Paid" && (
        <>
          <p>Expected Salary</p>
          <input
            type="number"
            placeholder="Expected Salary"
            className="input"
            value={newSalary}
            onChange={handleSalaryChange}
          />
        </>
      )}
      <textarea
        placeholder="Skills Required"
        value={skills}
        onChange={handleSkillsChange}
      />
      <textarea
        placeholder="Internship Description"
        value={newDesc}
        onChange={handleDescChange}
      />
      <button onClick={addInternship}>{buttonLabel}</button>
      <button onClick={unShowAdd}>Back to My Internships</button>
      {message && (
        <p
          className={
            message === "Please fill in all fields."
              ? "error-message"
              : "success-message"
          }
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default CompanyAddInternship;
