import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ConnectDb } from "./database/connectDatabase.js";


import authRoutes from "./routes/auth.js";
import itemRoutes from "./routes/items.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/order.js";
import shopRoutes from "./routes/shop.js" ; 

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


await ConnectDb();


app.get("/", (req, res) => {
  res.send("🚀 API is running successfully!");
});


app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/shop" , shopRoutes)

// ✅ 404 Route
app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
