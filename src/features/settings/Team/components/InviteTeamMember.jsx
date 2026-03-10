import React, { useState } from "react";
import "./InviteTeamModal.css";
import { createTeamMember } from "../services/teamServices";
import { useAuth } from "@/core/auth/AuthProvider";

const InviteTeamModal = ({ isOpen, onClose, refreshTeam }) => {
  const { user } = useAuth();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone: "",
    designation: "Employee",
    status: 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "status" ? Number(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        user_id: user.id,
        ...form
      };

      const res = await createTeamMember(payload);

      alert(
        `Team member created!\n\nEmail: ${res.data.email}\nPassword: ${res.data.generated_password}`
      );

      refreshTeam();
      onClose();

      // reset form
      setForm({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        phone: "",
        designation: "Employee",
        status: 1
      });

    } catch (error) {
      console.error("Error inviting member", error);
      alert("Failed to invite team member");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="saas-team-modal-overlay">
      <div className="saas-team-modal">

        {/* HEADER */}
        <div className="saas-team-modal-header">
          <h3>Invite team member</h3>

          <button
            className="saas-team-modal-close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="saas-team-modal-body">

            <div className="saas-team-form-grid">

              {/* FIRST NAME */}
              <div className="saas-team-form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* LAST NAME */}
              <div className="saas-team-form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* EMAIL */}
              <div className="saas-team-form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* USERNAME */}
              <div className="saas-team-form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* PHONE */}
              <div className="saas-team-form-group">
                <label>Mobile Number</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              {/* ROLE */}
              <div className="saas-team-form-group">
                <label>Role</label>
                <select
                  name="designation"
                  value={form.designation}
                  onChange={handleChange}
                >
                  <option value="Employee">Employee</option>
                  <option value="Agent">Agent</option>
                </select>
              </div>

              {/* STATUS */}
              <div className="saas-team-form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </select>
              </div>

            </div>

            {/* FOOTER */}
            <div className="saas-team-modal-footer">

              <button
                type="button"
                className="saas-team-cancel-btn"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="saas-team-save-btn"
              >
                Invite Member
              </button>

            </div>

          </div>

        </form>

      </div>
    </div>
  );
};

export default InviteTeamModal;