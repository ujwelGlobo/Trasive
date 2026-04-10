import { X } from "lucide-react";
import { useState } from "react";
import { searchCities } from "../../suppliers/services/SupplierService";
import "./Client.css";

export default function ClientModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    title: "Mr.",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    email2: "",
    mobile2: "",
    city: "",
    address: "",
    userType: "Client",
  });

  const [citySuggestions, setCitySuggestions] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCitySearch = async (value) => {
    setForm((prev) => ({ ...prev, city: value }));

    if (value.length < 2) {
      setCitySuggestions([]);
      return;
    }

    try {
      const query =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      const res = await searchCities(query);
      if (res.status) {
        setCitySuggestions(res.data);
      } else {
        setCitySuggestions([]);
      }
    } catch (err) {
      console.error("City search error:", err);
    }
  };

  const handleSubmit = () => {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.mobile ||
      !form.city
    ) {
      alert("Please fill required fields");
      return;
    }

    const newClient = {
      id: Date.now(),
      name: `${form.title} ${form.firstName} ${form.lastName}`,
      mobile: form.mobile,
      email: form.email,
      city: form.city,
      status: "Active",
    };

    onSave(newClient);
    onClose();
  };

  return (
    <>
      <div className="saas-overlay" onClick={onClose}></div>

      <div className="saas-modal">
        <div className="saas-header-client">
          <h3>Add Client</h3>
          <button className="saas-close" onClick={onClose}>
            <X size={18} color="#fff" />
          </button>
        </div>

        <div className="saas-body">
          <div className="form-group full">
            <label>Title</label>
            <select name="title" value={form.title} onChange={handleChange}>
              <option>Mr.</option>
              <option>Ms.</option>
              <option>Mrs.</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>First Name *</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name *</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group full">
            <label>Email *</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full">
            <label>Mobile *</label>
            <div className="phone-group">
              <span>+91</span>
              <input
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group full" style={{ position: "relative" }}>
            <label>City *</label>
            <input
              name="city"
              value={form.city}
              onChange={(e) => handleCitySearch(e.target.value)}
              placeholder="Type city..."
              autoComplete="off"
            />
            {citySuggestions.length > 0 && (
              <div className="dropdown-client">
                {citySuggestions.map((item, index) => (
                  <div
                    key={index}
                    className="dropdown-item-client"
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

          <div className="form-group full">
            <label>User Type</label>
            <select
              name="userType"
              value={form.userType}
              onChange={handleChange}
            >
              <option>Client</option>
              <option>Agent</option>
              <option>Corporate</option>
            </select>
          </div>
        </div>

        <div className="saas-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-save" onClick={handleSubmit}>
            Save Client
          </button>
        </div>
      </div>
    </>
  );
}