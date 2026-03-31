import { useState, useEffect } from "react";
import { useAuth } from "@/core/auth/AuthProvider";
import { getOrganization } from "../service/SettingService";
import EditOrganizationModal from "../components/EditOrganizationModal";
import axiosInstance from "@/core/api/axiosInstance";
import "./Setting.css";

const Setting = () => {
  const { user } = useAuth();
  const [org, setOrg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const userId = user?.id ?? user?.user_id;
    if (!userId) return;

    const load = async () => {
      try {
        setLoading(true);
        const res = await getOrganization(userId);
        setOrg(res.data);
      } catch (err) {
        console.error("Failed to fetch organisation:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user]);

  return (
    <div className="saas-org-wrapper">

      {/* Organisation Card */}
      <div className="saas-org-card">
        <div className="saas-org-header">
          <h2>Organisation Settings</h2>
          <button
            className="saas-org-btn"
            onClick={() => setShowModal(true)}
          >
            Edit Setting
          </button>
        </div>

        {loading ? (
          <div className="saas-org-body">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="saas-org-row">
                <div className="shimmer-row" />
              </div>
            ))}
          </div>
        ) : (
          <div className="saas-org-body">

            <div className="saas-org-row">
              <span className="saas-org-label">Organisation Name</span>
              <span className="saas-org-value">{org?.name ?? "-"}</span>
            </div>

            <div className="saas-org-row">
              <span className="saas-org-label">Email</span>
              <span className="saas-org-value">{org?.email ?? "-"}</span>
            </div>

            <div className="saas-org-row">
              <span className="saas-org-label">Phone</span>
              <span className="saas-org-value">
                {org?.countrycode} {org?.phone ?? "-"}
              </span>
            </div>

            <div className="saas-org-row">
              <span className="saas-org-label">Address</span>
              <span className="saas-org-value">{org?.address ?? "-"}</span>
            </div>

            <div className="saas-org-row">
              <span className="saas-org-label">GSTIN</span>
              <span className="saas-org-value">{org?.gst ?? "-"}</span>
            </div>

            <div className="saas-org-row">
              <span className="saas-org-label">State</span>
              <span className="saas-org-value">{org?.state ?? "-"}</span>
            </div>

          </div>
        )}
      </div>

      {/* Default Settings */}
      <div className="saas-default-card">
        <h3 className="saas-default-title">Default Settings</h3>

        <div className="saas-default-content">
          <div className="saas-default-logo">
            <img
              src={
                org?.logo
                  ? `${axiosInstance.defaults.baseURL}/storage/${org.logo}`
                  : "/logo.png"
              }
              alt="logo"
            />
          </div>

          <div className="saas-default-text">
            <h4>Itinerary Logo</h4>
            <p>
              For the best results a png file with transparent background
              at least 126x40 pixels is recommended
            </p>
          </div>

          <button className="saas-default-edit">Edit</button>
        </div>
      </div>

      {/* Modal */}
      {showModal && org && (
        <EditOrganizationModal
          org={org}
          onClose={() => setShowModal(false)}
          onUpdate={(updatedData) => setOrg(updatedData)}
        />
      )}

    </div>
  );
};

export default Setting;