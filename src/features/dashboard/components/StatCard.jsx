import AppCard from "@/shared/components/AppCard/AppCard.jsx";
import "./StatCard.css";

const StatCard = ({ icon, value, label, variant, to, type }) => {
  return (
    <AppCard
      icon={icon}
      title={value}
      subtitle={label}
      to={to}
    >
      {/* KPI accent stays here */}
      <span className={`stat-accent ${variant} ${type || ""}`} />
    </AppCard>
  );
};

export default StatCard;
