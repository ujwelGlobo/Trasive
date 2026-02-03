import { X, Upload } from "lucide-react";
import "./Activity.css";

export default function ActivityModal({ data, onClose }) {
  return (
    <>
      {/* Overlay */}
      <div className="modal-overlay" onClick={onClose} />

      {/* Modal */}
      <div className="saas-modal">
        {/* Header */}
        <div className="saas-modal-header">
          <div>
            <h3>{data ? "Edit Activity" : "Add Activity"}</h3>
            <p>Manage activity details and visibility</p>
          </div>

          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="saas-modal-body">
          <div className="form-grid">

            <div className="field full">
              <label>Activity Name *</label>
              <input
                placeholder="Eg: Jeep Safari"
                defaultValue={data?.name}
              />
            </div>

            <div className="field">
              <label>Destination</label>
              <input
                placeholder="Eg: Munnar"
                defaultValue={data?.destination}
              />
            </div>

            <div className="field">
              <label>Status *</label>
              <select defaultValue={data?.status || "Active"}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            <div className="field full">
              <label>Activity Details</label>
              <textarea
                rows="4"
                placeholder="Describe the activity..."
                defaultValue={data?.details}
              />
            </div>

            <div className="field full">
              <label>Activity Photo *</label>

              <label className="file-upload">
                <Upload size={16} />
                <span>Upload image</span>
                <input type="file" hidden />
              </label>

              <small>PNG, JPG up to 5MB</small>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="saas-modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary">
            {data ? "Update Activity" : "Save Activity"}
          </button>
        </div>
      </div>
    </>
  );
}
