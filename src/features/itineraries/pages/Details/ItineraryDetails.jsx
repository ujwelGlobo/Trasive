import { NavLink, Routes, Route, Navigate, useParams } from "react-router-dom";
import ItineraryBuild from "../../components/Tabs/ItineraryBuild";
import ItineraryManage from "../../components/Tabs/ItineraryManage";
import ItineraryInclusion from "../../components/Tabs/ItineraryInclusion";
import ItineraryWallpaper from "../../components/Tabs/ItineraryWallpaper";
import ItineraryFinal from "../../components/Tabs/ItineraryFinal";
import "./ItineraryDetails.css";

export default function ItineraryDetails() {
  const { id } = useParams();

  return (
    <div className="details-page">
      {/* HEADER */}
      <div className="details-header">
        <div>
          <h2>Itinerary #{id}</h2>
          <p>Manage and customize this travel plan</p>
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <div className="details-tabs">
        <NavLink to="build">Build</NavLink>
        <NavLink to="manage">Manage</NavLink>
        <NavLink to="inclusion">Inclusion</NavLink>
        <NavLink to="wallpaper">Wallpaper</NavLink>
        <NavLink to="final">Final</NavLink>
      </div>

      {/* CONTENT */}
      <div className="details-content">
        <Routes>
          <Route index element={<Navigate to="build" replace />} />
          <Route path="build" element={<ItineraryBuild />} />
          <Route path="manage" element={<ItineraryManage />} />
          <Route path="inclusion" element={<ItineraryInclusion />} />
          <Route path="wallpaper" element={<ItineraryWallpaper />} />
          <Route path="final" element={<ItineraryFinal />} />
        </Routes>
      </div>
    </div>
  );
}
