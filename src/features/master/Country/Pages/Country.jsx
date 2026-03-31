import { useState, useEffect } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import CountryModal from "../components/CountryModal";
import {
  getCountries,
  createCountry,
  updateCountry,
  deleteCountry,
} from "../services/CountryServices";

import { useAuth } from "@/core/auth/AuthProvider";
import "./Country.css";

export default function CountryPage() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;

  const { user } = useAuth();

  const [form, setForm] = useState({
    name: "",
    sortname: "",
    phonecode: "",
    status: 1,
  });

  // ✅ Get userId safely
  const userId = user?.id ?? user?.user_id;

  // ✅ Fetch countries
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

  // ✅ Open Add
  const openAdd = () => {
    setEditItem(null);
    setForm({
      name: "",
      sortname: "",
      phonecode: "",
      status: 1,
    });
    setModalOpen(true);
  };

  // ✅ Open Edit
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

  // ✅ Save (Create / Update)
  const handleSave = async () => {
    if (!form.name.trim()) return;

    try {
      if (!editItem) {
        await createCountry(userId, {
          name: form.name,
          sortname: form.sortname,
          phonecode: form.phonecode,
          status: form.status,
          user_id: userId,
        });
      } else {
        await updateCountry(editItem.id, userId, {
          name: form.name,
          sortname: form.sortname,
          phonecode: form.phonecode,
          status: form.status,
        });
      }

      setModalOpen(false);
      fetchCountries();
    } catch (error) {
      console.error("Error saving country:", error?.response?.data || error);
    }
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this country?")) return;

    try {
      await deleteCountry(id);
      fetchCountries();
    } catch (error) {
      console.error("Error deleting country:", error);
    }
  };

  // ✅ Search filter
  const filtered = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

    const indexOfLast = currentPage * itemsPerPage;
const indexOfFirst = indexOfLast - itemsPerPage;

const currentData = filtered.slice(indexOfFirst, indexOfLast);

const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="country-page">
      <div className="country-card">

        {/* HEADER */}
        <div className="country-header">
          <div>
            <h4>Countries</h4>
            <span>Manage country master data</span>
          </div>

          <div className="country-actions">
            <input
              className="country-search"
              placeholder="Search country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button className="country-add-btn" onClick={openAdd}>
              <Plus size={16} />
              Add Country
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="country-table-wrapper">
          <table className="country-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Sort</th>
                <th>Phone Code</th>
                <th>Status</th>
                <th width="100">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td colSpan="5">
                      <div className="country-shimmer"></div>
                    </td>
                  </tr>
                ))
              ) : currentData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="country-empty">
                    No countries found
                  </td>
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

                    <td className="country-actions-cell">
                      <button
                        className="country-edit-btn"
                        onClick={() => openEdit(c)}
                      >
                        <Pencil size={14} />
                      </button>

                      <button
                        className="country-delete-btn"
                        onClick={() => handleDelete(c.id)}
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

        <div className="pagination">
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((p) => p - 1)}
  >
    Prev
  </button>

  <span>{currentPage} / {totalPages}</span>

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage((p) => p + 1)}
  >
    Next
  </button>
</div>

      </div>

      <CountryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        form={form}
        setForm={setForm}
        isEdit={!!editItem}
      />
    </div>
  );
}