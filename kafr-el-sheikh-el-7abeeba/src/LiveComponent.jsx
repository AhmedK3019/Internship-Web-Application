import React, { useRef, useState } from 'react';
import './index.css';

const LiveComponent = ({ user, onBack, workshop }) => {
    const videoRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [showNotes, setShowNotes] = useState(false);
    const [notes, setNotes] = useState('');
    const [showChat, setShowChat] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

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

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            const message = {
                id: Date.now(),
                user: user.name,
                isCurrentUser: true,
                text: newMessage,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages([...messages, message]);
            setNewMessage('');

            if (Math.random() > 0.1) {
                setTimeout(() => {
                    const attendeeNames = [
                        "Alex Johnson",
                        "Sam Wilson",
                        "Taylor Smith",
                        "Jordan Lee",
                        "Casey Kim",
                        "Morgan Taylor",
                        "Riley Chen"
                    ];
                    const responses = [
                        "That's a great point!",
                        "I agree with that",
                        "Could you elaborate?",
                        "Thanks for sharing!",
                        "Interesting perspective",
                        "What does everyone think?",
                        "I had a similar experience",
                        "That's helpful, thanks!",
                        "The presenter mentioned this earlier too"
                    ];
                    const response = {
                        id: Date.now(),
                        user: attendeeNames[Math.floor(Math.random() * attendeeNames.length)],
                        isCurrentUser: false,
                        text: responses[Math.floor(Math.random() * responses.length)],
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    };
                    setMessages(prev => [...prev, response]);
                }, 1000 + Math.random() * 2000);
            }
        }
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
                    Welcome to {workshop?.name} Workshop
                </h2>

                <div className="workshop-content-container">
                    <div className="video-section">
                        <h3>Live Workshop</h3>
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
                            <button
                                className="btn-primary1"
                                onClick={() => setShowChat(!showChat)}
                            >
                                {showChat ? '❌ Hide Chat' : '💬 Live Chat'}
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

                    {showChat && (
                        <div className="chat-section">
                            <h4>Live Chat</h4>
                            <div className="chat-messages">
                                {messages.length === 0 ? (
                                    <div className="no-messages">No messages yet. Start the conversation!</div>
                                ) : (
                                    messages.map(message => (
                                        <div key={message.id} className={`message ${message.isCurrentUser ? 'current-user' : ''}`}>
                                            <div className="message-header">
                                                <span className="message-user">
                                                    {message.isCurrentUser ? 'You' : message.user}
                                                </span>
                                                <span className="message-time">{message.timestamp}</span>
                                            </div>
                                            <div className="message-content">
                                                {message.text}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                            <form onSubmit={handleSendMessage} className="chat-form">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    className="chat-input"
                                />
                                <button type="submit" className="btn-primary1 chat-send">
                                    Send
                                </button>
                            </form>
                        </div>
                    )}
                </div>

                <div className="more-content-message">
                    <h2 style={{ fontSize: "28px", color: "white", marginTop: "30px" }}>
                        Live Workshop in Progress
                    </h2>
                    <p style={{ fontSize: "18px", color: "#e0e0e0", marginTop: "15px" }}>
                        Engage with the presenter and other attendees using the live chat.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LiveComponent;