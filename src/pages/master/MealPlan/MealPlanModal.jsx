import React from "react";
import { X } from "lucide-react";
import Select from "react-select";
import "./MealPlan.css";

const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

const MealPlanModal = ({
  open,
  onClose,
  onSave,
  formData,
  setFormData,
  isEdit,
}) => {
  if (!open) return null;

  return (
    <div className="saas-modal-overlay">
      <div className="saas-modal">
        {/* Header */}
        <div className="Meal-modal-header">
          <div>
            <h3>{isEdit ? "Edit Meal Plan" : "Create Meal Plan"}</h3>
            <p>Manage meal plan details</p>
          </div>

          <button className="icons-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="divider" />

        {/* Body */}
        <div className="saas-modal-body">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter meal plan name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          {/* ✅ React Select */}
          <div className="form-group">
            <label>Status</label>
          <Select
  classNamePrefix="saas-select"
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

    /* 🔹 Main input */
    control: (base, state) => ({
      ...base,
      borderRadius: "12px",          // 👈 rounded input
      borderColor: state.isFocused ? "#0ad859" : base.borderColor,
      boxShadow: state.isFocused
        ? "0 0 0 3px rgba(10, 216, 89, 0.15)"
        : "none",
      "&:hover": {
        borderColor: state.isFocused ? "#0ad859" : base.borderColor,
      },
    }),

    /* 🔹 Dropdown menu */
    menu: (base) => ({
      ...base,
      borderRadius: "14px",          // 👈 rounded dropdown
      overflow: "hidden",            // 👈 IMPORTANT
      marginTop: "6px",
    }),

    /* 🔹 Options */
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#6f7270"
        : state.isFocused
        ? "#f0fdf4"
        : "transparent",
      color: state.isSelected ? "#ffffff" : "#0f172a",
      "&:active": {
        backgroundColor: "#666666",
      },
    }),
  }}
/>

          </div>
        </div>

        <div className="divider" />

        {/* Footer */}
        <div className="saas-modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btns-primary" onClick={onSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealPlanModal;
