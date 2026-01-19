import "./StatCard.css";

const StatCard = ({ icon, value, label, variant }) => {
  return (
    <div className={`stat-card border-${variant}`}>
      <div className="stat-icon">{icon}</div>

      <div className="stat-info">
        <h3 className="stat-value">{value}</h3>
        <p className="stat-label">{label}</p>
      </div>
    </div>
  );
};

export default StatCard;
