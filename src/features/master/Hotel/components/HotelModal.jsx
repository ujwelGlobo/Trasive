import { useEffect, useState } from "react";
import { X } from "lucide-react";
import "../pages/Hotel";

/* ────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */
const Field = ({ label, className = "", children }) => (
  <div className={`hotel-field ${className}`}>
    {label && <label>{label}</label>}
    {children}
  </div>
);

const SelectField = ({ label, value, onChange, options, placeholder }) => (
  <Field label={label}>
    <select
      value={value ?? ""}
      onChange={(e) => {
        const raw = e.target.value;
        onChange(raw === "" ? "" : Number(raw)); // ✅ always pass numeric ID
      }}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </Field>
);

/* ════════════════════════════════════════════
   HotelModal
═════════════════════════════════════════════ */
const HotelModal = ({
  open,
  onClose,
  onSave,
  formData,
  setFormData,
  isEdit,
  categories   = [],
  destinations = [],
  mealplan     = [],
  roomType     = [],
}) => {
  const [isSupplier, setIsSupplier]     = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  /* close on Escape */
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  /* reset local state when modal closes */
  useEffect(() => {
    if (!open) {
      setIsSupplier(false);
      setPhotoPreview(null);
    }
  }, [open]);

  if (!open) return null;

  const set = (key, val) => setFormData((prev) => ({ ...prev, [key]: val }));

  /* file picker */
  const handleFileChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    set("hotelPhoto", file); // ✅ matches backend field name
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  };

  const handleSubmit = () => {
    if (!formData.name?.trim()) return;
    onSave();
  };

  return (
    <>
      <div className="hotel-modal-overlay" onClick={onClose} />
      <div className="hotel-modal">

        {/* ── HEADER ── */}
        <div className="hotel-modal-header">
          <div>
            <h3>{isEdit ? "Edit Hotel" : "Add Hotel"}</h3>
            <p>Fill in the hotel information below</p>
          </div>
          <button className="hotelmodalclose" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* ── BODY ── */}
        <div className="hotel-modal-body">

          {/* ─── BASIC INFORMATION ─── */}
          <div className="hotel-form-section">Basic Information</div>
          <div className="hotel-form-grid">

            <Field label="Hotel Name *">
              <input
                placeholder="e.g. Grand Palace Hotel"
                value={formData.name ?? ""}
                onChange={(e) => set("name", e.target.value)}
              />
            </Field>

            {/* ✅ passes numeric ID back, not label string */}
            <SelectField
              label="Category"
              value={formData.category}
              onChange={(val) => set("category", val)}
              options={categories}
              placeholder="Select category"
            />

            <SelectField
              label="Destination"
              value={formData.destination}
              onChange={(val) => set("destination", val)}
              options={destinations}
              placeholder="Select destination"
            />

            <Field label="Hotel Number *">
              <input
                placeholder="+91 000 000 0000"
                value={formData.hotel_number ?? ""}
                onChange={(e) => set("hotel_number", e.target.value)}
              />
            </Field>

            <SelectField
              label="Meal Type"
              value={formData.mealType}
              onChange={(val) => set("mealType", val)}
              options={mealplan}
              placeholder="Select meal type"
            />

            <SelectField
              label="Room Type"
              value={formData.roomType}
              onChange={(val) => set("roomType", val)}
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

            <Field label="Status">
              <select
                value={formData.status ?? "Active"}
                onChange={(e) => set("status", e.target.value)}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </Field>

            {/* ── Photo upload with live preview ── */}
            <Field label="Hotel Photo">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {/* show new pick preview */}
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="Preview"
                  style={{
                    marginTop: 8, width: 80, height: 80,
                    objectFit: "cover", borderRadius: 8,
                    border: "1px solid #e2e8f0",
                  }}
                />
              )}
              {/* show existing photo on edit when no new file picked */}
              {!photoPreview && isEdit && formData.existingPhoto && (
                <img
                  src={
                    String(formData.existingPhoto).startsWith("http")
                      ? formData.existingPhoto
                      : `http://192.168.1.74:8000/storage/${formData.existingPhoto}`
                  }
                  alt="Current"
                  style={{
                    marginTop: 8, width: 80, height: 80,
                    objectFit: "cover", borderRadius: 8,
                    border: "1px solid #e2e8f0", opacity: 0.7,
                  }}
                />
              )}
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

            {/* ✅ amenities always array in state */}
            <Field label="Amenities (comma separated)" className="hotel-full">
              <input
                placeholder="e.g. Pool, Wifi, Spa"
                value={Array.isArray(formData.amenities) ? formData.amenities.join(", ") : ""}
                onChange={(e) =>
                  set(
                    "amenities",
                    e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                  )
                }
              />
            </Field>

          </div>

          {/* ─── CONTACT INFORMATION ─── */}
          <div className="hotel-form-section" style={{ marginTop: 24 }}>
            Contact Information
          </div>
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

        {/* ── FOOTER ── */}
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