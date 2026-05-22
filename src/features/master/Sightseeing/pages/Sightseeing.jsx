import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import SightseeingModal from "./SightseeingModal";
import {
  getSightseeings,
  getSightseeingById,
  createSightseeing,
  updateSightseeing,
  deleteSightseeing,
} from "../services/sightseeingService";
import { getDestinations } from "../../Destination/services/DestinationService";
import { getVehicles }     from "../../Vehicle/services/Vehicleservice";
import { useAuth } from "@/core/auth/AuthProvider";
import toast from "react-hot-toast";
import "./Sightseeing.css";

const parseStatus = (val) => {
  const s = String(val ?? "").toLowerCase();
  return s === "1" || s === "true" || s === "active" ? 1 : 0;
};

const USER_TYPE = 4;

const EMPTY_FORM = {
  name:         "",
  destination:  "",
  type:         "",
  details:      "",
  status:       1,
  vehicleId:    "",
  photo:        null,
  photoPreview: null,
};

export default function Sightseeing() {
  const { user } = useAuth();
  const adminId  = user?.id ?? user?.user_id;

  const [data,            setData]            = useState([]);
  const [destinations,    setDestinations]    = useState([]);
  const [vehicles,        setVehicles]        = useState([]);
  const [search,          setSearch]          = useState("");
  const [loading,         setLoading]         = useState(false);
  const [modalOpen,       setModalOpen]       = useState(false);
  const [editItem,        setEditItem]        = useState(null);
  const [isSaving,        setIsSaving]        = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [isDeleting,      setIsDeleting]      = useState(false);
  const [currentPage,     setCurrentPage]     = useState(1);
  const itemsPerPage = 10;
  const popoverRef   = useRef(null);

  const [form, setForm] = useState({ ...EMPTY_FORM });

  /* ── Fetch sightseeing list ── */
  const loadData = useCallback(async (resetPage = false) => {
  if (!adminId) return;
  try {
    setLoading(true);
    const res  = await getSightseeings(adminId);
    const list = Array.isArray(res) ? res : res.data ?? res.result ?? [];
    // Explicitly preserve status field
    const normalized = list.map((item) => ({
      ...item,
      status: item.status ?? item.Status ?? "Inactive",
    }));
    setData(normalized);
    if (resetPage) setCurrentPage(1);
  } catch (err) {
    console.error("Failed to load sightseeings:", err);
    toast.error("Failed to load sightseeings");
  } finally {
    setLoading(false);
  }
}, [adminId]);

  /* ── Fetch destinations + vehicles for dropdowns ── */
  const loadDropdowns = useCallback(async () => {
    if (!adminId) return;
    try {
      const [destRes, vehRes] = await Promise.all([
        getDestinations(adminId),
        getVehicles(adminId),
      ]);
      const destList = Array.isArray(destRes) ? destRes : destRes.data ?? destRes.result ?? [];
      const vehList  = Array.isArray(vehRes)  ? vehRes  : vehRes.data  ?? vehRes.result  ?? [];
      setDestinations(destList);
      setVehicles(vehList);
    } catch (err) {
      console.error("Failed to load dropdowns:", err);
      toast.error("Failed to load dropdown data");
    }
  }, [adminId]);

  useEffect(() => { loadData(true);   }, [loadData]);
  useEffect(() => { loadDropdowns();  }, [loadDropdowns]);
  useEffect(() => { setCurrentPage(1); }, [search]);

  /* ── Close popover on outside click ── */
  useEffect(() => {
    if (!confirmDeleteId) return;
    const handle = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target))
        setConfirmDeleteId(null);
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
    setForm({ ...EMPTY_FORM });
    setModalOpen(true);
  };

  /* ── Open Edit ── */
  const openEdit = async (item) => {
    try {
      const res    = await getSightseeingById(item.id);
      const record = res.data ?? res.result ?? res;

      setEditItem({ ...record, id: item.id });
      setForm({
        name:         record.name        || "",
       destination: record.destination || "",  // was: String(record.destinationId ?? ...)
        type:         record.type        || "",
        details:      record.details     || "",
        status:       parseStatus(record.status),
        vehicleId:    String(record.vehicleId ?? record.vehicle_id ?? ""),
        photo:        null,
        photoPreview: record.photo       || null,
      });
      setModalOpen(true);
    } catch (err) {
      console.error("openEdit failed:", err);
      toast.error("Could not load record");
    }
  };

  /* ── Save ── */
  const handleSave = async () => {
    if (!form.name.trim() || !form.destination) return;

    try {
      setIsSaving(true);

      const fd = new FormData();
      fd.append("name",          form.name);
      fd.append("destination", form.destination);
      fd.append("type",          form.type);
      fd.append("details",       form.details);
      fd.append("status",        form.status);
      fd.append("vehicleId",     form.vehicleId);
      if (form.photo instanceof File) fd.append("photo", form.photo);

      if (editItem?.id) {
        await updateSightseeing(editItem.id, fd);
        toast.success("Sightseeing updated successfully");
      } else {
        await createSightseeing(adminId, USER_TYPE, fd);
        toast.success("Sightseeing added successfully");
      }

      setModalOpen(false);
      setEditItem(null);
      loadData(true);
    } catch (err) {
      console.error("Save failed:", err);
      toast.error("Failed to save sightseeing");
    } finally {
      setIsSaving(false);
    }
  };

  /* ── Delete ── */
  const handleDeleteConfirm = async () => {
    if (!confirmDeleteId) return;
    try {
      setIsDeleting(true);
      await deleteSightseeing(confirmDeleteId);
      toast.success("Sightseeing deleted successfully");
      setConfirmDeleteId(null);
      loadData(true);
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete sightseeing");
    } finally {
      setIsDeleting(false);
    }
  };

  /* ── Filter + paginate ── */
  const filtered = useMemo(
    () => data.filter(Boolean).filter((d) =>
      (d.name        ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (d.destination ?? "").toLowerCase().includes(search.toLowerCase())
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
    let prev     = 0;
    for (const p of unique) {
      if (p - prev > 1)
        items.push(<span key={`ellipsis-${p}`} className="ss-pg-ellipsis">···</span>);
      items.push(
        <button
          key={`page-${p}`}
          className={`ss-pg-btn${p === currentPage ? " active" : ""}`}
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
    <div className="ss-page">
      <div className="ss-card">

        {/* HEADER */}
        <div className="ss-header">
          <div>
            <h2 className="ss-title">Sightseeing</h2>
            <p className="ss-subtitle">Manage sightseeing master data</p>
          </div>
          <div className="d-flex gap-2 flex-wrap">
            <input
              className="ss-search"
              placeholder="Search sightseeing..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="ss-add-btn" onClick={openAdd}>
              <Plus size={15} /> Add Sightseeing
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="table-responsive" style={{ overflow: "visible" }}>
          <table className="ss-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Destination</th>
                <th>Status</th>
                <th>Added By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={`shimmer-${i}`}>
                    <td><div className="ss-shimmer w-20"></div></td>
                    <td>
                      <div className="ss-name-cell">
                        <div className="ss-shimmer ss-shimmer-img"></div>
                        <div className="ss-shimmer w-60"></div>
                      </div>
                    </td>
                    <td><div className="ss-shimmer w-40"></div></td>
                    <td><div className="ss-shimmer w-30"></div></td>
                    <td><div className="ss-shimmer w-30"></div></td>
                    <td><div className="ss-shimmer w-30"></div></td>
                  </tr>
                ))
              ) : currentData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="ss-empty">No sightseeings found</td>
                </tr>
              ) : (
                currentData.map((item, idx) => (
                  <tr key={item.id}>
                    <td className="ss-serial">{indexOfFirst + idx + 1}</td>
                    <td>
                      <div className="ss-name-cell">
                        {item.photo ? (
                          <img src={item.photo} alt={item.name} className="ss-thumb" />
                        ) : (
                          <div className="ss-thumb-placeholder" />
                        )}
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td>{item.destination}</td>
                    <td>
                    {console.log("STATUS RAW:", JSON.stringify(item.status))}
  {String(item.status).toLowerCase() === "active"
    ? <span className="ss-badge-active">Active</span>
    : <span className="ss-badge-inactive">Inactive</span>
  }
                    </td>
                    <td>{item.addedby}</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <button className="ss-edit-btn" onClick={() => openEdit(item)}>
                          <Pencil size={13} />
                        </button>

                        <div
                          className="ss-delete-wrap"
                          ref={confirmDeleteId === item.id ? popoverRef : null}
                        >
                          <button
                            className={`ss-delete-btn${confirmDeleteId === item.id ? " armed" : ""}`}
                            onClick={() =>
                              setConfirmDeleteId(confirmDeleteId === item.id ? null : item.id)
                            }
                          >
                            <Trash2 size={13} />
                          </button>

                          {confirmDeleteId === item.id && (
                            <div className="ss-delete-popover">
                              <div className="ss-pop-arrow" />
                              <p className="ss-pop-title">Delete sightseeing?</p>
                              <p className="ss-pop-sub">
                                <strong>{deletingItem?.name}</strong> will be
                                permanently removed. This cannot be undone.
                              </p>
                              <div className="ss-pop-actions">
                                <button
                                  className="ss-pop-cancel"
                                  onClick={() => setConfirmDeleteId(null)}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="ss-pop-delete"
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
        <div className="ss-footer">
          <span>
            Showing{" "}
            {filtered.length === 0 ? 0 : indexOfFirst + 1} to{" "}
            {Math.min(indexOfLast, filtered.length)} of {filtered.length} entries
          </span>
          <div className="ss-pagination">
            <button
              className="ss-pg-btn nav"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >← Prev</button>
            {renderPagination()}
            <button
              className="ss-pg-btn nav"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((p) => p + 1)}
            >Next →</button>
          </div>
        </div>

      </div>

      <SightseeingModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditItem(null); }}
        onSave={handleSave}
        form={form}
        setForm={setForm}
        isEdit={!!editItem}
        isSaving={isSaving}
        destinations={destinations}
        vehicles={vehicles}
      />
    </div>
  );
}