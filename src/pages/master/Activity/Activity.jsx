import { Plus, Download, Upload, Pencil } from "lucide-react";
import "./Activity.css";

const activities = [
  {
    id: 1,
    name: "Jeep Safari",
    destination: "Munnar",
    status: "Active",
    by: "Jinu George",
    date: "11-11-2025",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
  {
    id: 2,
    name: "Shikkara Boat Ride",
    destination: "Alleppey",
    status: "Active",
    by: "Jinu George",
    date: "11-11-2025",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
];

export default function Activity() {
  return (
    <div className="activity-page">
      {/* Header */}
      <div className="activity-header">
        <div>
          <h2>Activities</h2>
          <p>Manage all tour activities</p>
        </div>

        <div className="header-actions">
          <button className="btn ghost">
            <Download size={16} /> Download
          </button>
          <button className="btn ghost">
            <Upload size={16} /> Import
          </button>
          <button className="btn primary">
            <Plus size={16} /> Add Activity
          </button>
        </div>
      </div>

      {/* Card */}
      <div className="activity-card">
        <div className="table-toolbar">
          <input type="text" placeholder="Search activities..." />
          <span>Total Records: {activities.length}</span>
        </div>

        <table className="activity-table">
          <thead>
            <tr>
              <th>Activity</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Created By</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {activities.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="activity-info">
                    <img src={item.image} alt={item.name} />
                    <span>{item.name}</span>
                  </div>
                </td>

                <td>{item.destination}</td>

                <td>
                  <span className="status active">{item.status}</span>
                </td>

                <td>{item.by}</td>

                <td>{item.date}</td>

                <td>
                  <button className="icon-btn">
                    <Pencil size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
