import { client } from "./connectDatabase.js";

export async function savingDataOfUser(name, email, password, type, mobile_number, address) {
  try {
    const result = await client.query(
      `
      INSERT INTO users (name, email, password, type, mobile, address)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
      `,
      [name, email, password, type, mobile_number, address]
    );

    console.log("✅ User data saved successfully!");
    return result.rows[0];
  } catch (err) {
    console.error("❌ Error saving user data:", err.message);
    throw err;
  }
}
