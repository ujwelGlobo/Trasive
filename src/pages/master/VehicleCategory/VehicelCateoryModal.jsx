import { X } from "lucide-react";
import "./VehicleCategoryModal.css";

export default function VehicleCategoryModal({ data, onClose }) {
  return (
    <>
      {/* Overlay */}
      <div className="modal-overlay" onClick={onClose} />

      {/* Modal */}
      <div className="vc-modal">
        {/* Header */}
        <div className="vc-modal-header">
          <h3>{data ? "Edit Vehicle Category" : "Add Vehicle Category"}</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="vc-modal-body">
          <div className="field">
            <label>Name *</label>
            <input
              placeholder="Eg: Sedan"
              defaultValue={data?.name}
              autoFocus
            />
          </div>

          <div className="field">
            <label>Status *</label>
            <select defaultValue={data?.status || "Active"}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="vc-modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary">
            {data ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </>
  );
}
