import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {getLeadSource} from "../../../master/LeadSource/services/LeadService"

export default function LandingForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editMode = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    bannerHeading: "",
    bannerSub: "",
    enquiryHeading: "",
    enquirySub: "",
    email: "",
    phone: "",
    address: "",
    mainHeading: "",
    slug: "",
    description: "",
    leadSource: "B2B",
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: "",
    pinterest: "",
    metaTitle: "",
    metaDescription: "",
    metaKeyword: "",
    headerScript: "",
    footerScript: "",
    status: "Active",
  });

  useEffect(() => {
    if (editMode) {
      setForm({
        name: "Kerala Magic",
        bannerHeading: "Special Offer",
        bannerSub: "Limited Deal",
        enquiryHeading: "Contact Us",
        enquirySub: "We respond fast",
        email: "demo@mail.com",
        phone: "9876543210",
        address: "Kerala",
        mainHeading: "Kerala Tourism Hub",
        slug: "kerala-tour",
        description: "Demo description",
        leadSource: "B2B",
        facebook: "demo",
        instagram: "demo",
        twitter: "demo",
        youtube: "demo",
        pinterest: "demo",
        metaTitle: "demo",
        metaDescription: "demo",
        metaKeyword: "demo",
        headerScript: "demo",
        footerScript: "demo",
        status: "Active",
      });
    }
  }, [editMode]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const SectionHeading = ({ title }) => (
    <div className="col-12 mt-3 mb-1">
      <h6
        className="fw-bold text-uppercase mb-2"
        style={{
          fontSize: "12px",
          color: "#0f172a",
          letterSpacing: "0.6px",
          borderBottom: "1px dashed #e2e8f0",
          paddingBottom: "8px",
        }}
      >
        {title}
      </h6>
    </div>
  );

  const Field = ({ label, children }) => (
    <div className="d-flex flex-column gap-1">
      <label
        className="fw-semibold text-uppercase"
        style={{ fontSize: "11px", letterSpacing: "0.4px", color: "#000" }}
      >
        {label}
      </label>
      {children}
    </div>
  );

  const inputStyle = {
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    background: "#fbfdff",
    fontSize: "14px",
  };

  return (
    <div
      className="min-vh-100 py-4 px-3"
      style={{ background: "linear-gradient(180deg,#f8fbff 0%,#f1f5f9 100%)", fontFamily: "system-ui, sans-serif" }}
    >
      <div className="container-xl">

        {/* TOPBAR */}
        <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
          <div>
            <h2 className="fw-semibold mb-1" style={{ fontSize: "22px" }}>
              {editMode ? "Edit Landing Page" : "Create Landing Page"}
            </h2>
            <p className="text-secondary mb-0" style={{ fontSize: "14px" }}>
              Configure your landing page content
            </p>
          </div>
          <button
            className="btn btn-outline-secondary rounded-3 px-4"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>

        {/* CARD */}
        <div
          className="bg-white rounded-4 p-3 p-md-4"
          style={{ border: "1px solid #eef2f7", boxShadow: "0 10px 30px rgba(0,0,0,.04)" }}
        >
          <div className="row g-3">

            {/* ── Basic Information ── */}
            <SectionHeading title="Basic Information" />

            <div className="col-12 col-md-6 col-lg-4">
              <Field label="Template Name">
                <input className="form-control" style={inputStyle} name="name" value={form.name} onChange={handleChange} />
              </Field>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <Field label="Banner Image">
                <input className="form-control" style={inputStyle} type="file" />
              </Field>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <Field label="Banner Heading">
                <input className="form-control" style={inputStyle} name="bannerHeading" value={form.bannerHeading} onChange={handleChange} />
              </Field>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <Field label="Banner Subheading">
                <input className="form-control" style={inputStyle} name="bannerSub" value={form.bannerSub} onChange={handleChange} />
              </Field>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <Field label="Contact Number">
                <input className="form-control" style={inputStyle} name="phone" value={form.phone} onChange={handleChange} />
              </Field>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <Field label="Email">
                <input className="form-control" style={inputStyle} name="email" type="email" value={form.email} onChange={handleChange} />
              </Field>
            </div>

            <div className="col-12">
              <Field label="Address">
                <input className="form-control" style={inputStyle} name="address" value={form.address} onChange={handleChange} />
              </Field>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <Field label="Main Heading">
                <input className="form-control" style={inputStyle} name="mainHeading" value={form.mainHeading} onChange={handleChange} />
              </Field>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <Field label="URL Slug">
                <input className="form-control" style={inputStyle} name="slug" value={form.slug} onChange={handleChange} />
              </Field>
            </div>

            <div className="col-12">
              <Field label="Description">
                <textarea
                  className="form-control"
                  style={{ ...inputStyle, height: "auto", padding: "12px 14px" }}
                  rows={4}
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                />
              </Field>
            </div>

            {/* ── Social Links ── */}
            <SectionHeading title="Social Links" />

            <div className="col-12 col-md-6 col-lg-4">
              <Field label="Lead Source">
                {/* <select name="leadSource" value={formData.leadSource} onChange={handleChange}>
                      <option value="">Select Lead Source</option>
                      {leadSources.map((item, index) => (
                        <option key={`lead-${item.id ?? index}`} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select> */}
              </Field>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <Field label="Facebook">
                <input className="form-control" style={inputStyle} name="facebook" value={form.facebook} onChange={handleChange} />
              </Field>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <Field label="Instagram">
                <input className="form-control" style={inputStyle} name="instagram" value={form.instagram} onChange={handleChange} />
              </Field>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <Field label="Twitter">
                <input className="form-control" style={inputStyle} name="twitter" value={form.twitter} onChange={handleChange} />
              </Field>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <Field label="Youtube">
                <input className="form-control" style={inputStyle} name="youtube" value={form.youtube} onChange={handleChange} />
              </Field>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <Field label="Pinterest">
                <input className="form-control" style={inputStyle} name="pinterest" value={form.pinterest} onChange={handleChange} />
              </Field>
            </div>

            {/* ── SEO Settings ── */}
            <SectionHeading title="SEO Settings" />

            <div className="col-12 col-md-6 col-lg-4">
              <Field label="Meta Title">
                <input className="form-control" style={inputStyle} name="metaTitle" value={form.metaTitle} onChange={handleChange} />
              </Field>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <Field label="Meta Description">
                <input className="form-control" style={inputStyle} name="metaDescription" value={form.metaDescription} onChange={handleChange} />
              </Field>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <Field label="Meta Keyword">
                <input className="form-control" style={inputStyle} name="metaKeyword" value={form.metaKeyword} onChange={handleChange} />
              </Field>
            </div>

            {/* ── Scripts ── */}
            <SectionHeading title="Scripts" />

            <div className="col-12">
              <Field label="Header Script">
                <textarea
                  className="form-control"
                  style={{ ...inputStyle, height: "auto", padding: "12px 14px", fontFamily: "monospace" }}
                  rows={3}
                  name="headerScript"
                  value={form.headerScript}
                  onChange={handleChange}
                />
              </Field>
            </div>

            <div className="col-12">
              <Field label="Footer Script">
                <textarea
                  className="form-control"
                  style={{ ...inputStyle, height: "auto", padding: "12px 14px", fontFamily: "monospace" }}
                  rows={3}
                  name="footerScript"
                  value={form.footerScript}
                  onChange={handleChange}
                />
              </Field>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <Field label="Status">
                <select className="form-select" style={inputStyle} name="status" value={form.status} onChange={handleChange}>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </Field>
            </div>

          </div>

          {/* FOOTER */}
          <div className="d-flex justify-content-end mt-4 pt-3" style={{ borderTop: "1px solid #eef2f7" }}>
            <button
              className="btn px-4 py-2 fw-semibold text-white"
              style={{
                background: "linear-gradient(135deg,#3b82f6,#2563eb)",
                borderRadius: "10px",
                border: "none",
                fontSize: "15px",
              }}
            >
              {editMode ? "Update Landing Page" : "Save Landing Page"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}