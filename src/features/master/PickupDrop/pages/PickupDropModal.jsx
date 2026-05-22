import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Select from "react-select";
import "./PickupDrop.css";

const parseStatus = (val) => {
  const s = String(val ?? "").toLowerCase();
  return s === "1" || s === "true" || s === "active" ? 1 : 0;
};

export default function PickupDropModal({
  open,
  onClose,
  onSave,
  form,
  setForm,
  isEdit,
  isSaving,
  destinations = [],
}) {
  const [touched, setTouched] = useState({});
  const [errors, setErrors]   = useState({});

  useEffect(() => {
    if (open) { setTouched({}); setErrors({}); }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handle = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [open, onClose]);

  if (!open) return null;

  const validate = (name, value) => {
    if (name === "name"        && !String(value ?? "").trim()) return "Location name is required.";
    if (name === "destination" && !value)                      return "Destination is required.";
    return "";
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (touched[key])
      setErrors((prev) => ({ ...prev, [key]: validate(key, value) }));
  };

  const handleBlur = (key) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: validate(key, form[key] ?? "") }));
  };

  const handleSave = () => {
    const required   = ["name", "destination"];
    const newTouched = required.reduce((acc, k) => ({ ...acc, [k]: true }), {});
    const newErrors  = required.reduce((acc, k) => ({ ...acc, [k]: validate(k, form[k] ?? "") }), {});
    setTouched(newTouched);
    setErrors(newErrors);
    if (required.some((k) => newErrors[k])) return;
    onSave();
  };

  // ✅ Only block Save if a touched field has an error
  const hasErrors = ["name", "destination"].some(
    (k) => touched[k] && validate(k, form[k] ?? "") !== ""
  );

  const destinationOptions = destinations.map((d) => ({ value: d.id, label: d.name }));
  const statusValue        = parseStatus(form.status ?? 1);

  return (
    <div className="pd-modal-overlay" onClick={onClose}>
      <div className="pd-modal" onClick={(e) => e.stopPropagation()}>

        {/* HEADER */}
        <div className="pd-modal-header">
          <h3>{isEdit ? "Edit Location" : "Add Location"}</h3>
          <button className="pd-modal-close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="pd-modal-body">
          <div className="row g-3">

            {/* Location Name */}
            <div className="col-md-6">
              <label className="pd-label">
                Location Name <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <input
                className={`pd-input${touched.name && errors.name ? " pd-input-error" : ""}`}
                placeholder="e.g. Kochi Airport Pickup"
                value={form.name ?? ""}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
              />
              {touched.name && errors.name && (
                <p className="pd-field-error">{errors.name}</p>
              )}
            </div>

            {/* Destination Dropdown */}
            <div className="col-md-6">
              <label className="pd-label">
                Destination <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <Select
                options={destinationOptions}
                value={
                  form.destination !== "" && form.destination != null
                    ? destinationOptions.find((o) => o.value === Number(form.destination)) || null
                    : null
                }
                onChange={(selected) => handleChange("destination", selected?.value ?? "")}
                onBlur={() => handleBlur("destination")}
                placeholder="Select destination..."
                isSearchable
              />
              {touched.destination && errors.destination && (
                <p className="pd-field-error">{errors.destination}</p>
              )}
            </div>

            {/* Status */}
            <div className="col-md-6">
              <label className="pd-label">Status</label>
              <select
                className="pd-input"
                value={statusValue}
                onChange={(e) => handleChange("status", Number(e.target.value))}
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>

          </div>
        </div>

        {/* FOOTER */}
        <div className="pd-modal-footer">
          <button className="pd-btn-ghost" onClick={onClose} disabled={isSaving}>
            Cancel
          </button>
          <button
            className="pd-btn-primary"
            onClick={handleSave}
            disabled={isSaving || hasErrors}
          >
            {isSaving ? (
              <span className="pd-btn-spinner-wrap">
                <span className="pd-spinner" />
                {isEdit ? "Updating…" : "Saving…"}
              </span>
            ) : (
              isEdit ? "Update" : "Save"
            )}
          </button>
        </div>

      </div>
    </div>
  );
}