import { X } from "lucide-react";

const RoomTypeModal = ({ data, onClose }) => {
  return (
    <>
      {/* OVERLAY */}
      <div className="modal-overlay" onClick={onClose} />

      {/* MODAL */}
      <div className="saas-modal">
        {/* HEADER */}
        <div className="saas-modal-header">
          <h3>{data ? "Edit Room Type" : "Add Room Type"}</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="saas-modal-body">
          <div className="form-group">
            <label>
              Name <span>*</span>
            </label>
            <input
              type="text"
              defaultValue={data?.name || ""}
              placeholder="Enter room type name"
            />
          </div>

          <div className="form-group">
            <label>Status *</label>
            <select defaultValue={data?.status || "Active"}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        {/* FOOTER */}
        <div className="saas-modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary">
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default RoomTypeModal;
