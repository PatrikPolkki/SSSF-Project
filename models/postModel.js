'use strict';

import mongoose from 'mongoose';
import SportType from './sportTypeModel';
import User from './userModel';

const Schema = mongoose.Schema;

const postSchema = new Schema({
  owner: {type: Schema.Types.ObjectId, ref: User},
  title: String,
  description: String,
  location: {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: false,
    },
  },
  sport: {type: Schema.Types.ObjectId, ref: SportType},
  applicants: [
    {
      type: Schema.Types.ObjectId,
      ref: User,
    },
  ],
});

export default mongoose.model('Post', postSchema);