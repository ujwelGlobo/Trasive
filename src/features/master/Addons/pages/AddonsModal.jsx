import React from "react";
import { X } from "lucide-react";
import Select from "react-select";
import "./Addons.css";

const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

const AddonsModal = ({
  open,
  onClose,
  onSave,
  formData,
  setFormData,
  isEdit,
}) => {
  if (!open) return null;

  return (
    <div className="addon-modal-overlay">
      <div className="addon-modal">

        {/* HEADER */}
        <div className="addon-modal-header">
          <div>
            <h3>{isEdit ? "Edit Addon" : "Create Addon"}</h3>
            <p>Manage addon details</p>
          </div>

          <button className="addon-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="addon-divider" />

        {/* BODY */}
        <div className="addon-modal-body">

          <div className="addon-form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter addon name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="addon-form-group">
            <label>Status</label>

            <Select
              classNamePrefix="addon-select"
              options={statusOptions}
              value={statusOptions.find(
                (opt) => opt.value === formData.status
              )}
              onChange={(selected) =>
                setFormData({ ...formData, status: selected.value })
              }
              isSearchable={false}
              menuPortalTarget={document.body}
              menuPosition="fixed"
              styles={{
                menuPortal: (base) => ({
                  ...base,
                  zIndex: 9999,
                }),

                control: (base, state) => ({
                  ...base,
                  borderRadius: "12px",
                  borderColor: state.isFocused ? "#2563eb" : base.borderColor,
                  boxShadow: state.isFocused
                    ? "0 0 0 3px rgba(37, 99, 235, 0.15)"
                    : "none",
                  "&:hover": {
                    borderColor: state.isFocused
                      ? "#2563eb"
                      : base.borderColor,
                  },
                }),

                menu: (base) => ({
                  ...base,
                  borderRadius: "14px",
                  overflow: "hidden",
                  marginTop: "6px",
                }),

                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected
                    ? "#2563eb"
                    : state.isFocused
                    ? "#eff6ff"
                    : "transparent",
                  color: state.isSelected ? "#ffffff" : "#0f172a",
                }),
              }}
            />
          </div>
        </div>

        <div className="addon-divider" />

        {/* FOOTER */}
        <div className="addon-modal-footer">
          <button className="addon-btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="addon-btn-primary" onClick={onSave}>
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddonsModal;
