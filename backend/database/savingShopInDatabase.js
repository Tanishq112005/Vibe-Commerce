import { client } from "./connectDatabase.js";

export async function savingDataOfShop(user_id, name, shopkeeper_name) {
  try {
    const result = await client.query(
      `
      INSERT INTO shops (user_id, name, shopkeeper_name)
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
      [user_id, name, shopkeeper_name]
    );

    console.log("✅ Shop data saved successfully!");
    return result.rows[0] || null;
  } catch (err) {
    console.error("❌ Error saving shop data:", err.message);
    throw err;
  }
}
