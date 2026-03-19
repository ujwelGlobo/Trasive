import { useState, useEffect, useRef } from "react";
import axiosInstance from "@/core/api/axiosInstance";
import {
  getServiceTypes,
  getassignTo,
  getQueryPriorities,
} from "@/features/query/CreateQuery/services/QueryServicePage";
import { getLeadSource } from "@/features/master/LeadSource/services/LeadService";
import "./Information.css";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const formatDateTime = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// InfoField
// ─────────────────────────────────────────────────────────────────────────────
const InfoField = ({ label, value, icon }) => (
  <div className="qvi-field">
    <div className="qvi-field-label">
      {icon && <i className={`bi bi-${icon}`}></i>}
      {label}
    </div>
    <div className="qvi-field-value">{value ?? "—"}</div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SectionCard
// ─────────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// Lookup map builder
// ─────────────────────────────────────────────────────────────────────────────
const buildMap = (result, keyField, valueFn) => {
  if (result.status !== "fulfilled") return {};
  const arr = Array.isArray(result.value)
    ? result.value
    : result.value?.data?.data ?? [];
  const map = {};
  arr.forEach((i) => (map[i[keyField]] = valueFn(i)));
  return map;
};

// ─────────────────────────────────────────────────────────────────────────────
// NoteItem — inline edit with notesupdate API
// ─────────────────────────────────────────────────────────────────────────────
function NoteItem({ note, idx, assignMap, userId, queryId, onUpdated }) {
  const [editing,  setEditing]  = useState(false);
  const [editText, setEditText] = useState(note.details);
  const [saving,   setSaving]   = useState(false);
  const [error,    setError]    = useState("");
  const textareaRef = useRef(null);

  // Focus textarea when edit mode opens
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
      const res = await axiosInstance.put(
        `/query/notesupdate`,   // FIX: removed hardcoded local IP
        {
          queryid: Number(queryId),
          details: text,
          addedBy: userId,
        }
      );
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
          /* ── Edit mode ── */
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
                <button
                  className="qvi-note-btn qvi-note-btn--ghost"
                  onClick={handleCancelEdit}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  className="qvi-note-btn qvi-note-btn--primary"
                  onClick={handleSaveEdit}
                  disabled={saving || !editText.trim()}
                >
                  {saving ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        style={{ width: 11, height: 11 }}
                      ></span>
                      Saving…
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-lg"></i>
                      Save
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ── View mode ── */
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
              <button
                className="qvi-note-edit-trigger"
                title="Edit note"
                onClick={() => setEditing(true)}
              >
                <i className="bi bi-pencil"></i>
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
export default function Informations({ query, userId, queryId, onEditClick, onRefresh }) {

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

  // Re-sync when parent refreshes
  useEffect(() => {
    setInternalNote(query?.internalnote ?? "");
    setNotes(query?.notes ?? []);
  }, [query]);

  // Load lookup maps
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

  // ── Add note ──────────────────────────────────────────────────────────────
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
        onRefresh();
      }
    } catch (err) {
      console.error("Failed to add note:", err);
    } finally {
      setAddingNote(false);
    }
  };

  // ── Update a specific note in local state after edit ──────────────────────
  const handleNoteUpdated = (updatedNote) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === updatedNote.id ? updatedNote : n))
    );
  };

  // ── Save internal note ────────────────────────────────────────────────────
  const handleSaveInternal = async () => {
    if (savingInternal) return;
    try {
      setSavingInternal(true);
      await axiosInstance.put(`/query/update/${queryId}`, {
        internalnote: internalNote,
      });
      setSavedInternal(true);
      setTimeout(() => setSavedInternal(false), 2000);
    } catch (err) {
      console.error("Failed to save internal note:", err);
    } finally {
      setSavingInternal(false);
    }
  };

  // Skeleton helper
  const lv = (mapVal, rawVal) =>
    mapsLoading ? <span className="qvi-skeleton" /> : (mapVal ?? rawVal ?? "—");

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="qvi-wrapper">

      {/* ── LEFT: Info cards ─────────────────────────────────────────────── */}
      <div className="qvi-main">

        {/* CLIENT INFORMATION */}
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
            {/* FIX: countryId/stateId are raw IDs — show as-is until you have lookup maps for them */}
            <InfoField label="Country"     icon="globe2"         value={query.countryId} />
            <InfoField label="State"       icon="map-fill"       value={query.stateId} />
            {/* FIX: use nested city.name instead of raw cityId */}
            <InfoField label="City"        icon="geo-alt-fill"   value={query.city?.name ?? query.cityId} />
          </div>
        </SectionCard>

        {/* QUERY INFORMATION */}
        <SectionCard title="Query Information" icon="clipboard2-data-fill">
          <div className="qvi-grid">
            <InfoField label="From City"    icon="send-fill"           value={query.fromCity} />
            {/* FIX: use nested destination.name instead of raw destinationId */}
            <InfoField label="Destination"  icon="geo-alt-fill"        value={query.destination?.name ?? query.destinationId} />
            <InfoField label="From Date"    icon="calendar-event-fill" value={formatDate(query.startDate)} />
            <InfoField label="To Date"      icon="calendar-check-fill" value={formatDate(query.endDate)} />
            <InfoField label="No. of Days"  icon="moon-stars-fill"     value={query.noOfDays} />
            <InfoField label="Travel Month" icon="calendar3"           value={query.travelMonth} />
            <InfoField label="Lead Source"  icon="megaphone-fill"      value={lv(leadMap[query.leadSource], query.leadSource)} />
            {/* FIX: use nested service.name as primary, fall back to lookup map */}
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

        {/* INTERNAL NOTE */}
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
            <button
              className="qvi-save-btn"
              onClick={handleSaveInternal}
              disabled={savingInternal}
            >
              {savingInternal ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    style={{ width: 12, height: 12 }}
                  ></span>
                  Saving…
                </>
              ) : (
                <>
                  <i className="bi bi-floppy-fill"></i>
                  Save Note
                </>
              )}
            </button>
          </div>
        </SectionCard>

      </div>

      {/* ── RIGHT: Notes panel ───────────────────────────────────────────── */}
      <div className="qvi-notes-panel">

        {/* Panel header */}
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

        {/* Compose area */}
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
              {addingNote ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    style={{ width: 11, height: 11 }}
                  ></span>
                  Adding…
                </>
              ) : (
                <>
                  <i className="bi bi-plus-lg"></i>
                  Add Note
                </>
              )}
            </button>
          </div>
        </div>

        {/* Notes list */}
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
  );
}