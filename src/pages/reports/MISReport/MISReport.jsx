import "./MISReport.css";

const rows = [
  {
    bookedBy: "Saumya Sivaprasad – Tour Planner",
    email: "sunildeshmukh2554@gmail.com",
    mobile: "84599 08771",
    tourId: "202569697",
    bookingDate: "09-01-2026",
    client: "MR. SUNIL DESHMUKH",
    destination: "KERALA",
    pax: 4,
    selling: 55000,
    flight: 0,
  },
  {
    bookedBy: "Saumya Sivaprasad – Tour Planner",
    email: "swapnikaparas07@gmail.com",
    mobile: "79810 29611",
    tourId: "202569695",
    bookingDate: "09-01-2026",
    client: "MR. SWAPNIKA",
    destination: "KERALA",
    pax: 3,
    selling: 45000,
    flight: 0,
  },
];

export default function MISReport() {
  return (
    <div className="mis-page">
      <div className="mis-container">

        <div className="mis-card">

          {/* HEADER */}
          <div className="mis-header">
            <div>
              <h2>MIS Report</h2>
              <p>Management Information System – booking & sales data</p>
            </div>

            <div className="mis-actions">
              <input type="date" />
              <input type="date" />
              <button className="mis-btn primary">Search</button>
              <button className="mis-btn ghost">Export Report</button>
            </div>
          </div>

          {/* TABLE WRAPPER */}
          <div className="mis-table-wrap">
            <table className="mis-table">
              <thead>
                <tr>
                  <th>Booked By</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Tour ID</th>
                  <th>Booking Date</th>
                  <th>Client Name</th>
                  <th>Destination</th>
                  <th>No. of Pax</th>
                  <th>Total Selling Cost</th>
                  <th>Flight Cost</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((r, i) => (
                  <tr key={i}>
                    <td className="strong">{r.bookedBy}</td>
                    <td>{r.email}</td>
                    <td>{r.mobile}</td>
                    <td className="mono">{r.tourId}</td>
                    <td>{r.bookingDate}</td>
                    <td>{r.client}</td>
                    <td>
                      <span className="mis-chip">{r.destination}</span>
                    </td>
                    <td>{r.pax}</td>
                    <td className="strong">₹{r.selling}</td>
                    <td>₹{r.flight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* FOOTER */}
          <div className="mis-footer">
            <span>Showing {rows.length} entries</span>

            <div className="mis-pagination">
              <button disabled>Previous</button>
              <button disabled>Next</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
