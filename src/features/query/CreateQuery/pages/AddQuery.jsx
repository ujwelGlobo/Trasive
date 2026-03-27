import { X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/core/auth/AuthProvider";
import { getServiceTypes, getMealPlans, getassignTo, createQuery, updateQuery, searchByPhone,} from "@/features/query/CreateQuery/services/QueryServicePage";
import { getLeadSource } from "@/features/master/LeadSource/services/LeadService";
import { getDestinations } from "@/features/master/Destination/services/DestinationService";
import "./AddQuery.css";

const INITIAL_FORM = {
  phone: "",
  email: "",
  name: "",
  submitName: "Mr",
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
  priorityStatus: 1,
  assignTo: "",
  serviceId: "",
  details: "",
  countryId: 1,
  cityId: 1,
};

const extractArray = (val) => {
  if (Array.isArray(val)) return val;
  const d = val?.data?.data ?? val?.data ?? val;
  return Array.isArray(d) ? d : [];
};

const toDateInput = (val) => (val ? String(val).split("T")[0] : "");

export default function AddQuery({ open, onClose, queryData = null }) {
  const { user } = useAuth();
  const phoneSearchTimer = useRef(null);

  const isEditMode = Boolean(queryData?.id);

  const [services, setServices] = useState([]);
  const [mealPlans, setMealPlans] = useState([]);
  const [leadSources, setLeadSources] = useState([]);
  const [assignTo, setAssignTo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [phoneSuggestions, setPhoneSuggestions] = useState([]);
  const [destinations, setDestinations] = useState([]);

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
        const [serviceRes, mealRes, leadRes, assignToRes, destinationRes] = await Promise.allSettled([
          getServiceTypes(userId),
          getMealPlans(userId),
          getLeadSource(userId),
          getassignTo(userId),
          getDestinations(userId),
        ]);

        if (serviceRes.status === "fulfilled") setServices(extractArray(serviceRes.value));
        if (mealRes.status === "fulfilled") setMealPlans(extractArray(mealRes.value));
        if (leadRes.status === "fulfilled") setLeadSources(extractArray(leadRes.value));
        if (assignToRes.status === "fulfilled") setAssignTo(extractArray(assignToRes.value));
        if (destinationRes.status === "fulfilled") setDestinations(extractArray(destinationRes.value));
      } catch (error) {
        console.error("Failed to load dropdowns:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDropdowns();
  }, [open, user]);

  /* RESET FORM ON CLOSE / PRE-FILL ON EDIT */
  useEffect(() => {
    if (!open) {
      setFormData(INITIAL_FORM);
      setPhoneSuggestions([]);
    } else if (queryData) {
      setFormData({
        ...INITIAL_FORM,
        phone: queryData.phone ?? "",
  email: queryData.email ?? "",
  name: queryData.name ?? "",
  submitName: queryData.submitName ?? "Mr",

  destinationId: String(queryData.destinationId ?? ""),

  startDate: toDateInput(queryData.startDate),
  endDate: toDateInput(queryData.endDate),

  noOfDays: queryData.noOfDays ?? "",

  adult: queryData.adult ?? 0,
  child: queryData.child ?? 0,
  infant: queryData.infant ?? 0,

  // 🔥 CORRECT MAPPING
  singleRoom: queryData.single ?? 0,
  doubleRoom: queryData.d2 ?? 0,
  extraBed: queryData.extrabed ?? 0,

  cwb: queryData.cwb ?? 0,
  cnb: queryData.cnb ?? 0,

  mealPlan: queryData.mealPlan ?? "",
  leadSource: queryData.leadSource ?? "",
  priorityStatus: queryData.priorityStatus ?? 1,
  assignTo: queryData.assignTo ?? "",
  serviceId: queryData.serviceId ?? "",
  details: queryData.details ?? "",

  countryId: queryData.countryId ?? 1,
  cityId: queryData.cityId ?? 1,
      });
    }
  }, [open, queryData]);

  if (!open) return null;

  /* HANDLE INPUT CHANGE + PHONE SEARCH */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "phone") {
      clearTimeout(phoneSearchTimer.current);
      if (value.length >= 2) {
        phoneSearchTimer.current = setTimeout(async () => {
          try {
            const result = await searchByPhone(value);
            const list = Array.isArray(result) ? result : result ? [result] : [];
            setPhoneSuggestions(list);
          } catch (err) {
            console.error("Phone search failed:", err);
            setPhoneSuggestions([]);
          }
        }, 500);
      } else {
        setPhoneSuggestions([]);
      }
    }
  };

  /* SELECT A SUGGESTION */
  const handleSelectSuggestion = (client) => {
    setFormData((prev) => ({
      ...prev,
      phone: client.phone || prev.phone,
      name: `${client.firstName || ""} ${client.lastName || ""}`.trim(),
      email: client.email || prev.email,
      submitName: client.submitName || prev.submitName,
    }));
    setPhoneSuggestions([]);
  };

  /* DATE HANDLERS */
  const handleStartDateChange = (e) => {
    const startDate = e.target.value;
    setFormData((prev) => {
      const updated = { ...prev, startDate };
      if (startDate && Number(prev.noOfDays) > 0) {
        const start = new Date(startDate);
        start.setDate(start.getDate() + (parseInt(prev.noOfDays) - 1));
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
        start.setDate(start.getDate() + (days - 1));
        updated.endDate = start.toISOString().split("T")[0];
      }
      return updated;
    });
  };

  /* SUBMIT */
  const handleSubmit = async () => {
    try {
      if (!formData.phone) { alert("Please enter a phone number"); return; }
      if (!formData.name)  { alert("Please enter client name"); return; }
      if (!formData.priorityStatus) { alert("Please select priority"); return; }

      setSubmitting(true);

      const userId = user?.id ?? user?.user_id;

      const payload = {
        userType:       2,
        user_id:        userId,
        name:           formData.name,
        email:          formData.email,
        phone:          formData.phone,
        submitName:     formData.submitName,
        countryId:      Number(formData.countryId)    || 1,
        cityId:         Number(formData.cityId)        || 1,
        destinationId:  formData.destinationId ? Number(formData.destinationId) : undefined,
        leadSource:     formData.leadSource    ? Number(formData.leadSource)    : undefined,
        serviceId:      formData.serviceId     ? Number(formData.serviceId)     : undefined,
        priorityStatus: Number(formData.priorityStatus),
        assignTo:       formData.assignTo      ? Number(formData.assignTo)      : userId,
        noOfDays:       Number(formData.noOfDays)  || 0,
        adult:          Number(formData.adult)     || 0,
        child:          Number(formData.child)     || 0,
        infant:         Number(formData.infant)    || 0,
        singleRoom:     Number(formData.singleRoom)|| 0,
        doubleRoom:     Number(formData.doubleRoom)|| 0,
        extraBed:       Number(formData.extraBed)  || 0,
        cwb:            Number(formData.cwb)       || 0,
        cnb:            Number(formData.cnb)       || 0,
        mealPlan:       formData.mealPlan   || undefined,  // ✅ sent as string e.g. "MAP"
        startDate:      formData.startDate  || undefined,
        endDate:        formData.endDate    || undefined,
        details:        formData.details    || "",
      };

      console.log("Payload:", payload);

      await (isEditMode
        ? updateQuery(userId, queryData.id, payload)
        : createQuery(userId, payload));

      // If no exception thrown, request succeeded (Axios resolves all 2xx including 201)
      alert(isEditMode ? "Query updated successfully" : "Query created successfully");
      onClose();

    } catch (error) {
      console.error("Submit error:", error);
      alert(error?.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />

      <div className="query-drawer">
        <div className="drawer-header">
          <h5>{isEditMode ? "Edit Query" : "Create Query"}</h5>
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

                  {/* PHONE WITH SUGGESTIONS */}
                  <div className="field" style={{ position: "relative" }}>
                    <label>Mobile</label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone / Mobile"
                      autoComplete="off"
                    />
                    {phoneSuggestions.length > 0 && (
                      <ul style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        background: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                        zIndex: 9999,
                        margin: "2px 0 0 0",
                        padding: 0,
                        listStyle: "none",
                        maxHeight: "200px",
                        overflowY: "auto",
                      }}>
                        {phoneSuggestions.map((client, idx) => (
                          <li
                            key={`suggestion-${idx}`}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              handleSelectSuggestion(client);
                            }}
                            style={{
                              padding: "10px 12px",
                              cursor: "pointer",
                              borderBottom: "1px solid #f0f0f0",
                              fontSize: "13px",
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = "#f5f5f5"}
                            onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                          >
                            <strong>{client.phone}</strong>
                            {` — ${client.firstName || ""} ${client.lastName || ""}`.trim()}
                            {client.email ? ` (${client.email})` : ""}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="field">
                    <label>Email</label>
                    <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                  </div>

                  <div className="submit-name-field">
                    <label className="submit-name-label">Submit Name</label>
                    <select
                      name="submitName"
                      value={formData.submitName}
                      onChange={handleChange}
                      className="submit-name-select"
                    >
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Miss">Miss</option>
                    </select>
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
                    <select name="destinationId" value={formData.destinationId} onChange={handleChange}>
                      <option value="">Select Destination</option>
                      {destinations.map((item, index) => (
                        <option key={`dest-${item.id ?? index}`} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label>From Date</label>
                    <input style={{ width: "140px" }} type="date" name="startDate" value={formData.startDate} onChange={handleStartDateChange} />
                  </div>
                  <div className="field">
                    <label>No Of Days</label>
                    <input type="number" name="noOfDays" value={formData.noOfDays} onChange={handleDaysChange} min={0} />
                  </div>
                  <div className="field">
                    <label>To Date</label>
                    <input style={{ width: "140px" }} type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
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
                      {mealPlans.map((item, index) => (
                        <option key={`meal-${item.id ?? index}`} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="field">
                    <label>Service</label>
                    <select name="serviceId" value={formData.serviceId} onChange={handleChange}>
                      <option value="">Select Service</option>
                      {services.map((item, index) => (
                        <option key={`service-${item.id ?? index}`} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="field">
                    <label>Lead Source</label>
                    <select name="leadSource" value={formData.leadSource} onChange={handleChange}>
                      <option value="">Select Lead Source</option>
                      {leadSources.map((item, index) => (
                        <option key={`lead-${item.id ?? index}`} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="field">
                    <label>Priority</label>
                    <select
                      name="priorityStatus"
                      value={formData.priorityStatus}
                      onChange={handleChange}
                      className="priority-select"
                    >
                      <option value={1}>General Query</option>
                      <option value={2}>Hot Query</option>
                    </select>
                  </div>

                  <div className="field">
                    <label>Assign To</label>
                    <select name="assignTo" value={formData.assignTo} onChange={handleChange}>
                      <option value="">Select Assignee</option>
                      {assignTo.map((item, index) => (
                        <option key={`user-${item.user_id ?? index}`} value={item.user_id}>
                          {item.firstName} {item.lastName}
                        </option>
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
            {submitting
              ? isEditMode ? "Updating..." : "Saving..."
              : isEditMode ? "Update Query" : "Save Query"}
          </button>
        </div>
      </div>
    </>
  );
}