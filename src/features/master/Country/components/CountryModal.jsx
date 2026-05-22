import { X } from "lucide-react";
import { useEffect, useState } from "react";
import "../Pages/Country.css";

export default function CountryModal({
  open,
  onClose,
  onSave,
  form,
  setForm,
  isEdit,
  isSaving,
}) {
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  /* ── Reset touched/errors when modal opens ── */
  useEffect(() => {
    if (open) {
      setTouched({});
      setErrors({});
    }
  }, [open]);

  /* ── Escape key to close ── */
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  /* ── Validation rules ── */
  const validate = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Country name is required.";
        if (value.trim().length > 100) return "Max 100 characters.";
        return "";
      case "sortname":
        if (!value.trim()) return "Sort name is required.";
        if (value.trim().length > 3) return "Max 3 characters (e.g. IN).";
        return "";
      case "phonecode":
        if (!String(value).trim()) return "Phone code is required.";
        if (!/^\+?\d{1,6}$/.test(String(value).trim()))
          return "Use digits only, optional leading + (e.g. +91).";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (touched[key]) {
      setErrors((prev) => ({ ...prev, [key]: validate(key, value) }));
    }
  };

  const handleBlur = (key) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: validate(key, form[key] ?? "") }));
  };

  const handleSave = () => {
    /* Mark all required fields as touched and revalidate */
    const required = ["name", "sortname", "phonecode"];
    const newTouched = required.reduce((acc, k) => ({ ...acc, [k]: true }), {});
    const newErrors = required.reduce(
      (acc, k) => ({ ...acc, [k]: validate(k, form[k] ?? "") }),
      {}
    );
    setTouched(newTouched);
    setErrors(newErrors);
    if (required.some((k) => newErrors[k])) return;
    onSave();
  };

  const hasErrors = ["name", "sortname", "phonecode"].some((k) => {
    const err = validate(k, form[k] ?? "");
    return err !== "";
  });

  return (
    <div
      className="cty-modal-overlay"
      onClick={onClose} /* backdrop click closes */
    >
      <div
        className="cty-modal"
        onClick={(e) => e.stopPropagation()} /* prevent bubble to overlay */
      >
        {/* HEADER */}
        <div className="cty-modal-header">
          <h3>{isEdit ? "Edit Country" : "Add Country"}</h3>
          <button className="cty-modal-close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="cty-modal-body">
          <div className="row g-3">

            {/* Country Name */}
            <div className="col-md-6">
              <label className="cty-label">Country Name *</label>
              <input
                className={`cty-input${touched.name && errors.name ? " cty-input-error" : ""}`}
                placeholder="e.g. India"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                maxLength={101}
              />
              {touched.name && errors.name && (
                <p className="cty-field-error">{errors.name}</p>
              )}
            </div>

            {/* Sort Name */}
            <div className="col-md-6">
              <label className="cty-label">Sort Name *</label>
              <input
                className={`cty-input${touched.sortname && errors.sortname ? " cty-input-error" : ""}`}
                placeholder="e.g. IN"
                value={form.sortname}
                onChange={(e) => handleChange("sortname", e.target.value)}
                onBlur={() => handleBlur("sortname")}
                maxLength={4}
              />
              {touched.sortname && errors.sortname && (
                <p className="cty-field-error">{errors.sortname}</p>
              )}
            </div>

            {/* Phone Code */}
           <div className="col-md-6">
  <label className="cty-label">Phone Code *</label>
  <input
    className={`cty-input${touched.phonecode && errors.phonecode ? " cty-input-error" : ""}`}
    placeholder="e.g. +91"
    value={form.phonecode}
    onChange={(e) => handleChange("phonecode", e.target.value)}
    onBlur={() => handleBlur("phonecode")}
    maxLength={7}
  />
  {touched.phonecode && errors.phonecode && (
    <p className="cty-field-error">{errors.phonecode}</p>
  )}
</div>

            {/* Status */}
            <div className="col-md-6">
              <label className="cty-label">Status</label>
              <select
                className="cty-input"
                value={form.status}
                onChange={(e) => handleChange("status", Number(e.target.value))}
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>

          </div>
        </div>

        {/* FOOTER */}
        <div className="cty-modal-footer">
          <button className="cty-btn-ghost" onClick={onClose} disabled={isSaving}>
            Cancel
          </button>
          <button
            className="cty-btn-primary"
            onClick={handleSave}
            disabled={isSaving || hasErrors}
          >
            {isSaving ? (
              <span className="cty-btn-spinner-wrap">
                <span className="cty-spinner" />
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