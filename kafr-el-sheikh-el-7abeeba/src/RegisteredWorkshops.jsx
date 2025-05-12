import React, { useState } from "react";
import "./index.css";
import LiveComponent from "./LiveComponent";
import PreRecordedComponent from "./PreRecordedComponent";

function RegisteredWorkshops({ workshops = [], registeredWorkshops = [] }) {
    const [showEmpty, setShowEmpty] = useState(false);
    const [showPreRecorded, setShowPreRecorded] = useState(false);
    const [currentWorkshop, setCurrentWorkshop] = useState(null);

    const registeredWorkshopsData = workshops.filter((workshop) =>
        registeredWorkshops.includes(workshop.id)
    );

    const handleWatchPreRecorded = (workshop) => {
        setCurrentWorkshop(workshop);  
        setShowPreRecorded(true);
    };

    const handleJoinLive = (workshop) => {
        setCurrentWorkshop(workshop);
        setShowEmpty(true);
    };

    const handleBack = () => {
        setShowEmpty(false);
        setShowPreRecorded(false);
    };

    if (showPreRecorded) {
        return (
            
                <PreRecordedComponent 
                    onBack={handleBack} 
                    workshop={currentWorkshop}
                />
            
        );
    }

    if (showEmpty) {
        return (
            <div className="internship-background">
                <LiveComponent onBack={handleBack} workshop={currentWorkshop} />
            </div>
        );
    }

    return (
        <div className="internship-background">
            <div className="listings-container">
                <h1>My Registered Workshops</h1>
                <div className="internship-list">
                    {registeredWorkshopsData.length === 0 ? (
                        <div className="no-results">
                            You haven't registered for any workshops yet.
                        </div>
                    ) : (
                        registeredWorkshopsData.map((workshop) => {
                            const now = new Date();
                            const startDate = new Date(workshop.startDate);
                            const endDate = new Date(workshop.endDate);

                            return (
                                <div key={workshop.id} className="internship-card">
                                    <div>
                                        {now < startDate && (
                                            <h2>{workshop.name} (Available After Start date) </h2>
                                        )}
                                        {now >= startDate && now <= endDate && (
                                            <h2>{workshop.name} (Live) </h2>
                                        )}
                                        {now >= endDate && (
                                            <h2>{workshop.name} (Pre-Recorded) </h2>
                                        )}
                                        <h3>
                                            {startDate.toLocaleDateString()} -{" "}
                                            {endDate.toLocaleDateString()}
                                        </h3>
                                    </div>
                                    <div
                                        style={{
                                            borderBottom: "1px solid rgba(126, 200, 227, 0.2)",
                                            padding: "0.5rem 0",
                                        }}
                                    >
                                        <span
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                fontWeight: "normal",
                                            }}
                                        >
                                            <span className="detail-label">Time:</span>
                                            <span className="detail-value">
                                                {workshop.startTime} - {workshop.endTime}
                                            </span>
                                        </span>
                                    </div>
                                    <div className="details-grid">
                                        <div className="detail-item">
                                            <span className="detail-label">Description:</span>
                                            <span className="detail-value">{workshop.description}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Speaker Bios:</span>
                                            <span className="detail-value">{workshop.speakerBio}</span>
                                        </div>
                                        <div className="detail-actions">
                                            {now < startDate && (
                                                <button
                                                    className="btn-primary1"
                                                    style={{ cursor: "not-allowed", opacity: 0.5 }}
                                                >
                                                    Available Soon
                                                </button>
                                            )}
                                            {now >= startDate && now <= endDate && (
                                                <button className="btn-primary1"  onClick={() => handleJoinLive(workshop)}>
                                                    Join
                                                </button>
                                            )}
                                            {now >= endDate && (
                                                <button className="btn-primary1" onClick={() => handleWatchPreRecorded(workshop)}>
                                                    Join
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}

export default RegisteredWorkshops;