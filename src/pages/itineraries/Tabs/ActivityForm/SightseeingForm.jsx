import { useState } from "react";
import "./SightseeingForm.css";

export default function SightseeingForm({ onClose }) {
  const [form, setForm] = useState({
    destination: "",
    type: "",
    name: "",
    sightseeingType: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="ss-overlay">
      <div className="ss-modal">
        {/* HEADER */}
        <div className="ss-header">
          <div className="ss-header-left">
            <h3>Add Sightseeing</h3>
            <span>21–12–2025</span>
          </div>
          <button className="ss-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="ss-body">
          {/* BASIC INFO */}
          <div className="ss-card">
            <h4>Basic Information</h4>

            <div className="ss-grid">
              <div className="ss-field">
                <label>Destination</label>
                <select name="destination" onChange={handleChange}>
                  <option>Select Destination</option>
                </select>
              </div>

              <div className="ss-field">
                <label>Type</label>
                <select name="type" onChange={handleChange}>
                  <option>Manual</option>
                </select>
              </div>

              <div className="ss-field">
                <label>Name</label>
                <input name="name" onChange={handleChange} />
              </div>

              <div className="ss-field">
                <label>Sightseeing Type</label>
                <select name="sightseeingType" onChange={handleChange}>
                  <option>Private</option>
                  <option>Sharing</option>
                </select>
              </div>
            </div>
          </div>

          {/* IMAGE */}
          <div className="ss-card">
            <h4>Upload Image</h4>
            <div className="ss-upload">
              <input type="file" />
              <p>Click or drag image to upload</p>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="ss-card">
            <h4>Description</h4>
            <textarea
              rows="5"
              name="description"
              placeholder="Add internal notes..."
              onChange={handleChange}
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="ss-footer">
          <button className="ss-btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="ss-btn-primary">Save Sightseeing</button>
        </div>
      </div>
    </div>
  );
}
