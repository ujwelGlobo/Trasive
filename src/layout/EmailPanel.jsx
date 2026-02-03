import { X, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./EmailPanel.css";

const EmailPanel = ({ open, onClose }) => {
  const navigate = useNavigate();

  const emails = [
    {
      id: 1,
      from: "Mahesh",
      subject: "Kerala Tour Confirmation",
      time: "2h ago",
      unread: true,
    },
    {
      id: 2,
      from: "Supplier",
      subject: "Hotel Payment Reminder",
      time: "Yesterday",
      unread: false,
    },
  ];

  return (
    <aside className={`email-panel ${open ? "open" : ""}`}>
      {/* HEADER */}
      <div className="email-header">
        <div className="title">
          <Mail size={18} />
          <span>Emails</span>
        </div>

        <button onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      {/* BODY */}
      <div className="email-body">
        {emails.map((mail) => (
          <div
            key={mail.id}
            className={`email-item ${mail.unread ? "unread" : ""}`}
            onClick={() => {
              navigate(`/emails/${mail.id}`);
              onClose();
            }}
          >
            <p className="from">{mail.from}</p>
            <p className="subject">{mail.subject}</p>
            <span className="time">{mail.time}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default EmailPanel;
