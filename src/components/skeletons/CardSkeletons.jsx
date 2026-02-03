const CardSkeleton = () => {
  return (
    <div className="stat-card skeleton">
      <div className="skeleton-icon"></div>
      <div className="skeleton-lines">
        <div className="skeleton-line short"></div>
        <div className="skeleton-line"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
