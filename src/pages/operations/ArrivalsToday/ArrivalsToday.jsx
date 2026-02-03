import { useState,useEffect } from "react";
import TableSkeleton from "../../../components/skeletons/TableSkeletons";
import "./arrivalsToday.css"

const ArrivalsToday = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
  setTimeout(() => setLoading(false), 1200);
}, []);

  return (
    <div className="page-wrapper">

 {loading && <TableSkeleton />}
      {/* HEADER */}
      <div className="page-header">
        <h3>Arrivals For Today</h3>
        <p>Guests arriving today and their assigned queries</p>
      </div>

      {/* FILTERS */}
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

          <button className="btn-primary">
            🔍 Search
          </button>
        </div>
      </div>

      {/* TABLE */}
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
            {/* EMPTY STATE */}
            <tr>
              <td colSpan="5">
                <div className="empty-state">
                  <span>🧳</span>
                  <h4>No arrivals today</h4>
                  <p>Try selecting a different date or filters</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default ArrivalsToday;
