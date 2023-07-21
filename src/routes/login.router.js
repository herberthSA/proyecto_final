import express from 'express';
import { UserModel } from '../DAO/models/users.model.js';

export const loginRouter = express.Router();

loginRouter.post('/register', async (req, res) => {
  const { firstName, lastName, age, email, password } = req.body;
  if (!firstName || !lastName || !age || !email || !password) {
    return res.status(400).render('error-page', { msg: 'faltan datos' });
  }
  try {
    await UserModel.create({ firstName, lastName, age, email, password, admin: false });
    req.session.firstName = firstName;
    req.session.email = email;
    req.session.admin = false;
    return res.redirect('/');
  } catch (e) {
    console.log(e);
    return res.status(400).render('error-page', { msg: 'controla tu email y intenta mas tarde' });
  }
});

loginRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);

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
    if (foundUser && foundUser.password === password) {
      req.session.firstName = foundUser.firstName;
      req.session.email = foundUser.email;
      req.session.admin = foundUser.admin;
      return res.redirect('/products');
    } else {
      return res.status(400).render('error-page', { msg: 'email o pass incorrectos' });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).render('error-page', { msg: 'error inesperado en servidor' });
  }
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