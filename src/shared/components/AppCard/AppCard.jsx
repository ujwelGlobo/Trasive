import { useNavigate } from "react-router-dom";
import "./AppCard.css";

const AppCard = ({ icon, title, subtitle, to, children }) => {
  const navigate = useNavigate();

  return (
    <div
      className="app-card"
      onClick={() => to && navigate(to)}
      style={{ cursor: to ? "pointer" : "default" }}
    >
      {icon && <div className="app-card-icon">{icon}</div>}

      <div className="app-card-content">
        {title && <h4>{title}</h4>}
        {subtitle && <p>{subtitle}</p>}
        {children}
      </div>
    </div>
  );
};

export default AppCard;
