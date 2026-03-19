import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MyProfile.css";

const SETTINGS_NAV = [
  { label: "My Profile",       path: "/settings/profile" },
  { label: "Organisation",     path: "/settings/setting" },
  { label: "Default Setting",  path: "/settings/setting" },
  { label: "Destinations",     path: "/master/destination" },
  { label: "Account Details",  path: "/master/account-details" },
  { label: "Mail Setting",     path: "/settings/mail-setting" },
];

export default function MyProfile() {
  const navigate  = useNavigate();
  const location  = useLocation();

  return (
    <div className="container-fluid stp-page">
      <div className="row g-0">

        {/* LEFT SIDEBAR */}
        <div className="col-lg-2 col-md-3 col-12 stp-sidebar">
          <h6 className="stp-sidebar-title">Settings</h6>
          <ul className="stp-nav">
            {SETTINGS_NAV.map((item) => (
              <li
                key={item.path}
                className={`stp-nav-item ${location.pathname === item.path ? "stp-nav-item--active" : ""}`}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT CONTENT */}
        <div className="col-lg-10 col-md-9 col-12 stp-content">

          {/* PROFILE HEADER */}
          <div className="stp-profile-header">
            <div className="stp-avatar">J</div>
            <div className="stp-profile-info">
              <h6 className="stp-profile-name">Jinu George - Manager [Tours Division]</h6>
              <p className="stp-profile-email">Email: jinu@btours.in</p>
              <small className="stp-profile-login">Last Login: 09/03/2026 - 06:39 PM</small>
            </div>
          </div>

          <hr className="stp-divider" />

          {/* USER INFO */}
          <div className="row stp-info-section">
            <div className="col-md-6 col-12 mb-4">
              <h6 className="stp-info-title">User Information</h6>
              <div className="stp-info-row"><span>Profile</span><span>Administrator</span></div>
              <div className="stp-info-row"><span>Mobile</span><span>8075746566</span></div>
              <div className="stp-info-row"><span>Website</span><span>jinu@btours.in</span></div>
            </div>
            <div className="col-md-6 col-12 mb-4">
              <h6 className="stp-info-title">Locale Information</h6>
              <div className="stp-info-row"><span>Language</span><span>English (United States)</span></div>
              <div className="stp-info-row"><span>Country Location</span><span>India</span></div>
              <div className="stp-info-row"><span>Time Format</span><span>12 Hours</span></div>
              <div className="stp-info-row"><span>Time Zone</span><span>(GMT +5:30) India Standard Time</span></div>
            </div>
          </div>

          {/* SIGNATURE */}
          <div className="stp-signature-section">
            <h6 className="stp-info-title">Signature</h6>
            <textarea
              className="stp-signature-box"
              rows={6}
              defaultValue={`Kerala information to prove ourselves\n\n* Kerala Tourism Accredited Tour Operator\n* GST Number: 32AAECB6102H1Z9\n* ISO Certified Tour Operator`}
            />
          </div>

          <div className="stp-footer">
            <button className="stp-save-btn">Save</button>
          </div>

        </div>
      </div>
    </div>
  );
}