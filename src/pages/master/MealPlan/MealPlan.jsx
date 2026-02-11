import React, { useState, useMemo } from "react";
import { Pencil } from "lucide-react";
import MealPlanModal from "./MealPlanModal";
import "./MealPlan.css";

const MealPlan = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [formData, setFormData] = useState({
    name: "",
    status: "Active",
  });

  const data = [
    { name: "AP", status: "Active", by: "Jinu George", date: "04-11-2025" },
    { name: "CP", status: "Active", by: "Jinu George", date: "04-11-2025" },

  ];

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
    // API call here
    setModalOpen(false);
  };

  /* 🔹 SEARCH */
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

  /* 🔹 PAGINATION */
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
    <>
      <div className="meal-wrapper">
        <div className="meal-card">

          {/* HEADER */}
          <div className="meal-header">
            <h2>Meal Plan</h2>
            <button className="primary-btn" onClick={handleAdd}>
              + Add Meal Plan
            </button>
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
              placeholder="Search meal plan..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="saas-input"
            />
          </div>

          {/* TABLE */}
          <table className="meal-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>By</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>
                    <span className="status-badge active">
                      {item.status}
                    </span>
                  </td>
                   <td>{item.by}</td>
                    <td>{item.date}</td>
                  <td>
                    <button
                      className="icon-meal-btn"
                      onClick={() => handleEdit(item)}
                    >
                      <Pencil size={16} />
                    </button>
                  </td>
                </tr>
              ))}

              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan="3" className="empty-state">
                    No meal plans found
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
      </div>

      {/* MODAL */}
      <MealPlanModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        formData={formData}
        setFormData={setFormData}
        isEdit={isEdit}
      />
    </>
  );
};

export default MealPlan;
