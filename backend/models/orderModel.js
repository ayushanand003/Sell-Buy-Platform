import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  buyerName: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  paymentStatus: { type: String, default: "Pending" }, // Pending / Paid
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
