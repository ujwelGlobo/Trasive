import { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import "./Currency.css";

const currencies = [
  {
    code: "AED",
    name: "UAE Dirham",
    rate: 22.0,
    status: "Inactive",
    by: "Jinu George",
    date: "22-09-2023",
  },
  {
    code: "INR",
    name: "Indian Rupee",
    rate: 1.0,
    status: "Active",
    by: "Jinu George",
    date: "27-09-2019",
  },
];

export default function Currency() {
  const [search, setSearch] = useState("");

  return (
    <div className="currency-page">
      <div className="currency-card">

        {/* HEADER */}
        <div className="currency-header">
          <h2>Currency Master</h2>

          <div className="header-actions">
            <input
              placeholder="Search currency..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button className="btn primary">
              <Plus size={16} /> Add Currency
            </button>
          </div>
        </div>

        {/* TABLE */}
        <table className="saas-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Country / Currency</th>
              <th>Rate</th>
              <th>Status</th>
              <th>By</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {currencies
              .filter(c =>
                c.code.toLowerCase().includes(search.toLowerCase()) ||
                c.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((c, i) => (
                <tr key={i}>
                  <td className="code">{c.code}</td>

                  <td>{c.name}</td>

                  <td className="rate">{c.rate.toFixed(2)}</td>

                  <td>
                    <span
                      className={`status ${
                        c.status === "Active" ? "active" : "inactive"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>

                  <td>
                    <div className="user">
                      <span className="avatar">J</span>
                      {c.by}
                    </div>
                  </td>

                  <td className="muted">{c.date}</td>

                  <td className="actions">
                    <button>
                      <Pencil size={14} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* FOOTER */}
        <div className="table-footer">
          <span>Total Records: {currencies.length}</span>
        </div>

      </div>
    </div>
  );
}
