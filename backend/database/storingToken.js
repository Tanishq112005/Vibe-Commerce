import { client } from "./connectDatabase.js";

export async function storingToken(access_token, id) {
  try {
    const result = await client.query(
      `
      UPDATE users
      SET access_token = $1
      WHERE id = $2 `,
      [access_token, id]
    );

    console.log("✅ Access token stored successfully!");
    
  } catch (error) {
    console.log(`❌ Error storing the token: ${error.message}`);
    throw error;
  }
}
