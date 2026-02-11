import "./ToursReport.css";

const stats = [
  { label: "Total Tours", value: 0, type: "total" },
  { label: "Completed", value: 0, type: "completed" },
  { label: "Upcoming", value: 0, type: "upcoming" },
];

const tours = [
  {
    id: "202569683",
    package: "Kerala Tour Package – 16th Jan – 3 Star",
    route: "Kochi · Munnar · Thekkady · Alleppey · Kovalam",
    dateRange: "16 Jan 2026 → 21 Jan 2026",
    client: "Mr. Mahesh",
    phone: "8848502575",
    status: "Completed",
    assigned: "Saumya Sivaprasad",
    assignedDate: "15/12/2025",
  },
];

export default function ToursReport() {
  return (
    <div className="tr-page">
      <div className="tr-container">

        {/* HEADER */}
        <div className="tr-header">
          <h2>Tours Report</h2>
          <p>Overview of completed and upcoming tours</p>
        </div>

        {/* INSIGHTS */}
        <div className="tr-insights">
          {stats.map((s, i) => (
            <div key={i} className={`tr-insight ${s.type}`}>
              <span>{s.value}</span>
              <p>{s.label}</p>
            </div>
          ))}
        </div>

        {/* CARD */}
        <div className="tr-card">

          {/* FILTER BAR */}
          <div className="tr-filters">
            <input type="date" />
            <input type="date" />
            <input placeholder="Search by name, email, mobile" />
            <select>
              <option>All Destinations</option>
            </select>
            <select>
              <option>All Users</option>
            </select>
            <button className="tr-btn primary">Search</button>
          </div>

          {/* LIST */}
          <div className="tr-list">
            {tours.map((t, i) => (
              <div key={i} className="tr-item">

                <div className="tr-left">
                  <span className="tr-id">#{t.id}</span>
                  <h4>{t.package}</h4>
                  <p className="tr-route">{t.route}</p>
                  <p className="tr-date">{t.dateRange}</p>
                </div>

                <div className="tr-mid">
                  <p className="label">Client</p>
                  <strong>{t.client}</strong>
                  <span>{t.phone}</span>
                </div>

                <div className="tr-right">
                  <span className={`tr-status ${t.status.toLowerCase()}`}>
                    {t.status}
                  </span>

                  <div className="tr-assign">
                    <p>{t.assigned}</p>
                    <span>{t.assignedDate}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* FOOTER */}
          <div className="tr-footer">
            <span>Total Records: {tours.length}</span>

            <div className="tr-pagination">
              <button disabled>Previous</button>
              <button disabled>Next</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
