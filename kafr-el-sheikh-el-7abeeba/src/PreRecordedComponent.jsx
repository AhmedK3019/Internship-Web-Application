import React, { useRef } from "react";
import "./index.css"; // Your CSS file

const PreRecordedComponent = ({ onBack, workshop }) => {
  const videoRef = useRef(null);
  
  const handlePlay = () => videoRef.current.play();
  const handlePause = () => videoRef.current.pause();
  const handleStop = () => {
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <div className="internship-background">
    
          <div className="video-control-header">
            <button className="back-button" onClick={onBack}>
              ← Back to Workshops
            </button>
          </div>
      <div className="video-layout-wrapper"> 
        <h2 className="video-title" style={{marginBottom:"20px"}}>{workshop?.name || 'Workshop Video'}</h2>
        <div className="pre-recorded-container">

            <h3 className="video-subtitle">Workshop Video</h3>  
          <div className="video-wrapper">
            <video
              ref={videoRef}
              className="workshop-video"
              controls
            >
              <source src="/GUC.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="video-control-buttons">
            <button className="btn-primary1" onClick={handlePlay}>▶️ Play</button>
            <button className="btn-primary1" onClick={handlePause}>⏸ Pause</button>
            <button className="btn-primary1" onClick={handleStop}>⏹ Stop</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreRecordedComponent;