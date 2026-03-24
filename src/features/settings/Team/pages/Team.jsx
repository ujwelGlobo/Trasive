import React, { useEffect, useState } from "react";
import "./Team.css";
import InviteTeamMember from "../components/InviteTeamMember";
import { getTeamMembers } from "../services/teamServices";
import { useAuth } from "@/core/auth/AuthProvider";

// Avatar background colors — cycles through these per member
const AVATAR_COLORS = [
  "#4f46e5", "#7c3aed", "#db2777", "#059669",
  "#d97706", "#0891b2", "#dc2626", "#65a30d",
];

const getInitials = (firstName = "", lastName = "") => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

const Team = () => {
  const { user } = useAuth();

  const [team, setTeam] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchTeam = async () => {
    try {
      const res = await getTeamMembers(user.id);
      setTeam(res.data);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchTeam();
  }, [user]);

  const activeCount = team.length;
  const verifiedCount = team.filter((m) => m.twoStep).length;

  return (
    <div className="saas-team">

      {/* ── HEADER ── */}
      <div className="saas-team-header">
        <div className="saas-team-title-group">
          <h2 className="saas-team-title">Team</h2>
          <p className="saas-team-subtitle">People within your organisation</p>
        </div>

        <button
          className="saas-team-invite-btn"
          onClick={() => setShowModal(true)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" y1="8" x2="19" y2="14" />
            <line x1="22" y1="11" x2="16" y2="11" />
          </svg>
          Invite member
        </button>
      </div>

      {/* ── STATS BAR ──
      <div className="saas-team-stats">
        <div className="saas-team-stat">
          <span className="saas-stat-value">{activeCount}</span>
          <span className="saas-stat-label">Total Members</span>
        </div>
        <div className="saas-team-stat">
          <span className="saas-stat-value">{activeCount}</span>
          <span className="saas-stat-label">Active</span>
        </div>
        <div className="saas-team-stat">
          <span className="saas-stat-value">{verifiedCount}</span>
          <span className="saas-stat-label">2-Step Verified</span>
        </div>
      </div> */}

      {/* ── TABLE ── */}
      <div className="saas-team-table-wrapper">
        <table className="saas-team-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Email</th>
              <th>Status</th>
              <th>2-Step Verification</th>
              <th>QR Code</th>
            </tr>
          </thead>

          <tbody>
            {team.length === 0 ? (
              <tr>
                <td colSpan="5">
                  <div className="saas-empty-state">
                    <div className="saas-empty-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>
                    <p className="saas-empty-title">No team members yet</p>
                    <p className="saas-empty-desc">Invite your first team member to get started</p>
                  </div>
                </td>
              </tr>
            ) : (
              team.map((member, idx) => (
                <tr key={member.id}>

                  {/* Name + Avatar */}
                  <td>
                    <div className="saas-member-cell">
                      <div
                        className="saas-avatar saas-avatar-online"
                        style={{ background: AVATAR_COLORS[idx % AVATAR_COLORS.length] }}
                      >
                        {getInitials(member.firstName, member.last_name)}
                      </div>
                      <div>
                        <div className="saas-member-name">
                          {member.firstName} {member.last_name}
                        </div>
                        <div className="saas-member-role">
                          {member.designation || "Team Member"}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td>
                    <span className="saas-email">{member.email}</span>
                  </td>

                  {/* Status */}
                  <td>
                    <span className="saas-team-status-active">Active</span>
                  </td>

                  {/* 2-Step Toggle */}
                  <td>
                    <label className="saas-toggle">
                      <input type="checkbox" defaultChecked={!!member.twoStep} />
                      <span className="saas-toggle-slider" />
                    </label>
                  </td>

                  {/* QR Code Toggle */}
                  <td>
                    <label className="saas-toggle">
                      <input type="checkbox" defaultChecked={!!member.qrCode} />
                      <span className="saas-toggle-slider" />
                    </label>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <InviteTeamMember
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        refreshTeam={fetchTeam}
      />
    </div>
  );
};

export default Team;