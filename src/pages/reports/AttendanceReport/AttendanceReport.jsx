import "./AttendanceReport.css";

const data = [
  {
    id: 1,
    name: "Jinu George",
    firstLogin: "11:11 AM",
    sessions: 2,
    lastUpdate: "02:10 PM",
    type: "Present",
    hours: "02:14",
  },
  {
    id: 2,
    name: "Joy Joseph",
    firstLogin: "-",
    sessions: 0,
    lastUpdate: "-",
    type: "Absent",
    hours: "00:00",
  },
];

export default function AttendanceReport() {
  return (
    <div className="attx-page">
      <div className="attx-container">

        {/* SINGLE LIST CARD */}
        <div className="attx-list-card">

          {/* HEADER (TITLE + FILTERS + ACTIONS) */}
          <div className="attx-list-header">
            <div className="attx-header-left">
              <h2>Today's Attendance</h2>
              <p>Live attendance overview of your team</p>
            </div>

            <div className="attx-header-right">
              <select>
                <option>Today</option>
              </select>

              <select>
                <option>All Users</option>
              </select>

              <button className="attx-btn soft">Reset</button>
              <button className="attx-btn outline">Export</button>
              <button className="attx-btn primary">Search</button>
            </div>
          </div>

          {/* TABLE */}
          <table className="attx-table">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>First Login</th>
                <th>Sessions</th>
                <th>Last Update</th>
                <th>Status</th>
                <th>Hours</th>
              </tr>
            </thead>

            <tbody>
              {data.map((row, i) => (
                <tr key={row.id}>
                  <td className="muted">{i + 1}</td>
                  <td className="user-cell">{row.name}</td>
                  <td>{row.firstLogin}</td>
                  <td>{row.sessions}</td>
                  <td>{row.lastUpdate}</td>
                  <td>
                    <span
                      className={`attx-badge ${
                        row.type === "Present"
                          ? "success"
                          : "danger"
                      }`}
                    >
                      {row.type}
                    </span>
                  </td>
                  <td className="mono">{row.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* FOOTER */}
          <div className="attx-list-footer">
            <span>Showing 1 to {data.length} of {data.length}</span>

            <div className="attx-pagination">
              <button disabled>Previous</button>
              <button disabled>Next</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
