import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
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
  // Add more records to test pagination
];

export default function Itineraries() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(initialData);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  /* Pagination Logic */
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return data.slice(start, start + rowsPerPage);
  }, [data, currentPage, rowsPerPage]);

  return (
    <div className="itinerary-page">
      <div className="itinerary-wrapper">

        {/* HEADER */}
        <div className="itinerary-header">
          <h2>Itineraries</h2>

          <div className="itinerary-header-actions">
            <select
              className="rows-select"
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

            <button className="create-btn" onClick={() => setOpen(true)}>
              <Plus size={16} />
              Create Itinerary
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="table-wrapper">
          <table className="itinerary-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Duration</th>
                <th>Price</th>
                <th>By</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.duration}</td>
                  <td>{item.price}</td>
                  <td>{item.by}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="pagination-footer">
          <span>
            Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
            {Math.min(currentPage * rowsPerPage, data.length)} of{" "}
            {data.length} entries
          </span>

          <div className="pagination-controls">
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

        {open && <ItineraryModal onClose={() => setOpen(false)} />}
      </div>
    </div>
  );
}
