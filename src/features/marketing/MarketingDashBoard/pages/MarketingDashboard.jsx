import { Users, Gift, Briefcase, Heart, Plus } from "lucide-react";
import "./MarketingDashBoard.css";

export default function MarketingDashboard() {
  return (
    <div className="mkdash-container">
      <h1 className="mkdash-title">Marketing Dashboard</h1>

      {/* STATS */}
      <div className="mkdash-stats-grid">
        <StatCard title="February Campaigns" value="00" />
        <StatCard title="February Leads" value="0" />
        <StatCard title="Emails Sent" value="00" />
        <StatCard title="Feedback Response" value="0" />
      </div>

      {/* ACTION CARDS */}
      <h2 className="mkdash-section-title">Start Marketing</h2>

      <div className="mkdash-action-grid">
        <ActionCard
          icon={<Users size={40} />}
          title="Customers"
          variant="purple"
        />
        <ActionCard
          icon={<Briefcase size={40} />}
          title="Plan a Trip"
          variant="green"
        />
        <ActionCard
          icon={<Gift size={40} />}
          title="Birthdays"
          variant="orange"
        />
        <ActionCard
          icon={<Heart size={40} />}
          title="Anniversary"
          variant="red"
        />
      </div>

      {/* TABLE */}
      <div className="mkdash-table-card">
        <div className="mkdash-table-header">
          <h3>Recent Campaigns</h3>
          <button className="mkdash-create-btn">
            <Plus size={16} /> Create Campaign
          </button>
        </div>

        <table className="mkdash-table">
          <thead>
            <tr>
              <th>Campaign</th>
              <th>Template</th>
              <th>Mailing Group</th>
              <th>Subscriber</th>
              <th>Views</th>
              <th>Status</th>
              <th>By</th>
            </tr>
          </thead>
          <tbody>
            <tr className="mkdash-empty-row">
              <td colSpan="7">No campaigns found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="mkdash-stat-card">
      <div>
        <p className="mkdash-stat-title">{title}</p>
        <h2 className="mkdash-stat-value">{value}</h2>
      </div>
      <span className="mkdash-badge">100% ↑</span>
    </div>
  );
}

function ActionCard({ icon, title, variant }) {
  return (
    <div className={`mkdash-action-card mkdash-${variant}`}>
      <div className="mkdash-action-icon">{icon}</div>
      <h3>{title}</h3>
    </div>
  );
}
