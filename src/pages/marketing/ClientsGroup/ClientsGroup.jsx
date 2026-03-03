import { useState, useMemo } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import ClientsGroupModal from "./ClientsGroupModal";
import "./ClientsGroup.css";

export default function ClientsGroup() {
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Premium Clients",
      description: "High value customers",
      subscribers: 120,
      status: "Active",
      by: "Admin",
      date: "12 Feb 2026",
    },
    {
      id: 2,
      name: "Inactive Clients",
      description: "No recent bookings",
      subscribers: 45,
      status: "Inactive",
      by: "Admin",
      date: "05 Jan 2026",
    },
    {
      id: 1,
      name: "Premium Clients",
      description: "High value customers",
      subscribers: 120,
      status: "Active",
      by: "Admin",
      date: "12 Feb 2026",
    },
    {
      id: 2,
      name: "Inactive Clients",
      description: "No recent bookings",
      subscribers: 45,
      status: "Inactive",
      by: "Admin",
      date: "05 Jan 2026",
    },
    {
      id: 1,
      name: "Premium Clients",
      description: "High value customers",
      subscribers: 120,
      status: "Active",
      by: "Admin",
      date: "12 Feb 2026",
    },
    {
      id: 2,
      name: "Inactive Clients",
      description: "No recent bookings",
      subscribers: 45,
      status: "Inactive",
      by: "Admin",
      date: "05 Jan 2026",
    },
  ]);

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  /* FILTER */
  const filteredGroups = useMemo(() => {
    return groups.filter((g) =>
      g.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [groups, search]);

  /* PAGINATION */
  const totalPages = Math.max(
    1,
    Math.ceil(filteredGroups.length / rowsPerPage),
  );

  const paginatedGroups = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredGroups.slice(start, start + rowsPerPage);
  }, [filteredGroups, currentPage]);

  const startEntry =
    filteredGroups.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;

  const endEntry = Math.min(currentPage * rowsPerPage, filteredGroups.length);

  /* ACTIONS */
  const handleAdd = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleEdit = (group) => {
    setEditData(group);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this group?")) {
      setGroups(groups.filter((g) => g.id !== id));
    }
  };

  const handleSave = (data) => {
    if (editData) {
      setGroups((prev) =>
        prev.map((g) => (g.id === editData.id ? { ...g, ...data } : g)),
      );
    } else {
      const newGroup = {
        id: Date.now(),
        subscribers: 0,
        by: "Admin",
        date: new Date().toLocaleDateString(),
        ...data,
      };
      setGroups([...groups, newGroup]);
    }

    setModalOpen(false);
  };

  return (
    <>
      <div className="clgrp-page">
        <div className="clgrp-container">
          <div className="clgrp-card">
            {/* HEADER */}
            <div className="clgrp-header">
              <div>
                <h2>Client Groups</h2>
                <p>Manage and organize your customer segments</p>
              </div>

              <div className="clgrp-actions">
                <div className="clgrp-search">
                  <Search size={14} />
                  <input
                    placeholder="Search group..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>

                <button className="clgrp-btn primary" onClick={handleAdd}>
                  <Plus size={16} /> Add Group
                </button>
              </div>
            </div>

            {/* TABLE */}
            <table className="clgrp-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Subscribers</th>
                  <th>Status</th>
                  <th>Created By</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {paginatedGroups.map((group) => (
                  <tr key={group.id}>
                    <td className="clgrp-name">{group.name}</td>
                    <td>{group.description}</td>
                    <td>{group.subscribers}</td>
                    <td>
                      <span
                        className={`clgrp-badge ${
                          group.status === "Active" ? "active" : "inactive"
                        }`}
                      >
                        {group.status}
                      </span>
                    </td>
                    <td>{group.by}</td>
                    <td>{group.date}</td>
                    <td>
                      <button
                        className="clgrp-edit"
                        onClick={() => handleEdit(group)}
                      >
                        <Pencil size={14} />
                      </button>

                      <button
                        className="clgrp-delete"
                        onClick={() => handleDelete(group.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}

                {paginatedGroups.length === 0 && (
                  <tr>
                    <td colSpan="7" className="clgrp-empty">
                      No client groups found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* FOOTER */}
            <div className="clgrp-footer">
              <span>
                Showing {startEntry} to {endEntry} of {filteredGroups.length}{" "}
                entries
              </span>

              <div className="clgrp-pagination">
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
          </div>
        </div>
      </div>

      {modalOpen && (
        <ClientsGroupModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          mode={editData ? "edit" : "add"}
          initialData={editData}
          onSave={handleSave}
        />
      )}
    </>
  );
}
