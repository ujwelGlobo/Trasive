import { useState } from "react";
import "./AccommodationForm.css";

export default function AccommodationForm({ onClose }) {
  const [form, setForm] = useState({
    destination: "",
    category: "",
    hotelName: "",
    roomName: "",
    mealPlan: "",
    single: "",
    double: "",
    extraBed: "",
    cwb: "",
    cnb: "",
    checkInDate: "",
    nights: "",
    checkOutDate: "",
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
      <div className="modal-box">
        {/* HEADER */}
        <div className="modal-header">
          <h3>Add Accommodation</h3>
          <button onClick={onClose}>✕</button>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="modal-body">
          {/* BASIC INFO */}
          <div className="form-section">
            <h4>Basic Information</h4>

            <div className="form-grid">
              <div className="field">
                <label>Destination</label>
                <select name="destination" onChange={handleChange}>
                  <option>Select destination</option>
                </select>
              </div>

              <div className="field">
                <label>Category</label>
                <select name="category" onChange={handleChange}>
                  <option>3 Star</option>
                </select>
              </div>

              <div className="field">
                <label>Hotel Name</label>
                <input name="hotelName" onChange={handleChange} />
              </div>

              <div className="field">
                <label>Room Name</label>
                <input name="roomName" onChange={handleChange} />
              </div>

              <div className="field">
                <label>Meal Plan</label>
                <input name="mealPlan" onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* ROOM CONFIG */}
          <div className="form-section">
            <h4>Room Configuration</h4>

            <div className="room-grid">
              <input placeholder="Single" />
              <input placeholder="Double" />
              <input placeholder="Extra Bed" />
              <input placeholder="CWB" />
              <input placeholder="CNB" />
            </div>
          </div>

          {/* STAY DETAILS */}
          <div className="form-section">
            <h4>Stay Details</h4>

            <div className="form-grid">
              <div className="field">
                <label>Check-in Date</label>
                <input type="date" name="checkInDate" onChange={handleChange} />
              </div>

              <div className="field">
                <label>Nights</label>
                <input name="nights" onChange={handleChange} />
              </div>

              <div className="field">
                <label>Check-out Date</label>
                <input
                  type="date"
                  name="checkOutDate"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="form-section">
            <h4>Description</h4>
            <textarea
              rows="4"
              name="description"
              onChange={handleChange}
              placeholder="Add internal notes..."
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="modal-footer">
          <button className="secondary-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="primary-btn">Save Accommodation</button>
        </div>
      </div>
    </div>
  );
}
