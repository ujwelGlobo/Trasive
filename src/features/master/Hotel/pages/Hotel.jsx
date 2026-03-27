import React, { useState, useMemo, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import "./Hotel.css";
import HotelModal from "../components/HotelModal";
import { useAuth } from "@/core/auth/AuthProvider";
import {
  getHotels,
  createHotel,
  updateHotel,
  deleteHotel,
  getCategories,
} from "../services/HotelService";
import { getDestinations } from "@/features/master/Destination/services/DestinationService";
import { getMealPlans } from "../../MealPlan/services/MealPlanService";
import { getRoomTypes } from "../../RoomType/services/RoomService";

/* ────────────────────────────────────────────
   Utils
───────────────────────────────────────────── */
function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString();
}

function getAvatarLetter(str = "") {
  return String(str).charAt(0).toUpperCase() || "U";
}

/* safely convert any amenities value → string[] */
function parseAmenities(raw) {
  if (!raw || raw === 0) return [];
  if (Array.isArray(raw)) return raw;
  return String(raw).split(",").map((s) => s.trim()).filter(Boolean);
}

const EMPTY_FORM = {
  name:               "",
  category:           "",   // numeric ID
  destination:        "",   // numeric ID
  hotel_number:       "",
  status:             "Active",
  address:            "",
  details:            "",
  contactPerson:      "",
  contactPersonPhone: "",
  contactPersonEmail: "",
  alternateEmail:     "",
  company:            "",
  roomType:           "",   // numeric ID
  mealType:           "",   // numeric ID
  amenities:          [],
  hotelPhoto:         null, // ✅ matches backend field name
};

/* ════════════════════════════════════════════
   Hotel page
═════════════════════════════════════════════ */
const Hotel = () => {
  const { user } = useAuth();

  const [modalOpen, setModalOpen]       = useState(false);
  const [isEdit, setIsEdit]             = useState(false);
  const [search, setSearch]             = useState("");
  const [page, setPage]                 = useState(1);
  const [pageSize, setPageSize]         = useState(10);
  const [data, setData]                 = useState([]);
  const [loading, setLoading]           = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [categories, setCategories]     = useState([]);
  const [mealplan, setMealPlan]         = useState([]);
  const [roomType, setRoomType]         = useState([]);
  const [formData, setFormData]         = useState(EMPTY_FORM);

  /* ── fetch helpers ── */
  const fetchRoom = async (userId) => {
    try {
      const res = await getRoomTypes(userId);
      if (res?.data)
        setRoomType(res.data.map((item) => ({ value: item.id, label: item.name })));
    } catch (e) { console.error("fetchRoom:", e); }
  };

  const fetchDestinations = async (userId) => {
    try {
      const res = await getDestinations(userId);
      if (res?.data)
        setDestinations(res.data.map((item) => ({ value: item.id, label: item.name })));
    } catch (e) { console.error("fetchDestinations:", e); }
  };

  const fetchMeal = async (userId) => {
    try {
      const res = await getMealPlans(userId);
      if (res?.data)
        setMealPlan(res.data.map((item) => ({ value: item.id, label: item.name })));
    } catch (e) { console.error("fetchMeal:", e); }
  };

  const fetchCategories = async (userId) => {
    if (!userId) return;
    try {
      const res = await getCategories(userId);
      if (res?.data)
        setCategories(res.data.map((item) => ({ value: item.id, label: item.name })));
    } catch (e) { console.error("fetchCategories:", e); }
  };

  const fetchHotels = async (userId) => {
    if (!userId) return;
    try {
      setLoading(true);
      const res = await getHotels(userId);
      const formatted = res.data.map((item) => ({
        id:                 item.id,
        name:               item.name                ?? "",
        category:           Number(item.category)    || "",
        destination:        Number(item.destination) || "",
        hotelPhoto:         item.hotelPhoto          ?? null,
        hotel_number:       item.hotel_number        ?? "",
        status:             item.status === 1 ? "Active" : "Inactive",
        address:            item.address             ?? "",
        details:            item.details             ?? "",
        contactPerson:      item.contactPerson       ?? "",
        contactPersonPhone: item.contactPersonPhone  ?? "",
        contactPersonEmail: item.contactPersonEmail  ?? "",
        alternateEmail:     item.alternateEmail      ?? "",
        company:            item.company             ?? "",
        roomType:           Number(item.roomType)    || "",
        mealType:           Number(item.mealType)    || "",
        amenities:          parseAmenities(item.amenities),
        by:                 item.addedby             ?? "—",
        date:               item.dateAdded ? formatDate(item.dateAdded) : "—",
      }));
      setData(formatted);
    } catch (e) {
      console.error("fetchHotels:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.id) return;
    fetchHotels(user.id);
    fetchDestinations(user.id);
    fetchCategories(user.id);
    fetchMeal(user.id);
    fetchRoom(user.id);
  }, [user]);

  /* ── modal handlers ── */
  const handleAdd = () => {
    setIsEdit(false);
    setFormData(EMPTY_FORM);
    setModalOpen(true);
  };

  const handleEdit = (item) => {
    setIsEdit(true);
    setFormData({
      id:                 item.id,
      name:               item.name,
      category:           item.category,
      destination:        item.destination,
      hotel_number:       item.hotel_number,
      status:             item.status,
      address:            item.address,
      details:            item.details,
      contactPerson:      item.contactPerson,
      contactPersonPhone: item.contactPersonPhone,
      contactPersonEmail: item.contactPersonEmail,
      alternateEmail:     item.alternateEmail,
      company:            item.company,
      roomType:           item.roomType,
      mealType:           item.mealType,
      amenities:          Array.isArray(item.amenities) ? item.amenities : [],
      hotelPhoto:         null, // reset — can't prefill file input
    });
    setModalOpen(true);
  };

  /* ── build payload — field names match Postman exactly ── */
  const buildPayload = (userId) => ({
    name:               formData.name,
    category:           Number(formData.category)    || 0,  // ✅ numeric ID
    destination:        Number(formData.destination) || 0,  // ✅ numeric ID
    hotel_number:       formData.hotel_number,
    status:             formData.status === "Active" ? 1 : 0,
    address:            formData.address,
    details:            formData.details,
    contactPerson:      formData.contactPerson,
    contactPersonPhone: formData.contactPersonPhone,
    contactPersonEmail: formData.contactPersonEmail,
    alternateEmail:     formData.alternateEmail,
    company:            formData.company,
    roomType:           Number(formData.roomType)    || 0,  // ✅ numeric ID
    mealType:           Number(formData.mealType)    || 0,  // ✅ numeric ID
    amenities:          Array.isArray(formData.amenities)   // ✅ "Pool,Wifi,Spa"
                          ? formData.amenities.join(",")
                          : "",
    hotelPhoto:         formData.hotelPhoto ?? null,        // ✅ matches backend
    user_id:            userId,
  });

  const handleSave = async () => {
    if (!formData.name?.trim()) return;
    const userId = user?.id;
    if (!userId) return;
    try {
      if (!isEdit) {
        await createHotel(userId, buildPayload(userId));
      } else {
        await updateHotel(formData.id, buildPayload(userId));
      }
      fetchHotels(userId);
      setModalOpen(false);
    } catch (error) {
      console.error("Save hotel error:", error?.response?.data || error);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm("Delete this hotel?")) return;
    try {
      await deleteHotel(item.id);
      fetchHotels(user?.id);
    } catch (error) {
      console.error("Delete hotel error:", error?.response?.data || error);
    }
  };

  /* ── filtering & pagination ── */
  const filteredData = useMemo(
    () => data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    ),
    [search, data]
  );

  const totalPages    = Math.ceil(filteredData.length / pageSize);
  const startIndex    = (page - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  /* ── render ── */
  return (
    <div className="hotel-page">
      <div className="hotel-card">

        {/* header */}
        <div className="hotel-header">
          <h2>Hotel List</h2>
          <button className="hotel-btn-primary" onClick={handleAdd}>
            <Plus size={16} /> Add Hotel
          </button>
        </div>

        {/* toolbar */}
        <div className="hotel-toolbar">
          <select
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
          >
            <option value={10}>Show 10</option>
            <option value={25}>Show 25</option>
            <option value={50}>Show 50</option>
          </select>
          <input
            placeholder="Search hotel..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>

        {/* table */}
        <div className="hotel-table-wrapper">
          <table className="hotel-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Destination</th>
                <th>Status</th>
                <th>By</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>
                    Loading...
                  </td>
                </tr>
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>
                    No hotels found
                  </td>
                </tr>
              ) : (
                paginatedData.map((item) => (
                  <tr key={item.id || `${item.name}-${item.date}`}>

                    {/* name + photo */}
                    <td>
                      <div className="hotel-name-cell">
                        {item.hotelPhoto ? (
                          <img
                            src={
                              String(item.hotelPhoto).startsWith("http")
                                ? item.hotelPhoto
                                : `http://192.168.1.74:8000/storage/${item.hotelPhoto}`
                            }
                            alt={item.name}
                            style={{ width: 38, height: 38, objectFit: "cover", borderRadius: 8 }}
                            onError={(e) => { e.target.style.display = "none"; }}
                          />
                        ) : (
                          <div style={{
                            width: 38, height: 38, borderRadius: 8,
                            background: "#e0f2fe", color: "#0369a1",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontWeight: 700, fontSize: 14, flexShrink: 0,
                          }}>
                            {item.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span>{item.name}</span>
                      </div>
                    </td>

                    {/* resolve label from numeric ID */}
                    <td>{categories.find((c) => c.value === item.category)?.label || "—"}</td>
                    <td>{destinations.find((d) => d.value === item.destination)?.label || "—"}</td>

                    <td>
                      <span className={`hotel-status ${item.status === "Active" ? "hotel-active" : "hotel-inactive"}`}>
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <div className="hotel-user">
                        <span className="hotel-avatar">{getAvatarLetter(item.by)}</span>
                        {item.by}
                      </div>
                    </td>

                    <td>{item.date}</td>

                    <td>
                      <div className="hotel-actions">
                        <button onClick={() => handleEdit(item)}>
                          <Pencil size={14} />
                        </button>
                        <button className="danger" onClick={() => handleDelete(item)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* pagination */}
        {totalPages > 1 && (
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "14px 4px 4px", fontSize: "0.85rem", color: "#64748b",
            flexWrap: "wrap", gap: 8,
          }}>
            <span>
              Showing {startIndex + 1}–{Math.min(startIndex + pageSize, filteredData.length)} of {filteredData.length}
            </span>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button
                className="hotel-btn-secondary"
                style={{ padding: "6px 14px", fontSize: "0.8rem" }}
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Prev
              </button>
              <span>Page {page} of {totalPages}</span>
              <button
                className="hotel-btn-secondary"
                style={{ padding: "6px 14px", fontSize: "0.8rem" }}
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )}

      </div>

      <HotelModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        formData={formData}
        setFormData={setFormData}
        isEdit={isEdit}
        destinations={destinations}
        categories={categories}
        mealplan={mealplan}
        roomType={roomType}
      />
    </div>
  );
};

export default Hotel;