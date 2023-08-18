import express from 'express';
import passport from 'passport';
import { loginController } from '../controller/login.controller.js';

export const loginRouter = express.Router();

loginRouter.post('/register', passport.authenticate('register', { failureRedirect: 'api/sessions/failregister' }), 
loginController.register);

loginRouter.post('/login', passport.authenticate('login', { failureRedirect: 'api/sessions/failregister' }), loginController.login);

loginRouter.get('/current', loginController.currentDatauser);

loginRouter.get('/failregister', loginController.failRegister);

loginRouter.get('/logout', loginController.logout);