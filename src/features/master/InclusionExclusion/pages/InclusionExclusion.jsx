import { useState, useMemo, useEffect, useCallback } from "react";
import { Pencil, Trash2 } from "lucide-react";
import InclusionExclusionModal from "../components/InclusionExclusionModal";
import {
  fetchInclusionExclusions,
  fetchInclusionExclusionById,
  createInclusionExclusion,
  updateInclusionExclusion,
  deleteInclusionExclusion,
} from "../services/inclusionExclusionService";
import { useAuth } from "@/core/auth/AuthProvider"; // adjust path as needed
import "./InclusionExclusion.css";

const InclusionExclusion = () => {
  const { user, token } = useAuth();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null); // full record from incshow
  const [saving, setSaving] = useState(false);

  const [deletingId, setDeletingId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  /* =========================
     Fetch list
  ========================== */
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchInclusionExclusions(token);
      // Normalise: accept array at root OR nested under a key
      const list = Array.isArray(res) ? res : res.data ?? res.result ?? [];
      setData(list);
      setCurrentPage(1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  /* =========================
     Edit — fetch full record first
  ========================== */
  const handleEdit = async (item) => {
    try {
      const res = await fetchInclusionExclusionById(item.id, token);
      const record = res.data ?? res.result ?? res;
      setSelected(record);
      setOpen(true);
    } catch (err) {
      alert("Could not load record: " + err.message);
    }
  };

  /* =========================
     Add
  ========================== */
  const handleAdd = () => {
    setSelected(null);
    setOpen(true);
  };

  /* =========================
     Save (create or update)
  ========================== */
  const handleSave = async (formData) => {
    try {
      setSaving(true);
      if (selected?.id) {
        await updateInclusionExclusion(user.id, selected.id, formData, token);
      } else {
        await createInclusionExclusion(user.id, formData, token);
      }
      setOpen(false);
      setSelected(null);
      await loadData();
    } catch (err) {
      alert("Save failed: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  /* =========================
     Delete
  ========================== */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    try {
      setDeletingId(id);
      await deleteInclusionExclusion(id, token);
      await loadData();
    } catch (err) {
      alert("Delete failed: " + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  /* =========================
     Pagination
  ========================== */
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return data.slice(start, start + rowsPerPage);
  }, [data, currentPage, rowsPerPage]);

  const showingFrom = data.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const showingTo = Math.min(currentPage * rowsPerPage, data.length);

  /* =========================
     Render
  ========================== */
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

        {/* ERROR */}
        {error && (
          <div className="ie-error">
            {error}{" "}
            <button onClick={loadData} className="retry-btn">
              Retry
            </button>
          </div>
        )}

        {/* TABLE */}
        <div className="table-wrapper">
          <table className="ie-table">
            <thead>
              <tr>
                <th>Destination Inclusion / Exclusion</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="ie-loading">
                    Loading...
                  </td>
                </tr>
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={3} className="ie-empty">
                    No records found.
                  </td>
                </tr>
              ) : (
                paginatedData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.destination}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(item)}
                      >
                        <Pencil size={14} />
                      </button>
                    </td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(item.id)}
                        disabled={deletingId === item.id}
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        {!loading && data.length > 0 && (
          <div className="pagination-footer">
            <span>
              Showing {showingFrom} to {showingTo} of {data.length} entries
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
        )}

        {/* MODAL */}
        {open && (
          <InclusionExclusionModal
            onClose={() => {
              setOpen(false);
              setSelected(null);
            }}
            destinationData={selected}
            onSave={handleSave}
            saving={saving}
          />
        )}

      </div>
    </div>
  );
};

export default InclusionExclusion;
