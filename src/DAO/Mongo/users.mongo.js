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
  }

  export const user = new users()