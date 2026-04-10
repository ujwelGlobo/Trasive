import { useState, useEffect } from "react";
import StatusPills from "@/features/query/QueryList/components/StatusPills";
import QueryRow from "@/features/query/QueryList/components/QueryRow";
import AddQuery from "@/features/query/CreateQuery/pages/AddQuery";
import { useAuth } from "@/core/auth/AuthProvider";
import { getQueriesByUser, getStatus, getQueryById } from "@/features/query/QueryList/services/QueryService";
import { getassignTo } from "@/features/query/CreateQuery/services/QueryServicePage"; // ← add this
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
  const [assignees, setAssignees] = useState([]);  // ← add this state
//   const [selectedData, setSelectedData] = useState(null);
// const [isModalOpen, setIsModalOpen] = useState(false);

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
      setStatusCounts({ ...res });
    } catch (err) {
      console.error("Failed to fetch status counts:", err);
    }
  };

  // ✅ Always use this — refreshes BOTH rows and pill counts
  const refreshAll = () => {
    fetchQueries();
    fetchStatusCounts();
  };

const openAddQuery = async (query = null) => {
  try {
    // 👉 CREATE MODE
    if (!query) {
      setQueryToEdit(null);
      setAddQueryOpen(true);
      return;
    }

    // 👉 EDIT MODE → fetch fresh data
    const res = await getQueryById(query.id);

    if (res?.status) {
      setQueryToEdit(res.data); // ✅ REAL DATA FROM API
      setAddQueryOpen(true);
    }
  } catch (err) {
    console.error("Failed to fetch query by id:", err);
  }
};

  const closeAddQuery = () => {
    setAddQueryOpen(false);
    setQueryToEdit(null);
    refreshAll();
  };

useEffect(() => {
  if (userId) {
    fetchQueries();
    fetchStatusCounts();
    fetchAssignees();   // ← add this
  }
}, [userId]);


  useEffect(() => {
    setCurrentPage(1);
  }, [activeStatus]);

  const fetchAssignees = async () => {
  try {
    const res = await getassignTo(userId);
    const list = res?.data?.data ?? res?.data ?? res;
    setAssignees(Array.isArray(list) ? list : []);
  } catch (err) {
    console.error("Failed to fetch assignees:", err);
  }
};

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
              userId={userId}         // ✅ fixed: pass userId so assignees can be fetched
                assignees={assignees}   // ← add this
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