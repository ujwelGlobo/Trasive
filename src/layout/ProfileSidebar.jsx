import { useNavigate } from "react-router-dom";
import "./ProfileSidebar.css";

const ProfileSidebar = ({ isOpen, onClose }) => {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token")

    onClose();

    navigate("/login")

  }

  return (
    <aside className={`profile-sidebar ${isOpen ? "open" : ""}`}>
      {/* HEADER */}
      <div className="profile-sidebar-header">
        <div className="profile-header-left">
          <div className="profile-avatar-lg">J</div>
          <div>
            <h6>User Name</h6>
            <span>user@email.com</span>
          </div>
        </div>

        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      {/* BODY */}
      <div className="profile-sidebar-body">
        <ul className="profile-actions">
          <li>👤 My Profile</li>
          <li>⚙️ Settings</li>
          <li className="danger" onClick={handleLogout}>🚪 Logout</li>
        </ul>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
