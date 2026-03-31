import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MyProfile.css";
import { useAuth } from "@/core/auth/AuthProvider";
import { useState,useEffect } from "react";
import { getProfile } from "../services/MyProfileService";

const SETTINGS_NAV = [
  { label: "My Profile",       path: "/settings/my-profile" },
  { label: "Organisation",     path: "/settings/setting" },
  { label: "Default Setting",  path: "/settings/setting" },
  { label: "Destinations",     path: "/master/destination" },
  { label: "Account Details",  path: "/master/account-details" },
  { label: "Mail Setting",     path: "/settings/mail-setting" },
];

export default function MyProfile() {

  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAuth();
  const userId = user?.id;

  const [profile, setProfile] = useState(null);

  useEffect(() => {
  if (!userId) return;

  const fetchProfile = async () => {
    try {
    const res = await getProfile(userId);
setProfile(res.data);

      setProfile(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchProfile();
}, [userId]);

  return (
    <div className="stp-page">

      {/* LEFT SIDEBAR */}
      <div className="stp-sidebar">
        <h6 className="stp-sidebar-title">Settings</h6>
        <ul className="stp-nav">
          {SETTINGS_NAV.map((item) => (
            <li
              key={item.label}
              className={`stp-nav-item ${location.pathname === item.path ? "stp-nav-item--active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT CONTENT */}
      <div className="stp-content">

        {/* PROFILE HEADER */}
        <div className="stp-profile-header">
          <div className="stp-avatar">J</div>
          <div className="stp-profile-info">
            <h6 className="stp-profile-name">{profile?.first_name} {profile?.last_name} </h6>
            <p className="stp-profile-email">{profile?.email}</p>
            <small className="stp-profile-login">{profile?.last_login_at || "-"}</small>
          </div>
        </div>

        {/* USER INFO + LOCALE */}
        <div className="row g-3 stp-info-section">
          <div className="col-md-6 col-12">
            <div className="stp-info-card">
              <h6 className="stp-info-title">User Information</h6>
              <div className="stp-info-row"><span>Profile</span><span>{profile?.role}</span></div>
              <div className="stp-info-row"><span>Mobile</span><span>{profile?.phone}</span></div>
              <div className="stp-info-row"><span>Website</span><span>{profile?.website || "-"}</span></div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="stp-info-card">
              <h6 className="stp-info-title">Locale Information</h6>
              <div className="stp-info-row"><span>Language</span><span>English (US)</span></div>
              <div className="stp-info-row"><span>Country</span><span>{profile?.country || "_"}</span></div>
              <div className="stp-info-row"><span>Time Format</span><span>{profile?.timeformat || "_"}</span></div>
              <div className="stp-info-row"><span>Time Zone</span><span>{profile?.timezone || "_"}</span></div>
            </div>
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

        {/* FOOTER */}
        <div className="stp-footer">
          <button className="stp-save-btn">Save Changes</button>
        </div>

      </div>
    </div>
  );
}