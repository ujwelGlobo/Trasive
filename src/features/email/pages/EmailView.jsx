import { ArrowLeft, Reply, Forward, Trash } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import "./emailbox.css";

const EmailView = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // MOCK DATA (replace with API later)
  const email = {
    id,
    subject: "Kerala Tour Confirmation",
    from: "Mahesh <mahesh@email.com>",
    to: "travsive@email.com",
    date: "08 Jan 2026 · 10:45 AM",
    body: `
Hello Team,

Your Kerala tour package has been successfully confirmed.

Please find the itinerary details attached.
Let us know if you need any changes.

Regards,
Mahesh
    `,
  };

  return (
    <div className="email-page">

      {/* TOP ACTION BAR */}
      <div className="email-toolbar">
        <button className="icon-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back
        </button>

        <div className="actions">
          <button className="icon-btn">
            <Reply size={16} />
          </button>
          <button className="icon-btn">
            <Forward size={16} />
          </button>
          <button className="icon-btn danger">
            <Trash size={16} />
          </button>
        </div>
      </div>

      {/* EMAIL CARD */}
      <div className="email-view-card">
        <h2 className="email-subject">{email.subject}</h2>

        {/* META */}
        <div className="email-meta">
          <div>
            <strong>From:</strong> {email.from}
          </div>
          <div>
            <strong>To:</strong> {email.to}
          </div>
          <div>
            <strong>Date:</strong> {email.date}
          </div>
        </div>

        {/* BODY */}
        <div className="email-body">
          {email.body.split("\n").map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmailView;
