import { useState } from "react";
import { Pencil, Plus } from "lucide-react";
import "./VehicleCategory.css";
import VehicleCategoryModal from "./VehicelCateoryModal";

const categories = [
  {
    name: "AC10 Seater Tempo Traveller AC",
    category: "Tempo Traveller",
    status: "Active",
    updated: "06-12-2025",
  },
  {
    name: "12 Seater Tempo Traveller AC",
    category: "Tempo Traveller",
    status: "Active",
    updated: "06-12-2025",
  },
  {
    name: "12 Seater Urbania AC",
    category: "Tempo Traveller",
    status: "Inactive",
    updated: "06-12-2025",
  },
  {
    name: "15 Seater Urbania AC",
    category: "Tempo Traveller",
    status: "Active",
    updated: "06-12-2025",
  },
];

export default function VehicleCategory() {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    status: "Active",
  });

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    setIsEdit(false);
    setFormData({ name: "", status: "Active" });
    setModalOpen(true);
  };

  const handleEdit = (item) => {
    setIsEdit(true);
    setFormData(item);
    setModalOpen(true);
  };

  const handleSave = () => {
    console.log(isEdit ? "Updated:" : "Saved:", formData);
    setModalOpen(false);
  };

  return (
    <div className="vc-vehicle-page">
      <div className="vc-vehicle-card">

        <div className="vc-vehicle-header">
          <h2 className="vc-vehicle-header-title">Vehicle Category</h2>

          <div className="vc-header-actions">
            <input
              className="vc-search-input"
              placeholder="Search category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button className="vc-btn-primary" onClick={handleAdd}>
              <Plus size={16} />
              Add Vehicle Category
            </button>
          </div>
        </div>

        <table className="vc-table">
          <thead>
            <tr>
              <th className="vc-table-head">Name</th>
              <th className="vc-table-head">Category</th>
              <th className="vc-table-head">Status</th>
              <th className="vc-table-head">Updated</th>
              <th className="vc-table-head">Edit</th>
            </tr>
          </thead>

          <tbody>
            {filteredCategories.map((cat, index) => (
              <tr className="vc-table-row" key={index}>
                <td className="vc-table-cell vc-category-name">{cat.name}</td>
                <td className="vc-table-cell">{cat.category}</td>
                <td className="vc-table-cell">{cat.status}</td>
                <td className="vc-table-cell">{cat.updated}</td>
                <td className="vc-table-cell vc-actions">
                  <button
                    className="vehiclecategory-page-edit-cell"
                    onClick={() => handleEdit(cat)}
                  >
                    <Pencil size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="vc-table-footer">
          Total Records: {filteredCategories.length}
        </div>
      </div>

      {modalOpen && (
        <VehicleCategoryModal
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          formData={formData}
          setFormData={setFormData}
          isEdit={isEdit}
        />
      )}
    </div>
  );
}
