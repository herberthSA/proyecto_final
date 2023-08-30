import { UserModel } from "./models/users.model";


export default class users {
    constructor() {}
  
    get = async (id) => {
      const user = await UserModel.findOne({_id:id}).populate('cart');;
      return user;
    };
  
    insert = async (data) => {
      console.log(data);
      const result = await contactsModel.create(data);
      return result;
    };
  }