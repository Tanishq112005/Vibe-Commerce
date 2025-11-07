import express from "express";
import { orderController } from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", authMiddleware, orderController.placeOrder);
router.get("/my-orders", authMiddleware, orderController.getOrders);
router.delete("/:id", authMiddleware, orderController.removeOrder);


export default router;
