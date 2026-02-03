import "./SupplierPayment.css";

const SuppliersPayment = () => {
  return (
    <div className="page-wrapper">

      {/* PAGE HEADER */}
      <div className="page-header">
        <h3>Suppliers Payment</h3>
        <p>Pending payments to suppliers and service providers</p>
      </div>

      {/* TABLE CARD */}
      <div className="table-card">

        {/* TABLE HEADER ACTIONS */}
        <div className="table-actions">
          <div className="left">
            Show
            <select className="table-select">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            entries
          </div>

          <div className="right">
            <input
              type="text"
              className="table-search"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* TABLE */}
        <table className="modern-table">
          <thead>
            <tr>
              <th>Query ID</th>
              <th>Supplier</th>
              <th>Service</th>
              <th>Cancellation Date</th>
              <th>Pending Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="link">#202569650</td>
              <td>ABC Holidays</td>
              <td>Accommodation</td>
              <td>30-Nov-2025</td>
              <td className="amount-warning">₹2,000</td>
            </tr>

            <tr>
              <td className="link">#202569650</td>
              <td>XYZ Travels</td>
              <td>Accommodation</td>
              <td>30-Nov-2025</td>
              <td className="amount-warning">₹2,000</td>
            </tr>
          </tbody>
        </table>

        {/* FOOTER */}
        <div className="table-footer">
          <span>Showing 1 to 2 of 2 entries</span>

          <div className="pagination">
            <button disabled>Previous</button>
            <button disabled>Next</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SuppliersPayment;
