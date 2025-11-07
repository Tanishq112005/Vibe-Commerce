import { addItem, updateItem, deleteItem } from "../database/itemsQueries.js";

class ItemsController {
  async addItem(req, res) {
    try {
      const { shop_id, name, price, image_url, number_of_product_available, category_type } = req.body;

      if (!shop_id || !name || !price) {
        return res.status(400).json({ msg: "Missing required fields" });
      }

      const item = await addItem(shop_id, name, price, image_url, number_of_product_available, category_type);
      res.status(201).json({ msg: "Item added successfully", data : item });
    } catch (err) {
      console.error("Error adding item:", err);
      res.status(500).json({ msg: "Internal server error" });
    }
  }

  async updateItem(req, res) {
    try {
      const { id } = req.params;
      const updatedFields = req.body;

      const updatedItem = await updateItem(id, updatedFields);

      if (!updatedItem) {
        return res.status(404).json({ msg: "Item not found" });
      }

      res.status(200).json({ msg: "Item updated successfully", data :  updatedItem });
    } catch (err) {
      console.error("Error updating item:", err);
      res.status(500).json({ msg: "Internal server error" });
    }
  }

  async deleteItem(req, res) {
    try {
      const { id } = req.params;

      const deleted = await deleteItem(id);

      if (!deleted) {
        return res.status(404).json({ msg: "Item not found" });
      }

      res.status(200).json({ msg: "Item deleted successfully" });
    } catch (err) {
      console.error("Error deleting item:", err);
      res.status(500).json({ msg: "Internal server error" });
    }
  }


  async getItems(req, res) {
    try {
      const items = await getItems();

      if (!items.length) {
        return res.status(404).json({ msg: "No items found" });
      }

      res.status(200).json({ msg: "Items fetched successfully", data: items });
    } catch (err) {
      console.error("Error fetching items:", err);
      res.status(500).json({ msg: "Internal server error" });
    }
  }
  
}

export const itemsController = new ItemsController();
