import { user } from '../DAO/Mongo/users.mongo.js'
class userDatas {
    async usersInformation(id){
        const viewCart = await user.get(id);
        return viewCart
    }   
}

export const userData = new userDatas()