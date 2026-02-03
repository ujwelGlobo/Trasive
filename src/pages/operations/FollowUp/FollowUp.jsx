import "./FollowUp.css";
import { Clock, User, PhoneCall } from "lucide-react";

const FollowUp = () => {
  return (
    <div className="page-wrapper">

      {/* PAGE HEADER */}
      <div className="page-header">
        <h3>Task / Follow-ups</h3>
        <p>Pending tasks and follow-ups assigned to you</p>
      </div>

      {/* TASK LIST */}
      <div className="task-list">

        {/* TASK ITEM */}
        <div className="task-card">
          <div className="task-left">
            <div className="task-icon">
              <PhoneCall size={18} />
            </div>

            <div className="task-content">
              <h4>
                #202569652 <span>Call evening</span>
              </h4>

              <div className="task-meta">
                <span>
                  <Clock size={14} />
                  08/12/2025 · 05:00 PM
                </span>

                <span>
                  <User size={14} />
                  Soumya
                </span>
              </div>
            </div>
          </div>

          <div className="task-right">
            <span className="task-status pending">Pending</span>
          </div>
        </div>

        {/* EMPTY STATE (when no tasks) */}
        {false && (
          <div className="empty-state">
            <span>📌</span>
            <h4>No follow-ups pending</h4>
            <p>You are all caught up 🎉</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default FollowUp;
