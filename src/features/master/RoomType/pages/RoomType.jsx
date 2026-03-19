import { useState, useMemo, useEffect } from "react";
import { Pencil, Plus } from "lucide-react";
import RoomTypeModal from "./RoomTypeModal";
import { getRoomTypes } from "../services/RoomService";
import { useAuth } from "@/core/auth/AuthProvider";
import "./RoomTypes.css";

const RoomType = () => {
  const { user } = useAuth();
  const userId = user?.id;

  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchRoomTypes = async () => {
    if (!userId) return;

    setLoading(true);
    setFetchError("");

    try {
      const res = await getRoomTypes(userId);
      setRoomTypes(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      setFetchError(e.message || "Failed to load room types.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoomTypes();
  }, [userId]);

  const filtered = useMemo(() =>
    roomTypes.filter((item) =>
      (item.name ?? "").toLowerCase().includes(search.toLowerCase())
    ), [roomTypes, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  return (
    <>
      <div className="room-wrapper">
        <div className="room-card">

          {/* HEADER */}
          <div className="room-header">
            <div>
              <h2>Room Types</h2>
              <p className="room-subtitle">Manage available room types</p>
            </div>

            <button
              className="room-btn-primary"
              onClick={() => {
                setEditingItem(null);
                setModalOpen(true);
              }}
            >
              <Plus size={16} />
              <span>Add Room Type</span>
            </button>
          </div>

          {/* FILTERS */}
          <div className="room-filters">
            <select
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
              placeholder="Search room type..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          {/* TABLE WRAPPER FOR MOBILE */}
          <div className="table-wrapper">
            <table className="room-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Created By</th>
                  <th>Date</th>
                  <th className="align-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      Loading…
                    </td>
                  </tr>
                )}

                {!loading && fetchError && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", color: "#ef4444" }}>
                      {fetchError}
                    </td>
                  </tr>
                )}

                {!loading && !fetchError && paginated.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                      No room types found.
                    </td>
                  </tr>
                )}

                {!loading && !fetchError && paginated.map((item, i) => (
                  <tr key={item.id ?? i}>
                    <td className="room-name">{item.name}</td>

                    <td>
                      <span
                        className={`room-status ${
                          item.status === 1 ? "room-active" : "room-inactive"
                        }`}
                      >
                        {item.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td>
                      <div className="room-user">
                        <span className="room-avatar">
                          {String(item.addedBy ?? "?").charAt(0)}
                        </span>
                        {item.addedBy ?? "-"}
                      </div>
                    </td>

                    <td>
                      {item.dateAdded
                        ? new Date(item.dateAdded).toLocaleDateString()
                        : "-"}
                    </td>

                    <td>
                      <button
                        className="room-action-btn"
                        onClick={() => {
                          setEditingItem(item);
                          setModalOpen(true);
                        }}
                      >
                        <Pencil size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="pagination">
              <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                Prev
              </button>

              <span>Page {page} of {totalPages}</span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          )}

        </div>
      </div>

      {modalOpen && (
        <RoomTypeModal
          data={editingItem}
          userId={userId}
          onClose={() => setModalOpen(false)}
          onSuccess={fetchRoomTypes}
        />
      )}
    </>
  );
};

export default RoomType;