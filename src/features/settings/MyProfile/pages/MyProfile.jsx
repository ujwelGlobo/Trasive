import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MyProfile.css";

import { useAuth } from "@/core/auth/AuthProvider";
import {
  getProfile,
  updateProfile,
  updateSignature,
  getSignature,
} from "../services/MyProfileService";

import ProfileSection from "../components/ProfileSection";
import SignatureSection from "../components/SignatureSection";
import SignatureModal from "../components/SignatureModal"; // ✅ ADD THIS

const SETTINGS_NAV = [
  { label: "My Profile", path: "/settings/my-profile" },
  { label: "Organisation", path: "/settings/setting" },
  { label: "Default Setting", path: "/settings/default-setting" },
  { label: "Destinations", path: "/master/destination" },
  { label: "Account Details", path: "/master/account-details" },
  { label: "Mail Setting", path: "/settings/mail-setting" },
];

export default function MyProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const userId = user?.id;

  // 🔥 STATE
  const [profile, setProfile] = useState(null);
  const [signature, setSignature] = useState("");
  const [loading, setLoading] = useState(false);
  // ✅ MODAL STATE (THIS WAS MISSING)
  const [showSignatureModal, setShowSignatureModal] = useState(false);

  useEffect(() => {
  if (!userId) return;

  const fetchData = async () => {
    try {
      setLoading(true);
        const profileRes = await getProfile(userId);
      setProfile(profileRes);
      try {
        const signatureRes = await getSignature(userId);  
        setSignature(signatureRes.signature);
      } catch {
        setSignature("");
      }
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, [userId]);


  // 🔥 UPDATE PROFILE
const handleProfileUpdate = async (formData) => {
  try {
    setLoading(true);
    const res = await updateProfile(userId, formData);
    console.log("Update response:", res.data);  // ← ADD THIS
    
    const updated = await getProfile(userId);
    setProfile(updated);
  } catch (err) {
    console.error("Profile update error:", err);
  } finally {
    setLoading(false);
  }
};

  // 🔥 UPDATE SIGNATURE
  const handleSignatureSave = async (value) => {
    try {
      setLoading(true);
      await updateSignature(userId, { signature: value });

      setSignature(value);
    } catch (err) {
      console.error("Signature update error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stp-page">
      {/* LEFT SIDEBAR */}
      <div className="stp-sidebar">
        <h6 className="stp-sidebar-title">Settings</h6>

        <ul className="stp-nav">
          {SETTINGS_NAV.map((item) => (
            <li
              key={item.label}
              className={`stp-nav-item ${
                location.pathname === item.path
                  ? "stp-nav-item--active"
                  : ""
              }`}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT CONTENT */}
      <div className="stp-content">
        {loading && <p>Loading...</p>}
        {/* PROFILE */}
        <ProfileSection
          profile={profile}
          onSave={handleProfileUpdate}
          loading={loading}
        />

        {/* SIGNATURE SECTION */}
        <SignatureSection
          signature={signature}
          onEdit={() => setShowSignatureModal(true)} // ✅ OPEN MODAL
          onSave={handleSignatureSave} 
        />
        {/* SIGNATURE MODAL
        {showSignatureModal && (
          <SignatureModal
            onClose={() => setShowSignatureModal(false)}
            signature={signature}
            onSave={handleSignatureSave} 
            loading={loading}
          />
        )} */}
      </div>
    </div>
  );
}