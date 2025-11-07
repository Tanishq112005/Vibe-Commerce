import { createOrder, getUserOrders, deleteOrder } from "../database/ordersQueries.js";

class OrderController {
  async placeOrder(req, res) {
    try {
      const user_id = req.users.id; // from authMiddleware
      const { items } = req.body; // [{ item_id, quantity }]

      if (!items || items.length === 0)
        return res.status(400).json({ msg: "No items provided" });

      const order = await createOrder(user_id, items);
      res.status(201).json({ msg: "Order placed successfully", order });
    } catch (err) {
      res.status(500).json({ msg: `Error placing order: ${err.message}` });
    }
  }

  async getOrders(req, res) {
    try {
      const user_id = req.users.id;
      const orders = await getUserOrders(user_id);

      res.status(200).json({ msg: "Orders fetched successfully", orders });
    } catch (err) {
      res.status(500).json({ msg: `Error fetching orders: ${err.message}` });
    }
  }

  async removeOrder(req, res) {
    try {
      const { id } = req.params;

      const success = await deleteOrder(id);
      if (!success) return res.status(404).json({ msg: "Order not found" });

      res.status(200).json({ msg: "Order deleted successfully" });
    } catch (err) {
      res.status(500).json({ msg: `Error deleting order: ${err.message}` });
    }
  }
}

export const orderController = new OrderController();
