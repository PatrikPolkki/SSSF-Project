'use strict';

import passport from './pass';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const login = (req) => {
  console.log(req.body);
  return new Promise((resolve, reject) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
      console.log('login', err, user, info);
      if (err || !user) {
        reject(info.message);
      }
      req.login(user, {session: false}, (err) => {
        if (err) {
          reject(err);
        }
        const token = jwt.sign(req.user, process.env.SECRET_KEY);
        console.log('SECRET KEY', process.env.SECRET_KEY);
        resolve({...user, token, id: user._id});
      });
    })(req);
  });
};

const checkAuth = (req) => {
  return new Promise((resolve) => {
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
      console.log('USER', user);
      if (err || !user) {
        resolve(false);
      }
      resolve(user);
    })(req);
  });
};

export {checkAuth, login};