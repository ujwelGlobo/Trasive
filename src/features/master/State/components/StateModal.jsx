import { X } from "lucide-react";
import "../Pages/State.css";

export default function StateModal({
  open,
  onClose,
  onSave,
  form,
  setForm,
  isEdit,
  countries = [],
}) {
  if (!open) return null;

  // ✅ clean handler
  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ✅ validation
  const isDisabled =
    !form.name?.toString().trim() ||
    !form.countryId;

  return (
    <div className="state-modal__overlay">

      <div className="state-modal__container">

        {/* HEADER */}
        <div className="state-modal__header">
          <h3>{isEdit ? "Edit State" : "Add State"}</h3>

          <button
            className="state-modal__close"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="state-modal__body">

          <div className="state-modal__grid">

            {/* Country Dropdown */}
            <div className="state-modal__field">
              <label>Country</label>

              <select
                className="state-modal__select"
                value={form.countryId || ""}
                onChange={(e) =>
                  handleChange("countryId", Number(e.target.value))
                }
              >
                <option value="">Select Country</option>

                {countries.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* State Name */}
            <div className="state-modal__field">
              <label>State Name</label>

              <input
                className="state-modal__input"
                placeholder="Enter state name"
                value={form.name}
                onChange={(e) =>
                  handleChange("name", e.target.value)
                }
              />
            </div>

            {/* Status */}
            <div className="state-modal__field">
              <label>Status</label>

              <select
                className="state-modal__select"
                value={form.status}
                onChange={(e) =>
                  handleChange("status", Number(e.target.value))
                }
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>

          </div>

        </div>

        {/* FOOTER */}
        <div className="state-modal__footer">

          <button
            className="state-modal__btn state-modal__btn--secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="state-modal__btn state-modal__btn--primary"
            onClick={onSave}
            disabled={isDisabled}
          >
            {isEdit ? "Update" : "Save"}
          </button>

        </div>

      </div>

    </div>
  );
}