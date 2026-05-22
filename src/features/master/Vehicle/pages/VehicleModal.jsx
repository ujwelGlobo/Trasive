import { useEffect, useState } from "react";
import { X } from "lucide-react";
import "./Vehicle.css";

const parseStatus = (val) => {
  const s = String(val ?? "").toLowerCase();
  return s === "1" || s === "true" || s === "active" ? 1 : 0;
};

export default function VehicleModal({
  open,
  onClose,
  onSave,
  form,
  setForm,
  isEdit,
  isSaving,
  categories = [], // array of { id, name }
  suppliers = [],  // array of { company } from listsuppliers API
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
    if (name === "name" && !String(value ?? "").trim())
      return "Vehicle name is required.";
    if (name === "vehicleCategoryId" && !value)
      return "Vehicle category is required.";
    if (name === "pax") {
      const n = Number(value);
      if (!String(value ?? "").trim()) return "Pax (capacity) is required.";
      if (isNaN(n) || n < 1)           return "Pax must be a positive number.";
    }
    if (name === "vehicle_cost") {
      if (String(value ?? "").trim() === "") return ""; // optional
      const n = Number(value);
      if (isNaN(n) || n < 0) return "Vehicle cost must be a non-negative number.";
    }
    if (name === "minumumKM") {
      if (String(value ?? "").trim() === "") return ""; // optional
      const n = Number(value);
      if (isNaN(n) || n < 0) return "Minimum KM must be a non-negative number.";
    }
    if (name === "minumumKM_Rate") {
      if (String(value ?? "").trim() === "") return ""; // optional
      const n = Number(value);
      if (isNaN(n) || n < 0) return "Minimum KM rate must be a non-negative number.";
    }
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
    const required   = ["name", "vehicleCategoryId", "pax"];
    const optional   = ["vehicle_cost", "minumumKM", "minumumKM_Rate"];
    const allFields  = [...required, ...optional];
    const newTouched = allFields.reduce((acc, k) => ({ ...acc, [k]: true }), {});
    const newErrors  = allFields.reduce(
      (acc, k) => ({ ...acc, [k]: validate(k, form[k] ?? "") }),
      {}
    );
    setTouched(newTouched);
    setErrors(newErrors);
    if (allFields.some((k) => newErrors[k])) return;
    onSave();
  };

  const hasErrors = ["name", "vehicleCategoryId", "pax", "vehicle_cost", "minumumKM", "minumumKM_Rate"].some(
    (k) => touched[k] && validate(k, form[k] ?? "") !== ""
  );

  const statusValue = parseStatus(form.status ?? 1);

  return (
    <div className="vc-modal-overlay" onClick={onClose}>
      <div className="vc-modal" onClick={(e) => e.stopPropagation()}>

        {/* HEADER */}
        <div className="vc-modal-header">
          <h3>{isEdit ? "Edit Vehicle" : "Add Vehicle"}</h3>
          <button className="vc-modal-close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="vc-modal-body">
          <div className="row g-3">

            {/* Vehicle Category */}
            <div className="col-12">
              <label className="vc-label">
                Vehicle Category <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <select
                className={`vc-input${touched.vehicleCategoryId && errors.vehicleCategoryId ? " vc-input-error" : ""}`}
                value={form.vehicleCategoryId ?? ""}
                onChange={(e) => handleChange("vehicleCategoryId", e.target.value)}
                onBlur={() => handleBlur("vehicleCategoryId")}
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              {touched.vehicleCategoryId && errors.vehicleCategoryId && (
                <p className="vc-field-error">{errors.vehicleCategoryId}</p>
              )}
            </div>

            {/* Name */}
            <div className="col-12">
              <label className="vc-label">
                Name <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <input
                className={`vc-input${touched.name && errors.name ? " vc-input-error" : ""}`}
                placeholder="e.g. Toyota Fortuner"
                value={form.name ?? ""}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                autoFocus
              />
              {touched.name && errors.name && (
                <p className="vc-field-error">{errors.name}</p>
              )}
            </div>

            {/* Pax */}
            <div className="col-md-6">
              <label className="vc-label">
                Pax (Capacity) <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <input
                className={`vc-input${touched.pax && errors.pax ? " vc-input-error" : ""}`}
                placeholder="e.g. 6"
                type="number"
                min="1"
                value={form.pax ?? ""}
                onChange={(e) => handleChange("pax", e.target.value)}
                onBlur={() => handleBlur("pax")}
              />
              {touched.pax && errors.pax && (
                <p className="vc-field-error">{errors.pax}</p>
              )}
            </div>

            {/* Vehicle Cost */}
            <div className="col-md-6">
              <label className="vc-label">Vehicle Cost</label>
              <input
                className={`vc-input${touched.vehicle_cost && errors.vehicle_cost ? " vc-input-error" : ""}`}
                placeholder="e.g. 10000"
                type="number"
                min="0"
                value={form.vehicle_cost ?? ""}
                onChange={(e) => handleChange("vehicle_cost", e.target.value)}
                onBlur={() => handleBlur("vehicle_cost")}
              />
              {touched.vehicle_cost && errors.vehicle_cost && (
                <p className="vc-field-error">{errors.vehicle_cost}</p>
              )}
            </div>

            {/* Minimum KM */}
            <div className="col-md-6">
              <label className="vc-label">Minimum KM</label>
              <input
                className={`vc-input${touched.minumumKM && errors.minumumKM ? " vc-input-error" : ""}`}
                placeholder="e.g. 50"
                type="number"
                min="0"
                value={form.minumumKM ?? ""}
                onChange={(e) => handleChange("minumumKM", e.target.value)}
                onBlur={() => handleBlur("minumumKM")}
              />
              {touched.minumumKM && errors.minumumKM && (
                <p className="vc-field-error">{errors.minumumKM}</p>
              )}
            </div>

            {/* Minimum KM Rate */}
            <div className="col-md-6">
              <label className="vc-label">Minimum KM Rate</label>
              <input
                className={`vc-input${touched.minumumKM_Rate && errors.minumumKM_Rate ? " vc-input-error" : ""}`}
                placeholder="e.g. 2500"
                type="number"
                min="0"
                value={form.minumumKM_Rate ?? ""}
                onChange={(e) => handleChange("minumumKM_Rate", e.target.value)}
                onBlur={() => handleBlur("minumumKM_Rate")}
              />
              {touched.minumumKM_Rate && errors.minumumKM_Rate && (
                <p className="vc-field-error">{errors.minumumKM_Rate}</p>
              )}
            </div>

            {/* Supplier */}
            <div className="col-12">
              <label className="vc-label">Supplier</label>
              <select
                className="vc-input"
                value={form.supplierId ?? ""}
                onChange={(e) => handleChange("supplierId", e.target.value)}
              >
                <option value="">Select supplier</option>
                {suppliers.map((s, idx) => (
                  <option key={s.id ?? idx} value={s.id}>
                    {s.company}
                  </option>
                ))}
              </select>
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