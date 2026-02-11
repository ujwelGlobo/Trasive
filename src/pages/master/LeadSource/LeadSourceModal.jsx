import { X } from "lucide-react";
import "./LeadSource.css";

export default function LeadSourceModal({
  open,
  onClose,
  onSave,
  form,
  setForm,
  isEdit
}) {
  if (!open) return null;

  return (
    <div className="lsm-backdrop">
      <div className="lsm-modal">

        {/* HEADER */}
        <div className="lsm-header">
          <h3>{isEdit ? "Edit Location" : "Add Location"}</h3>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="lsm-body">
          <div className="lsm-field">
            <label>Location Name *</label>
            <input
              placeholder="Enter pickup / drop location"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="lsm-field">
            <label>Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* FOOTER */}
        <div className="lsm-footer">
          <button className="lsm-btn outline" onClick={onClose}>
            Cancel
          </button>
          <button className="lsm-btn primary" onClick={onSave}>
            Save
          </button>
        </div>

      </div>
    </div>
  );
}
