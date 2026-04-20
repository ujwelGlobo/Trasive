import React from "react";
import { Plus } from "lucide-react";

export default function PaymentsSection() {
  return (
    <div className="cd-card">
      <div className="cd-card-header">
        <div className="cd-card-title">Payments</div>
        <button className="cd-card-action">
          <Plus size={11} /> Record Payment
        </button>
      </div>

      <p>No payments found.</p>
    </div>
  );
}