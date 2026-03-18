const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const cors = require("cors");

const app = express();
const PORT = 3000;
const DATA_FILE = "products.json";

// Public folder is one level up from /server
const PUBLIC_DIR = path.join(__dirname, "..", "public");

// ─── MIDDLEWARE ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// Serve uploaded images statically
app.use("/public", express.static(PUBLIC_DIR));

// ─── MULTER SETUP ─────────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PUBLIC_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const loadProducts = () => {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
};

const saveProducts = (products) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
};

// ─── CREATE ───────────────────────────────────────────────────────────────────
app.post("/api/products", upload.single("image"), (req, res) => {
  const { name, price, description } = req.body;
  const image = req.file ? req.file.filename : null;
  const products = loadProducts();
  const id = Date.now().toString();
  const product = { id, name, price: parseFloat(price), description, image };

  products.push(product);
  saveProducts(products);

  res.status(201).json(product);
});

// ─── READ ALL ─────────────────────────────────────────────────────────────────
app.get("/api/products", (req, res) => {
  const products = loadProducts();
  res.json(products);
});

// ─── READ ONE ─────────────────────────────────────────────────────────────────
app.get("/api/products/:id", (req, res) => {
  const products = loadProducts();
  const product = products.find((p) => p.id === req.params.id);

  if (!product) return res.status(404).json({ message: "Product not found" });

  res.json(product);
});

// ─── UPDATE ───────────────────────────────────────────────────────────────────
app.put("/api/products/:id", upload.single("image"), (req, res) => {
  const products = loadProducts();
  const index = products.findIndex((p) => p.id === req.params.id);

  if (index === -1) return res.status(404).json({ message: "Product not found" });

  const { name, price, description } = req.body;
  // Keep existing image if no new file uploaded
  const image = req.file ? req.file.filename : products[index].image;

  products[index] = { ...products[index], name, price: parseFloat(price), description, image };
  saveProducts(products);

  res.json(products[index]);
});

// ─── DELETE ───────────────────────────────────────────────────────────────────
app.delete("/api/products/:id", (req, res) => {
  const products = loadProducts();
  const index = products.findIndex((p) => p.id === req.params.id);

  if (index === -1) return res.status(404).json({ message: "Product not found" });

  const deleted = products.splice(index, 1)[0];
  saveProducts(products);

  res.json({ message: "Product deleted", product: deleted });
});

// ─── START ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
