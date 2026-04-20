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
    logo: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      logo: e.target.files[0],
    }));
  };

  const handleSubmit = async () => {
    
  try {
    setLoading(true);
      const orgId = user?.id;
    console.log("Logged In Workspace:", user.workspaceId);
console.log("Org Workspace:", org.workspace_id);
console.log("Sending Update For:", orgId);

  

    if (!orgId) {
      console.error("Organization ID missing");
      return;
    }

    const data = new FormData();

    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("address", formData.address);
    data.append("gst", formData.gst);
    data.append("country", formData.country);
    data.append("countrycode", formData.countrycode);
    data.append("state", formData.state);
    data.append("statecode", formData.statecode);

    if (formData.logo) {
      data.append("logo", formData.logo);
    }

    const res = await updateOrganization(orgId, data);

    onUpdate(res.data.data);

    onClose();

  } catch (err) {
    console.error("Update failed:", err.response?.data || err);
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

      <input className="org-input-file" type="file" onChange={handleFileChange} />

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