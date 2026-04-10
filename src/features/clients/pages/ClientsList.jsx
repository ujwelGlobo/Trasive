import { useState, useMemo, useEffect } from "react";
import { Plus, Pencil, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ClientModal from "./ClientModal";
import "./Client.css";

import { getClients } from "../services/clientService";
import { useAuth } from "@/core/auth/AuthProvider";

export default function Clients() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  const fetchClients = async (userId) => {
    if (!userId) return;
    try {
      setLoading(true);
      const data = await getClients(userId);
      const formatted = data.map((item, index) => ({
        id: item.id ?? index + 1,
        name: item.name,
        designation:item.designation,
        mobile: item.phone,
        email: item.email,
        city: item.cityName,
        addedbyname:item.addedbyname,
        status: Number(item.status) === 1 ? "Active" : "Inactive",
      }));
      setClients(formatted);
      setCurrentPage(1);
    } catch (err) {
      console.error("Client fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userId = user?.id ?? user?.user_id;
    if (!userId) return;
    fetchClients(userId);
  }, [user]);

  const handleSaveClient = (newClient) => {
    setClients((prev) => [newClient, ...prev]);
  };

  const filteredClients = useMemo(() => {
    return clients.filter((client) =>
      client.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [clients, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredClients.length / rowsPerPage)
  );

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
                <th>Designation</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>City</th>
                <th>Addedby</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="no-data">
                    Loading...
                  </td>
                </tr>
              ) : paginatedClients.length > 0 ? (
                paginatedClients.map((client) => (
                  <tr key={client.id}>
                    <td>{client.name}</td>
                    <td>{client.designation}</td>
                    <td>{client.mobile}</td>
                    <td>{client.email}</td>
                    <td>{client.city}</td>
                    <td>{client.addedbyname}</td>
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
                    <td>
                      <div className="action-btns">
                        <button
                          className="action-btn view-btn"
                          title="View"
                         onClick={() => navigate(`/clients/view/${client.id}`)}
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          className="action-btn edit-btn"
                          title="Edit"
                          onClick={() =>
                            navigate("/clients/edit", {
                              state: { client },
                            })
                          }
                        >
                          <Pencil size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
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

        {/* MODAL */}
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