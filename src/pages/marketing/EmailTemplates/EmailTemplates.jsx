import { useState, useMemo } from "react";
import { Eye, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./EmailTemplates.css";

export default function EmailTemplates() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 5;

  /* ---------------- MOCK DATA ---------------- */
  const templates = [
    {
      id: "202565539",
      name: "Kerala Magic",
      subject: "Kerala Magic",
      by: "Jinu George",
      date: "06-12-2025",
    },
    {
      id: "202565538",
      name: "My First Landing Page",
      subject: "",
      by: "Jinu George",
      date: "10-02-2022",
    },
    {
      id: "202565537",
      name: "Flight Offer",
      subject: "50% off on every flight this month",
      by: "Jinu George",
      date: "03-03-2023",
    },
    {
      id: "202565535",
      name: "50% off on Flights",
      subject: "Promotion",
      by: "Jinu George",
      date: "06-02-2022",
    },
  ];

  /* ---------------- FILTER ---------------- */
  const filtered = useMemo(() => {
    return templates.filter((t) =>
      t.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, templates]);

  /* ---------------- PAGINATION ---------------- */
  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, currentPage]);

  /* ---------------- NAVIGATION HANDLERS ---------------- */
  const handleAdd = () => navigate("/email-template/add");

  const handleView = (id) => navigate(`/email-template/view/${id}`);

  const handleEdit = (id) => navigate(`/email-template/edit/${id}`);

  /* ---------------- UI ---------------- */
  return (
    <div className="etpl-page">
      <div className="etpl-container">
        <div className="etpl-card">
          {/* HEADER */}
          <div className="etpl-header">
            <div>
              <h2>Email Templates</h2>
              <p>Manage and customize your campaign templates</p>
            </div>

            <div className="etpl-actions">
              <input
                placeholder="Search template..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />

              <button className="etpl-btn primary" onClick={handleAdd}>
                Add Template
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="etpl-table-wrapper">
            <table className="etpl-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Mail Subject</th>
                  <th>By</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {paginated.length > 0 ? (
                  paginated.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>

                      <td className="etpl-name">{item.name}</td>

                      <td>{item.subject || "-"}</td>
                      <td>{item.by}</td>
                      <td>{item.date}</td>

                      <td className="etpl-actions-cell">
                        <button
                          onClick={() => handleView(item.id)}
                          title="View"
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          onClick={() => handleEdit(item.id)}
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="etpl-empty">
                      No templates found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* FOOTER */}
          <div className="etpl-footer">
            <span>
              Showing {paginated.length} of {filtered.length} entries
            </span>

            <div className="etpl-pagination">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={currentPage === i + 1 ? "active" : ""}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
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
