'use strict';

import Post from '../models/postModel';
import sportTypeResolver from './sportTypeResolver';

export default {
  User: {
    applied_sports: async (parent, args) => {
      console.log(parent);
      return Post.find({_id: {$in: parent.applied_sports}});
    },
  },

  Query: {
    posts: async (parent, args) => await Post.find(),
    post: async (parent, args) => await Post.findById(args.id),
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
        const post = await Post.findOneAndUpdate(args.id, args.postInfo,
            {returnDocument: 'after'});
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
    applyToPost: async (parent, args) => {
      try {
        const newParticipant = args.participantId;
        console.log(newParticipant);
        const updatedPost = await Post.findOneAndUpdate(args.id,
            {$addToSet: {participants: newParticipant}},
            {returnDocument: 'after'});
        return updatedPost.save();
      } catch (err) {
        throw new Error(err);
      }
    },
    leaveFromPost: async (parent, args) => {
      try {
        const participant = args.participantId;
        console.log(participant);
        const updatedPost = await Post.findOneAndUpdate(args.id,
            {$pull: {participants: participant}},
            {returnDocument: 'after'});
        return updatedPost.save();
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};