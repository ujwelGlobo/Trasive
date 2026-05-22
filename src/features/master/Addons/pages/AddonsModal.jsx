import { useEffect, useState } from "react";
import { X } from "lucide-react";
import "../pages/Addons.css";

const parseStatus = (val) => {
  const s = String(val ?? "").toLowerCase();
  return s === "1" || s === "true" || s === "active" ? 1 : 0;
};

export default function AddonModal({
  open,
  onClose,
  onSave,
  form,
  setForm,
  isEdit,
  isSaving,
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
    if (name === "name"    && !String(value ?? "").trim()) return "Addon name is required.";
    if (name === "details" && !String(value ?? "").trim()) return "Details are required.";
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
    const required   = ["name", "details"];
    const newTouched = required.reduce((acc, k) => ({ ...acc, [k]: true }), {});
    const newErrors  = required.reduce((acc, k) => ({ ...acc, [k]: validate(k, form[k] ?? "") }), {});
    setTouched(newTouched);
    setErrors(newErrors);
    if (required.some((k) => newErrors[k])) return;
    onSave();
  };

  const hasErrors = ["name", "details"].some(
    (k) => touched[k] && validate(k, form[k] ?? "") !== ""
  );

  const statusValue = parseStatus(form.status ?? 1);

  return (
    <div className="addon-modal-overlay" onClick={onClose}>
      <div className="addon-modal" onClick={(e) => e.stopPropagation()}>

        {/* HEADER — FIX #2 solid blue, FIX #15 no subtitle p tag */}
        <div className="addon-modal-header">
          <h3>{isEdit ? "Edit Addon" : "Add Addon"}</h3>
          <button className="addon-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="addon-modal-body">

          {/* Addon Name */}
          <div className="addon-form-group">
            <label>
              Addon Name <span style={{ color: "#dc2626" }}>*</span>
            </label>
            <input
              className={touched.name && errors.name ? "addon-input-error" : ""}
              placeholder="e.g. Candle Light Dinner"
              value={form.name ?? ""}
              onChange={(e) => handleChange("name", e.target.value)}
              onBlur={() => handleBlur("name")}
            />
            {touched.name && errors.name && (
              <p className="addon-field-error">{errors.name}</p>
            )}
          </div>

          {/* Status */}
          <div className="addon-form-group">
            <label>Status</label>
            <select
              value={statusValue}
              onChange={(e) => handleChange("status", Number(e.target.value))}
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>

          {/* Details */}
          <div className="addon-form-group">
            <label>
              Details <span style={{ color: "#dc2626" }}>*</span>
            </label>
            <textarea
              className={touched.details && errors.details ? "addon-input-error" : ""}
              placeholder="e.g. A romantic candlelight dinner..."
              rows={4}
              value={form.details ?? ""}
              onChange={(e) => handleChange("details", e.target.value)}
              onBlur={() => handleBlur("details")}
            />
            {touched.details && errors.details && (
              <p className="addon-field-error">{errors.details}</p>
            )}
          </div>

        </div>

        {/* FOOTER */}
        <div className="addon-modal-footer">
          <button className="addon-btn-secondary" onClick={onClose} disabled={isSaving}>
            Cancel
          </button>
          {/* FIX #14: spinner matching PickupDrop */}
          <button
            className="addon-btn-primary"
            onClick={handleSave}
            disabled={isSaving || hasErrors}
          >
            {isSaving ? (
              <>
                <span className="addon-spinner" />
                {isEdit ? "Updating…" : "Saving…"}
              </>
            ) : (
              isEdit ? "Update" : "Save"
            )}
          </button>
        </div>

      </div>
    </div>
  );
}