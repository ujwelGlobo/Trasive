import React, { useState } from "react";
import SignatureModal from "./SignatureModal";

export default function SignatureSection({
  signature,
  onSave,
  loading,
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="stp-signature-section">
        <h6 className="stp-info-title">Signature</h6>

        {/* Preview */}
        <div
          className="stp-signature-preview"
          dangerouslySetInnerHTML={{
            __html: signature || "<p>No signature added</p>",
          }}
        />

        <div className="stp-footer">
          <button
            className="stp-btn-primary"
            onClick={() => setShowModal(true)}
          >
            Edit Signature
          </button>
        </div>
      </div>

      {/* ✅ ONLY render when needed */}
      {showModal && (
        <SignatureModal
          onClose={() => setShowModal(false)}
          signature={signature}
          onSave={onSave}
          loading={loading}
        />
      )}
    </>
  );
}