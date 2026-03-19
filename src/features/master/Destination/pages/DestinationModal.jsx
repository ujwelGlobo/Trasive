import { useState, useEffect } from "react";
import { createDestination, updateDestination } from "../services/DestinationService"; // 👈 service calls
import "./Destination.css";

const DestinationModal = ({ onClose, initialData, onSuccess, userId }) => {
  const [name, setName]       = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const isEdit = !!initialData;

  useEffect(() => {
    if (initialData) setName(initialData.name);
  }, [initialData]);

  const handleSubmit = async () => {
    const trimmed = name.trim();
    if (!trimmed) { setError("Destination name is required."); return; }
    setLoading(true); setError("");
    try {
      if (isEdit) {
        // PUT /destination/{id}
        await updateDestination(initialData.id, {
          user_id: userId,
          name: trimmed,
          status: 1,
        });
      } else {
        // POST /destination/{userId}
        await createDestination({
          user_id: userId,
          name: trimmed,
          status: 1,
        });
      }
      onSuccess();  // 👈 re-fetches list in parent
      onClose();
    } catch (e) {
      setError(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />

      <div className="saas-modal">
        {/* Header */}
        <div className="saas-modal-header">
          <h3>{isEdit ? "Edit Destination" : "Add Destination"}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* Body */}
        <div className="saas-modal-body">
          <label className="field-label">
            Name <span>*</span>
          </label>
          <input
            type="text"
            className={`saas-input ${error ? "input-error" : ""}`}
            placeholder="Enter destination name"
            autoFocus
            value={name}
            onChange={e => { setName(e.target.value); setError(""); }}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
          />
          {error && <p className="error-msg">{error}</p>}
        </div>

        {/* Footer */}
        <div className="saas-modal-footer">
          <button className="saas-btn-secondary" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button
            className="saas-btn-primary"
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