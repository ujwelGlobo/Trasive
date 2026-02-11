import React from "react";
import { X, Upload } from "lucide-react";
import Select from "react-select";
import "./Wallpaper.css";

const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

const Typeactions = [
  { value: "ReportWallpaper", label: "ReportWallpaper" },
  { value: "InReportWallpaper", label: "InReportWallpaper" },
];

const WallpaperModal = ({
  open,
  onClose,
  onSave,
  formData,
  setFormData,
  isEdit,
}) => {
  if (!open) return null;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({
      ...formData,
      image: file,
      preview: URL.createObjectURL(file),
    });
  };

  return (
    <div className="wallpaper-modal-overlay">
      <div className="wallpaper-modal-card">
        {/* Header */}
        <div className="wallpaper-modal-header">
          <h3>{isEdit ? "Edit Image" : "Add Image"}</h3>
          <button className="wallpaper-modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="wallpaper-modal-divider" />

        {/* Body */}
        <div className="wallpaper-modal-body">
          {/* Name */}
          <div className="wallpaper-modal-group">
            <label>Image Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter image name"
            />
          </div>
          

          {/* Upload */}
          <div className="wallpaper-modal-group">
            <label>Upload Image *</label>

            <label className="wallpaper-upload-box">
              {formData.preview ? (
                <img
                  src={formData.preview}
                  alt="Preview"
                  className="wallpaper-upload-preview"
                />
              ) : (
                <div className="wallpaper-upload-placeholder">
                  <Upload size={22} />
                  <p>Click to upload image</p>
                  <span>PNG, JPG up to 5MB</span>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
            </label>
          </div>

          {/* Status */}
          <div className="wallpaper-modal-group">
            <label>Type</label>
            <Select
              classNamePrefix="wallpaper-select"
              options={Typeactions}
              value={Typeactions.find(
                (opt) => opt.value === formData.status
              )}
              onChange={(selected) =>
                setFormData({ ...formData, status: selected.value })
              }
              isSearchable={false}
              menuPortalTarget={document.body}
              menuPosition="fixed"
              styles={{
                menuPortal: (base) => ({
                  ...base,
                  zIndex: 9999,
                }),
              }}
            />
          </div>

          <div className="wallpaper-modal-group">
            <label>Status</label>
            <Select
              classNamePrefix="wallpaper-select"
              options={statusOptions}
              value={statusOptions.find(
                (opt) => opt.value === formData.status
              )}
              onChange={(selected) =>
                setFormData({ ...formData, status: selected.value })
              }
              isSearchable={false}
              menuPortalTarget={document.body}
              menuPosition="fixed"
              styles={{
                menuPortal: (base) => ({
                  ...base,
                  zIndex: 9999,
                }),
              }}
            />
          </div>


        </div>

        <div className="wallpaper-modal-divider" />

        {/* Footer */}
        <div className="wallpaper-modal-footer">
          <button className="wallpaper-btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="wallpaper-btn-save" onClick={onSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default WallpaperModal;
