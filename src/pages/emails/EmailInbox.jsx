import { MailOpen, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./emailbox.css";

const EmailInbox = () => {
  const navigate = useNavigate();

  const emails = [
    {
      id: 1,
      from: "Mahesh",
      subject: "Kerala Tour Confirmation",
      preview: "Your Kerala tour has been confirmed...",
      time: "10:45 AM",
      unread: true,
    },
    {
      id: 2,
      from: "Supplier",
      subject: "Hotel Payment Reminder",
      preview: "Pending payment for booking #202569650",
      time: "Yesterday",
      unread: false,
    },
  ];

  return (
    <div className="email-page">
      <h3 className="page-title">Inbox</h3>

      <div className="email-list">
        {emails.map((mail) => (
          <div
            key={mail.id}
            className={`email-row ${mail.unread ? "unread" : ""}`}
            onClick={() => navigate(`/emails/${mail.id}`)}
          >
            <div className="icon">
              {mail.unread ? <Mail /> : <MailOpen />}
            </div>

            <div className="content">
              <div className="top">
                <span className="from">{mail.from}</span>
                <span className="time">{mail.time}</span>
              </div>
              <p className="subject">{mail.subject}</p>
              <p className="preview">{mail.preview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailInbox;
