import "./WeekArrivel.css";

const WeekArrivals = () => {
  return (
    <div className="page-wrapper">

      {/* PAGE HEADER */}
      <div className="page-header">
        <h3>This Week Arrivals</h3>
        <p>Guests arriving during the current week</p>
      </div>

      {/* FILTER BAR */}
      <div className="filter-card">
        <div className="filter-row">
          <input type="date" className="filter-input" />
          <input type="date" className="filter-input" />

          <input
            type="text"
            className="filter-input flex"
            placeholder="Search by name, email, mobile"
          />

          <select className="filter-input">
            <option>All Destinations</option>
          </select>

          <select className="filter-input">
            <option>All Users</option>
          </select>

          <button className="btn-primary">🔍 Search</button>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-card">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Query ID</th>
              <th>Package</th>
              <th>Client</th>
              <th>Pending Amount</th>
              <th>Assigned</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan="5">
                <div className="empty-state">
                  <span>📅</span>
                  <h4>No arrivals this week</h4>
                  <p>Arrivals scheduled for this week will appear here</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* FOOTER */}
        <div className="table-footer">
          <span>Showing 0 to 0 of 0 entries</span>

          <div className="pagination">
            <button disabled>Previous</button>
            <button disabled>Next</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default WeekArrivals;
