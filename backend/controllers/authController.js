import { dataOfUser } from "../database/gettingDataForLogin.js";
import { savingDataOfUser } from "../database/savingDataOfUsers.js";
import { storingToken } from "../database/storingToken.js";
import { generateToken } from "../utils/jwt.js";

class AuthController {

  
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const result = await dataOfUser(password, email);

     
      if (!result) {
        return res.status(404).json({
          msg: "No such user exists",
        });
      }

      const payload = {
        id: result.id,
      };

      
      const access_token = generateToken(payload);

     
      await storingToken(access_token, result.id);

      
      res.setHeader("Authorization", `Bearer ${access_token}`);

    
      return res.status(200).json({
        msg: "Login successful!",
        token : access_token,
        data :  {
          id: result.id,
          name: result.name,
          email: result.email,
          type : result.type 
        }
      });
    } catch (err) {
      console.error("❌ Error in login:", err);
      return res.status(500).json({
        msg: `Error during login: ${err.message}`,
      });
    }
  }
  

  async signUp(req , res){
    const {name , email , password , mobile_number , address , type} = req.body ; 
    
    try {
      const result = await savingDataOfUser(name , email , password , type , mobile_number , address) ; 
      
      const payload = {
        id: result.id,
      };

      
      const access_token = generateToken(payload);

     
      await storingToken(access_token, result.id);

      
      res.setHeader("Authorization", `Bearer ${access_token}`);

      
      return res.status(200).json({
        msg: "SignUp successful!",
        token : access_token,
        data :  {
          id: result.id,
          name: result.name,
          email: result.email,
          type: result.type,
        }
      });

      
    }
    catch(error) {
        console.log("Error in SignUp") ; 
        res.status(404).json({
            msg : `Error in signUp , error is ${error}`  
        })
    }
  }



}

export const authController = new AuthController();

authController.login =
    authController.login.bind(authController);
authController.signUp = authController.signUp.bind(authController) ;