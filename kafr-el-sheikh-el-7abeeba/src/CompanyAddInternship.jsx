import React, { useState } from "react";
import "./index.css";

function CompanyAddInternship({ internships, unShowAdd, setInternships }) {
  const [newTitle, setNewTitle] = useState("");
  const [newDuration, setNewDuration] = useState("Not Specified");
  const [newPay, setNewPay] = useState("Unpaid");
  const [newSalary, setNewSalary] = useState("");
  const [skills, setSkills] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [message, setMessage] = useState("");

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
    setInternships([
      ...internships,
      {
        id: Date.now(),
        title: newTitle,
        duration: newDuration,
        pay: newPay,
        salary: newSalary,
        skills: skills,
        desc: newDesc,
      },
    ]);
    setNewTitle("");
    setNewDuration("Not Specified");
    setNewPay("Unpaid");
    setNewSalary("");
    setSkills("");
    setNewDesc("");
    unShowAdd();
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
      <button onClick={addInternship}>Add Internship</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default CompanyAddInternship;
