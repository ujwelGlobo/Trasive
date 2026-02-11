import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import ClientModal from "./ClientModal";
import "./Client.css";

const initialClients = [
  {
    id: 1,
    name: "Dr. Shabbir",
    mobile: "9502414791",
    email: "shabbir@gmail.com",
    city: "Kochi",
    status: "Active",
  },
  {
    id: 2,
    name: "Mr. Om Prakash",
    mobile: "9421187488",
    email: "om@gmail.com",
    city: "Chennai",
    status: "Active",
  },
  // Add more records to test pagination
];

export default function Clients() {
  const [open, setOpen] = useState(false);
  const [clients, setClients] = useState(initialClients);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSaveClient = (newClient) => {
    setClients((prev) => [newClient, ...prev]);
  };

  /* FILTER */
  const filteredClients = useMemo(() => {
    return clients.filter((client) =>
      client.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [clients, search]);

  /* PAGINATION */
  const totalPages = Math.ceil(filteredClients.length / rowsPerPage);

  const paginatedClients = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredClients.slice(start, start + rowsPerPage);
  }, [filteredClients, currentPage, rowsPerPage]);

  return (
    <div className="clients-page">
      <div className="wrapper-client">

        {/* HEADER */}
        <div className="clients-header">
          <h2>Clients</h2>

          <div className="header-right">
            <input
              className="search-input"
              placeholder="Search by name"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />

            {/* <select
              className="rows-select"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select> */}

            <button className="add-client-btn" onClick={() => setOpen(true)}>
              <Plus size={16} />
              Add Client
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="table-container">
          <table className="clients-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>City</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {paginatedClients.length > 0 ? (
                paginatedClients.map((client) => (
                  <tr key={client.id}>
                    <td>{client.name}</td>
                    <td>{client.mobile}</td>
                    <td>{client.email}</td>
                    <td>{client.city}</td>
                    <td>
                      <span
                        className={
                          client.status === "Active"
                            ? "status active"
                            : "status inactive"
                        }
                      >
                        {client.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">
                    No clients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="pagination-footer">
          <span>
            Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
            {Math.min(currentPage * rowsPerPage, filteredClients.length)} of{" "}
            {filteredClients.length} entries
          </span>

          <div className="pagination-controls">
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={currentPage === index + 1 ? "active" : ""}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>

        {open && (
          <ClientModal
            onClose={() => setOpen(false)}
            onSave={handleSaveClient}
          />
        )}
      </div>
    </div>
  );
}
