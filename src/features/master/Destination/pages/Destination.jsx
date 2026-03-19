import { Plus, PencilLine } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useAuth } from "@/core/auth/AuthProvider";
import { getDestinations } from "../services/DestinationService";
import DestinationModal from "./DestinationModal";
import "./Destination.css";

export default function Destination() {
  const { user } = useAuth();
  const userId = user?.id;

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDest, setEditingDest] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchDestinations = async () => {
    if (!userId) return;

    setLoading(true);
    setFetchError("");

    try {
      const res = await getDestinations(userId);
      setDestinations(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      setFetchError(e.message || "Failed to load destinations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, [userId]);

  const filtered = useMemo(() => {
    return destinations.filter((d) =>
      (d.name ?? "").toLowerCase().includes(search.toLowerCase())
    );
  }, [destinations, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const openAdd = () => {
    setEditingDest(null);
    setIsModalOpen(true);
  };

  const openEdit = (dest) => {
    setEditingDest(dest);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDest(null);
  };

  return (
    <div className="destination-page">
      <div className="destination-card">

        {/* HEADER */}
        <div className="destination-header">
          <div className="destination-title">
            <h2>Destinations</h2>
            <p>Manage all travel destinations</p>
          </div>

          <button className="add-btn" onClick={openAdd}>
            <Plus size={16} />
            <span>Add Destination</span>
          </button>
        </div>

        {/* FILTERS */}
        <div className="destination-filters">
          <select
            className="saas-select"
            value={pageSize}
            onChange={(e) => {
              setPageSize(+e.target.value);
              setPage(1);
            }}
          >
            <option value={10}>Show 10</option>
            <option value={25}>Show 25</option>
          </select>

          <input
            type="text"
            placeholder="Search destination..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {/* LIST */}
        <div className="destination-list">

          {loading && <div className="empty-state">Loading...</div>}

          {!loading && fetchError && (
            <div className="empty-state error">{fetchError}</div>
          )}

          {!loading && !fetchError && paginated.length === 0 && (
            <div className="empty-state">No destinations found.</div>
          )}

          {!loading &&
            !fetchError &&
            paginated.map((dest, i) => (
              <div className="destination-row" key={dest.id ?? i}>
                <span className="dest-name">{dest.name}</span>

                <button
                  className="edit-btn"
                  onClick={() => openEdit(dest)}
                >
                  <PencilLine size={14} />
                </button>
              </div>
            ))}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <DestinationModal
          onClose={closeModal}
          initialData={editingDest}
          onSuccess={fetchDestinations}
          userId={userId}
        />
      )}
    </div>
  );
}