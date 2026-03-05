import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const Transportation = () => {

  const events = [
    {
      title: "Kerala Tour – Mahesh",
      start: "2026-01-16",
      end: "2026-01-17",
    },
    {
      title: "Best Holidays India Pvt Ltd",
      start: "2026-01-29",
    },
  ];

  return (
    <div className="calendar-wrapper">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </div>
  );
};

export default Transportation;
