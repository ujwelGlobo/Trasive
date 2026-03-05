import { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./EmailTemplateForm.css";

/* -------- MOCK DATABASE -------- */
const mockTemplates = [
  {
    id: "202565539",
    name: "Kerala Magic",
    subject: "Kerala Magic",
    body: "<p>Welcome to Kerala</p>",
  },
  {
    id: "202565538",
    name: "Landing Page Mail",
    subject: "Landing page offer",
    body: "<p>Special offer</p>",
  },
];

export default function EmailTemplateForm({ mode }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const isView = mode === "view";
  const isEdit = mode === "edit";
  const isAdd = mode === "add";

  const [form, setForm] = useState({
    name: "",
    subject: "",
    body: "",
  });

  /* -------- LOAD DATA FOR EDIT / VIEW -------- */
  useEffect(() => {
    if ((isEdit || isView) && id) {
      const data = mockTemplates.find((t) => t.id === id);

      if (data) {
        setForm(data);
      } else {
        alert("Template not found");
        navigate("/marketing/email-templates");
      }
    }
  }, [id, isEdit, isView, navigate]);

  /* -------- INPUT CHANGE -------- */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* -------- SAVE -------- */
  const handleSave = () => {
    if (!form.name.trim()) {
      alert("Template name required");
      return;
    }

    if (isAdd) {
      console.log("ADD TEMPLATE", form);
    }

    if (isEdit) {
      console.log("UPDATE TEMPLATE", id, form);
    }

    navigate("/marketing/email-templates");
  };

  /* -------- EDITOR CONFIG -------- */
  const editorConfig = {
    height: 420,
    menubar: true,
    branding: false,
    plugins: "lists link table code",
    toolbar:
      "undo redo | bold italic underline | bullist numlist | alignleft aligncenter alignright | link table | code",
    content_style: "body { font-family:Inter,sans-serif; font-size:14px }",
    license_key: "gpl",
  };

  /* -------- TITLE -------- */
  const pageTitle = isAdd
    ? "Add Email Template"
    : isEdit
      ? "Edit Email Template"
      : "View Email Template";

  return (
    <div className="etadd-page container-fluid">
      <div className="etadd-card">
        {/* HEADER */}
        <div className="etadd-header d-flex justify-content-between align-items-center">
          <h4>{pageTitle}</h4>

          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>

        {/* BODY */}
        <div className="etadd-body">
          <div className="row g-4">
            {/* NAME */}
            <div className="col-md-6">
              <label className="etadd-label">Template Name</label>
              <input
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={isView}
              />
            </div>

            {/* SUBJECT */}
            <div className="col-md-6">
              <label className="etadd-label">Email Subject</label>
              <input
                className="form-control"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                disabled={isView}
              />
            </div>

            {/* BODY */}
            <div className="col-12">
              <label className="etadd-label">Email Body</label>

              <Editor
                tinymceScriptSrc="/tinymce/tinymce.min.js"
                value={form.body}
                onEditorChange={(content) =>
                  setForm({ ...form, body: content })
                }
                init={editorConfig}
                disabled={isView}
              />
            </div>
          </div>
        </div>

        {/* FOOTER */}
        {!isView && (
          <div className="etadd-footer text-end">
            <button className="btn btn-primary" onClick={handleSave}>
              {isEdit ? "Update Template" : "Save Template"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
