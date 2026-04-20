import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/core/auth/AuthProvider";
import { createClient, updateClient } from "../services/clientService";
import { getCountries } from "../../master/Country/services/CountryServices";
import {getStates} from "../../master/State/services/StateService"
import { getLeadSource } from "../../master/LeadSource/services/LeadService";       
import { getDestinations } from "../../master/Destination/services/DestinationService";
import Select from "react-select";
import "./Client.css";

const USER_TYPE_MAP = {
  Client: 4,
  Agent: 5,
};

const formatDate = (date) => {
  if (!date) return "";
  if (date.includes("-") && date.split("-")[0].length === 4) return date;
  const parts = date.split("-");
  if (parts.length === 3) {
    const [day, month, year] = parts;
    return `${year}-${month}-${day}`;
  }
  return "";
};

const buildInitialForm = (data = null) => ({
  title: data?.title || "Mr",

  firstName:
    data?.firstName ||
    data?.name?.split(" ")[0] ||
    "",

  lastName:
    data?.lastName ||
    data?.name?.split(" ").slice(1).join(" ") ||
    "",

  email: data?.email || "",
  mobile: data?.mobile || data?.phone || "",
  address: data?.address || "",

  // Location
  countryId: data?.country || "",             // integer → sent to API
  stateId: data?.state || data?.stateId || "", // integer → sent to API
  city: data?.city || "",                     // integer city ID → sent to API
  cityName: data?.cityName || "",             // display only

  userType:
    data?.userType === 5 || data?.designation === "Agent"
      ? "Agent"
      : "Client",

  sourceId: data?.source || "",               // integer → sent to API

  dob: formatDate(data?.dob),
  marriageAnniversary: formatDate(data?.marriageAnniversary),

  // Agent fields
  companyname: data?.companyname || "",
  companyemail: data?.companyemail || "",
  companyphone: data?.companyphone || "",
  companyaddress: data?.companyaddress || "",
  gst: data?.gst || "",

  password: "",

  status:
    data?.status === 0 || data?.status === "Inactive" ? 0 : 1,
});

export default function ClientModal({ onClose, onSave, initialData = null }) {
  const { user } = useAuth();
  const isEdit = !!initialData;

  const [form, setForm] = useState(() => buildInitialForm(initialData));

  // Dropdown data
  const [countries, setCountries] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);
  const [leadSources, setLeadSources] = useState([]);
  const [allDestinations, setAllDestinations] = useState([]);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const countryOptions = countries.map((c) => ({
  value: c.id,
  label: c.name,
}));

const stateOptions = filteredStates.map((s) => ({
  value: s.id,
  label: s.name,
}));

  // Re-sync when initialData changes
  useEffect(() => {
    if (!initialData) return;
    setForm(buildInitialForm(initialData));
  }, [initialData]);

  // Load all dropdown data in parallel on mount
  useEffect(() => {
    const userId = user?.id ?? user?.user_id;

    const fetchAll = async () => {
      try {
        const [countriesRes, statesRes, sourcesRes, destsRes] =
          await Promise.all([
            getCountries(),
            getStates(),
            getLeadSource(userId),
            getDestinations(userId),
          ]);

        setCountries(countriesRes?.data ?? []);
        setAllStates(statesRes?.data ?? []);
        setLeadSources(sourcesRes?.data ?? []);
        setAllDestinations(destsRes?.data ?? destsRes ?? []);
      } catch (err) {
        console.error("Failed to load dropdown data:", err);
      }
    };

    fetchAll();
  }, [user]);

  // Filter states by selected country
  useEffect(() => {
    if (!form.countryId) {
      setFilteredStates([]);
      return;
    }
    const filtered = allStates.filter(
      (s) => String(s.countryId) === String(form.countryId)
    );
    setFilteredStates(filtered);
  }, [form.countryId, allStates]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsed = name === "status" ? Number(value) : value;

    // Reset stateId when country changes
    if (name === "countryId") {
      setForm((prev) => ({ ...prev, countryId: value, stateId: "" }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: parsed }));
  };

  // City typeahead
  const handleCitySearch = (value) => {
    setForm((prev) => ({ ...prev, cityName: value, city: "" }));
    if (value.length < 2) {
      setCitySuggestions([]);
      return;
    }
    const filtered = allDestinations.filter((d) =>
      d.name.toLowerCase().includes(value.toLowerCase())
    );
    setCitySuggestions(filtered.slice(0, 8));
  };

  const handleCitySelect = (item) => {
    setForm((prev) => ({
      ...prev,
      city: item.id,
      cityName: item.name,
    }));
    setCitySuggestions([]);
  };

  // ─── Payload builder ──────────────────────────────────────────────────────
  const buildPayload = () => {
    const userType = USER_TYPE_MAP[form.userType];

    const base = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.mobile,
      password: form.password || "default123",
      address: form.address,
      country: Number(form.countryId),  // ✅ dynamic
      state: Number(form.stateId),      // ✅ dynamic
      city: form.city,                  // ✅ integer from city search
      userType,
      status: form.status,
      source: Number(form.sourceId),    // ✅ dynamic
    };

    if (form.userType === "Client") {
      return {
        ...base,
        ...(form.dob && { dob: form.dob }),
        ...(form.marriageAnniversary && {
          marriageAnniversary: form.marriageAnniversary,
        }),
      };
    }

    // Agent
    return {
      ...base,
      companyname: form.companyname,
      companyemail: form.companyemail,
      companyphone: form.companyphone,
      companyaddress: form.companyaddress,
      gst: form.gst,
    };
  };

  // ─── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!form.firstName || !form.lastName || !form.email || !form.mobile) {
      alert("Please fill in all required fields");
      return;
    }
    if (!form.countryId) {
      alert("Please select a country");
      return;
    }
    if (!form.stateId) {
      alert("Please select a state");
      return;
    }
    if (!isEdit && !form.city) {
      alert("Please select a city from the dropdown");
      return;
    }
    if (!form.sourceId) {
      alert("Please select a lead source");
      return;
    }
    if (form.userType === "Agent" && !form.companyname) {
      alert("Please fill in the company name");
      return;
    }

    try {
      setLoading(true);
      const userId = user?.id ?? user?.user_id;
      const payload = buildPayload();

      if (isEdit) {
        await updateClient(userId, initialData.id, payload);
      } else {
        await createClient(userId, payload);
      }

      onSave();
      onClose();
    } catch (err) {
      console.error(err);
      const message = err?.response?.data?.message || "";
      if (message.toLowerCase().includes("companyemail")) {
        alert("Company email already exists.");
      } else if (message.toLowerCase().includes("email")) {
        alert("Email already exists.");
      } else {
        alert(
          `Failed to ${isEdit ? "update" : "create"} client. Please try again.`
        );
      }
    } finally {
      setLoading(false);
    }
  };
useEffect(() => {
  if (!initialData || countries.length === 0 || allStates.length === 0) return;

  const selectedCountry = countries.find(
    (c) => c.name === initialData.country
  );

  const selectedState = allStates.find(
    (s) =>
      s.name === initialData.state &&
      String(s.countryId) === String(selectedCountry?.id)
  );

  setForm((prev) => ({
    ...prev,
    countryId: selectedCountry?.id || "",
    stateId: selectedState?.id || "",
    cityName: initialData.city || "",
  }));
}, [initialData, countries, allStates]);
  return (
    <>
      <div className="crmClient-overlay" onClick={onClose}></div>

      <div className="crmClient-modal">
        <div className="crmClient-header">
          <h3>{isEdit ? "Edit Client" : "Add Client"}</h3>
          <button className="crmClient-closeBtn" onClick={onClose}>
            <X size={18} color="#fff" />
          </button>
        </div>

        <div className="crmClient-body">

          {/* User Type — locked in edit mode */}
          <div className="crmClient-field">
            <label>User Type</label>
            <select
              name="userType"
              value={form.userType}
              onChange={handleChange}
              disabled={isEdit}
            >
              <option>Client</option>
              <option>Agent</option>
            </select>
          </div>

          {/* Title */}
          <div className="crmClient-field">
            <label>Title</label>
            <select name="title" value={form.title} onChange={handleChange}>
              <option value="Mr">Mr</option>
              <option value="Ms">Ms</option>
              <option value="Mrs">Mrs</option>
            </select>
          </div>

          {/* Name */}
          <div className="crmClient-row">
            <input
              name="firstName"
              placeholder="First Name *"
              value={form.firstName}
              onChange={handleChange}
            />
            <input
              name="lastName"
              placeholder="Last Name *"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>

          <input
            name="email"
            placeholder="Email *"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="mobile"
            placeholder="Mobile *"
            value={form.mobile}
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
          />

          {/* Country */}
          <div className="crmClient-field">
            <label>Country *</label>
           <Select
  options={countryOptions}
  value={countryOptions.find(opt => opt.value === form.countryId)}
  onChange={(selected) => {
    setForm((prev) => ({
      ...prev,
      countryId: selected?.value || "",
      stateId: "", // reset state
    }));
  }}
  placeholder="Search Country..."
/>
          </div>

          {/* State — filtered by selected country */}
          <div className="crmClient-field">
            <label>State *</label>
           <Select
  options={stateOptions}
  value={stateOptions.find(opt => opt.value === form.stateId)}
  onChange={(selected) => {
    setForm((prev) => ({
      ...prev,
      stateId: selected?.value || "",
    }));
  }}
  placeholder={
    form.countryId ? "Search State..." : "Select country first"
  }
  isDisabled={!form.countryId}
/>
          </div>

          {/* City Search */}
          <div className="crmClient-field crmClient-cityWrap">
            <label>City {!isEdit && "*"}</label>
            <input
              placeholder={isEdit ? "Re-select city (optional)" : "Search City *"}
              value={form.cityName}
              onChange={(e) => handleCitySearch(e.target.value)}
            />
            {citySuggestions.length > 0 && (
              <div className="crmClient-cityDropdown">
                {citySuggestions.map((item) => (
                  <div
                    key={item.id}
                    className="crmClient-cityItem"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleCitySelect(item);
                    }}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Lead Source */}
          <div className="crmClient-field">
            <label>Lead Source *</label>
            <select
              name="sourceId"
              value={form.sourceId}
              onChange={handleChange}
            >
              <option value="">Select Source</option>
              {leadSources
                .filter((s) => s.status === 1)
                .map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Status */}
          <div className="crmClient-field">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>

          {/* Client-only fields */}
          {form.userType === "Client" && (
            <>
              <div className="crmClient-field">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                />
              </div>
              <div className="crmClient-field">
                <label>Marriage Anniversary</label>
                <input
                  type="date"
                  name="marriageAnniversary"
                  value={form.marriageAnniversary}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {/* Agent-only fields */}
          {form.userType === "Agent" && (
            <>
              <hr />
              <input
                name="companyname"
                placeholder="Company Name *"
                value={form.companyname}
                onChange={handleChange}
              />
              <input
                name="companyemail"
                placeholder="Company Email"
                value={form.companyemail}
                onChange={handleChange}
              />
              <input
                name="companyphone"
                placeholder="Company Phone"
                value={form.companyphone}
                onChange={handleChange}
              />
              <textarea
                name="companyaddress"
                placeholder="Company Address"
                value={form.companyaddress}
                onChange={handleChange}
              />
              <input
                name="gst"
                placeholder="GST Number"
                value={form.gst}
                onChange={handleChange}
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
              />
            </>
          )}
        </div>

        <div className="crmClient-footer">
          <button className="crmClient-cancelBtn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="crmClient-saveBtn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? isEdit
                ? "Updating..."
                : "Saving..."
              : isEdit
              ? "Update Client"
              : "Save Client"}
          </button>
        </div>
      </div>
    </>
  );
}