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
  getHotelById,
} from "../services/HotelService";
import { getDestinations } from "@/features/master/Destination/services/DestinationService";
import { getMealPlans } from "../../MealPlan/services/MealPlanService";
import { getRoomTypes } from "../../RoomType/services/RoomService";
import HotelPriceModal from "../components/HotelPriceModal";

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString();
}

function parseAmenities(raw) {
  if (!raw || raw === 0) return [];
  if (Array.isArray(raw)) return raw;
  return String(raw).split(",").map((s) => s.trim()).filter(Boolean);
}

const EMPTY_FORM = {
  name: "",
  hotelType: "",
  destination: "",
  hotel_number: "",
  status: 1,
  address: "",
  details: "",
  contactPerson: "",
  contactPersonPhone: "",
  contactPersonEmail: "",
  alternateEmail: "",
  roomType: "",
  mealType: "",
  amenities: [],
  hotelPhoto: null,
  existingPhoto: null,
};

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
  const [priceModalOpen, setPriceModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

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
        destination:        item.destination         ?? "",
        hotelPhoto:         item.hotelPhoto          ?? null,
        hotelType:          item.hotelType           ?? "",
        status:             item.status === 1 ? "Active" : "Inactive",
        address:            item.address             ?? "",
        details:            item.details             ?? "",
        contactPerson:      item.contactPerson       ?? "",
        contactPersonPhone: item.contactPersonPhone  ?? "",
        contactPersonEmail: item.contactPersonEmail  ?? "",
        alternateEmail:     item.alternateEmail      ?? "",
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

  const handleAdd = () => {
    setIsEdit(false);
    setFormData(EMPTY_FORM);
    setModalOpen(true);
  };

  const handleEdit = async (item) => {
    try {
      setIsEdit(true);
      const res = await getHotelById(Number(item.id));
      const d = res.data;

      setFormData({
        id:                 d.id,
        name:               d.name                ?? "",
        hotelType:          Number(d.hotelType)   || "",
        destination:        Number(d.destination) || "",
        hotel_number:       d.hotel_number        ?? "",
        status:             d.status              ?? 1,
        address:            d.address             ?? "",
        details:            d.details             ?? "",
        contactPerson:      d.contactPerson       ?? "",
        contactPersonPhone: d.contactPersonPhone  ?? "",
        contactPersonEmail: d.contactPersonEmail  ?? "",
        alternateEmail:     d.alternateEmail      ?? "",
        roomType:           Number(d.roomType)    || "",
        mealType:           Number(d.mealType)    || "",
        amenities:          parseAmenities(d.amenities),
        hotelPhoto:         null,
        existingPhoto:      d.hotelPhoto          ?? null,
      });
      setModalOpen(true);
    } catch (err) {
      console.error("Edit error:", err);
      alert("Failed to load hotel data");
    }
  };

  const handleSave = async (fd) => {
    try {
      if (isEdit) {
        await updateHotel(user.id, formData.id, fd); // ✅ userId + hotelId
        alert("Hotel updated successfully");
      } else {
        await createHotel(user.id, fd);
        alert("Hotel created successfully");
      }
      setModalOpen(false);
      fetchHotels(user.id);
    } catch (err) {
      console.error("Save error:", err?.response?.data || err);
      alert("Something went wrong. Please try again.");
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

  const handlePriceUpdate = (hotel) => {
  setSelectedHotel(hotel);
  setPriceModalOpen(true);
};

  const filteredData = useMemo(
    () => data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    ),
    [search, data]
  );

  const totalPages    = Math.ceil(filteredData.length / pageSize);
  const startIndex    = (page - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  return (
    <div className="hotel-page">
      <div className="hotel-card">

        <div className="hotel-header">
          <h2>Hotel List</h2>
          <button className="hotel-btn-primary" onClick={handleAdd}>
            <Plus size={16} /> Add Hotel
          </button>
        </div>

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
                    <td>{item.hotelType || "—"}</td>
                    <td>
                      {destinations.find((d) => d.value === item.destination)?.label
                        || item.destination
                        || "—"}
                    </td>
                    <td>
                      <span className={`hotel-status ${item.status === "Active" ? "hotel-active" : "hotel-inactive"}`}>
                        {item.status}
                      </span>
                    </td>
                    <td><div className="hotel-user">{item.by}</div></td>
                    <td>{item.date}</td>
                    <td>
                     <td>
  <div className="hotel-actions">
    <button onClick={() => handleEdit(item)}>
      <Pencil size={14} />
    </button>

    <button
      className="hotel-price-btn"
      onClick={() => handlePriceUpdate(item)}
    >
      Price
    </button>

    <button
      className="danger"
      onClick={() => handleDelete(item)}
    >
      <Trash2 size={14} />
    </button>
  </div>
</td>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

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
      <HotelPriceModal
  open={priceModalOpen}
  onClose={() => setPriceModalOpen(false)}
  hotel={selectedHotel}
/>
    </div>
  );
};

export default Hotel;