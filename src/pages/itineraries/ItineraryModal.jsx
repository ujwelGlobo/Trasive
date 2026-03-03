import { X } from "lucide-react";
import { useState, useEffect } from "react";
import "./Itinerary.css";

export default function ItineraryModal({
  isOpen,
  onClose,
  initialData,
  onSave,
}) {
  const emptyForm = {
    title: "",
    duration: "",
    price: "",
    by: "",
    date: "",
  };

  const [form, setForm] = useState(emptyForm);

  /* Populate form when editing */
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm(emptyForm);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (!form.title.trim()) {
      alert("Title is required");
      return;
    }

    onSave(form);
  };

  // ✅ RETURN AFTER HOOKS
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="itm-overlay-modern" onClick={onClose}></div>

      {/* Modal */}
      <div className="itm-modal-modern" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="itm-header-modern">
          <div>
            <h2>{initialData ? "Edit Itinerary" : "Create Itinerary"}</h2>
            <p>Set up travel details and trip duration</p>
          </div>

          <button className="itm-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="itm-body-modern">
          <div className="itm-group">
            <label>Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="10 Days - Kerala Tour"
            />
          </div>

          <div className="itm-row">
            <div className="itm-group">
              <label>Duration *</label>
              <input
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="5 Days"
              />
            </div>

            <div className="itm-group">
              <label>Price</label>
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="₹0"
              />
            </div>
          </div>

          <div className="itm-row">
            <div className="itm-group">
              <label>Created By</label>
              <input
                name="by"
                value={form.by}
                onChange={handleChange}
                placeholder="Enter name"
              />
            </div>

            <div className="itm-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="itm-footer-modern">
          <button className="itm-cancel-modern" onClick={onClose}>
            Cancel
          </button>

          <button className="itm-save-modern" onClick={handleSubmit}>
            {initialData ? "Update Itinerary" : "Save Itinerary"}
          </button>
        </div>
      </div>
    </>
  );
}
