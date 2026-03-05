import React, { useEffect, useState } from "react";
import "./Team.css";
import InviteTeamMember from "../components/InviteTeamMember";
import { getTeamMembers } from "../services/teamServices";
import { useAuth } from "@/core/auth/AuthProvider";

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

  return (
    <div className="saas-team">
      <div className="saas-team-header">
        <div>
          <h2 className="saas-team-title">Team</h2>
          <p className="saas-team-subtitle">
            People within your organisation
          </p>
        </div>

        <button
          className="saas-team-invite-btn"
          onClick={() => setShowModal(true)}
        >
          Invite team member
        </button>
      </div>

      <div className="saas-team-table-wrapper">
        <table className="saas-team-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>2 Step Verification</th>
              <th>QR Code</th>
            </tr>
          </thead>

          <tbody>
            {team.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No team members found
                </td>
              </tr>
            ) : (
              team.map((member) => (
                <tr key={member.id}>
                  <td>
                    {member.firstName} {member.last_name}
                  </td>

                  <td>{member.email}</td>

                  <td>
                    <span className="saas-team-status-active">
                      Active
                    </span>
                  </td>

                  <td>
                    <input type="checkbox" />
                  </td>

                  <td>
                    <input type="checkbox" />
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