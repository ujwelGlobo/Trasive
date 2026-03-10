import { Outlet } from "react-router-dom";
import React, { useState } from "react";

import TopBar from "@/layout/Topbar.jsx"
import Navbar from "@/layout/Navbar.jsx";
import Overlay from "@/layout/Overlay.jsx";
import ProfileSidebar from "@/layout/components/ProfileSidebar.jsx";
import StickyNotesPanel from "@/layout/components/StickyNotesPanel.jsx";
import NotificationsPanel from "@/layout/components/NotificationsPanel.jsx";
import EmailPanel from "@/layout/components/EmailPanel.jsx";
import AddQuery from "../features/query/CreateQuery/pages/AddQuery";

const AppLayout = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [openSticky,setOpenSticky] = useState(false)
  const [openNotifcation,setOpenNotication]= useState(false)
  const [openMail,setOpenMail]=useState(false)
  const [openAddQuery, setOpenAddQuery] = useState(false);

  const openProfile = () => setIsProfileOpen(true);
  const closeProfile = () => setIsProfileOpen(false);

  return (
    <div className="app-layout">
     <TopBar
  onProfileClick={openProfile}
  onStickyClick={() => setOpenSticky(true)}
  onBellclick={() => setOpenNotication(true)}
  onMailClick={() => setOpenMail(true)}
/>

<Navbar openAddQuery={() => setOpenAddQuery(true)} />
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

      <AddQuery
  open={openAddQuery}
  onClose={() => setOpenAddQuery(false)}
/>

    </div>
  );
};

export default AppLayout;
