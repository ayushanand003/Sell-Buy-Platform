// src/pages/AuctionDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import bgImage from "../assets/dashboard.jpg";

const AuctionDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [bid, setBid] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/items/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data.item || data);
      })
      .catch((err) => console.error("Error fetching item:", err));
  }, [id]);

  const handleBid = async () => {
    if (!bid) return alert("Enter a bid amount");
    try {
      const res = await fetch(`http://localhost:5000/api/bid/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: bid }),
      });
      const data = await res.json();
      setMessage(data.msg || "Bid placed successfully!");
      setBid("");
    } catch (err) {
      console.error(err);
    }
  };

  if (!item)
    return <p style={{ textAlign: "center" }}>Loading item details...</p>;

  const containerStyle = {
    minHeight: "100vh",
    width: "100%",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "40px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#080303ff",
  };

  const cardStyle = {
    background: "rgba(91, 165, 239, 0.9)",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.5)",
    maxWidth: "700px",
    width: "100%",
  };

  const sectionStyle = {
    marginBottom: "20px",
  };

  const inputStyle = {
    padding: "10px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "none",
    width: "100%",
  };

  const buttonStyle = {
    padding: "10px 20px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          {item.name}
        </h2>

        {/* Item Image */}
        <img
          src={`http://localhost:5000${item.imageUrl}`}
          alt={item.name}
          style={{
            width: "100%",
            maxHeight: "350px",
            objectFit: "cover",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        />

        {/* Item Info */}
        <div style={sectionStyle}>
          <p><strong>Category:</strong> {item.category}</p>
          <p><strong>Brand:</strong> {item.brand}</p>
          <p><strong>Starting Bid:</strong> ₹{item.startingBid}</p>
          {item.buyNowPrice && (
            <p><strong>Buy Now Price:</strong> ₹{item.buyNowPrice}</p>
          )}
        </div>

        {/* Seller Info */}
        <div style={sectionStyle}>
          <h3>Seller Information</h3>
          <p><strong>Name:</strong> {item.sellerName}</p>
          <p><strong>Phone:</strong> {item.sellerPhone}</p>
          <p><strong>Address:</strong> {item.sellerAddress}</p>
        </div>

        

        {/* Success / Error Message */}
        {message && (
          <p style={{ color: "lightgreen", fontWeight: "bold" }}>{message}</p>
        )}
      </div>
    </div>
  );
};

export default AuctionDetail;
