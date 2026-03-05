import "./OngoingGuests.css";

const OngoingGuest = () => {
  return (
    <div className="page-wrapper">

      {/* PAGE HEADER */}
      <div className="page-header">
        <h3>On Going Guest</h3>
        <p>Guests currently on tour and their assigned queries</p>
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

      {/* TABLE CARD */}
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
              <td className="link">202569683</td>

              <td>
                <div className="package-cell">
                  <strong>KERALA TOUR PACKAGE – 16TH JAN – 3 STAR</strong>
                  <span>
                    Kochi → Munnar → Thekkady → Alleppey → Kovalam →
                    Kanyakumari → Trivandrum | 5 Adults
                  </span>
                </div>
              </td>

              <td>Mahesh</td>

              <td className="amount-danger">₹78,000</td>

              <td>
                <span className="assigned-badge">
                  Saumya Sivaprasad
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        {/* FOOTER */}
        <div className="table-footer">
          <span>Showing 1 to 1 of 1 entries</span>

          <div className="pagination">
            <button disabled>Previous</button>
            <button>Next</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default OngoingGuest;
