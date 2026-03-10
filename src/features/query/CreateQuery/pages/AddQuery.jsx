import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/core/auth/AuthProvider";
import { getServiceTypes, getMealPlans, getLeadSources, getQueryPriorities, createQuery } from "@/features/query/CreateQuery/services/QueryServicePage";
import "./AddQuery.css";

const INITIAL_FORM = {
  phone: "",
  email: "",
  name: "",
  mr: "",
  destinationId: "",
  startDate: "",
  endDate: "",
  noOfDays: "",
  adult: 0,
  child: 0,
  infant: 0,
  singleRoom: 0,
  doubleRoom: 0,
  extraBed: 0,
  cwb: 0,
  cnb: 0,
  mealPlan: "",
  leadSource: "",
  priorityStatus: "",
  serviceId: "",
  details: "",
};

const extractArray = (val) => {
  if (Array.isArray(val)) return val;
  const d = val?.data?.data ?? val?.data ?? val;
  return Array.isArray(d) ? d : [];
};

export default function AddQuery({ open, onClose }) {
  const { user } = useAuth();

  const [services, setServices] = useState([]);
  const [mealPlans, setMealPlans] = useState([]);
  const [leadSources, setLeadSources] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  /* LOCK BODY SCROLL */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [open]);

  /* LOAD DROPDOWNS */
  useEffect(() => {
    if (!open) return;

    const userId = user?.id ?? user?.user_id;
    if (!userId) return;

    const loadDropdowns = async () => {
      setLoading(true);
      try {
        const [serviceRes, mealRes, leadRes, priorityRes] = await Promise.allSettled([
          getServiceTypes(userId),
          getMealPlans(userId),
          getLeadSources(userId),
          getQueryPriorities(),
        ]);

        if (serviceRes.status === "fulfilled") setServices(extractArray(serviceRes.value));
        if (mealRes.status === "fulfilled") setMealPlans(extractArray(mealRes.value));
        if (leadRes.status === "fulfilled") setLeadSources(extractArray(leadRes.value));
        if (priorityRes.status === "fulfilled") setPriorities(extractArray(priorityRes.value));
      } catch (error) {
        console.error("Failed to load dropdowns:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDropdowns();
  }, [open, user]);

  /* RESET FORM ON CLOSE */
  useEffect(() => {
    if (!open) setFormData(INITIAL_FORM);
  }, [open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStartDateChange = (e) => {
    const startDate = e.target.value;
    setFormData((prev) => {
      const updated = { ...prev, startDate };
      if (startDate && Number(prev.noOfDays) > 0) {
        const start = new Date(startDate);
        start.setDate(start.getDate() + parseInt(prev.noOfDays));
        updated.endDate = start.toISOString().split("T")[0];
      }
      return updated;
    });
  };

  const handleDaysChange = (e) => {
    const days = parseInt(e.target.value) || 0;
    setFormData((prev) => {
      const updated = { ...prev, noOfDays: days };
      if (prev.startDate && days > 0) {
        const start = new Date(prev.startDate);
        start.setDate(start.getDate() + days);
        updated.endDate = start.toISOString().split("T")[0];
      }
      return updated;
    });
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const userId = user?.id ?? user?.user_id;
      const payload = {
        ...formData,
        userType: 2,
        user_id: userId,
        adult: Number(formData.adult),
        child: Number(formData.child),
        infant: Number(formData.infant),
        singleRoom: Number(formData.singleRoom),
        doubleRoom: Number(formData.doubleRoom),
        extraBed: Number(formData.extraBed),
        cwb: Number(formData.cwb),
        cnb: Number(formData.cnb),
        noOfDays: Number(formData.noOfDays),
        leadSource: Number(formData.leadSource),
        serviceId: Number(formData.serviceId),
        destinationId: Number(formData.destinationId),
        priorityStatus: Number(formData.priorityStatus),
      };

      const res = await createQuery(userId, payload);
      if (res?.status) {
        alert("Query created successfully");
        onClose();
      } else {
        alert(res?.message || "Failed to create query");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert(error?.response?.data?.message || "Failed to create query");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />

      <div className="query-drawer">
        <div className="drawer-header">
          <h5>Create Query</h5>
          <button className="close-btn-createquery" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="drawer-body">
          {loading ? (
            <div className="drawer-loading">Loading dropdowns...</div>
          ) : (
            <>
              {/* CLIENT INFO */}
              <div className="form-section">
                <span className="section-title">Client Info</span>
                <div className="form-grid">
                  <div className="field">
                    <label>Mobile</label>
                    <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone / Mobile" />
                  </div>
                  <div className="field">
                    <label>Email</label>
                    <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                  </div>
                  <div className="field">
                    <label>MR</label>
                    <input name="mr" value={formData.mr} onChange={handleChange} />
                  </div>
                  <div className="field">
                    <label>Client Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} />
                  </div>
                </div>
              </div>

              {/* TRAVEL DETAILS */}
              <div className="form-section">
                <span className="section-title">Travel Details</span>
                <div className="form-grid">
                  <div className="field full">
                    <label>Destination</label>
                    <input name="destinationId" value={formData.destinationId} onChange={handleChange} placeholder="Destination" />
                  </div>
                  <div className="field">
                    <label>From Date</label>
                    <input type="date" name="startDate" value={formData.startDate} onChange={handleStartDateChange} />
                  </div>
                  <div className="field">
                    <label>No Of Days</label>
                    <input type="number" name="noOfDays" value={formData.noOfDays} onChange={handleDaysChange} min={0} />
                  </div>
                  <div className="field">
                    <label>To Date</label>
                    <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
                  </div>
                </div>
              </div>

              {/* PAX DETAILS */}
              <div className="form-section">
                <span className="section-title">Pax Details</span>
                <div className="form-grid">
                  <div className="field">
                    <label>Adult</label>
                    <input type="number" name="adult" value={formData.adult} onChange={handleChange} min={0} />
                  </div>
                  <div className="field">
                    <label>Child</label>
                    <input type="number" name="child" value={formData.child} onChange={handleChange} min={0} />
                  </div>
                  <div className="field">
                    <label>Infant</label>
                    <input type="number" name="infant" value={formData.infant} onChange={handleChange} min={0} />
                  </div>
                </div>
              </div>

              {/* ROOM DETAILS */}
              <div className="form-section">
                <span className="section-title">Room Details</span>
                <div className="form-grid">
                  <div className="field">
                    <label>Single Room</label>
                    <input type="number" name="singleRoom" value={formData.singleRoom} onChange={handleChange} min={0} />
                  </div>
                  <div className="field">
                    <label>Double Room</label>
                    <input type="number" name="doubleRoom" value={formData.doubleRoom} onChange={handleChange} min={0} />
                  </div>
                  <div className="field">
                    <label>Extra Bed</label>
                    <input type="number" name="extraBed" value={formData.extraBed} onChange={handleChange} min={0} />
                  </div>
                  <div className="field">
                    <label>CWB</label>
                    <input type="number" name="cwb" value={formData.cwb} onChange={handleChange} min={0} />
                  </div>
                  <div className="field">
                    <label>CNB</label>
                    <input type="number" name="cnb" value={formData.cnb} onChange={handleChange} min={0} />
                  </div>
                </div>
              </div>

              {/* OTHER DETAILS */}
              <div className="form-section">
                <span className="section-title">Other Details</span>
                <div className="form-grid">
                  <div className="field">
                    <label>Meal Plan</label>
                    <select name="mealPlan" value={formData.mealPlan} onChange={handleChange}>
                      <option value="">Select Meal Plan</option>
                      {mealPlans.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="field">
                    <label>Service</label>
                    <select name="serviceId" value={formData.serviceId} onChange={handleChange}>
                      <option value="">Select Service</option>
                      {services.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="field">
                    <label>Lead Source</label>
                    <select name="leadSource" value={formData.leadSource} onChange={handleChange}>
                      <option value="">Select Lead Source</option>
                      {leadSources.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="field">
                    <label>Priority Status</label>
                    <select name="priorityStatus" value={formData.priorityStatus} onChange={handleChange}>
                      <option value="">Select Priority</option>
                      {priorities.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* DETAILS */}
              <div className="field">
                <label>Details</label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  placeholder="Additional details..."
                  rows={3}
                />
              </div>
            </>
          )}
        </div>

        <div className="drawer-footer">
          <button className="btn-cancel" onClick={onClose} disabled={submitting}>Cancel</button>
          <button className="btn-save" onClick={handleSubmit} disabled={submitting || loading}>
            {submitting ? "Saving..." : "Save Query"}
          </button>
        </div>
      </div>
    </>
  );
}
