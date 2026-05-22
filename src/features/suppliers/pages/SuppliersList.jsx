import { useState, useMemo, useEffect } from "react";
import "./SupplierList.css";
import { Pencil, Plus } from "lucide-react";
import AddSupplierModal from "./AddSupplierModal";
import { getSuppliers } from "../services/SupplierService";
import { useAuth } from "@/core/auth/AuthProvider";

export default function Suppliers() {
  const { user } = useAuth();
  const userId = user?.id ?? user?.user_id;

  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const fetchSuppliers = async () => {
    if (!userId) return;

    try {
      setLoading(true);

      const res = await getSuppliers(userId);

      const formatted = (res.data ?? []).map((s) => ({
        ...s,
        mobile: s.phone ?? s.mobile ?? "Not Provided",
        location: s.city ?? s.address ?? "-",
        by: s.addedBy ?? "-",
        service: Array.isArray(s.serviceType)
          ? s.serviceType.join(", ")
          : s.serviceType ?? s.supplierCategory ?? "-",
      }));

      setSuppliers(formatted);
    } catch (err) {
      console.error("Error fetching suppliers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, [userId]);

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((s) =>
      s.company?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, suppliers]);

  const totalPages = Math.ceil(filteredSuppliers.length / rowsPerPage);

  const paginatedSuppliers = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredSuppliers.slice(start, start + rowsPerPage);
  }, [filteredSuppliers, currentPage]);

  const handleAdd = () => {
    setEditingSupplier(null);
    setModalOpen(true);
  };

  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    fetchSuppliers();
  };

  return (
    <>
      <div className="sup-page">
        <div className="sup-container">
          <div className="sup-card">

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
                    setCurrentPage(1);
                  }}
                />
                <button className="sup-btn primary" onClick={handleAdd}>
                  <Plus size={16} /> Add Supplier
                </button>
              </div>
            </div>

            <table className="sup-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Location</th>
                  <th>Added By</th>
                  <th>Service</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                 [...Array(5)].map((_, i) => (
                  <tr key={i}>
      <td><div className="shimmer-row w-60"></div></td>
      <td><div className="shimmer-row w-40"></div></td>
      <td><div className="shimmer-row w-40"></div></td>
       <td><div className="shimmer-row w-40"></div></td>
      <td><div className="shimmer-row w-40"></div></td>
      <td><div className="shimmer-row w-60"></div></td>
    </tr>
                  ))
                ) : paginatedSuppliers.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center", padding: "24px" }}>
                      No suppliers found
                    </td>
                  </tr>
                ) : (
                  paginatedSuppliers.map((s) => (
                    <tr key={s.id}>
                      <td>{s.company}</td>
                      <td>{s.email}</td>
                      <td>{s.mobile}</td>
                      <td>{s.location}</td>

                      <td>
                        <div className="sup-user">
                          {s.addedBy}
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
                  ))
                )}
              </tbody>
            </table>

            <div className="sup-footer">
              <span>
                Showing{" "}
                {filteredSuppliers.length === 0
                  ? 0
                  : (currentPage - 1) * rowsPerPage + 1}{" "}
                to{" "}
                {Math.min(currentPage * rowsPerPage, filteredSuppliers.length)}{" "}
                of {filteredSuppliers.length} entries
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
                  disabled={currentPage === totalPages || totalPages === 0}
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
          onClose={handleModalClose}
        />
      )}
    </>
  );
}