import { useState } from "react";
import "./InsuranceVisaForm.css";

export default function InsuranceVisaForm({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    destination: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="iv-overlay">
      <div className="iv-modal">
        {/* HEADER */}
        <div className="iv-header">
          <div>
            <h3>Insurance / Visa</h3>
            <span className="iv-date">21–12–2025</span>
          </div>
          <button className="iv-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="iv-body">
          {/* BASIC INFO */}
          <div className="iv-card">
            <h4>Basic Information</h4>

            <div className="iv-grid-2">
              <div className="iv-field">
                <label>Name</label>
                <input name="name" value={form.name} onChange={handleChange} />
              </div>

              <div className="iv-field">
                <label>Destination</label>
                <select
                  name="destination"
                  value={form.destination}
                  onChange={handleChange}
                >
                  <option>Select Destination</option>
                  <option>Kochi</option>
                </select>
              </div>
            </div>
          </div>

          {/* DATE SECTION */}
          <div className="iv-card iv-highlight">
            <h4>Date</h4>

            <div className="iv-field">
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="iv-card">
            <h4>Description</h4>
            <textarea
              rows="6"
              name="description"
              placeholder="Add internal notes..."
              value={form.description}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="iv-footer">
          <button className="iv-btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="iv-btn-primary">Save</button>
        </div>
      </div>
    </div>
  );
}
