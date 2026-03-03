import { useState } from "react";
import "./ActivityForm.css";

export default function ActivityForm({ onClose }) {
  const [form, setForm] = useState({
    destination: "",
    type: "",
    name: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* HEADER */}
        <div className="modal-header">
          <h3>Add Activity</h3>
          <button onClick={onClose}>✕</button>
        </div>

        {/* BODY */}
        <div className="modal-body">
          {/* BASIC INFO */}
          <div className="section-card">
            <h4>Basic Information</h4>

            <div className="grid-2">
              <div className="field">
                <label>Destination</label>
                <select name="destination" onChange={handleChange}>
                  <option>Select</option>
                </select>
              </div>

              <div className="field">
                <label>Type</label>
                <select name="type" onChange={handleChange}>
                  <option>Manual</option>
                </select>
              </div>

              <div className="field full">
                <label>Activity Name</label>
                <input name="name" onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* TIME SECTION */}
          <div className="section-card">
            <h4>Schedule</h4>

            <div className="grid-3">
              <div className="field">
                <label>Date</label>
                <input type="date" name="date" onChange={handleChange} />
              </div>

              <div className="field">
                <label>Start Time</label>
                <input type="time" name="startTime" onChange={handleChange} />
              </div>

              <div className="field">
                <label>End Time</label>
                <input type="time" name="endTime" onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="section-card">
            <h4>Description</h4>
            <textarea
              rows="4"
              name="description"
              placeholder="Add internal notes..."
              onChange={handleChange}
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary">Save Activity</button>
        </div>
      </div>
    </div>
  );
}
