import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./landing.css";

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

  return (
    <div className="lf-page">
      {/* HEADER */}
      <div className="lf-topbar">
        <div>
          <h2>{editMode ? "Edit Landing Page" : "Create Landing Page"}</h2>
          <p>Configure your landing page content</p>
        </div>

        <button className="lf-btn-outline" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>

      {/* CARD */}
      <div className="lf-card">
        <div className="lf-grid">
          <div className="lf-section">Basic Information</div>

          <div className="lf-field">
            <label>Template Name</label>
            <input name="name" value={form.name} onChange={handleChange} />
          </div>

          <div className="lf-field">
            <label>Banner Image</label>
            <input type="file" />
          </div>

          <div className="lf-field">
            <label>Banner Heading</label>
            <input
              name="bannerHeading"
              value={form.bannerHeading}
              onChange={handleChange}
            />
          </div>

          <div className="lf-field">
            <label>Banner Subheading</label>
            <input
              name="bannerSub"
              value={form.bannerSub}
              onChange={handleChange}
            />
          </div>

          <div className="lf-field">
            <label>Contact Number</label>
            <input name="phone" value={form.phone} onChange={handleChange} />
          </div>

          <div className="lf-field">
            <label>Email</label>
            <input name="email" value={form.email} onChange={handleChange} />
          </div>

          <div className="lf-field lf-full">
            <label>Address</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          <div className="lf-field">
            <label>Main Heading</label>
            <input
              name="mainHeading"
              value={form.mainHeading}
              onChange={handleChange}
            />
          </div>

          <div className="lf-field">
            <label>URL Slug</label>
            <input name="slug" value={form.slug} onChange={handleChange} />
          </div>

          <div className="lf-field lf-full">
            <label>Description</label>
            <textarea
              rows="4"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="lf-section">Social Links</div>

          <div className="lf-field">
            <label>Lead Source</label>
            <select
              name="leadSource"
              value={form.leadSource}
              onChange={handleChange}
            >
              <option>B2B</option>
              <option>B2C</option>
            </select>
          </div>

          <div className="lf-field">
            <label>Facebook</label>
            <input
              name="facebook"
              value={form.facebook}
              onChange={handleChange}
            />
          </div>

          <div className="lf-field">
            <label>Instagram</label>
            <input
              name="instagram"
              value={form.instagram}
              onChange={handleChange}
            />
          </div>

          <div className="lf-field">
            <label>Twitter</label>
            <input
              name="twitter"
              value={form.twitter}
              onChange={handleChange}
            />
          </div>

          <div className="lf-field">
            <label>Youtube</label>
            <input
              name="youtube"
              value={form.youtube}
              onChange={handleChange}
            />
          </div>

          <div className="lf-field">
            <label>Pinterest</label>
            <input
              name="pinterest"
              value={form.pinterest}
              onChange={handleChange}
            />
          </div>

          <div className="lf-section">SEO Settings</div>

          <div className="lf-field">
            <label>Meta Title</label>
            <input
              name="metaTitle"
              value={form.metaTitle}
              onChange={handleChange}
            />
          </div>

          <div className="lf-field">
            <label>Meta Description</label>
            <input
              name="metaDescription"
              value={form.metaDescription}
              onChange={handleChange}
            />
          </div>

          <div className="lf-field">
            <label>Meta Keyword</label>
            <input
              name="metaKeyword"
              value={form.metaKeyword}
              onChange={handleChange}
            />
          </div>

          <div className="lf-section">Scripts</div>

          <div className="lf-field lf-full">
            <label>Header Script</label>
            <textarea
              name="headerScript"
              value={form.headerScript}
              onChange={handleChange}
            />
          </div>

          <div className="lf-field lf-full">
            <label>Footer Script</label>
            <textarea
              name="footerScript"
              value={form.footerScript}
              onChange={handleChange}
            />
          </div>

          <div className="lf-field">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        {/* FOOTER */}
        <div className="lf-footer">
          <button className="lf-btn-primary">
            {editMode ? "Update Landing Page" : "Save Landing Page"}
          </button>
        </div>
      </div>
    </div>
  );
}
