import React, { useRef, useState } from 'react';
import './index.css';

const LiveComponent = ({ onBack, workshop }) => {
    const videoRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [showNotes, setShowNotes] = useState(false);
    const [notes, setNotes] = useState('');
    
    const handlePlay = () => videoRef.current.play();
    const handlePause = () => videoRef.current.pause();
    const handleStop = () => {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
    };
    
    const handleTimeUpdate = () => {
        setCurrentTime(videoRef.current.currentTime);
    };
    
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const insertTimestamp = () => {
        const timestamp = `[${formatTime(currentTime)}]: `;
        setNotes(prevNotes => prevNotes + timestamp);
    };

    return (
        <div className="internship-background">
            <div className="video-layout-wrapper">
                <div className="video-control-header">
                    <button
                        className="back-button"
                        onClick={onBack}>
                        ← Back to Workshops
                    </button>
                </div>
                
                <h2 className="video-title" style={{ marginBottom: "20px" }}>
                    Welcome to {workshop?.name} Workshop
                </h2>
                
                <div className="workshop-content-container">
                    <div className="video-section">
                        <h3>Introduction Video</h3>
                        <div className="video-wrapper">
                            <video
                                ref={videoRef}
                                className="workshop-video"
                                controls
                                onTimeUpdate={handleTimeUpdate}
                            >
                                <source src="/GUC.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <div className="video-control-buttons">
                            <button className="btn-primary1" onClick={handlePlay}>▶️ Play</button>
                            <button className="btn-primary1" onClick={handlePause}>⏸ Pause</button>
                            <button className="btn-primary1" onClick={handleStop}>⏹ Stop</button>
                            <button 
                                className="btn-primary1" 
                                onClick={() => setShowNotes(!showNotes)}
                            >
                                {showNotes ? '❌ Hide Notes' : '📝 Show Notes'}
                            </button>
                        </div>
                    </div>

                    {showNotes && (
                        <div className="notes-section">
                            <h4>Notes</h4>
                            <textarea
                                className="notes-textarea"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Type your notes here..."
                            />
                            <div className="notes-actions">
                                <button 
                                    className="btn-primary1"
                                    onClick={insertTimestamp}
                                >
                                    Insert Timestamp 
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="more-content-message">
                    <h2 style={{ fontSize: "28px", color: "white", marginTop: "30px" }}>
                        More Live Workshop Content Coming Soon!
                    </h2>
                    <p style={{ fontSize: "18px", color: "#e0e0e0", marginTop: "15px" }}>
                        We're preparing additional interactive materials for this workshop.
                        Please check back later for updates.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LiveComponent;