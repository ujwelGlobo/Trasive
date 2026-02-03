import { Outlet } from "react-router-dom";
import React, { useState } from "react";

import TopBar from "./Topbar";
import Navbar from "./Navbar";
import Overlay from "./Overlay";
import ProfileSidebar from "./ProfileSidebar";
import StickyNotesPanel from "./StickyNotesPanel";
import NotificationsPanel from "./NotificationsPanel";
import EmailPanel from "./EmailPanel";

const AppLayout = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [openSticky,setOpenSticky] = useState(false)
  const [openNotifcation,setOpenNotication]= useState(false)
  const [openMail,setOpenMail]=useState(false)

  const openProfile = () => setIsProfileOpen(true);
  const closeProfile = () => setIsProfileOpen(false);

  return (
    <div className="app-layout">
      <TopBar onProfileClick={openProfile}
              onStickyClick={() => setOpenSticky(true)}
              onBellclick ={()=> setOpenNotication(true)} 
              onMailClick ={()=>setOpenMail(true)} />
      <Navbar />

      <main className="page-container">
        <Outlet />
      </main>

      {isProfileOpen && <Overlay onClick={closeProfile} />}
      <ProfileSidebar isOpen={isProfileOpen} onClose={closeProfile} />

        <StickyNotesPanel
        open={openSticky}
        onClose={() => setOpenSticky(false)}
      />
      <NotificationsPanel
      open={openNotifcation}
      onClose={()=>setOpenNotication(false)}
      />
      <EmailPanel
      open={openMail}
      onClose={()=>setOpenMail(false)}
      />

    </div>
  );
};

export default AppLayout;
