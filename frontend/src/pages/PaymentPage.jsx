// src/pages/PaymentPage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import bgImage from "../assets/dashboard.jpg";

const PaymentPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const buyer = state?.buyer || {};
  const navigate = useNavigate();

  const [method, setMethod] = useState("");

  const handlePayment = () => {
    if (!method) {
      alert("Please select a payment method");
      return;
    }
    alert(`Payment Successful via ${method}!`);
    navigate("/dashboard");
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
      <div
        style={{
          background: "rgba(173, 216, 230, 0.95)", // light blue box
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          width: "400px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Payment for Item {id}
        </h2>
        <p><strong>Buyer:</strong> {buyer.name}</p>
        <p><strong>Email:</strong> {buyer.email}</p>
        <p><strong>Phone:</strong> {buyer.phone}</p>

        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            margin: "15px 0",
            fontSize: "1rem",
          }}
        >
          <option value="">-- Select Payment Method --</option>
          <option value="Credit Card">💳 Credit Card</option>
          <option value="Debit Card">🏦 Debit Card</option>
          <option value="UPI">📱 UPI</option>
          <option value="Net Banking">🌐 Net Banking</option>
          <option value="Cash on Delivery">💵 Cash on Delivery</option>
        </select>

        <button
          onClick={handlePayment}
          style={{
            backgroundColor: "#0073e6",
            color: "#fff",
            padding: "12px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            width: "100%",
            fontSize: "1rem",
          }}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
