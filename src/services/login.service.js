import { user } from '../DAO/Mongo/users.mongo.js'
class loginService {

    lastLogin = async(email)=>{

        const lastTime = await user.lastLogin(email);
        return lastTime;

    }
    
}

export const loginservice = new loginService()