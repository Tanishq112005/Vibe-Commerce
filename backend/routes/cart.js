import express from "express";
import  {cartController}  from "../controllers/cartController.js";
import  authMiddleware  from "../middleware/auth.js";

const router = express.Router();

// Protected routes — require valid access token
router.post("/add", authMiddleware, (req, res) => cartController.addItem(req, res));
router.get("/", authMiddleware, (req, res) => cartController.getCart(req, res));
router.put("/update", authMiddleware, (req, res) => cartController.updateItem(req, res));
router.delete("/:item_id", authMiddleware, (req, res) => cartController.deleteItem(req, res));

export default router;