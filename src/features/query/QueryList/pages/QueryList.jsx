import { useState, useEffect } from "react";
import StatusPills from "@/features/query/QueryList/components/StatusPills";
import QueryRow from "@/features/query/QueryList/components/QueryRow";
import AddQuery from "@/features/query/CreateQuery/pages/AddQuery";
import { useAuth } from "@/core/auth/AuthProvider";
import { getQueriesByUser, getStatus } from "@/features/query/QueryList/services/QueryService";
import "./QueryList.css";

const STATUS_ID_MAP = {
  NEW: 1,
  ACTIVE: 2,
  NO_CONNECT: 3,
  HOT_LEAD: 4,
  FOLLOW_UP: 6,
  PROPOSAL_SENT: 8,
  CONFIRMED: 5,
  CANCELLED: 7,
  INVALID: 10,
};

// => $counts[1] ?? 0,
//                 'active'          => $counts[2] ?? 0,
//                 'no_connect'      => $counts[3] ?? 0,
//                 'hot_lead'        => $counts[4] ?? 0,
//                 'follow_up'       => $counts[6] ?? 0,
//                 'proposal_sent'   => $counts[8] ?? 0,
//                 'confirmed'       => $counts[5] ?? 0,
//                 'cancelled'       => $counts[7] ?? 0,
//                 'invalid'         => $counts[10] ?? 0,

const QueryList = () => {
  const { user } = useAuth();
  const userId = user?.id ?? user?.user_id;

  const [queries, setQueries] = useState([]);
  const [statusCounts, setStatusCounts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [addQueryOpen, setAddQueryOpen] = useState(false);
  const [queryToEdit, setQueryToEdit] = useState(null);

  // ── fetch helpers ──
  const fetchQueries = async () => {
    try {
      setLoading(true);
      const res = await getQueriesByUser(userId);
      if (res?.status && Array.isArray(res.data)) {
        setQueries(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch queries:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatusCounts = async () => {
    try {
      const res = await getStatus(userId);
      setStatusCounts({ ...res }); // spread forces re-render
    } catch (err) {
      console.error("Failed to fetch status counts:", err);
    }
  };

  // ✅ Always use this — refreshes BOTH rows and pill counts
  const refreshAll = () => {
    fetchQueries();
    fetchStatusCounts();
  };

  const openAddQuery = (query = null) => {
    setQueryToEdit(query);
    setAddQueryOpen(true);
  };

  const closeAddQuery = () => {
    setAddQueryOpen(false);
    setQueryToEdit(null);
    refreshAll(); // ✅ refresh on close, not on open
  };

  useEffect(() => {
    if (userId) {
      fetchQueries();
      fetchStatusCounts();
    }
  }, [userId]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeStatus]);

  const filteredQueries =
    activeStatus === "ALL"
      ? queries
      : queries.filter((q) => q.statusId === STATUS_ID_MAP[activeStatus]);

  const totalPages = Math.ceil(filteredQueries.length / rowsPerPage);

  const paginatedQueries = filteredQueries.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const showingFrom =
    filteredQueries.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;

  const showingTo = Math.min(currentPage * rowsPerPage, filteredQueries.length);

  return (
    <div className="query-page">
      <div className="query-header">
        <h2>Queries</h2>
        <p>Manage client travel enquiries</p>
      </div>

      <StatusPills
        activeStatus={activeStatus}
        onChange={setActiveStatus}
        statusCounts={statusCounts}
      />

      <div className="query-list">
        {loading ? (
          <div className="query-shimmer-wrapper">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="query-shimmer-row">
                <div className="query-shimmer query-shimmer-name" />
                <div className="query-shimmer query-shimmer-short" />
                <div className="query-shimmer query-shimmer-medium" />
                <div className="query-shimmer query-shimmer-short" />
              </div>
            ))}
          </div>
        ) : paginatedQueries.length > 0 ? (
          paginatedQueries.map((q) => (
            <QueryRow
              key={q.id}
              query={q}
              openAddQuery={openAddQuery}
            />
          ))
        ) : (
          <div className="empty-state">No queries found</div>
        )}
      </div>

      {!loading && filteredQueries.length > 0 && (
        <div className="it-footer">
          <span>
            Showing {showingFrom} to {showingTo} of {filteredQueries.length} entries
          </span>
          <div className="it-pagination">
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? "active" : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
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

      <AddQuery
        open={addQueryOpen}
        onClose={closeAddQuery}
        queryData={queryToEdit}
      />
    </div>
  );
};

export default QueryList;