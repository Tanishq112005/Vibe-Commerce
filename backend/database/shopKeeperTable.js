// createShopsTable.js

import { client } from "./connectDatabase.js";

export async function createShopsTable() {
  try {
    

    // enable UUID generation
    await client.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);

    const result = await client.query(`
      CREATE TABLE IF NOT EXISTS shops (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(100) NOT NULL,
        shopkeeper_name VARCHAR(100) NOT NULL,
        listed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Shops table created successfully!");
    return result;
  } catch (err) {
    console.error(`❌ Error creating shops table: ${err.message}`);
    throw err;
  }
}
