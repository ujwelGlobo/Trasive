import { useState } from "react";
import { Pencil, Plus } from "lucide-react";
import "./Sightseeing.css";

const sightseeingData = [
  {
    name: "Deluxe Sharing Houseboat Stay [From Kochi Airport / Railway station]",
    destination: "Alleppey",
    status: "Active",
    by: "Jinu George",
    date: "13-12-2025",
    image: "https://picsum.photos/40?1",
  },
  {
    name: "Kochi Airport / ERS Railway Station Arrival & Stay",
    destination: "Kochi",
    status: "Active",
    by: "Jinu George",
    date: "09-12-2025",
    image: "https://picsum.photos/40?2",
  },
  {
    name: "Kovalam Day 1 [From Alleppey]",
    destination: "Kovalam",
    status: "Active",
    by: "Jinu George",
    date: "11-12-2025",
    image: "https://picsum.photos/40?3",
  },
];

export default function Sightseeing() {
  const [search, setSearch] = useState("");

  return (
    <div className="sightseeing-page">
      <div className="sightseeing-card">

        {/* HEADER */}
        <div className="page-header">
          <h2>Sightseeing</h2>

          <div className="header-actions">
            <input
              placeholder="Search sightseeing..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn primary">
              <Plus size={16} /> Add Sightseeing
            </button>
          </div>
        </div>

        {/* TABLE */}
        <table className="saas-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Destination</th>
              <th>Status</th>
              <th>By</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {sightseeingData
              .filter((i) =>
                i.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <div className="name-cell">
                      <img src={item.image} alt="" />
                      <span>{item.name}</span>
                    </div>
                  </td>

                  <td>{item.destination}</td>

                  <td>
                    <span className="status active">Active</span>
                  </td>

                  <td>
                    <div className="user">
                      <span className="avatar">J</span>
                      {item.by}
                    </div>
                  </td>

                  <td className="muted">{item.date}</td>

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
