import { Pencil } from "lucide-react";
import "./InclusionExclusion.css";

const data = [
  { id: 1, name: "Kerala" },
  { id: 2, name: "Sample" },
];

const InclusionExclusion = () => {
  return (
    <div className="ie-page">
      <div className="ie-wrapper">
        {/* Header */}
        <div className="ie-header">
          <div className="ie-left">
            <input
              type="text"
              placeholder="Search by name"
              className="search-input"
            />
            <h3>Destination</h3>
          </div>

          <button className="add-btn">Add</button>
        </div>

        {/* Controls */}
        <div className="ie-controls">
          <div>
            Show
            <select className="entries-select">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            entries
          </div>

          <div>
            Search:
            <input type="text" className="table-search" />
          </div>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="ie-table">
            <thead>
              <tr>
                <th>Destination</th>
                <th className="edit-col">Edit</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id} className={index === 0 ? "active-row" : ""}>
                  <td>{item.name}</td>
                  <td className="edit-col">
                    <button className="edit-btn">
                      <Pencil size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="ie-footer">
          <span>Showing 1 to {data.length} of {data.length} entries</span>
          <div className="pagination">
            <button>Previous</button>
            <button>Next</button>
          </div>
        </div>

        <div className="total-records">
          Total Records: {data.length}
        </div>
      </div>
    </div>
  );
};

export default InclusionExclusion;
