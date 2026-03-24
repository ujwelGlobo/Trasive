import { useEffect, useState } from "react";
import { X } from "lucide-react";
import "../pages/Hotel";

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

const HotelModal = ({
  open,
  onClose,
  onSave,
  formData,
  setFormData,
  isEdit,
  categories = [],
  destinations = [],
  mealplan = [],
  roomType = [],
}) => {
  const [isSupplier, setIsSupplier] = useState(false);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!open) return null;

  const set = (key, val) => setFormData((prev) => ({ ...prev, [key]: val }));

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
              options={categories}
              placeholder="Select category"
            />

            <SelectField
              label="Destination"
              value={formData.destination}
              onChange={(val) => set("destination", Number(val))}
              options={destinations}
              placeholder="Select destination"
            />

            <Field label="Hotel Type *">
              <input
                placeholder="e.g. Resort, Business, Boutique"
                value={formData.hotelType ?? ""}
                onChange={(e) => set("hotelType", e.target.value)}
              />
            </Field>

            <Field label="Hotel Number *">
              <input
                placeholder="+91 000 000 0000"
                value={formData.hotel_number ?? ""}
                onChange={(e) => set("hotel_number", e.target.value)}
              />
            </Field>

            <Field label="Check In *">
              <input
                type="date"
                value={formData.checkIn ?? ""}
                onChange={(e) => set("checkIn", e.target.value)}
              />
            </Field>

            <Field label="Check Out *">
              <input
                type="date"
                value={formData.checkOut ?? ""}
                onChange={(e) => set("checkOut", e.target.value)}
              />
            </Field>

            <SelectField
              label="Meal Type"
              value={formData.mealType}
              onChange={(val) => set("mealType", Number(val))}
              options={mealplan}
              placeholder="Select meal type"
            />

            <SelectField
              label="Room Type"
              value={formData.roomType}
              onChange={(val) => set("roomType", Number(val))}
              options={roomType}
              placeholder="Select room type"
            />

            <Field label="Company">
              <input
                placeholder="e.g. Divine Holidays"
                value={formData.company ?? ""}
                onChange={(e) => set("company", e.target.value)}
              />
            </Field>

            <Field label="Role">
              <input
                placeholder="e.g. Supplier"
                value={formData.role ?? ""}
                onChange={(e) => set("role", e.target.value)}
              />
            </Field>

            <Field label="Status">
              <select
                value={formData.status ?? "Active"}
                onChange={(e) => set("status", e.target.value)}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </Field>

            <Field label="Hotel Photo">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => set("hotel_photo", e.target.files?.[0] ?? null)}
              />
            </Field>

            <Field label="Address" className="hotel-full">
              <textarea
                rows={2}
                placeholder="Enter full hotel address..."
                value={formData.address ?? ""}
                onChange={(e) => set("address", e.target.value)}
              />
            </Field>

            <Field label="Details" className="hotel-full">
              <textarea
                rows={3}
                placeholder="Hotel description..."
                value={formData.details ?? ""}
                onChange={(e) => set("details", e.target.value)}
              />
            </Field>

            <Field label="Amenities (comma separated)" className="hotel-full">
              <input
                placeholder="e.g. Pool, Wifi, Spa"
                value={(formData.amenities || []).join(",")}
                onChange={(e) =>
                  set("amenities", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))
                }
              />
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

            <Field label="Phone">
              <input
                placeholder="+91 000 000 0000"
                value={formData.contactPersonPhone ?? ""}
                onChange={(e) => set("contactPersonPhone", e.target.value)}
              />
            </Field>

            <Field label="Email">
              <input
                type="email"
                placeholder="contact@hotel.com"
                value={formData.contactPersonEmail ?? ""}
                onChange={(e) => set("contactPersonEmail", e.target.value)}
              />
            </Field>

            <Field label="Alt Email">
              <input
                type="email"
                placeholder="alt@hotel.com"
                value={formData.alternateEmail ?? ""}
                onChange={(e) => set("alternateEmail", e.target.value)}
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