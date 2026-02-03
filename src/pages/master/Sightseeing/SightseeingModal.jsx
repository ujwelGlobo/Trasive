import { X, Upload } from "lucide-react";
import "./SightseeingModal.css";

export default function SightseeingModal({ data, onClose }) {
  return (
    <>
      <div className="modal-overlay" onClick={onClose} />

      <div className="saas-modal xl">
        {/* HEADER */}
        <div className="saas-modal-header">
          <div>
            <h3>{data ? "Edit Sightseeing" : "Add Sightseeing"}</h3>
            <p>Enter sightseeing details and configuration</p>
          </div>

          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="saas-modal-body">
          {/* BASIC INFO */}
          <div className="form-section">Basic Information</div>

          <div className="form-grid">
            <div className="field full">
              <label>Sightseeing Name *</label>
              <input
                placeholder="Eg: Kochi City Tour"
                defaultValue={data?.name}
              />
            </div>

            <div className="field">
              <label>Destination</label>
              <input
                placeholder="Eg: Kochi"
                defaultValue={data?.destination}
              />
            </div>

            <div className="field">
              <label>Supplier</label>
              <select defaultValue={data?.supplier || ""}>
                <option value="">Select supplier</option>
                <option>Supplier A</option>
                <option>Supplier B</option>
              </select>
            </div>
          </div>

          {/* VEHICLE INFO */}
          <div className="form-section">Vehicle Information</div>

          <div className="form-grid">
            <div className="field">
              <label>Type</label>
              <select defaultValue={data?.type || "PVT"}>
                <option>PVT</option>
                <option>SIC</option>
              </select>
            </div>

            <div className="field">
              <label>Vehicle</label>
              <select defaultValue={data?.vehicle || ""}>
                <option value="">Select vehicle</option>
                <option>Desire</option>
                <option>Innova</option>
                <option>Tempo Traveller</option>
              </select>
            </div>

            <div className="field">
              <label>Vehicle Capacity *</label>
              <input
                type="number"
                placeholder="Eg: 4"
                defaultValue={data?.capacity}
              />
            </div>

            <div className="field">
              <label>Vehicle Cost *</label>
              <input
                type="number"
                placeholder="Eg: 4500"
                defaultValue={data?.cost}
              />
            </div>
          </div>

          {/* DETAILS */}
          <div className="form-section">Sightseeing Details</div>

          <div className="form-grid">
            <div className="field full">
              <textarea
                rows="6"
                placeholder="Describe sightseeing details..."
                defaultValue={data?.details}
              />
            </div>
          </div>

          {/* MEDIA & STATUS */}
          <div className="form-section">Media & Status</div>

          <div className="form-grid">
            <div className="field">
              <label>Sightseeing Photo *</label>

              <label className="file-upload">
                <Upload size={16} />
                <span>Upload image</span>
                <input type="file" hidden />
              </label>

              <small>JPG / PNG, max 5MB</small>
            </div>

            <div className="field">
              <label>Status *</label>
              <select defaultValue={data?.status || "Active"}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="saas-modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary">
            {data ? "Update Sightseeing" : "Save Sightseeing"}
          </button>
        </div>
      </div>
    </>
  );
}
