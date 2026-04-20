import React from "react";
import axiosInstance from "@/core/api/axiosInstance";

const DefaultSettingsCard = ({ org }) => {
  return (
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
  );
};

export default DefaultSettingsCard;