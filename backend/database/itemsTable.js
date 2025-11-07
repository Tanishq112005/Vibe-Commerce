// createItemsTable.js
import { client } from "./connectDatabase.js";

export async function createItemsTable() {
  try {

    // Ensure UUID generation support
    await client.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);

    const result = await client.query(`
      CREATE TABLE IF NOT EXISTS items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
        image_url TEXT, -- Product image link (URL)
        shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
        number_of_product_available INT DEFAULT 0 CHECK (number_of_product_available >= 0),
        number_of_sold INT DEFAULT 0 CHECK (number_of_sold >= 0),
        category_type TEXT[] DEFAULT '{}' , 
        listed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Items table created successfully!");
    return result;
  } catch (err) {
    console.error(`❌ Error creating items table: ${err.message}`);
    throw err;
  } finally {
    await client.end(); // optional: close DB connection after table creation
  }
}
