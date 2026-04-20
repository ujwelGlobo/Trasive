import React, { useEffect, useState } from "react";
import { Filter, Plus } from "lucide-react";
import { getFollowupsByClient } from "../services/clientService";

export default function FollowupsSection({ clientId }) {
  const [followups, setFollowups] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!clientId) return;

    const fetchFollowups = async () => {
      try {
        setLoading(true);

        const data = await getFollowupsByClient(clientId); // 👈 already cleaned in service

        const formatted = data.map((item, index) => ({
          id: index + 1,
          title: item.details,
          query: `#QR-${item.queryId}`,
          sub: `Assigned to ${item.assigned}`,
          date: item.reminder,
          status: item.status,
          priority:
            item.status === "Overdue"
              ? "high"
              : item.status === "Scheduled"
              ? "med"
              : "low",
        }));

        setFollowups(formatted);
      } catch (err) {
        console.error("Error fetching followups:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowups();
  }, [clientId]);

  if (loading) {
    return <div className="cd-card">Loading follow-ups...</div>;
  }

  return (
    <div className="cd-card">
      <div className="cd-card-header">
        <div className="cd-card-title">
          Follow-ups <span className="cd-card-count">{followups.length}</span>
        </div>
        <button className="cd-card-action">
          <Plus size={11} /> Add
        </button>
      </div>

      <div className="cd-search-bar">
        <input
          className="cd-search-input"
          placeholder="Search follow-ups..."
        />
        <button className="cd-filter-btn">
          <Filter size={11} /> Filter
        </button>
      </div>

      {followups.length === 0 ? (
        <div className="cd-empty">No follow-ups found</div>
      ) : (
        followups.map((fu) => (
          <div key={fu.id} className="cd-fu-row">
            <div className={`cd-fu-dot cd-fu-dot-${fu.priority}`} />

            <div className="cd-fu-main">
              <div className="cd-fu-title">{fu.title}</div>
              <div className="cd-fu-sub">
                Query {fu.query} · {fu.sub}
              </div>
            </div>

            <div className="cd-fu-right">
              <div className="cd-fu-date">{fu.date}</div>

              <span
                className={`cd-badge cd-badge-${fu.status.toLowerCase()}`}
              >
                {fu.status}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}