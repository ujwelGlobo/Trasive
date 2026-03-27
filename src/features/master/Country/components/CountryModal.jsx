import { X } from "lucide-react";
import "../Pages/Country.css";

export default function CountryModal({
  open,
  onClose,
  onSave,
  form,
  setForm,
  isEdit,
}) {
  if (!open) return null;

  // ✅ Generic change handler (cleaner)
  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ✅ Basic validation
  const isDisabled =
    !form.name.trim() ||
    !form.sortname.trim() ||
    !String(form.phonecode || "").trim()

  return (
    <div className="country-modal__overlay">

      <div className="country-modal__container">

        {/* HEADER */}
        <div className="country-modal__header">
          <h3>{isEdit ? "Edit Country" : "Add Country"}</h3>

          <button
            className="country-modal__close"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="country-modal__body">

          <div className="country-modal__grid">

            {/* Country Name */}
            <div className="country-modal__field">
              <label>Country Name</label>
              <input
                className="country-modal__input"
                placeholder="Enter country name"
                value={form.name}
                onChange={(e) =>
                  handleChange("name", e.target.value)
                }
              />
            </div>

            {/* Sort Name */}
            <div className="country-modal__field">
              <label>Sort Name</label>
              <input
                className="country-modal__input"
                placeholder="Enter sort name (e.g. IN)"
                value={form.sortname}
                onChange={(e) =>
                  handleChange("sortname", e.target.value)
                }
              />
            </div>

            {/* Phone Code */}
            <div className="country-modal__field">
              <label>Phone Code</label>
              <input
                className="country-modal__input"
                placeholder="Enter phone code (e.g. +91)"
                value={form.phonecode}
                onChange={(e) =>
                  handleChange("phonecode", e.target.value)
                }
              />
            </div>

            {/* Status */}
            <div className="country-modal__field">
              <label>Status</label>
              <select
                className="country-modal__select"
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
        <div className="country-modal__footer">

          <button
            className="country-modal__btn country-modal__btn--secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="country-modal__btn country-modal__btn--primary"
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