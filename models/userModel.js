'use strict';
import mongoose from 'mongoose';
import Post from './postModel';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, unique: true},
  password: {type: String, required: true},
  full_name: {type: String, required: true},
  applied_sports: [
    {type: Schema.Types.ObjectId, ref: Post},
  ],
});

export default mongoose.model('User', userSchema);