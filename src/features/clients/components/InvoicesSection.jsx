import React from "react";
import { Plus } from "lucide-react";

export default function InvoicesSection() {
  return (
    <div className="cd-card">
      <div className="cd-card-header">
        <div className="cd-card-title">Invoices</div>
        <button className="cd-card-action">
          <Plus size={11} /> Create Invoice
        </button>
      </div>

      <p>No invoices yet.</p>
    </div>
  );
}