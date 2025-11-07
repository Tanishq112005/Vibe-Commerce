import { client } from "./connectDatabase.js";


export async function addItem(shop_id, name, price, image_url, number_of_product_available, category_type) {
  try {
    const result = await client.query(
      `
      INSERT INTO items (shop_id, name, price, image_url, number_of_product_available, category_type)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
      `,
      [shop_id, name, price, image_url, number_of_product_available, category_type]
    );
    return result.rows[0];
  } catch (err) {
    throw err;
  }
}


export async function updateItem(item_id, fields) {
  try {
    const setQuery = Object.keys(fields)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ");

    const values = [item_id, ...Object.values(fields)];

    const result = await client.query(
      `
      UPDATE items
      SET ${setQuery}
      WHERE id = $1
      RETURNING *;
      `,
      values
    );

    return result.rows[0];
  } catch (err) {
    throw err;
  }
}


export async function deleteItem(item_id) {
  try {
    await client.query(`DELETE FROM items WHERE id = $1;`, [item_id]);
    return true;
  } catch (err) {
    throw err;
  }


  
}


// Get all items
export async function getItems() {
    try {
      const result = await client.query(`
        SELECT * FROM items ORDER BY listed_at DESC;
      `);
      return result.rows;
    } catch (err) {
      throw err;
    }
  }
  