import { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import "./PickupDrop.css";

const locations = [
  { name: "Airport", status: "Active", by: "Jinu George", date: "09-12-2025" },
  { name: "Airport / Railway Station / Bus Station", status: "Active", by: "Jinu George", date: "09-12-2025" },
  { name: "Alleppey Railway Station", status: "Active", by: "Jinu George", date: "01-07-2024" },
  { name: "Aluva Railway Station", status: "Active", by: "Jinu George", date: "01-07-2024" },
  { name: "Bangalore Airport", status: "Active", by: "Jinu George", date: "01-07-2024" },
  { name: "Bus Station", status: "Active", by: "Jinu George", date: "09-12-2025" },
  { name: "Calicut", status: "Active", by: "Jinu George", date: "15-12-2025" },
];

export default function PickupDrop() {
  const [search, setSearch] = useState("");

  return (
    <div className="pickup-page">
      <div className="pickup-card">

        {/* HEADER */}
        <div className="pickup-header">
          <h2>Pickup / Drop Location</h2>

          <div className="header-actions">
            <input
              placeholder="Search location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button className="btn primary">
              <Plus size={16} /> Add Pickup/Drop Location
            </button>
          </div>
        </div>

        {/* TABLE */}
        <table className="saas-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>By</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {locations
              .filter(l =>
                l.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((l, i) => (
                <tr key={i}>
                  <td className="name">{l.name}</td>

                  <td>
                    <span className="status active">{l.status}</span>
                  </td>

                  <td>
                    <div className="user">
                      <span className="avatar">J</span>
                      {l.by}
                    </div>
                  </td>

                  <td className="muted">{l.date}</td>

                  <td className="actions">
                    <button>
                      <Pencil size={14} />
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
