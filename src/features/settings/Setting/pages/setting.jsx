import { useState, useEffect } from "react";
import { useAuth } from "@/core/auth/AuthProvider";
import { getOrganization } from "../service/SettingService";

import EditOrganizationModal from "../components/EditOrganizationModal";
import OrganizationCard from "../components/OrganizationCard";
import DefaultSettingsCard from "../components/DefaultSettingsCard";

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
        setOrg(res.data.data);
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

      <DefaultSettingsCard org={org} />

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