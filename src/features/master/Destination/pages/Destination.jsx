import { Plus, PencilLine } from "lucide-react";
import { useState, useMemo } from "react";
import DestinationModal from "./DestinationModal";
import "./Destination.css";

const destinations = [
  "Alleppey",
  "Ardusat",
  "Arinis",
  "Asuaju de Sus",
  "Athirappilly",
  "Baia Mare",
  "Berlin",
  "Dubai",
  "Goa",
  "Kerala",
  "Munnar",
  "Ooty",
];

export default function Destination() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // 🔹 SEARCH FILTER
  const filtered = useMemo(() => {
    return destinations.filter((d) =>
      d.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // 🔹 PAGINATION
  const totalPages = Math.ceil(filtered.length / pageSize);
  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  return (
    <div className="destination-page">
      <div className="destination-card">

        {/* HEADER */}
        <div className="destination-header">
          <div>
            <h2>Destinations</h2>
            <p>Manage all travel destinations</p>
          </div>

          <button className="add-btn" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} />
            Add Destination
          </button>
        </div>

        {/* FILTER BAR */}
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
            placeholder="Search destination…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {/* LIST */}
        <div className="destination-list">
          {paginated.map((name, index) => (
            <div className="destination-row" key={index}>
              <span className="dest-name">{name}</span>
              <button
                className="edit-btn"
                onClick={() => {
                  setEditingDestination({ name });
                  setIsModalOpen(true);
                }}
              >
                <PencilLine size={14} />
              </button>
            </div>
          ))}

          {paginated.length === 0 && (
            <div className="empty-state">No destinations found</div>
          )}
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
          onClose={() => {
            setIsModalOpen(false);
            setEditingDestination(null);
          }}
          initialData={editingDestination}
        />
      )}
    </div>
  );
}
