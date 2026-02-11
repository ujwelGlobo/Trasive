import "./NotesReport.css";

export default function NotesReport() {
  return (
    <div className="notes-page">
      <div className="notes-container">

        {/* LIST CARD */}
        <div className="notes-card">

          {/* HEADER */}
          <div className="notes-header">
            <div className="notes-header-left">
              <h2>Notes Report</h2>
              <p>View and manage all enquiry notes</p>
            </div>

            <div className="notes-header-right">
              <input type="date" />
              <input type="date" />

              <input
                className="notes-search"
                placeholder="Search by ID, name, email, mobile"
              />

              <select>
                <option>All Destinations</option>
              </select>

              <select>
                <option>All Users</option>
              </select>

              <button className="notes-btn primary">Search</button>
              <button className="notes-btn soft">All</button>
            </div>
          </div>

          {/* TABLE */}
          <table className="notes-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Client</th>
                <th>Source</th>
                <th>Notes</th>
                <th>Destination</th>
                <th>Pax</th>
                <th>Status</th>
                <th>Assigned To</th>
              </tr>
            </thead>

            <tbody>
              <tr className="notes-empty">
                <td colSpan="8">
                  <div className="notes-empty-state">
                    <p>No data available</p>
                    <span>No query found for the selected filters</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* FOOTER */}
          <div className="notes-footer">
            <span>Showing 0 to 0 of 0 entries</span>

            <div className="notes-pagination">
              <button disabled>Previous</button>
              <button disabled>Next</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
