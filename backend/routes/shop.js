import { Router } from "express";
import { shopController } from "../controllers/shopController.js"; // ✅ add .js
import authMiddleware from "../middleware/auth.js";

const router = Router();

// Add new shop
router.post("/addShop",authMiddleware ,shopController.addShop);

export default router;
