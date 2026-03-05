import { useState } from "react";
import { Plus, Download, Upload, Pencil } from "lucide-react";
import "./Activity.css";
import ActivityModal from "./ActivityModal";

const activitiesData = [
  {
    id: 1,
    name: "Jeep Safari",
    destination: "Munnar",
    status: "Active",
    by: "Jinu George",
    date: "11-11-2025",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
  {
    id: 2,
    name: "Shikkara Boat Ride",
    destination: "Alleppey",
    status: "Active",
    by: "Jinu George",
    date: "11-11-2025",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
];

export default function Activity() {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [formData, setFormData] = useState({
    name: "",
    status: "Active",
  });

  /* ---------------- ACTIONS ---------------- */

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
    // 🔥 API call here
    console.log("Saved:", formData);
    setModalOpen(false);
  };

  /* ---------------- FILTER + PAGINATION ---------------- */

  const filteredData = activitiesData.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="activity-page">
      {/* HEADER */}
      <div className="activity-header">
        <div>
          <h2>Activities</h2>
          <p>Manage all tour activities</p>
        </div>

        <div className="header-actions">
          <button className="btn ghost">
            <Download size={16} /> Download
          </button>
          <button className="btn ghost">
            <Upload size={16} /> Import
          </button>
          <button className="btn primary" onClick={handleAdd}>
            <Plus size={16} /> Add Activity
          </button>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="meal-filters">
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1);
          }}
          className="saas-select"
        >
          <option value={10}>Show 10</option>
          <option value={25}>Show 25</option>
        </select>

        <input
          type="text"
          placeholder="Search activities..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="saas-input"
        />
      </div>

      {/* TABLE CARD */}
      <div className="activity-card">
        <div className="table-toolbar">
          <span>Total Records: {filteredData.length}</span>
        </div>

        <table className="activity-table">
          <thead>
            <tr>
              <th>Activity</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Created By</th>
              <th>Date</th>
              <th>Edit</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="activity-info">
                    <img src={item.image} alt={item.name} />
                    <span>{item.name}</span>
                  </div>
                </td>

                <td>{item.destination}</td>

                <td>
                  <span className="status active">{item.status}</span>
                </td>

                <td>{item.by}</td>

                <td>{item.date}</td>

                <td>
                  <button
                    className="Activity-pencil"
                    onClick={() => handleEdit(item)}
                  >
                    <Pencil size={16} />
                  </button>
                </td>
              </tr>
            ))}

            {paginatedData.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No activities found
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
      <ActivityModal
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
