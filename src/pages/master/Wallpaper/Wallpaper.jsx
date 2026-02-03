import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import "./Wallpaper.css";

const images = [
  {
    name: "BEST",
    image: "https://picsum.photos/220/140?1",
    active: true,
  },
  {
    name: "BEST 1",
    image: "https://picsum.photos/220/140?2",
    active: false,
  },
  {
    name: "Kerala",
    image: "https://picsum.photos/220/140?3",
    active: false,
  },
];

export default function Wallpaper() {
  const [search, setSearch] = useState("");

  return (
    <div className="image-page">
      <div className="image-card">

        {/* HEADER */}
        <div className="image-header">
          <h2>Image Master</h2>

          <div className="header-actions">
            <input
              placeholder="Search image..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button className="btn primary">
              <Plus size={16} /> Add Image
            </button>
          </div>
        </div>

        {/* TABLE */}
        <table className="saas-table image-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Preview</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {images
              .filter(i =>
                i.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((img, i) => (
                <tr key={i}>
                  <td className="name">{img.name}</td>

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

                  <td className="actions">
                    <button className="btn-small">Update Status</button>
                    <button className="btn-small danger">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
