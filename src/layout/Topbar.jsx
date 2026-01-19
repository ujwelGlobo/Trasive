import {Bell, Mail,StickyNote,User } from "lucide-react";



const TopBar = ({ onProfileClick }) => {
  return (
    <div className="topbar">
      {/* LEFT */}
      <div className="topbar-left">
        {/* <img src="/logo.png" alt="Travsive" className="topbar-logo" /> */}
        <span className="topbar-brand">Travsive</span>
      </div>

      {/* CENTER SEARCH */}
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
          placeholder="Search anything…"
        />
      </div>

      {/* RIGHT */}
      <div className="topbar-right">
        <button className="icon-btn" title="Notifications"><StickyNote size={18} strokeWidth={2.2}/>
</button>
 <button className="icon-btn" title="Notifications"><Bell size={18} strokeWidth={2.2}/>
</button>
        <button className="icon-btn" title="Messages"><Mail size={18} strokeWidth={2.2}/></button>

        <button className="avatar-btn" onClick={onProfileClick}>
          <User size={18} strokeWidth={2.2}/>
        </button>
      </div>
    </div>
  );
};

export default TopBar;
