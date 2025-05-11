import React, { useState } from "react";
import "./index.css";

const SCADStudentSearch = ({ students }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || student.internshipStatus === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="student-search">
      <h1>Student Search</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select value={selectedStatus} onChange={handleStatusChange}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="in-progress">In Progress</option>
          <option value="not-started">Not Started</option>
        </select>
      </div>
      <div className="student-list">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            className="student-item"
            onClick={() => setSelectedStudent(student)}
          >
            <h3>{student.name}</h3>
            <p>Status: {student.internshipStatus}</p>
          </div>
        ))}
      </div>
      {selectedStudent && (
        <div className="student-profile">
          <h2>{selectedStudent.name}'s Profile</h2>
          <p>Email: {selectedStudent.email}</p>
          <p>Major: {selectedStudent.major}</p>
          <p>Internship Status: {selectedStudent.internshipStatus}</p>
          <button onClick={() => setSelectedStudent(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default SCADStudentSearch;