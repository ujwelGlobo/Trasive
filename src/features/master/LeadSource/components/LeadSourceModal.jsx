import { X } from "lucide-react";
import "../pages/LeadSource.css";

export default function LeadSourceModal({
  open,
  onClose,
  onSave,
  form,
  setForm,
  isEdit,
}) {
  if (!open) return null;

  const isDisabled = !form.name.trim();

  return (
    <div className="lsm-backdrop">

      <div className="lsm-modal">

        {/* HEADER */}
        <div className="lsm-header">
          <h3>{isEdit ? "Edit Lead Source" : "Add Lead Source"}</h3>

          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="lsm-body container-fluid">

          <div className="row g-3">

            <div className="col-12">
              <label className="form-label">Lead Source Name</label>

              <input
                className="form-control"
                placeholder="Enter lead source name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>

            <div className="col-12">
              <label className="form-label">Status</label>

              <select
                className="form-select"
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: Number(e.target.value),
                  })
                }
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>

          </div>

        </div>

        {/* FOOTER */}
        <div className="lsm-footer">

          <button
            className="btn btn-outline-secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn btn-primary"
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