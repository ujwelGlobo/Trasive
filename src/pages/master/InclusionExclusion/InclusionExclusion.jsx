import { useState, useMemo } from "react";
import { Pencil } from "lucide-react";
import InclusionExclusionModal from "./InclusionExclusionModal";
import "./InclusionExclusion.css";

const initialData = [
  { id: 1, name: "Kerala" },
  { id: 2, name: "Sample" },
  // Add more records to test pagination
];

const InclusionExclusion = () => {
  const [data, setData] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleEdit = (item) => {
    setSelected(item);
    setOpen(true);
  };

  const handleAdd = () => {
    setSelected(null);
    setOpen(true);
  };

  /* Pagination Logic */
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return data.slice(start, start + rowsPerPage);
  }, [data, currentPage, rowsPerPage]);

  return (
    <div className="ie-page">
      <div className="ie-wrapper">

        {/* HEADER */}
        <div className="ie-header">
          <h2>Destinations</h2>

          <div className="ie-header-actions">
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

            <button className="add-btn" onClick={handleAdd}>
              Add
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="table-wrapper">
          <table className="ie-table">
            <thead>
              <tr>
                <th>Destination inclusion exclusion</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(item)}
                    >
                      <Pencil size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
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

        {open && (
          <InclusionExclusionModal
            onClose={() => setOpen(false)}
            destinationData={selected}
          />
        )}

      </div>
    </div>
  );
};

export default InclusionExclusion;
