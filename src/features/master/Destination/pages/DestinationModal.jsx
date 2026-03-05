import { useState, useEffect } from "react";
import "./Destination.css";

const DestinationModal = ({ onClose, initialData }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (initialData) {
      console.log("EDIT destination:", name);
    } else {
      console.log("ADD destination:", name);
    }

    onClose();
  };


  return (
    <>
      <div className="modal-overlay" onClick={onClose} />

      <div className="saas-modal">
        {/* Header */}
        <div className="saas-modal-header">
          <h3>{initialData ? "Edit Destination" : "Add Destination"}</h3>
          <button className="close-btn pb-5" onClick={onClose}>×</button>
        </div>

        {/* Body */}
        <div className="saas-modal-body">
          <label className="field-label">
            Name <span>*</span>
          </label>

          <input
            type="text"
            className="saas-input"
            placeholder="Enter destination name"
            autoFocus
          />
        </div>

        {/* Footer */}
        <div className="saas-modal-footer">
          <button className="saas-btn-primary">
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default DestinationModal;
