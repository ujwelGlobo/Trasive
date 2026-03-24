import { useNavigate } from "react-router-dom";
import {
  MapPin, User, FileText, Utensils, Bed, Hotel,
  Activity, Mountain, Target, FileCheck, Car, Bus,
  Navigation, IndianRupee, Plane, Image, PlusCircle,Settings
} from "lucide-react";
import "./MasterHome.css";

const masterItems = [
  { label: "Destination", icon: MapPin, path: "/master/destination" },
  { label: "Account Details", icon: User, path: "/master/account-details" },
  { label: "Inclusions & Exclusions", icon: FileText, path: "/master/inclusion-exclusion" },
  { label: "Meal Plan", icon: Utensils, path: "/master/meal-plan" },
{ label: "Room Type", icon: Bed, path: "/master/room-type" },
{ label: "Hotel", icon: Hotel, path: "/master/hotel" },
{ label: "Activity", icon: Activity, path: "/master/activity" },
{ label: "Sightseeing", icon: Mountain, path: "/master/sightseeing" },
{ label: "Lead Source", icon: Target, path: "/master/lead-source" },
{ label: "Manual Voucher", icon: FileCheck, path: "/master/manual-voucher" },
{ label: "Vehicle Category", icon: Car, path: "/master/vehicle-category" },
{ label: "Vehicle", icon: Bus, path: "/master/vehicle" },
{ label: "Pickup / Drop", icon: Navigation, path: "/master/pickup-drop" },
{ label: "Currency", icon: IndianRupee, path: "/master/currency" },
{ label: "Flight", icon: Plane, path: "/master/flight" },
{ label: "Wallpaper", icon: Image, path: "/master/wallpaper" },
{ label: "Addons", icon: PlusCircle, path: "/master/addons" },
{ label: "Service", icon: Settings, path: "/master/service-type" },

];

export default function MasterHome() {
  const navigate = useNavigate();

  return (
    <div className="master-page">

      {/* HEADER */}
      <div className="master-header">
        <div>
          <h2>Master Settings</h2>
          <p>Configure core system data and references</p>
        </div>
      </div>

      {/* GRID */}
      <div className="master-grid">
        {masterItems.map(({ label, icon: Icon, path }) => (
          <div
            key={label}
            className="master-card"
            onClick={() => path && navigate(path)}
          >
            <div className="icon-wrap">
              <Icon size={22} />
            </div>

            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
