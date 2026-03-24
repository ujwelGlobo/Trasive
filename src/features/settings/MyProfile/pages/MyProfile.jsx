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

// import React, { useState } from "react";

// const SETTINGS_NAV = [
//   { label: "My Profile",      id: "profile",       icon: "👤" },
//   { label: "Organisation",    id: "organisation",  icon: "🏢" },
//   { label: "Default Setting", id: "default",       icon: "⚙️" },
//   { label: "Destinations",    id: "destinations",  icon: "📍" },
//   { label: "Account Details", id: "account",       icon: "💳" },
//   { label: "Mail Setting",    id: "mail",          icon: "✉️" },
// ];

// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

//   * { box-sizing: border-box; margin: 0; padding: 0; }

//   .mp-root {
//     display: flex;
//     min-height: 100vh;
//     background: #f0f2f7;
//     font-family: 'Plus Jakarta Sans', sans-serif;
//   }

//   /* ── SIDEBAR ── */
//   .mp-sidebar {
//     width: 220px;
//     flex-shrink: 0;
//     background: #fff;
//     border-right: 1px solid #e8ecf1;
//     display: flex;
//     flex-direction: column;
//     padding: 24px 0 16px;
//     position: sticky;
//     top: 0;
//     height: 100vh;
//   }

//   .mp-sidebar-logo {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     padding: 0 18px 20px;
//     border-bottom: 1px solid #f0f2f7;
//     margin-bottom: 8px;
//   }

//   .mp-sidebar-logo-mark {
//     width: 28px;
//     height: 28px;
//     background: linear-gradient(135deg, #2563eb, #4f46e5);
//     border-radius: 7px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 13px;
//     font-weight: 700;
//     color: #fff;
//     letter-spacing: -0.5px;
//   }

//   .mp-sidebar-brand {
//     font-size: 14px;
//     font-weight: 700;
//     color: #0f172a;
//     letter-spacing: -0.3px;
//   }

//   .mp-sidebar-section {
//     padding: 6px 12px 2px;
//   }

//   .mp-sidebar-section-title {
//     font-size: 10px;
//     font-weight: 700;
//     color: #94a3b8;
//     text-transform: uppercase;
//     letter-spacing: 0.8px;
//     padding: 0 6px;
//     margin-bottom: 4px;
//   }

//   .mp-nav-item {
//     display: flex;
//     align-items: center;
//     gap: 9px;
//     padding: 8px 10px;
//     border-radius: 8px;
//     cursor: pointer;
//     font-size: 13px;
//     font-weight: 500;
//     color: #64748b;
//     transition: all 0.15s ease;
//     border: 1px solid transparent;
//     margin-bottom: 1px;
//   }

//   .mp-nav-item:hover {
//     background: #f1f5f9;
//     color: #334155;
//   }

//   .mp-nav-item.active {
//     background: #eff6ff;
//     color: #2563eb;
//     border-color: #bfdbfe;
//     font-weight: 600;
//   }

//   .mp-nav-icon {
//     font-size: 14px;
//     width: 18px;
//     text-align: center;
//   }

//   .mp-nav-dot {
//     width: 5px;
//     height: 5px;
//     border-radius: 50%;
//     background: #2563eb;
//     margin-left: auto;
//   }

//   /* ── MAIN CONTENT ── */
//   .mp-main {
//     flex: 1;
//     padding: 28px 32px;
//     max-width: 900px;
//   }

//   .mp-page-header {
//     margin-bottom: 22px;
//   }

//   .mp-page-breadcrumb {
//     font-size: 12px;
//     color: #94a3b8;
//     margin-bottom: 4px;
//   }

//   .mp-page-title {
//     font-size: 20px;
//     font-weight: 700;
//     color: #0f172a;
//     letter-spacing: -0.4px;
//   }

//   .mp-page-sub {
//     font-size: 13px;
//     color: #64748b;
//     margin-top: 2px;
//   }

//   /* ── PROFILE CARD ── */
//   .mp-profile-card {
//     background: #fff;
//     border: 1px solid #e8ecf1;
//     border-radius: 14px;
//     padding: 20px 24px;
//     margin-bottom: 18px;
//     display: flex;
//     align-items: center;
//     gap: 16px;
//     position: relative;
//   }

//   .mp-avatar-wrap {
//     position: relative;
//     flex-shrink: 0;
//   }

//   .mp-avatar {
//     width: 58px;
//     height: 58px;
//     border-radius: 50%;
//     background: linear-gradient(135deg, #2563eb, #4f46e5);
//     color: #fff;
//     font-size: 22px;
//     font-weight: 700;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     letter-spacing: -1px;
//     box-shadow: 0 0 0 3px #fff, 0 0 0 5px #bfdbfe;
//   }

//   .mp-avatar-status {
//     position: absolute;
//     bottom: 2px;
//     right: 2px;
//     width: 11px;
//     height: 11px;
//     background: #22c55e;
//     border-radius: 50%;
//     border: 2px solid #fff;
//   }

//   .mp-profile-meta {
//     flex: 1;
//   }

//   .mp-profile-name {
//     font-size: 16px;
//     font-weight: 700;
//     color: #0f172a;
//     letter-spacing: -0.3px;
//   }

//   .mp-profile-role {
//     display: inline-block;
//     font-size: 11px;
//     font-weight: 600;
//     background: #eff6ff;
//     color: #2563eb;
//     border: 1px solid #bfdbfe;
//     border-radius: 20px;
//     padding: 2px 10px;
//     margin: 4px 0 6px;
//     letter-spacing: 0.2px;
//   }

//   .mp-profile-detail {
//     font-size: 12px;
//     color: #64748b;
//     display: flex;
//     align-items: center;
//     gap: 12px;
//     flex-wrap: wrap;
//   }

//   .mp-profile-detail span {
//     display: flex;
//     align-items: center;
//     gap: 4px;
//   }

//   .mp-edit-btn {
//     position: absolute;
//     top: 16px;
//     right: 16px;
//     display: flex;
//     align-items: center;
//     gap: 6px;
//     padding: 7px 14px;
//     border: 1px solid #e2e8f0;
//     border-radius: 8px;
//     background: #fff;
//     color: #475569;
//     font-size: 12px;
//     font-weight: 600;
//     cursor: pointer;
//     transition: all 0.15s;
//     font-family: inherit;
//   }

//   .mp-edit-btn:hover {
//     border-color: #2563eb;
//     color: #2563eb;
//     background: #eff6ff;
//   }

//   .mp-edit-btn.save {
//     background: #2563eb;
//     border-color: #2563eb;
//     color: #fff;
//   }

//   .mp-edit-btn.save:hover {
//     background: #1d4ed8;
//   }

//   /* ── INFO GRID ── */
//   .mp-grid {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     gap: 18px;
//     margin-bottom: 18px;
//   }

//   .mp-card {
//     background: #fff;
//     border: 1px solid #e8ecf1;
//     border-radius: 14px;
//     padding: 18px 20px;
//   }

//   .mp-card-title {
//     font-size: 11px;
//     font-weight: 700;
//     color: #94a3b8;
//     text-transform: uppercase;
//     letter-spacing: 0.7px;
//     margin-bottom: 14px;
//     padding-bottom: 10px;
//     border-bottom: 1px solid #f1f5f9;
//   }

//   .mp-field-row {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 7px 0;
//     border-bottom: 1px solid #f8fafc;
//   }

//   .mp-field-row:last-child { border-bottom: none; }

//   .mp-field-label {
//     font-size: 12px;
//     color: #94a3b8;
//     font-weight: 500;
//   }

//   .mp-field-value {
//     font-size: 13px;
//     color: #1e293b;
//     font-weight: 500;
//   }

//   .mp-field-input {
//     font-size: 13px;
//     color: #1e293b;
//     font-weight: 500;
//     border: 1px solid #e2e8f0;
//     border-radius: 6px;
//     padding: 4px 8px;
//     font-family: inherit;
//     outline: none;
//     text-align: right;
//     background: #f8fafc;
//     transition: border-color 0.15s;
//     width: 180px;
//   }

//   .mp-field-input:focus {
//     border-color: #2563eb;
//     background: #fff;
//   }

//   /* ── SIGNATURE ── */
//   .mp-sig-card {
//     background: #fff;
//     border: 1px solid #e8ecf1;
//     border-radius: 14px;
//     padding: 18px 20px;
//     margin-bottom: 18px;
//   }

//   .mp-signature-textarea {
//     width: 100%;
//     border: 1px solid #e8ecf1;
//     border-radius: 8px;
//     padding: 12px 14px;
//     font-size: 13px;
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     color: #1e293b;
//     resize: vertical;
//     outline: none;
//     line-height: 1.6;
//     background: #fafbfc;
//     transition: border-color 0.15s;
//     min-height: 120px;
//   }

//   .mp-signature-textarea:focus {
//     border-color: #2563eb;
//     background: #fff;
//   }

//   /* ── FOOTER ── */
//   .mp-footer {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//   }

//   .mp-footer-hint {
//     font-size: 12px;
//     color: #94a3b8;
//     display: flex;
//     align-items: center;
//     gap: 6px;
//   }

//   .mp-save-btn {
//     display: flex;
//     align-items: center;
//     gap: 7px;
//     background: #2563eb;
//     color: #fff;
//     border: none;
//     padding: 9px 22px;
//     border-radius: 9px;
//     font-size: 13px;
//     font-weight: 600;
//     cursor: pointer;
//     font-family: inherit;
//     transition: background 0.15s, transform 0.1s;
//     letter-spacing: 0.1px;
//   }

//   .mp-save-btn:hover { background: #1d4ed8; }
//   .mp-save-btn:active { transform: scale(0.98); }

//   .mp-cancel-btn {
//     background: transparent;
//     color: #64748b;
//     border: 1px solid #e2e8f0;
//     padding: 9px 18px;
//     border-radius: 9px;
//     font-size: 13px;
//     font-weight: 600;
//     cursor: pointer;
//     font-family: inherit;
//     margin-right: 8px;
//     transition: all 0.15s;
//   }

//   .mp-cancel-btn:hover {
//     border-color: #94a3b8;
//     color: #374151;
//   }

//   .mp-toast {
//     position: fixed;
//     bottom: 24px;
//     right: 24px;
//     background: #0f172a;
//     color: #fff;
//     padding: 11px 18px;
//     border-radius: 10px;
//     font-size: 13px;
//     font-weight: 500;
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     box-shadow: 0 4px 24px rgba(0,0,0,0.15);
//     z-index: 999;
//     animation: slideUp 0.3s ease;
//   }

//   @keyframes slideUp {
//     from { opacity: 0; transform: translateY(12px); }
//     to   { opacity: 1; transform: translateY(0); }
//   }

//   /* ── PLACEHOLDER PANELS ── */
//   .mp-placeholder {
//     background: #fff;
//     border: 1px dashed #cbd5e1;
//     border-radius: 14px;
//     padding: 60px 24px;
//     text-align: center;
//     color: #94a3b8;
//   }

//   .mp-placeholder-icon { font-size: 32px; margin-bottom: 10px; }
//   .mp-placeholder-text { font-size: 14px; font-weight: 500; }

//   @media (max-width: 768px) {
//     .mp-sidebar { display: none; }
//     .mp-main { padding: 16px; }
//     .mp-grid { grid-template-columns: 1fr; }
//   }
// `;

// export default function MyProfile() {
//   const [activeNav, setActiveNav]   = useState("profile");
//   const [editMode, setEditMode]     = useState(false);
//   const [showToast, setShowToast]   = useState(false);

//   const [userInfo, setUserInfo] = useState({
//     name:     "Jinu George",
//     role:     "Manager [Tours Division]",
//     email:    "jinu@btours.in",
//     mobile:   "8075746566",
//     website:  "www.btours.in",
//     profile:  "Administrator",
//     language: "English (United States)",
//     country:  "India",
//     timeFormat: "12 Hours",
//     timezone: "(GMT +5:30) India Standard Time",
//     signature: "Kerala information to prove ourselves\n\n* Kerala Tourism Accredited Tour Operator\n* GST Number: 32AAECB6102H1Z9\n* ISO Certified Tour Operator",
//   });

//   const [draft, setDraft] = useState({ ...userInfo });

//   const handleSave = () => {
//     setUserInfo({ ...draft });
//     setEditMode(false);
//     setShowToast(true);
//     setTimeout(() => setShowToast(false), 3000);
//   };

//   const handleCancel = () => {
//     setDraft({ ...userInfo });
//     setEditMode(false);
//   };

//   const handleNavClick = (id) => {
//     if (id === "profile") return; // already here
//     setActiveNav(id);
//   };

//   return (
//     <>
//       <style>{styles}</style>
//       <div className="mp-root">

//         {/* SIDEBAR */}
//         <aside className="mp-sidebar">
//           <div className="mp-sidebar-logo">
//             <div className="mp-sidebar-logo-mark">B</div>
//             <span className="mp-sidebar-brand">BTours CRM</span>
//           </div>
//           <div className="mp-sidebar-section">
//             <div className="mp-sidebar-section-title">Settings</div>
//             {SETTINGS_NAV.map((item) => (
//               <div
//                 key={item.id}
//                 className={`mp-nav-item ${activeNav === item.id ? "active" : ""}`}
//                 onClick={() => handleNavClick(item.id)}
//               >
//                 <span className="mp-nav-icon">{item.icon}</span>
//                 {item.label}
//                 {activeNav === item.id && <span className="mp-nav-dot" />}
//               </div>
//             ))}
//           </div>
//         </aside>

//         {/* MAIN */}
//         <main className="mp-main">

//           {/* PAGE HEADER */}
//           <div className="mp-page-header">
//             <div className="mp-page-breadcrumb">Settings › My Profile</div>
//             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//               <div>
//                 <h1 className="mp-page-title">My Profile</h1>
//                 <p className="mp-page-sub">Manage your personal details and preferences</p>
//               </div>
//             </div>
//           </div>

//           {activeNav === "profile" ? (
//             <>
//               {/* PROFILE CARD */}
//               <div className="mp-profile-card">
//                 <div className="mp-avatar-wrap">
//                   <div className="mp-avatar">JG</div>
//                   <div className="mp-avatar-status" />
//                 </div>
//                 <div className="mp-profile-meta">
//                   <div className="mp-profile-name">{userInfo.name}</div>
//                   <span className="mp-profile-role">{userInfo.role}</span>
//                   <div className="mp-profile-detail">
//                     <span>✉ {userInfo.email}</span>
//                     <span>📱 {userInfo.mobile}</span>
//                     <span style={{ color: "#22c55e" }}>● Active</span>
//                     <span style={{ color: "#94a3b8" }}>Last login: 09/03/2026 – 6:39 PM</span>
//                   </div>
//                 </div>
//                 <button
//                   className={`mp-edit-btn ${editMode ? "save" : ""}`}
//                   onClick={editMode ? handleSave : () => setEditMode(true)}
//                 >
//                   {editMode ? "💾 Save changes" : "✏️ Edit profile"}
//                 </button>
//               </div>

//               {/* INFO GRID */}
//               <div className="mp-grid">
//                 {/* User Info */}
//                 <div className="mp-card">
//                   <div className="mp-card-title">User Information</div>
//                   {[
//                     { label: "Profile",  key: "profile"  },
//                     { label: "Mobile",   key: "mobile"   },
//                     { label: "Website",  key: "website"  },
//                   ].map(({ label, key }) => (
//                     <div className="mp-field-row" key={key}>
//                       <span className="mp-field-label">{label}</span>
//                       {editMode
//                         ? <input
//                             className="mp-field-input"
//                             value={draft[key]}
//                             onChange={e => setDraft({ ...draft, [key]: e.target.value })}
//                           />
//                         : <span className="mp-field-value">{userInfo[key]}</span>
//                       }
//                     </div>
//                   ))}
//                 </div>

//                 {/* Locale Info */}
//                 <div className="mp-card">
//                   <div className="mp-card-title">Locale Information</div>
//                   {[
//                     { label: "Language",         key: "language"   },
//                     { label: "Country",          key: "country"    },
//                     { label: "Time Format",      key: "timeFormat" },
//                     { label: "Time Zone",        key: "timezone"   },
//                   ].map(({ label, key }) => (
//                     <div className="mp-field-row" key={key}>
//                       <span className="mp-field-label">{label}</span>
//                       {editMode
//                         ? <input
//                             className="mp-field-input"
//                             value={draft[key]}
//                             onChange={e => setDraft({ ...draft, [key]: e.target.value })}
//                           />
//                         : <span className="mp-field-value">{userInfo[key]}</span>
//                       }
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* SIGNATURE */}
//               <div className="mp-sig-card">
//                 <div className="mp-card-title">Email Signature</div>
//                 <textarea
//                   className="mp-signature-textarea"
//                   rows={6}
//                   readOnly={!editMode}
//                   value={editMode ? draft.signature : userInfo.signature}
//                   onChange={e => setDraft({ ...draft, signature: e.target.value })}
//                   style={{ opacity: editMode ? 1 : 0.9, cursor: editMode ? "text" : "default" }}
//                 />
//               </div>

//               {/* FOOTER */}
//               {editMode && (
//                 <div className="mp-footer">
//                   <span className="mp-footer-hint">
//                     <span style={{ color: "#f59e0b" }}>⚠</span>
//                     Unsaved changes
//                   </span>
//                   <div>
//                     <button className="mp-cancel-btn" onClick={handleCancel}>Cancel</button>
//                     <button className="mp-save-btn" onClick={handleSave}>
//                       💾 Save changes
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </>
//           ) : (
//             <div className="mp-placeholder">
//               <div className="mp-placeholder-icon">
//                 {SETTINGS_NAV.find(n => n.id === activeNav)?.icon}
//               </div>
//               <div className="mp-placeholder-text">
//                 {SETTINGS_NAV.find(n => n.id === activeNav)?.label} settings
//               </div>
//               <div style={{ fontSize: 12, color: "#cbd5e1", marginTop: 6 }}>
//                 This section is not yet configured
//               </div>
//             </div>
//           )}
//         </main>
//       </div>

//       {/* TOAST */}
//       {showToast && (
//         <div className="mp-toast">
//           ✓ Profile saved successfully
//         </div>
//       )}
//     </>
//   );
// }