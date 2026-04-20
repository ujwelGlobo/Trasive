import { useState, useMemo, useEffect } from "react";
import { Plus, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ItineraryModal from "./ItineraryModal";
import { useAuth } from "@/core/auth/AuthProvider";
import {
  createItinerary,
  updateItinerary,
  getItinerary,
} from "../services/ItineraryService"; // adjust path as needed
import {getDestinations} from "../../master/Destination/services/DestinationService"
import "./Itinerary.css";

export default function Itineraries() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
   const [destinations, setDestinations] = useState([]);

   const { user } = useAuth();
const userId = user?.id ?? user?.user_id;

  /* ── Fetch on mount ── */
useEffect(() => {
  if (userId) {
    fetchItineraries();
    fetchDestinations();
  }
}, [userId]);

  const fetchItineraries = async () => {
    try {
      setLoading(true);
      const res = await getItinerary(userId);
      if (res?.status && Array.isArray(res.data)) {
        setData(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch itineraries:", err);
    } finally {
      setLoading(false);
    }
  };

 const fetchDestinations = async () => {
  if (!userId) return; // ✅ prevent undefined call

  try {
    const res = await getDestinations(userId);
    if (res?.status && Array.isArray(res.data)) {
      setDestinations(res.data);
    }
  } catch (err) {
    console.error("Failed to fetch destinations:", err);
  }
};

  /* ── Pagination ── */
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return data.slice(start, start + rowsPerPage);
  }, [data, currentPage, rowsPerPage]);

  /* ── Add ── */
  const handleAdd = () => {
    setEditData(null);
    setOpen(true);
  };

  /* ── Edit ── */
  const handleEdit = (item) => {
    setEditData(item);
    setOpen(true);
  };

const handleSave = async () => {
  await fetchItineraries();
  setOpen(false);
};

  /* ── Helpers ── */
  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getDuration = (item) =>
    item.noOfDays ? `${item.noOfDays} Days` : "—";

  return (
    <>
      <div className="it-page">
        <div className="it-container">
          <div className="it-card">
            {/* HEADER */}
            <div className="it-header">
              <div>
                <h2>Itineraries</h2>
                <p>Manage travel plans and tour packages</p>
              </div>

              <div className="it-actions">
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>

                <button className="it-btn primary" onClick={handleAdd}>
                  <Plus size={16} /> Create Itinerary
                </button>
              </div>
            </div>

            {/* TABLE */}
            {loading ?  (
                 <div className="it-shimmer-wrapper">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="it-shimmer-row">
        <div className="it-shimmer it-shimmer-title" />
        <div className="it-shimmer it-shimmer-short" />
        <div className="it-shimmer it-shimmer-short" />
        <div className="it-shimmer it-shimmer-medium" />
        <div className="it-shimmer it-shimmer-short" />
      </div>
    ))}
  </div>
                ): (
              <table className="it-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Duration</th>
                     <th>Price</th>
                    <th>AddedBy</th>
                    <th>Start Date</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedData.map((item) => (
                    <tr key={item.id}>
                      {/* Clickable title */}
                      <td
                        className="it-title clickable"
                        onClick={() => navigate(`/itineraries/${item.id}`)}
                      >
                        {item.name}
                      </td>
                      <td>{getDuration(item)}</td>
                       <td>{item.price || "—"}</td>
                                              <td>{item.addedBy || "—"}</td>

                      <td>{formatDate(item.startDate)}</td>

                      <td>
                        <button
                          className="it-edit"
                          onClick={() => handleEdit(item)}
                        >
                          <Pencil size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* FOOTER */}
            {!loading && (
              <div className="it-footer">
                <span>
                  Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
                  {Math.min(currentPage * rowsPerPage, data.length)} of{" "}
                  {data.length} entries
                </span>

                <div className="it-pagination">
                  <button
                    onClick={() => setCurrentPage((p) => p - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      className={currentPage === index + 1 ? "active" : ""}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((p) => p + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ItineraryModal
        isOpen={open}
        onClose={() => setOpen(false)}
        initialData={editData}
        onSave={handleSave}
         destinationsList={destinations} // 👈 pass here
      />
    </>
  );
}