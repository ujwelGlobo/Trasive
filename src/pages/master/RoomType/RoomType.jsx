import { useState, useMemo } from "react";
import { Pencil } from "lucide-react";
import RoomTypeModal from "./RoomTypeModal";
import "./RoomTypes.css";

const dummyData = Array.from({ length: 15 }, (_, i) => ({
  name: `${i + 1} Bedroom Houseboat`,
  status: "Active",
  by: "Jinu George",
  date: "12-12-2025",
}));

const RoomType = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  /* SEARCH */
  const filtered = useMemo(() => {
    return dummyData.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  /* PAGINATION */
  const totalPages = Math.ceil(filtered.length / pageSize);
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
        <p className="room-subtitle">
          Manage available room types
        </p>
      </div>

      <button
        className="room-btn-primary"
        onClick={() => {
          setEditingItem(null);
          setModalOpen(true);
        }}
      >
        + Add Room Type
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

    {/* TABLE */}
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
        {paginated.map((item, i) => (
          <tr key={i}>
            <td className="room-name">{item.name}</td>

            <td>
              <span className="room-status room-active">
                {item.status}
              </span>
            </td>

            <td>
              <div className="room-user">
                <span className="room-avatar">J</span>
                {item.by}
              </div>
            </td>

            <td className="muted">{item.date}</td>

            <td className="align-left">
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

    {/* PAGINATION */}
    {totalPages > 1 && (
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
          Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
          Next
        </button>
      </div>
    )}

  </div>
</div>

      {modalOpen && (
        <RoomTypeModal
          data={editingItem}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default RoomType;
