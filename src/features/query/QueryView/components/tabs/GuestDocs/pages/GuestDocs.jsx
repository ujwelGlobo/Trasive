import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  getGuests,
  createGuest,
  updateGuest,
  deleteGuest,
} from "../services/guestService";

import GuestModal from "../components/GuestDocsModal";
import "./GuestDocs.css";

const GuestPage = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getGuests({ page, search });
      setList(res.data || []);
      setTotal(res.last_page || 1);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const handleAdd = () => {
    setEditData(null);
    setOpen(true);
  };

  const handleEdit = (row) => {
    setEditData(row);
    setOpen(true);
  };

  const handleSave = async (payload) => {
    if (editData) {
      await updateGuest(editData.id, payload);
    } else {
      await createGuest(payload);
    }
    setOpen(false);
    fetchData();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    await deleteGuest(id);
    fetchData();
  };

  return (
    <div className="gd-page">
      {/* HEADER */}
      <div className="gd-header">
        <h2>Guest Management</h2>
        <div className="gd-header-actions">
          <input
            className="gd-search-input"
            placeholder="Search guests..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
          <button className="gd-add-btn" onClick={handleAdd}>+ Add Guest</button>
        </div>
      </div>

      {/* TABLE */}
      <div className="gd-table-card">
        <table className="gd-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>DOB</th>
              <th className="gd-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan="4">Loading...</td></tr>
            )}
            {!loading && list.length === 0 && (
              <tr><td colSpan="4">No Data Found</td></tr>
            )}
            {list.map((item) => (
              <tr key={item.id}>
                <td>{item.first_name} {item.last_name}</td>
                <td>{item.gender}</td>
                <td>{item.dob}</td>
                <td className="gd-right">
                  <button className="gd-btn gd-btn--edit" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="gd-btn gd-btn--delete" onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="gd-pagination">
        <button className="gd-page-btn" disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span className="gd-page-info">{page} / {total}</span>
        <button className="gd-page-btn" disabled={page === total} onClick={() => setPage(page + 1)}>Next</button>
      </div>

      {/* MODAL — rendered on <body> to escape all parent stacking contexts */}
      {open &&
        createPortal(
          <GuestModal
            data={editData}
            onClose={() => setOpen(false)}
            onSave={handleSave}
          />,
          document.body
        )}
    </div>
  );
};

export default GuestPage;