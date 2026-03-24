import "./statusPills.css";

const STATUSES = [
  { key: "ALL",           label: "All",           countKey: null },
  { key: "NEW",           label: "New",           countKey: "new" },
  { key: "ACTIVE",        label: "Active",        countKey: "active" },
  { key: "NO_CONNECT",    label: "No Connect",    countKey: "no_connect" },
  { key: "HOT_LEAD",      label: "Hot Lead",      countKey: "hot_lead" },
  { key: "FOLLOW_UP",     label: "Follow Up",     countKey: "follow_up" },
  { key: "PROPOSAL_SENT", label: "Proposal Sent", countKey: "proposal_sent" },
  { key: "CONFIRMED",     label: "Confirmed",     countKey: "confirmed" },
  { key: "CANCELLED",     label: "Cancelled",     countKey: "cancelled" },
  { key: "INVALID",       label: "Invalid",       countKey: "invalid" },
];

const StatusPills = ({ activeStatus, onChange, statusCounts = null }) => {
  const getCount = (countKey) => {
    if (!statusCounts) return null;
    if (countKey === null) return statusCounts.summary?.total_queries ?? 0;
    return statusCounts.data?.[countKey] ?? 0;
  };

  return (
    <div className="status-bar">
      {STATUSES.map((status) => {
        const count = getCount(status.countKey);
        return (
          <button
            key={status.key}
            className={`status-chip ${activeStatus === status.key ? "active" : ""}`}
            onClick={() => onChange(status.key)}
          >
            {status.label}
            {count !== null && <span className="count">{count}</span>}
          </button>
        );
      })}
    </div>
  );
};

export default StatusPills;