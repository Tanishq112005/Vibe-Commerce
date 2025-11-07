import { client } from "./connectDatabase.js";

export async function dataOfUser(password, email) {
  try {
    const result = await client.query(
      `
      SELECT * FROM users 
      WHERE email = $1 AND password = $2
      `,
      [email, password]
    );

   
    return result.rows[0] || null; 
  } catch (err) {
    console.log(`❌ Error getting user data: ${err.message}`);
    throw err;
  }
}
