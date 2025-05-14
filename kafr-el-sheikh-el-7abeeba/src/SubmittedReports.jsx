import React, { useState } from "react";
import "./index.css";
import { jsPDF } from "jspdf";

function SubmittedReports() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [clarifications, setClarifications] = useState({});
  const [submittedClarifications, setSubmittedClarifications] = useState({});

  const [reports, setReports] = useState([
    {
      id: 1,
      title: "Software Development Internship at Tech Solutions",
      introduction: "During my 3-month internship at Tech Solutions, I worked as a junior software developer on their customer management system. The experience allowed me to apply my theoretical knowledge in a real-world environment.",
      body: "Throughout the internship, I was responsible for implementing new features, fixing bugs, and participating in code reviews. I learned how to work in an Agile environment and improved my skills in React and Node.js.",
      courses: ["Software Engineering", "Database II", "Web Development"],
      status: "submitted",
      submittedDate: "05/14/2024",
      studentName: "John Doe",
      studentEmail: "JohnDoe@gmail.com",
      studentMajor: "MET",
      facultyStatus: "Pending"
    },
    {
      id: 2,
      title: "Data Analysis Internship at Analytics Pro",
      introduction: "My internship at Analytics Pro focused on processing and analyzing large datasets for their marketing clients. I worked with the data science team to identify patterns and trends.",
      body: "My main responsibilities included cleaning data, creating visualizations, and building predictive models. I improved my skills in Python, SQL, and data visualization tools.",
      courses: ["Data Structures", "Database II", "Machine Learning"],
      status: "submitted",
      submittedDate: "05/10/2024",
      studentName: "Jane Smith",
      studentEmail: "JaneSmith@gmail.com",
      studentMajor: "IET",
      facultyStatus: "Accepted"
    },
    {
      id: 3,
      title: "Cloud Engineering Internship at CloudTech",
      introduction: "During my internship at CloudTech, I had the opportunity to work with AWS services and help migrate a legacy application to the cloud.",
      body: "I was involved in setting up infrastructure as code using Terraform, configuring CI/CD pipelines, and optimizing cloud resources for cost and performance.",
      courses: ["Computer Organizations", "Operating Systems", "Software Engineering"],
      status: "submitted",
      submittedDate: "05/08/2024",
      studentName: "Alice Johnson",
      studentEmail: "AliceJohnson@gmail.com",
      studentMajor: "AA",
      facultyStatus: "Flagged"
    },
    {
      id: 4,
      title: "Web Development Internship at Digital Agency",
      introduction: "I worked as a web development intern at Digital Agency, helping to build and maintain client websites and web applications.",
      body: "My tasks included front-end development using HTML, CSS, and JavaScript, as well as back-end work with PHP and MySQL. I gained experience in responsive design and SEO optimization.",
      courses: ["Web Development", "Database II", "User Interface Design"],
      status: "submitted",
      submittedDate: "05/12/2024",
      studentName: "Bob Brown",
      studentEmail: "BobBrown@gmail.com",
      studentMajor: "BI",
      facultyStatus: "Rejected"
    },
    {
      id: 5,
      title: "Cybersecurity Internship at SecureTech",
      introduction: "My internship at SecureTech focused on identifying and addressing security vulnerabilities in their client applications.",
      body: "I conducted security audits, performed penetration testing, and helped implement security best practices. I learned about different types of attacks and defense strategies.",
      courses: ["Network Security", "Operating Systems", "Computer Networks"],
      status: "submitted",
      submittedDate: "05/15/2024",
      studentName: "Charlie Davis",
      studentEmail: "CharlieDavis@gmail.com",
      studentMajor: "EMS",
      facultyStatus: "Pending"
    }
  ]);

  // Available majors for filtering
  const availableMajors = [
    "MET",
    "IET",
    "AA",
    "BI",
    "EMS",
  ];

  // Status options
  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "Pending", label: "Pending" },
    { value: "Flagged", label: "Flagged" },
    { value: "Rejected", label: "Rejected" },
    { value: "Accepted", label: "Accepted" }
  ];

  // Filter reports based on search and filters
  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      report.introduction.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.studentEmail.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesMajor = selectedMajor ? 
      report.studentMajor === selectedMajor : true;
    
    const matchesStatus = selectedStatus ? 
      report.facultyStatus === selectedStatus : true;
    
    return matchesSearch && matchesMajor && matchesStatus;
  });

  const handleStatusChange = (reportId, newStatus) => {
    setReports(prevReports => 
      prevReports.map(report => 
        report.id === reportId 
          ? { ...report, facultyStatus: newStatus } 
          : report
      )
    );
  };

  const openReportModal = (report) => {
    setSelectedReport(report);
  };

  const closeReportModal = () => {
    setSelectedReport(null);
  };

  const downloadReport = (report) => {
    const doc = new jsPDF();
    
    // Set margins
    const margin = 15;
    let y = margin;
    
    // Add title with styling
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(33, 37, 41);
    doc.text(report.title, 105, y, { align: 'center' });
    y += 10;
    
    // Add divider line
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, 200 - margin, y);
    y += 15;
    
    // Add section heading for Introduction
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Introduction", margin, y);
    y += 8;
    
    // Add introduction text
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const introLines = doc.splitTextToSize(report.introduction, 180);
    doc.text(introLines, margin, y);
    y += introLines.length * 7 + 15;
    
    // Add section heading for Report Body
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Report Body", margin, y);
    y += 8;
    
    // Add body text
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const bodyLines = doc.splitTextToSize(report.body, 180);
    doc.text(bodyLines, margin, y);
    y += bodyLines.length * 7 + 15;
    
    // Add section heading for Relevant Courses
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Relevant Courses", margin, y);
    y += 8;
    
    // Add courses list
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(report.courses.join(", "), margin, y);
    
    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Internship Report - Generated by Student Portal", 105, 285, { align: 'center' });
    
    // Save the PDF
    doc.save(`${report.title.replace(/[^a-z0-9]/gi, '_')}.pdf`);
  };

  const handleClarificationSubmit = (reportId, message) => {
    if (!message || !message.trim()) {
      alert("Please enter a clarification message");
      return;
    }
    
   
    setSubmittedClarifications(prev => ({
      ...prev,
      [reportId]: true
    }));
    
  
    setClarifications(prev => ({
      ...prev,
      [reportId]: ""
    }));
  };

  return (
    <div className="internship-background">
      <div className="listings-container">
        <h1>Submitted Internship Reports</h1>
        
        <div className="filters-container">
          <div className="search-filter-row">
            <input
              type="text"
              placeholder="Search reports by title, content, or student..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-row">
            <div className="filter-group">
              <label>Filter by Major:</label>
              <select 
                className="filter-select"
                value={selectedMajor}
                onChange={(e) => setSelectedMajor(e.target.value)}
              >
                <option value="">All Majors</option>
                {availableMajors.map(major => (
                  <option key={major} value={major}>{major}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Filter by Status:</label>
              <select 
                className="filter-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="internship-list">
          {filteredReports.length === 0 ? (
            <div className="no-results">
              {searchQuery || selectedMajor || selectedStatus 
                ? "No reports match your filters"
                : "No submitted reports yet"}
            </div>
          ) : (
            filteredReports.map(report => (
              <div key={report.id} className="internship-card">
                <div>
                  <h2>{report.title}</h2>
                  <h3>Submitted by: {report.studentName} ({report.studentEmail})</h3>
                  <h4>Major: {report.studentMajor}</h4>
                  <h4>Submitted on: {report.submittedDate}</h4>
                </div>
                
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Current Status:</span>
                    <span className="detail-value">
                      {report.facultyStatus}
                    </span>
                  </div>
                  
                  <div className="detail-actions">
                    <select
                      className="custom-select"
                      value={report.facultyStatus}
                      onChange={(e) => handleStatusChange(report.id, e.target.value)}
                    >
                      {statusOptions.filter(opt => opt.value !== "").map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    
                    <button 
                      className="btn-primary1"
                      onClick={() => openReportModal(report)}
                    >
                      View Report
                    </button>
                    <button 
                      className="download-button"
                      style={{border:"2px green solid"}}
                      onClick={() => downloadReport(report)}
                    >
                      Download PDF
                    </button>
                  </div>
                </div>

                {["Rejected", "Flagged"].includes(report.facultyStatus) && (
                  <div className="clarification-section">
                    {submittedClarifications[report.id] ? (
                      <div className="clarification-success">
                        <div className="success-message">✓ Submitted Successfully</div>
                        <button 
                          className="green-btn"
                          disabled
                          style={{cursor:"not-allowed", opacity:"0.5"}}
                        >
                          Submitted
                        </button>
                      </div>
                    ) : (
                      <>
                        <textarea
                          rows="3"
                          placeholder="Submit a clarification..."
                          className="search-input"
                          style={{ width: "100%", marginBottom: "5px" }}
                          value={clarifications[report.id] || ""}
                          onChange={(e) =>
                            setClarifications((prev) => ({
                              ...prev,
                              [report.id]: e.target.value,
                            }))
                          }
                        />
                        <button
                          className="btn-primary1"
                          onClick={() =>
                            handleClarificationSubmit(
                              report.id,
                              clarifications[report.id]
                            )
                          }
                        >
                          Submit Clarification
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {selectedReport && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header" style={{marginBottom:"0px"}}>
              <h2>{selectedReport.title}</h2>
              <button className="close-button" onClick={closeReportModal}>×</button>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Student:</span>
              <span className="detail-value">{selectedReport.studentName}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{selectedReport.studentEmail}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Relevant Courses:</span>
              <span className="detail-value">{selectedReport.courses.join(", ")}</span>
            </div>
            
            <div className="form-group">
              <label>Introduction</label>
              <textarea 
                className="input"
                value={selectedReport.introduction}
                readOnly
                rows="6"
              />
            </div>
            
            <div className="form-group">
              <label>Report Body</label>
              <textarea 
                className="input"
                value={selectedReport.body}
                readOnly
                rows="6"
              />
            </div>
            
            <div className="form-actions">
              <button 
                className="download-button"
                style={{border:"2px green solid"}}
                onClick={() => downloadReport(selectedReport)}
              >
                Download PDF
              </button>
              <button 
                className="delete-btn"
                onClick={closeReportModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubmittedReports;