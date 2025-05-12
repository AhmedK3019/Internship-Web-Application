import React, { useState, useEffect } from "react";
import "./index.css";
import AssessmentQuestions from "./AssessmentQuestions";

function ViewAssessments({ sharedAssessments, setSharedAssessments }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [activeAssessment, setActiveAssessment] = useState(null);

  const handleShare = (assessment) => {
    if (!sharedAssessments.find((a) => a.id === assessment.id)) {
      setSharedAssessments((prev) => [...prev, assessment]);
    }
  };

  const [assessments, setAssessments] = useState([
    {
      id: 1,
      title: "Technical Skills Assessment",
      description:
        "Evaluate your programming and technical skills with this comprehensive test covering various technologies.",
      duration: "45 minutes",
      deadline: "2025-06-15",
      status: "Available",
      topics: ["JavaScript", "React", "CSS", "Algorithms"],
      passingScore: 70,
    },
    {
      id: 2,
      title: "Behavioral Assessment",
      description:
        "Assess your workplace behavior and soft skills through scenario-based questions.",
      duration: "30 minutes",
      deadline: "2025-06-20",
      status: "Available",
      topics: ["Communication", "Teamwork", "Problem Solving"],
      passingScore: 60,
    },
    {
      id: 3,
      title: "Cognitive Ability Test",
      description:
        "Measure your problem-solving and critical thinking skills with logical puzzles and pattern recognition.",
      duration: "60 minutes",
      deadline: "2025-05-30",
      status: "Completed",
      score: 85,
      topics: ["Logical Reasoning", "Numerical Analysis", "Verbal Ability"],
      passingScore: 65,
    },
  ]);

  const filtered = assessments.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleComplete = (id, score) => {
    setAssessments(
      assessments.map((a) =>
        a.id === id ? { ...a, status: "Completed", score } : a
      )
    );
  };

  if (activeAssessment) {
    return (
      <div className="internship-background">
        <div className="assessment-page">
          <AssessmentQuestions
            assessment={activeAssessment}
            onComplete={(score) => {
              handleComplete(activeAssessment.id, score);
              setActiveAssessment(null);
            }}
            onBack={() => setActiveAssessment(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="internship-background">
      <div className="listings-container">
        <h1>Available Assessments</h1>

        <div className="filters-container">
          <div className="search-filter-row">
            <input
              type="text"
              placeholder="Search assessments..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="internship-list">
          {filtered.length === 0 ? (
            <div className="no-results">
              {searchQuery ? "No matches" : "No assessments available"}
            </div>
          ) : (
            filtered.map((assessment) => (
              <div
                key={assessment.id}
                className={`internship-card ${selectedId === assessment.id ? "selected" : ""
                  }`}
                onClick={() =>
                  setSelectedId(
                    selectedId === assessment.id ? null : assessment.id
                  )
                }
              >
                <div>
                  <h2>{assessment.title}</h2>
                  <h3>
                    {assessment.status === "Completed"
                      ? `Score: ${assessment.score}%`
                      : `Status: ${assessment.status}`}
                  </h3>
                </div>
                <div className="expand-indicator">
                  {selectedId === assessment.id ? "▼" : "▶"}
                </div>

                {selectedId === assessment.id && (
                  <div className="details-grid">
                    <div className="detail-item">
                      <span className="detail-label">Duration:</span>
                      <span className="detail-value">
                        {assessment.duration}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Topics:</span>
                      <span className="detail-value">
                        {assessment.topics.join(", ")}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Passing Score:</span>
                      <span className="detail-value">
                        {assessment.passingScore}%
                      </span>
                    </div>
                    <p style={{ color: "white" }}>{assessment.description}</p>

                    <button
                      style={{
                        width: "200px",
                        alignItems: "center",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveAssessment(assessment);
                      }}
                    >
                      {assessment.status === "Completed"
                        ? "View Results"
                        : "Start Assessment"}
                    </button>
                    {assessment.status === "Completed" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(assessment);
                        }}
                        style={{
                          width: "200px",
                          alignItems: "center",
                          cursor: sharedAssessments.some(
                            (a) => a.id === assessment.id
                          )
                            ? "not-allowed"
                            : "pointer",
                          opacity: sharedAssessments.some(
                            (a) => a.id === assessment.id
                          )
                            ? 0.6
                            : 1,
                        }}
                      >
                        {sharedAssessments.some((a) => a.id === assessment.id)
                          ? "Shared"
                          : "Share on Profile"}
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewAssessments;
