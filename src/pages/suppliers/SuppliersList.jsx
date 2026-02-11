import { useState, useMemo } from "react";
import "./SupplierList.css";
import { Pencil, Plus } from "lucide-react";
import AddSupplierModal from "./AddSupplierModal";

const suppliersData = [
  {
    company: "Anugraha Inn",
    email: "reservation@btours.in",
    mobile: "Not Provided",
    location: "Alleppey",
    by: "Jinu George",
    service: "Vehicle",
  },
  {
    company: "Black Beach Resort",
    email: "reservation@btours.in",
    mobile: "Not Provided",
    location: "Varkala",
    by: "Jinu George",
    service: "Vehicle",
  },
  
  // Add more dummy records to test pagination
];

export default function Suppliers() {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  /* FILTER */
  const filteredSuppliers = useMemo(() => {
    return suppliersData.filter((s) =>
      s.company.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  /* PAGINATION LOGIC */
  const totalPages = Math.ceil(filteredSuppliers.length / rowsPerPage);

  const paginatedSuppliers = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredSuppliers.slice(start, start + rowsPerPage);
  }, [filteredSuppliers, currentPage, rowsPerPage]);

  /* ACTIONS */
  const handleAdd = () => {
    setEditingSupplier(null);
    setModalOpen(true);
  };

  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
    setModalOpen(true);
  };

  return (
    <>
      <div className="sup-page">
        <div className="sup-container">
          <div className="sup-card">

            {/* HEADER */}
            <div className="sup-header">
              <div>
                <h2>Suppliers</h2>
                <p>Manage hotels, vehicles and service providers</p>
              </div>

              <div className="sup-actions">
                <input
                  placeholder="Search supplier..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1); // reset page when searching
                  }}
                />

                {/* <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select> */}

                <button className="sup-btn primary" onClick={handleAdd}>
                  <Plus size={16} /> Add Supplier
                </button>
              </div>
            </div>

            {/* TABLE */}
            <table className="sup-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Location</th>
                  <th>Created By</th>
                  <th>Service</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {paginatedSuppliers.map((s, i) => (
                  <tr key={i}>
                    <td className="sup-company">{s.company}</td>
                    <td>{s.email}</td>
                    <td className="muted">{s.mobile}</td>
                    <td>{s.location}</td>
                    <td>
                      <div className="sup-user">
                        <span className="avatar">
                          {s.by.charAt(0)}
                        </span>
                        {s.by}
                      </div>
                    </td>
                    <td>
                      <span className="sup-badge">{s.service}</span>
                    </td>
                    <td>
                      <button
                        className="sup-edit"
                        onClick={() => handleEdit(s)}
                      >
                        <Pencil size={14} />
                      </button>
                    </td>
                  </tr>
                ))}

                {paginatedSuppliers.length === 0 && (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center", padding: "24px" }}>
                      No suppliers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* FOOTER */}
            <div className="sup-footer">
              <span>
                Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
                {Math.min(currentPage * rowsPerPage, filteredSuppliers.length)} of{" "}
                {filteredSuppliers.length} entries
              </span>

              <div className="sup-pagination">
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

      {modalOpen && (
        <AddSupplierModal
          data={editingSupplier}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
