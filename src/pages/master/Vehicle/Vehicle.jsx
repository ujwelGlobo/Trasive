import { useState } from "react";
import { Plus, MoreVertical } from "lucide-react";
import VehicleModal from "./VehicleModal";
import "./Vehicle.css";

const vehicles = [
  {
    name: "10 Seater Tempo Traveller AC",
    category: "Tempo Traveller",
    status: "Active",
    updated: "06-12-2025",
  },
  {
    name: "12 Seater Tempo Traveller AC",
    category: "Tempo Traveller",
    status: "Active",
    updated: "06-12-2025",
  },
  {
    name: "15 Seater Urbania AC",
    category: "Tempo Traveller",
    status: "Active",
    updated: "06-12-2025",
  },
  {
    name: "22 Seater",
    category: "Tempo Traveller",
    status: "Active",
    updated: "01-07-2024",
  },
];

export default function Vehicle() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  return (
    <div className="vehicle-page">
      <div className="vehicle-card">

        {/* HEADER */}
        <div className="vehicle-header">
          <h2>Vehicle</h2>

          <div className="header-actions">
            <input
              placeholder="Search vehicle..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              className="btn primary"
              onClick={() => {
                setEditData(null);
                setOpen(true);
              }}
            >
              <Plus size={16} /> Add Vehicle
            </button>
          </div>
        </div>

        {/* TABLE */}
        <table className="saas-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Updated</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {vehicles
              .filter(v =>
                v.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((v, i) => (
                <tr key={i}>
                  <td className="name">{v.name}</td>
                  <td className="muted">{v.category}</td>

                  <td>
                    <span className="status active">{v.status}</span>
                  </td>

                  <td className="muted">{v.updated}</td>

                  <td className="actions">
                    <button
                      onClick={() => {
                        setEditData(v);
                        setOpen(true);
                      }}
                    >
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

      </div>

      {/* MODAL */}
      {open && (
        <VehicleModal
          data={editData}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
