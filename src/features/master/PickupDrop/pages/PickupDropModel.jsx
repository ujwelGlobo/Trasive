import { X } from "lucide-react";
import "./PickupDrop.css";

export default function PickupDropModal({
  open,
  onClose,
  onSave,
  formData,
  setFormData,
  isEdit,
}) {
  if (!open) return null;

  return (
    <div className="pickup-modal-overlay">
      <div className="pickup-modal-card">

        {/* HEADER */}
        <div className="pickup-modal-header">
          <h3>{isEdit ? "Edit Location" : "Add Location"}</h3>
          <button className="pickup-modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="pickup-modal-divider" />

        {/* BODY */}
        <div className="pickup-modal-body">
          <div className="pickup-modal-group">
            <label>Location Name *</label>
            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter pickup / drop location"
            />
          </div>

          <div className="pickup-modal-group">
            <label>Status</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <div className="pickup-modal-divider" />

        {/* FOOTER */}
        <div className="pickup-modal-footer">
          <button
            className="pickup-modal-btn-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="pickup-modal-btn-save"
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
