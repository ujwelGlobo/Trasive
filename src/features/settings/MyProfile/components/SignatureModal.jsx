import { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./ups-signature-modal.css";

export default function SignatureModal({
  onClose,
  signature,
  onSave,
  loading,
}) {
  const [value, setValue] = useState("");

  /* =========================
     Prefill when editing
  ========================== */
  useEffect(() => {
    if (signature) {
      setValue(signature);
    }
  }, [signature]);

  /* =========================
     Editor change
  ========================== */
  const handleEditorChange = (content) => {
    setValue(content);
  };

  /* =========================
     Save
  ========================== */
  const handleSubmit = () => {
    onSave?.(value);
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
    content_style:
      "body { font-family:Inter,sans-serif; font-size:14px }",
    license_key: "gpl",
  };

  return (
    <>
      {/* Overlay */}
      <div className="modal-overlay" onClick={onClose}/>

      {/* Modal */}
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div className="modal-header">
          <h3>Edit Signature</h3>

          <button onClick={onClose} className="close-btn">
            ×
          </button>
        </div>

        {/* BODY */}
        <div className="modal-body">
          <div className="card full">
            <label>Signature</label>

            <Editor
              tinymceScriptSrc="/tinymce/tinymce.min.js"
              value={value}
              onEditorChange={handleEditorChange}
              init={editorConfig}
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="modal-footer">
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>

          <button
            className="save-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </>
  );
}