export function checkUser(req, res, next) {
    console.log(req.session.user.email);
    if (req.session.user.email) {
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