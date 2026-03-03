import { useState } from "react";
import "./MealForm.css";

export default function MealForm({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    destination: "",
    mealType: "",
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
    <div className="meal-overlay">
      <div className="meal-modal">
        {/* HEADER */}
        <div className="meal-header">
          <div>
            <h3>Meal</h3>
            <span className="meal-date">21–12–2025</span>
          </div>

          <button className="meal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="meal-body">
          {/* BASIC INFO */}
          <div className="meal-card">
            <div className="meal-field full">
              <label>Name</label>
              <input name="name" value={form.name} onChange={handleChange} />
            </div>

            <div className="meal-grid-2">
              <div className="meal-field">
                <label>Destination</label>
                <select
                  name="destination"
                  value={form.destination}
                  onChange={handleChange}
                >
                  <option>Kochi</option>
                </select>
              </div>

              <div className="meal-field">
                <label>Meal Type</label>
                <select
                  name="mealType"
                  value={form.mealType}
                  onChange={handleChange}
                >
                  <option>EP</option>
                  <option>CP</option>
                  <option>MAP</option>
                  <option>AP</option>
                </select>
              </div>
            </div>
          </div>

          {/* DATE SECTION */}
          <div className="meal-card meal-highlight">
            <div className="meal-grid-3">
              <div className="meal-field">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                />
              </div>

              <div className="meal-field">
                <label>Start Time</label>
                <input
                  type="time"
                  name="startTime"
                  value={form.startTime}
                  onChange={handleChange}
                />
              </div>

              <div className="meal-field">
                <label>End Time</label>
                <input
                  type="time"
                  name="endTime"
                  value={form.endTime}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="meal-checkbox">
              <input type="checkbox" />
              <label>Show Time</label>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="meal-card">
            <div className="meal-field">
              <label>Description</label>
              <textarea
                rows="6"
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="meal-footer">
          <button className="meal-btn-secondary" onClick={onClose}>
            Cancel
          </button>

          <button className="meal-btn-primary">Save</button>
        </div>
      </div>
    </div>
  );
}
