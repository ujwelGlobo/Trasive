import { useState } from "react";
import { Pencil, Plus } from "lucide-react";
import SightseeingModal from "./SightseeingModal";
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
];

export default function Sightseeing() {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const openAdd = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditData(item);
    setModalOpen(true);
  };

  return (
    <div className="ss-page">
      <div className="ss-card">

        {/* HEADER */}
        <div className="ss-header">
          <h2>Sightseeing</h2>

          <div className="ss-header-actions">
            <input
              placeholder="Search sightseeing..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="ss-btn-primary" onClick={openAdd}>
              <Plus size={16} /> Add Sightseeing
            </button>
          </div>
        </div>

        {/* TABLE */}
        <table className="ss-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Destination</th>
              <th>Status</th>
              <th>By</th>
              <th>Date</th>
              <th>Edit</th>
            </tr>
          </thead>

          <tbody>
            {sightseeingData
              .filter(i =>
                i.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <div className="ss-name-cell">
                      <img src={item.image} alt="" />
                      <span>{item.name}</span>
                    </div>
                  </td>

                  <td>{item.destination}</td>

                  <td>
                    <span className="ss-status active">{item.status}</span>
                  </td>

                  <td>
                    <div className="ss-user">
                      <span className="ss-avatar">J</span>
                      {item.by}
                    </div>
                  </td>

                  <td className="ss-muted">{item.date}</td>

                  <td className="ss-actions">
                    <button onClick={() => openEdit(item)}>
                      <Pencil size={14} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <SightseeingModal
          data={editData}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
