import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import AddonModal from "../pages/AddonsModal";
import {
  getAddons,
  getAddonById,
  createAddon,
  updateAddon,
  deleteAddon,
} from "../services/addonService";
import { useAuth } from "@/core/auth/AuthProvider";
import toast from "react-hot-toast";
import "../pages/Addons.css";

const parseStatus = (val) => {
  const s = String(val ?? "").toLowerCase();
  return s === "1" || s === "true" || s === "active" ? 1 : 0;
};

export default function Addon() {
  const { user } = useAuth();
  const userId = user?.id ?? user?.user_id;

  const [data, setData]                       = useState([]);
  const [search, setSearch]                   = useState("");
  const [loading, setLoading]                 = useState(false);
  const [modalOpen, setModalOpen]             = useState(false);
  const [editItem, setEditItem]               = useState(null);
  const [isSaving, setIsSaving]               = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [isDeleting, setIsDeleting]           = useState(false);
  const [currentPage, setCurrentPage]         = useState(1);
  const itemsPerPage = 10;
  const popoverRef   = useRef(null);

  const [form, setForm] = useState({
    name:    "",
    details: "",
    status:  1,
  });

  // ── Fetch list ──
  const loadData = useCallback(async (resetPage = false) => {
    try {
      setLoading(true);
      const res  = await getAddons();
      const list = Array.isArray(res) ? res : res.data ?? res.result ?? [];
      setData(list);
      if (resetPage) setCurrentPage(1);
    } catch (err) {
      console.error("Failed to load addons:", err);
      toast.error("Failed to load addons");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(true); }, [loadData]);
  useEffect(() => { setCurrentPage(1); }, [search]);

  // ── Close popover on outside click ──
  useEffect(() => {
    if (!confirmDeleteId) return;
    const handle = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target))
        setConfirmDeleteId(null);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [confirmDeleteId]);

  // ── Close popover on Escape ──
  useEffect(() => {
    const handle = (e) => { if (e.key === "Escape") setConfirmDeleteId(null); };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, []);

  // ── Open Add ──
  const openAdd = () => {
    setEditItem(null);
    setForm({ name: "", details: "", status: 1 });
    setModalOpen(true);
  };

  // ── Open Edit ──
  const openEdit = async (item) => {
    try {
      const res    = await getAddonById(item.id);
      const record = res.data ?? res.result ?? res;

      setEditItem({ ...record, id: record.id ?? item.id });
      setForm({
        name:    record.name    || "",
        details: record.details || "",
        status:  parseStatus(record.status),
      });
      setModalOpen(true);
    } catch (err) {
      console.error("openEdit failed:", err);
      toast.error("Could not load record");
    }
  };

  // ── Save ──
  const handleSave = async () => {
    if (!form.name.trim() || !form.details.trim()) return;
    try {
      setIsSaving(true);

      const payload = {
        name:    form.name,
        details: form.details,
        status:  form.status,
      };

      if (editItem?.id) {
        await updateAddon(editItem.id, payload);
        toast.success("Addon updated successfully");
      } else {
        await createAddon(userId, payload);
        toast.success("Addon added successfully");
      }

      setModalOpen(false);
      setEditItem(null);
      loadData();
    } catch (err) {
      console.error("Save failed:", err);
      toast.error("Failed to save addon");
    } finally {
      setIsSaving(false);
    }
  };

  // ── Delete ──
  const handleDeleteConfirm = async () => {
    if (!confirmDeleteId) return;
    try {
      setIsDeleting(true);
      await deleteAddon(confirmDeleteId);
      toast.success("Addon deleted successfully");
      setConfirmDeleteId(null);
      loadData();
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete addon");
    } finally {
      setIsDeleting(false);
    }
  };

  // ── Filter + paginate ──
  const filtered = useMemo(
    () => data.filter(Boolean).filter((d) =>
      (d.name    ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (d.addedBy ?? "").toLowerCase().includes(search.toLowerCase())
    ),
    [data, search]
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
    const items  = [];
    let prev = 0;
    for (const p of unique) {
      if (p - prev > 1)
        items.push(<span key={`ellipsis-${p}`} className="pg-ellipsis">···</span>);
      items.push(
        <button
          key={`page-${p}`}
          className={`pg-btn${p === currentPage ? " active" : ""}`}
          onClick={() => setCurrentPage(p)}
          disabled={p === currentPage}
        >{p}</button>
      );
      prev = p;
    }
    return items;
  };

  const deletingItem = data.find((d) => d.id === confirmDeleteId);

  return (
    <div className="addons-page">
      <div className="addons-card">

        {/* HEADER */}
        <div className="addons-header">
          <div>
            <h2>Addons</h2>
            <p className="pd-subtitle">Manage addon master data</p>
          </div>
          <div className="header-actions">
            <div className="addons-toolbar">
              <input
                placeholder="Search addon..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="btn primary" onClick={openAdd}>
              <Plus size={15} /> Add Addon
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="table-responsive" style={{ overflow: "visible" }}>
          <table className="saas-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Added By</th>
                <th>Date Added</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                // FIX #13: proper shimmer CSS classes with sweep animation
                [...Array(5)].map((_, i) => (
                  <tr key={`shimmer-${i}`}>
                    <td><div className="shimmer-cell w-20" /></td>
                    <td><div className="shimmer-cell w-60" /></td>
                    <td><div className="shimmer-cell w-40" /></td>
                    <td><div className="shimmer-cell w-40" /></td>
                    <td><div className="shimmer-cell w-30" /></td>
                    <td><div className="shimmer-cell w-30" /></td>
                  </tr>
                ))
              ) : currentData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="addons-empty">No addons found</td>
                </tr>
              ) : (
                currentData.map((item, idx) => (
                  <tr key={item.id}>
                    <td className="muted">{indexOfFirst + idx + 1}</td>
                    <td className="name">{item.name}</td>
                    <td>
                      <div className="user">
                        <div className="avatar">
                          {(item.addedBy ?? "?")[0].toUpperCase()}
                        </div>
                        {item.addedBy ?? "—"}
                      </div>
                    </td>
                    <td className="muted">{item.dateAdded ?? "—"}</td>
                    <td>
                      {parseStatus(item.status) === 1
                        ? <span className="status active">Active</span>
                        : <span className="status inactive">Inactive</span>
                      }
                    </td>
                    <td>
                      {/* FIX #11: cleaned .actions wrapper */}
                      <div className="actions">
                        <button
                          className="icon-btn-actions"
                          onClick={() => openEdit(item)}
                          title="Edit"
                        >
                          <Pencil size={13} />
                        </button>

                        {/* FIX #12: popover opens ABOVE via CSS class */}
                        <div className="addons-delete-wrap">
                          <button
                            className={`icon-btn-actions delete${confirmDeleteId === item.id ? " armed" : ""}`}
                            onClick={() =>
                              setConfirmDeleteId(confirmDeleteId === item.id ? null : item.id)
                            }
                            title="Delete"
                          >
                            <Trash2 size={13} />
                          </button>

                          {confirmDeleteId === item.id && (
                            <div className="addons-delete-popover" ref={popoverRef}>
                              <div className="addons-pop-arrow" />
                              <p className="addons-pop-title">Delete addon?</p>
                              <p className="addons-pop-sub">
                                <strong>{deletingItem?.name}</strong> will be
                                permanently removed. This cannot be undone.
                              </p>
                              <div className="addons-pop-actions">
                                <button
                                  className="addons-pop-cancel"
                                  onClick={() => setConfirmDeleteId(null)}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="addons-pop-delete"
                                  onClick={handleDeleteConfirm}
                                  disabled={isDeleting}
                                >
                                  {isDeleting ? "Deleting..." : "Delete"}
                                </button>
                              </div>
                            </div>
                          )}
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
        <div className="table-footer">
          <span>
            Showing{" "}
            {filtered.length === 0 ? 0 : indexOfFirst + 1} to{" "}
            {Math.min(indexOfLast, filtered.length)} of {filtered.length} entries
          </span>
          <div className="pd-pagination">
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

      <AddonModal
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