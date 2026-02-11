import "./queryRow.css";
import { useNavigate } from "react-router-dom";

const QueryRow = ({ query }) => {
  const navigate = useNavigate();

  return (
    <div className="query-row">
      {/* Checkbox */}
      <div className="cell checkbox">
        <input type="checkbox" />
      </div>

      {/* Main Info */}
      <div className="cell main">
        <div className="row-top">
          <span className="query-id">#{query.id}</span>
          <span className={`status ${query.status.toLowerCase()}`}>
            {query.status}
          </span>
        </div>

        <div className="client-name">{query.client}</div>
        <div className="email">{query.email}</div>
        <div className="requirement">
          Requirement: <strong>{query.requirement}</strong>
        </div>
      </div>

      {/* Destination */}
      <div className="cell">
        <div className="label">Destination</div>
        <div className="destination-pill">
          {query.destination}
        </div>
      </div>

      {/* Travel Date */}
      <div className="cell">
        <div className="label">Travel</div>
        <div className="days-left">
          {query.daysLeft} days
        </div>
      </div>

      {/* Assigned */}
      <div className="cell">
        <div className="label">Assigned</div>
        <select className="assignee-select">
          <option>{query.assignee}</option>
        </select>
      </div>

      {/* Actions */}
      <div className="cell actions">
        <button
          className="icon-btn primary"
          onClick={() => navigate(`/query/${query.id}`)}
        >
          View
        </button>

        <button className="icon-btn">✏️</button>
        <button className="icon-btn success">💬</button>
      </div>
    </div>
  );
};

export default QueryRow;
