import {
  addToCart,
  getCartItems,
  updateCartItem,
  deleteCartItem,
} from "../database/cartQueries.js";

class CartController {
 
  async addItem(req, res) {
    try {
      const user_id = req.users.id;
      const { item_id, quantity } = req.body;

      if (!item_id || !quantity) {
        return res.status(400).json({ msg: "Missing item_id or quantity" });
      }

      const item = await addToCart(user_id, item_id, quantity);
      return res.status(201).json({
        msg: "Item added/updated in cart successfully",
        data: item,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ msg: "Internal server error" });
    }
  }

 
  async getCart(req, res) {
    try {
      const user_id = req.users.id;
      const items = await getCartItems(user_id);

      return res.status(200).json({
        msg: "Cart items fetched successfully",
        data: items,
      });
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ msg: "Internal server error" });
    }
  }

 
  async updateItem(req, res) {
    try {
      const user_id = req.users.id;
      const { item_id, quantity } = req.body;

      if (!item_id || !quantity) {
        return res.status(400).json({ msg: "Missing item_id or quantity" });
      }

      const updatedItem = await updateCartItem(user_id, item_id, quantity);

      if (!updatedItem) {
        return res.status(404).json({ msg: "Item not found in cart" });
      }

      return res.status(200).json({
        msg: "Cart item updated successfully",
        data: updatedItem,
      });
    } catch (error) {
      console.error("Error updating cart item:", error);
      res.status(500).json({ msg: "Internal server error" });
    }
  }

  
  async deleteItem(req, res) {
    try {
      const user_id = req.users.id;
      const { item_id } = req.params;

      if (!item_id) {
        return res.status(400).json({ msg: "Missing item_id" });
      }

      const deleted = await deleteCartItem(user_id, item_id);

      if (!deleted) {
        return res.status(404).json({ msg: "Item not found in cart" });
      }

      return res.status(200).json({ msg: "Item removed from cart" });
    } catch (error) {
      console.error("Error deleting from cart:", error);
      res.status(500).json({ msg: "Internal server error" });
    }
  }
}

export const cartController = new CartController();
