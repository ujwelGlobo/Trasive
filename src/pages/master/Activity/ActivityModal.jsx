import { X, Upload } from "lucide-react";
import "./Activity.css";

export default function ActivityModal({ data, onClose }) {
  return (
    <>
      {/* Overlay */}
      <div className="activity-modal-overlay" onClick={onClose} />

      {/* Modal */}
      <div className="activity-modal">
        {/* Header */}
        <div className="activity-modal-header">
          <div>
            <h3>{data ? "Edit Activity" : "Add Activity"}</h3>
            <p>Manage activity details and visibility</p>
          </div>

          <button className="activity-modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="activity-modal-body">
          <div className="activity-form-grid">
            <div className="activity-field activity-full">
              <label>Activity Name *</label>
              <input
                placeholder="Eg: Jeep Safari"
                defaultValue={data?.name}
              />
            </div>

            <div className="activity-field">
              <label>Destination</label>
              <input
                placeholder="Eg: Munnar"
                defaultValue={data?.destination}
              />
            </div>

            <div className="activity-field">
              <label>Status *</label>
              <select defaultValue={data?.status || "Active"}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            <div className="activity-field activity-full">
              <label>Activity Details</label>
              <textarea
                rows="4"
                placeholder="Describe the activity..."
                defaultValue={data?.details}
              />
            </div>

            <div className="activity-field activity-full">
              <label>Activity Photo *</label>

              <label className="activity-file-upload">
                <Upload size={16} />
                <span>Upload image</span>
                <input type="file" hidden />
              </label>

              <small>PNG, JPG up to 5MB</small>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="activity-modal-footer">
          <button
            className="activity-btn activity-btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="activity-btn activity-btn-primary">
            {data ? "Update Activity" : "Save Activity"}
          </button>
        </div>
      </div>
    </>
  );
}
