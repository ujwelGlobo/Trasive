import "./statusPills.css";

/**
 * ✅ FIX: Changed key from string (e.g. "NEW") to numeric ID (e.g. 1)
 * to match the statusId used in Page 3 (Informations) and the backend DB.
 *
 * This ensures that when a status is changed via the stepper in Informations,
 * the active pill in StatusPills correctly reflects the current status.
 *
 * "ALL" stays as null — it means no filter (show all queries).
 *
 * countKey still maps to the string keys returned by the API /all-counts endpoint:
 *   { data: { new, active, no_connect, ... } }
 */
const STATUSES = [
  { key: null, label: "All",           countKey: null           },
  { key: 1,    label: "New",           countKey: "new"          },
  { key: 2,    label: "Active",        countKey: "active"       },
  { key: 3,    label: "No Connect",    countKey: "no_connect"   },
  { key: 4,    label: "Hot Lead",      countKey: "hot_lead"     },
  { key: 5,    label: "Follow Up",     countKey: "follow_up"    },
  { key: 6,    label: "Proposal Sent", countKey: "proposal_sent"},
  { key: 7,    label: "Confirmed",     countKey: "confirmed"    },
  { key: 8,    label: "Cancelled",     countKey: "cancelled"    },
  { key: 9,    label: "Invalid",       countKey: "invalid"      },
];

const StatusPills = ({ activeStatus, onChange, statusCounts = null }) => {
  const getCount = (countKey) => {
    if (!statusCounts) return null;
    // "All" pill → read from summary.total_queries
    if (countKey === null) return statusCounts.summary?.total_queries ?? 0;
    // Individual status pills → read from data[countKey]
    // ✅ FIX: was statusCounts.data?.[countKey] — this is already correct,
    // but now consistent with the fixed getDashboardCounts response shape
    return statusCounts.data?.[countKey] ?? 0;
  };

  return (
    <div className="status-bar">
      {STATUSES.map((status) => {
        const count = getCount(status.countKey);
        return (
          <button
            key={status.key ?? "all"}
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