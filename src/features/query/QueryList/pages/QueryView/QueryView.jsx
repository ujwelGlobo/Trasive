import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/core/auth/AuthProvider";
import axiosInstance from "@/core/api/axiosInstance";
import Informations from "./components/tabs/Informations/pages/Informations";
import AddQuery from "@/features/query/CreateQuery/pages/AddQuery";
import Tender from "./components/tabs/Tender/Pages/Tender";
import Mails from "./components/tabs/Mails/pages/Mails";
import Followups from "./components/tabs/Followups/pages/Followups";
import Supplierquery from "./components/tabs/Suppliers/pages/Supplierquery";
import Voucher from "./components/tabs/Voucher/pages/Voucher";
import Billing from "./components/tabs/Billing/pages/Billing";
import GuestDocs from "./components/tabs/GuestDocs/pages/GuestDocs";
import History from "./components/tabs/History/pages/History";

// ─────────────────────────────────────────────────────────────────────────────
// Tab config
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

// ─────────────────────────────────────────────────────────────────────────────
// Status pipeline
// ─────────────────────────────────────────────────────────────────────────────
const STATUS_LIST = [
  { key: 1, label: "New",           color: "primary"   },
  { key: 2, label: "Active",        color: "success"   },
  { key: 3, label: "No Connect",    color: "secondary" },
  { key: 4, label: "Hot Lead",      color: "danger"    },
  { key: 5, label: "Proposal Sent", color: "info"      },
  { key: 6, label: "Follow Up",     color: "warning"   },
  { key: 7, label: "Confirmed",     color: "success"   },
  { key: 8, label: "Cancelled",     color: "dark"      },
  { key: 9, label: "Invalid",       color: "secondary" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Color helpers
// ─────────────────────────────────────────────────────────────────────────────
const STATUS_STYLES = {
  primary:   { bg: "#eff6ff", border: "#bfdbfe", text: "#2563eb" },
  success:   { bg: "#f0fdf4", border: "#bbf7d0", text: "#16a34a" },
  danger:    { bg: "#fef2f2", border: "#fecaca", text: "#dc2626" },
  warning:   { bg: "#fffbeb", border: "#fde68a", text: "#d97706" },
  info:      { bg: "#f0f9ff", border: "#bae6fd", text: "#0284c7" },
  dark:      { bg: "#0f172a", border: "#1e293b", text: "#f1f5f9" },
  secondary: { bg: "#f8fafc", border: "#cbd5e1", text: "#64748b" },
};

function getPillStyle(colorKey) {
  const s = STATUS_STYLES[colorKey] ?? STATUS_STYLES.secondary;
  return { background: s.bg, border: `1px solid ${s.border}`, color: s.text };
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab → component map (stable reference outside component)
// ─────────────────────────────────────────────────────────────────────────────
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

  const [query,          setQuery]          = useState(null);
  const [loading,        setLoading]        = useState(true);
  const [activeTab,      setActiveTab]      = useState("informations");
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [editOpen,       setEditOpen]       = useState(false);

  // ── Fetch ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (queryId) fetchQuery();
  }, [queryId]);

  const fetchQuery = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/query/show/${queryId}`);
      if (res.data?.status) setQuery(res.data.data);
    } catch (err) {
      console.error("Failed to fetch query:", err);
    } finally {
      setLoading(false);
    }
  };

  // ── Status update ──────────────────────────────────────────────────────────
  const handleStatusChange = async (statusId) => {
    if (statusUpdating || query?.statusId === statusId) return;
    try {
      setStatusUpdating(true);
      const res = await axiosInstance.put(`/query/update/${queryId}`, { statusId });
      if (res.data?.status) setQuery((prev) => ({ ...prev, statusId }));
    } catch (err) {
      console.error("Status update failed:", err);
    } finally {
      setStatusUpdating(false);
    }
  };

  // ── Edit close ─────────────────────────────────────────────────────────────
  const handleEditClose = (didSave = false) => {
    setEditOpen(false);
    if (didSave) fetchQuery();
  };

  // ── Derived ────────────────────────────────────────────────────────────────
  const isPriorityHot      = query?.priorityStatus === 1;
  const displayQueryId     = query?.queryId ?? query?.id;
  const currentStatus      = STATUS_LIST.find((s) => s.key === query?.statusId);
  const ActiveTabComponent = TAB_COMPONENTS[activeTab] ?? Informations;

  // ── Derived pax count ──────────────────────────────────────────────────────
  const paxCount = query
    ? (query.adult ?? 0) + (query.child ?? 0) + (query.infant ?? 0)
    : 0;

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet" />
        <div style={inlineStyles.centeredWrapper}>
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: 36, height: 36 }}
          >
            <span className="visually-hidden">Loading…</span>
          </div>
          <p style={{ color: "#64748b", margin: 0, fontSize: 14 }}>Loading query…</p>
        </div>
      </>
    );
  }

  // ── Not found ──────────────────────────────────────────────────────────────
  if (!query) {
    return (
      <>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet" />
        <div style={{ ...inlineStyles.centeredWrapper, gap: 12 }}>
          <i className="bi bi-search" style={{ fontSize: 48, color: "#94a3b8" }}></i>
          <p style={{ color: "#64748b", margin: 0, fontSize: 15 }}>Query not found.</p>
          <button style={inlineStyles.plainBackBtn} onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left"></i> Back to query list
          </button>
        </div>
      </>
    );
  }

  // ── Main render ────────────────────────────────────────────────────────────
  return (
    <>
      {/* Bootstrap 5 + Bootstrap Icons */}
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet" />

      {/* Scoped styles */}
      <style>{pageCSS}</style>

      <div className="qv-page">
        <div className="qv-container">

          {/* ── HEADER CARD ──────────────────────────────────────────────── */}
          <div className="qv-card qv-header-card">
            <div className="qv-header-inner">

              {/* Left — avatar + info */}
              <div className="qv-header-left">
                <div className="qv-header-meta">
                  {/* Badge row */}
                  <div className="qv-badges-row">
                    Query ID:
                    <span className="qv-id-badge">
                      <i className="bi bi-hash"></i>
                      {displayQueryId}
                    </span>

                    {isPriorityHot && (
                      <span className="qv-hot-badge">
                        <i className="bi bi-fire"></i> HOT
                      </span>
                    )}

                    {currentStatus && (
                      <span
                        className="qv-status-pill"
                        style={getPillStyle(currentStatus.color)}
                      >
                        <span
                          className="qv-pill-dot"
                          style={{ background: getPillStyle(currentStatus.color).color }}
                        />
                        {currentStatus.label}
                      </span>
                    )}
                  </div>

                  {/* Meta row — FIX: use .name for nested objects, pax from adult+child+infant */}
                  <p className="qv-client-meta">
                    {query.destination?.name && (
                      <span>
                        <i className="bi bi-geo-alt-fill"></i>
                        {query.destination.name}
                      </span>
                    )}
                    {paxCount > 0 && (
                      <span>
                        <i className="bi bi-people-fill"></i>
                        {paxCount} Pax
                      </span>
                    )}
                    {query.startDate && (
                      <span>
                        <i className="bi bi-calendar3"></i>
                        {new Date(query.startDate).toLocaleDateString("en-IN", {
                          day: "2-digit", month: "short", year: "numeric",
                        })}
                      </span>
                    )}
                    {query.assignTo && (
                      <span>
                        <i className="bi bi-person-badge-fill"></i>
                        Assigned: {query.assignTo}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Right — actions */}
              <div className="qv-header-actions">
                <button
                  className="qv-btn qv-btn-secondary"
                  onClick={() => navigate(-1)}
                >
                  <i className="bi bi-arrow-left"></i>
                  <span className="qv-btn-label">Back</span>
                </button>

                <a
                  className="qv-btn qv-btn-whatsapp"
                  href={`https://wa.me/${query.phone?.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bi bi-whatsapp"></i>
                  <span className="qv-btn-label">WhatsApp</span>
                </a>

                <button
                  className="qv-btn qv-btn-primary"
                  onClick={() => setEditOpen(true)}
                >
                  <i className="bi bi-pencil-square"></i>
                  <span className="qv-btn-label">Edit Query</span>
                </button>
              </div>
            </div>
          </div>

          {/* ── TAB NAV ──────────────────────────────────────────────────── */}
          <div className="qv-card qv-tabs-card">
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

          {/* ── STATUS PIPELINE ──────────────────────────────────────────── */}
          <div className="qv-card qv-status-card">
            <div className="qv-status-inner">
              <div className="qv-status-pipeline">
                {STATUS_LIST.map((s, i) => {
                  const isActive = query.statusId === s.key;
                  const ss = STATUS_STYLES[s.color] ?? STATUS_STYLES.secondary;
                  return (
                    <span
                      key={s.key}
                      style={{ display: "inline-flex", alignItems: "center" }}
                    >
                      <button
                        className={[
                          "qv-status-step",
                          isActive          ? "qv-status-step--active"   : "",
                          statusUpdating    ? "qv-status-step--disabled" : "",
                        ].join(" ").trim()}
                        style={
                          isActive
                            ? { background: ss.bg, borderColor: ss.border, color: ss.text }
                            : {}
                        }
                        onClick={() => handleStatusChange(s.key)}
                        disabled={statusUpdating}
                      >
                        {isActive && (
                          <i
                            className="bi bi-check-circle-fill"
                            style={{ fontSize: 11 }}
                          ></i>
                        )}
                        {s.label}
                      </button>

                      {i < STATUS_LIST.length - 1 && (
                        <span className="qv-status-sep">›</span>
                      )}
                    </span>
                  );
                })}
              </div>

              {statusUpdating && (
                <div className="qv-status-spinner">
                  <div
                    className="spinner-border spinner-border-sm text-primary"
                    role="status"
                    style={{ width: 15, height: 15 }}
                  >
                    <span className="visually-hidden">Updating…</span>
                  </div>
                  <span>Updating…</span>
                </div>
              )}
            </div>
          </div>

          {/* ── TAB CONTENT ──────────────────────────────────────────────── */}
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
      </div>

      {/* ── EDIT DRAWER ──────────────────────────────────────────────────── */}
      {editOpen && (
        <AddQuery
          open={editOpen}
          onClose={handleEditClose}
          queryData={query}
        />
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Inline JS styles (used before Bootstrap/CSS loads — loading & not-found)
// ─────────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// Scoped CSS — injected once when QueryView mounts
// ─────────────────────────────────────────────────────────────────────────────
const pageCSS = `
  /* ── Design tokens ── */
  .qv-page {
    --brand:        #2563eb;
    --brand-lt:     #eff6ff;
    --brand-bdr:    #bfdbfe;
    --txt:          #0f172a;
    --txt2:         #64748b;
    --txt3:         #94a3b8;
    --bdr:          #e2e8f0;
    --bg-page:      #f1f5f9;
    --bg-card:      #ffffff;
    --bg-surface:   #f8fafc;
    --shadow-sm:    0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04);
    --shadow-md:    0 4px 14px rgba(0,0,0,.08);
    --r-sm:  8px;
    --r-md:  12px;
    --r-lg:  16px;

    min-height: 100vh;
    background: var(--bg-page);
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    padding: 20px 16px 48px;
  }

  /* ── Page container ── */
  .qv-container {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* ── Base card ── */
  .qv-card {
    background: var(--bg-card);
    border: 1px solid var(--bdr);
    border-radius: var(--r-lg);
    box-shadow: var(--shadow-sm);
  }

  /* ─────────────────────── HEADER ─────────────────────── */
  .qv-header-card { padding: 1.25rem 1.5rem; }

  .qv-header-inner {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }

  .qv-header-left {
    display: flex;
    align-items: center;
    gap: 16px;
    flex: 1;
    min-width: 0;
  }

  .qv-header-meta { min-width: 0; flex: 1; }

  /* Badges row */
  .qv-badges-row {
    display: flex; align-items: center;
    gap: 8px; margin-bottom: 6px; flex-wrap: wrap;
  }

  .qv-id-badge {
    display: inline-flex; align-items: center; gap: 4px;
    background: var(--brand-lt); color: var(--brand);
    border: 1px solid var(--brand-bdr);
    border-radius: var(--r-sm);
    padding: 3px 10px;
    font-size: 12px; font-weight: 600; letter-spacing: .3px;
  }
  .qv-id-badge i { font-size: 11px; }

  .qv-hot-badge {
    display: inline-flex; align-items: center; gap: 4px;
    background: linear-gradient(135deg, #ef4444, #f97316);
    color: #fff; font-size: 11px; font-weight: 700;
    padding: 3px 9px; border-radius: 20px; letter-spacing: .5px;
    animation: qvPulse 2s ease-in-out infinite;
  }
  @keyframes qvPulse { 0%,100% { opacity: 1; } 50% { opacity: .65; } }

  .qv-status-pill {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 12px; font-weight: 600;
    padding: 3px 10px; border-radius: 20px;
  }
  .qv-pill-dot {
    width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
  }

  /* Meta */
  .qv-client-meta {
    display: flex; align-items: center; gap: 12px;
    flex-wrap: wrap; margin: 0;
    font-size: 13px; color: var(--txt2);
  }
  .qv-client-meta span { display: inline-flex; align-items: center; gap: 4px; }
  .qv-client-meta i { font-size: 12px; color: var(--txt3); }

  /* Action buttons */
  .qv-header-actions {
    display: flex; align-items: center;
    gap: 8px; flex-wrap: wrap; flex-shrink: 0;
  }

  .qv-btn {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 13px; font-weight: 600;
    padding: 9px 18px; border-radius: var(--r-sm);
    cursor: pointer; border: none;
    transition: all .18s ease;
    text-decoration: none; white-space: nowrap; line-height: 1;
  }
  .qv-btn i { font-size: 14px; }

  .qv-btn-secondary {
    background: var(--bg-card); border: 1px solid var(--bdr); color: var(--txt2);
  }
  .qv-btn-secondary:hover {
    border-color: #94a3b8; color: var(--txt); background: var(--bg-surface);
  }

  .qv-btn-primary { background: var(--brand); color: #fff; }
  .qv-btn-primary:hover {
    background: #1d4ed8; transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(37,99,235,.3);
    color: #fff;
  }

  .qv-btn-whatsapp { background: #22c55e; color: #fff; }
  .qv-btn-whatsapp:hover {
    background: #16a34a; color: #fff;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(34,197,94,.3);
  }

  /* ─────────────────────── TABS ─────────────────────── */
  .qv-tabs-card {
    padding: 6px;
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: #cbd5e1 transparent;
  }
  .qv-tabs-card::-webkit-scrollbar { height: 3px; }
  .qv-tabs-card::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 2px; }

  .qv-tabs-inner {
    display: flex; gap: 2px;
    flex-wrap: nowrap; min-width: max-content;
  }

  .qv-tab-btn {
    display: inline-flex; align-items: center; gap: 7px;
    background: transparent; border: none;
    color: var(--txt2); font-size: 13px; font-weight: 500;
    padding: 8px 14px; border-radius: var(--r-sm);
    cursor: pointer; transition: all .16s; white-space: nowrap;
  }
  .qv-tab-btn i { font-size: 14px; }
  .qv-tab-btn:hover { background: var(--bg-page); color: var(--txt); }
  .qv-tab-btn--active {
    background: var(--brand-lt); color: var(--brand); font-weight: 600;
  }

  /* ─────────────────────── STATUS ─────────────────────── */
  .qv-status-card {
    padding: 10px 14px;
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: #cbd5e1 transparent;
  }
  .qv-status-card::-webkit-scrollbar { height: 3px; }
  .qv-status-card::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 2px; }

  .qv-status-inner {
    display: flex; align-items: center;
    justify-content: space-between; gap: 8px;
  }

  .qv-status-pipeline {
    display: flex; align-items: center;
    gap: 2px; min-width: max-content;
  }

  .qv-status-step {
    display: inline-flex; align-items: center; gap: 5px;
    background: transparent; border: 1px solid transparent;
    color: var(--txt2); font-size: 12px; font-weight: 500;
    padding: 5px 13px; border-radius: 20px;
    cursor: pointer; transition: all .16s; white-space: nowrap;
  }
  .qv-status-step:hover:not(.qv-status-step--active) {
    background: var(--bg-surface); border-color: var(--bdr); color: var(--txt);
  }
  .qv-status-step--active  { font-weight: 600; }
  .qv-status-step--disabled { opacity: .5; pointer-events: none; }

  .qv-status-sep {
    color: var(--bdr); font-size: 13px; user-select: none; padding: 0 1px;
  }

  .qv-status-spinner {
    display: flex; align-items: center; gap: 6px;
    font-size: 12px; color: var(--txt2); flex-shrink: 0;
  }

  /* ─────────────────────── CONTENT ─────────────────────── */
  .qv-content-card {
    padding: 1.5rem;
    min-height: 440px;
  }

  /* ─────────────────────── RESPONSIVE ─────────────────────── */
  @media (max-width: 768px) {
    .qv-page           { padding: 12px 10px 32px; }
    .qv-header-card    { padding: 1rem 1.1rem; }
    .qv-content-card   { padding: 1rem; }
    .qv-btn-label      { display: none; }
    .qv-btn            { padding: 9px 12px; }
  }

  @media (max-width: 480px) {
    .qv-tab-btn span   { display: none; }
    .qv-tab-btn        { padding: 8px 10px; }
    .qv-status-step    { padding: 5px 9px; font-size: 11px; }
  }
`;