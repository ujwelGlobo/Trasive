import { Outlet } from "react-router-dom";
import React, { useState } from "react";

import TopBar from "./Topbar";
import Navbar from "./Navbar";
import Overlay from "./Overlay";
import ProfileSidebar from "./ProfileSidebar";

const AppLayout = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const openProfile = () => setIsProfileOpen(true);
  const closeProfile = () => setIsProfileOpen(false);

  return (
    <div className="app-layout">
      <TopBar onProfileClick={openProfile} />
      <Navbar />

      <main className="page-container">
        <Outlet />
      </main>

      {isProfileOpen && <Overlay onClick={closeProfile} />}
      <ProfileSidebar isOpen={isProfileOpen} onClose={closeProfile} />
    </div>
  );
};

export default AppLayout;
