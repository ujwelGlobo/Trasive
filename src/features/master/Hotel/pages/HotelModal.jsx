import { X } from "lucide-react";
import "./Hotel.css";

export default function HotelModal({ data, onClose }) {
  return (
    <>
      <div className="hotel-modal-overlay" onClick={onClose} />

      <div className="hotel-modal">
        {/* HEADER */}
        <div className="hotel-modal-header">
          <div>
            <h3>{data ? "Edit Hotel" : "Add Hotel"}</h3>
            <p>Fill in the hotel information below</p>
          </div>

          <button className="hotelmodalclose" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="hotel-modal-body">
          <div className="hotel-form-section">Basic Information</div>

          <div className="hotel-form-grid">
            <div className="hotel-field">
              <label>Hotel Name *</label>
              <input defaultValue={data?.name} />
            </div>

            <div className="hotel-field">
              <label>Category</label>
              <select defaultValue={data?.category || ""}>
                <option value="">Select category</option>
                <option>3 Star</option>
                <option>4 Star</option>
                <option>5 Star</option>
              </select>
            </div>

            <div className="hotel-field">
              <label>Destination</label>
              <input defaultValue={data?.destination} />
            </div>

            <div className="hotel-field">
              <label>Status</label>
              <select defaultValue={data?.status || "Active"}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            <div className="hotel-field hotel-full">
              <label>Address</label>
              <textarea rows="3" />
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="hotel-modal-footer">
          <button className="hotel-btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="hotel-btn-primary">
            {data ? "Update Hotel" : "Save Hotel"}
          </button>
        </div>
      </div>
    </>
  );
}
