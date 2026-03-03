import { useState, useMemo } from "react";
import { Pencil, Eye, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

const landingData = [
  {
    id: "202565518",
    template: "Kerala Magic",
    banner: "4N/5days",
    heading: "Kerala Tourism Hub",
    status: "Active",
    by: "Jinu George",
  },
  {
    id: "202565519",
    template: "aaaaa",
    banner: "-",
    heading: "-",
    status: "Inactive",
    by: "Jinu George",
  },
];

export default function LandingPages() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  /* FILTER */
  const filtered = useMemo(() => {
    return landingData.filter((l) =>
      l.template.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  /* PAGE COUNT */
  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));

  /* PAGINATION */
  const paginated = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, page]);

  /* NAVIGATION */
  const goCreate = () => navigate("/marketing/landing/add");
  const goEdit = (id) => navigate(`/marketing/landing/edit/${id}`);
  const goView = (id) => navigate(`/marketing/landing/view/${id}`);

  return (
    <div className="land-page">
      <div className="land-container">
        <div className="land-card">
          {/* HEADER */}
          <div className="land-header">
            <div>
              <h2>Landing Pages</h2>
              <p>Manage your campaign landing pages</p>
            </div>

            <div className="land-actions">
              <input
                placeholder="Search landing page..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />

              <button className="land-btn primary" onClick={goCreate}>
                <Plus size={16} /> Create Landing Page
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="land-table-wrap">
            <table className="land-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Template</th>
                  <th>Banner</th>
                  <th>Main Heading</th>
                  <th>Status</th>
                  <th>Created By</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {paginated.length > 0 ? (
                  paginated.map((l) => (
                    <tr key={l.id}>
                      <td className="land-id">{l.id}</td>

                      <td className="land-strong">{l.template}</td>

                      <td>{l.banner}</td>

                      <td>{l.heading}</td>

                      <td>
                        <span
                          className={`land-badge ${
                            l.status === "Active" ? "active" : "inactive"
                          }`}
                        >
                          {l.status}
                        </span>
                      </td>

                      <td>
                        <div className="land-user">
                          <span className="land-avatar">{l.by.charAt(0)}</span>
                          {l.by}
                        </div>
                      </td>

                      <td>
                        <div className="land-icons">
                          <button onClick={() => goView(l.id)}>
                            <Eye size={15} />
                          </button>

                          <button onClick={() => goEdit(l.id)}>
                            <Pencil size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="land-empty">
                      No landing pages found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* FOOTER */}
          <div className="land-footer">
            <span>
              Showing {filtered.length === 0 ? 0 : (page - 1) * rowsPerPage + 1}{" "}
              to {Math.min(page * rowsPerPage, filtered.length)} of{" "}
              {filtered.length}
            </span>

            <div className="land-pagination">
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 1}
              >
                Previous
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
                onClick={() => setPage((p) => p + 1)}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
