import { X } from "lucide-react";
import "./Vehicle.css";

export default function VehicleModal({ data, onClose }) {
  return (
    <>
      {/* Overlay */}
      <div className="modal-overlay" onClick={onClose} />

      {/* Modal */}
      <div className="vehicle-modal">
        {/* Header */}
        <div className="vehicle-modal-header">
          <h3>{data ? "Edit Vehicle" : "Add Vehicle"}</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="vehicle-modal-body">
          <div className="field">
            <label>Vehicle Name *</label>
            <input
              placeholder="Eg: 12 Seater Tempo Traveller AC"
              defaultValue={data?.name}
              autoFocus
            />
          </div>

          <div className="field">
            <label>Category *</label>
            <select defaultValue={data?.category || ""}>
              <option value="">Select category</option>
              <option>Bus</option>
              <option>Sedan</option>
              <option>SUV</option>
              <option>Tempo Traveller</option>
            </select>
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
        <div className="vehicle-modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary">
            {data ? "Update Vehicle" : "Save Vehicle"}
          </button>
        </div>
      </div>
    </>
  );
}
