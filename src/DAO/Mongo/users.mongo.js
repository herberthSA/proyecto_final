import { DateTime } from "luxon";
import { logger } from "../../utils/logger.js";
import { UserModel } from "./models/users.model.js";



class users {
    constructor() {}
  
    get = async (id) => {
      const user = await UserModel.findOne({_id:id}).populate('cart');;
      return user;
    };
  
    insert = async (data) => {
      logger .info(data);
      const result = await UserModel.create(data);
      return result;
    };

    getAll = async ()=>{
      
      const user = await UserModel.find();
      return user;

    }
    lastLogin = async (email)=>{

      try {

      const fechaConexion = DateTime.now().setZone('America/Mexico_City');
      const lastTime = await UserModel.updateOne({email:email},{$set:{lastLogin:fechaConexion.toFormat('yyyy-MM-dd HH:mm:ss')}});
      return lastTime
        
      } catch (error) {
        throw error
      }
    }
    deleteUsers = async  (id)=>{
      try {
       
        const deletedUsers = await UserModel.deleteOne({_id:id});

       console.log(deletedUsers);
        
      } catch (error) {
        throw error;
      }
    }

  }

  export const user = new users()