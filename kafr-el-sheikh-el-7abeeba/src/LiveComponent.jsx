import React from 'react';
import './index.css';

const LiveComponent = ({ onBack, workshop }) => {
    return (
        <div className="empty-live-component">
            <button
                className="back-button"
                onClick={onBack}>
                ← Back to Workshops
            </button>
            <div className="centered-container">
                <h2 style={{ fontSize: "40px", color: "white" }}>Nothing Available yet</h2>
            </div>
        </div>
    );
};

export default LiveComponent;