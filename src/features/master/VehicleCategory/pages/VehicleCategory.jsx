import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import VehicleCategoryModal from "./VehicelCateoryModal";
import {
  getVehicleCategories,
  getVehicleCategoryById,
  createVehicleCategory,
  updateVehicleCategory,
  deleteVehicleCategory,
} from "../services/vehicleCategoryService";
import { useAuth } from "@/core/auth/AuthProvider";
import toast from "react-hot-toast";
import "./VehicleCategory.css";

const parseStatus = (val) => {
  const s = String(val ?? "").toLowerCase();
  return s === "1" || s === "true" || s === "active" ? 1 : 0;
};

export default function VehicleCategory() {
  const { user } = useAuth();
  const adminId = user?.id ?? user?.user_id;

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
    name:   "",
    status: 1,
  });

  // ── Fetch list ──
  const loadData = useCallback(async (resetPage = false) => {
    if (!adminId) return;
    try {
      setLoading(true);
      const res  = await getVehicleCategories(adminId);
      const list = Array.isArray(res) ? res : res.data ?? res.result ?? [];
      setData(list);
      if (resetPage) setCurrentPage(1);
    } catch (err) {
      console.error("Failed to load vehicle categories:", err);
      toast.error("Failed to load vehicle categories");
    } finally {
      setLoading(false);
    }
  }, [adminId]);

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
    setForm({ name: "", status: 1 });
    setModalOpen(true);
  };

  // ── Open Edit ──
  const openEdit = async (item) => {
    try {
      const res    = await getVehicleCategoryById(item.id);
      const record = res.data ?? res.result ?? res;

      setEditItem({ ...record, id: item.id });
      setForm({
        name:   record.name   || "",
        status: parseStatus(record.status),
      });
      setModalOpen(true);
    } catch (err) {
      console.error("openEdit failed:", err);
      toast.error("Could not load record");
    }
  };

  // ── Save ──
  const handleSave = async () => {
    if (!form.name.trim()) return;

    try {
      setIsSaving(true);

      const payload = {
        name:   form.name,
        status: form.status,
      };

      if (editItem?.id) {
        await updateVehicleCategory(editItem.id, adminId, payload);
        toast.success("Category updated successfully");
      } else {
        await createVehicleCategory(adminId, payload);
        toast.success("Category added successfully");
      }

      setModalOpen(false);
      setEditItem(null);
      loadData();
    } catch (err) {
      console.error("Save failed:", err);
      toast.error("Failed to save category");
    } finally {
      setIsSaving(false);
    }
  };

  // ── Delete ──
  const handleDeleteConfirm = async () => {
    if (!confirmDeleteId) return;
    try {
      setIsDeleting(true);
      await deleteVehicleCategory(confirmDeleteId);
      toast.success("Category deleted successfully");
      setConfirmDeleteId(null);
      loadData();
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete category");
    } finally {
      setIsDeleting(false);
    }
  };

  // ── Filter + paginate ──
  const filtered = useMemo(
    () => data.filter(Boolean).filter((d) =>
      (d.name ?? "").toLowerCase().includes(search.toLowerCase())
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
        items.push(<span key={`ellipsis-${p}`} className="vc-pg-ellipsis">···</span>);
      items.push(
        <button
          key={`page-${p}`}
          className={`vc-pg-btn${p === currentPage ? " active" : ""}`}
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
    <div className="vc-page">
      <div className="vc-card">

        {/* HEADER */}
        <div className="vc-header">
          <div>
            <h2 className="vc-title">Vehicle Category</h2>
            <p className="vc-subtitle">Manage vehicle category master data</p>
          </div>
          <div className="d-flex gap-2 flex-wrap">
            <input
              className="vc-search"
              placeholder="Search category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="vc-add-btn" onClick={openAdd}>
              <Plus size={15} /> Add Category
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="table-responsive" style={{ overflow: "visible" }}>
          <table className="vc-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={`shimmer-${i}`}>
                    <td><div className="vc-shimmer w-20"></div></td>
                    <td><div className="vc-shimmer w-60"></div></td>
                    <td><div className="vc-shimmer w-30"></div></td>
                    <td><div className="vc-shimmer w-30"></div></td>
                  </tr>
                ))
              ) : currentData.length === 0 ? (
                <tr>
                  <td colSpan="4" className="vc-empty">No categories found</td>
                </tr>
              ) : (
                currentData.map((item, idx) => (
                  <tr key={item.id}>
                    <td className="vc-serial">{indexOfFirst + idx + 1}</td>
                    <td>{item.name}</td>
                    <td>
                      {parseStatus(item.status_update) === 1
                        ? <span className="vc-badge-active">Active</span>
                        : <span className="vc-badge-inactive">Inactive</span>
                      }
                    </td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <button className="vc-edit-btn" onClick={() => openEdit(item)}>
                          <Pencil size={13} />
                        </button>

                        <div className="vc-delete-wrap">
                          <button
                            className={`vc-delete-btn${confirmDeleteId === item.id ? " armed" : ""}`}
                            onClick={() =>
                              setConfirmDeleteId(confirmDeleteId === item.id ? null : item.id)
                            }
                          >
                            <Trash2 size={13} />
                          </button>

                          {confirmDeleteId === item.id && (
                            <div className="vc-delete-popover" ref={popoverRef}>
                              <div className="vc-pop-arrow" />
                              <p className="vc-pop-title">Delete category?</p>
                              <p className="vc-pop-sub">
                                <strong>{deletingItem?.name}</strong> will be
                                permanently removed. This cannot be undone.
                              </p>
                              <div className="vc-pop-actions">
                                <button
                                  className="vc-pop-cancel"
                                  onClick={() => setConfirmDeleteId(null)}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="vc-pop-delete"
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
        <div className="vc-footer">
          <span>
            Showing{" "}
            {filtered.length === 0 ? 0 : indexOfFirst + 1} to{" "}
            {Math.min(indexOfLast, filtered.length)} of {filtered.length} entries
          </span>
          <div className="vc-pagination">
            <button
              className="vc-pg-btn nav"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >← Prev</button>
            {renderPagination()}
            <button
              className="vc-pg-btn nav"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((p) => p + 1)}
            >Next →</button>
          </div>
        </div>

      </div>

      <VehicleCategoryModal
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