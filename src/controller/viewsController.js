class viewsController {

    getLogin(req,res){
        res.status(200).render('login',{});
    }
    getRegister(req,res){
        res.status(200).render('register-form');
    }
}

export const viewController = new viewsController()