import { X, MapPin, User, FileText, Calendar, Hash } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/core/auth/AuthProvider";
import { createItinerary, updateItinerary } from "../services/ItineraryService";
import "./Itinerary.css";
import Select from "react-select";

const DEFAULT_FORM = {
  name: "",
  startDate: new Date().toISOString().split("T")[0],
  endDate: new Date().toISOString().split("T")[0],
  noOfDays: "",
  adult: 1,
  child: 0,
  destinations: [],
  notes: "",
};

export default function ItineraryModal({ isOpen, onClose, initialData, onSave, destinationsList = [] }) {
  const { user } = useAuth();
  const userId = user?.id ?? user?.user_id;

  const [form, setForm] = useState(DEFAULT_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setForm({
        name:         initialData.name || "",
        startDate:    initialData.startDate || new Date().toISOString().split("T")[0],
        endDate:      initialData.endDate || new Date().toISOString().split("T")[0],
        noOfDays:     initialData.noOfDays || "",
        adult:        initialData.adult ?? 1,
        child:        initialData.child ?? 0,
        destinations: Array.isArray(initialData.destinations) ? initialData.destinations : [],
        notes:        initialData.notes || "",
      });
    } else {
      setForm(DEFAULT_FORM);
    }
    setError("");
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === "startDate" || name === "endDate") {
        const start = new Date(name === "startDate" ? value : prev.startDate);
        const end   = new Date(name === "endDate"   ? value : prev.endDate);
        if (end >= start) {
          updated.noOfDays = Math.round((end - start) / (1000 * 60 * 60 * 24));
        }
      }

      if (name === "noOfDays" && prev.startDate) {
        const start = new Date(prev.startDate);
        start.setDate(start.getDate() + Number(value));
        updated.endDate = start.toISOString().split("T")[0];
      }

      return updated;
    });
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) { setError("Itinerary name is required."); return; }
    if (!form.noOfDays)    { setError("Number of days is required.");  return; }

    setError("");
    setLoading(true);

    try {
      const payload = {
        name:         form.name,
        queryid:      0,
        startDate:    form.startDate,
        endDate:      form.endDate,
        adult:        Number(form.adult),
        child:        Number(form.child),
        noOfDays:     Number(form.noOfDays),
        notes:        form.notes,
        destinations: form.destinations,
      };

      let data;
      if (initialData?.id) {
        data = await updateItinerary(initialData.id, payload);
      } else {
        data = await createItinerary(payload);
      }

      if (data.status === false) {
        throw new Error(data.message || "Something went wrong.");
      }

      onSave?.(data);
      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen && <div className="its-overlay" onClick={onClose} />}

      <div className={`its-drawer ${isOpen ? "its-drawer--open" : ""}`}>

        {/* Header */}
        <div className="its-header">
          <div>
            <h2>{initialData ? "Edit Itinerary" : "Itinerary Setup"}</h2>
            <p>Fill in the trip details below</p>
          </div>
          <button className="its-close-btn" onClick={onClose}><X size={18} /></button>
        </div>

        {/* Body */}
        <div className="its-body">

          {error && <div className="its-error">{error}</div>}

          <div className="its-group">
            <label><FileText size={13} /> Itinerary Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Hyderabad Ladies Only Trip"
            />
          </div>

          <div className="its-row">
            <div className="its-group">
              <label><Calendar size={13} /> Start Date</label>
              <input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
            </div>
            <div className="its-group">
              <label><Calendar size={13} /> End Date</label>
              <input type="date" name="endDate" value={form.endDate} onChange={handleChange} />
            </div>
          </div>

          <div className="its-group">
            <label><Hash size={13} /> No. of Days *</label>
            <input
              type="number"
              name="noOfDays"
              value={form.noOfDays}
              onChange={handleChange}
              placeholder="No. of Days"
              min="1"
            />
          </div>

          <div className="its-row">
            <div className="its-group">
              <label><User size={13} /> Adult</label>
              <input type="number" name="adult" value={form.adult} onChange={handleChange} placeholder="1" min="0" />
            </div>
            <div className="its-group">
              <label><User size={13} /> Child</label>
              <input type="number" name="child" value={form.child} onChange={handleChange} placeholder="0" min="0" />
            </div>
          </div>

          <div className="its-group">
            <label><MapPin size={13} /> Destinations</label>
            <Select
              isMulti
              options={destinationsList.map(d => ({
                value: d.id,
                label: d.name
              }))}
              value={destinationsList
                .filter(d => form.destinations.includes(Number(d.id)))
                .map(d => ({
                  value: d.id,
                  label: d.name
                }))
              }
              onChange={(selected) =>
                setForm(prev => ({
                  ...prev,
                  destinations: selected ? selected.map(s => s.value) : []
                }))
              }
              placeholder="Select destinations..."
            />
          </div>

          <div className="its-group">
            <label><FileText size={13} /> Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={4}
              placeholder="Notes will not appear in your itinerary; they can only be viewed by you, your team and any contributors you invite"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="its-footer">
          <button className="its-cancel" onClick={onClose} disabled={loading}>Cancel</button>
          <button className="its-save" onClick={handleSubmit} disabled={loading}>
            {loading ? <span className="its-spinner" /> : (initialData ? "Update Itinerary" : "Save Itinerary")}
          </button>
        </div>

      </div>
    </>
  );
}