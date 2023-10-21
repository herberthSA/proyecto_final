import usersDTO from "../DTO/users.dto.js";
import { userData } from "../services/users.service.js"
const userDto =  new usersDTO()
class usersController {

    getUsers= async(req,res)=>{
       
        const result = await userData.get();
        return res.status(200).send({
            status: "ok",
            msg: "Usuarios",
            data: userDto.getAllusers(result)
        })
        
    }

    deleteUsers = async (req,res)=>{
        const result = await userData.deleteUsers();
        return res.status(200).send({
            data: result

        })

    }
   
}

export const userController = new usersController()