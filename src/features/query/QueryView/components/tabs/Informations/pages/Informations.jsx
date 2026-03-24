import { useState, useEffect, useRef } from "react";
import axiosInstance from "@/core/api/axiosInstance";
import {
  getServiceTypes,
  getassignTo,
  getQueryPriorities,
} from "@/features/query/CreateQuery/services/QueryServicePage";
import { getLeadSource } from "@/features/master/LeadSource/services/LeadService";
import "./Information.css";

// ✅ Keys match DB IDs exactly
const STATUS_LIST = [
  { key: 1, label: "New",           color: "primary"   },
  { key: 2, label: "Active",        color: "success"   },
  { key: 3, label: "No Connect",    color: "secondary" },
  { key: 4, label: "Hot Lead",      color: "danger"    },
  { key: 5, label: "Follow Up",     color: "warning"   },
  { key: 6, label: "Proposal Sent", color: "info"      },
  { key: 7, label: "Confirmed",     color: "confirmed" },
  { key: 8, label: "Cancelled",     color: "dark"      },
  { key: 9, label: "Invalid",       color: "invalid"   },
];

const STATUS_STYLES = {
  primary:   { bg: "#eff6ff", border: "#bfdbfe", text: "#2563eb", dot: "#3b82f6" },
  success:   { bg: "#f0fdf4", border: "#bbf7d0", text: "#16a34a", dot: "#22c55e" },
  secondary: { bg: "#f8fafc", border: "#cbd5e1", text: "#64748b", dot: "#94a3b8" },
  danger:    { bg: "#fff1f2", border: "#fecdd3", text: "#e11d48", dot: "#f43f5e" },
  info:      { bg: "#f5f3ff", border: "#ddd6fe", text: "#7c3aed", dot: "#8b5cf6" },
  warning:   { bg: "#fffbeb", border: "#fed7aa", text: "#ea580c", dot: "#f97316" },
  confirmed: { bg: "#f0fdf4", border: "#86efac", text: "#15803d", dot: "#16a34a" },
  dark:      { bg: "#fdf2f8", border: "#f5d0fe", text: "#a21caf", dot: "#c026d3" },
  invalid:   { bg: "#f8fafc", border: "#cbd5e1", text: "#475569", dot: "#64748b" },
};

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit", month: "2-digit", year: "numeric",
  });
};

const formatDateTime = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleString("en-IN", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
};

const InfoField = ({ label, value, icon }) => (
  <div className="qvi-field">
    <div className="qvi-field-label">
      {icon && <i className={`bi bi-${icon}`}></i>}
      {label}
    </div>
    <div className="qvi-field-value">{value ?? "—"}</div>
  </div>
);

const SectionCard = ({ title, icon, action, children }) => (
  <div className="qvi-card">
    <div className="qvi-card-header">
      <div className="qvi-card-title-wrap">
        {icon && (
          <span className="qvi-card-icon">
            <i className={`bi bi-${icon}`}></i>
          </span>
        )}
        <span className="qvi-section-title">{title}</span>
      </div>
      {action}
    </div>
    {children}
  </div>
);

const buildMap = (result, keyField, valueFn) => {
  if (result.status !== "fulfilled") return {};
  const arr = Array.isArray(result.value)
    ? result.value
    : result.value?.data?.data ?? [];
  const map = {};
  arr.forEach((i) => (map[i[keyField]] = valueFn(i)));
  return map;
};

function NoteItem({ note, idx, assignMap, userId, queryId, onUpdated }) {
  const [editing,  setEditing]  = useState(false);
  const [editText, setEditText] = useState(note.details);
  const [saving,   setSaving]   = useState(false);
  const [error,    setError]    = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(editText.length, editText.length);
    }
  }, [editing]);

  const handleSaveEdit = async () => {
    const text = editText.trim();
    if (!text) { setError("Note cannot be empty."); return; }
    if (text === note.details) { setEditing(false); return; }
    try {
      setSaving(true);
      setError("");
      const res = await axiosInstance.put(`/query/notesupdate`, {
        queryid: Number(queryId),
        details: text,
        addedBy: userId,
      });
      if (res.data?.status) {
        onUpdated({ ...note, details: text });
        setEditing(false);
      } else {
        setError("Update failed. Please try again.");
      }
    } catch (err) {
      console.error("Note update failed:", err);
      setError("Update failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditText(note.details);
    setEditing(false);
    setError("");
  };

  return (
    <div
      className={`qvi-note-item${editing ? " qvi-note-item--editing" : ""}`}
      style={{ animationDelay: `${idx * 40}ms` }}
    >
      <div className="qvi-note-stripe"></div>
      <div className="qvi-note-body">
        {editing ? (
          <div className="qvi-note-edit-wrap">
            <textarea
              ref={textareaRef}
              className="qvi-note-edit-textarea"
              value={editText}
              rows={3}
              onChange={(e) => { setEditText(e.target.value); setError(""); }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleSaveEdit();
                if (e.key === "Escape") handleCancelEdit();
              }}
            />
            {error && <p className="qvi-note-edit-error">{error}</p>}
            <div className="qvi-note-edit-actions">
              <span className="qvi-note-edit-hint">Ctrl+Enter to save · Esc to cancel</span>
              <div className="qvi-note-edit-btns">
                <button className="qvi-note-btn qvi-note-btn--ghost" onClick={handleCancelEdit} disabled={saving}>
                  Cancel
                </button>
                <button
                  className="qvi-note-btn qvi-note-btn--primary"
                  onClick={handleSaveEdit}
                  disabled={saving || !editText.trim()}
                >
                  {saving
                    ? <><span className="spinner-border spinner-border-sm" role="status" style={{ width: 11, height: 11 }}></span>Saving…</>
                    : <><i className="bi bi-check-lg"></i>Save</>
                  }
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="qvi-note-text">{note.details}</div>
            <div className="qvi-note-footer">
              <div className="qvi-note-meta">
                <i className="bi bi-clock"></i>
                {formatDateTime(note.dateAdded)}
                {assignMap[note.addedBy] && (
                  <>
                    <span className="qvi-note-dot">·</span>
                    <i className="bi bi-person"></i>
                    {assignMap[note.addedBy]}
                  </>
                )}
              </div>
              <button className="qvi-note-edit-trigger" title="Edit note" onClick={() => setEditing(true)}>
                <i className="bi bi-pencil"></i>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function Informations({ query, userId, queryId, onEditClick, onRefresh }) {
  const [currentStatusId, setCurrentStatusId] = useState(query?.statusId ?? null);
  const [statusUpdating,  setStatusUpdating]  = useState(false);
  const [notes,          setNotes]          = useState(query?.notes ?? []);
  const [noteText,       setNoteText]       = useState("");
  const [addingNote,     setAddingNote]     = useState(false);
  const [internalNote,   setInternalNote]   = useState(query?.internalnote ?? "");
  const [savingInternal, setSavingInternal] = useState(false);
  const [savedInternal,  setSavedInternal]  = useState(false);
  const [serviceMap,  setServiceMap]  = useState({});
  const [leadMap,     setLeadMap]     = useState({});
  const [assignMap,   setAssignMap]   = useState({});
  const [priorityMap, setPriorityMap] = useState({});
  const [mapsLoading, setMapsLoading] = useState(true);

  useEffect(() => {
    setInternalNote(query?.internalnote ?? "");
    setNotes(query?.notes ?? []);
    setCurrentStatusId(query?.statusId ?? null);
  }, [query]);

  useEffect(() => {
    if (!userId) return;
    const loadMaps = async () => {
      try {
        setMapsLoading(true);
        const [serviceRes, leadRes, assignRes, priorityRes] = await Promise.allSettled([
          getServiceTypes(userId),
          getLeadSource(userId),
          getassignTo(userId),
          getQueryPriorities(),
        ]);
        setServiceMap (buildMap(serviceRes,  "id",      (i) => i.name));
        setLeadMap    (buildMap(leadRes,     "id",      (i) => i.name));
        setAssignMap  (buildMap(assignRes,   "user_id", (i) => `${i.firstName} ${i.lastName}`));
        setPriorityMap(buildMap(priorityRes, "id",      (i) => i.name));
      } catch (err) {
        console.error("Failed to load lookup maps:", err);
      } finally {
        setMapsLoading(false);
      }
    };
    loadMaps();
  }, [userId]);

  const handleStatusChange = async (statusId) => {
    console.log("Sending statusId:", statusId); // ← keep this for now to verify
    if (statusUpdating || currentStatusId === statusId) return;
    try {
      setStatusUpdating(true);
      const res = await axiosInstance.post(
        `/query/update-status/${queryId}`,
        { statusId }
      );
      if (res.data?.status) {
        setCurrentStatusId(statusId); // ✅ update local highlight
        onRefresh?.();                // ✅ refresh parent list + counts
      }
    } catch (err) {
      console.error("Status update failed:", err);
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleAddNote = async () => {
    const text = noteText.trim();
    if (!text || addingNote) return;
    try {
      setAddingNote(true);
      const res = await axiosInstance.post(`/query/notes`, {
        queryid: Number(queryId),
        details: text,
        addedBy: userId,
      });
      if (res.data?.status) {
        setNoteText("");
        onRefresh?.();
      }
    } catch (err) {
      console.error("Failed to add note:", err);
    } finally {
      setAddingNote(false);
    }
  };

  const handleNoteUpdated = (updatedNote) => {
    setNotes((prev) => prev.map((n) => (n.id === updatedNote.id ? updatedNote : n)));
  };

  const handleSaveInternal = async () => {
    if (savingInternal) return;
    try {
      setSavingInternal(true);
      await axiosInstance.put(`/query/update/${queryId}`, { internalnote: internalNote });
      setSavedInternal(true);
      setTimeout(() => setSavedInternal(false), 2000);
    } catch (err) {
      console.error("Failed to save internal note:", err);
    } finally {
      setSavingInternal(false);
    }
  };

  const lv = (mapVal, rawVal) =>
    mapsLoading ? <span className="qvi-skeleton" /> : (mapVal ?? rawVal ?? "—");

  const currentStatus = STATUS_LIST.find((s) => s.key === currentStatusId);
  const currentSS     = currentStatus ? (STATUS_STYLES[currentStatus.color] ?? STATUS_STYLES.secondary) : null;

  return (
    <div className="qvi-wrapper">

      <div className="qvi-status-bar">
        <span className="qvi-status-label">Stage</span>
        <div className="qvi-status-track">
          {STATUS_LIST.map((s, i) => {
            const isActive = currentStatusId === s.key;
            const isPast   = STATUS_LIST.findIndex((x) => x.key === currentStatusId) > i;
            const ss       = STATUS_STYLES[s.color] ?? STATUS_STYLES.secondary;
            return (
              <button
                key={s.key}
                className={[
                  "qvi-step",
                  isActive       ? "qvi-step--active"  : "",
                  isPast         ? "qvi-step--past"     : "",
                  statusUpdating ? "qvi-step--disabled" : "",
                ].join(" ").trim()}
                style={isActive ? {
                  "--step-bg":     ss.bg,
                  "--step-border": ss.border,
                  "--step-text":   ss.text,
                  "--step-dot":    ss.dot,
                } : {}}
                onClick={() => handleStatusChange(s.key)}
                disabled={statusUpdating}
                title={s.label}
              >
                <span className="qvi-step-dot"></span>
                <span className="qvi-step-label">{s.label}</span>
                {statusUpdating && isActive && (
                  <span className="qvi-step-spinner"></span>
                )}
              </button>
            );
          })}
        </div>

      {query.phone && (
  <a
    className="qvi-whatsapp-btn"
    href={`https://wa.me/${query.phone.replace(/\D/g, "")}`}
    target="_blank"
    rel="noreferrer"
  >
    <i className="bi bi-whatsapp"></i>
    <span>WhatsApp</span>
  </a>
)}

      </div>

      <div className="qvi-body">
        <div className="qvi-main">

          <SectionCard
            title="Client Information"
            icon="person-vcard-fill"
            action={
              <button className="qvi-edit-btn" onClick={onEditClick}>
                <i className="bi bi-pencil-square"></i>
                Edit Query
              </button>
            }
          >
            <div className="qvi-grid">
              <InfoField label="Client Name" icon="person-fill"    value={query.name} />
              <InfoField label="Mobile"      icon="telephone-fill" value={query.phone} />
              <InfoField label="Email"       icon="envelope-fill"  value={query.email} />
              <InfoField label="Country"     icon="globe2"         value={query.countryId} />
              <InfoField label="State"       icon="map-fill"       value={query.stateId} />
              <InfoField label="City"        icon="geo-alt-fill"   value={query.city?.name ?? query.cityId} />
            </div>
          </SectionCard>

          <SectionCard title="Query Information" icon="clipboard2-data-fill">
            <div className="qvi-grid">
              <InfoField label="From City"    icon="send-fill"           value={query.fromCity} />
              <InfoField label="Destination"  icon="geo-alt-fill"        value={query.destination?.name ?? query.destinationId} />
              <InfoField label="From Date"    icon="calendar-event-fill" value={formatDate(query.startDate)} />
              <InfoField label="To Date"      icon="calendar-check-fill" value={formatDate(query.endDate)} />
              <InfoField label="No. of Days"  icon="moon-stars-fill"     value={query.noOfDays} />
              <InfoField label="Travel Month" icon="calendar3"           value={query.travelMonth} />
              <InfoField label="Lead Source"  icon="megaphone-fill"      value={lv(leadMap[query.leadSource], query.leadSource)} />
              <InfoField label="Service"      icon="briefcase-fill"      value={query.service?.name ?? lv(serviceMap[query.serviceId], query.serviceId)} />
              <InfoField label="Meal Plan"    icon="cup-hot-fill"        value={query.mealPlan} />
              <InfoField label="Adults"       icon="people-fill"         value={query.adult} />
              <InfoField label="Children"     icon="emoji-smile-fill"    value={query.child} />
              <InfoField label="Infants"      icon="heart-fill"          value={query.infant} />
              <InfoField label="Assign To"    icon="person-badge-fill"   value={lv(assignMap[query.assignTo], query.assignTo)} />
              <InfoField label="Priority"     icon="flag-fill"           value={lv(priorityMap[query.priorityStatus], null)} />
              <InfoField label="Last Update"  icon="arrow-clockwise"     value={formatDateTime(query.updateDate)} />
              <InfoField label="Created"      icon="clock-history"       value={formatDate(query.dateAdded)} />
            </div>
          </SectionCard>

          <SectionCard title="Internal Note" icon="lock-fill">
            <textarea
              className="qvi-internal-textarea"
              rows={4}
              placeholder="Add a private internal note visible only to the team…"
              value={internalNote}
              onChange={(e) => setInternalNote(e.target.value)}
            />
            <div className="qvi-internal-footer">
              {savedInternal && (
                <span className="qvi-saved-toast">
                  <i className="bi bi-check-circle-fill"></i> Saved
                </span>
              )}
              <button className="qvi-save-btn" onClick={handleSaveInternal} disabled={savingInternal}>
                {savingInternal
                  ? <><span className="spinner-border spinner-border-sm" role="status" style={{ width: 12, height: 12 }}></span>Saving…</>
                  : <><i className="bi bi-floppy-fill"></i>Save Note</>
                }
              </button>
            </div>
          </SectionCard>

        </div>

        <div className="qvi-notes-panel">
          <div className="qvi-notes-header">
            <div className="qvi-notes-title-row">
              <span className="qvi-notes-icon-wrap">
                <i className="bi bi-pin-angle-fill"></i>
              </span>
              <span className="qvi-notes-title">Notes</span>
              {notes.length > 0 && (
                <span className="qvi-notes-count">{notes.length}</span>
              )}
            </div>
          </div>

          <div className="qvi-note-compose">
            <textarea
              className="qvi-note-input"
              rows={3}
              placeholder="Type a note and click Add…"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleAddNote();
              }}
            />
            <div className="qvi-note-compose-footer">
              <span className="qvi-note-hint">Ctrl+Enter to add</span>
              <button
                className="qvi-add-note-btn"
                onClick={handleAddNote}
                disabled={addingNote || !noteText.trim()}
              >
                {addingNote
                  ? <><span className="spinner-border spinner-border-sm" role="status" style={{ width: 11, height: 11 }}></span>Adding…</>
                  : <><i className="bi bi-plus-lg"></i>Add Note</>
                }
              </button>
            </div>
          </div>

          <div className="qvi-notes-list">
            {notes.length === 0 ? (
              <div className="qvi-notes-empty">
                <i className="bi bi-journal-text"></i>
                <span>No notes yet</span>
              </div>
            ) : (
              notes.map((note, idx) => (
                <NoteItem
                  key={note.id ?? idx}
                  note={note}
                  idx={idx}
                  assignMap={assignMap}
                  userId={userId}
                  queryId={queryId}
                  onUpdated={handleNoteUpdated}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}