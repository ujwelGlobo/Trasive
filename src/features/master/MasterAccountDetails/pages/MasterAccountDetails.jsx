import {
  useEffect,
  useState,
} from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useAuth } from "@/core/auth/AuthProvider";

import {
  getAccountDetails,
  saveAccountDetails,
} from "../services/masterAccountService";

import "./MasterAccountDetails.css";

const MasterAccountDetails =
  () => {
    const { user } =
      useAuth();

    const [content, setContent] =
      useState("");

    const [
      qrPreview,
      setQrPreview,
    ] = useState(null);

    const [
      qrImage,
      setQrImage,
    ] = useState(null);

    const [loading, setLoading] =
      useState(false);

    /* FETCH */

    const fetchAccountDetails =
      async (userId) => {
        if (!userId) return;

        try {
          setLoading(true);

          const res =
            await getAccountDetails(
              userId
            );

          if (
            res?.status &&
            res?.data
          ) {
            setContent(
              res.data
                .packageImportantTips ||
                ""
            );

            setQrPreview(
              res.data.qr_code ||
                null
            );
          }
        } catch (error) {
          console.error(
            "Error fetching account details:",
            error
          );
        } finally {
          setLoading(false);
        }
      };

    useEffect(() => {
      if (!user?.id)
        return;

      fetchAccountDetails(
        user.id
      );
    }, [user]);

    /* IMAGE */

    const handleImageChange = (
      e
    ) => {
      const file =
        e.target.files[0];

      if (file) {
        setQrImage(file);

        setQrPreview(
          URL.createObjectURL(
            file
          )
        );
      }
    };

    /* SAVE */

    const handleSave =
      async () => {
        const userId =
          user?.id;

        if (!userId)
          return;

        try {
          setLoading(true);

          const payload =
            new FormData();

          payload.append(
            "packageImportantTips",
            content
          );

          if (qrImage) {
            payload.append(
              "qr_code",
              qrImage
            );
          }

          const res =
            await saveAccountDetails(
              userId,
              payload
            );

          if (
            res?.status
          ) {
            alert(
              res.message ||
                "Saved successfully"
            );

            fetchAccountDetails(
              userId
            );
          }
        } catch (error) {
          console.error(
            "Save error:",
            error
          );
        } finally {
          setLoading(false);
        }
      };

    return (
      <div className="account-page">
        <h2 className="page-title">
          Account Details
        </h2>

        <div className="account-card">
          <div className="account-grid">
            <div className="editor-card">
              <h4>
                Account
                Details
              </h4>

            <Editor
  tinymceScriptSrc="/tinymce/tinymce.min.js"
  value={content}
  onEditorChange={(value) =>
    setContent(value)
  }
  init={{
    license_key: 'gpl',
    height: 350,
    menubar: true,

    plugins: [
      "lists",
      "link",
      "table",
      "code",
    ],

    toolbar:
      "undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | table | code",

    table_toolbar:
      "tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
  }}
/>
            </div>

            {/* RIGHT */}

            <div className="qr-card">
              <h4>
                QR Code
                Image
              </h4>

              <input
                type="file"
                accept="image/*"
                onChange={
                  handleImageChange
                }
              />

              {qrPreview && (
                <div className="qr-preview">
                  <img
                    src={
                      qrPreview
                    }
                    alt="QR Code"
                  />

                  <p>
                    Scan &
                    Pay using
                    UPI
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* FOOTER */}

          <div className="form-footer">
            <button
              className="btn-primary"
              onClick={
                handleSave
              }
              disabled={
                loading ||
                !content
              }
            >
              {loading
                ? "Saving..."
                : "Save Account Details"}
            </button>
          </div>
        </div>
      </div>
    );
  };

export default MasterAccountDetails;