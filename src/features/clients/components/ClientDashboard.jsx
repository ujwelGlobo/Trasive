import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./client-dashboard.css";

import { useAuth } from "@/core/auth/AuthProvider";
import { getClientById } from "../services/clientService";

import ClientInfoSection from "./InfoClient";
import FollowupsSection from "./FollowupsSection";
import QueriesSection from "./QueriesSection";
import InvoicesSection from "./InvoicesSection";
import PaymentsSection from "./PaymentsSection";
import DocumentsSection from "./DocumentsSection";

export default function ClientDashboard() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const fallbackClient = {
    name: "Unknown Client",
    mobile: "-",
    email: "",
    city: "-",
    status: "Inactive",
  };

  const [client, setClient] = useState(state?.client || fallbackClient);
  const [activeTab, setActiveTab] = useState("info");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchClient = async () => {
      try {
        setLoading(true);

        const userId = user?.id ?? user?.user_id;
        const res = await getClientById(userId, id);

        if (res.status) {
          setClient(res.data);
        }
      } catch (err) {
        console.error("Error fetching client:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id, user]);

  const initials =
    client.name
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("") || "NA";

  const TAB_CONFIG = {
    info: {
      label: "Info",
      component: <ClientInfoSection client={client} />,
    },
    followups: {
      label: "Follow-ups",
      component: <FollowupsSection clientId={id} />,
    },
    queries: {
      label: "Queries",
      component: <QueriesSection clientId={id} />,
    },
    invoice: {
      label: "Invoices",
      component: <InvoicesSection clientId={id} />,
    },
    payments: {
      label: "Payments",
      component: <PaymentsSection clientId={id} />,
    },
    documents: {
      label: "Documents",
      component: <DocumentsSection clientId={id} />,
    },
  };

  return (
    <div className="cd-root">

      {/* Topbar */}
      <div className="cd-topbar">
        <button
          className="cd-back-btn"
          onClick={() => navigate("/clients")}
        >
          <ArrowLeft size={12} />
          Back to clients
        </button>
      </div>

      {loading && (
        <div className="cd-loading">Loading client data...</div>
      )}

      {/* Hero */}
      <div className="cd-hero">
        <div className="cd-avatar">{initials}</div>

        <div className="cd-hero-info">
          <h2>{client.name}</h2>

          <div className="cd-hero-meta">
            <span
              className={
                client.status === "Active"
                  ? "cd-badge cd-badge-active"
                  : "cd-badge cd-badge-inactive"
              }
            >
              {client.status}
            </span>

            <span>{client.city}</span>

            <span className="cd-dot">·</span>

            <span>{client.phone || client.mobile || "-"}</span>

            {client.email && (
              <>
                <span className="cd-dot">·</span>
                <span>{client.email}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="cd-tabs">
        {Object.entries(TAB_CONFIG).map(([key, tab]) => (
          <button
            key={key}
            className={`cd-tab ${
              activeTab === key ? "active" : ""
            }`}
            onClick={() => setActiveTab(key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Dynamic Content */}
      <div className="cd-content">
        {TAB_CONFIG[activeTab].component}
      </div>
    </div>
  );
}