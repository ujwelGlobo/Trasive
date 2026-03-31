import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/core/auth/AuthProvider";
import { getQueryById } from "@/features/query/QueryView/service/QueryViewService";

import "./QueryView.css";

// Create Query
import AddQuery from "@/features/query/CreateQuery/pages/AddQuery.jsx";

// Tabs
import Informations  from "@/features/query/QueryView/components/tabs/Informations/pages/Informations";
import Tender        from "@/features/query/QueryView/components/tabs/tender/pages/Tender";
import Mails         from "@/features/query/QueryView/components/tabs/mails/pages/Mails";
import Followups     from "@/features/query/QueryView/components/tabs/followups/pages/Followups";
import Supplierquery from "@/features/query/QueryView/components/tabs/Suppliers/pages/Supplierquery";
import Voucher       from "@/features/query/QueryView/components/tabs/voucher/pages/Voucher";
import Billing       from "@/features/query/QueryView/components/tabs/billing/pages/Billing";
import GuestDocs     from "@/features/query/QueryView/components/tabs/GuestDocs/pages/GuestDocs";
import History       from "@/features/query/QueryView/components/tabs/history/pages/History";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────
const TOP_TABS = [
  { key: "informations", label: "Informations", icon: "grid-fill" },
  { key: "tender",       label: "Tender",       icon: "file-earmark-text-fill" },
  { key: "mails",        label: "Mails",        icon: "envelope-fill" },
  { key: "followups",    label: "Follow-ups",   icon: "calendar2-check-fill" },
  { key: "suppliers",    label: "Suppliers",    icon: "shop-window" },
  { key: "voucher",      label: "Voucher",      icon: "ticket-detailed-fill" },
  { key: "billing",      label: "Billing",      icon: "credit-card-fill" },
  { key: "guestdocs",    label: "Guest Docs",   icon: "folder-fill" },
  { key: "history",      label: "History",      icon: "clock-history" },
];

const TAB_COMPONENTS = {
  informations: Informations,
  tender:       Tender,
  mails:        Mails,
  followups:    Followups,
  suppliers:    Supplierquery,
  voucher:      Voucher,
  billing:      Billing,
  guestdocs:    GuestDocs,
  history:      History,
};

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
export default function QueryView() {
  const { queryId } = useParams();
  const navigate    = useNavigate();
  const { user }    = useAuth();
  const userId      = user?.id ?? user?.user_id;

  const [query,     setQuery]     = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [activeTab, setActiveTab] = useState("informations");
  const [editOpen,  setEditOpen]  = useState(false);

  useEffect(() => {
    if (queryId) fetchQuery();
  }, [queryId]);

const fetchQuery = async () => {
  try {
    setLoading(true);

    const data = await getQueryById(queryId);

    if (data?.status) {
      setQuery(data.data);
    }

  } catch (err) {
    console.error("Failed to fetch query:", err);
  } finally {
    setLoading(false);
  }
};

  const handleEditClose = () => {
  setEditOpen(false);
  fetchQuery(); // ✅ always refetch
};

  const isPriorityHot  = query?.priorityStatus === 1;
  const displayQueryId = query?.queryId ?? query?.id;
  const ActiveTabComponent = TAB_COMPONENTS[activeTab] ?? Informations;

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={inlineStyles.centeredWrapper}>
        <div className="spinner-border text-primary" role="status" style={{ width: 36, height: 36 }}>
          <span className="visually-hidden">Loading…</span>
        </div>
        <p style={{ color: "#64748b", margin: 0, fontSize: 14 }}>Loading query…</p>
      </div>
    );
  }

  // ── Not found ──────────────────────────────────────────────────────────────
  if (!query) {
    return (
      <div style={{ ...inlineStyles.centeredWrapper, gap: 12 }}>
        <i className="bi bi-search" style={{ fontSize: 48, color: "#94a3b8" }}></i>
        <p style={{ color: "#64748b", margin: 0, fontSize: 15 }}>Query not found.</p>
        <button style={inlineStyles.plainBackBtn} onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left"></i> Back to query list
        </button>
      </div>
    );
  }

  // ── Main render ────────────────────────────────────────────────────────────
  return (
    <div className="qv-page">
      <div className="qv-container">

        {/* ── COMBINED HEADER + TABS CARD ──────────────────────────────────── */}
        <div className="qv-card qv-topbar-card">

          {/* Top row: Query ID + actions */}
          <div className="qv-topbar-row">
            <div className="qv-badges-row">
              <span className="qv-id-label">Query ID:</span>
              <span className="qv-id-badge">
                <i className="bi bi-hash"></i>
                {displayQueryId}
              </span>
              {isPriorityHot && (
                <span className="qv-hot-badge">
                  <i className="bi bi-fire"></i> HOT
                </span>
              )}
            </div>

            <div className="qv-header-actions">
              <button className="qv-btn qv-btn-secondary" onClick={() => navigate(-1)}>
                <i className="bi bi-arrow-left"></i>
                <span className="qv-btn-label">Back</span>
              </button>
              <button className="qv-btn qv-btn-primary" onClick={() => setEditOpen(true)}>
                <i className="bi bi-pencil-square"></i>
                <span className="qv-btn-label">Edit Query</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="qv-topbar-divider" />

          {/* Tab row */}
          <div className="qv-tabs-inner">
            {TOP_TABS.map((tab) => (
              <button
                key={tab.key}
                className={`qv-tab-btn${activeTab === tab.key ? " qv-tab-btn--active" : ""}`}
                onClick={() => setActiveTab(tab.key)}
              >
                <i className={`bi bi-${tab.icon}`}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

        </div>

        {/* ── TAB CONTENT ──────────────────────────────────────────────────── */}
        <div className="qv-card qv-content-card">
          <ActiveTabComponent
            query={query}
            userId={userId}
            queryId={queryId}
            onEditClick={() => setEditOpen(true)}
            onRefresh={fetchQuery}
          />
        </div>

      </div>

      {editOpen && (
        <AddQuery
          open={editOpen}
          onClose={handleEditClose}
          queryData={query}
        />
      )}
    </div>
  );
}

const inlineStyles = {
  centeredWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    gap: 16,
    fontFamily: "system-ui, sans-serif",
  },
  plainBackBtn: {
    marginTop: 4,
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "#fff",
    border: "1px solid #e2e8f0",
    color: "#64748b",
    fontSize: 13,
    fontWeight: 500,
    padding: "8px 18px",
    borderRadius: 8,
    cursor: "pointer",
  },
};