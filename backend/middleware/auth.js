import { verifyToken } from "../utils/jwt.js";

export function authMiddleware(req , res , next){
    const access_token = req.headers["authorization"]?.split(" ")[1]; 
    
    if(!access_token){
        console.log("Need of the access token") ;
        res.status(404).json({
            msg : "Need of the access token" 
        }
        )
    }
    

    try {
        const decode = verifyToken(access_token) ; 
        req.users = {id : decode.id} ; 
        return next() ; 
    }
    catch(error){
        res.status(500).json({
            msg : `Error is coming , the error is ${error}` 
        })
    }
}