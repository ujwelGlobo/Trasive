import { useState } from "react";
import StatusPills from "../../../components/query/StatusPills";
import "./QueryList.css"
import QueryRow from "../../../components/query/QueryRow";

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
    <div>
      <h5 className="mb-3">Query</h5>

      

      <StatusPills
        activeStatus={activeStatus}
        onChange={setActiveStatus}
      />
      <div className="query-list">
  {filteredQueries.map((q) => (
    <QueryRow key={q.id} query={q} />
  ))}
</div>

      {/* <div className="query-list">
        {filteredQueries.map((q) => (
          <div key={q.id} className="query-card">
            <div>
              <strong>{q.id}</strong>
              <div>{q.client}</div>
            </div>

            <div>
              <span className="badge bg-secondary">
                {q.destination}
              </span>
            </div>

            <div>
              <span className="badge bg-info">
                {q.status}
              </span>
            </div>

            <div>{q.assignee}</div>
          </div>
        ))}

        {filteredQueries.length === 0 && (
          <div className="text-muted">No records found</div>
        )}
      </div> */}
    </div>
  );
};

export default QueryList;
