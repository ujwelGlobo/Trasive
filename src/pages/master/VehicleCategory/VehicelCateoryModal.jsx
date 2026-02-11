import { X } from "lucide-react";
import "./VehicleCategory.css";

export default function VehicleCategoryModal({
  onClose,
  onSave,
  formData,
  setFormData,
  isEdit,
}) {
  return (
    <>
      <div className="vc-cat-overlay" onClick={onClose} />

      <div className="vc-cat-modal">
        <div className="vc-cat-header">
          <h3>{isEdit ? "Edit Vehicle Category" : "Add Vehicle Category"}</h3>
          <button className="vc-cat-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="vc-cat-body">
          <div className="vc-cat-field">
            <label>Name *</label>
            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Eg: Sedan"
              autoFocus
            />
          </div>

          <div className="vc-cat-field">
            <label>Status *</label>
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

        <div className="vc-cat-footer">
          <button className="vc-cat-btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="vc-cat-btn-primary" onClick={onSave}>
            {isEdit ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </>
  );
}
