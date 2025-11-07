import { client } from "./connectDatabase.js";


export async function createOrder(user_id, items) {
  try {
    await client.query("BEGIN"); // Start transaction

    // Calculate total price
    let totalPrice = 0;

    for (const { item_id, quantity } of items) {
      const itemRes = await client.query(
        "SELECT price, number_of_product_available FROM items WHERE id = $1",
        [item_id]
      );

      if (itemRes.rows.length === 0)
        throw new Error(`Item with id ${item_id} not found`);

      const item = itemRes.rows[0];

      if (item.number_of_product_available < quantity)
        throw new Error(`Not enough stock for item ${item_id}`);

      totalPrice += item.price * quantity;
    }

    // Create order
    const orderRes = await client.query(
      `INSERT INTO orders (user_id, total_price) VALUES ($1, $2) RETURNING *`,
      [user_id, totalPrice]
    );
    const order = orderRes.rows[0];

    // Insert order_items and update inventory
    for (const { item_id, quantity } of items) {
      const itemRes = await client.query(
        "SELECT price FROM items WHERE id = $1",
        [item_id]
      );
      const price_at_time = itemRes.rows[0].price;

      await client.query(
        `INSERT INTO order_items (order_id, item_id, quantity, price_at_time)
         VALUES ($1, $2, $3, $4)`,
        [order.id, item_id, quantity, price_at_time]
      );

      // Decrease available stock and increase sold count
      await client.query(
        `UPDATE items 
         SET number_of_product_available = number_of_product_available - $1,
             number_of_sold = number_of_sold + $1
         WHERE id = $2`,
        [quantity, item_id]
      );
    }

    await client.query("COMMIT");
    return order;
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Error creating order:", err);
    throw err;
  }
}

/**
 * Fetch all orders for a user
 */
export async function getUserOrders(user_id) {
  try {
    const result = await client.query(
      `SELECT * FROM orders WHERE user_id = $1 ORDER BY order_date DESC`,
      [user_id]
    );
    return result.rows;
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    throw err;
  }
}

/**
 * Delete an order and revert item stock counts
 */
export async function deleteOrder(order_id) {
  try {
    await client.query("BEGIN");

    // Fetch order items first
    const itemsRes = await client.query(
      `SELECT item_id, quantity FROM order_items WHERE order_id = $1`,
      [order_id]
    );

    // Revert item stock
    for (const { item_id, quantity } of itemsRes.rows) {
      await client.query(
        `UPDATE items 
         SET number_of_product_available = number_of_product_available + $1,
             number_of_sold = number_of_sold - $1
         WHERE id = $2`,
        [quantity, item_id]
      );
    }

    // Delete from order_items and orders
    await client.query(`DELETE FROM order_items WHERE order_id = $1`, [order_id]);
    await client.query(`DELETE FROM orders WHERE id = $1`, [order_id]);

    await client.query("COMMIT");
    return true;
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Error deleting order:", err);
    throw err;
  }
}
