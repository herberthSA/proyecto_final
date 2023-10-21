import { userData } from "../services/users.service.js";

class viewsController {

    getLogin(req,res){
        res.status(200).render('login',{});
    }
    getRegister(req,res){
        res.status(200).render('register-form');
    }
    // vista de usuarios
    async viewUsers(req, res){
        const users = await  userData.get();
        const allUsers = users.map(array=>{
            return {
                id: array._id.toString(),
                firstname : array.firstName,
                lastname : array.lastName,
                email: array.email,
                rol :array.rol
            }
        })
        console.log(allUsers);
        res.status(200).render('users',{users:allUsers});
    }
}

export const viewController = new viewsController()