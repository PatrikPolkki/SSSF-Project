'use strict';

import Post from '../models/postModel';
import User from '../models/userModel';
import {AuthenticationError} from 'apollo-server-express';

export default {
  User: {
    applied_sports: async (parent, args) => {
      console.log(parent);
      return Post.find({_id: {$in: parent.applied_sports}}).sort({_id: -1});
    },
  },

  Query: {
    posts: async (parent, args, context) => {
      console.log('CONTEXT', context.user);
      if (!context.user) {
        throw new AuthenticationError('Not Authorized');
      }
      return Post.find().sort({_id: -1});
    },
    post: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not Authorized');
      }
      return Post.findById(args.id);
    },
    postByUser: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not Authorized');
      }
      return Post.find({owner: args.id});
    },
    appliedPosts: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not Authorized');
      }
      return Post.find({participants: {$in: args.id}});
    },
  },

  Mutation: {
    addPost: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not Authorized');
      }

      try {
        const newPost = await new Post(args.postInfo);
        const updatedUser = await User.findOneAndUpdate(
            {_id: args.postInfo.owner},
            {$push: {applied_sports: newPost.id}},
            {returnDocument: 'after'});
        console.log('USER', args);
        await updatedUser.save();
        return await newPost.save();
      } catch (err) {
        throw new Error(err);
      }
    },
    updatePost: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not Authorized');
      }
      try {
        const post = await Post.findOneAndUpdate(args.id, args.postInfo,
            {returnDocument: 'after'});
        return post.save();
      } catch (err) {
        throw new Error(err);
      }
    },
    deletePost: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not Authorized');
      }
      try {
        return Post.findOneAndDelete(args.id);
      } catch (err) {
        throw new Error(err);
      }
    },
    applyToPost: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not Authorized');
      }
      try {
        const newParticipant = args.participantId;

        const updatedPost = await Post.findOneAndUpdate({_id: args.id},
            {$push: {participants: newParticipant}},
            {returnDocument: 'after'});

        const updatedUser = await User.findOneAndUpdate(
            {_id: args.participantId},
            {$push: {applied_sports: args.id}},
            {returnDocument: 'after'});

        await updatedUser.save();
        return await updatedPost.save();
      } catch (err) {
        throw new Error(err);
      }
    },
    leaveFromPost: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not Authorized');
      }
      try {
        const participant = args.participantId;

        const updatedPost = await Post.findOneAndUpdate(
            {_id: args.id},
            {$pull: {participants: participant}},
            {returnDocument: 'after'});

        const updatedUser = await User.findOneAndUpdate(
            {_id: args.participantId},
            {pull: {applied_sports: args.id}},
            {returnDocument: 'after'});

        await updatedUser.save();
        return await updatedPost.save();
      } catch
          (err) {
        throw new Error(err);
      }
    },
  },
};