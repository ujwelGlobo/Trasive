import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./client-dashboard.css";

export default function ClientDashboard() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  // 🔥 fallback client (so UI never breaks)
  const fallbackClient = {
    name: "Unknown Client",
    mobile: "-",
    email: "",
    city: "-",
    status: "Inactive",
  };

  const [client, setClient] = useState(state?.client || fallbackClient);
  const [activeSection, setActiveSection] = useState("info");
  const [loading, setLoading] = useState(false);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  // 🚀 Fetch client if opened via URL (refresh / direct access)
  useEffect(() => {
    if (!id || state?.client) return;

    const fetchClient = async () => {
      try {
        setLoading(true);

        // 👉 Replace this with your real API
        // const res = await getClientById(id);

        // 🔥 Temporary mock (remove later)
        const res = {
          name: "Fetched Client",
          mobile: "9999999999",
          email: "client@test.com",
          city: "Kochi",
          status: "Active",
        };

        setClient(res);
      } catch (err) {
        console.error("Error fetching client:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id, state]);

  // Get initials safely
  const initials = client.name
    ?.split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("") || "NA";

  return (
    <div className="cd-root">
      {/* Sidebar */}
      <aside className="cd-sidebar">
        {["info", "followups", "queries", "invoice", "payments", "documents"].map((item) => (
          <button
            key={item}
            className={`cd-side-btn ${activeSection === item ? "active" : ""}`}
            onClick={() => toggleSection(item)}
          >
            {item.charAt(0).toUpperCase()}
          </button>
        ))}
      </aside>

      {/* Main */}
      <div className="cd-main">

        {/* Back Button */}
        <button
          className="cd-back-btn"
          onClick={() => navigate("/clients")}
        >
          <ArrowLeft size={15} />
          Back to Clients
        </button>

        {/* Loading */}
        {loading && (
          <div style={{ padding: 10, color: "#64748b" }}>
            Loading client data...
          </div>
        )}

        {/* Hero */}
        <div className="cd-hero">
          <div className="cd-avatar">{initials}</div>
          <div>
            <h2>{client.name}</h2>
            <p>City: {client.city}</p>
            <div className="cd-stats">
              <span
                className={
                  client.status === "Active"
                    ? "cd-status-active"
                    : "cd-status-inactive"
                }
              >
                {client.status}
              </span>
            </div>
          </div>
        </div>

        {/* Sections */}
        <Section
          title="Client Info"
          isOpen={activeSection === "info"}
          onClick={() => toggleSection("info")}
        >
          <p>Mobile: {client.mobile}</p>
          <p>Email: {client.email || "Not Provided"}</p>
          <p>City: {client.city}</p>
        </Section>

        <Section
          title="Followups"
          isOpen={activeSection === "followups"}
          onClick={() => toggleSection("followups")}
        >
          <EmptyState text="No followups yet" />
        </Section>

        <Section
          title="Queries"
          isOpen={activeSection === "queries"}
          onClick={() => toggleSection("queries")}
        >
          <table className="cd-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Destination</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="3" style={{ textAlign: "center", color: "#94a3b8" }}>
                  No queries found
                </td>
              </tr>
            </tbody>
          </table>
        </Section>

        <Section
          title="Invoice"
          isOpen={activeSection === "invoice"}
          onClick={() => toggleSection("invoice")}
        >
          <EmptyState text="No invoices found" />
        </Section>

        <Section
          title="Payments"
          isOpen={activeSection === "payments"}
          onClick={() => toggleSection("payments")}
        >
          <EmptyState text="No payments found" />
        </Section>

        <Section
          title="Documents"
          isOpen={activeSection === "documents"}
          onClick={() => toggleSection("documents")}
        >
          <EmptyState text="No documents found" />
        </Section>
      </div>
    </div>
  );
}

function Section({ title, isOpen, onClick, children }) {
  return (
    <div className="cd-section">
      <div className="cd-section-header" onClick={onClick}>
        {title}
      </div>
      {isOpen && <div className="cd-section-body">{children}</div>}
    </div>
  );
}

function EmptyState({ text }) {
  return <div className="cd-empty">{text}</div>;
}