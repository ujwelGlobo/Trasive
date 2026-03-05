import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/core/auth/AuthProvider.jsx";
import { authService } from "@/core/auth/authService.js";
import "@/styles/layout.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // 🔥 from AuthContext

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authService.login({
        email,
        password,
      });

      /*
        Expected backend response:
        {
          status: true,
          result: {
            bearer_token,
            user_id,
            username,
            name,
            email,
            role (if exists)
          }
        }
      */

      const userData = response.result;
      const token = response.result.bearer_token;

      // 🔥 Save inside AuthContext
      login(response);

      // Redirect after login
      navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="split-auth-layout">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-9">

            <div className="split-auth-card d-flex flex-column flex-lg-row">

              {/* LEFT PANEL */}
              <div className="split-auth-left d-none d-lg-flex">
                <div className="split-left-content">
                  <h2>Welcome Back!</h2>
                  <p>
                    To keep connected with us please <br />
                    login with your personal info
                  </p>
                </div>
              </div>

              {/* RIGHT PANEL */}
              <div className="split-auth-right w-100">
                <h2 className="brand-title">Travsive</h2>
                <p className="subtitle">Sign into your account</p>

                {error && <div className="login-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-control mb-3"
                  />

                  <div className="password-wrap">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="form-control"
                    />

                    <span
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-100 mt-3"
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </form>

                <small className="copyright">
                  © {new Date().getFullYear()} Travsive
                </small>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;