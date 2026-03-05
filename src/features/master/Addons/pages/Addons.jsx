import { useState } from "react";
import { Plus, Download, Upload, Pencil } from "lucide-react";
import "./Addons.css";
import AddonsModal from "./AddonsModal";

const addonsData = [
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
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    status: "Active",
  });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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

  const filtered = addonsData.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / pageSize);

  const paginatedData = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  /* ---------------- RENDER ---------------- */

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
            <button className="btn primary" onClick={handleAdd}>
              <Plus size={16} /> Add Addon
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
            placeholder="Search addon..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="saas-input"
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
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-state">
                  No addons found
                </td>
              </tr>
            ) : (
              paginatedData.map((a, i) => (
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

                  <td>
                    <div className="addons-actions">
                      <button
                        className="icon-btn-actions"
                        title="Edit Addon"
                        onClick={() => handleEdit(a)}
                      >
                        <Pencil size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* FOOTER */}
        <div className="table-footer">
          Total Records: {filtered.length}
        </div>

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
      <AddonsModal
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
