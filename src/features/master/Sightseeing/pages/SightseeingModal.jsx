import { X, Upload, MapPin, User } from "lucide-react";
import "./Sightseeing.css";

export default function SightseeingModal({ data, onClose }) {
  return (
    <>
      {/* OVERLAY */}
      <div className="ss-modal-overlay" onClick={onClose} />

      {/* MODAL */}
      <div className="ss-modal ss-modal-xl">
        {/* HEADER */}
        <div className="ss-modal-header">
          <div>
            <h3>{data ? "Edit Sightseeing" : "Add Sightseeing"}</h3>
            <p>Enter sightseeing details and configuration</p>
          </div>

          <button className="ss-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="ss-modal-body">
          {/* BASIC INFO */}
          <div className="ss-section">Basic Information</div>

          <div className="ss-grid">
            {/* NAME */}
            <div className="ss-field ss-full">
              <label>Sightseeing Name *</label>
              <div className="ss-input-wrap">
                <span className="ss-input-icon">
                  <Upload size={16} />
                </span>
                <input
                  type="text"
                  placeholder="Eg: Kochi City Tour"
                  defaultValue={data?.name}
                />
              </div>
            </div>

            {/* DESTINATION */}
            <div className="ss-field">
              <label>Destination</label>
              <div className="ss-input-wrap">
                <span className="ss-input-icon">
                  <MapPin size={16} />
                </span>
                <input
                  type="text"
                  placeholder="Eg: Kochi"
                  defaultValue={data?.destination}
                />
              </div>
            </div>

            {/* SUPPLIER */}
            <div className="ss-field">
              <label>Supplier</label>
              <div className="ss-input-wrap">
                <span className="ss-input-icon">
                  <User size={16} />
                </span>
                <select defaultValue={data?.supplier || ""}>
                  <option value="">Select supplier</option>
                  <option>Supplier A</option>
                  <option>Supplier B</option>
                </select>
              </div>
            </div>

            {/* TYPE */}
            <div className="ss-field">
              <label>Type</label>
              <div className="ss-input-wrap">
                <span className="ss-input-icon">
                  <User size={16} />
                </span>
                <select defaultValue={data?.type || ""}>
                  <option value="">Select type</option>
                  <option>PVT</option>
                  <option>Vehicle</option>
                </select>
              </div>
            </div>

            {/* VEHICLE CAPACITY */}
            <div className="ss-field">
              <label>Vehicle Capacity</label>
              <div className="ss-input-wrap">
                <span className="ss-input-icon">
                  <MapPin size={16} />
                </span>
                <input
                  type="number"
                  placeholder="Eg: 5"
                  defaultValue={data?.vehicleCapacity}
                />
              </div>
            </div>

            {/* VEHICLE COST */}
            <div className="ss-field">
              <label>Vehicle Cost</label>
              <div className="ss-input-wrap">
                <span className="ss-input-icon">
                  <MapPin size={16} />
                </span>
                <input
                  type="number"
                  placeholder="Eg: 2500"
                  defaultValue={data?.vehicleCost}
                />
              </div>
            </div>

            {/* VEHICLE */}
            <div className="ss-field">
              <label>Vehicle</label>
              <div className="ss-input-wrap">
                <span className="ss-input-icon">
                  <User size={16} />
                </span>
                <select defaultValue={data?.vehicle || ""}>
                  <option value="">Select vehicle</option>
                  <option>Sedan</option>
                  <option>SUV</option>
                  <option>Tempo Traveller</option>
                </select>
              </div>
            </div>

            {/* DETAILS */}
            <div className="ss-field ss-full">
              <label>Sightseeing Details</label>
              <div className="ss-textarea-wrap">
                <textarea
                  placeholder="Enter sightseeing description..."
                  defaultValue={data?.details}
                />
              </div>
            </div>
          </div>

          {/* MEDIA */}
          <div className="ss-section">Media & Status</div>

          <div className="ss-grid">
            {/* IMAGE */}
            <div className="ss-field">
              <label>Sightseeing Photo *</label>
              <label className="ss-upload">
                <Upload size={16} />
                Upload Image
                <input type="file" hidden />
              </label>
              <small>PNG / JPG up to 5MB</small>
            </div>

            {/* STATUS */}
            <div className="ss-field">
              <label>Status</label>
              <div className="ss-input-wrap">
                <span className="ss-input-icon">⚡</span>
                <select defaultValue={data?.status || "Active"}>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="ss-modal-footer">
          <button className="ss-btn ss-btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="ss-btn ss-btn-primary">
            {data ? "Update Sightseeing" : "Save Sightseeing"}
          </button>
        </div>
      </div>
    </>
  );
}
