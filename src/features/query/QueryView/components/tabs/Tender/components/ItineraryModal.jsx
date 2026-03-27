import { useEffect, useState } from "react";
import "../Pages/Tender.css";

const ItineraryModal = ({ isOpen, onClose, onSave, editData }) => {
  const [form, setForm] = useState({
    name: "",
    startDate: "",
    endDate: "",
    days: "",
    adult: "",
    child: "",
    notes: "",
  });

  useEffect(() => {
    if (editData) {
      setForm(editData);
    } else {
      setForm({ name: "", startDate: "", endDate: "", days: "", adult: "", child: "", notes: "" });
    }
  }, [editData, isOpen]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => onSave(form);

  if (!isOpen) return null;

  return (
    <div className="itin-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="itin-modal-box">

        {/* Header */}
        <div className="itin-modal-header">
          <h3>{editData ? "Edit Itinerary" : "New Itinerary"}</h3>
          <span className="itin-modal-badge">{editData ? "Editing" : "Create"}</span>
        </div>

        {/* Body */}
        <div className="itin-modal-body">

          {/* Name */}
          <div className="itin-field-group">
            <label className="itin-field-label">Itinerary Name</label>
            <input
              name="name"
              placeholder="e.g. Maldives Honeymoon Package"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          {/* Dates + Days */}
          <div className="itin-modal-row-3">
            <div className="itin-field-group">
              <label className="itin-field-label">Start Date</label>
              <input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
            </div>
            <div className="itin-arrow-divider">→</div>
            <div className="itin-field-group">
              <label className="itin-field-label">End Date</label>
              <input type="date" name="endDate" value={form.endDate} onChange={handleChange} />
            </div>
          </div>

          {/* Days / Pax */}
          <div className="itin-modal-row">
            <div className="itin-field-group">
              <label className="itin-field-label">No. of Days</label>
              <input type="number" name="days" placeholder="0" value={form.days} onChange={handleChange} min="1" />
            </div>
            <div className="itin-field-group">
              <label className="itin-field-label">Adults</label>
              <input type="number" name="adult" placeholder="0" value={form.adult} onChange={handleChange} min="0" />
            </div>
          </div>

          <div className="itin-modal-row">
            <div className="itin-field-group">
              <label className="itin-field-label">Children</label>
              <input type="number" name="child" placeholder="0" value={form.child} onChange={handleChange} min="0" />
            </div>
            <div /> {/* spacer */}
          </div>

          {/* Notes */}
          <div className="itin-field-group">
            <label className="itin-field-label">Notes</label>
            <textarea
              name="notes"
              placeholder="Special requests, requirements..."
              value={form.notes}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="itin-modal-actions">
          <button className="itin-btn-ghost" onClick={onClose}>Cancel</button>
          <button className="itin-btn-primary" onClick={handleSubmit}>
            {editData ? "Save Changes" : "Create Itinerary"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ItineraryModal;