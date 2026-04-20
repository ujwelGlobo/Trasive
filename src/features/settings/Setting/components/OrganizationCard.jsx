import React from "react";

const OrganizationCard = ({ org, loading, onEdit }) => {
  return (
    <div className="saas-org-card">
      <div className="saas-org-header">
        <h2>Organisation Settings</h2>
        <button className="saas-org-btn" onClick={onEdit}>
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
  );
};

export default OrganizationCard;