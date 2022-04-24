'use strict';
import {gql} from 'apollo-server-express';
import postSchema from './postSchema';
import userSchema from './userSchema';
import sportTypeSchema from './sportTypeSchema';

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
   _: Boolean
  }
`;

export default [
  linkSchema,
  postSchema,
  userSchema,
  sportTypeSchema,
];