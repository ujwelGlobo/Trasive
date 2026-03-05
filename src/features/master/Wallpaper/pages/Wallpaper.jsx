import { useState } from "react";
import { Plus, Trash2, Pencil } from "lucide-react";
import "./Wallpaper.css";
import WallpaperModal from "./WallpaperModal";
import toast from "react-hot-toast";


const imagesData = [
  { name: "BEST", image: "https://picsum.photos/220/140?1", active: true },
  { name: "BEST 1", image: "https://picsum.photos/220/140?2", active: false },
  { name: "Kerala", image: "https://picsum.photos/220/140?3", active: false },
];

export default function Wallpaper() {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
const [selectedItem, setSelectedItem] = useState(null);

const handleDeleteClick = (item) => {
  setSelectedItem(item);
  setDeleteOpen(true);
    toast.loading("Deleting image...");

};

const handleConfirmDelete = () => {
  console.log("Deleting:", selectedItem);
  // 🔥 API call here
  setDeleteOpen(false);
  setSelectedItem(null);
    toast.loading("Deleting image...");

};

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    active: true,
  });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  /* ---------------- ACTIONS ---------------- */

  const handleAdd = () => {
    setIsEdit(false);
    setFormData({ name: "", image: "", active: true });
    setModalOpen(true);
   

  };

  const handleEdit = (item) => {
    setIsEdit(true);
    setFormData(item);
    setModalOpen(true);
  };

  const handleSave = () => {
    console.log("Saved image:", formData);
    setModalOpen(false);
  };


  /* ---------------- FILTER + PAGINATION ---------------- */

  const filtered = imagesData.filter((img) =>
    img.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / pageSize);

  const paginatedData = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  /* ---------------- RENDER ---------------- */

  return (
    <div className="image-page">
      <div className="image-card">

        {/* HEADER */}
        <div className="image-header">
          <h2>Image Master</h2>

          <div className="image-header-actions">
            <input
              placeholder="Search image..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />

            <button className="image-btn-primary" onClick={handleAdd}>
              <Plus size={16} /> Add Image
            </button>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="meal-filters">
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="saas-select"
          >
            <option value={10}>Show 10</option>
            <option value={25}>Show 25</option>
          </select>
        </div>

        {/* TABLE */}
        <table className="saas-table image-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Preview</th>
              <th>Active</th>
              <th>Actions</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-state">
                  No images found
                </td>
              </tr>
            ) : (
              paginatedData.map((img, i) => (
                <tr key={i}>
                  <td className="image-name">{img.name}</td>

                  <td>
                    <img
                      src={img.image}
                      alt={img.name}
                      className="image-preview"
                    />
                  </td>

                  <td>
                    <input type="checkbox" checked={img.active} readOnly />
                  </td>

                  <td>
                    <div className="image-actions">
                      <button
                        className="image-btn-status"
                        onClick={() => handleEdit(img)}
                      >
                        <Pencil size={14} /> Edit
                      </button>
                    </div>
                  </td>

                  <td>
                    <button className="image-btn-danger" onClick={handleConfirmDelete}>
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* MODAL */}
      <WallpaperModal
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
