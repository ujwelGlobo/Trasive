import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import CurrencyModal from "../components/CurrencyModal";
import {
  getCurrencies,
  createCurrency,
  updateCurrency,
  deleteCurrency,
} from "../services/Currencyservices ";
import { useAuth } from "@/core/auth/AuthProvider";
import "./Currency.css";

const ITEMS_PER_PAGE = 10;

const emptyForm = {
  name: "",
  country: "",
  rate: "",
  status: "1",
};

export default function CurrencyPage() {
  const { user } = useAuth();
  const userId = user?.id ?? user?.user_id;

  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [isSaving, setIsSaving] = useState(false);

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0 });

  /* ── Fetch on mount ── */
  const fetchCurrencies = async () => {
    try {
      setLoading(true);
      const res = await getCurrencies();
      const raw = Array.isArray(res) ? res : (res.data ?? []);
     const list = raw.map((item) => ({
  id: item.id ?? item.currency_id ?? item.currencyId ?? item.CurrencyId ?? item._id ?? item.uuid,
  name: item.name,
  country: item.country,
  rate: Number(item.rate),
  // ← handle both "Active"/"Inactive" string and 1/0 number
  status: item.status === "Active" || Number(item.status) === 1 ? 1 : 0,
}));
      setCurrencies(list);
    } catch {
      toast.error("Failed to load currencies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  /* Reset page + close popover on new search */
  useEffect(() => {
    setCurrentPage(1);
    setConfirmDeleteId(null);
  }, [search]);

  /* Escape closes delete popover */
  useEffect(() => {
    const handle = (e) => {
      if (e.key === "Escape") setConfirmDeleteId(null);
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, []);

  /* Outside-click closes popover */
  useEffect(() => {
    if (confirmDeleteId === null) return;

    const handleMouseDown = (e) => {
      const path = e.composedPath ? e.composedPath() : [];
      const clickedInside = path.some(
        (el) =>
          el &&
          el.classList &&
          (el.classList.contains("cur-delete-wrap") ||
            el.classList.contains("cur-delete-popover"))
      );
      if (!clickedInside) setConfirmDeleteId(null);
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [confirmDeleteId]);

  /* ── CRUD handlers ── */

  const openAdd = () => {
    setEditItem(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  // Single openEdit — status always stored as string for the modal <select>
  const openEdit = (item) => {
    setEditItem(item);
    setForm({
      name: item.name || "",
      country: item.country || "",
      rate: item.rate || "",
      status:
        item.status !== undefined && item.status !== null
          ? String(item.status)
          : "1",
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    try {
      setIsSaving(true);
      const payload = {
        id: editItem?.id,
        name: form.name?.trim() || "",
        country: form.country?.trim() || "",
        rate: Number(form.rate),
        status: String(
          form.status !== undefined && form.status !== null ? form.status : 1
        ),
      };

      if (!editItem) {
        await createCurrency(userId, payload);
        toast.success("Currency added successfully");
      } else {
        await updateCurrency(editItem.id, payload);
        toast.success("Currency updated successfully");
      }
      setModalOpen(false);
      fetchCurrencies();
    } catch {
      toast.error("Failed to save currency");
    } finally {
      setIsSaving(false);
    }
  };

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

  const handleDeleteConfirm = async () => {
    if (confirmDeleteId === null) return;
    try {
      setIsDeleting(true);
      await deleteCurrency(confirmDeleteId);
      toast.success("Currency deleted successfully");
      setConfirmDeleteId(null);
      fetchCurrencies();
    } catch (err) {
      console.error("Delete error →", err);
      toast.error("Failed to delete currency");
    } finally {
      setIsDeleting(false);
    }
  };

  /* ── Filtering & pagination ── */
  const filtered = currencies.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.country?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const indexOfFirst = (currentPage - 1) * ITEMS_PER_PAGE;
  const indexOfLast = indexOfFirst + ITEMS_PER_PAGE;
  const currentData = filtered.slice(indexOfFirst, indexOfLast);

  const renderPagination = () => {
    const pages = [1];
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (totalPages > 1) pages.push(totalPages);
    const unique = [...new Set(pages)].sort((a, b) => a - b);

    const items = [];
    let prev = 0;
    for (const p of unique) {
      if (p - prev > 1) {
        items.push(
          <span key={`e${p}`} className="pg-ellipsis">···</span>
        );
      }
      items.push(
        <button
          key={p}
          className={`pg-btn${p === currentPage ? " active" : ""}`}
          onClick={() => setCurrentPage(p)}
          disabled={p === currentPage}
        >
          {p}
        </button>
      );
      prev = p;
    }
    return items;
  };

  const deletingCurrency = currencies.find((c) => c.id === confirmDeleteId);

  return (
    <div className="cur-page">
      <div className="cur-card">

        {/* HEADER */}
        <div className="cur-header">
          <div>
            <h2 className="cur-title">Currency Master</h2>
            <p className="cur-subtitle">Manage currency exchange rates</p>
          </div>
          <div className="d-flex gap-2 flex-wrap align-items-center">
            <input
              className="cur-search"
              placeholder="Search currency or country…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="cur-add-btn" onClick={openAdd}>
              <Plus size={15} />
              Add Currency
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="table-responsive">
          <table className="cur-table">
            <thead>
              <tr>
                <th>Currency</th>
                <th>Country</th>
                <th>Rate</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={`shimmer-${i}`}>
                    <td><div className="shimmer-cell w-60" /></td>
                    <td><div className="shimmer-cell w-50" /></td>
                    <td><div className="shimmer-cell w-30" /></td>
                    <td><div className="shimmer-cell w-40" /></td>
                    <td><div className="shimmer-cell w-40" /></td>
                  </tr>
                ))
              ) : currentData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="cur-empty">
                    <div className="cur-empty-icon">💱</div>
                    {search
                      ? `No currencies match "${search}"`
                      : "No currencies found"}
                  </td>
                </tr>
              ) : (
                currentData.map((c, idx) => (
                  <tr key={c.id ?? idx}>
                    <td className="cur-name-cell">
                      <strong>{c.name}</strong>
                    </td>
                    <td>{c.country}</td>
                    <td className="cur-rate-cell">{Number(c.rate).toFixed(4)}</td>
                    <td>
                      {c.status === 1 ? (
                        <span className="badge-active">Active</span>
                      ) : (
                        <span className="badge-inactive">Inactive</span>
                      )}
                    </td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">

                        {/* Edit */}
                        <button
                          className="cur-edit-btn"
                          onClick={() => openEdit(c)}
                          aria-label="Edit currency"
                        >
                          <Pencil size={13} />
                        </button>

                        {/* Delete */}
                        <div className="cur-delete-wrap">
                          <button
                            className={`cur-delete-btn${confirmDeleteId === c.id ? " armed" : ""}`}
                            onMouseDown={(e) => e.stopPropagation()}
                            onClick={(e) => handleDeleteClick(e, c.id)}
                            aria-label="Delete currency"
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
        <div className="cur-footer">
          <span>
            Showing{" "}
            {filtered.length === 0 ? 0 : indexOfFirst + 1} to{" "}
            {Math.min(indexOfLast, filtered.length)} of {filtered.length} entries
          </span>
          <div className="cur-pagination">
            <button
              className="pg-btn nav"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              ← Prev
            </button>
            {renderPagination()}
            <button
              className="pg-btn nav"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* DELETE POPOVER */}
      {confirmDeleteId !== null && (
        <div
          className="cur-delete-popover"
          style={{
            position: "fixed",
            top: popoverPos.top,
            left: popoverPos.left,
            transform: "translateY(calc(-100% - 10px))",
            zIndex: 9999,
          }}
        >
          <div className="cur-pop-arrow" />
          <p className="cur-pop-title">Delete currency?</p>
          <p className="cur-pop-sub">
            <strong>{deletingCurrency?.name}</strong> will be permanently removed.
          </p>
          <div className="cur-pop-actions">
            <button
              className="cur-pop-cancel"
              onClick={() => setConfirmDeleteId(null)}
            >
              Cancel
            </button>
            <button
              className="cur-pop-delete"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting…" : "Delete"}
            </button>
          </div>
        </div>
      )}

      <CurrencyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        form={form}
        setForm={setForm}
        isEdit={!!editItem}
        isSaving={isSaving}
      />
    </div>
  );
}