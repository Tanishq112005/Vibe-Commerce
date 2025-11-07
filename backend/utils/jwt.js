import dotenv from "dotenv";

dotenv.config(); 
import jwt from "jsonwebtoken" ; 

const screat_key = process.env.JWT_SECRET ; 


function generateToken(payload){
    return jwt.sign(payload , screat_key) ; 
}

function verifyToken(token){
    return jwt.verify(token , screat_key) ; 
}


export {
    generateToken , 
    verifyToken 
}

