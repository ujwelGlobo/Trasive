import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import FlightModal from "./FlightModal";
import { getFlights, createFlight, updateFlight, deleteFlight } from "../services/flightService";
import { useAuth } from "@/core/auth/AuthProvider";
import toast from "react-hot-toast";
import "../pages/Flight.css";

export default function Flight() {
  const { user } = useAuth();
  const userId = user?.id ?? user?.user_id;

  const [flights, setFlights]                 = useState([]);
  const [search, setSearch]                   = useState("");
  const [loading, setLoading]                 = useState(false);
  const [modalOpen, setModalOpen]             = useState(false);
  const [editItem, setEditItem]               = useState(null);
  const [isSaving, setIsSaving]               = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [isDeleting, setIsDeleting]           = useState(false);
  const [currentPage, setCurrentPage]         = useState(1);
  const [popoverPos, setPopoverPos]           = useState({ top: 0, left: 0 });
  const itemsPerPage = 10;

  const [form, setForm] = useState({ name: "", status: "1" });

  /* ── Fetch ── */
  const loadFlights = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getFlights();
      const raw = Array.isArray(res) ? res : res.data ?? res.result ?? [];
      const list = raw.map((item) => ({
        ...item,
        status: item.status === "Active" || Number(item.status) === 1 ? 1 : 0,
      }));
      setFlights(list);
      setCurrentPage(1);
    } catch {
      toast.error("Failed to load flights");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadFlights(); }, [loadFlights]);
  useEffect(() => { setCurrentPage(1); }, [search]);

  /* ── Close popover on outside click ── */
  useEffect(() => {
    if (confirmDeleteId === null) return;

    const handle = (e) => {
      const path = e.composedPath ? e.composedPath() : [];
      const clickedInside = path.some(
        (el) =>
          el?.classList &&
          (el.classList.contains("flt-delete-wrap") ||
            el.classList.contains("flt-delete-popover"))
      );
      if (!clickedInside) setConfirmDeleteId(null);
    };

    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [confirmDeleteId]);

  /* ── Close popover on Escape ── */
  useEffect(() => {
    const handle = (e) => { if (e.key === "Escape") setConfirmDeleteId(null); };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, []);

  /* ── Open Add ── */
  const openAdd = () => {
    setEditItem(null);
    setForm({ name: "", status: "1" });
    setModalOpen(true);
  };

  /* ── Open Edit ── */
  const openEdit = (item) => {
    setEditItem(item);
    setForm({
      name: item.name || "",
      status: item.status === 1 || item.status === "Active" ? "1" : "0",
    });
    setModalOpen(true);
  };

  /* ── Delete click — calculate fixed position ── */
  const handleDeleteClick = (e, id) => {
    if (confirmDeleteId === id) {
      setConfirmDeleteId(null);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    setPopoverPos({
      top: rect.top,
      left: rect.right - 220,
    });
    setConfirmDeleteId(id);
  };

  /* ── Save ── */
  const handleSave = async () => {
    if (!form.name.trim()) return;
    try {
      setIsSaving(true);
      const payload = {
        name: form.name.trim(),
        status: Number(form.status),
      };

      if (editItem?.id) {
        await updateFlight(editItem.id, payload);
        toast.success("Flight updated successfully");
      } else {
        await createFlight(userId, payload);
        toast.success("Flight added successfully");
      }
      setModalOpen(false);
      setEditItem(null);
      setForm({ name: "", status: "1" });
      await loadFlights();
    } catch {
      toast.error("Failed to save flight");
    } finally {
      setIsSaving(false);
    }
  };

  /* ── Delete confirm ── */
  const handleDeleteConfirm = async () => {
    if (!confirmDeleteId) return;
    try {
      setIsDeleting(true);
      await deleteFlight(confirmDeleteId);
      toast.success("Flight deleted successfully");
      setConfirmDeleteId(null);
      await loadFlights();
    } catch {
      toast.error("Failed to delete flight");
    } finally {
      setIsDeleting(false);
    }
  };

  /* ── Filter + paginate ── */
  const filtered = useMemo(
    () => flights.filter((f) =>
      (f.name ?? "").toLowerCase().includes(search.toLowerCase())
    ),
    [flights, search]
  );

  const indexOfLast  = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData  = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages   = Math.ceil(filtered.length / itemsPerPage);

  const renderPagination = () => {
    const pages = [1];
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++)
      pages.push(i);
    if (totalPages > 1) pages.push(totalPages);
    const unique = [...new Set(pages)].sort((a, b) => a - b);
    const items = [];
    let prev = 0;
    for (const p of unique) {
      if (p - prev > 1)
        items.push(<span key={`e${p}`} className="pg-ellipsis">···</span>);
      items.push(
        <button
          key={p}
          className={`pg-btn${p === currentPage ? " active" : ""}`}
          onClick={() => setCurrentPage(p)}
          disabled={p === currentPage}
        >{p}</button>
      );
      prev = p;
    }
    return items;
  };

  const deletingFlight = flights.find((f) => f.id === confirmDeleteId);

  return (
    <div className="flt-page">
      <div className="flt-card">

        {/* HEADER */}
        <div className="flt-header">
          <div>
            <h2 className="flt-title">Flights</h2>
            <p className="flt-subtitle">Manage flight master data</p>
          </div>
          <div className="d-flex gap-2 flex-wrap">
            <input
              className="flt-search"
              placeholder="Search flight..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="flt-add-btn" onClick={openAdd}>
              <Plus size={15} /> Add Flight
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="table-responsive">
          <table className="flt-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Flight Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td><div className="shimmer-cell w-20"></div></td>
                    <td><div className="shimmer-cell w-60"></div></td>
                    <td><div className="shimmer-cell w-40"></div></td>
                    <td><div className="shimmer-cell w-30"></div></td>
                  </tr>
                ))
              ) : currentData.length === 0 ? (
                <tr>
                  <td colSpan="4" className="flt-empty">No flights found</td>
                </tr>
              ) : (
                currentData.map((f, idx) => (
                  <tr key={f.id}>
                    <td className="flt-serial">{indexOfFirst + idx + 1}</td>
                    <td>{f.name}</td>
                    <td>
                      {f.status === 1
                        ? <span className="badge-active">Active</span>
                        : <span className="badge-inactive">Inactive</span>
                      }
                    </td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">

                        {/* Edit */}
                        <button
                          className="flt-edit-btn"
                          onClick={() => openEdit(f)}
                          aria-label="Edit flight"
                        >
                          <Pencil size={13} />
                        </button>

                        {/* Delete button only — popover is outside the table below */}
                        <div className="flt-delete-wrap">
                          <button
                            className={`flt-delete-btn${confirmDeleteId === f.id ? " armed" : ""}`}
                            onMouseDown={(e) => e.stopPropagation()}
                            onClick={(e) => handleDeleteClick(e, f.id)}
                            aria-label="Delete flight"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>

                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="flt-footer">
          <span>
            Showing{" "}
            {filtered.length === 0 ? 0 : indexOfFirst + 1} to{" "}
            {Math.min(indexOfLast, filtered.length)} of {filtered.length} entries
          </span>
          <div className="flt-pagination">
            <button
              className="pg-btn nav"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >← Prev</button>
            {renderPagination()}
            <button
              className="pg-btn nav"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((p) => p + 1)}
            >Next →</button>
          </div>
        </div>
      </div>

      {/* DELETE POPOVER — single instance, fixed position, outside table */}
      {confirmDeleteId !== null && (
        <div
          className="flt-delete-popover"
          style={{
            position: "fixed",
            top: popoverPos.top,
            left: popoverPos.left,
            transform: "translateY(calc(-100% - 10px))",
            zIndex: 9999,
          }}
        >
          <div className="flt-pop-arrow" />
          <p className="flt-pop-title">Delete flight?</p>
          <p className="flt-pop-sub">
            <strong>{deletingFlight?.name}</strong> will be permanently removed.
            This cannot be undone.
          </p>
          <div className="flt-pop-actions">
            <button
              className="flt-pop-cancel"
              onClick={() => setConfirmDeleteId(null)}
            >
              Cancel
            </button>
            <button
              className="flt-pop-delete"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      )}

      <FlightModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditItem(null); }}
        onSave={handleSave}
        form={form}
        setForm={setForm}
        isEdit={!!editItem}
        isSaving={isSaving}
      />
    </div>
  );
}