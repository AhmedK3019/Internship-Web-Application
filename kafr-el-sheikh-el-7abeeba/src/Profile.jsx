import React, { useState } from "react";
import ProfileViews from "./ProfileViews";
import "./index.css";

function Profile({
  user,
  onBackUpdate,
  onNavigate,
  isPro = false,
  sharedAssessments = [],
  setSharedAssessments,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user.name,
    id: "58-1234",
    email: `${user.name.replace(/\s/g, ".").toLowerCase()}@student.uni.edu.eg`,
    major: "MET",
    semester: 6,
    jobInterests: "Web Development, UI/UX Design",
    internships: [
      {
        id: 1,
        company: "Tech Solutions Inc.",
        position: "Frontend Developer Intern",
        duration: "Summer 2024",
        responsibilities:
          "Developed responsive web interfaces, collaborated with design team",
      },
    ],
    collegeActivities: "N/A",
  });
  const [newInternship, setNewInternship] = useState({
    company: "",
    position: "",
    duration: "",
    responsibilities: "",
  });

  const handleRemoveAssessment = (assessmentId) => {
    if (setSharedAssessments) {
      setSharedAssessments((prev) =>
        prev.filter((assessment) => assessment.id !== assessmentId)
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInternshipChange = (e) => {
    const { name, value } = e.target;
    setNewInternship((prev) => ({ ...prev, [name]: value }));
  };

  const addInternship = () => {
    if (newInternship.company && newInternship.position) {
      setFormData((prev) => ({
        ...prev,
        internships: [
          ...prev.internships,
          {
            id: Date.now(),
            ...newInternship,
          },
        ],
      }));
      setNewInternship({
        company: "",
        position: "",
        duration: "",
        responsibilities: "",
      });
    }
  };

  const removeInternship = (id) => {
    setFormData((prev) => ({
      ...prev,
      internships: prev.internships.filter(
        (internship) => internship.id !== id
      ),
    }));
  };

  const handleSubmit = (e) => {
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1 className="profile-title">My Profile</h1>
          <button
            className={`btn ${isEditing ? "btn-danger" : "btn-primary1"}`}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        <div className="profile-sections-container">
          <div className="profile-section">
            <h2 className="section-title">University Information</h2>
            <div className="profile-field">
              <label>University ID</label>
              <div className="profile-value">{formData.id}</div>
            </div>
            <div className="profile-field">
              <label>University Email</label>
              <div className="profile-value">{formData.email}</div>
            </div>
          </div>
          <div className="profile-section">
            <h2 className="section-title">Personal Information</h2>

            <div className="profile-field">
              <label>Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="profile-input"
                />
              ) : (
                <div className="profile-value">{formData.username}</div>
              )}
            </div>
            <div className="profile-field">
              <label>Major</label>
              {isEditing ? (
                <select
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  className="profile-select"
                >
                  {["MET", "DMET" , "IET - Networks", "IET - Communication", "BI", "Pharmacy"].map((major) => (
                    <option key={major} value={major}>
                      {major}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="profile-value">
                  {formData.major}
                </div>
              )}
            </div>

            <div className="profile-field">
              <label>Semester</label>
              {isEditing ? (
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  className="profile-select"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((sem) => (
                    <option key={sem} value={sem}>
                      Semester {sem}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="profile-value">
                  Semester {formData.semester}
                </div>
              )}
            </div>


            <div className="profile-field">
              <label>Job Interests</label>
              {isEditing ? (
                <textarea
                  name="jobInterests"
                  value={formData.jobInterests}
                  onChange={handleChange}
                  className="profile-textarea"
                  placeholder="List your job interests separated by commas"
                />
              ) : (
                <div className="profile-value">
                  {formData.jobInterests.split(",").map((interest, index) => (
                    <span key={index} className="interest-tag">
                      {interest.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="profile-field">
              <label>Internships & Part-time Jobs</label>
              {formData.internships.length > 0 ? (
                formData.internships.map((internship) => (
                  <div key={internship.id} className="internship-item">
                    {isEditing && (
                      <button
                        type="button"
                        className="btn btn-danger"
                        style={{ float: "right" }}
                        onClick={() => removeInternship(internship.id)}
                      >
                        Remove
                      </button>
                    )}
                    <div className="internship-header">
                      {internship.position} at {internship.company}
                    </div>
                    <div className="internship-duration">
                      {internship.duration}
                    </div>
                    <div className="internship-responsibilities">
                      {internship.responsibilities}
                    </div>
                  </div>
                ))
              ) : (
                <div className="profile-value">No internships added yet</div>
              )}

              {isEditing && (
                <div style={{ marginTop: "2rem" }}>
                  <h3 style={{ color: "#7EC8E3", marginBottom: "1rem" }}>
                    Add New Internship
                  </h3>
                  <div className="profile-field">
                    <label>Company</label>
                    <input
                      type="text"
                      name="company"
                      value={newInternship.company}
                      onChange={handleInternshipChange}
                      className="profile-input"
                    />
                  </div>
                  <div className="profile-field">
                    <label>Position</label>
                    <input
                      type="text"
                      name="position"
                      value={newInternship.position}
                      onChange={handleInternshipChange}
                      className="profile-input"
                    />
                  </div>
                  <div className="profile-field">
                    <label>Duration</label>
                    <input
                      type="text"
                      name="duration"
                      value={newInternship.duration}
                      onChange={handleInternshipChange}
                      className="profile-input"
                      placeholder="e.g. Summer 2024"
                    />
                  </div>
                  <div className="profile-field">
                    <label>Responsibilities</label>
                    <textarea
                      name="responsibilities"
                      value={newInternship.responsibilities}
                      onChange={handleInternshipChange}
                      className="profile-textarea"
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary1"
                    onClick={addInternship}
                    disabled={!newInternship.company || !newInternship.position}
                  >
                    Add Internship
                  </button>
                </div>
              )}
            </div>

            <div className="profile-field">
              <label>College Activities</label>
              {isEditing ? (
                <textarea
                  name="collegeActivities"
                  value={formData.collegeActivities}
                  onChange={handleChange}
                  className="profile-textarea"
                />
              ) : (
                <div className="profile-value">
                  {formData.collegeActivities ||
                    "No college activities added yet"}
                </div>
              )}
            </div>

            {isPro && sharedAssessments && sharedAssessments.length > 0 && (
              <div className="profile-section" style={{ marginBottom: "2rem" }}>
                <h2 className="section-title">Assessment Scores</h2>
                {sharedAssessments.map((assessment) => (
                  <div>
                    <strong>{assessment.title}</strong>: {assessment.score}%
                    {isEditing && (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveAssessment(assessment.id)}
                        style={{ marginLeft: "10px", padding: "2px 8px" }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
            {isEditing && (
              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-primary1"
                  onClick={handleSubmit}
                >
                  Save Changes
                </button>
              </div>
            )}
            {isPro && (
              <div className="profile-section">
                <h3 className="section-title">Profile Visibility</h3>
                <div>
                  <p>See who viewed your profile</p>
                  <button
                    className="btn btn-primary1"
                    onClick={() => onNavigate("profile-views")}
                  >
                    View All
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={onBackUpdate}
          className="btn btn-secondary"
          style={{ marginTop: "2rem" }}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Profile;
