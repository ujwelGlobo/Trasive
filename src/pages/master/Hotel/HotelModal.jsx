import { X } from "lucide-react";
import "./Hotel.css";

export default function HotelModal({ data, onClose }) {
  return (
    <>
      <div className="modal-overlay" onClick={onClose} />

      <div className="saas-modal">
        {/* HEADER */}
        <div className="saas-modal-header">
          <div>
            <h3>{data ? "Edit Hotel" : "Add Hotel"}</h3>
            <p>Fill in the hotel information below</p>
          </div>

          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="saas-modal-body">
          <div className="form-section">Basic Information</div>

          <div className="form-grid">
            <div className="field">
              <label>Hotel Name *</label>
              <input placeholder="Hotel name" defaultValue={data?.name} />
            </div>

            <div className="field">
              <label>Category</label>
              <select defaultValue={data?.category || ""}>
                <option value="">Select category</option>
                <option>3 Star</option>
                <option>4 Star</option>
                <option>4 Star Deluxe</option>
                <option>5 Star</option>
              </select>
            </div>

            <div className="field">
              <label>Destination</label>
              <input placeholder="Destination" defaultValue={data?.destination} />
            </div>

            <div className="field">
              <label>Phone</label>
              <input placeholder="+91 9XXXXXXXXX" />
            </div>

            <div className="field full">
              <label>Address</label>
              <textarea rows="3" placeholder="Hotel address" />
            </div>
          </div>

          <div className="form-section">Contact & Status</div>

          <div className="form-grid">
            <div className="field">
              <label>Email</label>
              <input placeholder="hotel@email.com" />
            </div>

            <div className="field">
              <label>Website</label>
              <input placeholder="https://example.com" />
            </div>

            <div className="field">
              <label>Status</label>
              <select defaultValue={data?.status || "Active"}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            <div className="field checkbox full">
              <label>
                <input type="checkbox" /> Mark as supplier
              </label>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="saas-modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary">
            {data ? "Update Hotel" : "Save Hotel"}
          </button>
        </div>
      </div>
    </>
  );
}
