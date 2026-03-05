import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/core/auth/AuthProvider";
import { ROLES } from "@/utils/constants/constants";
import "./ProfileSidebar.css";

const ProfileSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLogout = () => {
    logout();
  };

  const handleNavigation = (path) => {
    onClose();
    navigate(path);
  };

  const getRoleLabel = () => {
    switch (user?.roleType) {
      case ROLES.COMPANY_ADMIN:
        return "Company Admin";
      case ROLES.EMPLOYEE:
        return "Employee";
      case ROLES.SUPPLIER:
        return "Supplier";
      case ROLES.AGENT:
        return "Agent";
      case ROLES.CUSTOMER:
        return "Customer";
      default:
        return "User";
    }
  };

  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <>
      {isOpen && <div className="profile-overlay" onClick={onClose}></div>}

      <aside className={`profile-sidebar ${isOpen ? "open" : ""}`}>

        {/* HEADER */}
        <div className="profile-sidebar-header">
          <div className="profile-header-left">
            <div className="profile-avatar-lg">{firstLetter}</div>
            <div>
              <h6>{user?.name}</h6>
              <span>{user?.email}</span>
              <small>{getRoleLabel()}</small>
            </div>
          </div>

          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* BODY */}
        <div className="profile-sidebar-body">
          <ul className="profile-actions">

            {/* Only Admin can add team */}
            {user?.roleType === ROLES.COMPANY_ADMIN && (
              <li onClick={() => handleNavigation("/settings/team")}>
                👥 Team
              </li>
            )}

            <li onClick={() => handleNavigation("/settings/my-profile")}>
              👤 My Profile
            </li>

            {/* Admin only */}
            {user?.roleType === ROLES.COMPANY_ADMIN && (
              <li onClick={() => handleNavigation("/settings")}>
                ⚙️ Settings
              </li>
            )}

            <li className="danger" onClick={handleLogout}>
              🚪 Logout
            </li>
          </ul>
        </div>

      </aside>
    </>
  );
};

export default ProfileSidebar;