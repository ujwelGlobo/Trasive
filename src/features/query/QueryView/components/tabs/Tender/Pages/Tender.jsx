import { useEffect, useState } from "react";
import {
  getItineraries,
  createItinerary,
  updateItinerary,
  deleteItinerary,
} from "@/features/query/QueryView/components/tabs/Tender/Service/TenderService";
import ItineraryModal from "../components/ItineraryModal";
import "./Tender.css";

const PAGE_SIZE = 5;

const ItineraryPage = ({ userId, queryId, destinationId }) => {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getItineraries(userId);
      if (res?.status) {
        setList(res.data);
        setFilteredList(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchData();
  }, [userId]);

  useEffect(() => {
    const filtered = list.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredList(filtered);
    setPage(1);
  }, [search, list]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = () => setOpenMenuId(null);
    if (openMenuId !== null) document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [openMenuId]);

  const totalPages = Math.max(1, Math.ceil(filteredList.length / PAGE_SIZE));
  const paginatedData = filteredList.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSave = async (form) => {
    try {
      const basePayload = {
        queryId,
        name: form.name,
        startDate: form.startDate,
        endDate: form.endDate,
        noOfDays: Number(form.days),
        adult: Number(form.adult),
        child: Number(form.child),
        notes: form.notes,
        destinationId,
      };
      if (editData) {
        await updateItinerary(editData.id, { ...basePayload, user_id: userId });
      } else {
        await createItinerary(userId, basePayload);
      }
      setModalOpen(false);
      setEditData(null);
      fetchData();
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const handleEdit = (item) => {
    setEditData({
      ...item,
      startDate: item.startDate?.split("T")[0],
      endDate: item.endDate?.split("T")[0],
      days: item.noOfDays,
    });
    setModalOpen(true);
    setOpenMenuId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this itinerary?")) return;
    try {
      await deleteItinerary(id);
      fetchData();
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setOpenMenuId(null);
    }
  };

  const handleArchive = (id) => {
    console.log("Archive API call here:", id);
    setOpenMenuId(null);
  };

  return (
    <div className="itin-page">
      {/* HEADER */}
      <div className="itin-header">
        <input
          className="itin-search-input"
          placeholder="Search itineraries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="itin-btn-primary"
          onClick={() => { setEditData(null); setModalOpen(true); }}
        >
          + Create Itinerary
        </button>
      </div>

      {/* TABLE */}
      <div className="itin-table-wrapper">
        {loading ? (
          <p className="itin-empty">Loading...</p>
        ) : paginatedData.length === 0 ? (
          <p className="itin-empty">No itineraries found</p>
        ) : (
          <table className="itin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Travel Dates</th>
                <th>Confirm</th>
                <th>Pax</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="itin-title-cell">
                      <strong>{item.name}</strong>
                      <span>#{item.packageId} · {item.destinations}</span>
                    </div>
                  </td>
                   <td>
                    <span className="itin-days-badge">{item.price}</span>
                  </td>
                    <td>
                    <span className="itin-days-badge">{item.confirmQuote}</span>
                  </td>
                  <td>
                    <div className="itin-date-cell">
                      <span><span className="itin-date-label">In &nbsp;</span>{item.startDate?.split("T")[0]}</span>
                      <span><span className="itin-date-label">Out </span>{item.endDate?.split("T")[0]}</span>
                    </div>
                  </td>
                  <td>
                    <span className="itin-pax-badge">
                      {item.adult}A · {item.child}C
                    </span>
                  </td>
                  <td className="itin-menu-cell">
                    <button
                      className="itin-menu-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === item.id ? null : item.id);
                      }}
                    >
                      ⋮
                    </button>
                    {openMenuId === item.id && (
                      <div className="itin-dropdown" onClick={(e) => e.stopPropagation()}>
                        <div className="itin-dropdown-item" onClick={() => handleEdit(item)}>
                          ✏️ Edit
                        </div>
                        <div className="itin-dropdown-item" onClick={() => handleArchive(item.id)}>
                          📦 Archive
                        </div>
                        <div className="itin-dropdown-divider" />
                        <div className="itin-dropdown-item danger" onClick={() => handleDelete(item.id)}>
                          🗑 Delete
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* PAGINATION */}
        <div className="itin-pagination">
          <span className="itin-pagination-info">
            {filteredList.length} result{filteredList.length !== 1 ? "s" : ""}
          </span>
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>← Prev</button>
          <span className="itin-page-indicator">{page} / {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next →</button>
        </div>
      </div>

      {/* MODAL */}
      <ItineraryModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditData(null); }}
        onSave={handleSave}
        editData={editData}
      />
    </div>
  );
};

export default ItineraryPage;