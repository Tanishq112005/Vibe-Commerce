import express from "express";
import dotenv from "dotenv";
import { ConnectDb } from "./database/connectDatabase.js";
import  cors from "cors"
// --- Import all your route handlers ---
import authRoutes from "./routes/auth.js";
import cartRoutes from "./routes/cart.js";
import itemsRoutes from "./routes/items.js";
import orderRoutes from "./routes/order.js";
import shopRoutes from "./routes/shop.js";

// --- Load Environment Variables (at the top) ---
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3500;

// --- Global Middleware ---
app.use(express.json()); // Essential for parsing req.body
app.use(cors())
// --- API Routes ---
// This registers all your controller routes under a base path
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/items", itemsRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/shop", shopRoutes);

// --- Start Server Function ---
const startServer = async () => {
  try {
    // 1. Connect to the Database
    await ConnectDb(); 
    
    // 2. Start the Express Server (only after DB is connected)
    app.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1); // Exit the process with an error code
  }
};

// --- Run the server ---
startServer();