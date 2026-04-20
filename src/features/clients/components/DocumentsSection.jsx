import React from "react";
import { Plus } from "lucide-react";

export default function DocumentsSection() {
  return (
    <div className="cd-card">
      <div className="cd-card-header">
        <div className="cd-card-title">Documents</div>
        <button className="cd-card-action">
          <Plus size={11} /> Upload
        </button>
      </div>

      <p>No documents uploaded.</p>
    </div>
  );
}