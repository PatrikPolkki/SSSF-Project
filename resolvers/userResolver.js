'use strict';
import User from '../models/userModel';
import bcrypt from 'bcrypt';
import {login} from '../utils/auth';
import {AuthenticationError} from 'apollo-server-express';

export default {
  Post: {
    owner: async (parent, args) => {
      return User.findById(parent.owner);
    },
    participants: async (parent, args) => {
      return User.find({_id: {$in: parent.participants}});
    },
  },
  Query: {
    users: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not Authorized');
      }
      return User.find();
    },

    user: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not Authorized');
      }
      return User.findById(args.id);
    },
    login: async (parent, args, {req}) => {
      req.body = args;
      return await login(req);
    },
  },
  Mutation: {
    registerUser: async (parent, args) => {
      try {
        const hash = await bcrypt.hash(args.password, 12);
        const userWithHash = {
          ...args,
          password: hash,
        };
        const newUser = new User(userWithHash);
        return await newUser.save();
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};