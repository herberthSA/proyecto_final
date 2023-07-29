import express from 'express';
import passport from 'passport';
import { UserModel } from '../DAO/models/users.model.js';
import { createHash , isValidPassword } from '../utils/bcrypt.js';

export const loginRouter = express.Router();

loginRouter.post('/register', passport.authenticate('register', { failureRedirect: 'api/sessions/failregister' }), (req, res) => {
  if (!req.user) {
    return res.json({ error: 'something went wrong' });
  }
  req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, isAdmin: req.user.isAdmin };
   return res.redirect('/')
  /* return res.json({ msg: 'ok', payload: req.user }); */
});

loginRouter.post('/login', passport.authenticate('login', { failureRedirect: 'api/sessions/failregister' }), async (req, res) => {
  if (!req.user) {
    return res.json({ error: 'invalid credentials' });
  }

   req.session.user = {
    email: req.user.email,
    firstName: req.user.firstName,
    rol: req.user.rol,
    _id: req.user._id.toString(),
  };
   return res.redirect('/products');
});

loginRouter.get('/current', async (req, res) => {
  return res.status(200).json({
    status: 'success',
    msg: 'datos de la session',
    payload: req.session.user || {},
  });
});

  
/* 
loginRouter.post('/register', async (req, res) => {
  const { firstName, lastName, age, email, password } = req.body;
  if (!firstName || !lastName || !age || !email || !password) {
    return res.status(400).render('error-page', { msg: 'faltan datos' });
  }
 
  try {
    await UserModel.create({ firstName, lastName, age, email, password: createHash(password) , admin: false });
    req.session.firstName = firstName;
    req.session.email = email;
    req.session.admin = false;
    return res.redirect('/');
  } catch (e) {
    console.log(e);
    return res.status(400).render('error-page', { msg: 'controla tu email y intenta mas tarde' });
  }
}); */


/* loginRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
   if (!email || !password) {
    return res.status(400).render('error-page', { msg: 'faltan datos' });
  }
  try {
    const foundUser = await UserModel.findOne({ email });
    if(email =='adminCoder@coder.com' && password =='adminCod3r123')
    {
      req.session.firstName = 'Admi';
      req.session.email = 'adminCoder@coder.com';
      req.session.admin = true;
      return res.redirect('/products');
    }
    if (foundUser && isValidPassword(password,foundUser.password)) {
      req.session.firstName = foundUser.firstName;
      req.session.email = foundUser.email;
      req.session.admin = foundUser.admin;
      
      return res.redirect('/products');
    } else {
      return res.status(401).render('error-page', { msg: 'email o pass incorrectos' });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).render('error-page', { msg: 'error inesperado en servidor' });
  }
}); */


loginRouter.get('/failregister', async (req, res) => {
  return res.json({ error: 'fail to register' });
});

loginRouter.get('/logout', (req, res) => {
  console.log(req.session)
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).render('error', { error: 'error inesperado no se pudo eliminar session' });
    }
    console.log(req.session)
    return res.redirect('/');
  });

});