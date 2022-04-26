'use strict';

import mongoose from 'mongoose';
import SportType from './sportTypeModel';
import User from './userModel';

const Schema = mongoose.Schema;

const postSchema = new Schema({
  owner: {type: Schema.Types.ObjectId, ref: User, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  location: {type: String, required: true},
  date: {type: String, required: true},
  sport: {type: Schema.Types.ObjectId, ref: SportType, required: true},
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
  ],
});

export default mongoose.model('Post', postSchema);