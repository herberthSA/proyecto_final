import { get } from "mongoose";

class userDatas {
    async usersInformation(id){
        const viewCart = await get(id);
        return viewCart
    }   
}

export const userData = new userDatas()