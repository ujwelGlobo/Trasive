import { useState } from "react";
import StatusPills from "@/features/query/QueryList/components/StatusPills";
import QueryRow from "@/features/query/QueryList/components/QueryRow";
import "./QueryList.css";

const MOCK_QUERIES = [
  {
    id: "202569704",
    client: "Pope Leo Fourteen XIV",
    destination: "Munnar",
    status: "NEW",
    assignee: "Not Assign",
  },
  {
    id: "202569703",
    client: "Phuentsholing",
    destination: "Munnar",
    status: "NEW",
    assignee: "Not Assign",
  },
  {
    id: "202569697",
    client: "Sunil Deshmukh",
    destination: "Kerala",
    status: "CONFIRMED",
    assignee: "Saumya Sivaprasad",
  },
];

const QueryList = () => {
  const [activeStatus, setActiveStatus] = useState("ALL");

  const filteredQueries =
    activeStatus === "ALL"
      ? MOCK_QUERIES
      : MOCK_QUERIES.filter((q) => q.status === activeStatus);

  return (
    <div className="query-page">
      <div className="query-header">
        <h2>Queries</h2>
        <p>Manage client travel enquiries</p>
      </div>

      <StatusPills
        activeStatus={activeStatus}
        onChange={setActiveStatus}
      />

      <div className="query-list">
        {filteredQueries.length > 0 ? (
          filteredQueries.map((q) => (
            <QueryRow key={q.id} query={q} />
          ))
        ) : (
          <div className="empty-state">
            No queries found
          </div>
        )}
      </div>
    </div>
  );
};

export default QueryList;
