import { useEffect, useState } from "react";
import { X } from "lucide-react";
import "./VehicleCategory.css";

const parseStatus = (val) => {
  const s = String(val ?? "").toLowerCase();
  return s === "1" || s === "true" || s === "active" ? 1 : 0;
};

export default function VehicleCategoryModal({
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
    if (name === "name" && !String(value ?? "").trim()) return "Category name is required.";
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
    const required   = ["name"];
    const newTouched = required.reduce((acc, k) => ({ ...acc, [k]: true }), {});
    const newErrors  = required.reduce((acc, k) => ({ ...acc, [k]: validate(k, form[k] ?? "") }), {});
    setTouched(newTouched);
    setErrors(newErrors);
    if (required.some((k) => newErrors[k])) return;
    onSave();
  };

  const hasErrors = ["name"].some(
    (k) => touched[k] && validate(k, form[k] ?? "") !== ""
  );

  const statusValue = parseStatus(form.status ?? 1);

  return (
    <div className="vc-modal-overlay" onClick={onClose}>
      <div className="vc-modal" onClick={(e) => e.stopPropagation()}>

        {/* HEADER */}
        <div className="vc-modal-header">
          <h3>{isEdit ? "Edit Vehicle Category" : "Add Vehicle Category"}</h3>
          <button className="vc-modal-close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="vc-modal-body">
          <div className="row g-3">

            {/* Name */}
            <div className="col-12">
              <label className="vc-label">
                Category Name <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <input
                className={`vc-input${touched.name && errors.name ? " vc-input-error" : ""}`}
                placeholder="e.g. SUV"
                value={form.name ?? ""}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                autoFocus
              />
              {touched.name && errors.name && (
                <p className="vc-field-error">{errors.name}</p>
              )}
            </div>

            {/* Status */}
            <div className="col-12">
              <label className="vc-label">Status</label>
              <select
                className="vc-input"
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
        <div className="vc-modal-footer">
          <button className="vc-btn-ghost" onClick={onClose} disabled={isSaving}>
            Cancel
          </button>
          <button
            className="vc-btn-primary"
            onClick={handleSave}
            disabled={isSaving || hasErrors}
          >
            {isSaving ? (
              <span className="vc-btn-spinner-wrap">
                <span className="vc-spinner" />
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