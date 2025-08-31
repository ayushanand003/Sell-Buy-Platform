import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  startingBid: { type: Number, required: true },
  imageUrl: { type: String },
  sellerName: { type: String, required: true },
  sellerPhone: { type: String, required: true },
  sellerAddress: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Item", itemSchema);
