import { useState } from "react";
import "./ItineraryBuild.css";

import AccommodationForm from "./ActivityForm/AccommodationForm";
import ActivityForm from "./ActivityForm/ActivityForm";
import SightseeingForm from "./ActivityForm/SightseeingForm";
import TransportationForm from "./ActivityForm/TransportationForm";
import AddonsForm from "./ActivityForm/AddonsForm";
import InsuranceVisaForm from "./ActivityForm/InsuranceVisaForm";
import MealForm from "./ActivityForm/MealForm";
import FlightForm from "./ActivityForm/FlightForm";
import LeisureForm from "./ActivityForm/LeisureForm";
import CruiseForm from "./ActivityForm/CruiseForm";

export default function ItineraryBuild() {
  const [showSelector, setShowSelector] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedDayId, setSelectedDayId] = useState(null);

  // ✅ STATE
  const [days, setDays] = useState([
    {
      id: 1,
      day: 1,
      date: "21 DEC",
      activities: ["Airport Pickup", "Hotel Check-in", "Sightseeing"],
    },
  ]);

  // ✅ ADD DAY
  const handleAddDay = () => {
    const newDayNumber = days.length + 1;

    const newDay = {
      id: Date.now(),
      day: newDayNumber,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      }).toUpperCase(),
      activities: [],
    };

    setDays([...days, newDay]);
  };

  // ✅ ADD ACTIVITY
  const handleAddActivity = (type) => {
    const updatedDays = days.map((day) =>
      day.id === selectedDayId
        ? { ...day, activities: [...day.activities, type] }
        : day
    );

    setDays(updatedDays);
  };

  return (
    <div className="build-wrapper">
      {/* HEADER */}
      <div className="build-header">
        <h3>Itinerary Timeline</h3>
        <button className="add-day-btn" onClick={handleAddDay}>
          + Add Day
        </button>
      </div>

      {/* DAY SECTION */}
      {days.map((day) => (
        <div key={day.id} className="day-row">
          <div className="day-left">
            <div className="day-badge">
              <span className="day-number">Day {day.day}</span>
              <span className="day-date">{day.date}</span>
            </div>
          </div>

          <div className="day-right">
            <div className="activity-container">
              {day.activities.map((activity, index) => (
                <div key={index} className="activity-card">
                  <div className="activity-icon">✈️</div>
                  <p>{activity}</p>
                </div>
              ))}

              <button
                className="add-activity"
                onClick={() => {
                  setSelectedDayId(day.id);
                  setShowSelector(true);
                }}
              >
                + Add Activity
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* SELECTOR DRAWER */}
      {showSelector && (
        <div
          className="selector-overlay"
          onClick={() => setShowSelector(false)}
        >
          <div
            className="selector-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="selector-header">
              <h4>Select Activity Type</h4>
              <button onClick={() => setShowSelector(false)}>✕</button>
            </div>

            <div className="selector-list">
              {[
                { label: "🏨 Accommodation", key: "accommodation" },
                { label: "🎯 Activity", key: "activity" },
                { label: "👀 Sightseeing", key: "sightseeing" },
                { label: "🚗 Transportation", key: "transportation" },
                { label: "➕ Addons", key: "addons" },
                { label: "🛂 Insurance / Visa", key: "Insurance/Visa" },
                { label: "🍽 Meal", key: "Meal" },
                { label: "✈ Flight", key: "Flight" },
                { label: "🎉 Leisure", key: "Leisure" },
                { label: "🚢 Cruise", key: "Cruise" },
              ].map((item) => (
                <div
                  key={item.key}
                  className="selector-item"
                  onClick={() => {
                    setShowSelector(false);
                    setActiveModal(item.key);
                    handleAddActivity(item.label);
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODALS */}
      {activeModal === "accommodation" && (
        <AccommodationForm onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "activity" && (
        <ActivityForm onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "sightseeing" && (
        <SightseeingForm onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "transportation" && (
        <TransportationForm onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "addons" && (
        <AddonsForm onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "Insurance/Visa" && (
        <InsuranceVisaForm onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "Meal" && (
        <MealForm onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "Flight" && (
        <FlightForm onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "Leisure" && (
        <LeisureForm onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "Cruise" && (
        <CruiseForm onClose={() => setActiveModal(null)} />
      )}
    </div>
  );
}