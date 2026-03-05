import { X } from "lucide-react";
import { useState, useEffect } from "react";
import "./ClientsGroup.css";

export default function ClientsGroupModal({
  isOpen,
  onClose,
  mode,
  initialData,
  onSave,
}) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "Active",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({ name: "", description: "", status: "Active" });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name.trim()) return alert("Group name required");
    onSave(form);
  };

  return (
    <div className="clgrpmdl-overlay">
      <div className="clgrpmdl-modal">
        <div className="clgrpmdl-header">
          <h2>{mode === "edit" ? "Edit Client Group" : "Add Client Group"}</h2>
          <button className="clgrpmdl-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="clgrpmdl-body">
          <div className="clgrpmdl-field">
            <label>Group Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="clgrpmdl-field">
            <label>Description</label>
            <textarea
              name="description"
              rows="3"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="clgrpmdl-field">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <div className="clgrpmdl-footer">
          <button className="clgrpmdl-save-btn" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
