import { useState } from "react";
import { Pencil, Plus } from "lucide-react";
import "./LeadSource.css";
import LeadSourceModal from "./LeadSourceModal";

const initialSources = [
  { name: "B2B", by: "Jinu George", date: "15-03-2021", status: "Active" },
  { name: "B2C", by: "Jinu George", date: "28-02-2023", status: "Active" },
   { name: "B2B", by: "Jinu George", date: "15-03-2021", status: "Active" },
  { name: "B2C", by: "Jinu George", date: "28-02-2023", status: "Active" }, { name: "B2B", by: "Jinu George", date: "15-03-2021", status: "Active" },
  { name: "B2C", by: "Jinu George", date: "28-02-2023", status: "Active" }, { name: "B2B", by: "Jinu George", date: "15-03-2021", status: "Active" },
  { name: "B2C", by: "Jinu George", date: "28-02-2023", status: "Active" }, { name: "B2B", by: "Jinu George", date: "15-03-2021", status: "Active" },
  { name: "B2C", by: "Jinu George", date: "28-02-2023", status: "Active" },
];

export default function LeadSource() {
  const [sources, setSources] = useState(initialSources);
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [form, setForm] = useState({
    name: "",
    status: "Active",
  });

  const openAdd = () => {
    setEditIndex(null);
    setForm({ name: "", status: "Active" });
    setModalOpen(true);
  };

  const openEdit = (index) => {
    setEditIndex(index);
    setForm({
      name: sources[index].name,
      status: sources[index].status,
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;

    if (editIndex === null) {
      setSources([
        ...sources,
        {
          name: form.name,
          status: form.status,
          by: "You",
          date: new Date().toLocaleDateString(),
        },
      ]);
    } else {
      const updated = [...sources];
      updated[editIndex] = { ...updated[editIndex], ...form };
      setSources(updated);
    }

    setModalOpen(false);
  };

  return (
    <div className="ls-page">
      <div className="ls-card">

        <div className="ls-header">
          <h2>Lead Source</h2>

          <div className="ls-header-actions">
            <input
              placeholder="Search source..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="ls-btn-primary" onClick={openAdd}>
              <Plus size={16} /> Add Lead Source
            </button>
          </div>
        </div>

       <table className="ls-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Status</th>
      <th>By</th>
      <th>Date</th>
      <th>Edit</th>
    </tr>
  </thead>

  <tbody>
    {sources
      .filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase())
      )
      .map((s, i) => (
        <tr key={i}>
          <td>{s.name}</td>
          <td>{s.status}</td>
          <td>{s.by}</td>
          <td>{s.date}</td>
          <td>
            <button className="edit-btn-lead-source" onClick={() => openEdit(i)}>
              <Pencil size={14} />
            </button>
          </td>
        </tr>
      ))}
  </tbody>
</table>


      </div>

      <LeadSourceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        form={form}
        setForm={setForm}
        isEdit={editIndex !== null}
      />
    </div>
  );
}
