import React, { useState } from "react";
import "./index.css";
import CompanyInternships from "./CompanyInternships";
import Listings from "./Listings";
import CompanyAllApplications from "./CompanyAllApplications";

function Company({ email }) {
  const [view, setView] = useState("");
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "JohnDoe@gmail.com",
      phone: "1234567890",
      internship: "Software Engineer Intern",
      status: "Pending",
      internProgress: "Not Started",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "JaneSmith@gmail.com",
      phone: "0987654321",
      internship: "Data Analyst Intern",
      status: "Pending",
      internProgress: "Not Started",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "AliceJohnson@gmail.com",
      phone: "1122334455",
      internship: "Web Developer Intern",
      status: "Pending",
      internProgress: "Not Started",
    },
    {
      id: 4,
      name: "Bob Brown",
      email: "BobBrown@gmail.com",
      phone: "5566778899",
      internship: "UX/UI Designer Intern",
      status: "Pending",
      internProgress: "Not Started",
    },
    {
      id: 5,
      name: "Charlie Davis",
      email: "CharlieDavis@gmail.com",
      phone: "9988776655",
      internship: "Software Engineer Intern",
      status: "Pending",
      internProgress: "Not Started",
    },
  ]);

  function handleStatusChange(appId, newStatus) {
    setApplications(
      applications.map((app) => {
        if (app.id === appId) {
          return { ...app, status: newStatus };
        }
        return app;
      })
    );
  }

  function handleInternProgressChange(appId, newProgress) {
    setApplications(
      applications.map((app) => {
        if (app.id === appId) {
          return { ...app, internProgress: newProgress };
        }
        return app;
      })
    );
  }

  return (
    <div className="page">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="menu-wrapper">
            <span className="menu-icon">☰</span>
            <span className="menu-label">Company Menu</span>
          </div>
        </div>
        <div className="sidebar-buttons">
          <button onClick={() => setView("internships")}>
            View my internships
          </button>
          <button onClick={() => setView("listings")}>
            View all internships
          </button>
          <button onClick={() => setView("applications")}>
            View all applications
          </button>
        </div>
      </div>
      <div className="main-content">
        {view === "internships" && (
          <CompanyInternships
            internships={internships}
            setInternships={setInternships}
          />
        )}
        {view === "listings" && <Listings />}
        {view === "applications" && (
          <CompanyAllApplications
            applications={applications}
            handleStatusChange={handleStatusChange}
            handleInternProgressChange={handleInternProgressChange}
          />
        )}
      </div>
    </div>
  );
}

export default Company;
