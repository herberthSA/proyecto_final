import passport from 'passport';
import local from 'passport-local';
import { createHash, isValidPassword } from '../utils/bcrypt.js';
import { UserModel } from '../DAO/Mongo/models/users.model.js';
import {carts} from '../services/carts.service.js';
import { logger } from '../utils/logger.js';
import { user } from '../DAO/Mongo/users.mongo.js';
const Users = user
const LocalStrategy = local.Strategy;

export function iniPassport() {
  passport.use(
    'login',
    new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
      try {
        const user = await UserModel.findOne({ email: username });
        logger.debug(user)
       if (!user) {
          logger.warn('User Not Found with username (email) ' + username);
          return done(null, false);
        }
        if (!isValidPassword(password, user.password)) {
         logger.warn('Invalid Password');
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.use(
    'register',
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: 'email',
      },
      async (req, username, password, done) => {
        try {
          const { email, firstName, lastName,age,rol } = req.body;
          let user = await UserModel.findOne({ email: username });
          if (user) {
            logger.debug('User already exists');
            return done(null, false);
          }
          const newcart = await  carts.createOne();
          const newUser = {
            email,
            firstName,
            lastName,
            rol,
            age,
            password: createHash(password),
            cart: newcart._id
            
          };
          let userCreated = await Users.insert(newUser);
         logger.info(userCreated);
         logger.info('User Registration succesful');
          return done(null, userCreated);
        } catch (e) {
          logger.info('Error in register');
          logger.error(e);
          return done(e);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await UserModel.findById(id);
    done(null, user);
  });
}