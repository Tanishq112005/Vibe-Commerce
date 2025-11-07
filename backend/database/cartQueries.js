import { client } from "./connectDatabase.js";


export async function addToCart(user_id, item_id, quantity = 1) {
  try {
    const result = await client.query(
      `
      INSERT INTO cart (user_id, item_id, quantity)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, item_id)
      DO UPDATE SET quantity = cart.quantity + EXCLUDED.quantity
      RETURNING *;
      `,
      [user_id, item_id, quantity]
    );
    return result.rows[0];
  } catch (err) {
    throw err;
  }
}


export async function getCartItems(user_id) {
  try {
    const result = await client.query(
      `
      SELECT c.id, c.quantity, i.name, i.price, i.image_url
      FROM cart c
      JOIN items i ON c.item_id = i.id
      WHERE c.user_id = $1;
      `,
      [user_id]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
}


export async function updateCartItem(user_id, item_id, quantity) {
  try {
    const result = await client.query(
      `
      UPDATE cart
      SET quantity = $3
      WHERE user_id = $1 AND item_id = $2
      RETURNING *;
      `,
      [user_id, item_id, quantity]
    );
    return result.rows[0] || null;
  } catch (err) {
    throw err;
  }
}


export async function deleteCartItem(user_id, item_id) {
  try {
    const result = await client.query(
      `
      DELETE FROM cart
      WHERE user_id = $1 AND item_id = $2
      RETURNING *;
      `,
      [user_id, item_id]
    );
    return result.rows[0] || null;
  } catch (err) {
    throw err;
  }
}
