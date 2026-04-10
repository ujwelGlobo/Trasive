import { useState, useEffect } from "react";
import { Plus, Download, Upload, Pencil,Trash2 } from "lucide-react";
import "./Activity.css";
import ActivityModal from "../components/ActivityModal";
import { useAuth } from "@/core/auth/AuthProvider";
import {
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity
} from "../services/ActivityService";
import ActivityPriceModal from "@/features/master/Activity/components/ActiviytPriceModal";

const getPhotoUrl = (photo) => {
  if (!photo) return null;
  const lastHttp = photo.lastIndexOf("http", photo.length - 5);
  return lastHttp > 0 ? photo.slice(lastHttp) : photo;
};

export default function Activity() {
  const { user } = useAuth();

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rateModalOpen, setRateModalOpen] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState(null);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [formData, setFormData] = useState({
    activity_name: "",
    destination_name: "",
    activity_details: "",
    activity_photo: null,
    status: 1,
  });

  /* ---------------- FETCH ---------------- */

  const fetchActivities = async () => {
    if (!user?.id) return;
    setLoading(true);
    setError(null);
    try {
      const json = await getActivities(user.id);
      if (json.status) {
        setActivities(json.data);
      } else {
        setError("Failed to load activities.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [user?.id]);

  /* ---------------- ACTIONS ---------------- */

  const handleAdd = () => {
    setIsEdit(false);
    setFormData({
      activity_name: "",
      destination_name: "",
      activity_details: "",
      activity_photo: null,
      status: 1,
    });
    setModalOpen(true);
  };

  const handleEdit = (item) => {
    setIsEdit(true);
    setFormData(item);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this activity?")) return;
  try {
    await deleteActivity(id);
    fetchActivities();
  } catch (error) {
    console.error("Error deleting activity:", error?.response?.data || error);
  }
};

  const handleSave = async () => {
    if (!formData.activity_name?.trim()) return;

    const userId = user?.id;
    if (!userId) return;

    try {
      const payload = new FormData();
      payload.append("activity_name", formData.activity_name);
      payload.append("destination_name", formData.destination_name ?? "");
      payload.append("activity_details", formData.activity_details ?? "");
      payload.append("status", formData.status ?? 1);

      if (!isEdit) {
        payload.append("user_id", userId);
        payload.append("workspace_id", user?.workspaceId ?? "");
        payload.append("supplierId", 0);
        if (formData.activity_photo instanceof File) {
          payload.append(
            "activity_photo",
            formData.activity_photo,
            formData.activity_photo.name
          );
        }
        await createActivity(userId, payload);
      } else {
        if (formData.activity_photo instanceof File) {
          payload.append(
            "activity_photo",
            formData.activity_photo,
            formData.activity_photo.name
          );
        }
        await updateActivity(userId, formData.id, payload); // ✅ fixed
      }

      setModalOpen(false);
      fetchActivities();
    } catch (error) {
      console.error("Error saving activity:", error?.response?.data || error);
    }
  };

  /* ---------------- RATE MODAL ---------------- */

  const handleOpenRateModal = (activityId) => {
    setSelectedActivityId(activityId);
    setRateModalOpen(true);
  };

  /* ---------------- FILTER + PAGINATION ---------------- */

  const filteredData = activities.filter((a) =>
    a.activity_name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  /* ---------------- RENDER ---------------- */

  return (
    <div className="act__page">
      {/* HEADER */}
      <div className="act__header">
        <div>
          <h2>Activities</h2>
          <p>Manage all tour activities</p>
        </div>

        <div className="act__header-actions">
          <button className="act__btn act__btn--ghost">
            <Download size={16} /> Download
          </button>
          <button className="act__btn act__btn--ghost">
            <Upload size={16} /> Import
          </button>
          <button className="act__btn act__btn--primary" onClick={handleAdd}>
            <Plus size={16} /> Add Activity
          </button>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="act__filters">
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1);
          }}
          className="act__select"
        >
          <option value={10}>Show 10</option>
          <option value={25}>Show 25</option>
        </select>

        <input
          type="text"
          placeholder="Search activities..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="act__search-input"
        />
      </div>

      {/* TABLE CARD */}
      <div className="act__card">
        <div className="act__toolbar">
          <span>Total Records: {filteredData.length}</span>
        </div>

        {loading ? (
          <div className="act__state-msg">Loading activities...</div>
        ) : error ? (
          <div className="act__state-msg act__state-msg--error">{error}</div>
        ) : (
          <table className="act__table">
            <thead>
              <tr>
                <th>Activity</th>
                <th>Destination</th>
                <th>Status</th>
                <th>Date Added</th>
                <th>Edit</th>
                <th>Delete</th>
                <th>Rates</th>
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="act__activity-info">
                      {getPhotoUrl(item.activity_photo) ? (
                        <img
                          src={getPhotoUrl(item.activity_photo)}
                          alt={item.activity_name}
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        className="act__activity-placeholder"
                        style={{
                          display: getPhotoUrl(item.activity_photo)
                            ? "none"
                            : "flex",
                        }}
                      >
                        {item.activity_name?.charAt(0) ?? "A"}
                      </div>
                      <span>{item.activity_name}</span>
                    </div>
                  </td>

                  <td>{item.destination_name ?? "—"}</td>

                  <td>
                    <span
                      className={`act__status ${
                        item.status === 1
                          ? "act__status--active"
                          : "act__status--inactive"
                      }`}
                    >
                      {item.status === 1 ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td>
                    {item.dateadded
                      ? new Date(item.dateadded).toLocaleDateString("en-GB")
                      : "—"}
                  </td>

                  <td>
                    <button
                      className="act__edit-btn"
                      onClick={() => handleEdit(item)}
                    >
                      <Pencil size={16} />
                    </button>
                  </td>

                  <td>
  <button
    className="act__edit-btn act__edit-btn--danger"
    onClick={() => handleDelete(item.id)}
  >
    <Trash2 size={16} />
  </button>
</td>

                  <td>
                    <button
                      className="act__edit-btn"
                      onClick={() => handleOpenRateModal(item.id)}
                    >
                      Rates
                    </button>
                  </td>
                </tr>
              ))}

              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan="6" className="act__empty">
                    No activities found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="act__pagination">
            <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
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

      {/* MODALS */}
      {modalOpen && (
        <ActivityModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          formData={formData}
          setFormData={setFormData}
          isEdit={isEdit}
        />
      )}

      {rateModalOpen && (
        <ActivityPriceModal
          activityId={selectedActivityId}
          onClose={() => setRateModalOpen(false)}
        />
      )}
    </div>
  );
}