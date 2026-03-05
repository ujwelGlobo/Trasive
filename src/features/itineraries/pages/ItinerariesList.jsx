import { useState, useMemo } from "react";
import { Plus, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ItineraryModal from "./ItineraryModal";
import "./Itinerary.css";

const initialData = [
  {
    id: 1,
    title: "10 Days - Kochi, Munnar, Thekkady",
    duration: "10 Days",
    price: "₹0",
    by: "Tincy K V",
    date: "16-12-2025",
  },
  {
    id: 2,
    title: "3D/2N Munnar Trip",
    duration: "3 Days",
    price: "₹0",
    by: "Jinu George",
    date: "11-12-2025",
  },
];

export default function Itineraries() {
  const navigate = useNavigate(); // 🔥 Added navigation

  const [data, setData] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  /* Pagination */
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return data.slice(start, start + rowsPerPage);
  }, [data, currentPage, rowsPerPage]);

  /* Add Button */
  const handleAdd = () => {
    setEditData(null);
    setOpen(true);
  };

  /* Edit Button */
  const handleEdit = (item) => {
    setEditData(item);
    setOpen(true);
  };

  /* Save (Add + Edit) */
  const handleSave = (formData) => {
    if (editData) {
      const updated = data.map((item) =>
        item.id === editData.id ? { ...item, ...formData } : item,
      );
      setData(updated);
    } else {
      const newItem = {
        id: Date.now(),
        ...formData,
      };
      setData([newItem, ...data]);
    }

    setOpen(false);
  };

  return (
    <>
      <div className="it-page">
        <div className="it-container">
          <div className="it-card">
            {/* HEADER */}
            <div className="it-header">
              <div>
                <h2>Itineraries</h2>
                <p>Manage travel plans and tour packages</p>
              </div>

              <div className="it-actions">
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>

                <button className="it-btn primary" onClick={handleAdd}>
                  <Plus size={16} /> Create Itinerary
                </button>
              </div>
            </div>

            {/* TABLE */}
            <table className="it-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Duration</th>
                  <th>Price</th>
                  <th>Created By</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {paginatedData.map((item) => (
                  <tr key={item.id}>
                    {/* 🔥 CLICKABLE TITLE */}
                    <td
                      className="it-title clickable"
                      onClick={() => navigate(`/itineraries/${item.id}`)}
                    >
                      {item.title}
                    </td>

                    <td>{item.duration}</td>
                    <td>{item.price}</td>

                    <td>
                      <div className="it-user">
                        <span className="avatar">{item.by.charAt(0)}</span>
                        {item.by}
                      </div>
                    </td>

                    <td>{item.date}</td>

                    <td>
                      <button
                        className="it-edit"
                        onClick={() => handleEdit(item)}
                      >
                        <Pencil size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* FOOTER */}
            <div className="it-footer">
              <span>
                Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
                {Math.min(currentPage * rowsPerPage, data.length)} of{" "}
                {data.length} entries
              </span>

              <div className="it-pagination">
                <button
                  onClick={() => setCurrentPage((p) => p - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    className={currentPage === index + 1 ? "active" : ""}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((p) => p + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ItineraryModal
        isOpen={open}
        onClose={() => setOpen(false)}
        initialData={editData}
        onSave={handleSave}
      />
    </>
  );
}
