import { useState, useEffect } from "react";
import { Pencil, Plus } from "lucide-react";
import LeadSourceModal from "../components/LeadSourceModal";
import {
  getLeadSource,
  UpdatedLeadSource,
  createdLeadSource,
} from "../services/LeadService";

import { useAuth } from "@/core/auth/AuthProvider";
import "./LeadSource.css";

export default function LeadSource() {
  const [sources, setSources] = useState([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  const [form, setForm] = useState({
    name: "",
    status: 1,
  });

  const fetchSources = async (userId) => {
    if (!userId) return;

    try {
      setLoading(true);

      const res = await getLeadSource(userId);

      const formatted = res.data.map((item) => ({
        id: item.id,
        name: item.name,
        status: Number(item.status),
        by: item.addedBy ?? "-",
        date: item.dateAdded
          ? new Date(item.dateAdded).toLocaleDateString()
          : "-",
      }));

      setSources(formatted);
    } catch (error) {
      console.error("Error fetching lead sources:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.id) return;
    fetchSources(user.id);
  }, [user]);

  const openAdd = () => {
    setEditItem(null);
    setForm({ name: "", status: 1 });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    setForm({
      name: item.name,
      status: item.status,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;

    const userId = user?.id;
    if (!userId) return;

    try {
      if (!editItem) {
        await createdLeadSource({
          name: form.name,
          status: form.status,
          user_id: userId,
        });
      } else {
        await UpdatedLeadSource(editItem.id, {
          name: form.name,
          status: form.status,
        });
      }

      fetchSources(userId);
      setModalOpen(false);
    } catch (error) {
      console.error("Error saving lead source:", error);
    }
  };

  return (
    <div className="ls-page">

      <div className="ls-card">

        {/* HEADER */}
        <div className="ls-header-modern">

          <div className="ls-title">
            <h4>Lead Sources</h4>
            <span>Manage where your leads come from</span>
          </div>

          <div className="ls-actions">

            <input
              className="ls-search"
              placeholder="Search source..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button className="ls-add-btn" onClick={openAdd}>
              <Plus size={16}/>
              Add Source
            </button>

          </div>

        </div>

        {/* TABLE */}

        <div className="ls-table-wrapper">

          <table className="ls-table-modern">

            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Added By</th>
                <th>Date</th>
                <th width="80">Edit</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td colSpan="5">
                      <div className="shimmer-row"></div>
                    </td>
                  </tr>
                ))
              ) : sources.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-row">
                    No lead sources found
                  </td>
                </tr>
              ) : (
                sources
                  .filter((s) =>
                    s.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((s) => (
                    <tr key={s.id}>

                      <td className="ls-name">{s.name}</td>

                      <td>
                        {s.status === 1 ? (
                          <span className="badge-active">Active</span>
                        ) : (
                          <span className="badge-inactive">Inactive</span>
                        )}
                      </td>

                      <td>{s.by}</td>

                      <td>{s.date}</td>

                      <td>
                        <button
                          className="ls-edit-btn"
                          onClick={() => openEdit(s)}
                        >
                          <Pencil size={14}/>
                        </button>
                      </td>

                    </tr>
                  ))
              )}

            </tbody>

          </table>

        </div>

      </div>

      <LeadSourceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        form={form}
        setForm={setForm}
        isEdit={!!editItem}
      />

    </div>
  );
}