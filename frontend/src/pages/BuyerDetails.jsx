import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import bgImage from "../assets/dashboard.jpg";

const BuyerDetails = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const item = location.state?.item || { _id: itemId };

  const [formData, setFormData] = useState({
    name: "",
    email: localStorage.getItem("userEmail") || "", // auto-fill logged-in email
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (!item._id || !/^[0-9a-fA-F]{24}$/.test(item._id)) {
      alert("Item ID missing or invalid. Cannot place order.");
      return;
    }

    const orderPayload = {
      email: formData.email,  // ✅ use logged-in email
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      itemId: item._id,
      amount: item.startingBid || 1,
    };

    console.log("📤 Sending order payload:", orderPayload);

    const res = await axios.post("http://localhost:5000/api/orders", orderPayload);

    alert("✅ Order placed successfully!");

    // ✅ Redirect to payment page
    navigate(`/payment/${item._id}`, { state: { buyer: formData, item } });

  } catch (err) {
    console.error("❌ Failed to store order:", err);
    alert("Failed to place order. Please try again.");
  }
};




  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "rgba(173, 216, 230, 0.95)",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          width: "400px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Buyer Details
        </h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
          readOnly // ✅ locked to logged-in user
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          style={{ ...inputStyle, height: "80px" }}
        />
        <button type="submit" style={buttonStyle}>
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "1rem",
};

const buttonStyle = {
  backgroundColor: "#0073e6",
  color: "#fff",
  padding: "12px",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  width: "100%",
  fontSize: "1rem",
  marginTop: "15px",
};

export default BuyerDetails;
