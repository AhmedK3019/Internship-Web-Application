import React, { useState, useEffect } from "react";
import "./index.css";
import {
  technicalSkillsQuestions,
  cognitiveQuestions,
  behavioralQuestions,
} from "./questions";

function AssessmentQuestions({ assessment, onComplete, onBack }) {
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(parseInt(assessment.duration) * 60);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(assessment.score ?? null);

  const getQuestionsForAssessment = (title) => {
    const normalized = title.toLowerCase().trim();

    if (normalized.includes("technical")) return technicalSkillsQuestions;
    if (normalized.includes("behavioral")) return behavioralQuestions;
    if (normalized.includes("cognitive")) return cognitiveQuestions;

    return [];
  };

  const questions = getQuestionsForAssessment(assessment.title);

  useEffect(() => {
    if (timeLeft > 0 && !submitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !submitted) {
      submitAssessment();
    }
  }, [timeLeft, submitted]);

  const selectAnswer = (qIndex, aIndex) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = aIndex;
    setAnswers(newAnswers);
  };

  const submitAssessment = () => {
    const correct = questions.filter(
      (q, i) => answers[i] === q.correctAnswer
    ).length;
    const calculatedScore = Math.round((correct / questions.length) * 100);
    setScore(calculatedScore);
    setSubmitted(true);
    onComplete(calculatedScore);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (submitted || assessment.status === "Completed") {
    return (
      <div className="internship-card">
        <button onClick={onBack} className="back-button">
          ← Back To Assessments
        </button>
        <h2>Assessment Results</h2>
        <p
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
          }}
        >
          Your score: {score}%
        </p>
        <p
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
          }}
        >
          {score >= assessment.passingScore ? "Passed" : "Failed"}
        </p>
        <p
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
          }}
        >
          Passing Score: {assessment.passingScore}%
        </p>
      </div>
    );
  }

  return (
    <div className="internship-card">
      <button onClick={onBack} className="back-button">
        ← Back to Assessments
      </button>
      <h2>{assessment.title}</h2>
      <div className="timer">Time remaining: {formatTime(timeLeft)}</div>

      {questions.map((q, qIndex) => (
        <div key={q.id} className="question-container">
          <div className="question-text">{q.text}</div>
          <div>
            {q.options.map((option, aIndex) => (
              <div
                key={aIndex}
                className={`option ${
                  answers[qIndex] === aIndex ? "selected" : ""
                }`}
                onClick={() => selectAnswer(qIndex, aIndex)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      ))}

      <button className="green-btn" onClick={submitAssessment}>
        Submit Assessment
      </button>
    </div>
  );
}

export default AssessmentQuestions;
