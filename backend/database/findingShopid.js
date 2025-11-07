import { client } from "./connectDatabase.js";

export async function findingShopId(user_id){
  try {
    const result = await client.query(`
        SELECT id FROM shops 
        WHERE user_id = $1;
        ` , [user_id]) ; 

    return result.rows[0] ;      
  }
  catch(err){
    throw err ; 
  }
}