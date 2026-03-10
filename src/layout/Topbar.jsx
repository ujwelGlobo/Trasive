import { Bell, Mail, StickyNote, User } from "lucide-react";
import "../layout/Topbar.css";

const TopBar = ({ onProfileClick, onStickyClick, onBellclick, onMailClick }) => {
  return (
    <header className="topbar">

      <div className="topbar-row">

        {/* LEFT */}
        <div className="topbar-left">
          <span className="topbar-brand">Travsive</span>
        </div>

        {/* SEARCH */}
        <div className="topbar-search">
          <select className="topbar-select">
            <option>All</option>
            <option>Query</option>
            <option>Clients</option>
            <option>Itineraries</option>
          </select>

          <input
            type="text"
            className="topbar-input"
            placeholder="Search anything..."
          />
        </div>

        {/* RIGHT ICONS */}
        <div className="topbar-right">

          <button className="icon-btn-topbar" onClick={onStickyClick}>
            <StickyNote />
          </button>

          <button className="icon-btn-topbar" onClick={onBellclick}>
            <Bell />
          </button>

          <button className="icon-btn-topbar" onClick={onMailClick}>
            <Mail />
          </button>

          <button className="icon-btn-topbar" onClick={onProfileClick}>
            <User />
          </button>

        </div>

      </div>

    </header>
  );
};

export default TopBar;