import { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { X } from "lucide-react";
import { useAuth } from "@/core/auth/AuthProvider";
import { getDestinations } from "@/features/master/Destination/services/DestinationService";
import "../pages/InclusionExclusion.css";

const EMPTY_FORM = {
  inclusion_title: "Inclusions",
  inclusions: "",
  exclusion_title: "Exclusions",
  exclusions: "",
  payments_policy: "",
  cancellation_policy: "",
  cancellation_policy_title: "Cancellation Policy",
  important_tips_title: "",
  destination: "",
};

export default function InclusionExclusionModal({
  onClose,
  destinationData,
  onSave,
  saving,
}) {
  const { user } = useAuth();
  const [form, setForm] = useState(EMPTY_FORM);
  const [destinations, setDestinations] = useState([]);

  /* =========================
     Load destinations dropdown
  ========================== */
  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const userId = user?.id ?? user?.user_id;
        const res = await getDestinations(userId);
        const list = Array.isArray(res) ? res : res.data ?? res.result ?? [];
        setDestinations(list);
      } catch (err) {
        console.error("Failed to load destinations:", err);
      }
    };
    loadDestinations();
  }, [user]);

  /* =========================
     Prefill when editing
  ========================== */
  useEffect(() => {
    if (destinationData) {
      setForm({
        inclusion_title:           destinationData.inclusion_title           || "Inclusions",
        inclusions:                destinationData.inclusions                || "",
        exclusion_title:           destinationData.exclusion_title           || "Exclusions",
        exclusions:                destinationData.exclusions                || "",
        payments_policy:           destinationData.payments_policy           || "",
        cancellation_policy:       destinationData.cancellation_policy       || "",
        cancellation_policy_title: destinationData.cancellation_policy_title || "Cancellation Policy",
        important_tips_title:      destinationData.important_tips_title      || "",
        destination:               destinationData.destination               || "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [destinationData]);

  /* =========================
     Input change
  ========================== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* =========================
     Rich Editor change
  ========================== */
  const handleEditorChange = (field, content) => {
    setForm((prev) => ({ ...prev, [field]: content }));
  };

  /* =========================
     Submit
  ========================== */
  const handleSubmit = () => {
    if (!form.destination) {
      alert("Destination is required");
      return;
    }
    onSave?.(form);
  };

  /* =========================
     Shared TinyMCE Config
  ========================== */
  const editorConfig = {
    height: 220,
    menubar: false,
    branding: false,
    statusbar: false,
    plugins: "lists link table code",
    toolbar:
      "undo redo | bold italic underline | bullist numlist | alignleft aligncenter alignright | link | code",
    content_style: "body { font-family: Inter, sans-serif; font-size: 14px }",
    license_key: "gpl",
  };

  const isEditing = !!destinationData;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />

      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div className="modal-header">
          <h3>{isEditing ? "Edit Destination" : "Add Destination"}</h3>
          <button onClick={onClose} className="close-btn" disabled={saving}>
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="modal-body">

          {/* Destination dropdown */}
          <div className="card small">
            <label>Destination *</label>
            <select
              name="destination"
              value={form.destination}
              onChange={handleChange}
            >
              <option value="">Select Destination</option>
              {destinations.map((d, i) => (
                <option key={`dest-${d.id ?? i}`} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Inclusions + Exclusions */}
          <div className="form-grid">
            <div className="card">
              <label>Inclusions Title</label>
              <input
                name="inclusion_title"
                value={form.inclusion_title}
                onChange={handleChange}
              />
              <label>Inclusions</label>
              <Editor
                tinymceScriptSrc="/tinymce/tinymce.min.js"
                value={form.inclusions}
                onEditorChange={(content) =>
                  handleEditorChange("inclusions", content)
                }
                init={editorConfig}
              />
            </div>

            <div className="card">
              <label>Exclusions Title</label>
              <input
                name="exclusion_title"
                value={form.exclusion_title}
                onChange={handleChange}
              />
              <label>Exclusions</label>
              <Editor
                tinymceScriptSrc="/tinymce/tinymce.min.js"
                value={form.exclusions}
                onEditorChange={(content) =>
                  handleEditorChange("exclusions", content)
                }
                init={editorConfig}
              />
            </div>
          </div>

          {/* Payments Policy + Cancellation Policy */}
          <div className="form-grid">
            <div className="card">
              <label>Payments Policy</label>
              <Editor
                tinymceScriptSrc="/tinymce/tinymce.min.js"
                value={form.payments_policy}
                onEditorChange={(content) =>
                  handleEditorChange("payments_policy", content)
                }
                init={editorConfig}
              />
            </div>

            <div className="card">
              <label>Cancellation Policy Title</label>
              <input
                name="cancellation_policy_title"
                value={form.cancellation_policy_title}
                onChange={handleChange}
              />
              <label>Cancellation Policy</label>
              <Editor
                tinymceScriptSrc="/tinymce/tinymce.min.js"
                value={form.cancellation_policy}
                onEditorChange={(content) =>
                  handleEditorChange("cancellation_policy", content)
                }
                init={editorConfig}
              />
            </div>
          </div>

          {/* Important Tips */}
          <div className="card full">
            <label>Important Tips</label>
            <input
              name="important_tips_title"
              value={form.important_tips_title}
              onChange={handleChange}
              placeholder="e.g. Carry passport and ID proof"
            />
          </div>

        </div>

        {/* FOOTER */}
        <div className="modal-footer">
          <button onClick={onClose} className="cancel-btn" disabled={saving}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleSubmit} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </>
  );
}