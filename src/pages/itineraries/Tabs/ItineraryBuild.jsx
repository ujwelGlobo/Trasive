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

const daysData = [
  {
    id: 1,
    day: 1,
    date: "21 DEC",
    activities: ["Airport Pickup", "Hotel Check-in", "Sightseeing"],
  },
];

export default function ItineraryBuild() {
  const [showSelector, setShowSelector] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  return (
    <div className="build-wrapper">
      {/* HEADER */}
      <div className="build-header">
        <h3>Itinerary Timeline</h3>
        <button className="add-day-btn">+ Add Day</button>
      </div>

      {/* DAY SECTION */}
      {daysData.map((day) => (
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
                onClick={() => setShowSelector(true)}
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
          <div className="selector-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="selector-header">
              <h4>Select Activity Type</h4>
              <button onClick={() => setShowSelector(false)}>✕</button>
            </div>

            <div className="selector-list">
              <div
                className="selector-item"
                onClick={() => {
                  setShowSelector(false);
                  setActiveModal("accommodation");
                }}
              >
                🏨 Accommodation
              </div>

              <div
                className="selector-item"
                onClick={() => {
                  setShowSelector(false);
                  setActiveModal("activity");
                }}
              >
                🎯 Activity
              </div>

              <div
                className="selector-item"
                onClick={() => {
                  setShowSelector(false);
                  setActiveModal("sightseeing"); // 👈 ADD THIS
                }}
              >
                👀 Sightseeing
              </div>
              <div
                className="selector-item"
                onClick={() => {
                  setShowSelector(false);
                  setActiveModal("transportation"); // 👈 ADD THIS
                }}
              >
                🚗 Transportation
              </div>
              <div
                className="selector-item"
                onClick={() => {
                  setShowSelector(false);
                  setActiveModal("addons"); // 👈 ADD THIS
                }}
              >
                ➕ Addons
              </div>

              <div
                className="selector-item"
                onClick={() => {
                  setShowSelector(false);
                  setActiveModal("Insurance/Visa"); // 👈 ADD THIS
                }}
              >
                🛂 Insurance / Visa
              </div>

              <div
                className="selector-item"
                onClick={() => {
                  setShowSelector(false);
                  setActiveModal("Meal"); // 👈 ADD THIS
                }}
              >
                🍽 Meal
              </div>

              <div
                className="selector-item"
                onClick={() => {
                  setShowSelector(false);
                  setActiveModal("Flight"); // 👈 ADD THIS
                }}
              >
                ✈ Flight
              </div>

              <div
                className="selector-item"
                onClick={() => {
                  setShowSelector(false);
                  setActiveModal("Leisure"); // 👈 ADD THIS
                }}
              >
                🎉 Leisure
              </div>

              <div
                className="selector-item"
                onClick={() => {
                  setShowSelector(false);
                  setActiveModal("Cruise"); // 👈 ADD THIS
                }}
              >
                🚢 Cruise
              </div>
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

      {activeModal === "sightseeing" /* 👈 ADD THIS */ && (
        <SightseeingForm onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "transportation" /* 👈 ADD THIS */ && (
        <TransportationForm onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "addons" /* 👈 ADD THIS */ && (
        <AddonsForm onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "Insurance/Visa" /* 👈 ADD THIS */ && (
        <InsuranceVisaForm onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "Meal" /* 👈 ADD THIS */ && (
        <MealForm onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "Flight" /* 👈 ADD THIS */ && (
        <FlightForm onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "Leisure" /* 👈 ADD THIS */ && (
        <LeisureForm onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "Cruise" /* 👈 ADD THIS */ && (
        <CruiseForm onClose={() => setActiveModal(null)} />
      )}
    </div>
  );
}
