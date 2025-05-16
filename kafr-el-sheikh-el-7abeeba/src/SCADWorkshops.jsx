import React, { useState, useEffect } from "react";
import "./index.css";

function SCADWorkshops({
  workshops = [],
  setWorkshops,
  isScad = false,
  isStudent = false,
  onRegister,
  registeredWorkshops = [],
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [dateError, setDateError] = useState(null);

  const initialWorkshopFormState = {
    name: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    description: "",
    speakerBio: "",
    agenda: "",
  };

  const [newWorkshop, setNewWorkshop] = useState(initialWorkshopFormState);

  useEffect(() => {
    if (!isScad) {
      setShowForm(false);
      setEditingId(null);
      setNewWorkshop(initialWorkshopFormState);
    }
  }, [isScad]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorkshop((prev) => ({ ...prev, [name]: value }));

    // Clear date error when dates are changed
    if ((name === "startDate" || name === "endDate") && dateError) {
      setDateError(null);
    }
  };

  const validateDates = () => {
    if (newWorkshop.startDate && newWorkshop.endDate) {
      const startDate = new Date(newWorkshop.startDate);
      const endDate = new Date(newWorkshop.endDate);

      if (endDate < startDate) {
        setDateError("End date cannot be before start date");
        return false;
      }
    }
    setDateError(null);
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isScad || !setWorkshops) {
      return;
    }

    // Validate dates before submission
    if (!validateDates()) {
      return;
    }

    if (editingId) {
      setWorkshops((prev) =>
        prev.map((workshop) =>
          workshop.id === editingId
            ? { ...newWorkshop, id: editingId }
            : workshop
        )
      );
    } else {
      setWorkshops((prev) => [...prev, { ...newWorkshop, id: Date.now() }]);
    }
    setNewWorkshop(initialWorkshopFormState);
    setEditingId(null);
    setShowForm(false);
    setDateError(null);
  };

  const handleEdit = (workshop) => {
    if (!isScad) return;

    setNewWorkshop(workshop);
    setEditingId(workshop.id);
    setSelectedWorkshop(null);
    setShowForm(true);
    setDateError(null);
  };

  const handleDelete = (id) => {
    if (!isScad || !setWorkshops) return;

    setWorkshops((prev) => prev.filter((workshop) => workshop.id !== id));
    if (selectedWorkshop === id) {
      setSelectedWorkshop(null);
    }

    if (editingId === id) {
      setEditingId(null);
      setNewWorkshop(initialWorkshopFormState);
      setShowForm(false);
    }
  };

  const handleToggleForm = () => {
    if (!isScad) return;

    if (showForm && editingId) {
      setEditingId(null);
      setNewWorkshop(initialWorkshopFormState);
    }
    setShowForm(!showForm);
    setDateError(null);
  };

  const handleCardClick = (workshopId) => {
    if (isScad && editingId && editingId !== workshopId && showForm) {
      setEditingId(null);
      setNewWorkshop(initialWorkshopFormState);
      setShowForm(false);
    }
    setSelectedWorkshop(selectedWorkshop === workshopId ? null : workshopId);
  };

  const filteredWorkshops = (workshops || []).filter(
    (workshop) =>
      (workshop.name?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      ) ||
      (workshop.description?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      )
  );

  return (
    <div className="internship-background">
      <div className="listings-container">
        <h1>
          {isScad ? "Manage Online Workshops" : "Available Online Workshops"}
        </h1>

        <div className="filters-container">
          <div className="search-filter-row">
            <input
              type="text"
              placeholder="Search workshops..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {isScad && (
              <button
                className="btn-primary1"
                onClick={handleToggleForm}
                style={{ marginTop: "10px" }}
              >
                {showForm ? "Hide Form" : "Add New Workshop"}
              </button>
            )}
          </div>

          {isScad && showForm && (
            <form
              onSubmit={handleSubmit}
              className="internship-card"
              style={{ marginBottom: "20px", marginTop: "20px" }}
            >
              <h2>{editingId ? "Edit Workshop" : "Add New Workshop"}</h2>

              <div className="detail-item">
                <span className="detail-label">Workshop Name:</span>
                <input
                  type="text"
                  name="name"
                  className="input"
                  style={{ width: "100%" }}
                  value={newWorkshop.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="filter-row">
                <div className="detail-item">
                  <span className="detail-label">Start Date:</span>
                  <input
                    type="date"
                    name="startDate"
                    className="input"
                    style={{ width: "100%" }}
                    value={newWorkshop.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="detail-item">
                  <span className="detail-label">End Date:</span>
                  <input
                    type="date"
                    name="endDate"
                    className="input"
                    style={{ width: "100%" }}
                    value={newWorkshop.endDate}
                    onChange={handleInputChange}
                    required
                    onBlur={validateDates}
                  />
                </div>
              </div>

              {dateError && (
                <div
                  className="error-message"
                  style={{ color: "red", margin: "10px 0" }}
                >
                  {dateError}
                </div>
              )}

              <div className="filter-row">
                <div className="detail-item">
                  <span className="detail-label">Start Time:</span>
                  <input
                    type="time"
                    name="startTime"
                    className="input"
                    style={{ width: "100%" }}
                    value={newWorkshop.startTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="detail-item">
                  <span className="detail-label">End Time:</span>
                  <input
                    type="time"
                    name="endTime"
                    className="input"
                    style={{ width: "100%" }}
                    value={newWorkshop.endTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="detail-item">
                <span className="detail-label">Description:</span>
                <textarea
                  name="description"
                  className="detail-value"
                  style={{ width: "100%", minHeight: "80px" }}
                  value={newWorkshop.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="detail-item">
                <span className="detail-label">Speaker Bio:</span>
                <textarea
                  name="speakerBio"
                  className="detail-value"
                  style={{ width: "100%", minHeight: "80px" }}
                  value={newWorkshop.speakerBio}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="detail-item">
                <span className="detail-label">Agenda:</span>
                <textarea
                  name="agenda"
                  className="detail-value"
                  style={{ width: "100%", minHeight: "80px" }}
                  value={newWorkshop.agenda}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="btn-primary1"
                  disabled={dateError}
                >
                  {editingId ? "Update Workshop" : "Add Workshop"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => {
                      setEditingId(null);
                      setNewWorkshop(initialWorkshopFormState);
                      setShowForm(false);
                      setDateError(null);
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          )}
        </div>

        <div className="internship-list">
          {filteredWorkshops.length === 0 ? (
            <div className="no-results">
              {searchQuery
                ? `No workshops found for "${searchQuery}"`
                : "No workshops currently available"}
            </div>
          ) : (
            filteredWorkshops.map((workshop) => (
              <div
                key={workshop.id}
                className={`internship-card ${
                  selectedWorkshop === workshop.id ? "selected" : ""
                }`}
                onClick={() => handleCardClick(workshop.id)}
              >
                <div>
                  <h2>{workshop.name}</h2>
                  <h3>
                    {new Date(workshop.startDate).toLocaleDateString()} -{" "}
                    {new Date(workshop.endDate).toLocaleDateString()}
                  </h3>
                </div>
                <div className="expand-indicator">
                  {selectedWorkshop === workshop.id ? "▼" : "▶"}
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
                {selectedWorkshop === workshop.id && (
                  <div className="details-grid">
                    <div className="detail-item">
                      <span className="detail-label">Description:</span>
                    </div>
                    <span className="detail-value">{workshop.description}</span>
                    <div className="detail-item">
                      <span className="detail-label">Speaker Bio:</span>
                      <span className="detail-value">
                        {workshop.speakerBio}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Agenda:</span>
                    </div>
                    <span className="detail-value">{workshop.agenda}</span>

                    {isScad && (
                      <div className="detail-actions">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(workshop);
                          }}
                          className="edit-button"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(workshop.id);
                          }}
                          className="delete-button"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                    <div className="detail-actions">
                      {isStudent && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRegister(workshop);
                          }}
                          className="btn-primary1"
                          disabled={registeredWorkshops.includes(workshop.id)}
                        >
                          {registeredWorkshops.includes(workshop.id)
                            ? "Registered ✓"
                            : "Register"}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SCADWorkshops;
