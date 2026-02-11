import { X } from "lucide-react";
import { useState } from "react";
import "./Itinerary.css";

export default function ItineraryModernModal({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    startDate: "",
    days: "",
    endDate: "",
    adult: 1,
    child: 0,
    destinations: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div
        className="itm-overlay-modern"
        onClick={onClose}
      ></div>

      <div
        className="itm-modal-modern"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="itm-header-modern">
          <div>
            <h2>Create Itinerary</h2>
            <p>Set up travel details and trip duration</p>
          </div>

          <button
            className="itm-close-btn"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="itm-body-modern">

          <div className="itm-group">
            <label>Itinerary Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Kerala Honeymoon Trip"
            />
          </div>

          <div className="itm-row">
            <div className="itm-group">
              <label>Start Date *</label>
              <input
                type="date"
                name="startDate"
                onChange={handleChange}
              />
            </div>

            <div className="itm-group">
              <label>No. of Days *</label>
              <input
                type="number"
                name="days"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="itm-row">
            <div className="itm-group">
              <label>End Date *</label>
              <input
                type="date"
                name="endDate"
                onChange={handleChange}
              />
            </div>

            <div className="itm-group">
              <label>Adults</label>
              <input
                type="number"
                name="adult"
                value={form.adult}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="itm-group">
            <label>Children</label>
            <input
              type="number"
              name="child"
              value={form.child}
              onChange={handleChange}
            />
          </div>

          <div className="itm-group">
            <label>Destinations</label>
            <input
              name="destinations"
              placeholder="Add destinations..."
              onChange={handleChange}
            />
          </div>

          <div className="itm-group">
            <label>Internal Notes</label>
            <textarea
              name="notes"
              placeholder="Add internal notes..."
              onChange={handleChange}
            />
          </div>

        </div>

        {/* Footer */}
        <div className="itm-footer-modern">
          <button
            className="itm-cancel-modern"
            onClick={onClose}
          >
            Cancel
          </button>

          <button className="itm-save-modern">
            Save Itinerary
          </button>
        </div>
      </div>
    </>
  );
}
