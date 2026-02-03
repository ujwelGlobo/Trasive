import "./guestMovement.css";
import { MapPin, Users } from "lucide-react";

const GuestMovement = () => {
  return (
    <div className="page-wrapper">

      {/* PAGE HEADER */}
      <div className="page-header">
        <h3>Guest Movement</h3>
        <p>Track guest movements across destinations and hotels</p>
      </div>

      {/* TABLE CARD */}
      <div className="table-card">

        {/* TABLE TOP BAR */}
        <div className="table-toolbar">
          <div>
            Show
            <select>
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            entries
          </div>

          <input
            type="text"
            placeholder="Search guest, tour, hotel…"
          />
        </div>

        {/* TABLE */}
        <div className="table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Query ID</th>
                <th>Date</th>
                <th>Tour</th>
                <th>Guest</th>
                <th>Pax</th>
                <th>Destination</th>
                <th>Hotel</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <a href="#" className="link">
                    #202569683
                  </a>
                </td>
                <td>20 Jan 2026</td>
                <td>
                  Kovalam Day 1 <br />
                  <span className="muted">
                    From Alleppey → Kanyakumari
                  </span>
                </td>
                <td>Mahesh</td>
                <td>
                  <span className="badge pax">
                    <Users size={12} /> A5–C0
                  </span>
                </td>
                <td>
                  <span className="badge destination">
                    <MapPin size={12} /> Kovalam
                  </span>
                </td>
                <td>Pappukutty Beach Resort</td>
              </tr>
            </tbody>
          </table>
        </div>

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

export default GuestMovement;
