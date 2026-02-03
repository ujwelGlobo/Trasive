import "./queryRow.css";
import { useNavigate } from "react-router-dom";

const QueryRow = ({ query }) => {
  const navigate = useNavigate();

  return (
    <div className="query-row">
      {/* Checkbox */}
      <div className="query-cell checkbox">
        <input type="checkbox" />
      </div>

      {/* Query info */}
      <div className="query-cell main">
        <div className="query-id">
          <strong>{query.id}</strong>
          <span className={`status-badge ${query.status.toLowerCase()}`}>
            {query.status}
          </span>
        </div>

        <div className="query-client">{query.client}</div>
        <div className="query-email">{query.email}</div>

        <div className="query-requirement">
          Requirement: <b>{query.requirement}</b>
        </div>
      </div>

      {/* Destination */}
      <div className="query-cell">
        <div className="label">Destination</div>
        <span className="badge bg-secondary">{query.destination}</span>
      </div>

      {/* Dates */}
      <div className="query-cell">
        <div className="label">Travel Date</div>
        <span className="text-danger">{query.daysLeft} Days</span>
      </div>

      {/* Assigned */}
      <div className="query-cell">
        <div className="label">Assigned to</div>
        <select className="form-select form-select-sm">
          <option>{query.assignee}</option>
        </select>
      </div>

      {/* Actions */}
      <div className="query-cell actions">
        <button
          className="btn btn-sm btn-primary"
          onClick={() => navigate(`/query/${query.id}`)}
        >
          View
        </button>

        <button className="btn btn-sm btn-outline-secondary">✏️</button>
        <button className="btn btn-sm btn-success">💬</button>
      </div>
    </div>
  );
};

export default QueryRow;
