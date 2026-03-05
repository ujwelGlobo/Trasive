import "./ItineraryManage.css";

const pricingItems = [
  {
    id: 1,
    name: "sugntets",
    date: "21-12-2025 | 12:00 AM – 12:00 AM",
    type: "Sightseeing – SIC",
    net: "₹0",
    markup: "0%",
    gross: "₹0",
  },
  {
    id: 2,
    name: "Pick up Kochi – Kochi stay",
    date: "21-12-2025 | 12:00 AM – 12:00 AM",
    type: "Sightseeing – Private",
    net: "₹0",
    markup: "0%",
    gross: "₹0",
  },
  {
    id: 3,
    name: "Munnar Day 1",
    date: "22-12-2025 | 12:00 AM – 12:00 AM",
    type: "Sightseeing – Private",
    net: "₹0",
    markup: "0%",
    gross: "₹0",
  },
  {
    id: 4,
    name: "Munnar Day 2",
    date: "23-12-2025 | 12:00 AM – 12:00 AM",
    type: "Sightseeing – Private",
    net: "₹0",
    markup: "0%",
    gross: "₹0",
  },
];

export default function ItineraryManage() {
  return (
    <div className="pl-wrapper">
      <h3 className="pl-title">Pricing</h3>

      <div className="pl-table">
        {/* HEADER */}
        <div className="pl-row pl-header">
          <div>Item</div>
          <div>Type</div>
          <div>Net</div>
          <div>Markup</div>
          <div>Gross</div>
          <div></div>
        </div>

        {/* ROWS */}
        {pricingItems.map((item) => (
          <div key={item.id} className="pl-row">
            <div className="pl-item">
              <span className="pl-item-name">{item.name}</span>
              <span className="pl-item-date">{item.date}</span>
            </div>

            <div className="pl-type">{item.type}</div>
            <div className="pl-net">{item.net}</div>
            <div className="pl-markup">{item.markup}</div>
            <div className="pl-gross">{item.gross}</div>

            <div className="pl-action">⋮</div>
          </div>
        ))}
      </div>
    </div>
  );
}
