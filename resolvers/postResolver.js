'use strict';

import Post from '../models/postModel';
import sportTypeResolver from './sportTypeResolver';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default {
  Query: {
    posts: async (parent, args) => await Post.find(),
  },

  Mutation: {
    addPost: async (parent, args) => {
      try {
        if (args.postInfo.sport === String) {
          const newSportType = await sportTypeResolver.Mutation.addSportType(
              args.postInfo.sport);
        }
        const newPost = await new Post(args.postInfo);
        return newPost.save();
      } catch (err) {
        throw new Error(err);
      }
    },
    updatePost: async (parent, args) => {
      try {
        const post = await Post.findOneAndUpdate(args.id, args.postInfo);
        return post.save();
      } catch (err) {
        throw new Error(err);
      }
    },
    deletePost: async (parent, args) => {
      try {
        return Post.findOneAndDelete(args.id);
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};