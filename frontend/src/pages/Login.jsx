import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setError("⚠️ Enter a valid email address");
      return;
    }
    if (formData.password.length < 8) {
      setError("⚠️ Password must be at least 8 characters");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Save user info & email
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("userEmail", data.user.email);
        alert("✅ Login successful");
        navigate("/dashboard");
      } else {
        setError(data.message || "❌ Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("⚠️ Server error. Try again later");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #001f4d, #003366)",
        color: "#fff",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "rgba(0,0,0,0.6)",
          padding: "30px",
          borderRadius: "12px",
          width: "350px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Login</h2>

        {error && (
          <div style={{ color: "red", fontSize: "0.9rem", textAlign: "center" }}>
            {error}
          </div>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: "0.9rem",
              color: "#ff9900",
            }}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#ff9900",
            color: "#fff",
            padding: "10px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={{ textAlign: "center" }}>
          Don’t have an account?{" "}
          <span
            style={{ color: "#ff9900", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
