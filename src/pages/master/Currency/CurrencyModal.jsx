import { X } from "lucide-react";
import "./Currency.css";

export default function CurrencyModal({
  open,
  onClose,
  onSave,
  formData,
  setFormData,
  isEdit,
}) {
  if (!open) return null;

  return (
    <div className="currency-modal-overlay">
      <div className="currency-modal-card">

        {/* HEADER */}
        <div className="currency-modal-header">
          <h3>{isEdit ? "Edit Currency" : "Add Currency"}</h3>
          <button className="currency-modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="currency-modal-divider" />

        {/* BODY */}
        <div className="currency-modal-body">
          <div className="currency-modal-group">
            <label>Currency Code</label>
            <input
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
              placeholder="INR"
            />
          </div>

          <div className="currency-modal-group">
            <label>Currency Name</label>
            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Indian Rupee"
            />
          </div>

          <div className="currency-modal-group">
            <label>Rate</label>
            <input
              type="number"
              value={formData.rate}
              onChange={(e) =>
                setFormData({ ...formData, rate: e.target.value })
              }
            />
          </div>

          <div className="currency-modal-group">
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

        <div className="currency-modal-divider" />

        {/* FOOTER */}
        <div className="currency-modal-footer">
          <button
            className="currency-modal-btn-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="currency-modal-btn-save"
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
