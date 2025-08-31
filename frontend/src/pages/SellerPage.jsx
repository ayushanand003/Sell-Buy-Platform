// src/pages/SellerPage.jsx
import React, { useState } from "react";
import axios from "axios";
import bgImage from "../assets/dashboard.jpg";

const SellerPage = () => {
  const [itemData, setItemData] = useState({
    name: "",
    brand: "",
    category: "",
    setAmount: "",
    sellerName: "",
    sellerPhone: "",
    sellerAddress: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setItemData({ ...itemData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(itemData).forEach((key) => {
        formData.append(key, itemData[key]);
      });
      formData.append("image", image);

      await axios.post("http://localhost:5000/api/items", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Item added successfully!");
      setItemData({
        name: "",
        brand: "",
        category: "",
        setAmount: "",
        sellerName: "",
        sellerPhone: "",
        sellerAddress: "",
      });
      setImage(null);
    } catch (err) {
      console.error("Error adding item:", err);
      alert("Failed to add item.");
    }
  };

  const containerStyle = {
    minHeight: "100vh",
    width: "100%",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#fff",
  };

  const formStyle = {
    background: "rgba(0, 51, 102, 0.85)",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    width: "400px",
  };

  const inputStyle = {
    width: "100%",
    height: "45px",
    padding: "10px 12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    fontSize: "1rem",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    width: "100%",
    height: "50px",
    backgroundColor: "#0073e6",
    border: "none",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  };

  const titleBoxStyle = {
    backgroundColor: "#3399ff",
    color: "#fff",
    padding: "12px",
    borderRadius: "10px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "1.2rem",
    marginBottom: "20px",
  };

  return (
    <div style={containerStyle}>
      <form
        style={formStyle}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div style={titleBoxStyle}>➕ Add Item</div>

        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={itemData.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={itemData.brand}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={itemData.category}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="number"
          name="startingBid"
          placeholder="Set Amount"
          value={itemData.startingBid}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        {/* Seller Info */}
        <input
          type="text"
          name="sellerName"
          placeholder="Seller Name"
          value={itemData.sellerName}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="text"
          name="sellerPhone"
          placeholder="Seller Phone"
          value={itemData.sellerPhone}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="text"
          name="sellerAddress"
          placeholder="Seller Address"
          value={itemData.sellerAddress}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        {/* File upload */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          style={inputStyle}
          required
        />
        {image && <p>Selected file: {image.name}</p>}

        <button type="submit" style={buttonStyle}>
          Add Item
        </button>
      </form>
    </div>
  );
};

export default SellerPage;
