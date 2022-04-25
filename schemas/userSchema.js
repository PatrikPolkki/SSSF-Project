'use strict';

import {gql} from 'apollo-server-express';

export default gql`
  extend type Query {
    users: [User]
    user(id: ID!): User
    login(username: String!, password: String!): User
  }
  
  extend type Mutation {
    registerUser(
      username: String!,
      password: String!,
      full_name: String,
    ): User
    appliedPost(id: ID!, postId: ID!): User
    removeAppliedPost(id: ID!, postId: ID!): User
  }

  type User {
    id: ID
    username: String,
    full_name: String,
    applied_sports: [Post]
    token: String
  }
`;