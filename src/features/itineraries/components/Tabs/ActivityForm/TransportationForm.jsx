import { useState } from "react";
import "./TransportationForm.css";

export default function TransportationForm({ onClose }) {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="tp-overlay">
      <div className="tp-modal">
        {/* HEADER */}
        <div className="tp-header">
          <div>
            <h3>Transportation</h3>
            <span>21–12–2025</span>
          </div>
          <button className="tp-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="tp-body">
          {/* DATE SECTION */}
          <div className="tp-card tp-highlight">
            <div className="tp-grid-3">
              <div className="tp-field">
                <label>From Date *</label>
                <input type="date" name="fromDate" onChange={handleChange} />
              </div>

              <div className="tp-field">
                <label>No. Of Days *</label>
                <input type="number" name="days" onChange={handleChange} />
              </div>

              <div className="tp-field">
                <label>To Date *</label>
                <input type="date" name="toDate" onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* MAIN GRID */}
          <div className="tp-card">
            <div className="tp-grid-4">
              <div className="tp-field">
                <label>Arrival</label>
                <select name="arrival" onChange={handleChange}>
                  <option>Select</option>
                </select>
              </div>

              <div className="tp-field">
                <label>Departure</label>
                <select name="departure" onChange={handleChange}>
                  <option>Select</option>
                </select>
              </div>

              <div className="tp-field">
                <label>Pickup Location</label>
                <select name="pickup" onChange={handleChange}>
                  <option>Select</option>
                </select>
              </div>

              <div className="tp-field">
                <label>Drop Location</label>
                <select name="drop" onChange={handleChange}>
                  <option>Select</option>
                </select>
              </div>

              <div className="tp-field">
                <label>Pickup Time</label>
                <input type="time" name="pickupTime" onChange={handleChange} />
              </div>

              <div className="tp-field">
                <label>Drop Time</label>
                <input type="time" name="dropTime" onChange={handleChange} />
              </div>

              <div className="tp-field">
                <label>Transporter</label>
                <select name="transporter" onChange={handleChange}>
                  <option>Select Supplier</option>
                </select>
              </div>

              <div className="tp-field">
                <label>Vehicle</label>
                <select name="vehicle" onChange={handleChange}>
                  <option>Select</option>
                </select>
              </div>

              <div className="tp-field">
                <label>Driver Name</label>
                <input name="driverName" onChange={handleChange} />
              </div>

              <div className="tp-field">
                <label>Phone No.</label>
                <input name="phone" onChange={handleChange} />
              </div>

              <div className="tp-field">
                <label>Vehicle No.</label>
                <input name="vehicleNo" onChange={handleChange} />
              </div>

              <div className="tp-field">
                <label>Journey KM</label>
                <input name="journeyKm" onChange={handleChange} />
              </div>

              <div className="tp-field">
                <label>Minimum KM</label>
                <input name="minimumKm" onChange={handleChange} />
              </div>

              <div className="tp-field">
                <label>Net Rate</label>
                <input name="netRate" onChange={handleChange} />
              </div>

              <div className="tp-field">
                <label>Extra KM Covered</label>
                <input name="extraKm" onChange={handleChange} />
              </div>

              <div className="tp-field">
                <label>Extra KM Rate</label>
                <input name="extraKmRate" onChange={handleChange} />
              </div>

              <div className="tp-field">
                <label>Driver Batta & Tolls</label>
                <input name="driverBatta" onChange={handleChange} />
              </div>

              <div className="tp-field">
                <label className="tp-danger">Final Rate *</label>
                <input name="finalRate" onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="tp-footer">
          <button className="tp-btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="tp-btn-primary">Save Transportation</button>
        </div>
      </div>
    </div>
  );
}
