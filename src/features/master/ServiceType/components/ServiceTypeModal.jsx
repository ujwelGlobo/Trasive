import React from "react";
import { X } from "lucide-react";
import "../pages/ServiceType.css";

const ServiceTypeModal = ({
  open,
  onClose,
  onSave,
  formData,
  setFormData,
  isEdit,
  deleteTarget,
  isDelete,
  onDeleteConfirm,
}) => {

  if (!open) return null;

  /* DELETE CONFIRM VIEW */
  if (isDelete) {
    return (
      <div className="stm-overlay">
        <div className="stm-modal" style={{ maxWidth: 400 }}>

          <div className="stm-header">
            <h3>Delete Service Type</h3>
            <button className="stm-close" onClick={onClose}><X size={18} /></button>
          </div>

          <div className="stm-body">
            <p style={{ margin: 0, fontSize: "0.9rem", color: "#555" }}>
              Are you sure you want to delete <strong>{deleteTarget?.name}</strong>? This action cannot be undone.
            </p>
          </div>

          <div className="stm-footer">
            <button className="stm-cancel" onClick={onClose}>Cancel</button>
            <button className="stm-delete" onClick={onDeleteConfirm}>Delete</button>
          </div>

        </div>
      </div>
    );
  }

  /* ADD / EDIT VIEW */
  return (
    <div className="stm-overlay">
      <div className="stm-modal">

        <div className="stm-header">
          <h3>{isEdit ? "Edit Service Type" : "Add Service Type"}</h3>
          <button className="stm-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="stm-body">
          <div className="stm-group">
            <label>Service Type Name</label>
            <input
              type="text"
              placeholder="Enter service type name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
        </div>

        <div className="stm-footer">
          <button className="stm-cancel" onClick={onClose}>Cancel</button>
          <button
            className="stm-save"
            onClick={onSave}
            disabled={!formData.name.trim()}
          >
            {isEdit ? "Update" : "Save"}
          </button>
        </div>

      </div>
    </div>
  );

};

export default ServiceTypeModal;