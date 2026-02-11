import { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { X } from "lucide-react";
import "./InclusionExclusion.css";

// TinyMCE Core
import "tinymce/tinymce";
import "tinymce/icons/default";
import "tinymce/themes/silver";
import "tinymce/models/dom";

// REQUIRED Skin + Content CSS
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/content/default/content.min.css";

// Plugins
import "tinymce/plugins/lists";
import "tinymce/plugins/link";
import "tinymce/plugins/table";
import "tinymce/plugins/code";


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

  // 🔥 Prefill when editing
  useEffect(() => {
    if (destinationData) {
      setForm((prev) => ({
        ...prev,
        destination: destinationData.name || "",
      }));
    }
  }, [destinationData]);

  // Normal input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // TinyMCE change
  const handleEditorChange = (field, content) => {
    setForm((prev) => ({ ...prev, [field]: content }));
  };

  const handleSubmit = () => {
    if (!form.destination) {
      alert("Destination is required");
      return;
    }

    if (onSave) {
      onSave(form);
    }

    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div className="modal-overlay" onClick={onClose}></div>

      {/* Modal */}
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <h3>
            {destinationData ? "Edit Destination" : "Add Destination"}
          </h3>
          <button onClick={onClose} className="close-btn">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
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
  init={{
    height: 250,
    menubar: true,
    plugins: "lists link table code",
    toolbar:
      "undo redo | bold italic underline | bullist numlist | alignleft aligncenter alignright | link | code",
    license_key: "gpl",   // 👈 VERY IMPORTANT
  }}
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
  value={form.inclusions}
  onEditorChange={(content) =>
    handleEditorChange("exclusions", content)
  }
  init={{
    height: 250,
    menubar: true,
    plugins: "lists link table code",
    toolbar:
      "undo redo | bold italic underline | bullist numlist | alignleft aligncenter alignright | link | code",
    license_key: "gpl",   // 👈 VERY IMPORTANT
  }}
/>


            </div>

          </div>

          {/* IMPORTANT */}
          <div className="card full">
            <label>Important Notes</label>
       <Editor
  tinymceScriptSrc="/tinymce/tinymce.min.js"
  value={form.inclusions}
  onEditorChange={(content) =>
    handleEditorChange("important", content)
  }
  init={{
    height: 250,
    menubar: true,
    plugins: "lists link table code",
    toolbar:
      "undo redo | bold italic underline | bullist numlist | alignleft aligncenter alignright | link | code",
    license_key: "gpl",   // 👈 VERY IMPORTANT
  }}
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

        {/* Footer */}
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
