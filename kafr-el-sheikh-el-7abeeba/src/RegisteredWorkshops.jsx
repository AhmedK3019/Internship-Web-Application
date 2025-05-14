import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "./index.css";
import LiveComponent from "./LiveComponent";
import PreRecordedComponent from "./PreRecordedComponent";

function RegisteredWorkshops({ user, workshops = [], registeredWorkshops = [], onAttendeeChatMessage }) {
    const [selectedWorkshop, setSelectedWorkshop] = useState(null);
    const [showEmpty, setShowEmpty] = useState(false);
    const [showPreRecorded, setShowPreRecorded] = useState(false);
    const [showCertificate, setShowCertificate] = useState(false);
    const [showEvaluationModal, setShowEvaluationModal] = useState(false);
    const [currentWorkshop, setCurrentWorkshop] = useState(null);
    const [finishedWorkshops, setFinishedWorkshops] = useState([]);
    const [evaluations, setEvaluations] = useState([]);

    const registeredWorkshopsData = workshops.filter(w => registeredWorkshops.includes(w.id));

    // ←–– UPDATED: uses html2canvas to snapshot the styled DOM
    const handleDownloadCertificate = async () => {
        if (!currentWorkshop) return;

        // grab the certificate element
        const element = document.querySelector(".certificate-content");

        // hide all buttons inside the certificate before capture
        const buttons = element.querySelectorAll("button");
        buttons.forEach(btn => btn.style.visibility = "hidden");

        // snapshot the styled DOM (at higher res)
        const canvas = await html2canvas(element, { scale: 2, backgroundColor: null });
        const imgData = canvas.toDataURL("image/png");

        // restore button visibility
        buttons.forEach(btn => btn.style.visibility = "");

        // build the PDF
        const pdf = new jsPDF({ unit: "pt", format: "a4", orientation: "portrait" });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`certificate_${currentWorkshop.name}.pdf`);
    };

    const handleSelectWorkshop = id => {
        setSelectedWorkshop(selectedWorkshop === id ? null : id);
    };
    const handleWatchPreRecorded = w => { setCurrentWorkshop(w); setShowPreRecorded(true); };
    const handleJoinLive = w => { setCurrentWorkshop(w); setShowEmpty(true); };
    const handleBack = () => { setShowEmpty(false); setShowPreRecorded(false); setShowCertificate(false); };
    const handleWorkshopFinished = id => {
        const w = workshops.find(x => x.id === id);
        setCurrentWorkshop(w);
        if (!finishedWorkshops.includes(id)) {
            setFinishedWorkshops([...finishedWorkshops, id]);
        }
        setShowPreRecorded(false);
    };
    const handleViewCertificate = w => { setCurrentWorkshop(w); setShowCertificate(true); };
    const handleCloseCertificate = () => { setShowCertificate(false); };
    const handleRateWorkshop = w => {
        const existing = evaluations.find(e => e.workshopId === w.id);
        setCurrentWorkshop({
            ...w,
            existingRating: existing?.rating,
            existingFeedback: existing?.feedback
        });
        setShowEvaluationModal(true);
    };
    const handleCloseEvaluationModal = () => setShowEvaluationModal(false);
    const handleSubmitEvaluation = evalData => {
        setEvaluations(evals => [
            ...evals.filter(e => e.workshopId !== currentWorkshop.id),
            { ...evalData, workshopId: currentWorkshop.id, date: new Date().toISOString() }
        ]);
        setShowEvaluationModal(false);
    };

    const renderCertificateModal = () => {
        if (!showCertificate || !currentWorkshop) return null;
        return (
            <div className="modal-overlay" onClick={handleCloseCertificate}>
                <div className="certificate-modal" onClick={e => e.stopPropagation()}>
                    <div className="certificate-content">
                        <h1>Certificate of Completion</h1>
                        <p>This is to certify that</p>
                        <h2>{user.name}</h2>
                        <p>has successfully completed the workshop</p>
                        <h3>{currentWorkshop.name}</h3>
                        <div className="certificate-footer">
                            <p>Supervisor: {currentWorkshop.speakerBio}</p>
                            <p>Date: {new Date().toLocaleDateString()}</p>
                        </div>
                        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                            <button className="green-btn" onClick={handleDownloadCertificate}>
                                Download PDF
                            </button>
                            <button
                                className="delete-btn"
                                onClick={handleCloseCertificate}
                                style={{ border: "red 2px solid" }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderEvaluationModal = () => {
        if (!showEvaluationModal || !currentWorkshop) return null;
        return (
            <EvaluationModal
                workshop={currentWorkshop}
                onSubmit={handleSubmitEvaluation}
                onClose={handleCloseEvaluationModal}
            />
        );
    };


    if (showPreRecorded && currentWorkshop) {
        return (
            <div className="internship-background">
                {renderCertificateModal()}
                {renderEvaluationModal()}
                <PreRecordedComponent
                    onBack={handleBack}
                    workshop={currentWorkshop}
                    onFinish={handleWorkshopFinished}
                />
            </div>
        );
    }

    if (showEmpty && currentWorkshop) {
        return (
            <div className="internship-background">
                <LiveComponent
                    user={user}
                    onBack={handleBack}
                    workshop={currentWorkshop}
                    onAttendeeChatMessage={onAttendeeChatMessage}
                />
            </div>
        );
    }

    return (
        <div className="internship-background">
            {renderCertificateModal()}
            {renderEvaluationModal()}

            <div className="listings-container">
                <h1>My Registered Workshops</h1>
                <div className="internship-list">
                    {registeredWorkshopsData.length === 0 ? (
                        <div className="no-results">
                            You haven't registered for any workshops yet.
                        </div>
                    ) : (
                        registeredWorkshopsData.map(workshop => {
                            const now = new Date();
                            const startDate = new Date(workshop.startDate);
                            const endDate = new Date(workshop.endDate);
                            const hasEval = evaluations.some(e => e.workshopId === workshop.id);
                            const isSel = selectedWorkshop === workshop.id;

                            return (
                                <div
                                    key={workshop.id}
                                    className={`internship-card ${isSel ? "selected" : ""}`}
                                    onClick={() => handleSelectWorkshop(workshop.id)}
                                >
                                    <div>
                                        {now < startDate && <h2>{workshop.name} (Available After Start date)</h2>}
                                        {now >= startDate && now <= endDate && <h2>{workshop.name} (Live)</h2>}
                                        {now > endDate && <h2>{workshop.name} (Pre-Recorded)</h2>}
                                        <h3>
                                            {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                                        </h3>
                                    </div>
                                    <div className="expand-indicator">{isSel ? "▼" : "▶"}</div>

                                    <div
                                        style={{
                                            borderBottom: "1px solid rgba(126, 200, 227, 0.2)",
                                            padding: "0.5rem 0"
                                        }}
                                    >
                                        <span
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                fontWeight: "normal"
                                            }}
                                        >
                                            <span className="detail-label">Time:</span>
                                            <span className="detail-value">
                                                {workshop.startTime} - {workshop.endTime}
                                            </span>
                                        </span>
                                    </div>

                                    {isSel && (
                                        <div className="details-grid">
                                            <div className="detail-item">
                                                <span className="detail-label">Description:</span>
                                                <span className="detail-value">{workshop.description}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">Speaker Bios:</span>
                                                <span className="detail-value">{workshop.speakerBio}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">Agenda:</span>
                                                <span className="detail-value">
                                                    {workshop.agenda ||
                                                        "Detailed agenda will be provided during the workshop"}
                                                </span>
                                            </div>
                                            <div className="detail-actions">
                                                {now < startDate && (
                                                    <button className="btn-primary1" style={{ cursor: "not-allowed", opacity: 0.5 }}>
                                                        Available Soon
                                                    </button>
                                                )}
                                                {now >= startDate && now <= endDate && (
                                                    <button
                                                        className="btn-primary1"
                                                        onClick={e => {
                                                            e.stopPropagation();
                                                            handleJoinLive(workshop);
                                                        }}
                                                    >
                                                        Join
                                                    </button>
                                                )}
                                                {now > endDate && (
                                                    <button
                                                        className="btn-primary1"
                                                        onClick={e => {
                                                            e.stopPropagation();
                                                            handleWatchPreRecorded(workshop);
                                                        }}
                                                    >
                                                        Join
                                                    </button>
                                                )}
                                                {finishedWorkshops.includes(workshop.id) && (
                                                    <>
                                                        <button
                                                            className="btn-primary1"
                                                            onClick={e => {
                                                                e.stopPropagation();
                                                                handleViewCertificate(workshop);
                                                            }}
                                                        >
                                                            View Certificate
                                                        </button>
                                                        <button
                                                            className="btn-primary1"
                                                            onClick={e => {
                                                                e.stopPropagation();
                                                                handleRateWorkshop(workshop);
                                                            }}
                                                        >
                                                            {hasEval ? "Edit Rating" : "Rate Workshop"}
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}

const EvaluationModal = ({ workshop, onSubmit, onClose }) => {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");

    useEffect(() => {
        if (workshop.existingRating) {
            setRating(workshop.existingRating);
            setFeedback(workshop.existingFeedback || "");
        }
    }, [workshop]);

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit({ rating, feedback, workshopName: workshop.name });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>
                        {workshop.existingRating ? "Edit Rating for" : "Rate"} {workshop.name}
                    </h2>
                    <button onClick={onClose} className="close-button">
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="evaluation-details">
                        <div className="detail-item">
                            <span className="detail-label">Rating:</span>
                            <div className="rating-stars">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <span
                                        key={star}
                                        className={`star ${star <= rating ? "filled" : ""}`}
                                        onClick={() => setRating(star)}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Feedback:</span>
                            <textarea
                                className="feedback-input"
                                value={feedback}
                                onChange={e => setFeedback(e.target.value)}
                                placeholder="Share your experience..."
                            />
                        </div>
                        <div className="form-actions">
                            <button
                                type="button"
                                onClick={onClose}
                                className="btn-primary1"
                                style={{
                                    border: "2px solid red",
                                    backgroundColor: "red"
                                }}
                                onMouseEnter={e => (e.target.style.backgroundColor = "transparent")}
                                onMouseLeave={e => (e.target.style.backgroundColor = "red")}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn-primary1"
                                style={{
                                    cursor: rating === 0 || feedback.trim() === "" ? "not-allowed" : "pointer",
                                    opacity: rating === 0 || feedback.trim() === "" ? 0.5 : 1
                                }}
                                disabled={rating === 0 || feedback.trim() === ""}
                            >
                                Submit Rating
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisteredWorkshops;
