import "./statusPills.css";

const STATUSES = [
  { key: "ALL", label: "All" },
  { key: "NEW", label: "New" },
  { key: "ACTIVE", label: "Active" },
  { key: "NO_CONNECT", label: "No Connect" },
  { key: "HOT_LEAD", label: "Hot Lead" },
  { key: "FOLLOW_UP", label: "Follow Up" },
  { key: "PROPOSAL_SENT", label: "Proposal Sent" },
  { key: "CONFIRMED", label: "Confirmed" },
  { key: "CANCELLED", label: "Cancelled" },
  { key: "INVALID", label: "Invalid" },
];

const StatusPills = ({ activeStatus, onChange }) => {
  return (
    <div className="status-bar">
      {STATUSES.map((status) => (
        <button
          key={status.key}
          className={`status-chip ${
            activeStatus === status.key ? "active" : ""
          }`}
          onClick={() => onChange(status.key)}
        >
          {status.label}
          <span className="count">0</span>
        </button>
      ))}
    </div>
  );
};

export default StatusPills;
