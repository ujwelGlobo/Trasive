import { useEffect, useState } from "react";
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
  { value: 1,  label: "Goa" },
  { value: 2,  label: "Kovalam" },
  { value: 3,  label: "Alleppey" },
  { value: 4,  label: "Thekkady" },
  { value: 5,  label: "Varkala" },
  { value: 7,  label: "Munnar" },
  { value: 19, label: "Wagamon" },
];

const MEAL_TYPE_OPTIONS = [
  { value: 1, label: "Room Only" },
  { value: 2, label: "Bed & Breakfast" },
  { value: 3, label: "Half Board" },
  { value: 4, label: "Full Board" },
  { value: 5, label: "All Inclusive" },
];

const ROOM_TYPE_OPTIONS = [
  { value: 1, label: "Single" },
  { value: 2, label: "Double" },
  { value: 3, label: "Twin" },
  { value: 4, label: "Suite" },
  { value: 5, label: "Deluxe" },
];

// ─── small reusable helpers ────────────────────────────────────────────────

const Field = ({ label, className = "", children }) => (
  <div className={`hotel-field ${className}`}>
    <label>{label}</label>
    {children}
  </div>
);

const SelectField = ({ label, value, onChange, options, placeholder }) => (
  <Field label={label}>
    <select value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  </Field>
);

// ─── main component ────────────────────────────────────────────────────────

const HotelModal = ({ open, onClose, onSave, formData, setFormData, isEdit }) => {
  const [isSupplier, setIsSupplier] = useState(false);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!open) return null;

  const set = (key, val) => setFormData((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = () => {
    if (!formData.name?.trim()) return;
    onSave({ ...formData, isSupplier });
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
          <button className="hotelmodalclose" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="hotel-modal-body">

          {/* ── BASIC INFORMATION ── */}
          <div className="hotel-form-section">Basic Information</div>
          <div className="hotel-form-grid">

            <Field label="Hotel Name *">
              <input
                placeholder="e.g. Grand Palace Hotel"
                value={formData.name ?? ""}
                onChange={(e) => set("name", e.target.value)}
              />
            </Field>

            <SelectField
              label="Category"
              value={formData.category}
              onChange={(val) => set("category", Number(val))}
              options={CATEGORY_OPTIONS}
              placeholder="Select category"
            />

            <SelectField
              label="Destination"
              value={formData.destination}
              onChange={(val) => set("destination", Number(val))}
              options={DESTINATION_OPTIONS}
              placeholder="Select destination"
            />

            <Field label="Address" className="hotel-full">
              <textarea
                rows={2}
                placeholder="Enter full hotel address..."
                value={formData.address ?? ""}
                onChange={(e) => set("address", e.target.value)}
              />
            </Field>

            <Field label="Hotel Number *">
              <input
                placeholder="+91 000 000 0000"
                value={formData.hotel_number ?? ""}
                onChange={(e) => set("hotel_number", e.target.value)}
              />
            </Field>

            <Field label="Hotel Photo *">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => set("hotel_photo", e.target.files?.[0] ?? null)}
              />
            </Field>

            <SelectField
              label="Meal Type"
              value={formData.mealType}
              onChange={(val) => set("mealType", Number(val))}
              options={MEAL_TYPE_OPTIONS}
              placeholder="Select meal type"
            />

            <SelectField
              label="Room Type"
              value={formData.roomType}
              onChange={(val) => set("roomType", Number(val))}
              options={ROOM_TYPE_OPTIONS}
              placeholder="Select room type"
            />

            <Field label="Status">
              <select
                value={formData.status ?? "Active"}
                onChange={(e) => set("status", e.target.value)}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </Field>

          </div>

          {/* ── CONTACT INFORMATION ── */}
          <div className="hotel-form-section" style={{ marginTop: 24 }}>Contact Information</div>
          <div className="hotel-form-grid">

            <Field label="Sales Person">
              <input
                placeholder="Full name"
                value={formData.contactPerson ?? ""}
                onChange={(e) => set("contactPerson", e.target.value)}
              />
            </Field>

            <Field label="Email">
              <input
                type="email"
                placeholder="contact@hotel.com"
                value={formData.email ?? ""}
                onChange={(e) => set("email", e.target.value)}
              />
            </Field>

            <Field label="Alt Email">
              <input
                type="email"
                placeholder="alt@hotel.com"
                value={formData.altEmail ?? ""}
                onChange={(e) => set("altEmail", e.target.value)}
              />
            </Field>

            <Field label="Phone">
              <input
                placeholder="+91 000 000 0000"
                value={formData.phone ?? ""}
                onChange={(e) => set("phone", e.target.value)}
              />
            </Field>

            <Field label="Website">
              <input
                placeholder="www.hotelname.com"
                value={formData.website ?? ""}
                onChange={(e) => set("website", e.target.value)}
              />
            </Field>

            <Field>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={isSupplier}
                  onChange={(e) => setIsSupplier(e.target.checked)}
                  style={{ width: 16, height: 16, cursor: "pointer" }}
                />
                Mark as Supplier
              </label>
            </Field>

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