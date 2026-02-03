import { useState } from "react";
import { Plus, Download, Upload, Pencil } from "lucide-react";
import "./Addons.css";

const addons = [
  { name: "Breakfast", status: "Active", by: "Jinu George", date: "18-01-2024" },
  { name: "Campfire with Music", status: "Active", by: "Jinu George", date: "03-07-2024" },
  { name: "Candle Light Dinner", status: "Active", by: "Jinu George", date: "06-12-2025" },
  { name: "Freshup", status: "Active", by: "Jinu George", date: "29-08-2022" },
  { name: "Gala Dinner", status: "Active", by: "Jinu George", date: "06-12-2025" },
  { name: "Honeymoon Inclusions", status: "Active", by: "Jinu George", date: "27-01-2024" },
  { name: "Lunch", status: "Active", by: "Jinu George", date: "01-10-2022" },
  { name: "Trekking", status: "Active", by: "Jinu George", date: "09-12-2022" },
];

export default function Addons() {
  const [search, setSearch] = useState("");

  return (
    <div className="addons-page">
      <div className="addons-card">

        {/* HEADER */}
        <div className="addons-header">
          <h2>Addons</h2>

          <div className="header-actions">
            <button className="btn ghost">
              <Download size={14} /> Download Format
            </button>
            <button className="btn ghost">
              <Upload size={14} /> Import File
            </button>
            <button className="btn ghost">
              <Download size={14} /> Export Data
            </button>
            <button className="btn primary">
              <Plus size={16} /> Add Addon
            </button>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="addons-toolbar">
          <input
            placeholder="Search addon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
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
            {addons
              .filter(a =>
                a.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((a, i) => (
                <tr key={i}>
                  <td className="name">{a.name}</td>

                  <td>
                    <span className="status active">{a.status}</span>
                  </td>

                  <td>
                    <div className="user">
                      <span className="avatar">J</span>
                      {a.by}
                    </div>
                  </td>

                  <td className="muted">{a.date}</td>

                  <td className="actions">
                    <button>
                      <Pencil size={14} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* FOOTER */}
        <div className="table-footer">
          Total Records: {addons.length}
        </div>

      </div>
    </div>
  );
}
