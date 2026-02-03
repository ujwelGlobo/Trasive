import "./TodayPaymentCollection.css";

const TodaysPaymentCollection = () => {
  return (
    <div className="page-wrapper">

      {/* PAGE HEADER */}
      <div className="page-header">
        <h3>Today's Payment Collection</h3>
        <p>Payments expected to be collected today</p>
      </div>

      {/* TABLE CARD */}
      <div className="table-card">

        {/* TABLE ACTIONS */}
        <div className="table-actions">
          <div className="left">
            Show
            <select className="table-select">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            entries
          </div>

          <div className="right">
            <input
              type="text"
              className="table-search"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* TABLE */}
        <table className="modern-table">
          <thead>
            <tr>
              <th>Query ID</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {/* EMPTY STATE */}
            <tr>
              <td colSpan="4">
                <div className="empty-state">
                  <span>💰</span>
                  <h4>No payments due today</h4>
                  <p>Payment collection entries will appear here</p>
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

export default TodaysPaymentCollection;
