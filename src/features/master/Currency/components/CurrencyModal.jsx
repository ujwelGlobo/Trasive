import { X } from "lucide-react";
import { useEffect, useState } from "react";
import Select from "react-select";
import "../pages/Currency.css";
import { getCountries } from "../services/Currencyservices ";

export default function CurrencyModal({
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
  const [countries, setCountries] = useState([]);

  /* Reset state when modal opens */
  useEffect(() => {
    if (open) {
      setTouched({});
      setErrors({});
    }
  }, [open]);

  /* Fetch countries */
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await getCountries();
        setCountries(res?.data || []);
      } catch (err) {
        console.error("Country fetch failed:", err);
      }
    };

    if (open) {
      fetchCountries();
    }
  }, [open]);

  /* Escape key */
  useEffect(() => {
    if (!open) return;

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  /* Validation */
  const validate = (name, value) => {
    switch (name) {
      case "name":
        if (!String(value).trim())
          return "Currency name is required.";
        if (String(value).trim().length > 100)
          return "Max 100 characters.";
        return "";

      case "country":
        if (!String(value).trim())
          return "Country is required.";
        return "";

      case "rate":
        if (value === "" || value === null || value === undefined)
          return "Rate is required.";
        if (isNaN(Number(value)) || Number(value) <= 0)
          return "Rate must be a positive number.";
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
    const required = ["name", "country", "rate"];

    const newTouched = required.reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );

    const newErrors = required.reduce(
      (acc, key) => ({ ...acc, [key]: validate(key, form[key] ?? "") }),
      {}
    );

    setTouched(newTouched);
    setErrors(newErrors);

    if (required.some((key) => newErrors[key])) return;

    onSave();
  };

  const hasErrors = ["name", "country", "rate"].some(
    (key) => validate(key, form[key] ?? "") !== ""
  );

  const field = (key, label, extra = {}) => (
    <div>
      <label className="cur-label">
        {label}
        <span style={{ color: "#dc2626" }}>*</span>
      </label>

      <input
        className={`cur-input${touched[key] && errors[key] ? " error" : ""}`}
        value={form[key] ?? ""}
        onChange={(e) => handleChange(key, e.target.value)}
        onBlur={() => handleBlur(key)}
        {...extra}
      />

      {touched[key] && errors[key] && (
        <p className="cur-field-error">{errors[key]}</p>
      )}
    </div>
  );

  /* Only active countries */
  const activeCountries = countries.filter(
    (country) => Number(country.status) === 1
  );

  return (
    <div className="cur-modal-overlay" onClick={onClose}>
      <div className="cur-modal" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="cur-modal-header">
          <h3>{isEdit ? "Edit Currency" : "Add Currency"}</h3>
          <button className="cur-modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="cur-modal-body">
          <div className="row g-3">

            {/* Currency Name */}
            <div className="col-md-6">
              {field("name", "Currency Name", { placeholder: "e.g. Indian Rupee" })}
            </div>

            {/* Country Dropdown */}
            <div className="col-md-6">
              <label className="cur-label">
                Country <span style={{ color: "#dc2626" }}>*</span>
              </label>

              <Select
                options={activeCountries.map((country) => ({
                  value: country.id,
                  label: country.name,
                }))}
                value={
                  activeCountries
                    .map((country) => ({
                      value: country.id,
                      label: country.name,
                    }))
                    .find((option) => option.label === form.country) || null
                }
                onChange={(selected) =>
                  handleChange("country", selected?.label || "")
                }
                onBlur={() => handleBlur("country")}
                placeholder="Select country..."
                isSearchable
              />

              {touched.country && errors.country && (
                <p className="cur-field-error">{errors.country}</p>
              )}
            </div>

            {/* Exchange Rate */}
            <div className="col-md-6">
              {field("rate", "Exchange Rate", {
                type: "number",
                placeholder: "e.g. 1",
                min: "0",
                step: "any",
              })}
            </div>

            {/* Status — value and onChange both use strings "1" / "0" */}
            <div className="col-md-6">
              <label className="cur-label">Status</label>

              <select
                className="cur-input"
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

        {/* Footer */}
        <div className="cur-modal-footer">
          <button
            className="cur-btn-ghost"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </button>

          <button
            className="cur-btn-primary"
            onClick={handleSave}
            disabled={isSaving || hasErrors}
          >
            {isSaving ? (
              <span className="cur-btn-spinner-wrap">
                <span className="cur-spinner" />
                {isEdit ? "Updating..." : "Saving..."}
              </span>
            ) : isEdit ? (
              "Update"
            ) : (
              "Save"
            )}
          </button>
        </div>

      </div>
    </div>
  );
}