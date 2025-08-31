import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Place new order
router.post("/", async (req, res) => {
  try {
    const { email, name, phone, address, itemId, amount } = req.body;

    if (!email || !itemId) {
      return res.status(400).json({ message: "❌ Email and Item ID are required" });
    }

    const newOrder = new Order({ email, name, phone, address, itemId, amount });
    await newOrder.save();

    res.status(201).json({ message: "✅ Order placed successfully", order: newOrder });
  } catch (err) {
    console.error("❌ Error creating order:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get orders by email
router.get("/:email", async (req, res) => {
  try {
    const orders = await Order.find({ email: req.params.email }).populate(
      "itemId",
      "name startingBid"
    );
    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
