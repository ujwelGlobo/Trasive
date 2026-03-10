import React from "react";
import { X } from "lucide-react";
import Select from "react-select";
import "../pages/MealPlan.css";

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
    <div className="mpm-overlay">

      <div className="mpm-modal">

        {/* HEADER */}

        <div className="mpm-header">

          <div className="mpm-title">
            <h3>{isEdit ? "Edit Meal Plan" : "Add Meal Plan"}</h3>
          </div>

          <button className="mpm-close" onClick={onClose}>
            <X size={18} />
          </button>

        </div>

        {/* BODY */}

        <div className="mpm-body">

          {/* NAME */}

          <div className="mpm-group">

            <label>Meal Plan Name</label>

            <input
              type="text"
              placeholder="Enter meal plan name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

          </div>

          {/* STATUS */}

          <div className="mpm-group">

            <label>Status</label>

            <Select
              classNamePrefix="mpm-select"
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
              menuPlacement="auto"
              styles={{
                menuPortal: (base) => ({
                  ...base,
                  zIndex: 9999,
                }),
              }}
            />

          </div>

        </div>

        {/* FOOTER */}

        <div className="mpm-footer">

          <button className="mpm-cancel" onClick={onClose}>
            Cancel
          </button>

          <button
            className="mpm-save"
            onClick={onSave}
            disabled={!formData.name.trim()}
          >
            Save
          </button>

        </div>

      </div>

    </div>
  );
};

export default MealPlanModal;