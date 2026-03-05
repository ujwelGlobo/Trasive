import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./Campaigns.css";

export default function Campaigns() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  /* MOCK DATA */
  const mockCampaigns = [
    {
      id: 1,
      name: "Kerala Promo",
      template: "Kerala Magic",
      group: "Leads",
      sent: 120,
      views: 80,
      by: "Jinu George",
      date: "12 Feb 2026",
    },
    {
      id: 2,
      name: "Flight Sale",
      template: "Flight Offer",
      group: "Clients",
      sent: 300,
      views: 200,
      by: "Jinu George",
      date: "11 Feb 2026",
    },
  ];

  /* FILTER */
  const filtered = useMemo(() => {
    return mockCampaigns.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  /* PAGINATION */
  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));

  const paginated = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, page]);

  /* NAVIGATION */
  const handleCreate = () => {
    navigate("/marketing/campaigns/create");
  };

  return (
    <div className="cmp-page">
      <div className="cmp-card">
        {/* HEADER */}
        <div className="cmp-header">
          <input
            className="cmp-search"
            placeholder="Search campaign..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <button className="cmp-create-btn" onClick={handleCreate}>
            + Create Campaign
          </button>
        </div>

        {/* TABLE */}
        <table className="cmp-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Template</th>
              <th>Clients Group</th>
              <th>Sent</th>
              <th>Views</th>
              <th>Created By</th>
              <th>Type</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {paginated.length > 0 ? (
              paginated.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.template}</td>
                  <td>{c.group}</td>
                  <td>{c.sent}</td>
                  <td>{c.views}</td>

                  {/* USER */}
                  <td>
                    <div className="cmp-user">
                      <div className="cmp-avatar">{c.by.charAt(0)}</div>
                      {c.by}
                    </div>
                  </td>

                  {/* BADGE */}
                  <td>
                    <span className="cmp-badge">Campaign</span>
                  </td>

                  <td>{c.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="cmp-empty">
                  No campaign data available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* FOOTER */}
        <div className="cmp-footer">
          <span>
            Showing {paginated.length} of {filtered.length}
          </span>

          <div className="cmp-pagination">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={page === i + 1 ? "active" : ""}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
