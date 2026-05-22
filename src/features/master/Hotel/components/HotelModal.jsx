import { useEffect, useState } from "react";
import { X } from "lucide-react";
import "../pages/Hotel.css";
import { getHotelImageUrl } from "../services/HotelService";

/* ── Reusable field wrapper ── */
const Field = ({ label, error, className = "", children }) => (
  <div className={`hotel-field ${className}`}>
    {label && <label>{label}</label>}
    {children}
    {error && <p className="hotel-field-error">{error}</p>}
  </div>
);

/* ── Reusable select wrapper with error support ── */
const SelectField = ({ label, value, onChange, options, placeholder, error }) => (
  <Field label={label} error={error}>
    <select
      className={error ? "hotel-input-error" : ""}
      value={value ?? ""}
      onChange={(e) => {
        const raw = e.target.value;
        onChange(raw === "" ? "" : Number(raw));
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

/* ── Validation rules ── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (key, value) => {
  switch (key) {
    case "name":
      if (!String(value ?? "").trim()) return "Hotel name is required.";
      return "";
    case "hotel_number":
      if (!String(value ?? "").trim()) return "Hotel number is required.";
      return "";
    case "hotelType":
      if (!value) return "Hotel type is required.";
      return "";
    case "destination":
      if (!value) return "Destination is required.";
      return "";
    case "roomType":
      if (!value) return "Room type is required.";
      return "";
    case "mealType":
      if (!value) return "Meal type is required.";
      return "";
    case "contactPerson":
      if (!String(value ?? "").trim()) return "Sales person name is required.";
      return "";
    case "contactPersonEmail":
      if (!String(value ?? "").trim()) return "Email is required.";
      if (!EMAIL_RE.test(String(value ?? "").trim())) return "Enter a valid email address.";
      return "";
    case "contactPersonPhone":
      if (value && !/^\+?\d{7,15}$/.test(String(value).trim()))
        return "Use digits only, optional leading + (e.g. +919876543210).";
      return "";
    default:
      return "";
  }
};

const REQUIRED = [
  "name", "hotel_number", "hotelType", "destination",
  "roomType", "mealType", "contactPerson", "contactPersonEmail",
];

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
  const [photoPreview, setPhotoPreview] = useState(null);
  const [touched, setTouched]           = useState({});
  const [errors, setErrors]             = useState({});
  const [isSaving, setIsSaving]         = useState(false);

  /* Reset state when modal opens/closes */
  useEffect(() => {
    if (open) {
      setTouched({});
      setErrors({});
      setIsSaving(false);
    } else {
      setPhotoPreview(null);
    }
  }, [open]);

  /* Escape key */
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && !isSaving && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose, isSaving]);

  /* Prefill photo in edit mode */
  useEffect(() => {
    if (open && isEdit && formData.existingPhoto) {
      setPhotoPreview(getHotelImageUrl(formData.existingPhoto));
    }
  }, [open, isEdit, formData.existingPhoto]);

  if (!open) return null;

  const set = (key, val) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
    /* Re-validate on change after first touch */
    if (touched[key]) {
      setErrors((prev) => ({ ...prev, [key]: validate(key, val) }));
    }
  };

  const handleBlur = (key) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: validate(key, formData[key] ?? "") }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    set("hotelPhoto", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  };

  /* Submit — mark all required as touched, block if any error */
  const handleSubmit = async () => {
    const newTouched = REQUIRED.reduce((acc, k) => ({ ...acc, [k]: true }), {});
    const newErrors  = REQUIRED.reduce(
      (acc, k) => ({ ...acc, [k]: validate(k, formData[k] ?? "") }),
      {}
    );
    /* also validate optional phone if filled */
    if (formData.contactPersonPhone) {
      newErrors.contactPersonPhone = validate("contactPersonPhone", formData.contactPersonPhone);
      if (newErrors.contactPersonPhone) newTouched.contactPersonPhone = true;
    }

    setTouched(newTouched);
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) return;

    const fd = new FormData();
    fd.append("name",               formData.name);
    fd.append("hotel_number",       formData.hotel_number);
    fd.append("hotelType",          Number(formData.hotelType));
    fd.append("destination",        Number(formData.destination));
    fd.append("roomType",           Number(formData.roomType));
    fd.append("mealType",           Number(formData.mealType));
    fd.append("address",            formData.address || "");
    fd.append("details",            formData.details || "");
    fd.append("contactPerson",      formData.contactPerson || "");
    fd.append("contactPersonEmail", formData.contactPersonEmail || "");
    fd.append("contactPersonPhone", formData.contactPersonPhone || "");
    fd.append("alternateEmail",     formData.alternateEmail || "");
    fd.append("status",             formData.status ?? 1);
    fd.append("serviceType",        1);
    fd.append("role",               "Supplier");
    fd.append(
      "amenities",
      Array.isArray(formData.amenities) ? formData.amenities.join(",") : ""
    );
    if (formData.hotelPhoto instanceof File) {
      fd.append("hotelPhoto", formData.hotelPhoto);
    }

    try {
      setIsSaving(true);
      await onSave(fd);
    } finally {
      setIsSaving(false);
    }
  };

  /* Live hasErrors check for Save button disabled state */
  const hasErrors = REQUIRED.some((k) => validate(k, formData[k] ?? "") !== "");

  return (
    <>
      <div className="hotel-modal-overlay" onClick={() => !isSaving && onClose()} />

      <div className="hotel-modal">

        {/* HEADER */}
        <div className="hotel-modal-header">
          <div>
            <h3>{isEdit ? "Edit Hotel" : "Add Hotel"}</h3>
            <p>Fill in the hotel information below</p>
          </div>
          <button className="hotelmodalclose" onClick={() => !isSaving && onClose()} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="hotel-modal-body">

          <div className="hotel-form-section">Basic Information</div>

          <div className="hotel-form-grid">

            <Field label="Hotel Name *" error={touched.name && errors.name}>
              <input
                className={touched.name && errors.name ? "hotel-input-error" : ""}
                value={formData.name ?? ""}
                onChange={(e) => set("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                placeholder="e.g. Grand Palace Hotel"
              />
            </Field>

            <SelectField
              label="Hotel Type *"
              value={formData.hotelType}
              onChange={(v) => { set("hotelType", v); handleBlur("hotelType"); }}
              options={categories}
              placeholder="Select hotel type"
              error={touched.hotelType && errors.hotelType}
            />

            <SelectField
              label="Destination *"
              value={formData.destination}
              onChange={(v) => { set("destination", v); handleBlur("destination"); }}
              options={destinations}
              placeholder="Select destination"
              error={touched.destination && errors.destination}
            />

            <Field label="Hotel Number *" error={touched.hotel_number && errors.hotel_number}>
              <input
                className={touched.hotel_number && errors.hotel_number ? "hotel-input-error" : ""}
                value={formData.hotel_number ?? ""}
                onChange={(e) => set("hotel_number", e.target.value)}
                onBlur={() => handleBlur("hotel_number")}
                placeholder="e.g. HTL-001"
              />
            </Field>

            <SelectField
              label="Meal Type *"
              value={formData.mealType}
              onChange={(v) => { set("mealType", v); handleBlur("mealType"); }}
              options={mealplan}
              placeholder="Select meal"
              error={touched.mealType && errors.mealType}
            />

            <SelectField
              label="Room Type *"
              value={formData.roomType}
              onChange={(v) => { set("roomType", v); handleBlur("roomType"); }}
              options={roomType}
              placeholder="Select room"
              error={touched.roomType && errors.roomType}
            />

            <Field label="Status">
              <select
                value={formData.status ?? 1}
                onChange={(e) => set("status", [0, 1].includes(Number(e.target.value)) ? Number(e.target.value) : 1)}
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </Field>

            <Field label="Hotel Photo">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hotel-file-input"
              />
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="preview"
                  style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 6, marginTop: 6 }}
                />
              )}
            </Field>

            <Field label="Address" className="hotel-full">
              <textarea
                value={formData.address ?? ""}
                onChange={(e) => set("address", e.target.value)}
                placeholder="Full hotel address"
              />
            </Field>

            <Field label="Details" className="hotel-full">
              <textarea
                value={formData.details ?? ""}
                onChange={(e) => set("details", e.target.value)}
                placeholder="Additional details about the hotel"
              />
            </Field>

            <Field label="Amenities" className="hotel-full">
              <input
                value={Array.isArray(formData.amenities) ? formData.amenities.join(", ") : ""}
                onChange={(e) =>
                  set("amenities", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))
                }
                placeholder="e.g. WiFi, Pool, Gym (comma separated)"
              />
            </Field>

          </div>

          <div className="hotel-form-section">Contact</div>

          <div className="hotel-form-grid">

            <Field label="Sales Person *" error={touched.contactPerson && errors.contactPerson}>
              <input
                className={touched.contactPerson && errors.contactPerson ? "hotel-input-error" : ""}
                value={formData.contactPerson ?? ""}
                onChange={(e) => set("contactPerson", e.target.value)}
                onBlur={() => handleBlur("contactPerson")}
                placeholder="Full name"
              />
            </Field>

            <Field label="Phone" error={touched.contactPersonPhone && errors.contactPersonPhone}>
              <input
                className={touched.contactPersonPhone && errors.contactPersonPhone ? "hotel-input-error" : ""}
                value={formData.contactPersonPhone ?? ""}
                onChange={(e) => set("contactPersonPhone", e.target.value)}
                onBlur={() => handleBlur("contactPersonPhone")}
                placeholder="e.g. +919876543210"
              />
            </Field>

            <Field label="Email *" error={touched.contactPersonEmail && errors.contactPersonEmail}>
              <input
                className={touched.contactPersonEmail && errors.contactPersonEmail ? "hotel-input-error" : ""}
                value={formData.contactPersonEmail ?? ""}
                onChange={(e) => set("contactPersonEmail", e.target.value)}
                onBlur={() => handleBlur("contactPersonEmail")}
                placeholder="e.g. sales@hotel.com"
                type="email"
              />
            </Field>

            <Field label="Alt Email">
              <input
                value={formData.alternateEmail ?? ""}
                onChange={(e) => set("alternateEmail", e.target.value)}
                placeholder="e.g. info@hotel.com"
                type="email"
              />
            </Field>

          </div>
        </div>

        {/* FOOTER */}
        <div className="hotel-modal-footer">
          <button
            className="hotel-btn-secondary"
            onClick={() => !isSaving && onClose()}
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            className="hotel-btn-primary"
            onClick={handleSubmit}
            disabled={isSaving || hasErrors}
          >
            {isSaving ? (
              <span className="hotel-btn-spinner-wrap">
                <span className="hotel-spinner" />
                {isEdit ? "Updating…" : "Saving…"}
              </span>
            ) : (
              isEdit ? "Update" : "Save"
            )}
          </button>
        </div>

      </div>
    </>
  );
};

export default HotelModal;