import React from "react";
import { X } from "lucide-react";
import "./HotelPriceModal.css"

export default function HotelPriceModal({
  open,
  onClose,
  hotel,
}) {
  if (!open) return null;

  return (
    <div className="price-modal-overlay">
      <div className="price-modal-container">

        <div className="price-modal-header">
          <div>
            <h2>Update Hotel Pricing</h2>
            <p>{hotel?.name}</p>
          </div>

          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="price-modal-body">

          <div className="price-grid">
            <input type="date" />
            <input type="date" />

            <select>
              <option>Select Meal Plan</option>
            </select>

            <select>
              <option>Select Room Type</option>
            </select>

            <input placeholder="Single Price" />
            <input placeholder="Double Price" />

            <input placeholder="Extra Adult" />
            <input placeholder="Child With Bed" />

            <input placeholder="Child Without Bed" />
          </div>

        </div>

        <div className="price-modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button className="save-btn">
            Save Price
          </button>
        </div>

      </div>
    </div>
  );
}