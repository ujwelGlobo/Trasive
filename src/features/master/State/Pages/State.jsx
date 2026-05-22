import { useState, useEffect } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import StateModal from "../components/StateModal";
import {
  getStates,
  createState,
  updateState,
  deleteState,
} from "../services/StateService";
import { getCountries } from "../../Country/services/CountryServices";
import { useAuth } from "@/core/auth/AuthProvider";
import "../Pages/state.css"

export default function StatePage() {

  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const userId = user?.id ?? user?.user_id;
  const [form, setForm] = useState({
    countryId: "",
    name: "",
    status: 1,
  });

  // ✅ Fetch countries (for dropdown)
  const fetchCountries = async () => {
    try {
      const res = await getCountries();

      const formatted = res.data.map((c) => ({
        id: c.id,
        name: c.name,
      }));
      setCountries(formatted);
    } catch (err) {
      console.error("Error fetching countries:", err);
    }
  };

  // ✅ Fetch states
  const fetchStates = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const res = await getStates();
      const formatted = res.data.map((item) => ({
        id: item.id,
        name: item.name || "",
        countryId: Number(item.countryId),
        countryName:
          item.countryName ||
          countries.find((c) => c.id === Number(item.countryId))?.name ||
          "-",
        status: Number(item.status),
      }));

      setStates(formatted);
    } catch (err) {
      console.error("Error fetching states:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load both
  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
  setCurrentPage(1);
}, [search]);

  useEffect(() => {
    if (!userId) return;
    fetchStates();
  }, [userId, countries]);

  // ✅ Add
  const openAdd = () => {
    setEditItem(null);
    setForm({
      countryId: "",
      name: "",
      status: 1,
    });
    setModalOpen(true);
  };

  // ✅ Edit
  const openEdit = (item) => {
    setEditItem(item);
    setForm({
      countryId: item.countryId,
      name: item.name,
      status: item.status,
    });
    setModalOpen(true);
  };

  // ✅ Save
  const handleSave = async () => {
    if (!form.name.trim() || !form.countryId) return;

    try {
      if (!editItem) {
        await createState(userId, {
          countryId: Number(form.countryId),
          name: form.name,
          status: form.status,
        });
      } else {
        await updateState(editItem.id, userId, {
          countryId: Number(form.countryId),
          name: form.name,
          status: form.status,
        });
      }

      setModalOpen(false);
      fetchStates();
    } catch (err) {
      console.error("Error saving state:", err?.response?.data || err);
    }
  };
  

  // ✅ Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this state?")) return;

    try {
      await deleteState(id);
      fetchStates();
    } catch (err) {
      console.error("Error deleting state:", err);
    }
  };


  // ✅ Search
  const filtered = states.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );
  const indexOfLast = currentPage * itemsPerPage;
const indexOfFirst = indexOfLast - itemsPerPage;

const currentData = filtered.slice(indexOfFirst, indexOfLast);

const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="state-page">
      <div className="state-card">

        {/* HEADER */}
        <div className="state-header">
          <div>
            <h4>States</h4>
            <span>Manage state master data</span>
          </div>

          <div className="state-actions">
            <input
              className="state-search"
              placeholder="Search state..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button className="state-add-btn" onClick={openAdd}>
              <Plus size={16} />
              Add State
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="state-table-wrapper">
          <table className="state-table">
            <thead>
              <tr>
                <th>State</th>
                <th>Country</th>
                <th>Status</th>
                <th width="100">Actions</th>
              </tr>
            </thead>

            <tbody>
            
              {loading ? (
               [...Array(5)].map((_, i) => (
                  <tr key={i}>
      <td><div className="shimmer-row w-60"></div></td>
      <td><div className="shimmer-row w-40"></div></td>
      <td><div className="shimmer-row w-40"></div></td>
      <td><div className="shimmer-row w-60"></div></td>
    </tr>

                ))
              ) : currentData.length === 0 ? (
                <tr>
                  <td colSpan="4" className="state-empty">
                    No states found
                  </td>
                </tr>
              ) : (
                currentData.map((s) => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>{s.countryName}</td>

                    <td>
                      {s.status === 1 ? (
                        <span className="state-badge-active">Active</span>
                      ) : (
                        <span className="state-badge-inactive">Inactive</span>
                      )}
                    </td>

                    <td className="state-actions-cell">
                      <button
                        className="state-edit-btn"
                        onClick={() => openEdit(s)}
                      >
                        <Pencil size={14} />
                      </button>

                      <button
                        className="state-delete-btn"
                        onClick={() => handleDelete(s.id)}
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

      <StateModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        form={form}
        setForm={setForm}
        isEdit={!!editItem}
        countries={countries}   // 🔥 important
      />
    </div>
  );
}