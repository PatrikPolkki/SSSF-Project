'use strict';
import User from '../models/userModel';
import bcrypt from 'bcrypt';

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
    appliedPost: async (parent, args) => {
      try {
        const appliedPostId = args.postId;
        console.log(appliedPostId);
        const updatedUser = await User.findOneAndUpdate(args.id,
            {$addToSet: {applied_sports: appliedPostId}},
            {returnDocument: 'after'});
        return updatedUser.save();
      } catch (err) {
        throw new Error(err);
      }
    },
    removeAppliedPost: async (parent, args) => {
      try {
        const appliedPostId = args.postId;
        console.log(appliedPostId);
        const updatedUser = await User.findOneAndUpdate(args.id,
            {$pull: {applied_sports: appliedPostId}},
            {returnDocument: 'after'});
        return updatedUser.save();
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};