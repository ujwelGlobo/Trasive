import { useEffect, useState } from "react";
import {
  getMails,
  createMail,
  updateMail,
  deleteMail,
} from "../services/Mailservices";

import MailModal from "../components/Mailmodal";
import "./Mail.css";

const Mails = () => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchData = async () => {
    const res = await getMails({ search });
    setList(res.data || []);
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  const handleCompose = () => {
    setEditData(null);
    setOpen(true);
  };

  const handleEdit = (item) => {
    setEditData(item);
    setOpen(true);
  };

  const handleSave = async (payload) => {
    if (editData) {
      await updateMail(editData.id, payload);
    } else {
      await createMail(payload);
    }
    setOpen(false);
    fetchData();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this mail?")) return;
    await deleteMail(id);
    fetchData();
  };

  return (
    <div className="mail-page">
      {/* HEADER */}
      <div className="mail-header">
        <button className="compose-btn" onClick={handleCompose}>
          ✉ Compose
        </button>

        <input
          placeholder="Search mail..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* LIST */}
      <div className="mail-list">
        {list.map((item) => (
          <div key={item.id} className="mail-row">
            <div className="left">
              <strong>{item.to}</strong>
              <p>{item.subject}</p>
            </div>

            <div className="right">
              <span>{item.date}</span>

              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {open && (
        <MailModal
          data={editData}
          onClose={() => setOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Mails;