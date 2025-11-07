import { client} from "./connectDatabase.js";

export async function createUsers() {
  try {
   

    const result = await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        access_token TEXT,
        mobile VARCHAR(15),
        address TEXT,
        type TEXT, 
        password TEXT 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Users table created successfully!");
    return result;
  } catch (error) {
    console.error("❌ Error creating users table:", error);
    throw error;
  }
}


