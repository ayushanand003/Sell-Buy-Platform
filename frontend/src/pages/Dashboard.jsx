// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bgImage from "../assets/dashboard.jpg";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showCategories, setShowCategories] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const containerStyle = {
    minHeight: "100vh",
    width: "100%",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#000000ff",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: "20px",
  };

  const sidebarStyle = {
    width: "250px",
    background: "linear-gradient(135deg, #0d346fff, #6fb6feff)",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(57, 54, 54, 0.3)",
    marginRight: "30px",
  };

  const dashboardBoxStyle = {
    display: "flex",
    alignItems: "center",
    background: "linear-gradient(135deg, #062f6dff, #2a77c4ff)",
    color: "#ffffffff",
    padding: "15px 25px",
    borderRadius: "20px",
    width: "fit-content",
    cursor: "pointer",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
  };

  const categoryItemStyle = {
    backgroundColor: "#0066cc",
    padding: "12px",
    borderRadius: "10px",
    textAlign: "center",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1rem",
    marginBottom: "12px",
    transition: "all 0.3s ease",
  };

  const categoryItemHoverStyle = {
    backgroundColor: "#3399ff",
    transform: "scale(1.05)",
  };

  const topRightStyle = {
    position: "fixed",
    top: "20px",
    right: "20px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    zIndex: 1000,
  };

  const logoutBtnStyle = {
    backgroundColor: "#ff4d4d",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    color: "#ffffffff",
    fontWeight: "bold",
    fontSize: "1rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    transition: "0.3s",
  };

  const profileIconStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#0073e6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "1.2rem",
    color: "#ffffffff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  };

  const profileMenuStyle = {
    position: "absolute",
    top: "50px",
    right: "0",
    backgroundColor: "#59b1ffff",
    color: "#000",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    padding: "10px",
    width: "160px",
    zIndex: 1100,
  };

  const menuItemStyle = {
    padding: "8px",
    cursor: "pointer",
    borderRadius: "6px",
  };

  const categories = ["Mobiles", "Laptops", "Furniture", "Electronics", "Cars", "Bikes"];

  // Fetch items when a category is selected
  useEffect(() => {
    if (!selectedCategory) return;
    setLoading(true);
    axios
      .get("http://localhost:5000/api/items")
      .then((res) => {
        const filtered = res.data.filter(
          (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
        );
        setItems(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
        setLoading(false);
      });
  }, [selectedCategory]);

  const handleLogout = () => navigate("/");

  const handleDashboardClick = () => setShowCategories(!showCategories);

  // 🔥 Fixed toggle behavior here
  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      // If same category is clicked again → reset
      setSelectedCategory(null);
      setItems([]);
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <div style={containerStyle}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div
          style={{
            ...dashboardBoxStyle,
            backgroundColor: hoveredCategory === "dashboard" ? "#0073e6" : "#0059b3",
            transform: hoveredCategory === "dashboard" ? "scale(1.03)" : "scale(1)",
          }}
          onMouseEnter={() => setHoveredCategory("dashboard")}
          onMouseLeave={() => setHoveredCategory(null)}
          onClick={handleDashboardClick}
        >
          📊 Dashboard
        </div>

        {showCategories &&
          categories.map((cat, index) => (
            <div
              key={index}
              style={{
                ...categoryItemStyle,
                ...(hoveredCategory === index ? categoryItemHoverStyle : {}),
              }}
              onMouseEnter={() => setHoveredCategory(index)}
              onMouseLeave={() => setHoveredCategory(null)}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </div>
          ))}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: "20px" }}>
        {loading && <h2>Loading items...</h2>}
        {!loading && selectedCategory && (
          <>
            <h2>{selectedCategory} Items</h2>
            {items.length === 0 ? (
              <p>No items found in this category.</p>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                  gap: "20px",
                  marginTop: "20px",
                }}
              >
                {items.map((item) => (
                  <div
                    key={item._id}
                    style={{
                      background: "#7cc2ffff",
                      color: "#000000ff",
                      borderRadius: "10px",
                      padding: "15px",
                      textAlign: "center",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    }}
                  >
                    <img
                      src={`http://localhost:5000${item.imageUrl}`}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "180px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                      onError={(e) => (e.target.src = "/assets/no-image.png")}
                    />
                    <h3>{item.name}</h3>
                    <p>Brand: {item.brand}</p>
                    <p>Starting Bid: ₹{item.startingBid}</p>

                    {/* View Details button */}
                    <button
                      onClick={() => navigate(`/auction/${item._id}`)}
                      style={{
                        backgroundColor: "#0073e6",
                        color: "#ffffffff",
                        padding: "10px 15px",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        marginTop: "10px",
                        marginRight: "10px",
                      }}
                    >
                      View Details
                    </button>

                    {/* Buy Button */}
                    <button
                      onClick={() => navigate(`/buy/${item._id}`)}
                      style={{
                        backgroundColor: "#0073e6",
                        color: "#ffffffff",
                        padding: "10px 15px",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        marginTop: "10px",
                      }}
                    >
                      Buy
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Top Right Buttons */}
      <div style={topRightStyle}>
        {/* Profile Icon */}
        <div
          style={profileIconStyle}
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        >
          👤
        </div>

        {/* Profile Dropdown */}
        {showProfileMenu && (
          <div style={profileMenuStyle}>
            <div style={menuItemStyle} onClick={() => navigate("/profile")}>
              Profile
            </div>
            <div style={menuItemStyle} onClick={() => navigate("/orders")}>
              Order History
            </div>
            <div style={menuItemStyle} onClick={() => navigate("/seller")}>
              Seller
            </div>
          </div>
        )}

        {/* Logout Button */}
        <button
          style={logoutBtnStyle}
          onClick={handleLogout}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
