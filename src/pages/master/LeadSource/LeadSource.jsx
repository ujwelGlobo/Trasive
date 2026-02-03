import { useState } from "react";
import { Pencil, Plus } from "lucide-react";
import "./LeadSource.css";

const sources = [
  { name: "B2B", by: "Jinu George", date: "15-03-2021", status: "Active" },
  { name: "B2C", by: "Jinu George", date: "28-02-2023", status: "Active" },
  { name: "Chat", by: "Jinu George", date: "11-06-2020", status: "Active" },
  { name: "Facebook", by: "Jinu George", date: "20-01-2021", status: "Active" },
  { name: "Google Ads", by: "Jinu George", date: "19-08-2022", status: "Active" },
  { name: "Instagram", by: "Jinu George", date: "11-06-2020", status: "Active" },
  { name: "Justdial", by: "Jinu George", date: "11-06-2020", status: "Active" },
  { name: "Others", by: "Jinu George", date: "11-06-2020", status: "Active" },
  { name: "Walk-in", by: "Jinu George", date: "11-06-2020", status: "Active" },
  { name: "Website", by: "Jinu George", date: "11-06-2020", status: "Active" },
];

export default function LeadSource() {
  const [search, setSearch] = useState("");

  return (
    <div className="lead-page">
      <div className="lead-card">

        {/* HEADER */}
        <div className="lead-header">
          <h2>Lead Source</h2>

          <div className="header-actions">
            <input
              placeholder="Search source..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn primary">
              <Plus size={16} /> Add Lead Source
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
            {sources
              .filter(s =>
                s.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((s, i) => (
                <tr key={i}>
                  <td className="name">{s.name}</td>

                  <td>
                    <span className="status active">{s.status}</span>
                  </td>

                  <td>
                    <div className="user">
                      <span className="avatar">J</span>
                      {s.by}
                    </div>
                  </td>

                  <td className="muted">{s.date}</td>

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
