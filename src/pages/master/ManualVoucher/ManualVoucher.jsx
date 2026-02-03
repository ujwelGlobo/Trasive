import { useState } from "react";
import "./ManualVoucher.css";

export default function ManualVoucher({ onConfirm }) {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm?.(password);
  };

  return (
    <div className="confirm-wrap">
      <div className="confirm-card">
        <h3>Confirm your password</h3>
        <p>This action requires you to re-enter your password.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Confirm</button>
        </form>
      </div>
    </div>
  );
}
