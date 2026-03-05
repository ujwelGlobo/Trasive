import "./TasksReport.css";

export default function TasksReport() {
  return (
    <div className="tfr-page">
      <div className="tfr-container">

        <div className="tfr-card">

          {/* HEADER */}
          <div className="tfr-header">
            <div>
              <h2>Tasks / Follow-ups Report</h2>
              <p>Track scheduled, completed and pending follow-ups</p>
            </div>

            <div className="tfr-filters">
              <input type="date" />
              <input type="date" />
              <input placeholder="Search by name, email, mobile" />
              <select>
                <option>All Users</option>
              </select>
              <button className="tfr-btn primary">Search</button>
            </div>
          </div>

          {/* STATS */}
          <div className="tfr-stats">
            <div className="tfr-stat scheduled">
              <span>0</span>
              <p>Scheduled</p>
            </div>
            <div className="tfr-stat done">
              <span>0</span>
              <p>Done</p>
            </div>
            <div className="tfr-stat pending">
              <span>0</span>
              <p>Pending</p>
            </div>
          </div>

          {/* TABLE */}
          <table className="tfr-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Query ID</th>
                <th>Details</th>
                <th>Reminder</th>
                <th>Status</th>
                <th>Assigned</th>
              </tr>
            </thead>

            <tbody>
              <tr className="tfr-empty">
                <td colSpan="6">
                  <div className="tfr-empty-state">
                    <strong>No follow-ups found</strong>
                    <span>Try adjusting filters or date range</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* FOOTER */}
          <div className="tfr-footer">
            <span>Showing 0 to 0 of 0 entries</span>

            <div className="tfr-pagination">
              <button disabled>Previous</button>
              <button disabled>Next</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
