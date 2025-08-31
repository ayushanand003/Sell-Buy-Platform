// src/App.jsx
import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
//import AuctionList from "./pages/AuctionList"; // new page for category
import CategoryPage from "./pages/CategoryPage";
import AuctionDetail from "./pages/AuctionDetail";
import BuyerDetails from "./pages/BuyerDetails";
import PaymentPage from "./pages/PaymentPage";
import SellerPage from "./pages/SellerPage";
import Profile from "./pages/Profile";
import OrderHistory from "./pages/OrderHistory";



function App() {
  const userId = null;
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      {/* Auction List page */}
      <Route path="/category/:category" element={<CategoryPage />} />
      <Route path="/auction/:id" element={<AuctionDetail />} />
      <Route path="/buy/:itemId" element={<BuyerDetails />} />

      <Route path="/payment/:itemId" element={<PaymentPage />} />
      <Route path="/seller" element={<SellerPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/orders" element={<OrderHistory userId={userId} />} />

    </Routes>
  );
};

export default App;
