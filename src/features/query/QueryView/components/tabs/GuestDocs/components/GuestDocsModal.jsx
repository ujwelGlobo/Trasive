import { useEffect, useState } from "react";

const GuestModal = ({ data, onClose, onSave }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
  });

  useEffect(() => {
    if (data) {
      setForm({
        firstName: data.first_name || "",
        lastName: data.last_name || "",
        gender: data.gender || "",
        dob: data.dob || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const payload = {
      first_name: form.firstName,
      last_name: form.lastName,
      gender: form.gender,
      dob: form.dob,
    };
    onSave(payload);
  };

  return (
    <div className="gd-modal-overlay">
      <div className="gd-modal">
        <h3>{data ? "Edit Guest" : "Add Guest"}</h3>

        <input
          className="gd-modal-input"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
        />

        <input
          className="gd-modal-input"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
        />

        <select
          className="gd-modal-select"
          name="gender"
          value={form.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>

        <input
          className="gd-modal-input"
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
        />

        <div className="gd-modal-actions">
          <button className="gd-modal-cancel" onClick={onClose}>Cancel</button>
          <button className="gd-modal-save" onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default GuestModal;