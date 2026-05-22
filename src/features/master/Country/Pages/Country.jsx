import { useState, useEffect, useRef } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import CountryModal from "../components/CountryModal";
import {
  getCountries,
  createCountry,
  updateCountry,
  deleteCountry,
} from "../services/CountryServices";
import { useAuth } from "@/core/auth/AuthProvider";
import toast from "react-hot-toast";
import "./Country.css";

export default function CountryPage() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { user } = useAuth();
  const userId = user?.id ?? user?.user_id;
  const popoverRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    sortname: "",
    phonecode: "",
    status: 1,
  });

  const fetchCountries = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const res = await getCountries();
      const formatted = res.data.map((item) => ({
        id: item.id,
        name: item.name,
        sortname: item.sortname,
        phonecode: item.phonecode,
        status: Number(item.status),
      }));
      setCountries(formatted);
    } catch (error) {
      console.error("Error fetching countries:", error);
      toast.error("Failed to load countries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) return;
    fetchCountries();
  }, [userId]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  /* ── Close popover on outside click ── */
  useEffect(() => {
    if (!confirmDeleteId) return;
    const handleOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setConfirmDeleteId(null);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [confirmDeleteId]);

  /* ── Close popover on Escape ── */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setConfirmDeleteId(null);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const openAdd = () => {
    setEditItem(null);
    setForm({ name: "", sortname: "", phonecode: "", status: 1 });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    setForm({
      name: item.name,
      sortname: item.sortname,
      phonecode: item.phonecode,
      status: item.status,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    try {
      setIsSaving(true);
      if (!editItem) {
        await createCountry(userId, {
          name: form.name,
          sortname: form.sortname,
          phonecode: form.phonecode,
          status: form.status,
          user_id: userId,
        });
        toast.success("Country added successfully");
      } else {
        await updateCountry(editItem.id, userId, {
          name: form.name,
          sortname: form.sortname,
          phonecode: form.phonecode,
          status: form.status,
        });
        toast.success("Country updated successfully");
      }
      setModalOpen(false);
      fetchCountries();
    } catch (error) {
      console.error("Error saving country:", error?.response?.data || error);
      toast.error("Failed to save country");
    } finally {
      setIsSaving(false);
    }
  };

const handleDeleteConfirm = async () => {
  if (!confirmDeleteId) return;

  try {
    setIsDeleting(true); // 🔥 start loader

    await deleteCountry(confirmDeleteId);

    toast.success("Country deleted successfully");
    setConfirmDeleteId(null);
    fetchCountries();
  } catch (error) {
    toast.error("Failed to delete country");
  } finally {
    setIsDeleting(false); // 🔥 stop loader
  }
};

  const filtered = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

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
        items.push(<span key={`e${p}`} className="pg-ellipsis">···</span>);
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

  const deletingCountry = countries.find((c) => c.id === confirmDeleteId);

  return (
    <div className="cty-page">
      <div className="cty-card">

        {/* HEADER */}
        <div className="cty-header">
          <div>
            <h2 className="cty-title">Countries</h2>
            <p className="cty-subtitle">Manage country master data</p>
          </div>
          <div className="d-flex gap-2 flex-wrap">
            <input
              className="cty-search"
              placeholder="Search country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="cty-add-btn" onClick={openAdd}>
              <Plus size={15} />
              Add Country
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="table-responsive"style={{ overflow: "visible" }}>
          <table className="cty-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Sort</th>
                <th>Phone Code</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td><div className="shimmer-cell w-60"></div></td>
                    <td><div className="shimmer-cell w-40"></div></td>
                    <td><div className="shimmer-cell w-40"></div></td>
                    <td><div className="shimmer-cell w-50"></div></td>
                    <td><div className="shimmer-cell w-40"></div></td>
                  </tr>
                ))
              ) : currentData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="cty-empty">No countries found</td>
                </tr>
              ) : (
                currentData.map((c) => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.sortname}</td>
                    <td>{c.phonecode}</td>
                    <td>
                      {c.status === 1 ? (
                        <span className="badge-active">Active</span>
                      ) : (
                        <span className="badge-inactive">Inactive</span>
                      )}
                    </td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <button className="cty-edit-btn" onClick={() => openEdit(c)}>
                          <Pencil size={13} />
                        </button>

                        {/* Delete button + popover */}
                        <div
                          className="cty-delete-wrap"
                          ref={confirmDeleteId === c.id ? popoverRef : null}
                        >
                          <button
                            className={`cty-delete-btn${confirmDeleteId === c.id ? " armed" : ""}`}
                            onClick={() =>
                              setConfirmDeleteId(
                                confirmDeleteId === c.id ? null : c.id
                              )
                            }
                          >
                            <Trash2 size={13} />
                          </button>

                          {confirmDeleteId === c.id && (
                            <div className="cty-delete-popover">
                              <div className="cty-pop-arrow" />
                              <p className="cty-pop-title">Delete country?</p>
                              <p className="cty-pop-sub">
                                <strong>{deletingCountry?.name}</strong> will be
                                permanently removed. This cannot be undone.
                              </p>
                              <div className="cty-pop-actions">
                                <button
                                  className="cty-pop-cancel"
                                  onClick={() => setConfirmDeleteId(null)}
                                >
                                  Cancel
                                </button>
                               <button
  className="cty-pop-delete"
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
        <div className="cty-footer">
          <span>
            Showing{" "}
            {filtered.length === 0 ? 0 : indexOfFirst + 1} to{" "}
            {Math.min(indexOfLast, filtered.length)} of {filtered.length} entries
          </span>
          <div className="cty-pagination">
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

      <CountryModal
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