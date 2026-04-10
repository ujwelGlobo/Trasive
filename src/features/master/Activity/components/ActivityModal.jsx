import { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
import { useAuth } from "@/core/auth/AuthProvider";
import { getDestinations } from "@/features/master/Destination/services/DestinationService";
import "../pages/Activity.css";

export default function ActivityModal({
  open,
  onClose,
  onSave,
  formData,
  setFormData,
  isEdit,
}) {
  const { user } = useAuth();
  const [destinations, setDestinations] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null); // ✅ fixed memory leak

  useEffect(() => {
    if (!open || !user?.id) return;
    getDestinations(user.id)
      .then((res) => {
        if (res?.data) setDestinations(res.data);
      })
      .catch((err) => console.error("Failed to load destinations:", err));
  }, [open, user?.id]);

  // ✅ Generate preview URL once and revoke on cleanup
  useEffect(() => {
    if (formData.activity_photo instanceof File) {
      const url = URL.createObjectURL(formData.activity_photo);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(formData.activity_photo || null);
    }
  }, [formData.activity_photo]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* Overlay */}
      <div className="actm__overlay" onClick={onClose} />

      {/* Modal — stop propagation so overlay doesn't fire on modal click */}
      <div className="actm__modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="actm__header">
          <div>
            <h3>{isEdit ? "Edit Activity" : "Add Activity"}</h3>
            <p>Manage activity details and visibility</p>
          </div>
          <button className="actm__close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="actm__body">
          <div className="actm__form-grid">
            {/* Activity Name */}
            <div className="actm__field actm__full">
              <label>Activity Name *</label>
              <input
                name="activity_name"
                placeholder="Eg: Jeep Safari"
                value={formData.activity_name || ""}
                onChange={handleChange}
              />
            </div>

            {/* Destination */}
            <div className="actm__field">
              <label>Destination</label>
              <select
                name="destination_name"
                value={formData.destination_name || ""}
                onChange={handleChange}
              >
                <option value="">Select destination</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="actm__field">
              <label>Status *</label>
              <select
                name="status"
                value={formData.status ?? 1}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: Number(e.target.value),
                  }))
                }
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>

            {/* Activity Details */}
            <div className="actm__field actm__full">
              <label>Activity Details</label>
              <textarea
                name="activity_details"
                rows="4"
                placeholder="Describe the activity..."
                value={formData.activity_details || ""}
                onChange={handleChange}
              />
            </div>

            {/* Photo Upload */}
            <div className="actm__field actm__full">
              <label>Activity Photo *</label>

              {/* ✅ Single preview URL from state */}
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="actm__img-preview"
                />
              )}

              <label className="actm__file-upload">
                <Upload size={16} />
                <span>
                  {formData.activity_photo instanceof File
                    ? formData.activity_photo.name
                    : "Upload image"}
                </span>
                <input
                  type="file"
                  hidden
                  accept="image/png, image/jpeg"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      activity_photo: e.target.files[0] ?? null,
                    }))
                  }
                />
              </label>
              <small>PNG, JPG up to 5MB</small>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="actm__footer">
          <button
            className="actm__btn actm__btn--secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="actm__btn actm__btn--primary"
            onClick={onSave}
          >
            {isEdit ? "Update Activity" : "Save Activity"}
          </button>
        </div>
      </div>
    </>
  );
}