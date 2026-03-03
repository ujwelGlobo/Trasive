import { useState } from "react";
import "./CruiseForm.css";

export default function CruiseForm({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    destination: "",
    date: "",
    startTime: "",
    endTime: "",
    showTime: false,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="cruise-overlay">
      <div className="cruise-modal">
        {/* HEADER */}
        <div className="cruise-header">
          <h3>Cruise – 21–12–2025</h3>
          <button className="cruise-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="cruise-body">
          {/* BASIC INFO */}
          <div className="cruise-card">
            <div className="cruise-grid-2">
              <div className="cruise-field">
                <label>Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Cruise Name"
                />
              </div>

              <div className="cruise-field">
                <label>Destination</label>
                <select
                  name="destination"
                  value={form.destination}
                  onChange={handleChange}
                >
                  <option>Kochi</option>
                  <option>Alleppey</option>
                  <option>Goa</option>
                </select>
              </div>
            </div>
          </div>

          {/* DATE & TIME */}
          <div className="cruise-card cruise-highlight">
            <div className="cruise-grid-3">
              <div className="cruise-field">
                <label>Date *</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                />
              </div>

              <div className="cruise-field">
                <label>Start Time</label>
                <input
                  type="time"
                  name="startTime"
                  value={form.startTime}
                  onChange={handleChange}
                />
              </div>

              <div className="cruise-field">
                <label>End Time</label>
                <input
                  type="time"
                  name="endTime"
                  value={form.endTime}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="cruise-checkbox">
              <input
                type="checkbox"
                name="showTime"
                checked={form.showTime}
                onChange={handleChange}
              />
              <span>Show Time</span>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="cruise-card">
            <label className="cruise-desc-label">Description</label>
            <textarea
              rows="5"
              name="description"
              placeholder="Add cruise details..."
              value={form.description}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="cruise-footer">
          <button className="cruise-btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="cruise-btn-primary">Save</button>
        </div>
      </div>
    </div>
  );
}
