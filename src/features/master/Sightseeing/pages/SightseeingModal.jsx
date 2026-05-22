import { useEffect, useRef, useState } from "react";
import { X, MapPin, Tag, FileText, Image, Zap, Car } from "lucide-react";
import "./Sightseeing.css";

const parseStatus = (val) => {
  const s = String(val ?? "").toLowerCase();
  return s === "1" || s === "true" || s === "active" ? 1 : 0;
};

export default function SightseeingModal({
  open,
  onClose,
  onSave,
  form,
  setForm,
  isEdit,
  isSaving,
  vehicles    = [],
  destinations = [],
}) {
  const [touched, setTouched] = useState({});
  const [errors,  setErrors]  = useState({});
  const [preview, setPreview] = useState(null);
  const fileRef               = useRef(null);

  /* ── Reset on open ── */
  useEffect(() => {
    if (open) {
      setTouched({});
      setErrors({});
      setPreview(form.photoPreview || null);
    }
  }, [open]);

  /* ── Revoke object URL on unmount / preview change ── */
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  /* ── Escape to close ── */
  useEffect(() => {
    if (!open) return;
    const handle = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [open, onClose]);

  if (!open) return null;

  /* ── Validation ── */
  const validate = (name, value) => {
    if (name === "name" && !String(value ?? "").trim())
      return "Sightseeing name is required.";
    if (name === "destination" && !String(value ?? "").trim())
      return "Destination is required.";
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

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((prev) => ({ ...prev, photo: file }));
    if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = () => {
    const required   = ["name", "destination"];
    const newTouched = required.reduce((acc, k) => ({ ...acc, [k]: true }), {});
    const newErrors  = required.reduce(
      (acc, k) => ({ ...acc, [k]: validate(k, form[k] ?? "") }),
      {}
    );
    setTouched(newTouched);
    setErrors(newErrors);
    if (required.some((k) => newErrors[k])) return;
    onSave();
  };

  const hasErrors = ["name", "destination"].some(
    (k) => validate(k, form[k] ?? "") !== ""
  );

  const statusValue = parseStatus(form.status ?? 1);

  return (
    <div className="ss-modal-overlay" onClick={onClose}>
      <div className="ss-modal ss-modal-xl" onClick={(e) => e.stopPropagation()}>

        {/* HEADER */}
        <div className="ss-modal-header">
          <div>
            <h3>{isEdit ? "Edit Sightseeing" : "Add Sightseeing"}</h3>
            <p>Enter sightseeing details and configuration</p>
          </div>
          <button className="ss-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="ss-modal-body">

          {/* BASIC INFO */}
          <div className="ss-section">Basic Information</div>
          <div className="ss-grid">

            {/* NAME */}
            <div className="ss-field ss-full">
              <label>
                Sightseeing Name <span className="ss-required">*</span>
              </label>
              <div className={`ss-input-wrap${touched.name && errors.name ? " ss-input-error" : ""}`}>
                <span className="ss-input-icon"><Tag size={15} /></span>
                <input
                  type="text"
                  placeholder="e.g. Cherai Sightseeing"
                  value={form.name ?? ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  autoFocus
                />
              </div>
              {touched.name && errors.name && (
                <p className="ss-field-error">{errors.name}</p>
              )}
            </div>

            {/* DESTINATION */}
            <div className="ss-field">
              <label>
                Destination <span className="ss-required">*</span>
              </label>
              <div className={`ss-input-wrap${touched.destination && errors.destination ? " ss-input-error" : ""}`}>
                <span className="ss-input-icon"><MapPin size={15} /></span>
               <select
  value={form.destination ?? ""}
  onChange={(e) => handleChange("destination", e.target.value)}
  onBlur={() => handleBlur("destination")}
>
  <option value="">Select destination</option>
  {destinations.map((d) => (
    <option key={d.id} value={d.name}>
      {d.name}
    </option>
  ))}
</select>
              </div>
              {touched.destination && errors.destination && (
                <p className="ss-field-error">{errors.destination}</p>
              )}
            </div>

            {/* TYPE */}
            <div className="ss-field">
              <label>Type</label>
              <div className="ss-input-wrap">
                <span className="ss-input-icon"><Tag size={15} /></span>
                <select
                  value={form.type ?? ""}
                  onChange={(e) => handleChange("type", e.target.value)}
                >
                  <option value="">Select type</option>
                  <option value="PVT">PVT</option>
                  <option value="Vehicle">SIC</option>
                </select>
              </div>
            </div>

            {/* VEHICLE */}
            <div className="ss-field">
              <label>Vehicle</label>
              <div className="ss-input-wrap">
                <span className="ss-input-icon"><Car size={15} /></span>
                <select
                  value={form.vehicleId ?? ""}
                  onChange={(e) => handleChange("vehicleId", e.target.value)}
                >
                  <option value="">Select vehicle</option>
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* DETAILS */}
            <div className="ss-field ss-full">
              <label>Details</label>
              <div className="ss-textarea-wrap">
                <span className="ss-textarea-icon"><FileText size={15} /></span>
                <textarea
                  placeholder="Enter sightseeing description..."
                  value={form.details ?? ""}
                  onChange={(e) => handleChange("details", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* MEDIA & STATUS */}
          <div className="ss-section">Media &amp; Status</div>
          <div className="ss-grid">

            {/* PHOTO */}
            <div className="ss-field">
              <label>Sightseeing Photo</label>
              <label className="ss-upload" onClick={() => fileRef.current?.click()}>
                <Image size={16} />
                {form.photo instanceof File ? form.photo.name : "Upload Image"}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/png,image/jpeg"
                  hidden
                  onChange={handleFileChange}
                />
              </label>
              {preview && (
                <div className="ss-preview-wrap">
                  <img src={preview} alt="preview" className="ss-preview-img" />
                  <button
                    type="button"
                    className="ss-preview-remove"
                    onClick={() => {
                      if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
                      setPreview(null);
                      setForm((p) => ({ ...p, photo: null }));
                    }}
                  >
                    <X size={12} />
                  </button>
                </div>
              )}
              <small>PNG / JPG up to 5 MB</small>
            </div>

            {/* STATUS */}
            <div className="ss-field">
              <label>Status</label>
              <div className="ss-input-wrap">
                <span className="ss-input-icon"><Zap size={15} /></span>
                <select
                  value={statusValue}
                  onChange={(e) => handleChange("status", Number(e.target.value))}
                >
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* FOOTER */}
        <div className="ss-modal-footer">
          <button className="ss-btn ss-btn-ghost" onClick={onClose} disabled={isSaving}>
            Cancel
          </button>
          <button
            className="ss-btn ss-btn-primary"
            onClick={handleSave}
            disabled={isSaving || hasErrors}
          >
            {isSaving ? (
              <span className="ss-btn-spinner-wrap">
                <span className="ss-spinner" />
                {isEdit ? "Updating…" : "Saving…"}
              </span>
            ) : (
              isEdit ? "Update Sightseeing" : "Save Sightseeing"
            )}
          </button>
        </div>

      </div>
    </div>
  );
}