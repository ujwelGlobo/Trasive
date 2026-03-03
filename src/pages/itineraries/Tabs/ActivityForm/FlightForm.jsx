import { useState } from "react";
import "./FlightForm.css";

export default function FlightForm({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    flightNo: "",
    from: "",
    to: "",
    duration: "",
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
    <div className="flight-overlay">
      <div className="flight-modal">
        {/* HEADER */}
        <div className="flight-header">
          <div>
            <h3>Flight</h3>
            <span className="flight-date">21–12–2025</span>
          </div>

          <button className="flight-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="flight-body">
          {/* BASIC INFO */}
          <div className="flight-card">
            <h4>Flight Details</h4>

            <div className="flight-grid-2">
              <div className="flight-field">
                <label>Name</label>
                <select name="name" value={form.name} onChange={handleChange}>
                  <option>Select</option>
                </select>
              </div>

              <div className="flight-field">
                <label>Flight No.</label>
                <input
                  name="flightNo"
                  value={form.flightNo}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flight-grid-3">
              <div className="flight-field">
                <label>From Destination</label>
                <input name="from" value={form.from} onChange={handleChange} />
              </div>

              <div className="flight-field">
                <label>To Destination</label>
                <input name="to" value={form.to} onChange={handleChange} />
              </div>

              <div className="flight-field">
                <label>Flight Duration</label>
                <input
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* DATE SECTION */}
          <div className="flight-card flight-highlight">
            <h4>Schedule</h4>

            <div className="flight-grid-3">
              <div className="flight-field">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                />
              </div>

              <div className="flight-field">
                <label>Start Time</label>
                <input
                  type="time"
                  name="startTime"
                  value={form.startTime}
                  onChange={handleChange}
                />
              </div>

              <div className="flight-field">
                <label>End Time</label>
                <input
                  type="time"
                  name="endTime"
                  value={form.endTime}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="flight-card">
            <h4>Description</h4>

            <textarea
              rows="5"
              name="description"
              placeholder="Add internal notes..."
              value={form.description}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="flight-footer">
          <button className="flight-btn-secondary" onClick={onClose}>
            Cancel
          </button>

          <button className="flight-btn-primary">Save</button>
        </div>
      </div>
    </div>
  );
}
