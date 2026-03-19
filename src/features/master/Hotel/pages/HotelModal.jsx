import { useEffect } from "react";
import { X } from "lucide-react";
import "./Hotel.css";

const CATEGORY_OPTIONS = [
  { value: 0, label: "Budget" },
  { value: 1, label: "3 Star" },
  { value: 2, label: "4 Star" },
  { value: 3, label: "5 Star" },
  { value: 4, label: "Luxury" },
];

const DESTINATION_OPTIONS = [
  { value: 1, label: "Goa" },
  { value: 2, label: "Kovalam" },
  { value: 3, label: "Alleppey" },
  { value: 4, label: "Thekkady" },
  { value: 5, label: "Varkala" },
  { value: 7, label: "Munnar" },
  { value: 19, label: "Wagamon" },
];

const HOTEL_TYPE_OPTIONS = [
  { value: 1, label: "Resort" },
  { value: 2, label: "Business Hotel" },
  { value: 3, label: "Boutique Hotel" },
  { value: 4, label: "Budget Hotel" },
  { value: 5, label: "Heritage Hotel" },
  { value: 6, label: "Eco Resort" },
];

const ROOM_TYPE_OPTIONS = [
  { value: 1, label: "Single" },
  { value: 2, label: "Double" },
  { value: 3, label: "Twin" },
  { value: 4, label: "Suite" },
  { value: 5, label: "Deluxe" },
];

const MEAL_TYPE_OPTIONS = [
  { value: 1, label: "Room Only" },
  { value: 2, label: "Bed & Breakfast" },
  { value: 3, label: "Half Board" },
  { value: 4, label: "Full Board" },
  { value: 5, label: "All Inclusive" },
];

const AMENITIES_OPTIONS = ["Pool", "Wifi", "Spa", "Gym", "Parking", "Restaurant", "Bar", "Beach Access"];

const HotelModal = ({ open, onClose, onSave, formData, setFormData, isEdit }) => {

  /* Close on Escape */
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!open) return null;

  const set = (key, val) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  /* Toggle amenity checkbox */
  const toggleAmenity = (amenity) => {
    const current = formData.amenities || [];
    const updated = current.includes(amenity)
      ? current.filter((a) => a !== amenity)
      : [...current, amenity];
    set("amenities", updated);
  };

  const handleSubmit = () => {
    if (!formData.name?.trim()) return;
    onSave();
  };

  return (
    <>
      <div className="hotel-modal-overlay" onClick={onClose} />

      <div className="hotel-modal">

        {/* HEADER */}
        <div className="hotel-modal-header">
          <div>
            <h3>{isEdit ? "Edit Hotel" : "Add Hotel"}</h3>
            <p>Fill in the hotel information below</p>
          </div>
          <button className="hotelmodalclose" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="hotel-modal-body">

          {/* ── BASIC INFORMATION ── */}
          <div className="hotel-form-section">Basic Information</div>
          <div className="hotel-form-grid">

            <div className="hotel-field">
              <label>Hotel Name *</label>
              <input
                placeholder="e.g. Grand Palace Hotel"
                value={formData.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </div>

            <div className="hotel-field">
              <label>Category</label>
              <select
                value={formData.category}
                onChange={(e) => set("category", e.target.value)}
              >
                <option value="">Select category</option>
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            <div className="hotel-field">
              <label>Destination</label>
              <select
                value={formData.destination}
                onChange={(e) => set("destination", Number(e.target.value))}
              >
                <option value="">Select destination</option>
                {DESTINATION_OPTIONS.map((d) => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
            </div>

            <div className="hotel-field">
              <label>Hotel Type</label>
              <select
                value={formData.hotelType}
                onChange={(e) => set("hotelType", Number(e.target.value))}
              >
                <option value="">Select type</option>
                {HOTEL_TYPE_OPTIONS.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            <div className="hotel-field">
              <label>Hotel Number *</label>
              <input
                placeholder="+91 000 000 0000"
                value={formData.hotel_number}
                onChange={(e) => set("hotel_number", e.target.value)}
              />
            </div>

            <div className="hotel-field">
              <label>Status</label>
              <select
                value={formData.status}
                onChange={(e) => set("status", e.target.value)}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="hotel-field hotel-full">
              <label>Address</label>
              <textarea
                rows="2"
                placeholder="Enter full hotel address..."
                value={formData.address}
                onChange={(e) => set("address", e.target.value)}
              />
            </div>

            <div className="hotel-field hotel-full">
              <label>Details</label>
              <textarea
                rows="3"
                placeholder="Hotel description..."
                value={formData.details}
                onChange={(e) => set("details", e.target.value)}
              />
            </div>

          </div>

          {/* ── CONTACT INFORMATION ── */}
          <div className="hotel-form-section" style={{ marginTop: 24 }}>Contact Information</div>
          <div className="hotel-form-grid">

            <div className="hotel-field">
              <label>Contact Person</label>
              <input
                placeholder="Full name"
                value={formData.contactPerson}
                onChange={(e) => set("contactPerson", e.target.value)}
              />
            </div>

            <div className="hotel-field">
              <label>Contact Phone</label>
              <input
                placeholder="9947131794"
                value={formData.contactPersonPhone}
                onChange={(e) => set("contactPersonPhone", e.target.value)}
              />
            </div>

            <div className="hotel-field">
              <label>Contact Email</label>
              <input
                type="email"
                placeholder="contact@hotel.com"
                value={formData.contactPersonEmail}
                onChange={(e) => set("contactPersonEmail", e.target.value)}
              />
            </div>

            <div className="hotel-field">
              <label>Alternate Email</label>
              <input
                type="email"
                placeholder="alternate@hotel.com"
                value={formData.alternateEmail}
                onChange={(e) => set("alternateEmail", e.target.value)}
              />
            </div>

            <div className="hotel-field">
              <label>Company</label>
              <input
                placeholder="e.g. Divine Holidays"
                value={formData.company}
                onChange={(e) => set("company", e.target.value)}
              />
            </div>

            <div className="hotel-field">
              <label>Role</label>
              <input
                placeholder="e.g. Supplier"
                value={formData.role}
                onChange={(e) => set("role", e.target.value)}
              />
            </div>

          </div>

          {/* ── BOOKING DETAILS ── */}
          <div className="hotel-form-section" style={{ marginTop: 24 }}>Booking Details</div>
          <div className="hotel-form-grid">

            <div className="hotel-field">
              <label>Room Type *</label>
              <select
                value={formData.roomType}
                onChange={(e) => set("roomType", Number(e.target.value))}
              >
                <option value="">Select room type</option>
                {ROOM_TYPE_OPTIONS.map((r) => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>

            <div className="hotel-field">
              <label>Meal Type *</label>
              <select
                value={formData.mealType}
                onChange={(e) => set("mealType", Number(e.target.value))}
              >
                <option value="">Select meal type</option>
                {MEAL_TYPE_OPTIONS.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
            </div>

            <div className="hotel-field">
              <label>Check In *</label>
              <input
                type="date"
                value={formData.checkIn}
                onChange={(e) => set("checkIn", e.target.value)}
              />
            </div>

            <div className="hotel-field">
              <label>Check Out *</label>
              <input
                type="date"
                value={formData.checkOut}
                onChange={(e) => set("checkOut", e.target.value)}
              />
            </div>

          </div>

          {/* ── AMENITIES ── */}
          <div className="hotel-form-section" style={{ marginTop: 24 }}>Amenities</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {AMENITIES_OPTIONS.map((amenity) => {
              const checked = (formData.amenities || []).includes(amenity);
              return (
                <label
                  key={amenity}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 14px",
                    borderRadius: 999,
                    border: `1px solid ${checked ? "#2563eb" : "#e5e7eb"}`,
                    background: checked ? "#eff6ff" : "#fff",
                    color: checked ? "#2563eb" : "#374151",
                    fontSize: "0.82rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.15s",
                    userSelect: "none",
                  }}
                >
                  <input
                    type="checkbox"
                    style={{ display: "none" }}
                    checked={checked}
                    onChange={() => toggleAmenity(amenity)}
                  />
                  {amenity}
                </label>
              );
            })}
          </div>

        </div>

        {/* FOOTER */}
        <div className="hotel-modal-footer">
          <button className="hotel-btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="hotel-btn-primary" onClick={handleSubmit}>
            {isEdit ? "Update Hotel" : "Save Hotel"}
          </button>
        </div>

      </div>
    </>
  );

};

export default HotelModal;
