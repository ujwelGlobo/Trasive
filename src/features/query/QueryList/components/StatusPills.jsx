import "./statusPills.css";

const STATUSES = [
  { key: "ALL", label: "All",           statusId: null },
  { key: "NEW", label: "New",           statusId: 1 },
  { key: "ACTIVE", label: "Active",     statusId: 2 },
  { key: "NO_CONNECT", label: "No Connect", statusId: 3 },
  { key: "HOT_LEAD", label: "Hot Lead", statusId: 4 },
  { key: "FOLLOW_UP", label: "Follow Up", statusId: 5 },
  { key: "PROPOSAL_SENT", label: "Proposal Sent", statusId: 6 },
  { key: "CONFIRMED", label: "Confirmed", statusId: 7 },
  { key: "CANCELLED", label: "Cancelled", statusId: 8 },
  { key: "INVALID", label: "Invalid",   statusId: 9 },
];

const StatusPills = ({ activeStatus, onChange, queries = [] }) => {
  const getCount = (statusId) => {
    if (statusId === null) return queries.length;
    return queries.filter((q) => q.statusId === statusId).length;
  };

  return (
    <div className="status-bar">
      {STATUSES.map((status) => (
        <button
          key={status.key}
          className={`status-chip ${activeStatus === status.key ? "active" : ""}`}
          onClick={() => onChange(status.key)}
        >
          {status.label}
          <span className="count">{getCount(status.statusId)}</span>
        </button>
      ))}
    </div>
  );
};

export default StatusPills;