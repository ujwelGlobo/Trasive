import { useState } from "react";
import { Plus, Pencil, Search } from "lucide-react";
import VehicleModal from "./VehicleModal";
import "./Vehicle.css";

const vehiclesData = [
  {
    name: "10 Seater Tempo Traveller AC",
    category: "Tempo Traveller",
    status: "Active",
    updated: "06-12-2025",
  },
  {
    name: "Innova Crysta",
    category: "SUV",
    status: "Active",
    updated: "05-12-2025",
  },
  {
    name: "Swift Dzire",
    category: "Sedan",
    status: "Inactive",
    updated: "04-12-2025",
  },
  {
    name: "12 Seater Tempo Traveller",
    category: "Tempo Traveller",
    status: "Active",
    updated: "03-12-2025",
  },
];

export default function Vehicle() {
  const [vehicles] = useState(vehiclesData);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  /* ---------------- SEARCH ---------------- */

  const [search, setSearch] = useState("");

  const filteredVehicles = vehicles.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.category.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------- PAGINATION ---------------- */

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const totalPages = Math.ceil(filteredVehicles.length / pageSize);

  const paginatedData = filteredVehicles.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  /* ---------------- ACTIONS ---------------- */

  const handleAdd = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditData(item);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditData(null);
  };

  return (
    <div className="vehicle-page-wrapper">
      <div className="vehicle-page-card">

        {/* HEADER */}
        <div className="vehicle-page-header">
          <h2 className="vehicle-page-title">Vehicle</h2>

          <div className="vehicle-page-actions">
            {/* SEARCH */}
            <div className="vehicle-search">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search vehicle..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1); // reset page on search
                }}
              />
            </div>

            <button
              className="vehicle-page-add-btn"
              onClick={handleAdd}
            >
              <Plus size={16} />
              Add Vehicle
            </button>
          </div>
        </div>

        {/* TABLE */}
        <table className="vehicle-page-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Updated</th>
              <th>Edit</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((v, i) => (
                <tr key={i}>
                  <td className="vehicle-page-name">{v.name}</td>
                  <td className="vehicle-page-muted">{v.category}</td>
                  <td>
                    <span
                      className={`vehicle-page-status ${
                        v.status === "Active" ? "active" : "inactive"
                      }`}
                    >
                      {v.status}
                    </span>
                  </td>
                  <td className="vehicle-page-muted">{v.updated}</td>
                  <td className="vehicle-page-edit-cell">
                    <button
                      className="vehicle-page-edit-btn"
                      onClick={() => handleEdit(v)}
                    >
                      <Pencil size={14} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="vehicle-empty">
                  No vehicles found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <VehicleModal
            open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        formData={formData}
        setFormData={setFormData}
        isEdit={isEdit}
        />
      )}
    </div>
  );
}
