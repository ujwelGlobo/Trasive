import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import PickupDropModal from "../pages/PickupDropModal";
import {
  getPickupDrops,
  getPickupDropById,
  createPickupDrop,
  updatePickupDrop,
  deletePickupDrop,
} from "../services/pickupDropService";
import { getDestinations } from "@/features/master/Destination/services/DestinationService";
import { useAuth } from "@/core/auth/AuthProvider";
import toast from "react-hot-toast";
import "../pages/PickupDrop.css";

const parseStatus = (val) => {
  const s = String(val ?? "").toLowerCase();
  return s === "1" || s === "true" || s === "active" ? 1 : 0;
};

export default function PickupDrop() {
  const { user } = useAuth();
  const userId = user?.id ?? user?.user_id;

  const [data, setData]                       = useState([]);
  const [destinations, setDestinations]       = useState([]);
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
    name:        "",
    destination: "",
    status:      1,
  });

  // ── Fetch list ──
  const loadData = useCallback(async (resetPage = false) => {
    try {
      setLoading(true);
      const res  = await getPickupDrops();
      const list = Array.isArray(res) ? res : res.data ?? res.result ?? [];
      setData(list);
      if (resetPage) setCurrentPage(1);
    } catch (err) {
      console.error("Failed to load pickup/drop locations:", err);
      toast.error("Failed to load pickup/drop locations");
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Fetch destinations ──
  const loadDestinations = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await getDestinations(userId);
      setDestinations(res?.data || res || []);
    } catch (err) {
      console.error("Destination fetch failed:", err);
    }
  }, [userId]);

  useEffect(() => { loadData(true);     }, [loadData]);
  useEffect(() => { loadDestinations(); }, [loadDestinations]);
  useEffect(() => { setCurrentPage(1);  }, [search]);

  // ── Destination helpers ──
  // ✅ Case + whitespace insensitive
  const getDestinationName = useCallback(
    (id) => destinations.find((d) => d.id === Number(id))?.name ?? "",
    [destinations]
  );

  const getDestinationId = useCallback(
    (name) => destinations.find(
      (d) => d.name.trim().toLowerCase() === String(name ?? "").trim().toLowerCase()
    )?.id ?? "",
    [destinations]
  );

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
    setForm({ name: "", destination: "", status: 1 });
    setModalOpen(true);
  };

  // ── Open Edit ──
  const openEdit = async (item) => {
    try {
      const res    = await getPickupDropById(item.id);
      const record = res.data ?? res.result ?? res;

      const destId = getDestinationId(record.destination);

      if (!destId) {
        console.warn(
          `Destination "${record.destination}" not found in destinations list.`,
          destinations
        );
      }

      // ✅ Preserve id from list item — show API doesn't return it yet
      // Once backend adds id to show response, this can be: setEditItem(record)
      setEditItem({ ...record, id: item.id });

      setForm({
        name:        record.name || "",
        destination: destId,
        status:      parseStatus(record.status),
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

    const destName = getDestinationName(form.destination);

    // ✅ Guard: catch broken destination lookup before hitting API
    if (!destName) {
      toast.error("Invalid destination selected. Please reselect.");
      return;
    }

    try {
      setIsSaving(true);

      const payload = {
        name:        form.name,
        destination: destName,
        status:      form.status,
      };

      if (editItem?.id) {
        await updatePickupDrop(editItem.id, payload);
        toast.success("Location updated successfully");
      } else {
        await createPickupDrop(userId, payload);
        toast.success("Location added successfully");
      }

      setModalOpen(false);
      setEditItem(null);
      loadData(); // no page reset on mutation
    } catch (err) {
      console.error("Save failed:", err);
      toast.error("Failed to save location");
    } finally {
      setIsSaving(false);
    }
  };

  // ── Delete ──
  const handleDeleteConfirm = async () => {
    if (!confirmDeleteId) return;
    try {
      setIsDeleting(true);
      await deletePickupDrop(confirmDeleteId);
      toast.success("Location deleted successfully");
      setConfirmDeleteId(null);
      loadData();
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete location");
    } finally {
      setIsDeleting(false);
    }
  };

  // ── Filter + paginate ──
// ✅ search against addedBy instead of destination
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
    <div className="pd-page">
      <div className="pd-card">

        {/* HEADER */}
        <div className="pd-header">
          <div>
            <h2 className="pd-title">Pickup / Drop</h2>
            <p className="pd-subtitle">Manage pickup &amp; drop location master data</p>
          </div>
          <div className="d-flex gap-2 flex-wrap">
            <input
              className="pd-search"
              placeholder="Search location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="pd-add-btn" onClick={openAdd}>
              <Plus size={15} /> Add Location
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="table-responsive" style={{ overflow: "visible" }}>
          <table className="pd-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
               <th>Added By</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={`shimmer-${i}`}>
                    <td><div className="shimmer-cell w-20"></div></td>
                    <td><div className="shimmer-cell w-60"></div></td>
                    <td><div className="shimmer-cell w-40"></div></td>
                    <td><div className="shimmer-cell w-30"></div></td>
                    <td><div className="shimmer-cell w-30"></div></td>
                  </tr>
                ))
              ) : currentData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="pd-empty">No locations found</td>
                </tr>
              ) : (
                currentData.map((item, idx) => (
                  <tr key={item.id}>
                    <td className="pd-serial">{indexOfFirst + idx + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.addedBy ?? "—"}</td>
                    <td>
                      {parseStatus(item.status) === 1
                        ? <span className="badge-active">Active</span>
                        : <span className="badge-inactive">Inactive</span>
                      }
                    </td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <button className="pd-edit-btn" onClick={() => openEdit(item)}>
                          <Pencil size={13} />
                        </button>

                        <div className="pd-delete-wrap">
                          <button
                            className={`pd-delete-btn${confirmDeleteId === item.id ? " armed" : ""}`}
                            onClick={() =>
                              setConfirmDeleteId(confirmDeleteId === item.id ? null : item.id)
                            }
                          >
                            <Trash2 size={13} />
                          </button>

                          {/* ✅ ref on popover div itself — stable across rows */}
                          {confirmDeleteId === item.id && (
                            <div className="pd-delete-popover" ref={popoverRef}>
                              <div className="pd-pop-arrow" />
                              <p className="pd-pop-title">Delete location?</p>
                              <p className="pd-pop-sub">
                                <strong>{deletingItem?.name}</strong> will be
                                permanently removed. This cannot be undone.
                              </p>
                              <div className="pd-pop-actions">
                                <button
                                  className="pd-pop-cancel"
                                  onClick={() => setConfirmDeleteId(null)}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="pd-pop-delete"
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
        <div className="pd-footer">
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

      <PickupDropModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditItem(null); }}
        onSave={handleSave}
        form={form}
        setForm={setForm}
        isEdit={!!editItem}
        isSaving={isSaving}
        destinations={destinations}
      />
    </div>
  );
}