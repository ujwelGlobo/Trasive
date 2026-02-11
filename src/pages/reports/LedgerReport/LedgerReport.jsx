import "./LedgerReport.css";

export default function LedgerReport() {
  return (
    <div className="ledger-page">
      <div className="ledger-container">

        <div className="ledger-card">

          {/* HEADER */}
          <div className="ledger-header">
            <div>
              <h2>Ledger Report</h2>
              <p>Detailed booking-wise financial ledger</p>
            </div>
          </div>

          {/* FILTER BAR */}
          <div className="ledger-filters">
            <input type="date" />
            <input type="date" />
            <input
              className="ledger-search"
              placeholder="Search by name, booking, supplier"
            />

            <button className="ledger-btn primary">Search</button>
            <button className="ledger-btn ghost">Export Report</button>
          </div>

          {/* TABLE */}
          <div className="ledger-table-wrap">
            <table className="ledger-table">
              <thead>
                <tr>
                  <th>Sr No.</th>
                  <th>Name</th>
                  <th>Room Type</th>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Vehicle</th>
                  <th>Supplier</th>
                  <th>Booking Status</th>
                  <th>Payment Status</th>
                  <th>Invoice Amount</th>
                  <th>Cancellation Date</th>
                  <th>Due Date</th>
                  <th>Paid Amount</th>
                  <th>Pending Amount</th>
                </tr>
              </thead>

              <tbody>
                <tr className="ledger-empty">
                  <td colSpan="16">
                    <div className="ledger-empty-state">
                      <strong>No ledger entries found</strong>
                      <span>Select a date range to view records</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* FOOTER */}
          <div className="ledger-footer">
            <span>Showing 0 to 0 of 0 entries</span>

            <div className="ledger-pagination">
              <button disabled>Previous</button>
              <button disabled>Next</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
