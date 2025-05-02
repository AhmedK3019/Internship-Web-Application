import React from 'react';
import './index.css';

function Listings() {
    const dummyData = [
        {
            id: 1,
            company: "Tech Innovators",
            title: "Frontend Developer",
            duration: "3 months",
            location: "Cairo",
            salary: "5000 EGP/month",
            description: "Work on cutting-edge React applications"
        },
        {
            id: 2,
            company: "Digital Solutions",
            title: "UX Designer",
            duration: "6 months",
            location: "Remote",
            salary: "Unpaid",
            skills: ["Figma", "Adobe XD"],
            description: "Design user interfaces for enterprise applications"
        },
        {
            id: 3,
            company: "Digital Solutions",
            title: "UX Designer",
            duration: "6 months",
            location: "Remote",
            salary: "Unpaid",
            skills: ["Figma", "Adobe XD"],
            description: "Design user interfaces for enterprise applications"
        },
        {
            id: 4,
            company: "Data Analytics Co.",
            title: "Data Analyst Intern",
            duration: "4 months",
            location: "Alexandria",
            salary: "3000 EGP/month",
            skills: ["Python", "SQL"],
            description: "Analyze data and generate reports"
        },
        {
            id: 5,
            company: "Creative Minds",
            title: "Marketing Intern",
            duration: "2 months",
            location: "Cairo",
            salary: "2000 EGP/month",
            skills: ["Social Media", "Content Creation"],
            description: "Assist in marketing campaigns and social media management"
        }
    ];

    return (
        <div className="page">
        <div className="listings-container">
            <h1>Internship Opportunities</h1>
            <div className="internship-list">
                {dummyData.map((internship) => (
                    <div key={internship.id} className="internship-card">
                        <div>
                            <h2>{internship.title}</h2>
                            <h3>{internship.company}</h3>
                        </div>
                        <div className="details-grid">
                            <div className="detail-item">
                                <span className="detail-label">Skills Required:</span>
                                <span className="detail-value">{internship.skills?.join(", ") || "No specific skills required"}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Duration:</span>
                                <span className="detail-value">{internship.duration}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Location:</span>
                                <span className="detail-value">{internship.location}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Compensation:</span>
                                <span className="detail-value">{internship.salary}</span>
                            </div>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Description:</span>
                        </div>
                        <div>
                            <p>{internship.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}

export default Listings;