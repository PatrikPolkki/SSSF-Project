'use strict';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const sportTypeSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
});

export default mongoose.model('SportType', sportTypeSchema);