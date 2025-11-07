import { savingDataOfShop } from "../database/savingShopInDatabase.js";

class Shop {
    async addShop(req , res){
        const {name , shopkeeper_name } = req.body ; 
        const id = req.users.id ; 

        const result =  savingDataOfShop(id , name , shopkeeper_name) ; 

        return  res.status(200).json({
            msg : "Shop is add with our company" ,
            data : result
        })
        
    }
}

export const shopController = new Shop() ; 
shopController.addShop = shopController.addShop.bind(shopController) ;

