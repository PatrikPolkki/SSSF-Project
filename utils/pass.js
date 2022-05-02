'use strict';

import passport from 'passport';
import {Strategy} from 'passport-local';
import {ExtractJwt, Strategy as JWTStrategy} from 'passport-jwt';
import User from '../models/userModel';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

passport.use(
    new Strategy(async (username, password, done) => {
      console.log('Local Strategy', username, password);

      const user = await User.findOne({username});
      // if user is undefined
      if (!user) {
        return done(null, false, 'user not found');
      }
      // if passwords dont match
      if (!(await bcrypt.compare(password, user.password))) {
        return done(null, false, 'password incorrect');
      }
      // if all is ok
      // convert document to object
      const strippedUser = user.toObject();
      delete strippedUser.password;
      return done(null, strippedUser);
    }),
);

passport.use(
    'jwt',
    new JWTStrategy({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: process.env.SECRET_KEY,
        },
        (payload, done) => {
          done(null, payload);
        },
    ),
);

export default passport;