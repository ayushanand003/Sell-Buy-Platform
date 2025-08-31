import express from "express";
import multer from "multer";
import path from "path";
import Item from "../models/Item.js";

const router = express.Router();

// 📂 Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ➕ Add Item
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, brand, category, startingBid, sellerName, sellerPhone, sellerAddress } = req.body;

    const newItem = new Item({
      name,
      brand,
      category,
      startingBid,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : "",
      sellerName,
      sellerPhone,
      sellerAddress,
    });

    await newItem.save();
    res.status(201).json({ message: "Item added successfully", item: newItem });
  } catch (err) {
    console.error("Error saving item:", err);
    res.status(500).json({ message: "Failed to add item" });
  }
});

// 📜 Get items by category (⚠️ keep this ABOVE :id)
router.get("/category/:category", async (req, res) => {
  try {
    const items = await Item.find({ category: req.params.category });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching category items" });
  }
});

// 📜 Get single item by ID
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    console.error("Error fetching item:", err);
    res.status(500).json({ message: "Error fetching item" });
  }
});

// 📜 Get all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching items" });
  }
});

export default router;
