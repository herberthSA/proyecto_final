import { logger } from "../utils/logger.js";

export function checkUser(req, res, next) {
    logger.debug(req.session.user.email);
    if (req.session.user.email && req.session.user.rol == 'user') {
      return next();
    }
    return res.status(401).render('error-page', { msg: 'please log in' });
  }
  
  export function checkAdmin(req, res, next) {
    if (req.session.user.email && req.session.user.rol == 'admin') {
      return next();
    }
    return res.status(401).render('error-page', { msg: 'please log in AS ADMIN!' });
  }