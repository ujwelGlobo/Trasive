import { useState, useEffect } from "react";
import { createDestination, updateDestination } from "../services/DestinationService";
import "../pages/Destination.css";

const MIN_LENGTH = 2;
const MAX_LENGTH = 100;

function validateName(value) {
  const trimmed = value.trim();
  if (!trimmed) return "Destination name is required.";
  if (trimmed.length < MIN_LENGTH) return `Name must be at least ${MIN_LENGTH} characters.`;
  if (trimmed.length > MAX_LENGTH) return `Name must be under ${MAX_LENGTH} characters.`;
  if (!/^[a-zA-Z0-9\s\-',().]+$/.test(trimmed)) return "Name contains invalid characters.";
  return "";
}

const DestinationModal = ({ onClose, initialData, onSuccess, userId }) => {
  const [name, setName]       = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [touched, setTouched] = useState(false);
  const [alert, setAlert]     = useState(null); // { type: "success" | "error", message: string }

  const isEdit = !!initialData;

  useEffect(() => {
    if (initialData) setName(initialData.name ?? "");
  }, [initialData]);

  // Auto-dismiss alert after 3 seconds
  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(null), 3000);
    return () => clearTimeout(timer);
  }, [alert]);

  const handleChange = (e) => {
    const val = e.target.value;
    setName(val);
    if (touched) setError(validateName(val));
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validateName(name));
  };

  const handleSubmit = async () => {
    setTouched(true);
    const validationError = validateName(name);
    if (validationError) { setError(validationError); return; }

    setLoading(true);
    try {
      if (isEdit) {
        await updateDestination(initialData.id, { user_id: userId, name: name.trim(), status: 1 });
        setAlert({ type: "success", message: "Destination updated successfully!" });
      } else {
        await createDestination({ user_id: userId, name: name.trim(), status: 1 });
        setAlert({ type: "success", message: "Destination added successfully!" });
      }
      onSuccess();
      setTimeout(onClose, 1200); // brief pause so user sees the success alert
    } catch (e) {
      setAlert({ type: "error", message: e.message || "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="dest-modal-overlay" onClick={onClose} />

      <div className="dest-modal">

        {/* Header */}
        <div className="dest-modal-header">
          <h3>{isEdit ? "Edit Destination" : "Add Destination"}</h3>
          <button className="dest-modal-close" onClick={onClose}>×</button>
        </div>

        {/* Inline Alert */}
        {alert && (
          <div className={`dest-modal-alert dest-modal-alert--${alert.type}`}>
            <span className="dest-modal-alert-icon">
              {alert.type === "success" ? "✓" : "✕"}
            </span>
            {alert.message}
          </div>
        )}

        {/* Body */}
        <div className="dest-modal-body">
          <label className="dest-field-label">
            Name <span>*</span>
          </label>
          <input
            type="text"
            className={`dest-field-input ${error ? "dest-field-input--error" : ""}`}
            placeholder="Enter destination name"
            autoFocus
            value={name}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          {error && (
            <p className="dest-field-error">
              <span>⚠</span> {error}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="dest-modal-footer">
          <button className="dest-btn-cancel" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button
            className="dest-btn-submit"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving…" : isEdit ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </>
  );
};

export default DestinationModal;