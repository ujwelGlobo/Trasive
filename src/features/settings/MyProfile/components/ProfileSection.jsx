import React, { useState } from "react";
import ProfileEditModal from "../components/MyProfileModal";

export default function ProfileSection({ profile, onSave, loading }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* PROFILE HEADER */}
      <div className="stp-profile-header">
        <div className="stp-avatar">
          {profile?.first_name?.charAt(0) || "U"}
        </div>

        <div className="stp-profile-info">
          <h6 className="stp-profile-name">
            {`${profile?.first_name || ""} ${profile?.last_name || ""}`}
          </h6>
          <p className="stp-profile-email">{profile?.email}</p>
          <small className="stp-profile-login">
            {profile?.last_login_at || "-"}
          </small>
        </div>

        <button
          className="stp-btn-primary"
          onClick={() => setShowModal(true)}
        >
          Edit Profile
        </button>
      </div>

      {/* USER INFO */}
      <div className="row g-3 stp-info-section">
        <div className="col-md-6 col-12">
          <div className="stp-info-card">
            <h6 className="stp-info-title">User Information</h6>

            <div className="stp-info-row">
              <span>Profile</span>
              <span>{profile?.role || "-"}</span>
            </div>

            <div className="stp-info-row">
              <span>Mobile</span>
              <span>{profile?.phone || "-"}</span>
            </div>

            <div className="stp-info-row">
              <span>Website</span>
              <span>{profile?.website || "-"}</span>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-12">
          <div className="stp-info-card">
            <h6 className="stp-info-title">Locale Information</h6>

            <div className="stp-info-row">
              <span>Language</span>
              <span>English (US)</span>
            </div>

            <div className="stp-info-row">
              <span>Country</span>
              <span>India</span>
            </div>

            <div className="stp-info-row">
              <span>Time Format</span>
              <span>12 hours</span>
            </div>

            <div className="stp-info-row">
              <span>Time Zone</span>
              <span>(GMT 5:30) Asia/Kolkata</span>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <ProfileEditModal
        show={showModal}
        onClose={() => setShowModal(false)}
        profile={profile}
        onSave={onSave}
      />
    </>
  );
}