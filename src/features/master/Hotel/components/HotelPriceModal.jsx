import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import "./HotelPriceModal.css";

const EMPTY_PRICE = {
  fromDate:          "",
  toDate:            "",
  mealPlan:          "",
  roomType:          "",
  singlePrice:       "",
  doublePrice:       "",
  extraAdult:        "",
  childWithBed:      "",
  childWithoutBed:   "",
};

const validate = (key, value, form) => {
  switch (key) {
    case "fromDate":
      if (!value) return "From date is required.";
      return "";
    case "toDate":
      if (!value) return "To date is required.";
      if (form.fromDate && value < form.fromDate) return "To date must be after from date.";
      return "";
    case "mealPlan":
      if (!value) return "Meal plan is required.";
      return "";
    case "roomType":
      if (!value) return "Room type is required.";
      return "";
    case "singlePrice":
      if (value === "" || value === undefined) return "Single price is required.";
      if (isNaN(value) || Number(value) < 0) return "Enter a valid positive amount.";
      return "";
    case "doublePrice":
      if (value === "" || value === undefined) return "Double price is required.";
      if (isNaN(value) || Number(value) < 0) return "Enter a valid positive amount.";
      return "";
    case "extraAdult":
    case "childWithBed":
    case "childWithoutBed":
      if (value !== "" && (isNaN(value) || Number(value) < 0))
        return "Enter a valid positive amount.";
      return "";
    default:
      return "";
  }
};

const REQUIRED = ["fromDate", "toDate", "mealPlan", "roomType", "singlePrice", "doublePrice"];

export default function HotelPriceModal({
  open,
  onClose,
  hotel,
  mealplan = [],
  roomType = [],
  onSave,
}) {
  const [form, setForm]       = useState(EMPTY_PRICE);
  const [touched, setTouched] = useState({});
  const [errors, setErrors]   = useState({});
  const [isSaving, setIsSaving] = useState(false);

  /* Reset on open */
  useEffect(() => {
    if (open) {
      setForm(EMPTY_PRICE);
      setTouched({});
      setErrors({});
      setIsSaving(false);
    }
  }, [open]);

  /* Escape key */
  useEffect(() => {
    if (!open) return;
    const handler = (e) => e.key === "Escape" && !isSaving && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose, isSaving]);

  if (!open) return null;

  const set = (key, val) => {
    const updated = { ...form, [key]: val };
    setForm(updated);
    if (touched[key]) {
      setErrors((prev) => ({ ...prev, [key]: validate(key, val, updated) }));
    }
  };

  const handleBlur = (key) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: validate(key, form[key], form) }));
  };

  const handleSave = async () => {
    const newTouched = REQUIRED.reduce((acc, k) => ({ ...acc, [k]: true }), {});
    const newErrors  = REQUIRED.reduce(
      (acc, k) => ({ ...acc, [k]: validate(k, form[k], form) }),
      {}
    );
    /* Also validate optional numeric fields if filled */
    ["extraAdult", "childWithBed", "childWithoutBed"].forEach((k) => {
      if (form[k] !== "") {
        newErrors[k]  = validate(k, form[k], form);
        newTouched[k] = true;
      }
    });

    setTouched(newTouched);
    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    try {
      setIsSaving(true);
      if (onSave) await onSave({ hotelId: hotel?.id, ...form });
      onClose();
    } catch (err) {
      console.error("Price save error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const hasErrors = REQUIRED.some((k) => validate(k, form[k], form) !== "");

  return (
    <>
      {/* Backdrop */}
      <div className="price-modal-overlay" onClick={() => !isSaving && onClose()} />

      <div className="price-modal-container">

        {/* HEADER */}
        <div className="price-modal-header">
          <div>
            <h2>Update Hotel Pricing</h2>
            <p>{hotel?.name ?? "—"}</p>
          </div>
          <button
            className="price-modal-close"
            onClick={() => !isSaving && onClose()}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="price-modal-body">
          <div className="price-grid">

            {/* From Date */}
            <div className="price-field">
              <label>From Date *</label>
              <input
                type="date"
                className={touched.fromDate && errors.fromDate ? "price-input-error" : ""}
                value={form.fromDate}
                onChange={(e) => set("fromDate", e.target.value)}
                onBlur={() => handleBlur("fromDate")}
              />
              {touched.fromDate && errors.fromDate && (
                <p className="price-field-error">{errors.fromDate}</p>
              )}
            </div>

            {/* To Date */}
            <div className="price-field">
              <label>To Date *</label>
              <input
                type="date"
                className={touched.toDate && errors.toDate ? "price-input-error" : ""}
                value={form.toDate}
                onChange={(e) => set("toDate", e.target.value)}
                onBlur={() => handleBlur("toDate")}
              />
              {touched.toDate && errors.toDate && (
                <p className="price-field-error">{errors.toDate}</p>
              )}
            </div>

            {/* Meal Plan */}
            <div className="price-field">
              <label>Meal Plan *</label>
              <select
                className={touched.mealPlan && errors.mealPlan ? "price-input-error" : ""}
                value={form.mealPlan}
                onChange={(e) => set("mealPlan", e.target.value)}
                onBlur={() => handleBlur("mealPlan")}
              >
                <option value="">Select Meal Plan</option>
                {mealplan.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
              {touched.mealPlan && errors.mealPlan && (
                <p className="price-field-error">{errors.mealPlan}</p>
              )}
            </div>

            {/* Room Type */}
            <div className="price-field">
              <label>Room Type *</label>
              <select
                className={touched.roomType && errors.roomType ? "price-input-error" : ""}
                value={form.roomType}
                onChange={(e) => set("roomType", e.target.value)}
                onBlur={() => handleBlur("roomType")}
              >
                <option value="">Select Room Type</option>
                {roomType.map((r) => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
              {touched.roomType && errors.roomType && (
                <p className="price-field-error">{errors.roomType}</p>
              )}
            </div>

            {/* Single Price */}
            <div className="price-field">
              <label>Single Price *</label>
              <input
                type="number"
                min="0"
                className={touched.singlePrice && errors.singlePrice ? "price-input-error" : ""}
                value={form.singlePrice}
                onChange={(e) => set("singlePrice", e.target.value)}
                onBlur={() => handleBlur("singlePrice")}
                placeholder="0.00"
              />
              {touched.singlePrice && errors.singlePrice && (
                <p className="price-field-error">{errors.singlePrice}</p>
              )}
            </div>

            {/* Double Price */}
            <div className="price-field">
              <label>Double Price *</label>
              <input
                type="number"
                min="0"
                className={touched.doublePrice && errors.doublePrice ? "price-input-error" : ""}
                value={form.doublePrice}
                onChange={(e) => set("doublePrice", e.target.value)}
                onBlur={() => handleBlur("doublePrice")}
                placeholder="0.00"
              />
              {touched.doublePrice && errors.doublePrice && (
                <p className="price-field-error">{errors.doublePrice}</p>
              )}
            </div>

            {/* Extra Adult */}
            <div className="price-field">
              <label>Extra Adult</label>
              <input
                type="number"
                min="0"
                className={touched.extraAdult && errors.extraAdult ? "price-input-error" : ""}
                value={form.extraAdult}
                onChange={(e) => set("extraAdult", e.target.value)}
                onBlur={() => handleBlur("extraAdult")}
                placeholder="0.00"
              />
              {touched.extraAdult && errors.extraAdult && (
                <p className="price-field-error">{errors.extraAdult}</p>
              )}
            </div>

            {/* Child With Bed */}
            <div className="price-field">
              <label>Child With Bed</label>
              <input
                type="number"
                min="0"
                className={touched.childWithBed && errors.childWithBed ? "price-input-error" : ""}
                value={form.childWithBed}
                onChange={(e) => set("childWithBed", e.target.value)}
                onBlur={() => handleBlur("childWithBed")}
                placeholder="0.00"
              />
              {touched.childWithBed && errors.childWithBed && (
                <p className="price-field-error">{errors.childWithBed}</p>
              )}
            </div>

            {/* Child Without Bed */}
            <div className="price-field">
              <label>Child Without Bed</label>
              <input
                type="number"
                min="0"
                className={touched.childWithoutBed && errors.childWithoutBed ? "price-input-error" : ""}
                value={form.childWithoutBed}
                onChange={(e) => set("childWithoutBed", e.target.value)}
                onBlur={() => handleBlur("childWithoutBed")}
                placeholder="0.00"
              />
              {touched.childWithoutBed && errors.childWithoutBed && (
                <p className="price-field-error">{errors.childWithoutBed}</p>
              )}
            </div>

          </div>
        </div>

        {/* FOOTER */}
        <div className="price-modal-footer">
          <button
            className="cancel-btn"
            onClick={() => !isSaving && onClose()}
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            className="save-btn"
            onClick={handleSave}
            disabled={isSaving || hasErrors}
          >
            {isSaving ? (
              <span className="price-spinner-wrap">
                <span className="price-spinner" />
                Saving…
              </span>
            ) : (
              "Save Price"
            )}
          </button>
        </div>

      </div>
    </>
  );
}