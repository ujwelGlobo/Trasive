import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { createRoomType, updateRoomType } from "../services/RoomService";

const RoomTypeModal = ({ data, userId, onClose, onSuccess }) => {
  const [form, setForm] = useState({ name: "", status: 1 });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (data) {
      setForm({ name: data.name ?? "", status: data.status ?? 1 });
    } else {
      setForm({ name: "", status: 1 });
    }
  }, [data]);

  const handleSave = async () => {
    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      if (data) {
        await updateRoomType(data.id, form);
      } else {
        await createRoomType(userId, form);
      }

      onSuccess();
      onClose();
    } catch (e) {
      setError(e.response?.data?.message || e.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />

      <div className="saas-modal">

        <div className="Room-saas-modal-header">
          <h3>{data ? "Edit Room Type" : "Add Room Type"}</h3>

          <button className="Room-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="saas-modal-body">

          <div className="form-group">
            <label>Name *</label>

            <input
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              placeholder="Enter room type name"
            />
          </div>

          <div className="form-group">
            <label>Status *</label>

            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: +e.target.value })
              }
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>

          {error && (
            <p className="error-text">{error}</p>
          )}

        </div>

        <div className="saas-modal-footer">

          <button
            className="btn-secondary-room"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </button>

          <button
            className="btn-primary-room"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving…" : "Save"}
          </button>

        </div>

      </div>
    </>
  );
};

export default RoomTypeModal;