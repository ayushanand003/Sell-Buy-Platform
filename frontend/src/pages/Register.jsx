import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("⚠️ Name is required");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("⚠️ Enter a valid email");
      return;
    }
    if (formData.password.length < 8) {
      setError("⚠️ Password must be at least 8 characters");
      return;
    }
    if (!formData.phone.trim()) {
      setError("⚠️ Mobile No. is required");
      return;
    }
    if (!formData.address.trim()) {
      setError("⚠️ Address is required");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Registration successful");
        navigate("/login");
      } else {
        setError(data.message || "❌ Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError("⚠️ Server error. Try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button,
        input[type=tel]::-webkit-outer-spin-button,
        input[type=tel]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number],
        input[type=tel] {
          -moz-appearance: textfield;
        }
      `}</style>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #003366, #001f4d)",
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
          <h2 style={{ textAlign: "center" }}>Register</h2>
          {error && (
            <div style={{ color: "red", fontSize: "0.9rem", textAlign: "center" }}>
              {error}
            </div>
          )}

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ padding: "10px", borderRadius: "8px", border: "none" }}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ padding: "10px", borderRadius: "8px", border: "none" }}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ padding: "10px", borderRadius: "8px", border: "none" }}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Mobile No."
            value={formData.phone}
            onChange={handleChange}
            required
            style={{ padding: "10px", borderRadius: "8px", border: "none" }}
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            style={{ padding: "10px", borderRadius: "8px", border: "none" }}
          />

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
            {loading ? "Registering..." : "Register"}
          </button>

          <p style={{ textAlign: "center" }}>
            Already have an account?{" "}
            <span
              style={{ color: "#ff9900", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
