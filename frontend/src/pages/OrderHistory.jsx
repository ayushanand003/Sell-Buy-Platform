import React, { useEffect, useState } from "react";
import axios from "axios";
import bgImage from "../assets/dashboard.jpg";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userEmail = localStorage.getItem("userEmail"); // ✅ from login

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!userEmail) {
          setError("⚠️ Please log in to see your orders.");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `http://localhost:5000/api/orders/${userEmail}`
        );
        setOrders(res.data);
      } catch (err) {
        setError("⚠️ No orders found or server error.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userEmail]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          background: "rgba(105, 187, 242, 0.9)",
          borderRadius: "15px",
          padding: "30px",
          width: "80%",
          maxWidth: "900px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#003366",
          }}
        >
          📜 My Order History
        </h2>

        {loading ? (
          <p style={{ textAlign: "center" }}>⏳ Loading your orders...</p>
        ) : error ? (
          <p style={{ textAlign: "center", color: "red" }}>{error}</p>
        ) : orders.length === 0 ? (
          <p style={{ textAlign: "center" }}>No orders found.</p>
        ) : (
          <div style={{ display: "grid", gap: "20px" }}>
            {orders.map((order) => (
              <div
                key={order._id}
                style={{
                  background: "#f9f9f9",
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  padding: "20px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                <h3 style={{ margin: "0 0 10px 0", color: "#0073e6" }}>
                  {order.itemId?.name || "Unknown Item"}
                </h3>
                <p>
                  <strong>Amount:</strong> ₹{order.amount}
                </p>
                <p>
                  <strong>Buyer:</strong> {order.name} ({order.email})
                </p>
                <p>
                  <strong>Phone:</strong> {order.phone}
                </p>
                <p>
                  <strong>Address:</strong> {order.address}
                </p>
                <p style={{ fontSize: "0.9rem", color: "gray" }}>
                  Ordered on: {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
