import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/layout.css";

const Login = () => {
  const navigate = useNavigate();

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
      const response = await fetch("http://192.168.1.83:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token || "dummy-token");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="split-auth-layout">
      <div className="split-auth-card">

        {/* LEFT PANEL */}
        <div className="split-auth-left">
          <div className="split-left-content">
            <h2>Welcome Back!</h2>
            <p>
              To keep connected with us please <br />
              login with your personal info
            </p>
          </div>
        </div>

        {/* RIGHT PANEL (GLASS) */}
        <div className="split-auth-right">
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
            />

            <div className="password-wrap">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

          <button
  type="submit"
  disabled={loading}
  className="btn col-md-6 mx-auto d-block"
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
  );
};

export default Login;
