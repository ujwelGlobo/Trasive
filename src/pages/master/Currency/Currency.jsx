import { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import "./Currency.css";
import CurrencyModal from "./CurrencyModal";

const currencyData = [
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
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    rate: "",
    status: "Active",
  });

  const handleAdd = () => {
    setIsEdit(false);
    setFormData({ code: "", name: "", rate: "", status: "Active" });
    setModalOpen(true);
  };

  const handleEdit = (item) => {
    setIsEdit(true);
    setFormData(item);
    setModalOpen(true);
  };

  const handleSave = () => {
    console.log("Saved currency:", formData);
    setModalOpen(false);
  };

  return (
    <div className="currency-page-wrapper">
      <div className="currency-page-card">

        {/* HEADER */}
        <div className="currency-page-header">
          <h2 className="currency-page-title">Currency Master</h2>

          <div className="currency-page-actions">
            <input
              className="currency-page-search"
              placeholder="Search currency..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              className="currency-page-add-btn"
              onClick={handleAdd}
            >
              <Plus size={16} /> Add Currency
            </button>
          </div>
        </div>

        {/* TABLE */}
        <table className="currency-page-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Country / Currency</th>
              <th>Rate</th>
              <th>Status</th>
              <th>By</th>
              <th>Date</th>
              <th>Edit</th>
            </tr>
          </thead>

          <tbody>
            {currencyData
              .filter(c =>
                c.code.toLowerCase().includes(search.toLowerCase()) ||
                c.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((c, i) => (
                <tr key={i}>
                  <td className="currency-page-code">{c.code}</td>
                  <td>{c.name}</td>
                  <td className="currency-page-rate">{c.rate.toFixed(2)}</td>

                  <td>
                    <span
                      className={`currency-page-status ${
                        c.status === "Active"
                          ? "currency-page-status-active"
                          : "currency-page-status-inactive"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>

                  <td className="currency-page-user">
                    <span className="currency-page-avatar">
                      {c.by.charAt(0)}
                    </span>
                    {c.by}
                  </td>

                  <td className="currency-page-muted">{c.date}</td>

                  <td className="currency-page-edit-cell">
                    <button
                      className="currency-page-edit-btn"
                      onClick={() => handleEdit(c)}
                    >
                      <Pencil size={14} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="currency-page-footer">
          Total Records: {currencyData.length}
        </div>
      </div>

      {/* MODAL */}
      <CurrencyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        formData={formData}
        setFormData={setFormData}
        isEdit={isEdit}
      />
    </div>
  );
}
