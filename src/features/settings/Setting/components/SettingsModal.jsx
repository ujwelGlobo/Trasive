import { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import { updateOrganization } from "../service/SettingService";
import "./SettingsModal.css";

const SettingsModal = ({
  show,
  onClose,
  org,
  onUpdate,
}) => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const [formData, setFormData] = useState({
    invoice_terms: "",
    package_terms: "",
    bank_info: "",
    razorpay_key: "",
    razorpay_secret: "",
    logo: null,
  });

  useEffect(() => {
    if (org) {
      setFormData({
        invoice_terms: org.invoice_terms || "",
        package_terms: org.package_terms || "",
        bank_info: org.bank_info || "",
        razorpay_key: org.razorpay_key || "",
        razorpay_secret: org.razorpay_secret || "",
        logo: null,
      });
      setPreview(org.logo || "");
    }
  }, [org]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        logo: file,
      }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const payload = new FormData();
      payload.append("invoice_terms", formData.invoice_terms);
      payload.append("package_terms", formData.package_terms);
      payload.append("bank_info", formData.bank_info);
      payload.append("razorpay_key", formData.razorpay_key);
      payload.append("razorpay_secret", formData.razorpay_secret);

      if (formData.logo) {
        payload.append("logo", formData.logo);
      }

      await updateOrganization(org.id, payload);

      // Update parent state so DefaultSettingsCard reflects new logo
      if (onUpdate) {
        onUpdate({
          ...org,
          invoice_terms: formData.invoice_terms,
          package_terms: formData.package_terms,
          bank_info: formData.bank_info,
          razorpay_key: formData.razorpay_key,
          razorpay_secret: formData.razorpay_secret,
          logo: preview,
        });
      }

      alert("Updated Successfully");
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      size="lg"
      className="uxs-modal"
    >
      <div className="uxs-modal__content">
        <div className="uxs-modal__header">
          <h5 className="uxs-modal__title">Update Default Settings</h5>
          <button className="uxs-modal__close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="uxs-modal__body">
          <Form className="uxs-form">

            <div className="uxs-form__group">
              <label className="uxs-form__label">Invoice Logo</label>
              <input
                type="file"
                accept="image/*"
                className="uxs-form__input"
                onChange={handleImageChange}
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  width={140}
                  style={{ marginTop: "10px", borderRadius: "8px" }}
                />
              )}
            </div>

            <div className="uxs-form__group">
              <label className="uxs-form__label">Invoice Terms</label>
              <textarea
                className="uxs-form__textarea"
                rows={4}
                name="invoice_terms"
                value={formData.invoice_terms}
                onChange={handleChange}
              />
            </div>

            <div className="uxs-form__group">
              <label className="uxs-form__label">Package Terms</label>
              <textarea
                className="uxs-form__textarea"
                rows={4}
                name="package_terms"
                value={formData.package_terms}
                onChange={handleChange}
              />
            </div>

            <div className="uxs-form__group">
              <label className="uxs-form__label">Bank Info</label>
              <textarea
                className="uxs-form__textarea"
                rows={3}
                name="bank_info"
                value={formData.bank_info}
                onChange={handleChange}
              />
            </div>

            <div className="uxs-payment">
              <h6 className="uxs-payment__title">Razorpay Settings</h6>
              <input
                className="uxs-form__input"
                placeholder="API Key"
                name="razorpay_key"
                value={formData.razorpay_key}
                onChange={handleChange}
              />
              <input
                className="uxs-form__input"
                placeholder="API Secret"
                name="razorpay_secret"
                type="password"
                value={formData.razorpay_secret}
                onChange={handleChange}
              />
            </div>

          </Form>
        </div>

        <div className="uxs-modal__footer">
          <button
            type="button"
            className="uxs-btn uxs-btn--secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="uxs-btn uxs-btn--primary"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModal;