import React, { useState } from "react";
import "./index.css";

const SCADStudentSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const students = [
    {
      id: 1,
      name: "John Doe",
      email: "JohnDoe@gmai.com",
      major: "Computer Science",
      internshipStatus: "completed",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "JaneSmith@gmail.com",
      major: "Graphic Design",
      internshipStatus: "in-progress",
    },
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || student.internshipStatus === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="internship-background">
      <div className="listings-container">
        <h1>Student Search</h1>
        <div className="filters-container">
          <div className="search-filter-row">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
          <div className="filter-row">
            <div className="filter-group">
              <div className="filter-combo">
                <select
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  className="filter-select"
                >
                  <option value="all">Select Internship Status</option>
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="not-started">Not Started</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="internship-list">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="internship-card"
              onClick={() => setSelectedStudent(student)}
            >
              <h3>{student.name}</h3>
              <p>Status: {student.internshipStatus}</p>
              <p>Email: {student.email}</p>
              <p>Major: {student.major}</p>
              <p>Internship Status: {student.internshipStatus}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SCADStudentSearch;
