import { useState } from "react";
import { Plus, MoreVertical } from "lucide-react";
import "./Flight.css";

const flights = [
  {
    name: "Air India",
    status: "Active",
    updated: "26-09-2023",
  },
  {
    name: "Indigo",
    status: "Active",
    updated: "26-09-2023",
  },
];

export default function Flight() {
  const [search, setSearch] = useState("");

  return (
    <div className="flight-page">
      <div className="flight-card">

        {/* HEADER */}
        <div className="flight-header">
          <h2>Flight</h2>

          <div className="flight-header-actions">
            <input
              placeholder="Search flight..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button className="flight-btn primary">
              <Plus size={16} /> Add Flight
            </button>
          </div>
        </div>

        {/* TABLE */}
        <table className="flight-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Updated</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {flights
              .filter(f =>
                f.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((f, i) => (
                <tr key={i}>
                  <td className="name">{f.name}</td>

                  <td>
                    <span className="status active">{f.status}</span>
                  </td>

                  <td className="muted">{f.updated}</td>

                  <td className="actions">
                    <button>
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* FOOTER */}
        <div className="table-footer">
          <span>Total Records: {flights.length}</span>
        </div>

      </div>
    </div>
  );
}
