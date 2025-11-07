import { Router } from "express";
import { shopController } from "../controllers/shopController.js"; // ✅ add .js

const router = Router();

// Add new shop
router.post("/addShop", shopController.addShop);

export default router;
