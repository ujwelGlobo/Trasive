import { useState, useEffect } from "react";
import axiosInstance from "@/core/api/axiosInstance";
import { getassignTo } from "@/features/query/CreateQuery/services/QueryServicePage";

// ─────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────
const getTodayStr = () => new Date().toISOString().split("T")[0];

const convertTo24Hour = (timeStr) => {
  const [h, mPart] = timeStr.split(":");
  const [min, period] = mPart.split(" ");
  let hours = parseInt(h, 10);

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  return `${String(hours).padStart(2, "0")}:${min}`;
};

// ✅ FIXED: Use backend ISO directly
const formatDateTime = (isoDate) => {
  if (!isoDate) return "—";

  const d = new Date(isoDate);

  const date = d.toLocaleDateString("en-GB"); // 22/03/2026
  const time = d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `${date} - ${time}`;
};

// ✅ FIXED: no manual combining
const isOverdue = (task) => {
  if (!task.reminderDate) return false;
  return new Date(task.reminderDate) < new Date() && !task.makeDone;
};

const TIME_OPTIONS = [
  "08:00 AM","09:00 AM","10:00 AM","11:00 AM",
  "12:00 PM","01:00 PM","02:00 PM","03:00 PM",
  "04:00 PM","05:00 PM","06:00 PM","07:00 PM"
];

// ─────────────────────────────────────────────────────────
// Task Card
// ─────────────────────────────────────────────────────────
function TaskItem({ task, onMarkDone, marking, assignMap }) {
  const overdue = isOverdue(task);
  const done = task.makeDone === 1;

  return (
    <div className={`card mb-3 shadow-sm border-0 ${done ? "opacity-75" : ""}`}>
      <div className="card-body d-flex justify-content-between align-items-start">

        <div>
          <h6 className="mb-1 fw-semibold">
              <p className="mb-1 text-muted">{task.details}</p>
            {done && <span className="badge bg-success ms-2">Done</span>}
            {overdue && !done && <span className="badge bg-danger ms-2">Overdue</span>}
          </h6>

         {task.taskType}

          <small className="text-secondary">
            <i className="bi bi-clock me-1"></i>
            {formatDateTime(task.reminderDate)}
            {" by "}
            {assignMap[task.addedBy] || "Unknown"}
          </small>
        </div>

        {!done && (
          <button
            className="btn btn-outline-success btn-sm"
            disabled={marking === task.id}
            onClick={() => onMarkDone(task.id)}
          >
            {marking === task.id ? "..." : "Done"}
          </button>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────
export default function Followups({ query, userId, queryId, onRefresh }) {
  const [tasks, setTasks] = useState(query?.tasks ?? []);
  const [taskTypes, setTaskTypes] = useState([]);
  const [assignMap, setAssignMap] = useState({});
  const [marking, setMarking] = useState(null);
  const [assignUsers, setAssignUsers] = useState([]); // ✅ NEW

  const [form, setForm] = useState({
    taskType: "",
    details: "",
    reminderDate: getTodayStr(),
    time: "01:00 PM",
     reminder: "",
      assignTo: "",
  });

  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    setTasks(query?.tasks ?? []);
  }, [query]);

  // ✅ Load users for "by name"
useEffect(() => {
  if (!userId) return;

  getassignTo(userId).then((res) => {
    const arr = res?.data?.data ?? res ?? [];
    const map = {};
    arr.forEach((u) => {
      map[u.user_id ?? u.id] =
        u.name ?? `${u.firstName ?? ""} ${u.lastName ?? ""}`;
    });

  setAssignUsers(arr); 

    // ✅ set default assignTo
    const firstUserId = Object.keys(map)[0];
    setForm(prev => ({ ...prev, assignTo: firstUserId || "" }));
  });
}, [userId]);

  // Load task types
  useEffect(() => {
    axiosInstance.get(`/query/tasklist`)
      .then(res => {
        if (res.data?.status) {
          setTaskTypes(res.data.data);
          setForm(prev => ({ ...prev, taskType: res.data.data[0] }));
        }
      });
  }, []);

  const handleChange = (f, v) => {
    setForm(prev => ({ ...prev, [f]: v }));
    setFormError("");
  };

  // SAVE
  const handleSave = async () => {
    if (!form.details.trim()) {
      setFormError("Description required");
      return;
    }

    try {
      setSaving(true);

      await axiosInstance.post(`/query/task`, {
        queryid: Number(queryId),
        details: form.details,
        user_id: userId,
       assignTo: form.assignTo, // ✅ selected user // silent fix
        reminderDate: form.reminderDate,
        reminderTime: convertTo24Hour(form.time),
        taskType: form.taskType,
        status: form.reminder === "yes" ? 1 : 0, // ✅ map yes/no
      });

      setForm({
        taskType: taskTypes[0],
        details: "",
        reminderDate: getTodayStr(),
        time: "01:00 PM",
        reminder: "", // ✅ reset
        assignTo: Object.keys(assignMap)[0] || "",
      });

      onRefresh?.();

    } catch (err) {
      console.error(err);
      setFormError("Save failed");
    } finally {
      setSaving(false);
    }
  };

  // MARK DONE
  const handleMarkDone = async (id) => {
    try {
      setMarking(id);

      await axiosInstance.put(`/query/task/${id}`, {
        makeDone: 1,
      });

      setTasks(prev =>
        prev.map(t => t.id === id ? { ...t, makeDone: 1 } : t)
      );
    } finally {
      setMarking(null);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row g-4">

        {/* LEFT */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white fw-semibold">
              Tasks ({tasks.length})
            </div>

            <div className="card-body" style={{ maxHeight: "70vh", overflowY: "auto" }}>
              {tasks.length === 0 ? (
                <p className="text-muted text-center">No tasks yet</p>
              ) : (
                tasks.map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onMarkDone={handleMarkDone}
                    marking={marking}
                    assignMap={assignMap}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 position-sticky" style={{ top: 20 }}>
            <div className="card-header bg-white fw-semibold">
              Add Follow-up
            </div>

            <div className="card-body">

              <div className="mb-3">
                <label className="form-label">Type</label>
                <select
                  className="form-select"
                  value={form.taskType}
                  onChange={(e) => handleChange("taskType", e.target.value)}
                >
                  {taskTypes.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="mb-3">
  <label className="form-label">Assign To</label>
 <select
  className="form-select"
  value={form.assignTo}
  onChange={(e) => handleChange("assignTo", e.target.value)}
>
  <option value="">Select User</option>

  {assignUsers.map((u) => (
    <option key={u.user_id} value={u.user_id}>
      {u.firstName} {u.lastName}
    </option>
  ))}
</select>
</div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={form.details}
                  onChange={(e) => handleChange("details", e.target.value)}
                />
              </div>

              <div className="row g-2">
                <div className="col-6">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={form.reminderDate}
                    onChange={(e) => handleChange("reminderDate", e.target.value)}
                  />
                </div>

                <div className="col-6">
                  <label className="form-label">Time</label>
                  <select
                    className="form-select"
                    value={form.time}
                    onChange={(e) => handleChange("time", e.target.value)}
                  >
                    {TIME_OPTIONS.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>

             <div className="col-6">
  <label className="form-label">Set Reminder</label>
  <select
    className="form-select"
    value={form.reminder}   // ✅ correct field
    onChange={(e) => handleChange("reminder", e.target.value)} // ✅ correct
  >
    <option value="">Select</option>
    <option value="yes">Yes</option>
    <option value="no">No</option>
  </select>
</div>
              </div>

              

              {formError && (
                <div className="alert alert-danger mt-3 py-2">
                  {formError}
                </div>
              )}

              <button
                className="btn btn-primary w-100 mt-3"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Task"}
              </button>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}