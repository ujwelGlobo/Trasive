import { useNavigate } from "react-router-dom";
import {
  MapPin, User, FileText, Utensils, Bed, Hotel,
  Activity, Mountain, Target, FileCheck, Car, Bus,
  Navigation, IndianRupee, Plane, Image, PlusCircle
} from "lucide-react";
import "./ReportsHome.css";

const ReportsItems = [
  { label: "AttendanceReport", icon: MapPin, path: "/reports/attendance" },
  { label: "NotesReport", icon: User, path: "/reports/notes" },
  { label: "CollectionReports", icon: FileText, path: "/reports/collection" },
  { label: "ToursReport", icon: Utensils, path: "/reports/tours" },
    { label: "TaskReport", icon: Utensils, path: "/reports/tasks" },
{ label: "MISReport", icon: Bed, path: "/reports/mis" },
{ label: "LedgerReport", icon: Hotel, path: "/reports/ledger" },
{ label: "TransportReport", icon: Activity, path: "/reports/transport" },
];

export default function ReportsHome() {
  const navigate = useNavigate();

  return (
    <div className="master-page">

      {/* HEADER */}
      <div className="master-header">
        <div>
          <h2>Reports</h2>
          <p>Configure core system data and references</p>
        </div>
      </div>

      {/* GRID */}
      <div className="master-grid">
        {ReportsItems.map(({ label, icon: Icon, path }) => (
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
