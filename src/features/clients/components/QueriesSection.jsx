import React, { useEffect, useState } from "react";
import { Filter, Plus } from "lucide-react";
import { getQueriesByClient } from "../services/clientService";

export default function QueriesSection({ clientId }) {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!clientId) return;

    const fetchQueries = async () => {
      try {
        setLoading(true);

        const data = await getQueriesByClient(clientId);

        const formatted = data.map((item) => ({
          id: `#QR-${item.id}`,
          destination: item.destination.join(", "), // 🔥 array → string
          date: `${item.from} → ${item.to}`,
          pax: "-", // ❗ not available in API
          status: item.status,
          assigned: "-", // ❗ not available
        }));

        setQueries(formatted);
      } catch (err) {
        console.error("Error fetching queries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, [clientId]);

  if (loading) {
    return <div className="cd-card">Loading queries...</div>;
  }

  return (
    <div className="cd-card">
      <div className="cd-card-header">
        <div className="cd-card-title">Queries</div>
        <button className="cd-card-action">
          <Plus size={11} /> New Query
        </button>
      </div>

      <div className="cd-search-bar">
        <input
          className="cd-search-input"
          placeholder="Search queries..."
        />
        <button className="cd-filter-btn">
          <Filter size={11} /> Filter
        </button>
      </div>

      {queries.length === 0 ? (
        <div className="cd-empty">No queries found</div>
      ) : (
        <table className="cd-table">
          <thead>
            <tr>
              <th>Query ID</th>
              <th>Destination</th>
              <th>Travel Date</th>
              <th>Pax</th>
              <th>Status</th>
              <th>Assigned</th>
            </tr>
          </thead>

          <tbody>
            {queries.map((q) => (
              <tr key={q.id}>
                <td>{q.id}</td>
                <td>{q.destination}</td>
                <td>{q.date}</td>
                <td>{q.pax}</td>
                <td>{q.status}</td>
                <td>{q.assigned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}