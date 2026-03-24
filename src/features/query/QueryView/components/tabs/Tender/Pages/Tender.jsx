import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://192.168.1.74:8000/api";

const Tender = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ FETCH LIST
  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API_BASE}/itinerary/list`, {
        params: { user_id: 83 },
      });

      setData(res.data?.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ CREATE
  const handleCreate = async () => {
    try {
      await axios.post(`${API_BASE}/itinerary/store/83`, {
        queryId: 7,
        name: "New Tour Package",
        startDate: "2026-04-01",
        endDate: "2026-04-05",
        noOfDays: 5,
        adult: 2,
        child: 1,
        notes: "New created trip",
        user_id: 83,
        destinationId: 18,
      });

      fetchData();
    } catch (err) {
      console.error("Create error:", err);
    }
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this itinerary?")) return;

    try {
      await axios.delete(`${API_BASE}/itinerary/delete/${id}`);
      fetchData();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div style={{ padding: "16px" }}>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <h2 style={{ fontSize: "16px", margin: 0 }}>Itineraries</h2>

        <button
          onClick={handleCreate}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "6px 12px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          + Create
        </button>
      </div>

      {/* TABLE */}
      <div
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          overflow: "hidden",
          background: "#fff",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 2fr 1fr 1fr 2fr 1fr",
            padding: "8px",
            background: "#f8fafc",
            fontSize: "12px",
            fontWeight: "600",
            color: "#64748b",
          }}
        >
          <div>Name</div>
          <div>Dates</div>
          <div>Days</div>
          <div>People</div>
          <div>Notes</div>
          <div style={{ textAlign: "right" }}>Actions</div>
        </div>

        {/* BODY */}
        {loading ? (
          <p style={{ padding: "10px" }}>Loading...</p>
        ) : data.length === 0 ? (
          <p style={{ padding: "10px" }}>No data found</p>
        ) : (
          data.map((item) => (
            <div
              key={item.id}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 2fr 1fr 1fr 2fr 1fr",
                padding: "8px",
                borderTop: "1px solid #e2e8f0",
                fontSize: "12px",
                alignItems: "center",
              }}
            >
              <div>{item.name}</div>

              <div>
                {item.startDate} → {item.endDate}
              </div>

              <div>{item.noOfDays}</div>

              <div>
                👨 {item.adult} / 🧒 {item.child}
              </div>

              <div>{item.notes}</div>

              <div style={{ textAlign: "right" }}>
                <button style={{ marginRight: "6px" }}>View</button>

                <button style={{ marginRight: "6px" }}>Edit</button>

                <button
                  onClick={() => handleDelete(item.id)}
                  style={{ color: "red" }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Tender;