import { useState, useMemo, useEffect } from "react";
import { Plus, Pencil, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ClientModal from "./ClientModal";
import "./Client.css";

import { getClients ,getClientById} from "../services/clientService";
import { useAuth } from "@/core/auth/AuthProvider";

export default function Clients() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [editClient, setEditClient] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
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
     const formatted = data.map((item, index) => {
  console.log("CLIENT RAW:", item); // 👈 ADD HERE

  return {
    id: item.id ?? index + 1,
    name: item.name,
    designation: item.designation,
    mobile: item.phone,
    email: item.email,
    city: item.cityName,
    addedbyname: item.addedbyname,
    status: Number(item.status) === 1 ? "Active" : "Inactive",
  };
});
      setClients(formatted);
      setCurrentPage(1);
    } catch (err) {
      console.error("Client fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

const handleEditClick = async (clientId) => {
  try {
    setEditLoading(true);

    const userId = user?.id ?? user?.user_id;
    const res = await getClientById(userId, clientId);

    if (res?.data) {
      setEditClient(res.data); // full API response
    }
  } catch (err) {
    console.error("Failed to fetch client:", err);
    alert("Failed to load client details");
  } finally {
    setEditLoading(false);
  }
};

  useEffect(() => {
    const userId = user?.id ?? user?.user_id;
    if (!userId) return;
    fetchClients(userId);
  }, [user]);

  const handleSaveClient = () => {
    const userId = user?.id ?? user?.user_id;
    fetchClients(userId);
  };

  const filteredClients = useMemo(() => {
    return clients.filter((client) =>
      client.name?.toLowerCase().includes(search.toLowerCase())
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
    <div className="crmClients-page">
      <div className="crmClients-wrapper">

        {/* HEADER */}
        <div className="crmClients-header">
          <h2 className="crmClients-title">Clients</h2>
          <div className="crmClients-headerRight">
            <input
              className="crmClients-searchInput"
              placeholder="Search by name"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
            <button
              className="crmClients-addBtn"
              onClick={() => setOpen(true)}
            >
              <Plus size={16} />
              Add Client
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="crmClients-tableWrap">
          <table className="crmClients-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Designation</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>City</th>
                <th>Added By</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="crmClients-noData">
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
                        className={`crmClients-status ${
                          client.status === "Active"
                            ? "crmClients-status--active"
                            : "crmClients-status--inactive"
                        }`}
                      >
                        {client.status}
                      </span>
                    </td>
                    <td>
                      <div className="crmClients-actions">
                        <button
                          className="crmClients-actionBtn crmClients-viewBtn"
                          title="View"
                          onClick={() =>
  navigate(`/clients/view/${client.id}`, {
    state: { client }
  })
}
                        >
                          <Eye size={15} />
                        </button>
                       <button
  className="crmClients-actionBtn crmClients-editBtn"
  title="Edit"
  onClick={() => handleEditClick(client.id)}
>
  <Pencil size={15} />
</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="crmClients-noData">
                    No clients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="crmClients-pagination">
          <span>
            Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
            {Math.min(currentPage * rowsPerPage, filteredClients.length)} of{" "}
            {filteredClients.length} entries
          </span>
          <div className="crmClients-paginationBtns">
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

        {/* CREATE MODAL */}
        {open && (
          <ClientModal
            onClose={() => setOpen(false)}
            onSave={handleSaveClient}
          />
        )}

        {/* EDIT MODAL */}
        {editClient && (
          <ClientModal
            onClose={() => setEditClient(null)}
            onSave={handleSaveClient}
            initialData={editClient}
          />
        )}
      </div>
    </div>
  );
}