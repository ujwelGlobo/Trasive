import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function MailSetting() {
  return (
    <div className="container-fluid py-4">
      <div className="row g-4">

        {/* SMTP Settings */}
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">

              <h6 className="mb-4 fw-bold">SETUP SMTP SETTINGS</h6>

              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue="Best Holidays India Pvt Ltd"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  defaultValue="mail@btours.in"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  defaultValue="password"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">SMTP Server</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue="smtp.zoho.in"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Port</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue="465"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Security Type</label>
                <select className="form-select">
                  <option>SSL</option>
                  <option>TLS</option>
                </select>
              </div>

              <button className="btn btn-primary px-4">
                Save
              </button>

            </div>
          </div>
        </div>

        {/* Configure Email */}
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-secondary text-white">
              Configure Email
            </div>

            <div className="card-body">

              <p className="text-muted">
                Connect your email inbox and transform the way you do sales.
              </p>

              <div className="row text-center mb-4">
                <div className="col-4">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
                    alt=""
                    width="40"
                  />
                  <p className="small mt-2">
                    Access your customer emails
                  </p>
                </div>

                <div className="col-4">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/561/561188.png"
                    alt=""
                    width="40"
                  />
                  <p className="small mt-2">
                    Send and receive emails
                  </p>
                </div>

                <div className="col-4">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/561/561179.png"
                    alt=""
                    width="40"
                  />
                  <p className="small mt-2">
                    Synchronize your inbox
                  </p>
                </div>
              </div>

              <div className="bg-light p-3 rounded small">
                <p className="mb-1">
                  <b>Use the following settings:</b>
                </p>

                <p className="mb-1">
                  1) Mail.com SMTP server address: smtp.yourdomain.com
                </p>

                <p className="mb-1">
                  2) Mail.com SMTP username: Your full email address
                </p>

                <p className="mb-1">
                  3) Mail.com SMTP password: Your email password
                </p>

                <p className="mb-1">
                  4) Mail.com SMTP port: 587
                </p>

                <p className="mb-0">
                  5) SMTP/SSL required: yes
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}