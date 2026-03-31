import "./queryRow.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateAssignTo } from "@/features/query/CreateQuery/services/QueryServicePage";

const STATUS_MAP = {
  1: { label: "New",           className: "new" },
  2: { label: "Active",        className: "active" },
  3: { label: "No Connect",    className: "no_connect" },
  4: { label: "Hot Lead",      className: "hot_lead" },
  5: { label: "Follow Up",     className: "follow_up" },
  6: { label: "Proposal Sent", className: "proposal_sent" },
  7: { label: "Confirmed",     className: "confirmed" },
  8: { label: "Cancelled",     className: "cancelled" },
  9: { label: "Invalid",       className: "invalid" },
};

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const formatDateTime = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const daysUntil = (dateStr) => {
  if (!dateStr) return null;
  const diff = new Date(dateStr) - new Date();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days > 0 ? `${days} Days` : "Today";
};

// ✅ assignees comes from parent (QueryList) — no local fetch needed
const QueryRow = ({ query, openAddQuery, userId, assignees = [] }) => {
  const status = STATUS_MAP[query.statusId] ?? { label: "New", className: "new" };
  const navigate = useNavigate();

  const [selectedAssignee, setSelectedAssignee] = useState(query.assignTo ?? "");

  // ✅ Sync dropdown if query.assignTo changes
  useEffect(() => {
    setSelectedAssignee(query.assignTo ?? "");
  }, [query.assignTo]);

  const handleAssigneeChange = async (e) => {
    const newAssignee = e.target.value;
    const previous = selectedAssignee;
    setSelectedAssignee(newAssignee); // optimistic update

    try {
      await updateAssignTo(userId, query.id, newAssignee);
    } catch (err) {
      console.error("Failed to update assignee:", err);
      setSelectedAssignee(previous); // revert on failure
    }
  };

  return (
    <div className="qr-card">

      {/* ── ROW 1 ── */}
      <div className="qr-row qr-row-top">

        {/* Checkbox + ID + Status */}
        <div className="qr-col qr-id-col">
          <input type="checkbox" className="qr-check" />
          <div>
            <div className="qr-id">#{query.id}</div>
            <span className={`qr-status ${status.className}`}>{status.label}</span>
          </div>
        </div>

        {/* Name + Phone */}
        <div className="qr-col qr-name-col">
          <div className="qr-name">{query.name}</div>
          <div className="qr-phone">{query.phone}</div>
        </div>

        {/* Destination */}
        <div className="qr-dest-container">
          {query.destinationNames?.length > 0 ? (
            query.destinationNames.map((name, index) => (
              <span key={index} className="qr-dest-pill">
                {name}
              </span>
            ))
          ) : (
            <span className="qr-dest-pill">—</span>
          )}
        </div>

        {/* Travel Dates */}
        <div className="qr-col">
          <div className="qr-date">📅 {formatDate(query.startDate)}</div>
          <div className="qr-date">Till {formatDate(query.endDate)}</div>
          {daysUntil(query.startDate) && (
            <div className="qr-days">{daysUntil(query.startDate)}</div>
          )}
        </div>

        {/* No Task */}
        <div className="qr-col">
          <div className="qr-notask">No Task</div>
        </div>

        {/* Actions */}
        <div className="qr-col qr-actions">
          <button className="qr-btn primary" onClick={() => navigate(`/query/view/${query.id}`)}>View</button>
          <button className="qr-btn icon" onClick={() => openAddQuery(query)}>✏️</button>
          <button className="qr-btn icon green">💬</button>
        </div>

      </div>

      {/* ── ROW 2 ── */}
      <div className="qr-row qr-row-bottom">

        {/* Requirement */}
        <div className="qr-col">
          <div className="qr-label">Requirement</div>
          <div className="qr-bold">{query.details ?? "—"}</div>
        </div>

        {/* Email */}
        <div className="qr-col">
          <div className="qr-email">{query.email}</div>
        </div>

        {/* Travellers */}
        <div className="qr-col">
          <div className="qr-label">Travellers</div>
          <div className="qr-travellers">
            {query.adult ?? 0} Adult&nbsp;
            {query.child ?? 0} Child&nbsp;
            {query.infant ?? 0} Infant
          </div>
        </div>

        {/* Assigned To */}
        <div className="qr-col">
          <div className="qr-label">Assigned to</div>
          <select
            className="qr-assignee"
            value={selectedAssignee}
            onChange={handleAssigneeChange}
          >
            <option value="">Not Assign</option>
            {assignees.map((person, index) => (
              <option
                key={person.user_id ?? `assignee-${index}`}
                value={person.user_id ?? ""}
              >
                {person.firstName} {person.lastName}
              </option>
            ))}
          </select>
        </div>

        {/* Created */}
        <div className="qr-col">
          <div className="qr-label">⏱ Created</div>
          <div className="qr-meta">{formatDate(query.dateAdded)}</div>
        </div>

        {/* Last Updated */}
        <div className="qr-col">
          <div className="qr-label">⏱ Last Updated</div>
          <div className="qr-meta">{formatDateTime(query.updateDate)}</div>
        </div>

      </div>

    </div>
  );
};

export default QueryRow;