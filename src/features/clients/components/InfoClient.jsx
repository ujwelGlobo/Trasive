import React from "react";

export default function ClientInfoSection({ client }) {
  const fields = [
    { label: "Full Name", value: client.name },
    { label: "Phone", value: client.phone || "-" },
    { label: "Mobile", value: client.mobile || "-" },
    { label: "Email", value: client.email || "-" },
    { label: "Alternate Email", value: client.email2 || "-" },
    { label: "City", value: client.city || "-" },
    { label: "Address", value: client.address || "-" },
    { label: "DOB", value: client.dob || "-" },
    { label: "Marriage Anniversary", value: client.marriageAnniversary || "-" },
    { label: "Client Type", value: client.type || "-" },
    { label: "Created On", value: client.created || "-" },
  ];

  return (
    <div className="cd-card">
      <div className="cd-card-header">
        <div className="cd-card-title">Client Information</div>
        <button className="cd-card-action">Edit</button>
      </div>

      <div className="cd-info-grid">
        {fields.map(({ label, value }) => (
          <div key={label} className="cd-info-row">
            <div className="cd-info-label">{label}</div>
            <div className="cd-info-value">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}