import { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import "./PickupDrop.css";
import PickupDropModal from "./PickUpDropModel";

const locationsData = [
  { name: "Airport", status: "Active", by: "Jinu George", date: "09-12-2025" },
  { name: "Airport / Railway Station / Bus Station", status: "Active", by: "Jinu George", date: "09-12-2025" },
  { name: "Alleppey Railway Station", status: "Active", by: "Jinu George", date: "01-07-2024" },
];

export default function PickupDrop() {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    status: "Active",
  });

  const handleAdd = () => {
    setIsEdit(false);
    setFormData({ name: "", status: "Active" });
    setModalOpen(true);
  };

  const handleEdit = (item) => {
    setIsEdit(true);
    setFormData(item);
    setModalOpen(true);
  };

  const handleSave = () => {
    console.log("Saved pickup/drop:", formData);
    setModalOpen(false);
  };

  return (
    <div className="pickup-page-wrapper">
      <div className="pickup-page-card">

        {/* HEADER */}
        <div className="pickup-page-header">
          <h2 className="pickup-page-title">Pickup / Drop Location</h2>

          <div className="pickup-page-actions">
            <input
              className="pickup-page-search"
              placeholder="Search location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              className="pickup-page-add-btn"
              onClick={handleAdd}
            >
              <Plus size={16} /> Add Pickup / Drop
            </button>
          </div>
        </div>

        {/* TABLE */}
        <table className="pickup-page-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>By</th>
              <th>Date</th>
              <th>Edit</th>
            </tr>
          </thead>

          <tbody>
            {locationsData
              .filter(l =>
                l.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((l, i) => (
                <tr key={i}>
                  <td className="pickup-page-name">{l.name}</td>

                  <td>
                    <span className="pickup-page-status pickup-page-status-active">
                      {l.status}
                    </span>
                  </td>

                  <td className="pickup-page-user">
                    <span className="pickup-page-avatar">
                      {l.by.charAt(0)}
                    </span>
                    {l.by}
                  </td>

                  <td className="pickup-page-muted">{l.date}</td>

                  <td className="pickup-page-edit-cell">
                    <button
                      className="pickup-page-edit-btn"
                      onClick={() => handleEdit(l)}
                    >
                      <Pencil size={14} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <PickupDropModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        formData={formData}
        setFormData={setFormData}
        isEdit={isEdit}
      />
    </div>
  );
}
