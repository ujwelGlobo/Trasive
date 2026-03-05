import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@/styles/layout.css";
import { authService } from "@/core/auth/authService.js";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    company: "",
    name: "",
    designation: "",
    role: "Company Admin",
    userType: 1,
    companyId: 1,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

   const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authService.register(formData);

      alert("Account created successfully");
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="split-auth-layout">
      {/* Bootstrap container */}
      <div className="container">
        <div className="row justify-content-center">
          {/* Card column */}
          <div className="col-12 col-lg-10 col-xl-9">

            <div className="split-auth-card-reg d-flex flex-column flex-lg-row">

              {/* LEFT PANEL */}
              <div className="split-auth-left d-none d-lg-flex">
                <div className="split-left-content">
                  <h2>Create Account</h2>
                  <p>
                    Build your company workspace <br />
                    and start managing reservations
                  </p>
                </div>
              </div>

              {/* RIGHT PANEL */}
              <div className="split-auth-right w-100">
                <h2 className="brand-title">Travsive</h2>
                <p className="subtitle">Create your account</p>

                {error && <div className="login-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                  {/* Bootstrap row for first/last name */}
                 <div className="row g-2">
  <div className="col-12 col-md-6">
    <input
      type="text"
      name="first_name"
      placeholder="First name"
      onChange={handleChange}
      required
      style={{ width: "100%" }}
    />
  </div>

  <div className="col-12 col-md-6">
    <input
      type="text"
      name="last_name"
      placeholder="Last name"
      onChange={handleChange}
      required
      style={{ width: "100%" }}
    />
  </div>
</div>

                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="text"
                    name="company"
                    placeholder="Company name"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        company: e.target.value,
                        name: e.target.value,
                      })
                    }
                    required
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone number"
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                  />

                  <input
                    type="text"
                    name="designation"
                    placeholder="Designation"
                    onChange={handleChange}
                    required
                  />

                  <button type="submit" disabled={loading}>
                    {loading ? "Creating account..." : "Create account"}
                  </button>
                </form>

                <small
                  className="auth-link text-center"
                  onClick={() => navigate("/login")}
                >
                  Already have an account? Login
                </small>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;