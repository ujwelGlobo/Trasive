import { useState } from "react";
import "./LeisureForm.css";

export default function LeisureForm({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    destination: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="leisure-overlay">
      <div className="leisure-modal">
        {/* HEADER */}
        <div className="leisure-header">
          <div>
            <h3>Leisure</h3>
            <span className="leisure-sub">21–12–2025</span>
          </div>

          <button className="leisure-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="leisure-body">
          {/* BASIC INFO */}
          <div className="leisure-card">
            <h4>Basic Information</h4>

            <div className="leisure-grid-2">
              <div className="leisure-field">
                <label>Name</label>
                <input
                  name="name"
                  placeholder="Day at Leisure"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="leisure-field">
                <label>Destination</label>
                <select
                  name="destination"
                  value={form.destination}
                  onChange={handleChange}
                >
                  <option>Kochi</option>
                  <option>Munnar</option>
                  <option>Thekkady</option>
                </select>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="leisure-card">
            <h4>Description</h4>

            <textarea
              rows="6"
              name="description"
              placeholder="Add leisure notes or free time details..."
              value={form.description}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="leisure-footer">
          <button className="leisure-btn-secondary" onClick={onClose}>
            Cancel
          </button>

          <button className="leisure-btn-primary">Save</button>
        </div>
      </div>
    </div>
  );
}
