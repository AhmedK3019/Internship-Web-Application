import React, { useRef, useState } from "react";
import "./index.css";

const PreRecordedComponent = ({ onBack, workshop, onFinish }) => {
    const videoRef = useRef(null);
    const [notes, setNotes] = useState("");
    const [currentTime, setCurrentTime] = useState(0);
    const [showNotes, setShowNotes] = useState(false);

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

    const handleFinishWorkshop = () => {
        // Call onFinish with the workshop ID
        onFinish(workshop.id);
    };

    return (
        <div className="internship-background">
            <div className="video-layout-wrapper">
                <div className="video-control-header">
                    <button className="back-button" onClick={onBack}>
                        ← Back to Workshops
                    </button>
                </div>

                <h2 className="video-title" style={{ marginBottom: "20px" }}>
                    Welcome to {workshop?.name} WorkShop
                </h2>

                <div className="workshop-content-container">
                    <div className="video-section">
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

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button
                        className="btn-primary1"
                        onClick={handleFinishWorkshop}
                    >
                        Finish Workshop
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PreRecordedComponent;