import React from "react";

const ProfileViews = ({ onBack }) => {
  const profileViews = [
    {
      id: 1,
      companyName: "Google",
      viewedOn: "2025-05-01",
      viewedBy: "Khaled hossam"
    },
    {
      id: 2,
      companyName: "Microsoft",
      viewedOn: "2025-05-03",
      viewedBy: "Jasmine Oscar"
    },
    {
      id: 3,
      companyName: "Amazon",
      viewedOn: "2025-05-05",
      viewedBy: "John Johnson"
    },
  ];

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1 className="profile-title">Companies That Viewed Your Profile</h1>
          <button onClick={onBack} className="btn btn-secondary">
            Back to Profile
          </button>
        </div>

        <div className="profile-sections-container">
          <div className="profile-section">
            <div>
              {profileViews.length === 0 ? (
                <p className="no-results">No companies have viewed your profile yet.</p>
              ) : (
                profileViews.map((view) => (
                  <div key={view.id} className="internship-item">
                    <div className="internship-header">
                      {view.companyName}
                    </div>
                    <p>
                      Viewed by: {view.viewedBy}
                    </p>
                    <div style={{ marginTop: "10px" }}>
                      Date: {view.viewedOn}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileViews;