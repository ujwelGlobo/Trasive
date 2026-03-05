import React from "react";
import { X } from "lucide-react";
import "./Flight.css";

const FlightModal = ({
  open,
  onClose,
  onSave,
  formData,
  setFormData,
  isEdit,
}) => {
  if (!open) return null;

  return (
    <div className="flight-modal-overlay">
      <div className="flight-modal-card">

        {/* HEADER */}
        <div className="flight-modal-header">
          <h3>{isEdit ? "Edit Flight" : "Add Flight"}</h3>
          <button className="flight-modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="flight-modal-divider" />

        {/* BODY */}
        <div className="flight-modal-body">
          <div className="flight-modal-group">
            <label>Flight Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter flight name"
            />
          </div>

          <div className="flight-modal-group">
            <label>Status</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flight-modal-divider" />

        {/* FOOTER */}
        <div className="flight-modal-footer">
          <button
            className="flight-modal-btn-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="flight-modal-btn-save"
            onClick={onSave}
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default FlightModal;
