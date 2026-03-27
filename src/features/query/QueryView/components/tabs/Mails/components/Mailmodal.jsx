import { useEffect, useState } from "react";

const MailModal = ({ data, onClose, onSave }) => {
  const [form, setForm] = useState({
    to: "",
    subject: "",
    body: "",
  });

  useEffect(() => {
    if (data) {
      setForm({
        to: data.to || "",
        subject: data.subject || "",
        body: data.body || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const payload = {
      to: form.to,
      subject: form.subject,
      body: form.body,
    };
    onSave(payload);
  };

  return (
    <div className="modal-overlay">
      <div className="mail-modal">
        <div className="modal-header">
          <h3>Compose Mail</h3>
          <span onClick={onClose}>✖</span>
        </div>

        <input
          name="to"
          placeholder="To"
          value={form.to}
          onChange={handleChange}
        />

        <input
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
        />

        <textarea
          name="body"
          placeholder="Write your message..."
          value={form.body}
          onChange={handleChange}
        />

        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default MailModal;