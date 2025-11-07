import express from "express";
import { itemsController } from "../controllers/itmesController.js";

const router = express.Router();

router.post("/add", (req, res) => itemsController.addItem(req, res));
router.put("/update/:id", (req, res) => itemsController.updateItem(req, res));
router.delete("/delete/:id", (req, res) => itemsController.deleteItem(req, res));

export default router;
