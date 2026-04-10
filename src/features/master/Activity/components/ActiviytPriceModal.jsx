import React, { useEffect, useState } from "react";
import "./ActivityPriceModal.css";
import { useAuth } from "@/core/auth/AuthProvider";
import {
  getActivityRateList,
  addActivityRate,
  updateActivityRate,
  getActivitySuppliers,
} from "../services/ActivityService";

const ActivityPriceModal = ({ activityId, onClose }) => {
  const { user } = useAuth();
  const userId = user?.id;

  const [activity, setActivity] = useState(null);
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [supplierList, setSupplierList] = useState([]);

  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    supplierId: "",
    adult: "",
    child: "",
    child2: "",
    vehicleId: 3,
    vehicleCost: 1,
  });

  const [editId, setEditId] = useState(null);

  /* ---------------- FETCH ---------------- */

  const fetchSuppliers = async () => {
    if (!userId) return;
    try {
      const res = await getActivitySuppliers(userId);
      if (res?.status) {
        setSupplierList(res.data || []);
      }
    } catch (err) {
      console.error("Supplier fetch error:", err);
    }
  };

  const fetchRates = async () => {
    if (!activityId) return;
    setLoading(true);
    try {
      const res = await getActivityRateList(Number(activityId));
      if (res?.status) {
        setActivity(res.data.activity);
        setRates(res.data.rates || []);
        console.log("rates data:", res.data.rates); 
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    fetchSuppliers();
  }, [activityId, userId]);

  /* ---------------- HELPERS ---------------- */

  // Safely extract supplier display name regardless of shape
  const getSupplierName = (supplier) => {
    if (!supplier) return "-";
    if (typeof supplier === "object") {
      return supplier.company ?? `${supplier.firstName ?? ""} ${supplier.lastName ?? ""}`.trim() ?? "-";
    }
    // supplier is a string — try to match from list
    const match = supplierList.find(
      (s) =>
        s.company?.toLowerCase() === supplier.toLowerCase() ||
        `${s.firstName} ${s.lastName}`.toLowerCase() === supplier.toLowerCase()
    );
    return match?.company ?? supplier;
  };

  // Resolve supplierId from a rate item (handles object or string supplier)
  const resolveSupplierId = (item) => {
    if (typeof item.supplier === "object" && item.supplier?.supplierId) {
      return item.supplier.supplierId;
    }
    const supplierName = typeof item.supplier === "object"
      ? item.supplier?.company
      : item.supplier;

    const match = supplierList.find(
      (s) =>
        s.company?.toLowerCase() === supplierName?.toLowerCase() ||
        `${s.firstName} ${s.lastName}`.toLowerCase() === supplierName?.toLowerCase()
    );
    return match?.id ?? "";
  };

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      startDate: "",
      endDate: "",
      supplierId: "",
      adult: "",
      child: "",
      child2: "",
      vehicleId: 3,
      vehicleCost: 1,
    });
    setEditId(null);
  };

 const handleSubmit = async () => {
  if (!userId) return;

  const payload = {
    ...form,
    parentId: Number(activityId),
    status: 1,
    adult: Number(form.adult),
    child: Number(form.child),
    child2: Number(form.child2 || 0),
  };

  try {
    if (editId) {
      await updateActivityRate(editId, activityId, payload); // ✅ rateId, activityId
    } else {
      await addActivityRate(userId, payload);
    }
    resetForm();
    fetchRates();
  } catch (err) {
    console.error(err);
  }
};

  const handleEdit = (item) => {
    console.log("editing item:", item);
    setEditId(item.id);
    setForm({
      startDate: item.from,
      endDate: item.to,
      supplierId: resolveSupplierId(item),
      adult: item.adult,
      child: item.child,
      child2: item.child2 || "",
      vehicleId: 3,
      vehicleCost: 1,
    });
  };

  /* ---------------- RENDER ---------------- */

  return (
    <div className="arm__overlay">
      <div className="arm__card">

        {/* HEADER */}
        <div className="arm__header">
          <span>{activity?.activity_name || "Rates"}</span>
          <span className="arm__close" onClick={onClose}>✕</span>
        </div>

        {/* BODY */}
        <div className="arm__body">

          {/* FORM */}
          <div className="row g-3 align-items-end">

            <div className="col-md-2">
              <label className="arm__label">From</label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                className="form-control arm__input"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-2">
              <label className="arm__label">To</label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                className="form-control arm__input"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-2">
              <label className="arm__label">Supplier</label>
              <select
                name="supplierId"
                value={form.supplierId}
                className="form-select arm__input"
                onChange={handleChange}
              >
                <option value="">Select</option>
                {supplierList.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.company || `${s.firstName} ${s.lastName}`}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-2">
              <label className="arm__label">Adult</label>
              <input
                type="number"
                name="adult"
                value={form.adult}
                className="form-control arm__input"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-2">
              <label className="arm__label">Child</label>
              <input
                type="number"
                name="child"
                value={form.child}
                className="form-control arm__input"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-2">
              <button className="arm__btn w-100" onClick={handleSubmit}>
                {editId ? "Update" : "Add"}
              </button>
            </div>

          </div>

          {/* TABLE */}
          <div className="table-responsive mt-3">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="arm__table">
                <thead>
                  <tr>
                    <th>Supplier</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Adult</th>
                    <th>Child</th>
                    <th>Edit</th>
                  </tr>
                </thead>

                <tbody>
                  {rates.length > 0 ? (
                    rates.map((item) => (
                      <tr key={item.id}>
                        <td>{getSupplierName(item.supplier)}</td>
                        <td>{item.from}</td>
                        <td>{item.to}</td>
                        <td>{item.adult}</td>
                        <td>{item.child}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleEdit(item)}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="arm__empty">
                        No rates found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ActivityPriceModal;