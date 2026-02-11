import "./CollectionReport.css";

const summary = {
  total: "₹0",
  received: "₹10,000",
  pending: "₹10,000",
};

const rows = [
  {
    queryId: "202569697",
    paymentId: "-",
    transactionId: "-",
    client: "Sunil Deshmukh",
    type: "-",
    amount: "₹45,000",
    date: "21 Jan 2026 · 12:00 AM",
    status: "Overdue",
  },
  {
    queryId: "202569697",
    paymentId: "202565518",
    transactionId: "R45T5154",
    client: "Sunil Deshmukh",
    type: "Mobile Payment",
    amount: "₹10,000",
    date: "13 Jan 2026 · 12:00 AM",
    status: "Paid",
  },
];

export default function CollectionReport() {
  return (
    <div className="cr-page">
      <div className="cr-container">

        {/* HEADER */}
        <div className="cr-header">
          <div>
            <h2>Collection Report</h2>
            <p>Monitor revenue, payments and pending collections</p>
          </div>
        </div>

        {/* MAIN LAYOUT */}
        <div className="cr-layout">

          {/* LEFT SUMMARY */}
          <aside className="cr-summary">
            <div className="cr-summary-card total">
              <span>{summary.total}</span>
              <p>Total Amount</p>
            </div>

            <div className="cr-summary-card received">
              <span>{summary.received}</span>
              <p>Received</p>
            </div>

            <div className="cr-summary-card pending">
              <span>{summary.pending}</span>
              <p>Pending</p>
            </div>
          </aside>

          {/* RIGHT CONTENT */}
          <section className="cr-content">

            {/* FILTER BAR */}
            <div className="cr-filters">
              <input type="date" />
              <input type="date" />
              <input placeholder="Query, payment, transaction id" />
              <select>
                <option>All Type</option>
              </select>
              <select>
                <option>All Status</option>
              </select>

              <button className="cr-btn primary">Search</button>
              <button className="cr-btn ghost">Export</button>
            </div>

            {/* TABLE CARD */}
            <div className="cr-table-card">
              <table className="cr-table">
                <thead>
                  <tr>
                    <th>Query ID</th>
                    <th>Client</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Payment Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i}>
                      <td className="mono">{r.queryId}</td>
                      <td className="strong">{r.client}</td>
                      <td>
                        {r.type !== "-" && (
                          <span className="cr-pill">{r.type}</span>
                        )}
                      </td>
                      <td className="strong">{r.amount}</td>
                      <td>{r.date}</td>
                      <td>
                        <span
                          className={`cr-status ${
                            r.status === "Paid" ? "paid" : "overdue"
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* FOOTER */}
              <div className="cr-table-footer">
                <span>Total Records: {rows.length}</span>

                <div className="cr-pagination">
                  <button disabled>Prev</button>
                  <button disabled>Next</button>
                </div>
              </div>
            </div>

          </section>
        </div>
      </div>
    </div>
  );
}
