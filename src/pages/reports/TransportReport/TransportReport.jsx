import "./TransportReport.css";

const rows = [
  {
    pkg: "7 Days – Munnar, Thekkady, Alleppey, Kovalam",
    vehicle: "Ertiga AC",
    name: "Sabil",
    start: "2026-03-25",
    end: "2026-03-31",
    days: 6,
    from: "Trivandrum",
    to: "Kochi",
    pickup: "Airport / Railway Station / Bus Station",
    drop: "Airport / Railway Station / Bus Station",
    supplier: "Best Holidays India",
  },
  {
    pkg: "Kerala Tour Package – 25th April – 7D",
    vehicle: "Sedan AC",
    name: "Sabil",
    start: "2026-04-25",
    end: "2026-05-01",
    days: 6,
    from: "Trivandrum",
    to: "Kochi",
    pickup: "Airport / Railway Station / Bus Station",
    drop: "Airport / Railway Station / Bus Station",
    supplier: "Best Holidays India",
  },
  
];

export default function TransportReport() {
  return (
    <div className="trp-page">
      <div className="trp-container">

        <div className="trp-card">

          {/* HEADER */}
          <div className="trp-header">
            <div>
              <h2>Transport Report</h2>
              <p>Vehicle allocation and route-wise transport details</p>
            </div>
          </div>

          {/* FILTER BAR */}
          <div className="trp-filters">
            <input type="date" />
            <input type="date" />
            <input
              className="trp-search"
              placeholder="Search package, vehicle, supplier"
            />
            <button className="trp-btn primary">Search</button>
            <button className="trp-btn ghost">Export Report</button>
          </div>

          {/* TABLE */}
          <div className="trp-table-wrap">
            <table className="trp-table">
              <thead>
                <tr>
                  <th>Package</th>
                  <th>Vehicle</th>
                  <th>Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Days</th>
                  <th>Departure</th>
                  <th>Destination</th>
                  <th>Pickup Location</th>
                  <th>Drop Location</th>
                  <th>Supplier</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((r, i) => (
                  <tr key={i}>
                    <td className="strong">{r.pkg}</td>
                    <td>
                      <span className="trp-chip">{r.vehicle}</span>
                    </td>
                    <td>{r.name}</td>
                    <td>{r.start}</td>
                    <td>{r.end}</td>
                    <td>{r.days}</td>
                    <td>{r.from}</td>
                    <td>{r.to}</td>
                    <td className="muted">{r.pickup}</td>
                    <td className="muted">{r.drop}</td>
                    <td>{r.supplier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* FOOTER */}
          <div className="trp-footer">
            <span>Showing {rows.length} entries</span>

            <div className="trp-pagination">
              <button disabled>Previous</button>
              <button disabled>Next</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
