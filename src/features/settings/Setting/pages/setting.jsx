import { useState, useEffect } from "react";
import { useAuth } from "@/core/auth/AuthProvider";
import {
  getOrganization,
  getOrganizationLogo,
} from "../service/SettingService";

import EditOrganizationModal from "../components/EditOrganizationModal";
import OrganizationCard from "../components/OrganizationCard";
import DefaultSettingsCard from "../components/DefaultSettingsCard";
import SettingsModal from "../components/SettingsModal";

import "./Setting.css";

const Setting = () => {
  const { user } = useAuth();

  const [org, setOrg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDefaultModal, setShowDefaultModal] = useState(false);

  useEffect(() => {
    const userId = user?.id ?? user?.user_id;

    if (!userId) return;

    const load = async () => {
      try {
        setLoading(true);

        const orgRes = await getOrganization(userId);
        const logoRes = await getOrganizationLogo(userId);

        // Safely extract logo from whichever path the API returns
        const logoData = logoRes.data;
        const logo =
          logoData?.data?.logo ||
          logoData?.logo ||
          logoData?.data?.data?.logo ||
          "";

        console.log("Logo API response:", logoData);
        console.log("Extracted logo:", logo);

        setOrg({
          ...orgRes.data.data,
          logo,
        });
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
      <OrganizationCard
        org={org}
        loading={loading}
        onEdit={() => setShowModal(true)}
      />

      <DefaultSettingsCard
        org={org}
        onEdit={() => setShowDefaultModal(true)}
      />

      {showModal && org && (
        <EditOrganizationModal
          org={org}
          onClose={() => setShowModal(false)}
          onUpdate={(updatedData) => setOrg(updatedData)}
        />
      )}

      <SettingsModal
        show={showDefaultModal}
        onClose={() => setShowDefaultModal(false)}
        org={org}
        onUpdate={(updatedData) => setOrg(updatedData)}
      />
    </div>
  );
};

export default Setting;