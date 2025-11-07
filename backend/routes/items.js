import express from "express";
import { itemsController } from "../controllers/itmesController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/add", authMiddleware , (req, res) => itemsController.addItem(req, res));
router.put("/update/:id", authMiddleware , (req, res) => itemsController.updateItem(req, res));
router.delete("/delete/:id", authMiddleware , (req, res) => itemsController.deleteItem(req, res));
router.get("/getItems" , authMiddleware , (req , res) => itemsController.getItems(req , res)) ; 
router.get("/getShopkeeperItems" , authMiddleware ,  (req , res) => itemsController.getItemsOfShopkepper(req , res)) ; 
export default router;
