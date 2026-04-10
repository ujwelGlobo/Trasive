import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./profile-modal.css";

export default function ProfileEditModal({ show, onClose, profile, onSave }) {
 const [form, setForm] = useState({
  title: "Mr",
  first_name: "",
  last_name: "",
  email: "",
  username: "",           // ← ADD
  phone: "",
  website: "",
});



 useEffect(() => {
  if (profile) {
    setForm({
      title: profile?.title || "Mr",
      first_name: profile?.first_name || "",
      last_name: profile?.last_name || "",
      email: profile?.email || "",
      username: profile?.username || "",  // ← ADD
      phone: profile?.phone || "",
      website: profile?.website || "",
    });
  }
}, [profile]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = () => {
  const formData = new FormData();
  formData.append("name", form.title);
  formData.append("firstName", form.first_name);
  formData.append("lastName", form.last_name);
  formData.append("email", form.email);
  formData.append("username", form.username);
  formData.append("countryCode", "+91");
  formData.append("phone", form.phone);
  formData.append("website", form.website);

  // ← ADD THIS to see what's being sent
  for (let [key, value] of formData.entries()) {
    console.log(key, ":", value);
  }

  onSave(formData);
  onClose();
};
  if (!show) return null;

  return (
    <div className="ups-modal-backdrop">
      <div className="ups-modal container">
        <div className="ups-card">

          {/* HEADER */}
          <div className="ups-header d-flex justify-content-between align-items-center">
            <h6>Edit Profile</h6>
            <button className="ups-close" onClick={onClose}>×</button>
          </div>

          {/* BODY */}
          <div className="ups-body row g-3">

            {/* NAME */}
            <div className="col-md-2 col-4">
              <select
                name="title"
                className="form-select ups-input"
                value={form.title}
                onChange={handleChange}
              >
                <option>Mr</option>
                <option>Mrs</option>
                <option>Miss</option>
              </select>
            </div>

            <div className="col-md-5 col-8">
              <input
                type="text"
                name="first_name"
                className="form-control ups-input"
                placeholder="First Name"
                value={form.first_name}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-5 col-12">
              <input
                type="text"
                name="last_name"
                className="form-control ups-input"
                placeholder="Last Name"
                value={form.last_name}
                onChange={handleChange}
              />
            </div>

            {/* EMAIL */}
            <div className="col-12">
              <input
                type="email"
                name="email"
                className="form-control ups-input"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            {/* USERNAME — add after email field */}
<div className="col-12">
  <input
    type="text"
    name="username"
    className="form-control ups-input"
    placeholder="Username"
    value={form.username}
    onChange={handleChange}
  />
</div>

            {/* PHONE */}
            <div className="col-md-4 col-4">
              <input
                type="text"
                className="form-control ups-input"
                value="+91"
                disabled
              />
            </div>

            <div className="col-md-8 col-8">
              <input
                type="text"
                name="phone"
                className="form-control ups-input"
                placeholder="Mobile Number"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            {/* WEBSITE */}
            <div className="col-12">
              <input
                type="text"
                name="website"
                className="form-control ups-input"
                placeholder="Website"
                value={form.website}
                onChange={handleChange}
              />
            </div>

          </div>

          {/* FOOTER */}
          <div className="ups-footer d-flex justify-content-end gap-2">
            <button className="ups-btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="ups-btn-primary" onClick={handleSubmit}>
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}