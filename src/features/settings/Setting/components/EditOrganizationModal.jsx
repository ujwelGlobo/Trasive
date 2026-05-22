import { useState } from "react";
import { updateOrganization } from "../service/SettingService";
import "../pages/setting.css"
import { useAuth } from "@/core/auth/AuthProvider";
const EditOrganizationModal = ({ org, onClose, onUpdate }) => {

  const { user } = useAuth();

const [formData, setFormData] = useState({
  name: org?.name || "",
  email: org?.email || "",
  phone: org?.phone || "",
  address: org?.address || "",
  gst: org?.gst || "",
  country: org?.country || "",
  countrycode: org?.countrycode || "",
  state: org?.state || "",
  statecode: org?.statecode || "",
  voucher: org?.voucher || "",
});

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


 const handleSubmit = async () => {
  try {
    setLoading(true);

    const orgId =
      user?.id ?? user?.user_id;

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      gst: formData.gst,
      country: Number(formData.country),
      state: Number(formData.state),
      voucher: formData.voucher,
    };

    console.log("Payload:", payload);

    const res = await updateOrganization(
      orgId,
      payload
    );

    console.log("API Response:", res.data);

    onUpdate({
      ...org,
      ...payload,
    });

    onClose();
  } catch (err) {
    console.error(
      "Update failed:",
      err.response?.data || err
    );
  } finally {
    setLoading(false);
  }
};
  return (
  <div className="org-modal-overlay" onClick={onClose}>
    <div className="org-modal-card" onClick={(e) => e.stopPropagation()}>

      <h3 className="org-modal-title">Edit Organisation</h3>

      <input className="org-input" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input className="org-input" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input className="org-input" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
      <input className="org-input" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
      <input className="org-input" name="gst" value={formData.gst} onChange={handleChange} placeholder="GST" />
      <input className="org-input" name="country" value={formData.country} onChange={handleChange} placeholder="Country" />
      <input className="org-input" name="countrycode" value={formData.countrycode} onChange={handleChange} placeholder="Country Code" />
      <input className="org-input" name="state" value={formData.state} onChange={handleChange} placeholder="State" />
      <input className="org-input" name="statecode" value={formData.statecode} onChange={handleChange} placeholder="State Code" />
      <input className="org-input" name="voucher" value={formData.voucher} onChange={handleChange} placeholder="Voucher"/>
      <div className="org-modal-actions">
        <button className="org-btn-cancel" onClick={onClose}>Cancel</button>
        <button className="org-btn-submit" onClick={handleSubmit} disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>
      </div>

    </div>
  </div>
  );
};

export default EditOrganizationModal;