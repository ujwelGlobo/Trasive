import "./Sales.css";

const Sales = () => {
  return (
    <div className="overview-grid">

      {/* SALES REPS */}
      <div className="overview-card">
        <h6 className="overview-title">Sales Reps</h6>

        <table className="mini-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Assigned</th>
              <th>Confirmed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Jinu George
                <span className="subtext">Manager · Tours Division</span>
              </td>
              <td><span className="badge blue">3</span></td>
              <td><span className="badge green">0</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* TOP LEAD SOURCES */}
      <div className="overview-card">
        <h6 className="overview-title">Top Lead Sources</h6>

        <table className="mini-table">
          <thead>
            <tr>
              <th>Source</th>
              <th>Total</th>
              <th>Confirmed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>B2B</td>
              <td><span className="badge blue">2</span></td>
              <td><span className="badge green">0</span></td>
            </tr>
            <tr>
              <td>Instagram</td>
              <td><span className="badge blue">1</span></td>
              <td><span className="badge green">0</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ONLINE USERS */}
      <div className="overview-card">
        <h6 className="overview-title">Online Users</h6>

        <ul className="user-list">
          <li>
            <span className="status online"></span>
            Jinu George
            <span className="subtext">Manager</span>
          </li>
          <li>
            <span className="status offline"></span>
            Joy Joseph
            <span className="subtext">Tour Planner</span>
          </li>
          <li>
            <span className="status offline"></span>
            Tinxy K V
            <span className="subtext">Tour Planner</span>
          </li>
          <li>
            <span className="status offline"></span>
            Soumya Sivaprasad
            <span className="subtext">Tour Planner</span>
          </li>
        </ul>
      </div>

    </div>
  );
};

export default Sales;
