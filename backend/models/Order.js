import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  email: { type: String, required: true }, // ✅ email is required now
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", OrderSchema);
