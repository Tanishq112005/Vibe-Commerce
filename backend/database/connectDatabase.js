import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config(); 

 export const client = new Client({
  connectionString : process.env.DATABASE_URL
}
)

export async function ConnectDb (){
    try {
        await client.connect() ; 
        console.log("Database is connect Successfully") ; 
    }
    catch(err){
        console.log(`Error in connecting with the database , is ${err}`) ; 
    }
}












