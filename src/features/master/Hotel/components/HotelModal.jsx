import { useEffect, useState } from "react";
import { X } from "lucide-react";
import "../pages/Hotel.css";
import { getHotelImageUrl } from "../services/HotelService";

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

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    if (!open) {
      setPhotoPreview(null);
    }
  }, [open]);

  /* EXISTING PHOTO PREFETCH */
  useEffect(() => {
    if (open && isEdit && formData.existingPhoto) {
      setPhotoPreview(getHotelImageUrl(formData.existingPhoto));
    }
  }, [open, isEdit, formData.existingPhoto]);

  if (!open) return null;

  const set = (key, val) =>
    setFormData((prev) => ({ ...prev, [key]: val }));

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

  const handleSubmit = () => {
    if (!formData.name?.trim()) return alert("Hotel name is required");
    if (!formData.hotel_number?.trim()) return alert("Hotel number is required");
    if (!formData.hotelType) return alert("Hotel Type is required");
    if (!formData.destination) return alert("Destination is required");
    if (!formData.roomType) return alert("Room Type is required");
    if (!formData.mealType) return alert("Meal Type is required");
    if (!formData.contactPerson?.trim()) return alert("Sales Person name is required");
    if (!formData.contactPersonEmail?.trim()) return alert("Sales Person email is required");

    const fd = new FormData();

    fd.append("name", formData.name);
    fd.append("hotel_number", formData.hotel_number);
    fd.append("hotelType", Number(formData.hotelType));
    fd.append("destination", Number(formData.destination));
    fd.append("roomType", Number(formData.roomType));
    fd.append("mealType", Number(formData.mealType));
    fd.append("address", formData.address || "");
    fd.append("details", formData.details || "");
    fd.append("contactPerson", formData.contactPerson || "");
    fd.append("contactPersonEmail", formData.contactPersonEmail || "");
    fd.append("contactPersonPhone", formData.contactPersonPhone || "");
    fd.append("alternateEmail", formData.alternateEmail || "");
    fd.append("status", formData.status ?? 1);
    fd.append("serviceType", 1);
    fd.append("role", "Supplier");

    fd.append(
      "amenities",
      Array.isArray(formData.amenities)
        ? formData.amenities.join(",")
        : ""
    );

    if (formData.hotelPhoto instanceof File) {
      fd.append("hotelPhoto", formData.hotelPhoto);
    }

    onSave(fd);
  };

  return (
    <>
      <div className="hotel-modal-overlay" onClick={onClose} />

      <div className="hotel-modal">
        <div className="hotel-modal-header">
          <div>
            <h3>{isEdit ? "Edit Hotel" : "Add Hotel"}</h3>
            <p>Fill in the hotel information below</p>
          </div>

          <button className="hotelmodalclose" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="hotel-modal-body">

          <div className="hotel-form-section">Basic Information</div>

          <div className="hotel-form-grid">

            <Field label="Hotel Name *">
              <input
                value={formData.name ?? ""}
                onChange={(e) => set("name", e.target.value)}
              />
            </Field>

            <SelectField
              label="Hotel Type *"
              value={formData.hotelType}
              onChange={(v) => set("hotelType", v)}
              options={categories}
              placeholder="Select hotel type"
            />

            <SelectField
              label="Destination *"
              value={formData.destination}
              onChange={(v) => set("destination", v)}
              options={destinations}
              placeholder="Select destination"
            />

            <Field label="Hotel Number *">
              <input
                value={formData.hotel_number ?? ""}
                onChange={(e) => set("hotel_number", e.target.value)}
              />
            </Field>

            <SelectField
              label="Meal Type *"
              value={formData.mealType}
              onChange={(v) => set("mealType", v)}
              options={mealplan}
              placeholder="Select meal"
            />

            <SelectField
              label="Room Type *"
              value={formData.roomType}
              onChange={(v) => set("roomType", v)}
              options={roomType}
              placeholder="Select room"
            />

            <Field label="Status">
              <select
                value={formData.status ?? 1}
                onChange={(e) => set("status", Number(e.target.value))}
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
              />

              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="preview"
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 6,
                    marginTop: 6,
                  }}
                />
              )}
            </Field>

            <Field label="Address" className="hotel-full">
              <textarea
                value={formData.address ?? ""}
                onChange={(e) => set("address", e.target.value)}
              />
            </Field>

            <Field label="Details" className="hotel-full">
              <textarea
                value={formData.details ?? ""}
                onChange={(e) => set("details", e.target.value)}
              />
            </Field>

            <Field label="Amenities" className="hotel-full">
              <input
                value={
                  Array.isArray(formData.amenities)
                    ? formData.amenities.join(", ")
                    : ""
                }
                onChange={(e) =>
                  set(
                    "amenities",
                    e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean)
                  )
                }
              />
            </Field>
          </div>

          <div className="hotel-form-section">Contact</div>

          <div className="hotel-form-grid">
            <Field label="Sales Person *">
              <input
                value={formData.contactPerson ?? ""}
                onChange={(e) => set("contactPerson", e.target.value)}
              />
            </Field>

            <Field label="Phone">
              <input
                value={formData.contactPersonPhone ?? ""}
                onChange={(e) =>
                  set("contactPersonPhone", e.target.value)
                }
              />
            </Field>

            <Field label="Email *">
              <input
                value={formData.contactPersonEmail ?? ""}
                onChange={(e) =>
                  set("contactPersonEmail", e.target.value)
                }
              />
            </Field>

            <Field label="Alt Email">
              <input
                value={formData.alternateEmail ?? ""}
                onChange={(e) =>
                  set("alternateEmail", e.target.value)
                }
              />
            </Field>
          </div>
        </div>

        <div className="hotel-modal-footer">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>
            {isEdit ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </>
  );
};

export default HotelModal;