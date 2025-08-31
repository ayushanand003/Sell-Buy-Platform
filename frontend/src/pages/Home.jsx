// src/pages/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import homeImg from "../assets/home.jpg";

const Home = () => {
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();

  const containerStyle = {
    height: "100vh",
    width: "100%",
    backgroundImage: `url(${homeImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    color: "#b90000ff",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)", // dark overlay for readability
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    position: "relative",
    zIndex: 2,
  };

  const titleStyle = {
    fontSize: "2.8rem",
    textAlign: "center",
    flexGrow: 1,
    fontFamily: "cursive",
    fontWeight: "bold",
    textShadow: "2px 2px 6px rgba(0,0,0,0.7)",
  };

  const buttonStyle = (buttonName) => ({
    backgroundColor: activeButton === buttonName ? "#ef9611ff" : "#ff9900",
    border: "none",
    padding: "12px 25px",
    marginLeft: "15px",
    fontSize: "1rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    transition: "all 0.3s ease",
  });

  const buttonHoverStyle = {
    backgroundColor: "#cc7a00",
    transform: "scale(1.05)",
  };

  const handleClick = (button) => {
    setActiveButton(button);
    if (button === "login") navigate("/login");
    else if (button === "register") navigate("/register");
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}></div>

      {/* Header with Title & Buttons */}
      <div style={headerStyle}>
        <div style={{ flex: 1 }}></div>
        <div style={titleStyle}>Welcome to Online Sell/Buy Platform</div>
        <div>
          <button
            style={buttonStyle("login")}
            onClick={() => handleClick("login")}
            onMouseEnter={(e) =>
              Object.assign(e.currentTarget.style, buttonHoverStyle)
            }
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, buttonStyle("login"))
            }
          >
            Login
          </button>
          <button
            style={buttonStyle("register")}
            onClick={() => handleClick("register")}
            onMouseEnter={(e) =>
              Object.assign(e.currentTarget.style, buttonHoverStyle)
            }
            onMouseLeave={(e) =>
              Object.assign(e.currentTarget.style, buttonStyle("register"))
            }
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
