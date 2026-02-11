import { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import "./Flight.css";
import FlightModal from "./FlightModal";

const flightsData = [
  { name: "Air India", status: "Active", updated: "26-09-2023" },
  { name: "Indigo", status: "Active", updated: "26-09-2023" },
];

export default function Flight() {
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

  const handleEdit = (flight) => {
    setIsEdit(true);
    setFormData(flight);
    setModalOpen(true);
  };

  const handleSave = () => {
    console.log("Saved flight:", formData);
    setModalOpen(false);
  };

  return (
    <div className="flight-page-wrapper">
      <div className="flight-page-card">

        {/* HEADER */}
        <div className="flight-page-header">
          <h2 className="flight-page-title">Flight</h2>

          <div className="flight-page-actions">
            <input
              className="flight-page-search"
              placeholder="Search flight..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button className="flight-page-add-btn" onClick={handleAdd}>
              <Plus size={16} /> Add Flight
            </button>
          </div>
        </div>

        {/* TABLE */}
        <table className="flight-page-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Updated</th>
              <th>Edit</th>
            </tr>
          </thead>

          <tbody>
            {flightsData
              .filter(f =>
                f.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((f, i) => (
                <tr key={i}>
                  <td className="flight-page-name">{f.name}</td>

                  <td>
                    <span className="flight-page-status flight-page-status-active">
                      {f.status}
                    </span>
                  </td>

                  <td className="flight-page-muted">{f.updated}</td>

                  <td className="flight-page-edit-cell">
                    <button
                      className="flight-page-edit-btn"
                      onClick={() => handleEdit(f)}
                    >
                      <Pencil size={16} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="flight-page-footer">
          Total Records: {flightsData.length}
        </div>
      </div>

      {/* MODAL */}
      <FlightModal
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
