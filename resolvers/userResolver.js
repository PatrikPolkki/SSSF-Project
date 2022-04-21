'use strict';
import User from '../models/userModel';
import bcrypt from 'bcrypt';

export default {
  Query: {
    users: async (parent, args) => await User.find(),

    user: async (parent, args, {user}) => {
      console.log('userResolver', user);
      // find user by id
      return User.findById(args.id);
    },
  },
  Mutation: {
    registerUser: async (parent, args) => {
      try {
        console.log('REGISTER', args);
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