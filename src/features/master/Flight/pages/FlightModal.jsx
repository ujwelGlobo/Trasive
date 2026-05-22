import { useEffect, useState } from "react";
import { X } from "lucide-react";
import "./Flight.css";

export default function FlightModal({ open, onClose, onSave, form, setForm, isEdit, isSaving }) {
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
    if (name === "name" && !String(value).trim()) return "Flight name is required.";
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
    const newTouched = { name: true };
    const newErrors  = { name: validate("name", form.name) };
    setTouched(newTouched);
    setErrors(newErrors);
    if (newErrors.name) return;
    onSave();
  };

  const hasErrors = !!validate("name", form.name ?? "");

  return (
    <div className="flt-modal-overlay" onClick={onClose}>
      <div className="flt-modal" onClick={(e) => e.stopPropagation()}>

        {/* HEADER */}
        <div className="flt-modal-header">
          <h3>{isEdit ? "Edit Flight" : "Add Flight"}</h3>
          <button className="flt-modal-close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="flt-modal-body">
          <div className="row g-3">

            {/* Flight Name */}
            <div className="col-12">
              <label className="flt-label">Flight Name *</label>
              <input
                className={`flt-input${touched.name && errors.name ? " flt-input-error" : ""}`}
                placeholder="e.g. Emirates"
                value={form.name ?? ""}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
              />
              {touched.name && errors.name && (
                <p className="flt-field-error">{errors.name}</p>
              )}
            </div>

            {/* Status — store as string "1"/"0" for select, convert to number on save */}
            <div className="col-12">
              <label className="flt-label">Status</label>
              <select
                className="flt-input"
                value={
                  form.status !== undefined && form.status !== null
                    ? String(form.status)
                    : "1"
                }
                onChange={(e) => handleChange("status", e.target.value)}
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>

          </div>
        </div>

        {/* FOOTER */}
        <div className="flt-modal-footer">
          <button className="flt-btn-ghost" onClick={onClose} disabled={isSaving}>
            Cancel
          </button>
          <button
            className="flt-btn-primary"
            onClick={handleSave}
            disabled={isSaving || hasErrors}
          >
            {isSaving ? (
              <span className="flt-btn-spinner-wrap">
                <span className="flt-spinner" />
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