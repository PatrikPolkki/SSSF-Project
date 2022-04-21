'use strict';

import Post from '../models/postModel';

export default {
  Query: {
    posts: async (parent, args) => {
      return Post.find();
    },
  },

  Mutation: {
    addPost: async (parent, args) => {
      const newPost = await new Post(args.postInfo);
      return newPost.save();
    },
    updatePost: async (parent, args) => {
      const post = await Post.findOneAndUpdate(args.id, args.postInfo);
      return post.save();
    },
    deletePost: async (parent, args) => {
      return Post.findOneAndDelete(args.id);
    },
  },
};