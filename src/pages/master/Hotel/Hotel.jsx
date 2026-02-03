import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import "./Hotel.css";

const hotels = [
  {
    name: "Southern Panorama Indriya Resorts & Spa",
    category: "4 Star",
    destination: "Munnar",
    date: "02-12-2025",
    by: "Jinu George",
    status: "Active",
    image: "https://picsum.photos/40?1",
  },
  {
    name: "Aadisakthi Leisure Resort",
    category: "4 Star",
    destination: "Kovalam",
    date: "02-12-2025",
    by: "Jinu George",
    status: "Active",
    image: "https://picsum.photos/40?2",
  },
  {
    name: "Amaana Plantation Resort",
    category: "4 Star Deluxe",
    destination: "Thekkady",
    date: "11-12-2025",
    by: "Jinu George",
    status: "Active",
    image: "https://picsum.photos/40?3",
  },
];

export default function Hotel() {
  const [search, setSearch] = useState("");

  return (
    <div className="hotel-page">
      <div className="hotel-card">

        {/* HEADER */}
        <div className="hotel-header">
          <h2>Hotel List</h2>

          <button className="btn primary">
            <Plus size={16} /> Add Hotel
          </button>
        </div>

        {/* FILTER BAR */}
        <div className="hotel-toolbar">
          <select>
            <option>Show 10</option>
            <option>Show 25</option>
          </select>

          <input
            placeholder="Search hotel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* TABLE */}
        <table className="saas-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Destination</th>
              <th>Price</th>
              <th>Status</th>
              <th>By</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {hotels
              .filter(h =>
                h.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((h, i) => (
                <tr key={i}>
                  <td>
                    <div className="name-cell">
                      <img src={h.image} alt="" />
                      <span>{h.name}</span>
                    </div>
                  </td>

                  <td className="star">{h.category}</td>
                  <td>{h.destination}</td>

                  <td>
                    <span className="update-link">Update</span>
                  </td>

                  <td>
                    <span className="status active">Active</span>
                  </td>

                  <td>
                    <div className="user">
                      <span className="avatar">J</span>
                      {h.by}
                    </div>
                  </td>

                  <td>{h.date}</td>

                  <td className="actions">
                    <button><Pencil size={14} /></button>
                    <button className="danger"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
