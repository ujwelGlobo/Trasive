import { useState } from "react";
import "./AddonsForm.css";

export default function AddonsForm({ onClose }) {
  const [form, setForm] = useState({
    destination: "",
    addon: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="adx-overlay">
      <div className="adx-modal">
        {/* HEADER */}
        <div className="adx-header">
          <div>
            <h3>Addons</h3>
            <span className="adx-date">21–12–2025</span>
          </div>
          <button className="adx-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="adx-body">
          <div className="adx-card">
            <h4>Basic Information</h4>

            <div className="adx-grid">
              <div className="adx-field">
                <label>Destination</label>
                <select name="destination" onChange={handleChange}>
                  <option>Select Destination</option>
                </select>
              </div>

              <div className="adx-field">
                <label>Addons</label>
                <select name="addon" onChange={handleChange}>
                  <option>Select Addon</option>
                </select>
              </div>
            </div>
          </div>

          <div className="adx-card">
            <h4>Description</h4>
            <textarea
              name="description"
              rows="6"
              placeholder="Add internal notes..."
              onChange={handleChange}
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="adx-footer">
          <button className="adx-btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="adx-btn-primary">Save Addon</button>
        </div>
      </div>
    </div>
  );
}
