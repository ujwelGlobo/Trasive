import { useState } from "react";
import { Pencil, Plus } from "lucide-react";
import "./VehicleCategory.css";

const categories = ["Bus", "Sedan", "SUV", "Tempo Traveller"];

export default function VehicleCategory() {
  const [search, setSearch] = useState("");

  return (
    <div className="vehicle-page">
      <div className="vehicle-card">

        {/* HEADER */}
        <div className="vehicle-header">
          <h2>Vehicle Category</h2>

          <div className="header-actions">
            <input
              placeholder="Search category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn primary">
              <Plus size={16} /> Add Vehicle Category
            </button>
          </div>
        </div>

        {/* TABLE */}
        <table className="saas-table">
          <thead>
            <tr>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {categories
              .filter((c) =>
                c.toLowerCase().includes(search.toLowerCase())
              )
              .map((cat, i) => (
                <tr key={i}>
                  <td className="name">{cat}</td>

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
          <span>Total Records: {categories.length}</span>
        </div>

      </div>
    </div>
  );
}
