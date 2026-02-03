const TableSkeleton = ({ rows = 5 }) => {
  return (
    <table className="table table-bordered table-sm">
      <tbody>
        {[...Array(rows)].map((_, i) => (
          <tr key={i}>
            {[...Array(6)].map((_, j) => (
              <td key={j}>
                <div className="skeleton-line"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableSkeleton;
