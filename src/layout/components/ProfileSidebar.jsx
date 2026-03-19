import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/core/auth/AuthProvider";
import { ROLES } from "@/utils/constants/constants";
import "./ProfileSidebar.css";

const ROLE_LABELS = {
  [ROLES.COMPANY_ADMIN]: "Company Admin",
  [ROLES.EMPLOYEE]:      "Employee",
  [ROLES.SUPPLIER]:      "Supplier",
  [ROLES.AGENT]:         "Agent",
  [ROLES.CUSTOMER]:      "Customer",
};

const NAV_ITEMS = [
  { label: "My Profile",   path: "/settings/my-profile",   icon: "👤", adminOnly: false },
  { label: "Mail Setting", path: "/settings/mail-setting", icon: "📧", adminOnly: false },
  { label: "Team",         path: "/settings/team",         icon: "👥", adminOnly: true  },
  { label: "Settings",     path: "/settings/setting",      icon: "⚙️", adminOnly: true  },
];

const ProfileSidebar = ({ isOpen, onClose }) => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNavigation = (path) => {
    onClose();
    navigate(path);
  };

  const roleLabel   = ROLE_LABELS[user?.roleType] || "User";
  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <>
      {isOpen && <div className="psb-overlay" onClick={onClose} />}

      <aside className={`psb-sidebar ${isOpen ? "psb-sidebar--open" : ""}`}>

        {/* ── HEADER ── */}
        <div className="psb-header">
          <div className="psb-header-inner">
            <div className="psb-avatar">{firstLetter}</div>
            <div className="psb-user-info">
              <span className="psb-user-name">{user?.name}</span>
              <span className="psb-user-email">{user?.email}</span>
              <span className="psb-user-role">{roleLabel}</span>
            </div>
          </div>
          <button className="psb-close-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {/* ── ORG BADGE ── */}
        {user?.orgName && (
          <div className="psb-org-badge">
            <span className="psb-org-icon">🏢</span>
            <div>
              <span className="psb-org-label">Organization</span>
              <span className="psb-org-name">{user.orgName}</span>
            </div>
          </div>
        )}

        {/* ── NAV ── */}
        <nav className="psb-nav">
          {NAV_ITEMS.filter(
            (item) => !item.adminOnly || user?.roleType === ROLES.COMPANY_ADMIN
          ).map((item) => (
            <button
              key={item.path}
              className={`psb-nav-item ${location.pathname === item.path ? "psb-nav-item--active" : ""}`}
              onClick={() => handleNavigation(item.path)}
            >
              <span className="psb-nav-icon">{item.icon}</span>
              <span className="psb-nav-label">{item.label}</span>
              <span className="psb-nav-arrow">›</span>
            </button>
          ))}
        </nav>

        {/* ── FOOTER ── */}
        <div className="psb-footer">
          <button className="psb-logout-btn" onClick={handleLogout}>
            <span>🚪</span> Logout
          </button>
        </div>

      </aside>
    </>
  );
};

export default ProfileSidebar;
