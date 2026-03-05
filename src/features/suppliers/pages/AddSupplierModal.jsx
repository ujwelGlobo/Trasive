import { X } from "lucide-react";
import "./SupplierList.css";

export default function AddSupplierModal({ onClose }) {
  return (
    <>
      {/* Overlay */}
      <div className="supm-overlay" onClick={onClose} />

      {/* Modal */}
      <div className="supm-modal">
        {/* Header */}
        <div className="supm-header">
          <h3>Add Supplier</h3>
          <button className="supm-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="supm-body">

          {/* SECTION: COMPANY */}
          <div className="supm-section">
            <h4>Company Information</h4>

            <div className="supm-grid">
              <div className="supm-field">
                <label>City</label>
                <input placeholder="Type slowly..." />
              </div>

              <div className="supm-field">
                <label>Company Name *</label>
                <input placeholder="Company name" />
              </div>
            </div>
          </div>

          {/* SECTION: SERVICES */}
          <div className="supm-section">
            <h4>Service Types</h4>

            <div className="supm-checkbox-grid">
              {[
                "Accommodation",
                "Transportation",
                "Meal",
                "Leisure",
                "Activity",
                "Insurance / Visa",
                "Flight",
                "Cruise",
              ].map((item) => (
                <label key={item} className="supm-checkbox">
                  <input type="checkbox" />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* SECTION: CONTACT */}
          <div className="supm-section">
            <h4>Contact Details</h4>

            <div className="supm-grid">
              <div className="supm-field">
                <label>Title</label>
                <select>
                  <option>Mr.</option>
                  <option>Ms.</option>
                  <option>Mrs.</option>
                </select>
              </div>

              <div className="supm-field">
                <label>First Name</label>
                <input />
              </div>

              <div className="supm-field">
                <label>Last Name</label>
                <input />
              </div>

              <div className="supm-field">
                <label>Email</label>
                <input type="email" />
              </div>

              <div className="supm-field">
                <label>Mobile</label>
                <div className="supm-mobile">
                  <span>+91</span>
                  <input placeholder="XXXXXXXXXX" />
                </div>
              </div>

              <div className="supm-field supm-full">
                <label>Address</label>
                <textarea rows="3" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="supm-footer">
          <button className="supm-btn ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="supm-btn primary">
            Save Supplier
          </button>
        </div>
      </div>
    </>
  );
}
