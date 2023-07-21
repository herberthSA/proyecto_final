import express from "express"
export const viewsRouter = express.Router();

viewsRouter.get('',async(req,res)=>{
    res.status(200).render('login',{})

})

viewsRouter.get('/register', (req, res) => {
    res.status(200).render('register-form');
  });