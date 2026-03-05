import { X } from "lucide-react";
import "./Vehicle.css";

export default function VehicleModal({ data, onClose }) {
  return (
    <div className="vehicle-modal-overlay">
      <div className="vehicle-modal-card">

        {/* HEADER */}
        <div className="vehicle-modal-header">
          <h3>{data ? "Edit Vehicle" : "Add Vehicle"}</h3>
          <button className="vehicle-modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="vehicle-modal-body">
          <div className="vehicle-modal-field">
            <label>
              Vehicle Category <span>*</span>
            </label>
            <select>
              <option>Sedan</option>
              <option>SUV</option>
              <option>Tempo Traveller</option>
            </select>
          </div>

          <div className="vehicle-modal-field">
            <label>
              Name <span>*</span>
            </label>
            <input placeholder="Enter vehicle name" />
          </div>

          <div className="vehicle-modal-field">
            <label>
              Status <span>*</span>
            </label>
            <select>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        {/* FOOTER */}
        <div className="vehicle-modal-footer">
          <button
            className="vehicle-modal-btn-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="vehicle-modal-btn-save">
            {data ? "Update Vehicle" : "Save Vehicle"}
          </button>
        </div>

      </div>
    </div>
  );
}
