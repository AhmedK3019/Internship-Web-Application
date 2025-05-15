import React, { useState, useEffect, useRef } from "react";
import "./index.css";

function PROStudentFutureAppointments({
  futureAppointments,
  setFutureAppointments,
  setSCADNotifications,
  setView,
}) {
  const [message, setMessage] = useState("");
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const videoRef = useRef(null);
  const screenShareRef = useRef(null);

  function handleCancel(appointment) {
    const updatedAppointment = {
      ...appointment,
      status: "cancelled",
    };
    setFutureAppointments((prevApp) =>
      prevApp.filter((app) => app.id !== appointment.id)
    );
    setMessage("Appointment cancelled successfully.");
  }

  useEffect(() => {
    if (isCallActive && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play(); // Ensure the video starts playing
          };
        })
        .catch((err) => {
          setMessage("Error accessing camera/microphone: " + err.message);
          console.error("Error accessing camera/microphone:", err);
        });
    }
  }, [isCallActive]);

  useEffect(() => {
    console.log("videoRef.current:", videoRef.current);
  }, []);

  async function handleJoin(appointment) {
    setIsCallActive(true);
    setFutureAppointments((prevApp) =>
      prevApp.filter((app) => app.id !== appointment.id)
    );
    setSCADNotifications((prev) => [
      ...prev,
      {
        id: Date.now(),
        message: `PRO Student has joined the call.`,
        isRead: false,
      },
    ]);
    setMessage("You have joined the call.");
  }

  async function toggleMute() {
    try {
      const stream = videoRef.current.srcObject;
      const audioTrack = stream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMuted((prev) => !prev);
    } catch (err) {
      setMessage("Error toggling audio: " + err.message);
    }
  }

  async function toggleVideo() {
    try {
      const stream = videoRef.current.srcObject;
      const videoTrack = stream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoOn((prev) => !prev);
    } catch (err) {
      setMessage("Error toggling video: " + err.message);
    }
  }

  async function toggleScreenShare() {
    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        screenShareRef.current.srcObject = screenStream;
        setIsScreenSharing(true);
      } else {
        const tracks = screenShareRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        screenShareRef.current.srcObject = null;
        setIsScreenSharing(false);
      }
    } catch (err) {
      setMessage("Error sharing screen: " + err.message);
    }
  }

  function endCall() {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    if (screenShareRef.current?.srcObject) {
      screenShareRef.current.srcObject
        .getTracks()
        .forEach((track) => track.stop());
    }
    setSCADNotifications((prev) => [
      ...prev,
      {
        id: Date.now(),
        message: `PRO Student left the call.`,
        isRead: false,
      },
    ]);
    setIsCallActive(false);
    setIsScreenSharing(false);
    setMessage("Call ended");
  }

  return (
    <div className="listings-container">
      <div
        className="sidebar"
        style={{ marginLeft: "220px", top: "10px", gap: "20px" }}
      >
        <button
        className="btn-primary1"
          type="button"
          onClick={() => {
            setView("videocall");
          }}
        >
          Back to Scheduling
        </button>
        <button
          className="btn-primary1"
          type="button"
          onClick={() => {
            setView("requestedAppointments");
          }}
        >
          Back to Requested
        </button>
      </div>
      <div className="internship-list">
        <h1>Future Appointments</h1>
        {futureAppointments.length === 0 ? (
          <div className="no-results">No future appointments</div>
        ) : (
          futureAppointments.map((appointment, index) => (
            <div key={index} className="internship-card">
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">{appointment.date}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Time:</span>
                  <span className="detail-value">{appointment.time}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status:</span>
                  <span className="detail-value">{appointment.status}</span>
                </div>
              </div>
              <div className="detail-actions">
                <button
                  onClick={() => handleCancel(appointment)}
                  className="delete-btn"
                >
                  Cancel Appointment
                </button>
                <button
                  onClick={() => handleJoin(appointment)}
                  className="accept-btn"
                >
                  Join call
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {isCallActive && (
        <div className="video-call-container">
          <div className="video-grid">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{ transform: "scaleX(-1)" }}
              className="video-stream"
            />
            {isScreenSharing && (
              <video
                ref={screenShareRef}
                autoPlay
                playsInline
                className="screen-share"
              />
            )}
          </div>
          <div className="call-controls">
            <button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button>
            <button onClick={toggleVideo}>
              {isVideoOn ? "Turn Off Camera" : "Turn On Camera"}
            </button>
            <button onClick={toggleScreenShare}>
              {isScreenSharing ? "Stop Sharing" : "Share Screen"}
            </button>
            <button onClick={endCall} className="end-call">
              End Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PROStudentFutureAppointments;
