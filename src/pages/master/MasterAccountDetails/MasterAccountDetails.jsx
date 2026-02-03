import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./MasterAccountDetails.css";

const MasterAccountDetails = () => {
  const [content, setContent] = useState("");
  const [qrPreview, setQrPreview] = useState(null);

  // TEMP: load existing data (replace with API later)
  useEffect(() => {
    setContent(`
      <table border="1" cellpadding="6" cellspacing="0" width="100%">
        <tr>
          <td><strong>Beneficiary Name</strong></td>
          <td>Best Holidays India Pvt Ltd</td>
        </tr>
        <tr>
          <td><strong>Bank Name</strong></td>
          <td>State Bank of India</td>
        </tr>
        <tr>
          <td><strong>Account No</strong></td>
          <td>37549742718</td>
        </tr>
        <tr>
          <td><strong>IFSC Code</strong></td>
          <td>SBIN0070253</td>
        </tr>
      </table>
    `);
  }, []);

  const handleSave = () => {
    console.log("ACCOUNT HTML:", content);
    console.log("QR IMAGE:", qrPreview);
    alert("Saved (console log for now)");
  };

  return (
    <div className="account-page">
      <h2 className="page-title">Add Account Details</h2>

      <div className="account-card">
        <div className="account-grid">

          {/* LEFT: ACCOUNT DETAILS */}
          <div className="editor-card">
            <h4>Account Details</h4>

            <Editor
              value={content}
              onEditorChange={(val) => setContent(val)}
              init={{
                height: 320,
                menubar: true,
                plugins: "lists link table",
                toolbar:
                  "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | table",
              }}
            />
          </div>

          {/* RIGHT: QR CODE */}
          <div className="qr-card">
            <h4>QR Code Image</h4>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setQrPreview(URL.createObjectURL(e.target.files[0]))
              }
            />

            {qrPreview && (
              <div className="qr-preview">
                <img src={qrPreview} alt="QR Code" />
                <p>Scan & Pay using UPI</p>
              </div>
            )}
          </div>

        </div>

        {/* FOOTER */}
        <div className="form-footer">
          <button
            className="btn-primary"
            onClick={handleSave}
            disabled={!content}
          >
            Save Inclusions
          </button>
        </div>
      </div>
    </div>
  );
};

export default MasterAccountDetails;
