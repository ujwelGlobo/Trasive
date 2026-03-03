import { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { X } from "lucide-react";
import "./InclusionExclusion.css";

export default function InclusionExclusionModal({
  onClose,
  destinationData,
  onSave,
}) {
  const [form, setForm] = useState({
    inclusionTitle: "Inclusions",
    inclusions: "",
    exclusionTitle: "Exclusions",
    exclusions: "",
    important: "",
    destination: "",
  });

  /* =========================
     Prefill when editing
  ========================== */
  useEffect(() => {
    if (destinationData) {
      setForm((prev) => ({
        ...prev,
        destination: destinationData.name || "",
      }));
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
     Editor change
  ========================== */
  const handleEditorChange = (field, content) => {
    setForm((prev) => ({ ...prev, [field]: content }));
  };

  /* =========================
     Save
  ========================== */
  const handleSubmit = () => {
    if (!form.destination.trim()) {
      alert("Destination is required");
      return;
    }

    onSave?.(form);
    onClose();
  };

  /* =========================
     Shared TinyMCE Config
  ========================== */
  const editorConfig = {
    height: 250,
    menubar: true,
    branding: false,
    statusbar: false,
    plugins: "lists link table code",
    toolbar:
      "undo redo | bold italic underline | bullist numlist | alignleft aligncenter alignright | link table | code",
    content_style: "body { font-family:Inter,sans-serif; font-size:14px }",
    license_key: "gpl",
  };

  return (
    <>
      {/* Overlay */}
      <div className="modal-overlay" />

      {/* Modal */}
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div className="modal-header">
          <h3>{destinationData ? "Edit Destination" : "Add Destination"}</h3>

          <button onClick={onClose} className="close-btn">
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="modal-body">
          <div className="form-grid">
            {/* INCLUSIONS */}
            <div className="card">
              <label>Inclusions Title</label>
              <input
                name="inclusionTitle"
                value={form.inclusionTitle}
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

            {/* EXCLUSIONS */}
            <div className="card">
              <label>Exclusions Title</label>
              <input
                name="exclusionTitle"
                value={form.exclusionTitle}
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

          {/* IMPORTANT */}
          <div className="card full">
            <label>Important Notes</label>

            <Editor
              tinymceScriptSrc="/tinymce/tinymce.min.js"
              value={form.important}
              onEditorChange={(content) =>
                handleEditorChange("important", content)
              }
              init={editorConfig}
            />
          </div>

          {/* DESTINATION */}
          <div className="card small">
            <label>Destination *</label>
            <input
              name="destination"
              value={form.destination}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="modal-footer">
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>

          <button className="save-btn" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </>
  );
}
