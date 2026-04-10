import { X } from "lucide-react";
import { useState, useEffect,useRef } from "react";
import { useAuth } from "@/core/auth/AuthProvider";
import { createSupplier, updateSupplier, getServiceTypes ,searchCities} from "../services/SupplierService";
import "./SupplierList.css";

const DEFAULT_FORM = {
  city: "",
  company: "",
  serviceType: "",
  submitName: "Mr",
  firstName: "",
  lastName: "",
  email: "",
  countryCode: "+91",
  phone: "",
  address: "",
};

export default function AddSupplierModal({ data, onClose }) {
  const { user } = useAuth();
  const userId = user?.id ?? user?.user_id;
const citySearchTimer = useRef(null);
  const [form, setForm] = useState(DEFAULT_FORM);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [citySuggestions, setCitySuggestions] = useState([]);
const [showDropdown, setShowDropdown] = useState(false);

  // Fetch dynamic service types
  useEffect(() => {
    if (!userId) return;
    const load = async () => {
      try {
        const res = await getServiceTypes(userId);
        setServiceTypes(res.data);
      } catch (err) {
        console.error("Failed to fetch service types:", err);
      }
    };
    load();
  }, [userId]);

  // Populate form on edit
  useEffect(() => {
    if (data) {
      setForm({
        ...DEFAULT_FORM,
        ...data,
        countryCode: data.countryCode
          ? data.countryCode.startsWith("+")
            ? data.countryCode
            : `+${data.countryCode}`
          : "+91",
        serviceType: data.serviceType
          ? Array.isArray(data.serviceType)
            ? data.serviceType[0]
            : data.serviceType
          : "",
      });
    }
  }, [data]);

const handleCitySearch = async (value) => {
  setForm((prev) => ({ ...prev, city: value }));

  if (value.length < 2) {
    setCitySuggestions([]);
    return;
  }

  try {
    const query =
      value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

    console.log("Calling API with:", query);

    const res = await searchCities(query);

    console.log("FULL RESPONSE:", res);

    if (res.status) {
      setCitySuggestions(res.data);
    } else {
      setCitySuggestions([]);
    }
  } catch (err) {
    console.error(err);
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceSelect = (name) => {
    setForm((prev) => ({ ...prev, serviceType: name }));
  };

  const handleSubmit = async () => {
    if (!form.company.trim()) return setError("Company name is required.");
    if (!form.firstName.trim()) return setError("First name is required.");
    if (!form.email.trim()) return setError("Email is required.");

    setError("");
    setLoading(true);

    try {
      const payload = {
        city: form.city,
        company: form.company,
        serviceType: form.serviceType,
        submitName: form.submitName,
        supplierCategory: form.serviceType,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        countryCode: form.countryCode,
        phone: form.phone,
        address: form.address,
      };

      const res = data?.id
        ? await updateSupplier(data.id, payload)
        : await createSupplier(userId, payload);

      if (res.status === false) throw res;

      onClose();
    } catch (err) {
      console.error("Full error response:", err?.response?.data);
      if (err?.errors) {
        const messages = Object.values(err.errors).flat().join(", ");
        setError(messages);
      } else {
        setError(err?.message ?? "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="supm-overlay" onClick={onClose} />

      <div className="supm-modal">
        <div className="supm-header">
          <h3>{data ? "Edit Supplier" : "Add Supplier"}</h3>
          <button className="supm-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="supm-body">
          {error && <div className="supm-error">{error}</div>}

          {/* COMPANY */}
          <div className="supm-section">
            <h4>Company Information</h4>

            <div className="supm-grid">
              
            <div className="supm-field" style={{ position: "relative" }}>
  <label>City</label>

  <input
    name="city"
    value={form.city}
    onChange={(e) => handleCitySearch(e.target.value)}
    placeholder="Type city..."
    autoComplete="off"
  />

  {citySuggestions.length > 0 && (
  <div className="supm-dropdown">
    {citySuggestions.map((item, index) => (
      <div
        key={index}
        className="supm-dropdown-item"
        onMouseDown={(e) => {
          e.preventDefault();
          setForm((prev) => ({ ...prev, city: item.name }));
          setCitySuggestions([]);
        }}
      >
        {item.name}
      </div>
    ))}
  </div>
)}
</div>

              <div className="supm-field">
                <label>Company Name *</label>
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* SERVICES */}
          <div className="supm-section">
            <h4>Service Types</h4>
            {serviceTypes.length === 0 ? (
              <p style={{ fontSize: "13px", color: "#888" }}>Loading service types...</p>
            ) : (
              <div className="supm-checkbox-grid">
                {serviceTypes.map((item) => (
                  <label key={item.id} className="supm-checkbox">
                    <input
                      type="radio"
                      name="serviceType"
                      checked={form.serviceType === item.name}
                      onChange={() => handleServiceSelect(item.name)}
                    />
                    <span>{item.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* CONTACT */}
          <div className="supm-section">
            <h4>Contact Details</h4>
            <div className="supm-grid">
              <div className="supm-field">
                <label>Title</label>
                <select
                  name="submitName"
                  value={form.submitName}
                  onChange={handleChange}
                >
                  <option value="Mr">Mr</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Ms">Ms</option>
                  <option value="Mrs">Mrs</option>
                </select>
              </div>

              <div className="supm-field">
                <label>First Name *</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="supm-field">
                <label>Last Name</label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="supm-field">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="supm-field">
                <label>Mobile</label>
                <div className="supm-mobile">
                  <select
                    name="countryCode"
                    value={form.countryCode}
                    onChange={handleChange}
                  >
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+971">+971</option>
                  </select>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="supm-field supm-full">
                <label>Address</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows="3"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="supm-footer">
          <button className="supm-btn ghost" onClick={onClose}>
            Cancel
          </button>
          <button
            className="supm-btn primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : data ? "Update Supplier" : "Save Supplier"}
          </button>
        </div>
      </div>
    </>
  );
}