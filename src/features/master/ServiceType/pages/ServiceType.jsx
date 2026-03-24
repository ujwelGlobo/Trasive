import React, { useState, useMemo, useEffect } from "react";
import { Plus, PencilLine, Trash2 } from "lucide-react";
import ServiceTypeModal from "../components/ServiceTypeModal";
import { useAuth } from "@/core/auth/AuthProvider";
import {
  getServiceTypes,
  createServiceType,
  updateServiceType,
  deleteServiceType,
} from "../service/Servicetypeservice";

import "./ServiceType.css";

const ServiceType = () => {

  const { user } = useAuth();
  const userId = user?.id;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [formData, setFormData] = useState({ name: "" });

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  /* FETCH */

  const fetchServiceTypes = async () => {

    if (!userId) return;

    try {
      setLoading(true);
      const res = await getServiceTypes(userId);

      const formatted = (Array.isArray(res.data) ? res.data : []).map((item) => ({
        id: item.id,
        name: item.name,
        by: item.addedBy ?? "-",
        date: item.dateAdded
          ? new Date(item.dateAdded).toLocaleDateString("en-GB")
          : "-",
      }));

      setData(formatted);
    } catch (error) {
      console.error("Error fetching service types:", error);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    fetchServiceTypes();
  }, [userId]);

  /* HANDLERS */

  const handleAdd = () => {
    setIsEdit(false);
    setIsDelete(false);
    setFormData({ name: "" });
    setModalOpen(true);
  };

  const handleEdit = (item) => {
    setIsEdit(true);
    setIsDelete(false);
    setFormData({ id: item.id, name: item.name });
    setModalOpen(true);
  };

  const handleDeletePrompt = (item) => {
    setIsDelete(true);
    setDeleteTarget(item);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteServiceType(deleteTarget.id);
      fetchServiceTypes();
      setModalOpen(false);
      setDeleteTarget(null);
    } catch (error) {
      console.error("Delete error:", error?.response?.data || error);
    }
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !userId) return;
    try {
      if (!isEdit) {
        await createServiceType(userId, { name: formData.name, user_id: userId });
      } else {
        await updateServiceType(formData.id, { name: formData.name, user_id: userId });
      }
      fetchServiceTypes();
      setModalOpen(false);
    } catch (error) {
      console.error("Save error:", error?.response?.data || error);
    }
  };

  /* SEARCH + PAGINATION */

  const filtered = useMemo(() => {
    setPage(1);
    return data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <div className="st-page">
        <div className="st-card">

          {/* HEADER */}
          <div className="st-header">
            <div className="st-title">
              <h2>Service Types</h2>
              <p>Manage all service types</p>
            </div>
            <button className="st-add-btn" onClick={handleAdd}>
              <Plus size={16} />
              <span>Add Service Type</span>
            </button>
          </div>

          {/* FILTERS */}
          <div className="st-filters">
            <select
              className="st-select"
              value={pageSize}
              onChange={(e) => { setPageSize(+e.target.value); setPage(1); }}
            >
              <option value={10}>Show 10</option>
              <option value={25}>Show 25</option>
            </select>

            <input
              type="text"
              placeholder="Search service type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* LIST */}
          <div className="st-list">

            {loading && (
              <div className="st-empty">Loading...</div>
            )}

            {!loading && paginated.length === 0 && (
              <div className="st-empty">No service types found.</div>
            )}

            {!loading && paginated.map((item) => (
              <div className="st-row" key={item.id}>

                <div>
                  <div className="st-row-name">{item.name}</div>
                  {item.by !== "-" && (
                    <div className="st-row-meta">Added by {item.by} · {item.date}</div>
                  )}
                </div>

                <div className="st-row-actions">
                  <button className="st-edit-btn" onClick={() => handleEdit(item)}>
                    <PencilLine size={14} />
                  </button>
                  <button className="st-delete-btn" onClick={() => handleDeletePrompt(item)}>
                    <Trash2 size={14} />
                  </button>
                </div>

              </div>
            ))}

          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="st-pagination">
              <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
              <span>Page {page} of {totalPages}</span>
              <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
            </div>
          )}

        </div>
      </div>

      <ServiceTypeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        formData={formData}
        setFormData={setFormData}
        isEdit={isEdit}
        isDelete={isDelete}
        deleteTarget={deleteTarget}
        onDeleteConfirm={handleDeleteConfirm}
      />
    </>
  );

};

export default ServiceType;