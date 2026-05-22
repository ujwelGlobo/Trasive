const DefaultSettingsCard = ({
  org,
  onEdit,
}) => {
  return (
    <div className="saas-default-card">
      <h3 className="saas-default-title">
        Default Settings
      </h3>

      <div className="saas-default-content">
        <div className="saas-default-logo">
          <img
            src={
              org?.logo ||
              "/logo.png"
            }
            alt="Invoice Logo"
            className="saas-logo-image"
            onError={(e) => {
              e.target.src =
                "/logo.png";
            }}
          />
        </div>

        <div className="saas-default-text">
          <h4>Itinerary Logo</h4>

          <p>
            For the best
            results, a PNG file
            with transparent
            background at least
            126×40 pixels is
            recommended.
          </p>
        </div>

        <button
          className="saas-default-edit"
          onClick={onEdit}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default DefaultSettingsCard;