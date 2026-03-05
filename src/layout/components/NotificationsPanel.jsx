import { X, Bell, CalendarClock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./NotificationsPanel.css";

const NotificationsPanel = ({ open, onClose }) => {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      title: "Call Evening",
      description: "Follow up with Mahesh",
      time: "Today · 5:00 PM",
      type: "reminder",
      link: "/tasks",
      unread: true,
    },
    {
      id: 2,
      title: "New Query Assigned",
      description: "Query #202569683",
      time: "10 min ago",
      type: "query",
      link: "/query",
      unread: false,
    },
  ];

  return (
    <aside className={`notification-panel ${open ? "open" : ""}`}>
      {/* HEADER */}
      <div className="notification-header">
        <div className="title">
          <Bell size={18} />
          <span>Notifications</span>
        </div>

        <button onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      {/* BODY */}
      <div className="notification-body">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`notification-card ${item.unread ? "unread" : ""}`}
            onClick={() => {
              navigate(item.link);
              onClose();
            }}
          >
            <div className={`icon ${item.type}`}>
              <CalendarClock size={16} />
            </div>

            <div className="content">
              <p className="title">{item.title}</p>
              <p className="desc">{item.description}</p>
              <span className="time">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default NotificationsPanel;
